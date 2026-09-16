import React, { useState, useEffect, useRef } from 'react';
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
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Namaste! I am your AI Government Scheme Eligibility Assistant. I will help you discover all welfare schemes, pensions, scholarships, and loans you qualify for.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 2,
      sender: "bot",
      text: QUESTION_FLOW[0].question,
      chips: QUESTION_FLOW[0].chips,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice narration helper
  const speakText = (text) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textToSend = null) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    // 1. Add user message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

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
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: "Conversation reset! Let's start fresh. What is your full name?",
        chips: QUESTION_FLOW[0].chips,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Calculate profile completeness score
  const profileKeys = ['name', 'age', 'gender', 'state', 'occupation', 'category', 'education', 'income'];
  const filledCount = profileKeys.filter(k => profile[k] !== undefined && profile[k] !== null && profile[k] !== "").length;
  const progressPercent = Math.round((filledCount / profileKeys.length) * 100);

  return (
    <div className="chatbot-container">
      {/* Main Interactive Chat Box */}
      <div className="glass-card chat-box">
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
              <RefreshCw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="chat-messages-area">
          {messages.map((msg) => (
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
      </div>
    </div>
  );
}
