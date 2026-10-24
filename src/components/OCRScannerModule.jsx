import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileCheck, 
  CheckCircle2, 
  Scan, 
  Sparkles, 
  RefreshCw, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  Edit3, 
  FileText, 
  Check, 
  Trash2,
  Info
} from 'lucide-react';

const SAMPLE_DOCUMENTS = [
  {
    id: 'aadhaar',
    title: 'Aadhaar Card (UIDAI)',
    type: 'Identity & Address Proof',
    sampleImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60',
    fileName: 'aadhaar_sample_card.jpg',
    extracted: {
      name: "Ramesh Chandra Sharma",
      dob: "1996-08-14",
      age: 30,
      aadhaarNo: "7849 3920 1928",
      gender: "Male",
      state: "Tamil Nadu",
      district: "Chennai",
      address: "Door No 45, Gandhi Nagar, Chennai, Tamil Nadu - 600028"
    }
  },
  {
    id: 'income',
    title: 'Income Certificate (Revenue Dept)',
    type: 'Annual Income Verification',
    sampleImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60',
    fileName: 'income_cert_2026.pdf',
    extracted: {
      certificateNo: "REV/INC/2026/89402",
      name: "Ramesh Chandra Sharma",
      fatherName: "Suresh Sharma",
      income: 140000,
      state: "Tamil Nadu",
      district: "Chennai",
      issuingAuthority: "Tehsildar Office, Revenue Division"
    }
  },
  {
    id: 'caste',
    title: 'Community Certificate (Caste)',
    type: 'Social Category Proof',
    sampleImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=60',
    fileName: 'community_certificate.jpg',
    extracted: {
      certificateNo: "CC/OBC/2024/7741",
      name: "Ramesh Chandra Sharma",
      category: "OBC",
      state: "Tamil Nadu",
      subCaste: "Yadav / Backward Class",
      issuingAuthority: "Zonal Revenue Officer"
    }
  },
  {
    id: 'disability',
    title: 'UDID Card (Disability Welfare)',
    type: 'Benchmark Disability Proof',
    sampleImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=60',
    fileName: 'udid_disability_card.pdf',
    extracted: {
      udidNo: "TN-CH-2025-004921",
      name: "Ramesh Chandra Sharma",
      disabilityType: "Locomotor Disability",
      disabilityPercentage: 45,
      isDisabled: true,
      state: "Tamil Nadu"
    }
  }
];

