import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AIChatbot from './components/AIChatbot';
import ProfileForm from './components/ProfileForm';
import EligibilityResults from './components/EligibilityResults';
import SchemeDetailModal from './components/SchemeDetailModal';
import OCRScannerModule from './components/OCRScannerModule';
import ApplicationFormModal from './components/ApplicationFormModal';
<<<<<<< HEAD
import PrivacyDataModal from './components/PrivacyDataModal';

import { SCHEMES_DATA } from './data/schemes';
import { evaluateAllSchemes } from './utils/eligibilityEngine';
import { Bot, UserCheck, Sparkles, Scan, FileCheck, Bookmark } from 'lucide-react';

const DEFAULT_PROFILE = {
  name: 'Rajesh Kumar',
  age: 28,
  gender: 'Male',
  state: 'Tamil Nadu',
  district: 'Chennai',
  occupation: 'Farmer',
  category: 'OBC',
  education: 'Class 10th Passed',
  income: 180000,
  isDisabled: false,
  maritalStatus: 'Married',
  ownsLand: true,
  hasBplCard: false,
  isStudent: false
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ys_theme') || 'dark');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('results'); // 'results' | 'form' | 'ocr' | 'chat'

  // Citizen profile state with localStorage persistence
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('ys_citizen_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  });

  // Bookmarked / Saved schemes with localStorage persistence
  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const saved = localStorage.getItem('ys_saved_schemes');
      return saved ? JSON.parse(saved) : ['pm-kisan', 'ayushman-bharat'];
    } catch (e) {
      return ['pm-kisan', 'ayushman-bharat'];
    }
=======

import { SCHEMES_DATA } from './data/schemes';
import { evaluateAllSchemes } from './utils/eligibilityEngine';
import { Bot, UserCheck, Sparkles, Scan, FileCheck } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'form' | 'results' | 'ocr'

  // Citizen profile state
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    age: 24,
    gender: 'Male',
    state: 'Tamil Nadu',
    district: 'Chennai',
    occupation: 'Farmer',
    category: 'OBC',
    education: 'Class 10th Passed',
    income: 180000,
    isDisabled: false,
    maritalStatus: 'Single'
>>>>>>> origin/main
  });

  // Evaluated schemes list
  const [evaluatedSchemes, setEvaluatedSchemes] = useState([]);

  // Modals state
  const [detailModalScheme, setDetailModalScheme] = useState(null);
  const [detailModalEvaluation, setDetailModalEvaluation] = useState(null);
  const [appFormScheme, setAppFormScheme] = useState(null);
<<<<<<< HEAD
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
=======
>>>>>>> origin/main

  // Sync evaluation whenever profile updates
  useEffect(() => {
    const results = evaluateAllSchemes(profile, SCHEMES_DATA);
    setEvaluatedSchemes(results);
<<<<<<< HEAD
    try {
      localStorage.setItem('ys_citizen_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not save profile to localStorage:', e);
    }
  }, [profile]);

  // Sync saved schemes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ys_saved_schemes', JSON.stringify(savedSchemeIds));
    } catch (e) {
      console.warn('Could not save bookmarks to localStorage:', e);
    }
  }, [savedSchemeIds]);

  // Apply theme attribute to body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ys_theme', theme);
=======
  }, [profile]);

  // Apply theme attribute to body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
>>>>>>> origin/main
  }, [theme]);

  const handleRunEligibility = () => {
    const results = evaluateAllSchemes(profile, SCHEMES_DATA);
    setEvaluatedSchemes(results);
    setActiveTab('results');
  };

<<<<<<< HEAD
  const handleToggleSaveScheme = (schemeId) => {
    setSavedSchemeIds(prev => 
      prev.includes(schemeId) 
        ? prev.filter(id => id !== schemeId) 
        : [...prev, schemeId]
    );
  };

  const handleClearAllData = () => {
    try {
      localStorage.removeItem('ys_citizen_profile');
      localStorage.removeItem('ys_saved_schemes');
    } catch (e) {}
    setProfile({
      name: '',
      age: 25,
      gender: 'Male',
      state: 'Tamil Nadu',
      district: 'Chennai',
      occupation: 'Farmer',
      category: 'General',
      education: 'None',
      income: 200000,
      isDisabled: false,
      maritalStatus: 'Single',
      ownsLand: false,
      hasBplCard: false,
      isStudent: false
    });
    setSavedSchemeIds([]);
  };

  const eligibleCount = evaluatedSchemes.filter(s => s.status === 'Eligible').length;

=======
  const handleOpenOCRForScheme = (scheme) => {
    setAppFormScheme(scheme);
    setActiveTab('ocr');
  };

>>>>>>> origin/main
  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        audioEnabled={audioEnabled} 
        setAudioEnabled={setAudioEnabled} 
        language={language} 
        setLanguage={setLanguage}
        onOpenOCR={() => setActiveTab('ocr')}
<<<<<<< HEAD
        onOpenPrivacy={() => setShowPrivacyModal(true)}
        savedCount={savedSchemeIds.length}
        onViewSaved={() => {
          setActiveTab('results');
        }}
