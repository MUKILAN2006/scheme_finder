import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Cpu, 
  AlertCircle, 
  Check, 
  MessageSquare,
  HelpCircle,
  Languages
} from 'lucide-react';
import { sendNvidiaChatMessage, DEFAULT_NVIDIA_MODEL } from '../utils/nvidiaChatService';
import { parseNaturalLanguageInput } from '../utils/nlpParser';

const STARTER_PROMPTS = [
  "I am a college student from Tamil Nadu. What scholarships can I get?",
  "வணக்கம்! விவசாயிகளுக்கான மத்திய அரசு திட்டங்கள் என்னென்ன?",
  "I run a small street food stall in UP. Can I get a business loan?",
  "I am a 32-year-old woman entrepreneur. Tell me about Stand-Up India.",
  "What is the maximum income limit for PM Awas Yojana?"
];

export default function AIChatbot({ profile, setProfile, onCheckEligibility, audioEnabled }) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Namaste & Vanakkam! 🙏 I am YojanaSetu AI, powered by NVIDIA NIM (`meta/llama-3.2-11b-vision-instruct`).\n\nI can converse in **English and Tamil (தமிழ்)**, understand your personal situation, ask clarifying follow-ups, and help you discover every government scheme, subsidy, scholarship, and pension you are eligible for.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 2,
      sender: "bot",
      text: "To get started, tell me a little about yourself (such as your name, age, state of residence, and occupation or goals), or ask any question about government welfare schemes!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Voice narration helper
  const speakText = (text) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    // Clean markdown asterisks and symbols before speaking
    const cleanSpeech = text.replace(/[*#_`]/g, '').slice(0, 300);
    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend = null) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    // 1. Append user message to UI
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInputVal("");
    setIsLoading(true);

    // 2. Pre-extract with fast local NLP parser
    const locallyUpdated = parseNaturalLanguageInput(query, profile);
    setProfile(locallyUpdated);

    try {
      // 3. Call NVIDIA NIM API with meta/llama-3.2-11b-vision-instruct
      const result = await sendNvidiaChatMessage(newMessages, locallyUpdated);

      // Merge any LLM-extracted profile updates
      if (result.extractedProfile && Object.keys(result.extractedProfile).length > 0) {
        setProfile(prev => ({
          ...prev,
          ...result.extractedProfile
        }));
      }

      // Add AI response
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(result.reply);
    } catch (err) {
      console.error("NVIDIA Chatbot error:", err);

      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      const fallbackText = `I couldn't get an AI response. ${errorMessage} Please check your NVIDIA API key and internet connection, then try again.`;
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setProfile({
      name: '',
      age: 25,
      gender: 'Male',
      state: 'Tamil Nadu',
      district: 'Chennai',
      occupation: 'Farmer',
      category: 'General',
      education: 'Class 10th Passed',
      income: 180000,
      isDisabled: false,
      maritalStatus: 'Single',
      ownsLand: false,
      hasBplCard: false,
      isStudent: false
    });
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: "Conversation reset! Let's start fresh. Tell me your age, occupation, and state, or ask about any government scheme in English or Tamil (தமிழ்).",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Profile completeness calculation
  const profileKeys = ['name', 'age', 'gender', 'state', 'occupation', 'category', 'education', 'income'];
  const filledCount = profileKeys.filter(k => profile[k] !== undefined && profile[k] !== null && profile[k] !== "").length;
  const progressPercent = Math.round((filledCount / profileKeys.length) * 100);

  return (
    <div className="chatbot-container">
      {/* Main Interactive Chat Box */}
      <div className="glass-card chat-box">
        {/* Header Bar */}
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ position: 'relative' }}>
              <Bot size={24} color="#38bdf8" />
              <span style={{ position: 'absolute', bottom: -2, right: -2, width: '8px', height: '8px', background: '#34d399', borderRadius: '50%' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0 }}>
                  YojanaSetu AI Assistant
                </h3>
                <span style={{ fontSize: '0.68rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.15rem 0.45rem', borderRadius: '10px', fontWeight: 700 }}>
                  NVIDIA NIM
                </span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                Model: <strong style={{ color: 'var(--text-main)' }}>meta/llama-3.2-11b-vision-instruct</strong> • English & Tamil
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#34d399' }}>
              <Cpu size={14} /> NVIDIA NIM
            </span>

            <button 
              className="btn-secondary" 
              onClick={handleReset} 
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
              title="Reset conversation"
            >
              <RefreshCw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="chat-messages-area">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' 
              }}
            >
              <div className={`chat-bubble ${msg.sender}`}>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  {msg.text}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', gap: '0.5rem' }}>
                  {msg.sender === 'bot' && audioEnabled && (
                    <button
                      onClick={() => speakText(msg.text)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#38bdf8', padding: 0 }}
                      title="Listen with Text-to-Speech"
                    >
                      <Volume2 size={13} />
                    </button>
                  )}
                  <span style={{ fontSize: '0.65rem', opacity: 0.6, marginLeft: 'auto' }}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', width: 'fit-content' }}>
              <Sparkles size={16} color="#38bdf8" className="animate-spin" />
              <span style={{ fontSize: '0.82rem', color: '#38bdf8' }}>
                NVIDIA AI is preparing a response...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Starters */}
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.15)', borderTop: '1px solid var(--border-glass)', display: 'flex', gap: '0.4rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', paddingRight: '0.3rem' }}>
            <Languages size={13} /> Suggested:
          </span>
          {STARTER_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(prompt)}
              style={{
                fontSize: '0.74rem',
                padding: '0.25rem 0.65rem',
                borderRadius: '14px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="chat-input-area">
          <input 
            type="text" 
            placeholder="Ask me anything in English or Tamil..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading || !inputVal.trim()}
            style={{ opacity: isLoading || !inputVal.trim() ? 0.6 : 1 }}
          >
            <Send size={16} /> Send
          </button>
        </form>
      </div>

      {/* Side Profile Live Extraction Widget */}
      <div className="glass-card profile-summary-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={18} color="#38bdf8" />
              <h4 style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-main)' }}>
                Live Extracted Profile
              </h4>
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: progressPercent === 100 ? '#34d399' : '#38bdf8' }}>
              {progressPercent}% Complete
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ height: '100%', width: `${progressPercent}%`, background: progressPercent === 100 ? '#34d399' : '#38bdf8', transition: 'width 0.3s' }} />
          </div>

          {/* Field Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
            <div className="profile-field-item">
              <span className="profile-field-label">Name:</span>
              <span className={profile.name ? "profile-field-val" : "profile-field-val empty"}>
                {profile.name || "Awaiting input..."}
              </span>
            </div>

            <div className="profile-field-item">
              <span className="profile-field-label">Age:</span>
              <span className={profile.age ? "profile-field-val" : "profile-field-val empty"}>
                {profile.age ? `${profile.age} Years` : "Not specified"}
              </span>
            </div>

            <div className="profile-field-item">
              <span className="profile-field-label">Gender:</span>
              <span className={profile.gender ? "profile-field-val" : "profile-field-val empty"}>
                {profile.gender || "Not specified"}
              </span>
            </div>

            <div className="profile-field-item">
              <span className="profile-field-label">State:</span>
              <span className={profile.state ? "profile-field-val" : "profile-field-val empty"}>
                {profile.state || "Not specified"}
              </span>
            </div>

            <div className="profile-field-item">
              <span className="profile-field-label">Occupation:</span>
              <span className={profile.occupation ? "profile-field-val" : "profile-field-val empty"}>
                {profile.occupation || "Not specified"}
              </span>
            </div>

            <div className="profile-field-item">
              <span className="profile-field-label">Category:</span>
              <span className={profile.category ? "profile-field-val" : "profile-field-val empty"}>
                {profile.category || "General"}
              </span>
            </div>

            <div className="profile-field-item">
              <span className="profile-field-label">Annual Income:</span>
              <span className={profile.income ? "profile-field-val" : "profile-field-val empty"}>
                {profile.income ? `₹${Number(profile.income).toLocaleString('en-IN')}` : "Not specified"}
              </span>
            </div>

            <div className="profile-field-item">
              <span className="profile-field-label">Land Owned:</span>
              <span className="profile-field-val">
                {profile.ownsLand ? "Yes" : "No"}
              </span>
            </div>

            <div className="profile-field-item">
              <span className="profile-field-label">Disability (UDID):</span>
              <span className="profile-field-val">
                {profile.isDisabled ? "Yes (40%+)" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* CTA to run eligibility analysis */}
        <div style={{ marginTop: '1.25rem' }}>
          <button 
            type="button"
            className="btn-primary" 
            onClick={onCheckEligibility}
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '0.75rem' }}
          >
            <Sparkles size={16} /> Run Eligibility Analysis
          </button>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.4rem', margin: 0 }}>
            Applies extracted credentials against verified government rules.
          </p>
        </div>
      </div>
    </div>
  );
}
