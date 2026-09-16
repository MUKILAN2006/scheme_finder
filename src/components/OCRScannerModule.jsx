import React, { useState } from 'react';
import { UploadCloud, FileCheck, CheckCircle2, Scan, Sparkles, RefreshCw, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const DEMO_DOCUMENTS = [
  {
    id: 'aadhaar',
    title: 'Aadhaar Card (UIDAI)',
    type: 'Identity Proof',
    sampleImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60',
    extracted: {
      name: "Ramesh Chandra Sharma",
      dob: "14/08/1998",
      aadhaarNo: "7849 3920 1928",
      gender: "Male",
      address: "Door No 45, Gandhi Nagar, Chennai, Tamil Nadu - 600028"
    }
  },
  {
    id: 'income',
    title: 'Income Certificate (Revenue Dept)',
    type: 'Income Proof',
    sampleImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60',
    extracted: {
      certificateNo: "REV/INC/2026/89402",
      name: "Ramesh Chandra Sharma",
      fatherName: "Suresh Sharma",
      annualIncome: 180000,
      issuingAuthority: "Tehsildar Office, Revenue Division"
    }
  },
  {
    id: 'caste',
    title: 'Community Certificate (Caste)',
    type: 'Category Proof',
    sampleImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=60',
    extracted: {
      certificateNo: "CC/OBC/2024/7741",
      name: "Ramesh Chandra Sharma",
      category: "OBC",
      casteName: "Yadav / Backward Community"
    }
  }
];

export default function OCRScannerModule({ profile, setProfile, onProceedToForm, selectedScheme }) {
  const [selectedDoc, setSelectedDoc] = useState(DEMO_DOCUMENTS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [ocrData, setOcrData] = useState(null);

  const startOCRScan = (doc) => {
    setSelectedDoc(doc);
    setIsScanning(true);
    setScanComplete(false);

    // Simulate OCR text processing delay
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setOcrData(doc.extracted);

      // Auto merge OCR verified fields into profile
      if (doc.extracted.name) {
        setProfile(prev => ({
          ...prev,
          name: doc.extracted.name,
          income: doc.extracted.annualIncome || prev.income || 180000,
          category: doc.extracted.category || prev.category || "OBC",
          aadhaarNo: doc.extracted.aadhaarNo || "7849 3920 1928"
        }));
      }
    }, 2200);
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.75rem', background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 700 }}>
          Future AI Vision & Optical Character Recognition Module
        </span>
        <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>
          Document Verification & Automated Application Pre-filling
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '650px', margin: '0.3rem auto' }}>
          Select or upload your supporting document (Aadhaar, Income Certificate, Caste Certificate). Our AI OCR scanner extracts and verifies details automatically to pre-fill your government application.
        </p>
      </div>

      {/* Target Scheme Banner */}
      {selectedScheme && (
        <div style={{ background: 'rgba(5, 150, 105, 0.15)', border: '1px solid #059669', padding: '0.85rem 1.25rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>Applying For:</span>
            <h4 style={{ color: '#fff', fontSize: '1.05rem' }}>{selectedScheme.name}</h4>
          </div>
          <span style={{ fontSize: '0.8rem', background: '#059669', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '20px', fontWeight: 700 }}>
            Eligible
          </span>
        </div>
      )}

      {/* Select Sample Document Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {DEMO_DOCUMENTS.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => startOCRScan(doc)}
            style={{
              padding: '1rem',
              borderRadius: '12px',
              background: selectedDoc.id === doc.id ? 'rgba(2, 132, 199, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              border: selectedDoc.id === doc.id ? '2px solid #38bdf8' : '1px solid var(--border-glass)',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <FileCheck size={18} color="#38bdf8" />
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{doc.title}</h4>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.type}</p>
          </div>
        ))}
      </div>

      {/* OCR Scanner Simulation Box */}
      <div className="ocr-scanner-box">
        {isScanning && <div className="scan-laser" />}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <Scan size={44} color={isScanning ? "#38bdf8" : scanComplete ? "#34d399" : "var(--text-muted)"} className={isScanning ? "animate-pulse" : ""} />
          
          <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
            {isScanning ? "AI Optical OCR Engine Scanning Image..." : scanComplete ? "Document Extraction Verified!" : "Click 'Start OCR Scan'"}
          </h3>
          
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '450px' }}>
            {isScanning 
              ? "Reading text regions, extracting Aadhaar Number, Name, Annual Income, and digital stamps..." 
              : scanComplete 
              ? "All key credentials extracted and matched with high confidence (99.4%)." 
              : "Upload PDF or image format (Aadhaar / Income / Community Certificate)"}
          </p>

          {!isScanning && !scanComplete && (
            <button className="btn-primary" onClick={() => startOCRScan(selectedDoc)}>
              <Sparkles size={16} /> Scan Selected Document ({selectedDoc.title})
            </button>
          )}
        </div>

        {/* Extracted JSON Attributes */}
        {scanComplete && ocrData && (
          <div style={{ marginTop: '1.5rem', textAlign: 'left', animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <ShieldCheck size={18} color="#34d399" />
              <h4 style={{ fontSize: '0.95rem', color: '#34d399' }}>Verified Extracted Credentials:</h4>
            </div>

            <div className="ocr-extracted-fields">
              {Object.entries(ocrData).map(([key, val]) => (
                <div key={key} className="extracted-field-card">
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                    {key}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8' }}>
                    {val.toString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      {scanComplete && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button 
            className="btn-primary" 
            onClick={onProceedToForm}
            style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', justifyContent: 'center' }}
          >
            <CheckCircle2 size={20} /> Pre-fill & Generate Official Application Form <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