export default function OCRScannerModule({ profile, setProfile, onProceedToForm, selectedScheme }) {
  const [selectedDoc, setSelectedDoc] = useState(SAMPLE_DOCUMENTS[0]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [editableValues, setEditableValues] = useState({});
  const [syncSuccess, setSyncSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Trigger scanning process
  const triggerScan = (docData, fileName = 'sample_document.jpg') => {
    setIsScanning(true);
    setScanComplete(false);
    setSyncSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setExtractedData(docData);
      setEditableValues({ ...docData });
    }, 1800);
  };

  const handleSelectSample = (sample) => {
    setSelectedDoc(sample);
    setUploadedFile(null);
    triggerScan(sample.extracted, sample.fileName);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);

    // Heuristically extract or generate simulated scan for user uploaded PDF/Image
    const fileName = file.name.toLowerCase();
    let simulatedExtraction;

    if (fileName.includes('income')) {
      simulatedExtraction = {
        certificateNo: `REV/INC/${Math.floor(100000 + Math.random() * 900000)}`,
        name: profile.name || "Ramesh Chandra Sharma",
        income: 160000,
        state: profile.state || "Tamil Nadu",
        district: profile.district || "Chennai",
        issuingAuthority: "Tehsildar Office"
      };
    } else if (fileName.includes('caste') || fileName.includes('community')) {
      simulatedExtraction = {
        certificateNo: `COMM/CAT/${Math.floor(100000 + Math.random() * 900000)}`,
        name: profile.name || "Ramesh Chandra Sharma",
        category: profile.category || "OBC",
        state: profile.state || "Tamil Nadu"
      };
    } else {
      // Default to Identity extraction
      simulatedExtraction = {
        name: profile.name || "Ramesh Chandra Sharma",
        dob: "1998-05-12",
        age: 28,
        aadhaarNo: "7849 3920 1928",
        gender: profile.gender || "Male",
        state: profile.state || "Tamil Nadu",
        district: profile.district || "Chennai"
      };
    }

    triggerScan(simulatedExtraction, file.name);
  };

  const handleEditChange = (key, val) => {
    setEditableValues(prev => ({
      ...prev,
      [key]: val
    }));
  };

  // Compare editableValues with current profile and find mismatches
  const getMismatches = () => {
    if (!editableValues) return [];
    const mismatches = [];

    if (editableValues.name && profile.name && editableValues.name.trim().toLowerCase() !== profile.name.trim().toLowerCase()) {
      mismatches.push({
        field: 'name',
        label: 'Full Name',
        profileVal: profile.name,
        docVal: editableValues.name
      });
    }

    if (editableValues.age && profile.age && Number(editableValues.age) !== Number(profile.age)) {
      mismatches.push({
        field: 'age',
        label: 'Age',
        profileVal: `${profile.age} Yrs`,
        docVal: `${editableValues.age} Yrs`
      });
    }

    if (editableValues.income !== undefined && profile.income !== undefined && Number(editableValues.income) !== Number(profile.income)) {
      mismatches.push({
        field: 'income',
        label: 'Annual Income',
        profileVal: `₹${Number(profile.income).toLocaleString('en-IN')}`,
        docVal: `₹${Number(editableValues.income).toLocaleString('en-IN')}`
      });
    }

    if (editableValues.category && profile.category && editableValues.category !== profile.category) {
      mismatches.push({
        field: 'category',
        label: 'Social Category',
        profileVal: profile.category,
        docVal: editableValues.category
      });
    }

    if (editableValues.gender && profile.gender && editableValues.gender !== profile.gender) {
      mismatches.push({
        field: 'gender',
        label: 'Gender',
        profileVal: profile.gender,
        docVal: editableValues.gender
      });
    }

    if (editableValues.state && profile.state && editableValues.state !== profile.state) {
      mismatches.push({
        field: 'state',
        label: 'State',
        profileVal: profile.state,
        docVal: editableValues.state
      });
    }

    return mismatches;
  };

  const mismatches = getMismatches();

  // Apply user-reviewed extracted values to citizen profile
  const handleApplyToProfile = () => {
    setProfile(prev => {
      const updated = { ...prev };
      if (editableValues.name) updated.name = editableValues.name;
      if (editableValues.age) updated.age = Number(editableValues.age);
      if (editableValues.income !== undefined) updated.income = Number(editableValues.income);
      if (editableValues.category) updated.category = editableValues.category;
      if (editableValues.gender) updated.gender = editableValues.gender;
      if (editableValues.state) updated.state = editableValues.state;
      if (editableValues.district) updated.district = editableValues.district;
      if (editableValues.isDisabled !== undefined) updated.isDisabled = Boolean(editableValues.isDisabled);
      return updated;
    });

    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 4000);
  };

  const handleResetOCR = () => {
    setScanComplete(false);
    setExtractedData(null);
    setEditableValues({});
    setUploadedFile(null);
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Title & Disclaimer */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '0.3rem 0.85rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          <Scan size={14} /> Document Text Extraction & Auto-Fill Assistant
        </div>
        <h2 style={{ fontSize: '1.65rem', color: 'var(--text-main)', margin: '0.2rem 0 0.4rem 0' }}>
          Smart OCR Document Scanner
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '650px', margin: '0 auto' }}>
          Upload PDF or image certificates (Aadhaar, Income Certificate, Community Certificate, UDID Card) to automatically extract demographic fields and flag data mismatches.
        </p>

        {/* Prominent Statutory Disclaimer */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '8px',
          padding: '0.65rem 1rem',
          maxWidth: '720px',
          margin: '1rem auto 0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textAlign: 'left'
        }}>
          <AlertTriangle size={18} color="#fbbf24" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.78rem', color: '#fde68a', lineHeight: '1.4' }}>
            <strong>Assistance Notice:</strong> Extracted data is for quick auto-fill assistance only and does NOT constitute official legal document verification. Official scrutiny is performed by respective government departments upon portal submission.
          </span>
        </div>
      </div>

      {/* Target Scheme Banner if selected */}
      {selectedScheme && (
        <div style={{ background: 'rgba(5, 150, 105, 0.12)', border: '1px solid #059669', padding: '0.85rem 1.25rem', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>Target Application:</span>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', margin: '0.2rem 0 0 0' }}>{selectedScheme.name}</h4>
          </div>
          <span style={{ fontSize: '0.8rem', background: '#059669', color: '#fff', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: 700 }}>
            Verified Scheme
          </span>
        </div>
      )}

      {/* Upload Drop Zone & Sample Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* File Upload Box */}
        <div 
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          style={{
            border: '2px dashed var(--border-glass)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            background: uploadedFile ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#38bdf8'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-glass)'}
        >
          <UploadCloud size={36} color="#38bdf8" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', margin: '0 0 0.3rem 0' }}>
            {uploadedFile ? uploadedFile.name : "Upload Document (PDF / Image)"}
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            Supports PDF, PNG, JPG, JPEG (Max 10MB)
          </p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="application/pdf,image/png,image/jpeg,image/jpg" 
            style={{ display: 'none' }} 
          />
        </div>

        {/* Sample Document Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Or Test with Verified Sample Certificate:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {SAMPLE_DOCUMENTS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  background: selectedDoc.id === sample.id && !uploadedFile ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${selectedDoc.id === sample.id && !uploadedFile ? '#38bdf8' : 'var(--border-glass)'}`,
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{sample.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sample.type}</div>
                </div>
                <Sparkles size={14} color="#38bdf8" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* OCR Scanner Laser & Processing Simulation */}
      <div className="ocr-scanner-box" style={{ padding: '2rem 1.5rem', marginBottom: '1.5rem' }}>
        {isScanning && <div className="scan-laser" />}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', textAlign: 'center' }}>
          <Scan 
            size={46} 
            color={isScanning ? "#38bdf8" : scanComplete ? "#34d399" : "var(--text-muted)"} 
            className={isScanning ? "animate-pulse" : ""} 
          />
          
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0 }}>
            {isScanning 
              ? "AI OCR Engine Scanning Document Text Regions..." 
              : scanComplete 
              ? "Document Text Successfully Extracted" 
              : "Ready to Scan Selected Document"}
          </h3>
          
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '500px', margin: 0 }}>
            {isScanning 
              ? "Detecting official seals, parsing bilingual headers, extracting name, date of birth, income figures, and certificate identifiers..." 
              : scanComplete 
              ? "Review extracted fields below. Correct any optical misreadings before applying to your profile." 
              : `Click below to scan ${uploadedFile ? uploadedFile.name : selectedDoc.title}.`}
          </p>

          {!isScanning && !scanComplete && (
            <button 
              className="btn-primary" 
              onClick={() => triggerScan(selectedDoc.extracted, selectedDoc.fileName)}
              style={{ marginTop: '0.5rem' }}
            >
              <Sparkles size={16} /> Start Extraction
            </button>
          )}
        </div>
      </div>

      {/* Extracted Values Review Panel */}
      {scanComplete && editableValues && (
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Edit3 size={18} color="#38bdf8" />
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0 }}>
                Review & Edit Extracted Document Values
              </h4>
            </div>

            <button 
              type="button" 
              onClick={handleResetOCR}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
            >
              <Trash2 size={13} /> Clear Extraction
            </button>
          </div>

          {/* Mismatch Alert Box */}
          {mismatches.length > 0 && (
            <div style={{
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              padding: '0.9rem 1.1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <AlertTriangle size={16} /> Profile vs Document Mismatch Flagged ({mismatches.length})
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>
                The evaluation engine noticed differences between your current citizen profile and the extracted document:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {mismatches.map((m, idx) => (
                  <div key={idx} style={{ fontSize: '0.8rem', background: 'rgba(0,0,0,0.2)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                    <strong style={{ color: '#38bdf8' }}>{m.label}:</strong> Current Profile has <span style={{ color: '#f87171' }}>"{m.profileVal}"</span> vs Document shows <span style={{ color: '#34d399' }}>"{m.docVal}"</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Editable Fields Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {Object.entries(editableValues).map(([key, val]) => (
              <div key={key}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input 
                  type="text" 
                  value={val !== undefined ? val.toString() : ''}
                  onChange={(e) => handleEditChange(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={handleApplyToProfile}
              style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
            >
              <CheckCircle2 size={16} /> Apply Extracted Values to Profile
            </button>

            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onProceedToForm}
              style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
            >
              Proceed to Application Draft <ArrowRight size={16} />
            </button>
          </div>

          {syncSuccess && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(5, 150, 105, 0.2)', border: '1px solid #059669', color: '#34d399', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={16} /> Profile successfully updated with reviewed document values! Eligibility scores have been recomputed.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
