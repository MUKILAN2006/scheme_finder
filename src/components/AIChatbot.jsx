import React, { useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
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

=======
import { Send, Bot, User, CheckCircle2, RefreshCw, ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import { parseNaturalLanguageInput } from '../utils/nlpParser';
import { STATES_AND_DISTRICTS, OCCUPATIONS, CATEGORIES, EDUCATION_LEVELS } from '../data/statesAndDistricts';

const QUESTION_FLOW = [
  {
    key: "name",
    question: "Welcome to SchemeFinder AI! I am your AI Welfare Assistant. What is your full name?",
    chips: ["Rajesh Kumar", "Priya Sharma", "Anand V.", "Sunita Devi"]
  },
  {
    key: "age",
    question: "Nice to meet you! How old are you? (Please enter your age in years)",
    chips: ["19 years", "24 years", "32 years", "45 years", "62 years"]
  },
  {
    key: "gender",
    question: "What is your gender?",
    chips: ["Female", "Male", "Transgender"]
  },
  {
    key: "state",
    question: "Which State do you permanently reside in?",
    chips: ["Tamil Nadu", "Madhya Pradesh", "Uttar Pradesh", "Maharashtra", "Karnataka", "Delhi"]
  },
  {
    key: "occupation",
    question: "What is your primary occupation or employment status?",
    chips: ["Student", "Farmer", "Small Business Owner", "Self-Employed", "Laborer", "Housewife", "Unemployed"]
  },
  {
    key: "category",
    question: "Which social category do you belong to?",
    chips: ["General", "OBC", "SC", "ST", "EWS"]
  },
  {
    key: "education",
    question: "What is your highest educational qualification?",
    chips: ["Class 10th Passed", "Class 12th Passed", "Undergraduate Passed", "Postgraduate Passed", "None"]
  },
  {
    key: "income",
    question: "What is your approximate total annual family income?",
    chips: ["₹1.5 Lakhs", "₹2.5 Lakhs", "₹4 Lakhs", "₹6 Lakhs", "₹8 Lakhs+"]
  },
  {
    key: "isDisabled",
    question: "Do you possess a Benchmark Disability Certificate (UDID card, 40%+)?",
    chips: ["No Disability", "Yes (Disabled / UDID Holder)"]
  },
  {
    key: "maritalStatus",
    question: "What is your current marital status?",
    chips: ["Single", "Married", "Widowed"]
  }
];

export default function AIChatbot({ profile, setProfile, onCheckEligibility, audioEnabled }) {
>>>>>>> origin/main
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
<<<<<<< HEAD
      text: "Namaste & Vanakkam! 🙏 I am YojanaSetu AI, powered by NVIDIA NIM (`meta/llama-3.2-11b-vision-instruct`).\n\nI can converse in **English and Tamil (தமிழ்)**, understand your personal situation, ask clarifying follow-ups, and help you discover every government scheme, subsidy, scholarship, and pension you are eligible for.",
=======
      text: "Namaste! I am your AI Government Scheme Eligibility Assistant. I will help you discover all welfare schemes, pensions, scholarships, and loans you qualify for.",
>>>>>>> origin/main
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 2,
      sender: "bot",
<<<<<<< HEAD
      text: "To get started, tell me a little about yourself (such as your name, age, state of residence, and occupation or goals), or ask any question about government welfare schemes!",
=======
      text: QUESTION_FLOW[0].question,
      chips: QUESTION_FLOW[0].chips,
>>>>>>> origin/main
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

<<<<<<< HEAD
  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
=======
  const [inputVal, setInputVal] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
>>>>>>> origin/main

  // Voice narration helper
  const speakText = (text) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
<<<<<<< HEAD
    // Clean markdown asterisks and symbols before speaking
    const cleanSpeech = text.replace(/[*#_`]/g, '').slice(0, 300);
    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
=======
    const utterance = new SpeechSynthesisUtterance(text);
>>>>>>> origin/main
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

<<<<<<< HEAD
  const handleSend = async (textToSend = null) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    // 1. Append user message to UI
=======
  const handleSend = (textToSend = null) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    // 1. Add user message
>>>>>>> origin/main
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

<<<<<<< HEAD
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
=======
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    // 2. Parse NLP extracted data
    const updatedProfile = parseNaturalLanguageInput(query, profile);

    // Also explicitly set the expected question key if direct chip was clicked
    const currentQ = QUESTION_FLOW[stepIndex];
    if (currentQ) {
      if (currentQ.key === 'age') {
        const num = parseInt(query, 10);
        if (!isNaN(num)) updatedProfile.age = num;
      } else if (currentQ.key === 'isDisabled') {
        updatedProfile.isDisabled = query.toLowerCase().includes('yes');
      } else if (currentQ.key === 'income') {
        if (query.includes('1.5')) updatedProfile.income = 150000;
        else if (query.includes('2.5')) updatedProfile.income = 250000;
        else if (query.includes('4')) updatedProfile.income = 400000;
        else if (query.includes('6')) updatedProfile.income = 600000;
        else if (query.includes('8')) updatedProfile.income = 800000;
      } else if (['gender', 'state', 'occupation', 'category', 'education', 'maritalStatus', 'name'].includes(currentQ.key)) {
        if (!updatedProfile[currentQ.key]) {
          updatedProfile[currentQ.key] = query;
        }
      }
    }

    setProfile(updatedProfile);

    // 3. Advance to next question or complete
    setTimeout(() => {
      const nextStep = stepIndex + 1;
      if (nextStep < QUESTION_FLOW.length) {
        setStepIndex(nextStep);
        const nextQ = QUESTION_FLOW[nextStep];
        const botResponseText = `Got it! ${nextQ.question}`;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: botResponseText,
            chips: nextQ.chips,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        speakText(botResponseText);
      } else {
        const finalBotText = `Thank you ${updatedProfile.name || 'Citizen'}! I have collected your complete profile. Click below to analyze your eligibility against 16+ Government Welfare Schemes.`;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: finalBotText,
            isComplete: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        speakText(finalBotText);
      }
    }, 600);
  };

  const handleReset = () => {
    setProfile({});
    setStepIndex(0);
>>>>>>> origin/main
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
<<<<<<< HEAD
        text: "Conversation reset! Let's start fresh. Tell me your age, occupation, and state, or ask about any government scheme in English or Tamil (தமிழ்).",
=======
        text: "Conversation reset! Let's start fresh. What is your full name?",
        chips: QUESTION_FLOW[0].chips,
>>>>>>> origin/main
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

<<<<<<< HEAD
  // Profile completeness calculation
=======
  // Calculate profile completeness score
>>>>>>> origin/main
  const profileKeys = ['name', 'age', 'gender', 'state', 'occupation', 'category', 'education', 'income'];
  const filledCount = profileKeys.filter(k => profile[k] !== undefined && profile[k] !== null && profile[k] !== "").length;
  const progressPercent = Math.round((filledCount / profileKeys.length) * 100);

  return (
    <div className="chatbot-container">
      {/* Main Interactive Chat Box */}
      <div className="glass-card chat-box">
<<<<<<< HEAD
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
=======
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bot size={22} color="#38bdf8" />
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>AI Welfare Schemes Assistant</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Natural Language Intake Active</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" onClick={handleReset} style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}>
>>>>>>> origin/main
              <RefreshCw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="chat-messages-area">
          {messages.map((msg) => (
<<<<<<< HEAD
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
=======
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div className={`chat-bubble ${msg.sender}`}>
                <p>{msg.text}</p>
                {msg.sender === 'bot' && audioEnabled && (
                  <button
                    onClick={() => speakText(msg.text)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#38bdf8', marginTop: '4px' }}
                    title="Listen"
                  >
                    <Volume2 size={14} />
                  </button>
                )}
                <span style={{ fontSize: '0.65rem', opacity: 0.6, display: 'block', marginTop: '4px', textAlign: 'right' }}>
                  {msg.timestamp}
                </span>
              </div>

              {/* Quick Reply Option Chips */}
              {msg.chips && msg.sender === 'bot' && (
                <div className="chat-quick-chips">
                  {msg.chips.map((chip, idx) => (
                    <button key={idx} className="chip-btn" onClick={() => handleSend(chip)}>
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Completion Action Card */}
              {msg.isComplete && (
                <div style={{ marginTop: '1rem', width: '100%' }}>
                  <button className="btn-primary" onClick={onCheckEligibility} style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                    <Sparkles size={20} /> Run Eligibility Analysis Engine <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your response or enter details in plain English..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="btn-primary" onClick={() => handleSend()}>
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Live Profile Parser Summary Panel */}
      <div className="glass-card profile-summary-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.25rem', color: '#38bdf8' }}>
            Live Parsed Profile
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            NLP Engine real-time extracted attributes
          </p>
        </div>

        {/* Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
            <span>Profile Completeness</span>
            <span style={{ color: '#34d399' }}>{progressPercent}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #0284c7, #34d399)', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Attribute List */}
        <div style={{ flex: 1 }}>
          <div className="profile-field-item">
            <span className="profile-field-label">Name:</span>
            <span className={`profile-field-val ${!profile.name ? 'empty' : ''}`}>{profile.name || 'Not specified'}</span>
          </div>
          <div className="profile-field-item">
            <span className="profile-field-label">Age:</span>
            <span className={`profile-field-val ${!profile.age ? 'empty' : ''}`}>{profile.age ? `${profile.age} Years` : 'Not specified'}</span>
          </div>
          <div className="profile-field-item">
            <span className="profile-field-label">Gender:</span>
            <span className={`profile-field-val ${!profile.gender ? 'empty' : ''}`}>{profile.gender || 'Not specified'}</span>
          </div>
          <div className="profile-field-item">
            <span className="profile-field-label">State:</span>
            <span className={`profile-field-val ${!profile.state ? 'empty' : ''}`}>{profile.state || 'Not specified'}</span>
          </div>
          <div className="profile-field-item">
            <span className="profile-field-label">Occupation:</span>
            <span className={`profile-field-val ${!profile.occupation ? 'empty' : ''}`}>{profile.occupation || 'Not specified'}</span>
          </div>
          <div className="profile-field-item">
            <span className="profile-field-label">Category:</span>
            <span className={`profile-field-val ${!profile.category ? 'empty' : ''}`}>{profile.category || 'Not specified'}</span>
          </div>
          <div className="profile-field-item">
            <span className="profile-field-label">Education:</span>
            <span className={`profile-field-val ${!profile.education ? 'empty' : ''}`}>{profile.education || 'Not specified'}</span>
          </div>
          <div className="profile-field-item">
            <span className="profile-field-label">Annual Income:</span>
            <span className={`profile-field-val ${!profile.income ? 'empty' : ''}`}>
              {profile.income !== undefined && profile.income !== null ? `₹${profile.income.toLocaleString('en-IN')}` : 'Not specified'}
            </span>
          </div>
          <div className="profile-field-item">
            <span className="profile-field-label">Disability (UDID):</span>
            <span className="profile-field-val">{profile.isDisabled ? 'Yes (40%+)' : 'No'}</span>
          </div>
        </div>

        <button className="btn-primary" onClick={onCheckEligibility} style={{ justifyContent: 'center', width: '100%' }}>
          <CheckCircle2 size={18} /> Find Eligible Schemes
        </button>
>>>>>>> origin/main
      </div>
    </div>
  );
}
