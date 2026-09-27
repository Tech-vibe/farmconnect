'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { Icons } from '../components/Icons';
import CustomSelect from '../components/CustomSelect';

const STATES = ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'Other'];
const INCOME_RANGES = ['Below ₹2 Lakhs', '₹2 Lakhs - ₹5 Lakhs', '₹5 Lakhs - ₹10 Lakhs', 'Above ₹10 Lakhs'];

export default function PolicyMatcherPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schemes, setSchemes] = useState([]);
  
  const [form, setForm] = useState({
    crop_type: '',
    land_size: '',
    income_range: '',
    state: ''
  });

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
  };

  const handleMatch = async (e) => {
    e.preventDefault();
    if (!form.crop_type || !form.land_size || !form.income_range || !form.state) {
      setError("Please fill all fields to find matching policies.");
      return;
    }
    
    setError(null);
    setLoading(true);
    setSchemes([]);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/policy-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop_type: form.crop_type,
          land_size: form.land_size + ' Acres',
          income_range: form.income_range,
          state: form.state
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch policies. Please try again.');
      }

      const data = await response.json();
      setSchemes(data.schemes || []);
    } catch (err) {
      console.error(err);
      setError("Error connecting to the policy engine. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-content" style={{ paddingBottom: '100px' }}>
        <div className="container" style={{ maxWidth: '700px' }}>

          <div className="page-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: 64, height: 64, background: 'var(--accent-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--accent)' }}>
              <Icons.FileText style={{ width: 32, height: 32 }} />
            </div>
            <h1 className="page-title">Policy Matcher</h1>
            <p className="page-subtitle">AI-powered engine to find government schemes you qualify for</p>
          </div>

          <form onSubmit={handleMatch} className="form-section anim-up" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="form-section-title">Farm Profile</div>
            
            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: 'var(--r-md)', fontSize: '0.85rem', marginBottom: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Main Crop Type</label>
                <input className="form-input" type="text" placeholder="e.g. Rice, Wheat, Cotton" value={form.crop_type} onChange={e => set('crop_type', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Land Size (Acres)</label>
                <input className="form-input" type="number" step="0.1" placeholder="e.g. 2.5" value={form.land_size} onChange={e => set('land_size', e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Annual Income</label>
                <CustomSelect options={INCOME_RANGES} value={form.income_range} onChange={v => set('income_range', v)} placeholder="Select range" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">State</label>
                <CustomSelect options={STATES} value={form.state} onChange={v => set('state', v)} placeholder="Select state" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ padding: '16px', borderRadius: 'var(--r-lg)', fontSize: '1rem', fontWeight: 600 }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <span className="spinner" style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Analyzing Policies...
                </span>
              ) : (
                'Find Eligible Schemes'
              )}
            </button>
          </form>

          {/* Results Area */}
          <div style={{ marginTop: '40px' }}>
            {schemes.length > 0 && (
              <div className="anim-up delay-1">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Matched Schemes</h2>
                  <span style={{ background: 'var(--accent-light)', color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700, padding: '2px 10px', borderRadius: 'var(--r-full)' }}>{schemes.length} Found</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {schemes.map((scheme, i) => (
                    <div key={i} className="anim-up" style={{ animationDelay: `${(i+1)*0.1}s`, background: 'var(--bg-card)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 'var(--r-xl)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                          <Icons.FileText />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>{scheme.name}</h3>
                          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--green-50)', color: 'var(--green-600)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--r-full)' }}>
                            <Icons.Check style={{ width: 12, height: 12, marginRight: 4 }} />
                            Benefit: {scheme.benefit}
                          </div>
                        </div>
                      </div>
                      
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                        {scheme.description}
                      </p>
                      
                      <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--r-md)', padding: '16px' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Icons.Info style={{ width: 14, height: 14 }} /> How to apply
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {scheme.how_to_apply}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
      <BottomNav />
    </>
  );
}
