'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './Icons';
import { useRole } from './RoleContext';
import CustomSelect from './CustomSelect';

const LINKS = [
  { href: '/discover',        label: 'Discover' },
  { href: '/policy-matcher',  label: 'Policies' },
  { href: '/register',        label: 'Register' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi (हिंदी)' },
  { value: 'ta', label: 'Tamil (தமிழ்)' },
  { value: 'ml', label: 'Malayalam (മലയാളം)' },
  { value: 'te', label: 'Telugu (తెలుగు)' },
  { value: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
  { value: 'mr', label: 'Marathi (मराठी)' },
  { value: 'gu', label: 'Gujarati (ગુજરાતી)' },
  { value: 'bn', label: 'Bengali (বাংলা)' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { role, user, logout } = useRole();
  const [profileOpen, setProfileOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && !e.target.closest('.navbar-profile-btn')) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  const handleLanguageChange = (val) => {
    setLanguage(val);
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = val;
      select.dispatchEvent(new Event('change'));
    }
  };

  // Vendors and workers have editable profiles, farmers just have basic role info
  const canEdit = role === 'vendor' || role === 'worker';

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="navbar-brand">
            <div className="navbar-brand-icon">
              <Icons.Leaf />
            </div>
            FarmConnect
          </Link>

          <div className="navbar-right">
            <div className="navbar-links">
              {LINKS.map((l) => {
                const isActive = pathname === l.href || pathname.startsWith(l.href + '/');
                return (
                  <Link key={l.href} href={l.href} className={`navbar-link${isActive ? ' active' : ''}`}>
                    {l.label}
                  </Link>
                );
              })}
            </div>

            <div className="navbar-divider" />
            
            <div style={{ display: 'none' }} id="google_translate_element"></div>
            
            <div style={{ width: '160px', marginRight: '8px' }}>
              <CustomSelect 
                options={LANGUAGES.map(l => l.label)}
                value={LANGUAGES.find(l => l.value === language)?.label || 'English'}
                onChange={(label) => {
                  const selectedObj = LANGUAGES.find(l => l.label === label);
                  if (selectedObj) handleLanguageChange(selectedObj.value);
                }}
              />
            </div>

            <button 
              className={`navbar-profile-btn ${profileOpen ? 'active' : ''}`} 
              onClick={() => setProfileOpen(!profileOpen)}
              title="Account Options"
            >
              <Icons.Profile />
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Sliding Sidebar */}
      <div className={`profile-sidebar ${profileOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="profile-sidebar-header">
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Account</div>
          <button onClick={() => setProfileOpen(false)} className="btn-icon"><Icons.ChevronRight /></button>
        </div>
        
        <div className="profile-sidebar-content">
          <div style={{ textAlign: 'center', margin: '24px 0' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-subtle)', border: '2px solid var(--green-500)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-500)' }}>
              {role === 'vendor' ? <Icons.Tractor style={{ width: 32, height: 32 }} /> : role === 'worker' ? <Icons.Worker style={{ width: 32, height: 32 }} /> : <Icons.Leaf style={{ width: 32, height: 32 }} />}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              {user?.name || 'Guest User'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--green-400)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginTop: '4px' }}>
              {role === 'vendor' ? 'Vendor Account' : role === 'worker' ? 'Worker Account' : 'Farmer Account'}
            </div>
          </div>
          
          {canEdit && (
            <div className="form-section" style={{ padding: '20px', marginBottom: '24px', boxShadow: 'none' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '12px' }}>ACCOUNT STATUS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ color: 'var(--text-muted)' }}><Icons.Phone style={{ width: 16, height: 16 }} /></div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{user?.phone || 'Not provided'}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ color: 'var(--text-muted)' }}><Icons.MapPin style={{ width: 16, height: 16 }} /></div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Location not set</div>
              </div>
              {role === 'worker' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: 'var(--text-muted)' }}><Icons.Worker style={{ width: 16, height: 16 }} /></div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>No skills listed</div>
                </div>
              )}
              {role === 'vendor' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: 'var(--text-muted)' }}><Icons.Tractor style={{ width: 16, height: 16 }} /></div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>0 Active Listings</div>
                </div>
              )}
            </div>
          )}
          
          {canEdit && (
            <Link href="/profile/edit" onClick={() => setProfileOpen(false)} className="btn btn-primary" style={{ width: '100%', marginBottom: '16px', justifyContent: 'center' }}>
              Edit Information
            </Link>
          )}
          
          <button onClick={() => { setProfileOpen(false); logout(); }} className="btn btn-signout" style={{ width: '100%', justifyContent: 'center' }}>
            Change Role / Sign Out
          </button>
        </div>
      </div>
      
      {/* Backdrop */}
      <div className={`profile-backdrop ${profileOpen ? 'open' : ''}`} onClick={() => setProfileOpen(false)} />
    </>
  );
}
