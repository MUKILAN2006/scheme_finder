import React from 'react';
<<<<<<< HEAD
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  ListOrdered, 
  Calendar, 
  Building, 
  Check, 
  AlertTriangle,
  Info
} from 'lucide-react';

export default function SchemeDetailModal({ scheme, evaluation, onClose, onApplyDraft }) {
  if (!scheme) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1050 }}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '850px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" style={{ position: 'sticky', top: 0, background: 'var(--bg-glass-strong)', zIndex: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
                {scheme.authority} • {scheme.state}
              </span>
              <span style={{ fontSize: '0.75rem', background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-muted)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                {scheme.category}
              </span>
              {scheme.lastVerified && (
                <span style={{ fontSize: '0.72rem', color: '#34d399', background: 'rgba(5, 150, 105, 0.12)', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={12} /> Last Verified: {scheme.lastVerified}
                </span>
              )}
            </div>

            <h2 style={{ fontSize: '1.4rem', marginTop: '0.4rem', color: 'var(--text-main)', lineHeight: '1.3' }}>
              {scheme.name}
            </h2>

            {scheme.ministry && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Administering Ministry: <strong style={{ color: 'var(--text-main)' }}>{scheme.ministry}</strong>
              </p>
            )}
          </div>

          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.4rem' }}
          >
=======
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
>>>>>>> origin/main
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
<<<<<<< HEAD
        <div className="modal-body" style={{ padding: '1.25rem' }}>
=======
        <div className="modal-body">
>>>>>>> origin/main
          {/* Status Banner */}
          {evaluation && (
            <div style={{ 
              padding: '0.9rem 1.1rem', 
              borderRadius: '10px', 
              marginBottom: '1.25rem', 
<<<<<<< HEAD
              background: evaluation.status === 'Eligible' 
                ? 'rgba(5, 150, 105, 0.15)' 
                : evaluation.status === 'Potentially Eligible' 
                ? 'rgba(245, 158, 11, 0.15)' 
                : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${
                evaluation.status === 'Eligible' ? '#059669' : evaluation.status === 'Potentially Eligible' ? '#f59e0b' : '#ef4444'
              }`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck 
                  size={22} 
                  color={
                    evaluation.status === 'Eligible' ? '#34d399' : evaluation.status === 'Potentially Eligible' ? '#fbbf24' : '#f87171'
                  } 
                />
                <div>
                  <h4 style={{ 
                    color: evaluation.status === 'Eligible' ? '#34d399' : evaluation.status === 'Potentially Eligible' ? '#fbbf24' : '#f87171', 
                    fontSize: '0.95rem',
                    margin: 0
                  }}>
                    {evaluation.status} Profile ({evaluation.matchPercentage}% Match)
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                    {evaluation.decisionExplanation}
=======
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
>>>>>>> origin/main
                  </p>
                </div>
              </div>

<<<<<<< HEAD
              {evaluation.status !== 'Not Eligible' && (
                <button 
                  className="btn-primary" 
                  onClick={() => { onClose(); onApplyDraft(scheme); }}
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  Generate Application Draft <ArrowRight size={15} />
=======
              {evaluation.isEligible && (
                <button className="btn-primary" onClick={() => { onClose(); onApplyNow(scheme); }}>
                  Apply via OCR <ArrowRight size={16} />
>>>>>>> origin/main
                </button>
              )}
            </div>
          )}

          {/* Scheme Objective */}
          <div style={{ marginBottom: '1.25rem' }}>
<<<<<<< HEAD
            <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.3rem', fontWeight: 700 }}>
              Scheme Objective & Purpose
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
=======
            <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.3rem' }}>Objective & Vision</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
>>>>>>> origin/main
              {scheme.objective}
            </p>
          </div>

          {/* Benefits */}
          <div style={{ marginBottom: '1.25rem' }}>
<<<<<<< HEAD
            <h4 style={{ color: '#34d399', fontSize: '0.95rem', marginBottom: '0.3rem', fontWeight: 700 }}>
              Statutory Benefits & Financial Assistance
            </h4>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 600, background: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.25)', padding: '0.85rem', borderRadius: '8px' }}>
              {scheme.benefits}
            </div>
          </div>

          {/* Eligibility Rules Grid */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.5rem', fontWeight: 700 }}>
              Eligibility Criteria & Thresholds
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Age Range</span>
                <span style={{ fontWeight: 600 }}>{scheme.eligibility.minAge} to {scheme.eligibility.maxAge} years</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Income Threshold</span>
                <span style={{ fontWeight: 600, color: '#34d399' }}>Up to ₹{scheme.eligibility.maxIncome.toLocaleString('en-IN')} / yr</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Gender</span>
                <span style={{ fontWeight: 600 }}>{scheme.eligibility.gender}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Target Categories</span>
                <span style={{ fontWeight: 600 }}>{scheme.eligibility.category.join(', ')}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Min Education</span>
                <span style={{ fontWeight: 600 }}>{scheme.eligibility.minEducation || 'None'}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Eligible Occupations</span>
                <span style={{ fontWeight: 600 }}>{scheme.eligibility.occupation.join(', ')}</span>
              </div>
            </div>

            {scheme.eligibility.otherConditions && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                * Additional Conditions: {scheme.eligibility.otherConditions}
              </p>
            )}
=======
            <h4 style={{ color: '#34d399', fontSize: '0.95rem', marginBottom: '0.3rem' }}>Financial & Welfare Benefits</h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 600, background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '8px' }}>
              {scheme.benefits}
            </p>
>>>>>>> origin/main
          </div>

          {/* Required Documents */}
          <div style={{ marginBottom: '1.25rem' }}>
<<<<<<< HEAD
            <h4 style={{ color: '#fbbf24', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
              <FileText size={16} /> Required Supporting Documents
            </h4>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-glass)', padding: '0.85rem', borderRadius: '8px' }}>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                {scheme.requiredDocuments.map((doc, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="#38bdf8" /> {doc}
                  </li>
                ))}
              </ul>
            </div>
=======
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
>>>>>>> origin/main
          </div>

          {/* Application Procedure Steps */}
          <div style={{ marginBottom: '1.25rem' }}>
<<<<<<< HEAD
            <h4 style={{ color: '#a78bfa', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
              <ListOrdered size={16} /> Official Application Steps
            </h4>
            <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {scheme.applicationProcedure.map((step, idx) => (
                <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', lineHeight: '1.4' }}>
=======
            <h4 style={{ color: '#a78bfa', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ListOrdered size={16} /> Official Application Procedure
            </h4>
            <ol style={{ paddingLeft: '1.2rem' }}>
              {scheme.applicationProcedure.map((step, idx) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.4rem', lineHeight: '1.4' }}>
>>>>>>> origin/main
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* FAQs */}
          {scheme.faqs && scheme.faqs.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
<<<<<<< HEAD
              <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
=======
              <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
>>>>>>> origin/main
                <HelpCircle size={16} /> Frequently Asked Questions
              </h4>
              {scheme.faqs.map((faq, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.65rem 0.85rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
<<<<<<< HEAD
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)', margin: '0 0 0.2rem 0' }}>Q: {faq.q}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>A: {faq.a}</p>
=======
                  <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)' }}>Q: {faq.q}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>A: {faq.a}</p>
>>>>>>> origin/main
                </div>
              ))}
            </div>
          )}

<<<<<<< HEAD
          {/* Source Reference & Last Verified */}
          {scheme.sourceReference && (
            <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px', border: '1px solid var(--border-glass)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              <strong>Verified Source Citation:</strong> {scheme.sourceReference}
            </div>
          )}

          {/* External Link Footer */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Application Deadline: <strong style={{ color: '#fbbf24' }}>{scheme.deadline}</strong>
=======
          {/* Official External Link Footer */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Deadline: <strong style={{ color: '#fbbf24' }}>{scheme.deadline}</strong>
>>>>>>> origin/main
            </span>
            
            <a 
              href={scheme.officialUrl} 
              target="_blank" 
              rel="noopener noreferrer"
<<<<<<< HEAD
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
            >
              <span>Visit Official Government Portal</span>
              <ExternalLink size={14} />
=======
              className="btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              Official Portal <ExternalLink size={14} />
>>>>>>> origin/main
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
