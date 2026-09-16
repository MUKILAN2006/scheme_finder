import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AIChatbot from './components/AIChatbot';
import ProfileForm from './components/ProfileForm';
import EligibilityResults from './components/EligibilityResults';
import SchemeDetailModal from './components/SchemeDetailModal';
import OCRScannerModule from './components/OCRScannerModule';
import ApplicationFormModal from './components/ApplicationFormModal';

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
  });

  // Evaluated schemes list
  const [evaluatedSchemes, setEvaluatedSchemes] = useState([]);

  // Modals state
  const [detailModalScheme, setDetailModalScheme] = useState(null);
  const [detailModalEvaluation, setDetailModalEvaluation] = useState(null);
  const [appFormScheme, setAppFormScheme] = useState(null);

  // Sync evaluation whenever profile updates
  useEffect(() => {
    const results = evaluateAllSchemes(profile, SCHEMES_DATA);
    setEvaluatedSchemes(results);
  }, [profile]);

  // Apply theme attribute to body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleRunEligibility = () => {
    const results = evaluateAllSchemes(profile, SCHEMES_DATA);
    setEvaluatedSchemes(results);
    setActiveTab('results');
  };

  const handleOpenOCRForScheme = (scheme) => {
    setAppFormScheme(scheme);
    setActiveTab('ocr');
  };

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
      />

      {/* Main Feature Tabs */}
      <nav className="main-nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <Bot size={18} /> AI Chatbot Intake
        </button>

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
      </nav>

      {/* Main View Area */}
      <main className="main-content">
        {activeTab === 'chat' && (
          <AIChatbot 
            profile={profile} 
            setProfile={setProfile} 
            onCheckEligibility={handleRunEligibility} 
            audioEnabled={audioEnabled}
          />
        )}

        {activeTab === 'form' && (
          <ProfileForm 
            profile={profile} 
            setProfile={setProfile} 
            onCheckEligibility={handleRunEligibility} 
          />
        )}

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

        {activeTab === 'ocr' && (
          <OCRScannerModule 
            profile={profile}
            setProfile={setProfile}
            selectedScheme={appFormScheme || SCHEMES_DATA[0]}
            onProceedToForm={() => {
              if (!appFormScheme) setAppFormScheme(SCHEMES_DATA[0]);
            }}
          />
        )}
      </main>

      {/* Detail Scheme Modal */}
      {detailModalScheme && (
        <SchemeDetailModal 
          scheme={detailModalScheme}
          evaluation={detailModalEvaluation}
          onClose={() => setDetailModalScheme(null)}
          onApplyNow={(scheme) => {
            setDetailModalScheme(null);
            handleOpenOCRForScheme(scheme);
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
    </div>
  );
}
