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
              <div className="cat-btn anim-up delay-1">
                <div className="cat-btn-icon cat-btn-icon-green">
                  <Icons.Tractor />
                </div>
                <div>
                  <div className="cat-btn-title">List Equipment</div>
                  <div className="cat-btn-desc">Tractors, harvesters, tillers and more</div>
                </div>
                <Icons.ChevronRight />
              </div>
            </Link>

            <Link href="/register/worker" style={{ textDecoration: 'none' }}>
              <div className="cat-btn anim-up delay-2">
                <div className="cat-btn-icon cat-btn-icon-amber">
                  <Icons.Worker />
                </div>
                <div>
                  <div className="cat-btn-title">Register as Worker</div>
                  <div className="cat-btn-desc">Let farmers find you for skilled work</div>
                </div>
                <Icons.ChevronRight />
              </div>
            </Link>
          </div>

          <div style={{
            marginTop: '24px',
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)',
            padding: '20px',
          }} className="anim-up delay-3">
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
              Why register?
            </div>
            {[
              'Reach thousands of farmers in your area',
              'Get contacted directly — no middlemen',
              'Free listing, always',
            ].map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                <div style={{ color: 'var(--accent)', flexShrink: 0 }}><Icons.Check /></div>
                {b}
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
