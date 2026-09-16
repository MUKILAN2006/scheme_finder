import React from 'react';
import { ShieldCheck, Moon, Sun, Volume2, VolumeX, Sparkles, FileText } from 'lucide-react';

export default function Header({ 
  theme, 
  setTheme, 
  audioEnabled, 
  setAudioEnabled, 
  language, 
  setLanguage,
  onOpenOCR 
}) {
  return (
    <header className="header-bar">
      <div className="header-logo-group">
        <div className="logo-badge">
          YS
        </div>
        <div className="logo-text">
          <h1>YojanaSetu AI</h1>
          <p>Government Scheme Eligibility Assistant & Auto-Filing Engine</p>
        </div>
      </div>

      <div className="header-controls">
        <button 
          className="btn-ctrl" 
          onClick={() => setAudioEnabled(!audioEnabled)}
          title="Toggle Text-to-Speech Voice Guidance"
        >
          {audioEnabled ? <Volume2 size={18} color="#34d399" /> : <VolumeX size={18} />}
          <span>{audioEnabled ? "Voice ON" : "Voice OFF"}</span>
        </button>

        <button 
          className="btn-ctrl" 
          onClick={onOpenOCR}
          style={{ background: 'rgba(2, 132, 199, 0.2)', borderColor: '#0284c7' }}
          title="Document Verification & Form Builder"
        >
          <Sparkles size={16} color="#38bdf8" />
          <span>Smart OCR Scanner</span>
        </button>

        <select 
          className="btn-ctrl" 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          style={{ cursor: 'pointer' }}
        >
          <option value="en">English (English)</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
        </select>

        <button 
          className="btn-ctrl" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#1e40af" />}
        </button>
      </div>
    </header>
  );
}
