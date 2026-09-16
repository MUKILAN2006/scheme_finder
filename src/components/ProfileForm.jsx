import React from 'react';
import { User, MapPin, Briefcase, GraduationCap, DollarSign, Award, CheckCircle, Sparkles } from 'lucide-react';
import { STATES_AND_DISTRICTS, OCCUPATIONS, CATEGORIES, EDUCATION_LEVELS } from '../data/statesAndDistricts';

export default function ProfileForm({ profile, setProfile, onCheckEligibility }) {
  const handleChange = (field, val) => {
    setProfile(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleStateChange = (stateName) => {
    setProfile(prev => ({
      ...prev,
      state: stateName,
      district: STATES_AND_DISTRICTS[stateName] ? STATES_AND_DISTRICTS[stateName][0] : ''
    }));
  };

  const currentDistricts = profile.state && STATES_AND_DISTRICTS[profile.state] 
    ? STATES_AND_DISTRICTS[profile.state] 
    : [];

  return (
    <div className="glass-card" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', color: '#38bdf8', marginBottom: '0.4rem' }}>
          Quick 1-Minute Citizen Profile Form
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Directly fill in your details to immediately calculate scheme eligibility across India.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {/* Full Name */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Full Name
          </label>
          <input 
            type="text" 
            className="search-input" 
            placeholder="e.g. Ramesh Chandra"
            value={profile.name || ''} 
            onChange={(e) => handleChange('name', e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        {/* Age */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Age (Years): {profile.age || 25}
          </label>
          <input 
            type="range" 
            min="1" 
            max="95" 
            value={profile.age || 25} 
            onChange={(e) => handleChange('age', parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: '#38bdf8' }}
          />
        </div>

        {/* Gender */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Gender
          </label>
          <select 
            className="select-dropdown" 
            value={profile.gender || 'Male'} 
            onChange={(e) => handleChange('gender', e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Transgender">Transgender</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            State of Residence
          </label>
          <select 
            className="select-dropdown" 
            value={profile.state || 'Tamil Nadu'} 
            onChange={(e) => handleStateChange(e.target.value)}
            style={{ width: '100%' }}
          >
            {Object.keys(STATES_AND_DISTRICTS).map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* District */}
        {currentDistricts.length > 0 && (
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              District
            </label>
            <select 
              className="select-dropdown" 
              value={profile.district || currentDistricts[0]} 
              onChange={(e) => handleChange('district', e.target.value)}
              style={{ width: '100%' }}
            >
              {currentDistricts.map((dst) => (
                <option key={dst} value={dst}>{dst}</option>
              ))}
            </select>
          </div>
        )}

        {/* Occupation */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Occupation / Employment
          </label>
          <select 
            className="select-dropdown" 
            value={profile.occupation || 'Farmer'} 
            onChange={(e) => handleChange('occupation', e.target.value)}
            style={{ width: '100%' }}
          >
            {OCCUPATIONS.map((occ) => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </select>
        </div>

        {/* Social Category */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Social Category
          </label>
          <select 
            className="select-dropdown" 
            value={profile.category || 'General'} 
            onChange={(e) => handleChange('category', e.target.value)}
            style={{ width: '100%' }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Highest Education */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Education Level
          </label>
          <select 
            className="select-dropdown" 
            value={profile.education || 'Class 10th Passed'} 
            onChange={(e) => handleChange('education', e.target.value)}
            style={{ width: '100%' }}
          >
            {EDUCATION_LEVELS.map((edu) => (
              <option key={edu} value={edu}>{edu}</option>
            ))}
          </select>
        </div>

        {/* Annual Family Income */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Annual Family Income: ₹{(profile.income || 250000).toLocaleString('en-IN')}
          </label>
          <input 
            type="range" 
            min="30000" 
            max="1500000" 
            step="10000"
            value={profile.income || 250000} 
            onChange={(e) => handleChange('income', parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: '#34d399' }}
          />
        </div>

        {/* Disability Check */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Benchmark Disability (UDID 40%+)
          </label>
          <select 
            className="select-dropdown" 
            value={profile.isDisabled ? "Yes" : "No"} 
            onChange={(e) => handleChange('isDisabled', e.target.value === "Yes")}
            style={{ width: '100%' }}
          >
            <option value="No">No</option>
            <option value="Yes">Yes (40%+ Disability)</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Marital Status
          </label>
          <select 
            className="select-dropdown" 
            value={profile.maritalStatus || 'Single'} 
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="Single">Single / Unmarried</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button 
          className="btn-primary" 
          onClick={onCheckEligibility}
          style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem', justifyContent: 'center' }}
        >
          <Sparkles size={20} /> Analyze Eligible Schemes
        </button>
      </div>
    </div>
  );
}
