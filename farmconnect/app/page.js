'use client';
import Link from 'next/link';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import { Icons } from './components/Icons';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="page-content">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="hero-eyebrow anim-up">
              <span className="hero-eyebrow-dot" />
              Empowering Indian Farmers
            </div>

            <h1 className="hero-title anim-up delay-1">
              Find the Right<br />
              <span>Farm Resources</span><br />
              Near You
            </h1>

            <p className="hero-subtitle anim-up delay-2">
              Discover equipment, skilled workers, and government schemes available in your area.
            </p>

            <div className="hero-search anim-up delay-3">
              <input
                id="hero-search-input"
                type="text"
                className="hero-search-input"
                placeholder="Equipment, workers, or schemes..."
              />
              <Link href="/discover" className="hero-search-btn">
                Search
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="stats-strip">
          <div className="stats-inner">
            {[
              { value: '1,200+', label: 'Equipment' },
              { value: '3,500+', label: 'Workers' },
              { value: '50+',    label: 'Schemes' },
            ].map((s) => (
              <div key={s.label} className="stat-item anim-up">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── QUICK ACCESS ── */}
        <section className="section">
          <div className="container">
            <p className="section-label">Quick access</p>

            <div className="cta-grid">
              {/* Equipment */}
              <Link href="/discover?type=equipment" className="cta-card cta-card-dark anim-up delay-1">
                <div className="cta-card-icon cta-card-icon-green">
                  <Icons.Tractor />
                </div>
                <div className="cta-card-title">Equipment</div>
                <div className="cta-card-desc">Tractors, harvesters & more</div>
                <div className="cta-card-arrow">
                  <Icons.ChevronRight />
                </div>
              </Link>

              {/* Workers */}
              <Link href="/discover?type=workers" className="cta-card cta-card-amber anim-up delay-2">
                <div className="cta-card-icon cta-card-icon-amber">
                  <Icons.Worker />
                </div>
                <div className="cta-card-title">Workers</div>
                <div className="cta-card-desc">Skilled farm labour</div>
                <div className="cta-card-arrow">
                  <Icons.ChevronRight />
                </div>
              </Link>
            </div>

            {/* Policy Matcher wide CTA */}
            <Link href="/policy-matcher" className="cta-wide anim-up delay-3">
              <div className="cta-wide-icon">
                <Icons.FileText />
              </div>
              <div style={{ flex: 1 }}>
                <div className="cta-wide-title">Government Schemes</div>
                <div className="cta-wide-desc">Find schemes you qualify for</div>
              </div>
              <Icons.ChevronRight />
            </Link>
          </div>
        </section>

        {/* ── PROVIDER SECTION ── */}
        <section className="section" style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '28px 0' }}>
          <div className="container">
            <p className="section-label">Are you a provider?</p>
            <div className="provider-grid">
              <Link href="/register/equipment" className="provider-card anim-up delay-1">
                <div className="provider-card-icon">
                  <Icons.Tractor />
                </div>
                <div className="provider-card-title">List Equipment</div>
                <div className="provider-card-desc">Earn from idle machines</div>
              </Link>
              <Link href="/register/worker" className="provider-card anim-up delay-2">
                <div className="provider-card-icon">
                  <Icons.Worker />
                </div>
                <div className="provider-card-title">Register as Worker</div>
                <div className="provider-card-desc">Find farm work near you</div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="section">
          <div className="container">
            <p className="section-label">How it works</p>
            <div className="steps">
              {[
                { n: '01', title: 'Choose what you need',  desc: 'Equipment, workers, or government schemes.' },
                { n: '02', title: 'Enter your location',    desc: 'We show results nearest to you first.' },
                { n: '03', title: 'Call directly',          desc: 'One tap to call. No middlemen, no delays.' },
              ].map((s, i) => (
                <div key={s.n} className={`step-item anim-up delay-${i + 1}`}>
                  <div className="step-num">{s.n}</div>
                  <div>
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <BottomNav />
    </>
  );
}
