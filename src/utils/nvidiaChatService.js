/**
 * NVIDIA NIM AI Chatbot Service
 * Integrates with NVIDIA's OpenAI-compatible API using meta/llama-3.2-11b-vision-instruct
 */

import { SCHEMES_DATA } from '../data/schemes.js';

export const DEFAULT_NVIDIA_API_KEY = "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";
export const DEFAULT_NVIDIA_MODEL = "meta/llama-3.2-11b-vision-instruct";

/**
 * Builds system prompt with verified schemes knowledge and citizen profile state
 */
export function buildSystemPrompt(currentProfile = {}, language = 'en') {
  const schemesSummary = SCHEMES_DATA.map(s =>
    `- ${s.name} (${s.authority}, ${s.state}): For ${s.eligibility.occupation.join('/')}, Age ${s.eligibility.minAge}-${s.eligibility.maxAge}, Max Income ₹${s.eligibility.maxIncome.toLocaleString('en-IN')}, Category: ${s.eligibility.category.join('/')}. Benefit: ${s.benefits}`
  ).join('\n');

  return `You are YojanaSetu AI, a helpful general-purpose AI assistant with strong expertise in Indian government welfare schemes.
Answer the user's actual question, including questions unrelated to government schemes. Do not force every conversation into scheme eligibility or profile intake. When a question is about Indian welfare schemes, use the verified knowledge base below and explain how the citizen can check current official details.

LANGUAGE & TONE:
- Support English, Tamil, and Tanglish. If the citizen writes in Tamil or asks in Tamil, reply in Tamil (or clear bilingual Tamil/English).
- Maintain a warm, encouraging, and respectful tone ("Namaste", "Vanakkam", "Citizen").
- Keep answers concise, helpful, and formatted with bullet points for readability.

CAPABILITIES:
1. Conduct an interactive conversational intake to find which schemes the citizen qualifies for.
2. Ask relevant follow-up questions one or two at a time based on what is missing from their profile (e.g. age, state, occupation, annual income, social category, land ownership, education).
3. If the citizen provides partial or incomplete answers, gracefully ask clarifying follow-ups.
4. If the citizen wants to correct their details (e.g. "Actually I am 22" or "My income is 1.5 Lakhs"), acknowledge the change warmly.
5. Answer questions about specific schemes (benefits, documents needed, deadlines, application steps).

CURRENT KNOWN CITIZEN PROFILE:
${JSON.stringify(currentProfile, null, 2)}

VERIFIED SCHEME KNOWLEDGE BASE:
${schemesSummary}

PROFILE EXTRACTION PROTOCOL:
Whenever the citizen mentions or corrects profile details (name, age, gender, state, district, occupation, category, education, income, isDisabled, ownsLand, hasBplCard), append a hidden JSON block at the very end of your response inside <PROFILE_UPDATE> ... </PROFILE_UPDATE> tags with any updated fields.
Example:
<PROFILE_UPDATE>
{"age": 24, "occupation": "Farmer", "state": "Tamil Nadu"}
</PROFILE_UPDATE>
Only include keys that the user stated or updated.`;
}

/**
 * Calls NVIDIA NIM API for chat completion.
 * Tries the Vite development proxy (/api/nvidia) first, with fallback to direct NVIDIA endpoint.
 * @param {Array} messages - Chat history [{sender, text}]
 * @param {Object} profile - Current citizen profile
 * @param {String} apiKey - NVIDIA API key
 * @param {String} language - Preferred language code
 * @returns {Promise<Object>} { reply, extractedProfile }
 */
export async function sendNvidiaChatMessage(messages, profile = {}, apiKey = DEFAULT_NVIDIA_API_KEY, language = 'en') {
  // Support both (messages, profile, apiKey, language) and (messages, profile, language)
  let activeKey = DEFAULT_NVIDIA_API_KEY;
  let activeLang = 'en';

  if (typeof apiKey === 'string') {
    if (['en', 'ta', 'te', 'hi'].includes(apiKey.toLowerCase())) {
      activeLang = apiKey;
    } else if (apiKey.trim()) {
      activeKey = apiKey.trim();
      if (language) activeLang = language;
    }
  }

  const systemPrompt = buildSystemPrompt(profile, activeLang);
  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages.slice(-8).map(message => ({
      role: message.sender === 'user' ? 'user' : 'assistant',
      content: message.text
    }))
  ];

  const payload = {
    model: DEFAULT_NVIDIA_MODEL,
    messages: formattedMessages,
    temperature: 0.6,
    top_p: 0.9,
    max_tokens: 800
  };

  // Determine endpoint: proxy first, then direct endpoint fallback
  const endpointsToTry = ["/api/nvidia/chat/completions", "https://integrate.api.nvidia.com/v1/chat/completions"];

  let lastError = null;

  for (const endpoint of endpointsToTry) {
    let timeoutId;
    try {
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${activeKey.trim()}`
      };

      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const detail = errData.error?.message || errData.detail || errData.message;
        throw new Error(detail
          ? `NVIDIA API error (${response.status}): ${detail}`
          : `NVIDIA API error (${response.status}) on ${endpoint}`);
      }

      const data = await response.json();
      const rawReply = data.choices?.[0]?.message?.content;
      if (typeof rawReply !== 'string' || !rawReply.trim()) {
        throw new Error('NVIDIA returned an empty or invalid response. Please try again.');
      }

      let cleanedReply = rawReply;
      let extractedProfile = {};
      const profileMatch = rawReply.match(/<PROFILE_UPDATE>([\s\S]*?)<\/PROFILE_UPDATE>/);
      if (profileMatch) {
        try {
          extractedProfile = JSON.parse(profileMatch[1].trim());
          cleanedReply = rawReply.replace(/<PROFILE_UPDATE>[\s\S]*?<\/PROFILE_UPDATE>/, '').trim();
        } catch (error) {
          console.warn("Could not parse profile update JSON:", error);
        }
      }

      return { reply: cleanedReply, extractedProfile };
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);
      lastError = err;
      console.warn(`Attempt at ${endpoint} failed:`, err.message);
      // If there's another endpoint to try, continue
    }
  }

  console.error("NVIDIA API call failed:", lastError);
  throw lastError;
}