=======
>>>>>>> origin/main
      />

      {/* Main Feature Tabs */}
      <nav className="main-nav-tabs">
        <button 
<<<<<<< HEAD
          className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          <Sparkles size={18} /> Scheme Discovery ({eligibleCount} Eligible)
        </button>

        <button 
          className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <UserCheck size={18} /> Citizen Profile
        </button>

        <button 
          className={`tab-btn ${activeTab === 'ocr' ? 'active' : ''}`}
          onClick={() => setActiveTab('ocr')}
        >
          <Scan size={18} /> OCR Scanner & Verification
        </button>

        <button 
=======
>>>>>>> origin/main
          className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <Bot size={18} /> AI Chatbot Intake
        </button>
<<<<<<< HEAD
=======

        <button 
          className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <UserCheck size={18} /> Quick Profile Form
        </button>

        <button 
          className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          <Sparkles size={18} /> Eligible Schemes Dashboard ({evaluatedSchemes.filter(s => s.isEligible).length})
        </button>

        <button 
          className={`tab-btn ${activeTab === 'ocr' ? 'active' : ''}`}
          onClick={() => setActiveTab('ocr')}
        >
          <Scan size={18} /> OCR Document Scanner
        </button>
>>>>>>> origin/main
      </nav>

      {/* Main View Area */}
      <main className="main-content">
<<<<<<< HEAD
        {activeTab === 'results' && (
          <EligibilityResults 
            evaluatedSchemes={evaluatedSchemes} 
            profile={profile}
            onSelectScheme={(scheme, evalItem) => {
              setDetailModalScheme(scheme);
              setDetailModalEvaluation(evalItem);
            }}
            onOpenOCR={(scheme) => {
              setAppFormScheme(scheme);
              setActiveTab('ocr');
            }}
            onOpenDraftModal={(scheme) => setAppFormScheme(scheme)}
            savedSchemeIds={savedSchemeIds}
            onToggleSaveScheme={handleToggleSaveScheme}
=======
        {activeTab === 'chat' && (
          <AIChatbot 
            profile={profile} 
            setProfile={setProfile} 
            onCheckEligibility={handleRunEligibility} 
            audioEnabled={audioEnabled}
>>>>>>> origin/main
          />
        )}

        {activeTab === 'form' && (
          <ProfileForm 
            profile={profile} 
            setProfile={setProfile} 
            onCheckEligibility={handleRunEligibility} 
          />
        )}

<<<<<<< HEAD
=======
        {activeTab === 'results' && (
          <EligibilityResults 
            evaluatedSchemes={evaluatedSchemes} 
            profile={profile}
            onSelectScheme={(scheme, evalItem) => {
              setDetailModalScheme(scheme);
              setDetailModalEvaluation(evalItem);
            }}
            onOpenOCR={(scheme) => handleOpenOCRForScheme(scheme)}
          />
        )}

>>>>>>> origin/main
        {activeTab === 'ocr' && (
          <OCRScannerModule 
            profile={profile}
            setProfile={setProfile}
<<<<<<< HEAD
            selectedScheme={appFormScheme || evaluatedSchemes[0]?.scheme || SCHEMES_DATA[0]}
            onProceedToForm={() => {
              const target = appFormScheme || evaluatedSchemes[0]?.scheme || SCHEMES_DATA[0];
              setAppFormScheme(target);
            }}
          />
        )}

        {activeTab === 'chat' && (
          <AIChatbot 
            profile={profile} 
            setProfile={setProfile} 
            onCheckEligibility={handleRunEligibility} 
            audioEnabled={audioEnabled}
          />
        )}
=======
            selectedScheme={appFormScheme || SCHEMES_DATA[0]}
            onProceedToForm={() => {
              if (!appFormScheme) setAppFormScheme(SCHEMES_DATA[0]);
            }}
          />
        )}
>>>>>>> origin/main
      </main>

      {/* Detail Scheme Modal */}
      {detailModalScheme && (
        <SchemeDetailModal 
          scheme={detailModalScheme}
          evaluation={detailModalEvaluation}
          onClose={() => setDetailModalScheme(null)}
<<<<<<< HEAD
          onApplyDraft={(scheme) => {
            setDetailModalScheme(null);
            setAppFormScheme(scheme);
=======
          onApplyNow={(scheme) => {
            setDetailModalScheme(null);
            handleOpenOCRForScheme(scheme);
>>>>>>> origin/main
          }}
        />
      )}

      {/* Application Form & Receipt Modal */}
      {appFormScheme && (
        <ApplicationFormModal 
          scheme={appFormScheme}
          profile={profile}
          onClose={() => setAppFormScheme(null)}
        />
      )}
<<<<<<< HEAD

      {/* Privacy & Local Data Management Modal */}
      {showPrivacyModal && (
        <PrivacyDataModal 
          onClose={() => setShowPrivacyModal(false)}
          onClearAllData={handleClearAllData}
          profile={profile}
          savedCount={savedSchemeIds.length}
        />
      )}
=======
>>>>>>> origin/main
    </div>
  );
}
