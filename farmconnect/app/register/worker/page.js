'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { Icons } from '../../components/Icons';

const SKILLS = ['Harvesting', 'Planting & Sowing', 'Weeding', 'Pesticide Spraying', 'Irrigation & Watering', 'Ploughing', 'Threshing', 'Pruning', 'Organic Farming', 'Other'];
const STATES = ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'Other'];

export default function ListWorkerPage() {
  const [form, setForm] = useState({ name: '', skill: '', experience: '', daily_wage: '', location: '', state: '', contact: '', available_from: '', available_to: '', bio: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); if (errors[f]) setErrors(p => ({ ...p, [f]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name        = 'Name is required';
    if (!form.skill)          e.skill       = 'Select your skill';
    if (!form.daily_wage || isNaN(form.daily_wage)) e.daily_wage = 'Enter a valid amount';
    if (!form.location.trim()) e.location   = 'Location is required';
    if (!form.contact.trim() || form.contact.length < 10) e.contact = 'Enter a valid 10-digit number';
    if (!form.available_from) e.available_from = 'Select start date';
    if (!form.available_to)   e.available_to   = 'Select end date';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // TODO: replace with real API →  POST /api/workers
    await new Promise(r => setTimeout(r, 1100));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="page-content">
          <div className="container">
            <div className="success-screen anim-scale">
              <div className="success-icon" style={{ background: 'var(--amber-100)', borderColor: '#e8d4a0', color: 'var(--amber-600)' }}>
                <Icons.Check />
              </div>
              <div className="success-title">Profile Registered</div>
              <p className="success-desc">
                You're listed as a {form.skill} worker in {form.location}. Farmers can now find and contact you directly.
              </p>
              <div className="success-summary">
                <div className="success-summary-title">Profile Summary</div>
                {[
                  ['Name',      form.name],
                  ['Skill',     form.skill],
                  ['Wage/Day',  `₹${form.daily_wage}`],
                  ['Location',  form.location],
                  ['Contact',   form.contact],
                  ['Available', `${form.available_from} → ${form.available_to}`],
                ].map(([k, v]) => (
                  <div key={k} className="success-summary-row">
                    <span className="success-summary-key">{k}</span>
                    <span className="success-summary-val">{v}</span>
                  </div>
                ))}
              </div>
              <button id="register-another-worker" className="btn btn-primary btn-full" onClick={() => { setForm({ name: '', skill: '', experience: '', daily_wage: '', location: '', state: '', contact: '', available_from: '', available_to: '', bio: '' }); setSubmitted(false); }}>
                Register Another Profile
              </button>
            </div>
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Register as Worker</h1>
            <p className="page-subtitle">Create your profile and let farmers find you</p>
          </div>

          <form id="list-worker-form" onSubmit={handleSubmit}>

            {/* Identity */}
            <div className="form-section anim-up delay-1">
              <div className="form-section-title">Identity</div>

              <div className="form-group">
                <label className="form-label" htmlFor="worker-name"><Icons.Worker /> Full Name *</label>
                <input id="worker-name" className="form-input" type="text" placeholder="e.g. Rajan Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Primary Skill *</label>
                <div className="pill-grid">
                  {SKILLS.map(s => (
                    <button type="button" key={s} className={`pill-btn${form.skill === s ? ' active' : ''}`} onClick={() => set('skill', s)}>{s}</button>
                  ))}
                </div>
                {errors.skill && <div className="form-error" style={{ marginTop: '8px' }}>{errors.skill}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="worker-experience">Experience</label>
                <select id="worker-experience" className="form-select" value={form.experience} onChange={e => set('experience', e.target.value)}>
                  <option value="">Select experience...</option>
                  <option>Less than 1 year</option>
                  <option>1–3 years</option>
                  <option>3–5 years</option>
                  <option>5–10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
            </div>

            {/* Rates & location */}
            <div className="form-section anim-up delay-2">
              <div className="form-section-title">Rates & Location</div>

              <div className="form-group">
                <label className="form-label" htmlFor="worker-wage"><Icons.Currency /> Daily Wage (₹) *</label>
                <input id="worker-wage" className="form-input" type="number" placeholder="700" value={form.daily_wage} onChange={e => set('daily_wage', e.target.value)} min="0" />
                {errors.daily_wage && <div className="form-error">{errors.daily_wage}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="worker-location"><Icons.MapPin /> City / Village *</label>
                <input id="worker-location" className="form-input" type="text" placeholder="e.g. Thrissur" value={form.location} onChange={e => set('location', e.target.value)} />
                {errors.location && <div className="form-error">{errors.location}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="worker-state">State</label>
                <select id="worker-state" className="form-select" value={form.state} onChange={e => set('state', e.target.value)}>
                  <option value="">Select state...</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Contact & availability */}
            <div className="form-section anim-up delay-3">
              <div className="form-section-title">Contact & Availability</div>

              <div className="form-group">
                <label className="form-label" htmlFor="worker-contact"><Icons.Phone /> Contact Number *</label>
                <input id="worker-contact" className="form-input" type="tel" placeholder="10-digit mobile number" value={form.contact} onChange={e => set('contact', e.target.value)} maxLength={10} />
                {errors.contact && <div className="form-error">{errors.contact}</div>}
              </div>

              <div className="form-group">
                <label className="form-label"><Icons.Calendar /> Availability Dates *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>From</div>
                    <input id="worker-available-from" className="form-input" type="date" value={form.available_from} onChange={e => set('available_from', e.target.value)} />
                    {errors.available_from && <div className="form-error">{errors.available_from}</div>}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>To</div>
                    <input id="worker-available-to" className="form-input" type="date" value={form.available_to} onChange={e => set('available_to', e.target.value)} min={form.available_from} />
                    {errors.available_to && <div className="form-error">{errors.available_to}</div>}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="worker-bio">About Yourself</label>
                <textarea id="worker-bio" className="form-textarea" placeholder="Crops you specialize in, tools you own..." value={form.bio} onChange={e => set('bio', e.target.value)} />
              </div>
            </div>

            <button type="submit" id="submit-worker" className="btn btn-primary btn-full anim-up delay-4" disabled={loading} style={{ padding: '14px', borderRadius: 'var(--r-lg)', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Registering...' : 'Register Profile'}
            </button>
          </form>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
