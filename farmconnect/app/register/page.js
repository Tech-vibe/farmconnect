'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { Icons } from '../components/Icons';

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Register</h1>
            <p className="page-subtitle">List your equipment or register as a farm worker</p>
          </div>

          <div style={{ display: 'grid', gap: '12px', paddingTop: '4px' }}>
            <Link href="/register/equipment" style={{ textDecoration: 'none' }}>
              <div className="cta-wide anim-up delay-1">
                <div className="cta-wide-icon">
                  <Icons.Tractor />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="cta-wide-title">List Equipment</div>
                  <div className="cta-wide-desc">Tractors, harvesters, tillers and more</div>
                </div>
                <Icons.ChevronRight />
              </div>
            </Link>

            <Link href="/register/worker" style={{ textDecoration: 'none' }}>
              <div className="cta-wide anim-up delay-2">
                <div className="cta-wide-icon">
                  <Icons.Worker />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="cta-wide-title">Register as Worker</div>
                  <div className="cta-wide-desc">Let farmers find you for skilled work</div>
                </div>
                <Icons.ChevronRight />
              </div>
            </Link>
          </div>

          <div style={{
            marginTop: '24px',
            background: 'linear-gradient(135deg, var(--green-950), #06160e)',
            border: '1px solid var(--green-800)',
            borderRadius: 'var(--r-xl)',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
          }} className="anim-up delay-3">

            {/* Subtle glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(45,158,96,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--green-400)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
                Why register?
              </div>
              {[
                'Reach thousands of farmers in your area',
                'Get contacted directly — no middlemen',
                'Free listing, always',
              ].map((b) => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)' }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'rgba(45,158,96,0.2)',
                    border: '1px solid var(--green-700)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--green-400)', flexShrink: 0,
                  }}>
                    <Icons.Check />
                  </div>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
