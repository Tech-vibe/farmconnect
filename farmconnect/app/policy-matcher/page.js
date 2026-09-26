'use client';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { Icons } from '../components/Icons';

export default function PolicyMatcherPage() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="container">

          <div className="page-header">
            <h1 className="page-title">Government Policies</h1>
            <p className="page-subtitle">Find schemes you qualify for based on your farm profile</p>
          </div>

          {/* Integration notice */}
          <div className="integration-notice anim-up">
            <div className="integration-badge">
              <Icons.Info />
              In Progress
            </div>

            <div className="integration-title">
              Coming from your teammate
            </div>
            <p className="integration-desc">
              This feature is being built by your teammate in Python (FastAPI + LLM). The UI is ready and waiting for the API to connect.
            </p>

            <div className="integration-divider" />

            {/* What will show here */}
            <div style={{ textAlign: 'left', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
                What this page will do
              </div>
              {[
                'Farmer enters crop type, land size, income, and state',
                'API sends it to LLM (Claude / GPT)',
                'Returns all eligible government schemes',
                'Displayed as clean cards below',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '1px' }}><Icons.Check /></span>
                  {item}
                </div>
              ))}
            </div>

            {/* API contract spec */}
            <div className="integration-info">
              <div className="integration-info-title">Integration Spec (API Contract)</div>
              <div className="integration-spec">
                <span className="integration-spec-label">Endpoint</span>
                <span className="integration-spec-value">POST /api/policy-match</span>
              </div>
              <div className="integration-spec">
                <span className="integration-spec-label">Body</span>
                <span className="integration-spec-value">crop_type, land_size, income_range, state</span>
              </div>
              <div className="integration-spec">
                <span className="integration-spec-label">Returns</span>
                <span className="integration-spec-value">{'{ schemes: [...] }'}</span>
              </div>
              <div className="integration-spec">
                <span className="integration-spec-label">CORS</span>
                <span className="integration-spec-value">Required on FastAPI backend</span>
              </div>
            </div>

          </div>

          {/* Preview of what scheme cards will look like */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
              Preview — Scheme card design
            </div>

            {/* One sample card */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--accent)',
              borderRadius: 'var(--r-xl)',
              padding: '20px',
              opacity: 0.55,
              pointerEvents: 'none',
            }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                  <Icons.Wheat />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>PM-KISAN</div>
                  <div style={{ display: 'inline-block', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--r-full)', marginTop: '4px' }}>
                    ₹6,000 / year
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
                Income support for all landholding farmer families across India. Paid in 3 installments of ₹2,000 each.
              </p>
              <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>How to apply</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Visit pmkisan.gov.in or nearest CSC with Aadhaar and land records.</div>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '12px' }}>
              Actual cards will appear here once your teammate's API is connected
            </p>
          </div>

        </div>
      </main>
      <BottomNav />
    </>
  );
}
