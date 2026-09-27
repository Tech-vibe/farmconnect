'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { Icons } from '../../components/Icons';
import CustomSelect from '../../components/CustomSelect';
import CustomDatePicker from '../../components/CustomDatePicker';
import { useRole } from '../../components/RoleContext';

const EQUIPMENT_TYPES = ['Tractor', 'Paddy Harvester', 'Mini Tiller', 'Rotavator', 'Water Pump', 'Sprayer', 'Thresher', 'Plough', 'Seed Drill', 'Other'];
const SKILLS = ['Harvesting', 'Planting & Sowing', 'Weeding', 'Pesticide Spraying', 'Irrigation & Watering', 'Ploughing', 'Threshing', 'Pruning', 'Organic Farming', 'Other'];
const STATES = ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'Other'];

export default function EditProfilePage() {
  const router = useRouter();
  const { role } = useRole();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [form, setForm] = useState({
    name: 'Rajan Kumar',
    contact: '9876543210',
    location: 'Thrissur',
    state: 'Kerala',
    type: 'Tractor',
    rent_per_day: '1500',
    description: 'Mahindra 575 DI, 45 HP',
    skill: 'Harvesting',
    experience: '5',
    daily_wage: '800',
    available_from: '2026-10-01',
    available_to: '2026-12-31'
  });

  useEffect(() => {
    if (role === 'farmer' || !role) {
      router.push('/');
    }
  }, [role, router]);

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  if (!role || role === 'farmer') return null;

  return (
    <>
      <Navbar />
      <main className="page-content" style={{ paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingTop: '20px' }}>
            <Link href="/" className="btn-icon" style={{ background: 'var(--bg-subtle)' }}><Icons.ChevronLeft /></Link>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Edit Profile</h1>
          </div>

          {saved && (
            <div className="anim-scale" style={{ background: 'rgba(45, 158, 96, 0.1)', color: 'var(--green-500)', padding: '16px', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', border: '1px solid var(--green-500)' }}>
              <Icons.Check /> Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
            
            <div className="form-section anim-up delay-1">
              <div className="form-section-title">Identity & Location</div>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" type="text" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input className="form-input" type="tel" value={form.contact} onChange={e => set('contact', e.target.value)} maxLength={10} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="form-input" type="text" value={form.location} onChange={e => set('location', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <CustomSelect options={STATES} value={form.state} onChange={v => set('state', v)} placeholder="Select State" />
                </div>
              </div>
            </div>

            {role === 'vendor' && (
              <div className="form-section anim-up delay-2">
                <div className="form-section-title">Equipment Listing</div>
                
                <div className="form-group">
                  <label className="form-label">Equipment Type</label>
                  <CustomSelect options={EQUIPMENT_TYPES} value={form.type} onChange={v => set('type', v)} placeholder="Select Equipment" />
                </div>

                <div className="form-group">
                  <label className="form-label">Rent Per Day (₹)</label>
                  <input className="form-input" type="number" value={form.rent_per_day} onChange={e => set('rent_per_day', e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Details</label>
                  <textarea className="form-textarea" value={form.description} onChange={e => set('description', e.target.value)} />
                </div>
              </div>
            )}

            {role === 'worker' && (
              <div className="form-section anim-up delay-2">
                <div className="form-section-title">Work Details</div>
                
                <div className="form-group">
                  <label className="form-label">Primary Skill</label>
                  <CustomSelect options={SKILLS} value={form.skill} onChange={v => set('skill', v)} placeholder="Select Skill" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Experience (Years)</label>
                    <input className="form-input" type="number" value={form.experience} onChange={e => set('experience', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Daily Wage (₹)</label>
                    <input className="form-input" type="number" value={form.daily_wage} onChange={e => set('daily_wage', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            <div className="form-section anim-up delay-3">
              <div className="form-section-title">Availability</div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>From</div>
                    <CustomDatePicker value={form.available_from} onChange={val => set('available_from', val)} placeholder="Start date" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>To</div>
                    <CustomDatePicker value={form.available_to} onChange={val => set('available_to', val)} min={form.available_from} placeholder="End date" />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full anim-up delay-4" disabled={loading} style={{ padding: '16px', borderRadius: 'var(--r-lg)', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
            
          </form>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
