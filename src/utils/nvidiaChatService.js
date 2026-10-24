/**
 * NVIDIA NIM AI Chatbot Service
 * Integrates with NVIDIA's OpenAI-compatible API using meta/llama-3.2-11b-vision-instruct
 */

import { SCHEMES_DATA } from '../data/schemes.js';

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
- Support English, Tamil, Tanglish, and other languages when possible. Respond in the language the user uses unless they ask for another language.
- Maintain a warm and respectful tone; keep answers clear and relevant.
- Use bullets or steps when they make an answer easier to follow.
- Be honest about uncertainty and limitations. Do not invent facts, current events, citations, scheme rules, or personal details. For time-sensitive or high-impact topics, say when information may need verification and recommend a reliable official or qualified source.

CAPABILITIES:
1. Answer general knowledge, explanations, writing, translation, brainstorming, and follow-up questions.
2. Help citizens understand government schemes, eligibility, benefits, documents, and application steps.
3. Ask for profile details only when they are relevant to the user's request, and ask one or two clarifying questions at a time.
4. Acknowledge and use corrections the user makes to their profile.

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
 * Calls NVIDIA NIM API through the same-origin development proxy.
 * @param {Array} messages - Chat history [{sender, text}]
 * @param {Object} profile - Current citizen profile
 * @returns {Promise<Object>} { reply, extractedProfile }
 */
export async function sendNvidiaChatMessage(messages, profile = {}, language = 'en') {
  const systemPrompt = buildSystemPrompt(profile, language);
  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages.slice(-8).map(message => ({
      role: message.sender === 'user' ? 'user' : 'assistant',
      content: message.text
    }))
  ];

  try {
    const response = await fetch("/api/nvidia/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        model: DEFAULT_NVIDIA_MODEL,
        messages: formattedMessages,
        temperature: 0.6,
        top_p: 0.9,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const detail = errData.detail || errData.message;
      throw new Error(detail
        ? `NVIDIA API error (${response.status}): ${detail}`
        : `NVIDIA API error (${response.status}). Check the API key, model access, and NVIDIA service status.`);
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
  } catch (error) {
    console.error("NVIDIA API call failed:", error);
    throw error;
  }
}
