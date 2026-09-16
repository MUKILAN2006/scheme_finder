import React from 'react';
import { X, ExternalLink, CheckCircle2, FileText, HelpCircle, ArrowRight, ShieldCheck, ListOrdered } from 'lucide-react';

export default function SchemeDetailModal({ scheme, evaluation, onClose, onApplyNow }) {
  if (!scheme) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
              {scheme.authority} • {scheme.state}
            </span>
            <h2 style={{ fontSize: '1.35rem', marginTop: '0.4rem', color: 'var(--text-main)' }}>
              {scheme.name}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Status Banner */}
          {evaluation && (
            <div style={{ 
              padding: '0.9rem 1.1rem', 
              borderRadius: '10px', 
              marginBottom: '1.25rem', 
              background: evaluation.isEligible ? 'rgba(5, 150, 105, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: evaluation.isEligible ? '1px solid #059669' : '1px solid #ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={20} color={evaluation.isEligible ? '#34d399' : '#f87171'} />
                <div>
                  <h4 style={{ color: evaluation.isEligible ? '#34d399' : '#f87171', fontSize: '0.95rem' }}>
                    {evaluation.isEligible ? 'Verified Eligible Profile' : 'Ineligible Profile'}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Match Score: {evaluation.matchPercentage}%
                  </p>
                </div>
              </div>

              {evaluation.isEligible && (
                <button className="btn-primary" onClick={() => { onClose(); onApplyNow(scheme); }}>
                  Apply via OCR <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}

          {/* Scheme Objective */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.3rem' }}>Objective & Vision</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              {scheme.objective}
            </p>
          </div>

          {/* Benefits */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#34d399', fontSize: '0.95rem', marginBottom: '0.3rem' }}>Financial & Welfare Benefits</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 600, background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '8px' }}>
              {scheme.benefits}
            </p>
          </div>

          {/* Required Documents */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#fbbf24', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={16} /> Required Supporting Documents
            </h4>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {scheme.requiredDocuments.map((doc, idx) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={14} color="#38bdf8" /> {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Application Procedure Steps */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#a78bfa', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ListOrdered size={16} /> Official Application Procedure
            </h4>
            <ol style={{ paddingLeft: '1.2rem' }}>
              {scheme.applicationProcedure.map((step, idx) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.4rem', lineHeight: '1.4' }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* FAQs */}
          {scheme.faqs && scheme.faqs.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HelpCircle size={16} /> Frequently Asked Questions
              </h4>
              {scheme.faqs.map((faq, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.65rem 0.85rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)' }}>Q: {faq.q}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>A: {faq.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* Official External Link Footer */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Deadline: <strong style={{ color: '#fbbf24' }}>{scheme.deadline}</strong>
            </span>
            
            <a 
              href={scheme.officialUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              Official Portal <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
