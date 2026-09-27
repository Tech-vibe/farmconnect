'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { Icons } from '../../components/Icons';
import ImageUploader from '../../components/ImageUploader';
import CustomSelect from '../../components/CustomSelect';
import CustomDatePicker from '../../components/CustomDatePicker';

const EQUIPMENT_TYPES = ['Tractor', 'Paddy Harvester', 'Mini Tiller', 'Rotavator', 'Water Pump', 'Sprayer', 'Thresher', 'Plough', 'Seed Drill', 'Other'];
const STATES = ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'Other'];

export default function ListEquipmentPage() {
  const [form, setForm] = useState({ name: '', type: '', rent_per_day: '', location: '', state: '', contact: '', available_from: '', available_to: '', description: '' });
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); if (errors[f]) setErrors(p => ({ ...p, [f]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                      e.name        = 'Name is required';
    if (!form.type)                              e.type        = 'Select equipment type';
    if (!form.rent_per_day || isNaN(form.rent_per_day)) e.rent_per_day = 'Enter a valid amount';
    if (!form.location.trim())                   e.location    = 'Location is required';
    if (!form.contact.trim() || form.contact.length < 10) e.contact = 'Enter a valid 10-digit number';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          purpose: form.description || 'General Farming',
          rent_per_day: parseFloat(form.rent_per_day),
          location: form.location,
          contact: form.contact,
          vendor_name: form.name,
          image_url: photos.length > 0 ? photos[0].url : null,
          available: true
        })
      });
      if (!response.ok) throw new Error('Failed to save to database');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the backend database.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="page-content">
          <div className="container">
            <div className="success-screen anim-scale">
              {photos.length > 0 ? (
                <div style={{ width: 80, height: 80, borderRadius: 'var(--r-xl)', overflow: 'hidden', margin: '0 auto 20px', border: '2px solid var(--accent-mid)' }}>
                  <img src={photos[0].url} alt="Equipment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div className="success-icon"><Icons.Check /></div>
              )}
              <div className="success-title">Equipment Listed</div>
              <p className="success-desc">
                Your {form.type} in {form.location} is now visible to farmers nearby.
              </p>
              <div className="success-summary">
                <div className="success-summary-title">Listing Details</div>
                {[
                  ['Type',     form.type],
                  ['Photos',   photos.length ? `${photos.length} photo${photos.length > 1 ? 's' : ''} uploaded` : 'None'],
                  ['Rent/Day', `₹${form.rent_per_day}`],
                  ['Location', form.location],
                  ['Contact',  form.contact],
                  ['Available', form.available_from && form.available_to ? `${form.available_from} → ${form.available_to}` : 'Anytime']
                ].map(([k, v]) => (
                  <div key={k} className="success-summary-row">
                    <span className="success-summary-key">{k}</span>
                    <span className="success-summary-val">{v}</span>
                  </div>
                ))}
              </div>
              <button id="list-another-equipment" className="btn btn-primary btn-full" onClick={() => { setForm({ name: '', type: '', rent_per_day: '', location: '', state: '', contact: '', available_from: '', available_to: '', description: '' }); setPhotos([]); setSubmitted(false); }}>
                List Another
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
            <h1 className="page-title">List Equipment</h1>
            <p className="page-subtitle">Register your machinery for farmers to rent</p>
          </div>

          <form id="list-equipment-form" onSubmit={handleSubmit}>

            {/* Owner & type */}
            <div className="form-section anim-up delay-1">
              <div className="form-section-title">Basic Info</div>

              <div className="form-group">
                <label className="form-label" htmlFor="owner-name"><Icons.Worker /> Owner / Business Name *</label>
                <input id="owner-name" className="form-input" type="text" placeholder="e.g. Rajesh Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="equipment-type"><Icons.Tractor /> Equipment Type *</label>
                <CustomSelect 
                  id="equipment-type"
                  options={EQUIPMENT_TYPES} 
                  value={form.type} 
                  onChange={val => set('type', val)} 
                  placeholder="Select type..."
                />
                {errors.type && <div className="form-error">{errors.type}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-faint)' }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  Equipment Photos
                </label>
                <ImageUploader photos={photos} onChange={setPhotos} />
                <div className="form-hint">Photos help farmers see the real condition of your equipment</div>
              </div>
            </div>

            {/* Pricing & location */}
            <div className="form-section anim-up delay-2">
              <div className="form-section-title">Pricing & Location</div>

              <div className="form-group">
                <label className="form-label" htmlFor="rent-per-day"><Icons.Currency /> Rent per Day (₹) *</label>
                <input id="rent-per-day" className="form-input" type="number" placeholder="1500" value={form.rent_per_day} onChange={e => set('rent_per_day', e.target.value)} min="0" />
                {errors.rent_per_day && <div className="form-error">{errors.rent_per_day}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="equipment-location"><Icons.MapPin /> City / Village *</label>
                <input id="equipment-location" className="form-input" type="text" placeholder="e.g. Palakkad" value={form.location} onChange={e => set('location', e.target.value)} />
                {errors.location && <div className="form-error">{errors.location}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="equipment-state">State</label>
                <CustomSelect 
                  id="equipment-state"
                  options={STATES} 
                  value={form.state} 
                  onChange={val => set('state', val)} 
                  placeholder="Select state..."
                />
              </div>
            </div>

            {/* Contact & availability */}
            <div className="form-section anim-up delay-3">
              <div className="form-section-title">Contact & Availability</div>

              <div className="form-group">
                <label className="form-label" htmlFor="equipment-contact"><Icons.Phone /> Contact Number *</label>
                <input id="equipment-contact" className="form-input" type="tel" placeholder="10-digit mobile number" value={form.contact} onChange={e => set('contact', e.target.value)} maxLength={10} />
                {errors.contact && <div className="form-error">{errors.contact}</div>}
              </div>

              <div className="form-group">
                <label className="form-label"><Icons.Calendar /> Availability Dates</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>From</div>
                    <CustomDatePicker 
                      value={form.available_from} 
                      onChange={val => set('available_from', val)} 
                      placeholder="Start date" 
                    />
                    {errors.available_from && <div className="form-error">{errors.available_from}</div>}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>To</div>
                    <CustomDatePicker 
                      value={form.available_to} 
                      onChange={val => set('available_to', val)} 
                      min={form.available_from}
                      placeholder="End date" 
                    />
                    {errors.available_to && <div className="form-error">{errors.available_to}</div>}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="equipment-description">Additional Details</label>
                <textarea id="equipment-description" className="form-textarea" placeholder="Model, year, capacity, special features..." value={form.description} onChange={e => set('description', e.target.value)} />
              </div>
            </div>

            <button type="submit" id="submit-equipment" className="btn btn-primary btn-full anim-up delay-4" disabled={loading} style={{ padding: '14px', borderRadius: 'var(--r-lg)', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Listing...' : 'List Equipment'}
            </button>
          </form>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
