import React, { useState } from 'react';
import { Search, Filter, Award, CheckCircle2, XCircle, ArrowRight, Download, Info, ChevronDown, ChevronUp, Sparkles, FileCheck } from 'lucide-react';

export default function EligibilityResults({ 
  evaluatedSchemes, 
  profile, 
  onSelectScheme, 
  onOpenOCR 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedSchemeId, setExpandedSchemeId] = useState(null);

  // Filter categories
  const categories = ['All', 'Agriculture', 'Education & Scholarship', 'Women & Child', 'Business & Entrepreneurship', 'Health & Medical', 'Housing', 'Social Security', 'Disability Welfare'];

  // Filter list
  const filteredSchemes = evaluatedSchemes.filter(item => {
    const matchesSearch = item.scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.scheme.objective.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.scheme.category === selectedCategory;
    const matchesStatus = statusFilter === 'All' || 
                          (statusFilter === 'Eligible' && item.isEligible) ||
                          (statusFilter === 'Rejected' && !item.isEligible);
    return matchesSearch && matchesCat && matchesStatus;
  });

  const eligibleCount = evaluatedSchemes.filter(s => s.isEligible).length;

  // Export PDF Report via Print Document Stream
  const exportPDFReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const eligibleItems = evaluatedSchemes.filter(s => s.isEligible);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>YojanaSetu AI - Scheme Eligibility Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; color: #0f172a; }
          h1 { color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 10px; }
          .meta-box { background: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
          .scheme-item { border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; margin-bottom: 12px; }
          .tag { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
          .benefit { background: #ecfdf5; color: #047857; padding: 8px; border-radius: 4px; font-weight: bold; margin-top: 8px; }
        </style>
      </head>
      <body>
        <h1>YojanaSetu AI - Citizen Welfare Eligibility Report</h1>
        <div class="meta-box">
          <p><strong>Applicant Name:</strong> ${profile.name || 'Citizen'}</p>
          <p><strong>Age:</strong> ${profile.age || 'N/A'} yrs | <strong>Gender:</strong> ${profile.gender || 'N/A'}</p>
          <p><strong>State:</strong> ${profile.state || 'N/A'} | <strong>District:</strong> ${profile.district || 'N/A'}</p>
          <p><strong>Annual Income:</strong> ₹${(profile.income || 0).toLocaleString('en-IN')} | <strong>Category:</strong> ${profile.category || 'General'}</p>
          <p><strong>Generated On:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <h2>Matched Eligible Schemes (${eligibleCount})</h2>
        ${eligibleItems.map((item, idx) => `
          <div class="scheme-item">
            <h3>${idx + 1}. ${item.scheme.name}</h3>
            <span class="tag">${item.scheme.authority}</span>
            <span class="tag">${item.scheme.category}</span>
            <p>${item.scheme.objective}</p>
            <div class="benefit">Key Benefit: ${item.scheme.benefits}</div>
            <p><small>Official Link: ${item.scheme.officialUrl}</small></p>
          </div>
        `).join('')}

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div>
      {/* Header Statistics Card */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Personalized Eligibility Dashboard for <span style={{ color: '#38bdf8' }}>{profile.name || 'Citizen'}</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Evaluated against 16+ Central & State Government Welfare Databases
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>{eligibleCount}</span>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Eligible Schemes</p>
          </div>
          <div style={{ height: '35px', width: '1px', background: 'var(--border-glass)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171' }}>{evaluatedSchemes.length - eligibleCount}</span>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Ineligible Schemes</p>
          </div>
          
          <button className="btn-secondary" onClick={exportPDFReport} style={{ background: 'rgba(2, 132, 199, 0.15)', borderColor: '#0284c7' }}>
            <Download size={16} /> Export PDF Report
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="schemes-header">
        <div className="search-filter-bar">
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search scheme by name, benefits or keywords..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
            />
          </div>

          <select 
            className="select-dropdown" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            className="select-dropdown" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Eligibility Status</option>
            <option value="Eligible">Eligible Schemes Only (✓)</option>
            <option value="Rejected">Ineligible Schemes Only (✕)</option>
          </select>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="schemes-grid">
        {filteredSchemes.map((item) => {
          const { scheme, isEligible, matchPercentage, reasons, rejections } = item;
          const isExpanded = expandedSchemeId === scheme.id;

          return (
            <div key={scheme.id} className="glass-card scheme-card">
              <div>
                {/* Badge Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                  <span className={`scheme-card-badge ${isEligible ? 'badge-eligible' : 'badge-rejected'}`}>
                    {isEligible ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                    {isEligible ? 'Eligible' : 'Not Eligible'}
                  </span>
                  <div className="match-score-pill">
                    {matchPercentage}% Match
                  </div>
                </div>

                {/* Scheme Title & Authority */}
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  {scheme.name}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>
                    {scheme.authority}
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>
                    {scheme.state}
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#38bdf8' }}>
                    {scheme.category}
                  </span>
                </div>

                {/* Objective */}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '0.85rem' }}>
                  {scheme.objective}
                </p>

                {/* Benefits Summary Box */}
                <div style={{ background: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '0.65rem 0.85rem', borderRadius: '8px', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', display: 'block' }}>
                    Key Benefit:
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    {scheme.benefits}
                  </p>
                </div>

                {/* Expandable Transparency Accordion */}
                <button 
                  onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                  style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  <span>{isExpanded ? 'Hide AI Justification' : 'Why do I qualify / not qualify?'}</span>
                </button>

                {isExpanded && (
                  <div className="why-qualify-list">
                    <p style={{ fontWeight: 700, marginBottom: '0.4rem', color: isEligible ? '#34d399' : '#f87171' }}>
                      {isEligible ? 'Passed Conditions:' : 'Rejection Reasons:'}
                    </p>
                    {isEligible ? (
                      reasons.map((r, idx) => (
                        <div key={idx} style={{ marginBottom: '0.2rem', color: '#cbd5e1' }}>{r}</div>
                      ))
                    ) : (
                      rejections.map((rej, idx) => (
                        <div key={idx} style={{ marginBottom: '0.2rem', color: '#fca5a5' }}>{rej}</div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button 
                  className="btn-secondary" 
                  onClick={() => onSelectScheme(scheme, item)} 
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem' }}
                >
                  <Info size={15} /> Scheme Info
                </button>

                {isEligible && (
                  <button 
                    className="btn-primary" 
                    onClick={() => onOpenOCR(scheme)} 
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem', padding: '0.6rem 0.75rem' }}
                  >
                    <FileCheck size={15} /> Apply via OCR
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
