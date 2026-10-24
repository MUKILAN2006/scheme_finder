import React from 'react';
<<<<<<< HEAD
import { ShieldCheck, Moon, Sun, Volume2, VolumeX, Sparkles, Lock, Bookmark } from 'lucide-react';
=======
import { ShieldCheck, Moon, Sun, Volume2, VolumeX, Sparkles, FileText } from 'lucide-react';
>>>>>>> origin/main

export default function Header({ 
  theme, 
  setTheme, 
  audioEnabled, 
  setAudioEnabled, 
  language, 
  setLanguage,
<<<<<<< HEAD
  onOpenOCR,
  onOpenPrivacy,
  savedCount = 0,
  onViewSaved
=======
  onOpenOCR 
>>>>>>> origin/main
}) {
  return (
    <header className="header-bar">
      <div className="header-logo-group">
        <div className="logo-badge">
          YS
        </div>
        <div className="logo-text">
          <h1>YojanaSetu AI</h1>
<<<<<<< HEAD
          <p>Government Scheme Discovery & Application Assistance System</p>
=======
          <p>Government Scheme Eligibility Assistant & Auto-Filing Engine</p>
>>>>>>> origin/main
        </div>
      </div>

      <div className="header-controls">
<<<<<<< HEAD
        {/* Bookmarked schemes pill if any */}
        {savedCount > 0 && (
          <button 
            className="btn-ctrl"
            onClick={onViewSaved}
            style={{ background: 'rgba(56, 189, 248, 0.15)', borderColor: '#38bdf8', color: '#38bdf8' }}
            title="View Bookmarked Schemes"
          >
            <Bookmark size={15} />
            <span>Saved ({savedCount})</span>
          </button>
        )}

        {/* Privacy & Data Management */}
        <button 
          className="btn-ctrl" 
          onClick={onOpenPrivacy}
          title="Citizen Privacy & Local Data Management"
        >
          <Lock size={15} color="#38bdf8" />
          <span>Privacy & Data</span>
        </button>

        {/* Voice Toggle */}
=======
>>>>>>> origin/main
        <button 
          className="btn-ctrl" 
          onClick={() => setAudioEnabled(!audioEnabled)}
          title="Toggle Text-to-Speech Voice Guidance"
        >
<<<<<<< HEAD
          {audioEnabled ? <Volume2 size={16} color="#34d399" /> : <VolumeX size={16} />}
          <span>{audioEnabled ? "Voice ON" : "Voice OFF"}</span>
        </button>

        {/* Smart OCR shortcut */}
        <button 
          className="btn-ctrl" 
          onClick={onOpenOCR}
          style={{ background: 'rgba(2, 132, 199, 0.15)', borderColor: '#0284c7' }}
          title="Document Verification & Form Builder"
        >
          <Sparkles size={15} color="#38bdf8" />
          <span>OCR Scanner</span>
        </button>

        {/* Language selector */}
=======
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

>>>>>>> origin/main
        <select 
          className="btn-ctrl" 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          style={{ cursor: 'pointer' }}
<<<<<<< HEAD
          aria-label="Interface Language"
=======
>>>>>>> origin/main
        >
          <option value="en">English (English)</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
        </select>

<<<<<<< HEAD
        {/* Theme Toggle */}
        <button 
          className="btn-ctrl" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle Light/Dark Theme"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#1e40af" />}
=======
        <button 
          className="btn-ctrl" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#1e40af" />}
>>>>>>> origin/main
        </button>
      </div>
    </header>
  );
}
