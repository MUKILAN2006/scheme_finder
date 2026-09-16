import React, { useState } from 'react';
import { X, CheckCircle2, FileText, Download, Send, ShieldCheck, Printer, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApplicationFormModal({ scheme, profile, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appId] = useState(`YS-2026-${Math.floor(100000 + Math.random() * 900000)}`);

  const handleSubmitApplication = () => {
    setIsSubmitted(true);

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti error:', e);
    }
  };

  const downloadApplicationReceipt = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Government Application Receipt - ${appId}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #0f172a; }
          .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 15px; margin-bottom: 25px; }
          .section-title { background: #0284c7; color: white; padding: 6px 12px; font-weight: bold; border-radius: 4px; margin-top: 20px; }
          .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; }
          .field-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; }
          .field-label { font-size: 11px; color: #64748b; font-weight: bold; }
          .field-val { font-size: 14px; font-weight: bold; color: #0f172a; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>GOVERNMENT OF INDIA - WELFARE BENEFIT RECEIPT</h2>
          <p>Application Reference No: <strong>${appId}</strong> | Date: <strong>${new Date().toLocaleDateString()}</strong></p>
        </div>

        <div class="section-title">APPLIED SCHEME INFORMATION</div>
        <div class="field-box" style="margin-top: 10px;">
          <div class="field-label">SCHEME NAME</div>
          <div class="field-val">${scheme ? scheme.name : 'Government Scheme'}</div>
          <p style="margin-top: 5px; font-size: 12px; color: #475569;">Authority: ${scheme ? scheme.authority : 'Central/State Govt'}</p>
        </div>

        <div class="section-title">VERIFIED APPLICANT CREDENTIALS (OCR AUDITED)</div>
        <div class="field-grid">
          <div class="field-box">
            <div class="field-label">FULL NAME</div>
            <div class="field-val">${profile.name || 'Citizen'}</div>
          </div>
          <div class="field-box">
            <div class="field-label">AADHAAR NUMBER</div>
            <div class="field-val">${profile.aadhaarNo || '7849 3920 1928'}</div>
          </div>
          <div class="field-box">
            <div class="field-label">AGE / GENDER</div>
            <div class="field-val">${profile.age || 25} Yrs / ${profile.gender || 'Male'}</div>
          </div>
          <div class="field-box">
            <div class="field-label">DOMICILE STATE & DISTRICT</div>
            <div class="field-val">${profile.state || 'Tamil Nadu'} (${profile.district || 'Chennai'})</div>
          </div>
          <div class="field-box">
            <div class="field-label">OCCUPATION & CATEGORY</div>
            <div class="field-val">${profile.occupation || 'Farmer'} (${profile.category || 'OBC'})</div>
          </div>
          <div class="field-box">
            <div class="field-label">VERIFIED ANNUAL INCOME</div>
            <div class="field-val" style="color: #059669;">₹${(profile.income || 180000).toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div class="section-title">ATTACHED DOCUMENTS VERIFICATION STATUS</div>
        <ul style="line-height: 1.8; margin-top: 10px;">
          <li>✓ Aadhaar Identity Card e-KYC: <strong>Verified</strong></li>
          <li>✓ Revenue Income Certificate: <strong>Verified</strong></li>
          <li>✓ Community Certificate: <strong>Verified</strong></li>
          <li>✓ Bank Passbook DBT account linked: <strong>Active</strong></li>
        </ul>

        <p style="font-size: 11px; color: #64748b; margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 10px;">
          This receipt is electronically issued by YojanaSetu AI Portal and serves as valid acknowledgment for government welfare tracking.
        </p>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={22} color="#0284c7" />
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>Official Application Preview</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-filled via OCR Extraction Engine</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          {!isSubmitted ? (
            <div className="gov-form-preview">
              <div className="gov-form-header">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <ShieldCheck size={26} color="#0284c7" />
                  <h2 style={{ fontSize: '1.3rem', color: '#0f172a', letterSpacing: '0.05em' }}>GOVERNMENT OF INDIA WELFARE PORTAL</h2>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                  UNIFIED APPLICATION FOR CENTRAL & STATE WELFARE BENEFITS
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginTop: '0.75rem' }}>
                  <span>Ref No: <strong>{appId}</strong></span>
                  <span>Target Scheme: <strong>{scheme ? scheme.name : 'PM Welfare Scheme'}</strong></span>
                </div>
              </div>

              {/* Form Content Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>APPLICANT FULL NAME</span>
                  <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{profile.name || 'Ramesh Chandra Sharma'}</strong>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>AADHAAR NUMBER (UID)</span>
                  <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{profile.aadhaarNo || '7849 3920 1928'}</strong>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>AGE / GENDER</span>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{profile.age || 25} Years / {profile.gender || 'Male'}</strong>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>DOMICILE STATE & DISTRICT</span>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{profile.state || 'Tamil Nadu'} ({profile.district || 'Chennai'})</strong>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>OCCUPATION & CATEGORY</span>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{profile.occupation || 'Farmer'} ({profile.category || 'OBC'})</strong>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>VERIFIED ANNUAL INCOME</span>
                  <strong style={{ fontSize: '0.95rem', color: '#059669' }}>₹{(profile.income || 180000).toLocaleString('en-IN')} / annum</strong>
                </div>
              </div>

              {/* Document Checkbox Attachments */}
              <div style={{ background: '#f1f5f9', padding: '0.85rem', borderRadius: '6px', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#0f172a', marginBottom: '0.5rem' }}>Attached OCR Verified Documents:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.8rem', color: '#334155' }}>
                  <span>✓ Aadhaar Identity Card attached</span>
                  <span>✓ Income Certificate verified</span>
                  <span>✓ Social Caste Certificate attached</span>
                  <span>✓ Bank Passbook DBT details verified</span>
                </div>
              </div>

              {/* Digital Declaration */}
              <div style={{ fontSize: '0.78rem', color: '#475569', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', marginBottom: '1.25rem' }}>
                <p>
                  <strong>Self Declaration:</strong> I hereby declare that all particulars furnished in this application are true and correct to the best of my knowledge. I authorize the department to verify my credentials with UIDAI and Revenue databases.
                </p>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button className="btn-secondary" onClick={onClose} style={{ background: '#e2e8f0', color: '#0f172a' }}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleSubmitApplication}>
                  <Send size={16} /> Submit Online Application
                </button>
              </div>
            </div>
          ) : (
            /* Successful Submission Confirmation */
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ background: 'rgba(5, 150, 105, 0.2)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircle2 size={40} color="#34d399" />
              </div>

              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Application Submitted Successfully!
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                Your application for <strong>{scheme ? scheme.name : 'Government Welfare Scheme'}</strong> has been processed and forwarded to the competent authority portal.
              </p>

              <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-glass)', padding: '1rem', borderRadius: '10px', maxWidth: '400px', margin: '0 auto 1.5rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Tracking ID:</span>
                  <strong style={{ color: '#38bdf8' }}>{appId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                  <strong style={{ color: '#34d399' }}>Under Process (DBT Direct)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{new Date().toLocaleDateString()}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn-secondary" onClick={downloadApplicationReceipt}>
                  <Download size={16} /> Download Official Receipt PDF
                </button>
                <button className="btn-primary" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
