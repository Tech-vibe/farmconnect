'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { Icons } from '../components/Icons';

// ── Mock Data ──────────────────────────────────────────────
const MOCK_EQUIPMENT = [
  { id: 1, name: 'Rajesh Kumar',       type: 'Tractor — John Deere 5050D', rent_per_day: 1800, location: 'Palakkad',   contact: '9876543210', available: true,  rating: 4.8, distance: '2.3 km', images: [] },
  { id: 2, name: 'Suresh Farms',        type: 'Mini Tiller',                rent_per_day: 600,  location: 'Thrissur',   contact: '9123456789', available: true,  rating: 4.5, distance: '5.1 km', images: [] },
  { id: 3, name: 'Agri Tools Co.',      type: 'Paddy Harvester',            rent_per_day: 3200, location: 'Palakkad',   contact: '9988776655', available: false, rating: 4.9, distance: '8.7 km', images: [] },
  { id: 4, name: 'Mohan Equipment',     type: 'Water Pump',                 rent_per_day: 350,  location: 'Coimbatore', contact: '8877665544', available: true,  rating: 4.3, distance: '12.0 km', images: [] },
  { id: 5, name: 'Green Fields Rental', type: 'Rotavator',                  rent_per_day: 900,  location: 'Palakkad',   contact: '9554433221', available: true,  rating: 4.6, distance: '3.8 km', images: [] },
];

const MOCK_WORKERS = [
  { id: 1, name: 'Rajan K',           skill: 'Harvesting',            daily_wage: 800, location: 'Thrissur',   contact: '9876543210', available_from: '2024-01-10', available_to: '2024-01-20', rating: 4.7, distance: '4.2 km', experience: '8 yrs' },
  { id: 2, name: 'Anil Menon',        skill: 'Planting & Sowing',     daily_wage: 650, location: 'Palakkad',   contact: '9345678901', available_from: '2024-01-08', available_to: '2024-01-25', rating: 4.5, distance: '1.8 km', experience: '5 yrs' },
  { id: 3, name: 'Priya Devi',        skill: 'Weeding',               daily_wage: 550, location: 'Palakkad',   contact: '9211234567', available_from: '2024-01-12', available_to: '2024-01-18', rating: 4.8, distance: '6.3 km', experience: '12 yrs' },
  { id: 4, name: 'Sunil Farm Workers',skill: 'Pesticide Spraying',    daily_wage: 900, location: 'Coimbatore', contact: '8811223344', available_from: '2024-01-15', available_to: '2024-02-01', rating: 4.4, distance: '9.5 km', experience: '3 yrs' },
  { id: 5, name: 'Murugan K',         skill: 'Irrigation & Watering', daily_wage: 700, location: 'Thrissur',   contact: '9944556677', available_from: '2024-01-09', available_to: '2024-01-22', rating: 4.6, distance: '7.1 km', experience: '10 yrs' },
];

const CITIES = ['Palakkad', 'Thrissur', 'Coimbatore', 'Ernakulam', 'Kozhikode'];
const EQUIP_TYPES = ['All', 'Tractor', 'Harvester', 'Tiller', 'Water Pump', 'Rotavator'];
const WORKER_SKILLS = ['All', 'Harvesting', 'Planting', 'Weeding', 'Spraying', 'Irrigation'];

function Rating({ value }) {
  return (
    <span className="result-rating">
      <Icons.Star />
      {value}
    </span>
  );
}

function EquipmentCard({ item, index }) {
  return (
    <div className={`result-card anim-up delay-${Math.min(index + 1, 4)}`}>

      {/* Photo strip */}
      <div className="card-image-wrap">
        {item.images && item.images.length > 0 ? (
          <>
            <img src={item.images[0].url} alt={item.type} />
            {item.images.length > 1 && (
              <span className="card-image-count">{item.images.length} photos</span>
            )}
          </>
        ) : (
          <div className="card-image-placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className="result-card-top">
        <div className="result-card-name-row">
          <div>
            <div className="result-card-name">{item.name}</div>
            <div className="result-card-type">{item.type}</div>
          </div>
          <span className={`availability-badge ${item.available ? 'available' : 'booked'}`}>
            {item.available ? 'Available' : 'Booked'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <Rating value={item.rating} />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Icons.MapPin /> {item.distance}
          </span>
        </div>
      </div>

      <div className="result-card-body">
        <div className="result-meta">
          <div className="result-meta-item">
            <div className="result-meta-label">Rent / Day</div>
            <div className="result-meta-value price">₹{item.rent_per_day.toLocaleString()}</div>
          </div>
          <div className="result-meta-item">
            <div className="result-meta-label">Location</div>
            <div className="result-meta-value" style={{ fontSize: '0.84rem' }}>{item.location}</div>
          </div>
        </div>

        <button
          id={`call-equipment-${item.id}`}
          className="btn-call"
          onClick={() => { window.location.href = `tel:${item.contact}`; }}
        >
          <Icons.Phone />
          Call — {item.contact}
        </button>
      </div>
    </div>
  );
}

function WorkerCard({ item, index }) {
  const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <div className={`result-card anim-up delay-${Math.min(index + 1, 4)}`}>
      <div className="result-card-top">
        <div className="result-card-name-row">
          <div>
            <div className="result-card-name">{item.name}</div>
            <div className="result-card-type">{item.skill} · {item.experience}</div>
          </div>
          <Rating value={item.rating} />
        </div>
        <div style={{ marginTop: '8px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Icons.MapPin /> {item.distance} · {item.location}
          </span>
        </div>
      </div>

      <div className="result-card-body">
        <div className="result-meta">
          <div className="result-meta-item">
            <div className="result-meta-label">Daily Wage</div>
            <div className="result-meta-value price" style={{ color: 'var(--amber-600)' }}>₹{item.daily_wage}</div>
          </div>
          <div className="result-meta-item">
            <div className="result-meta-label">Available</div>
            <div className="result-meta-value" style={{ fontSize: '0.78rem' }}>
              {fmt(item.available_from)} – {fmt(item.available_to)}
            </div>
          </div>
        </div>

        <button
          id={`call-worker-${item.id}`}
          className="btn-call"
          onClick={() => { window.location.href = `tel:${item.contact}`; }}
          style={{ background: 'var(--amber-600)' }}
        >
          <Icons.Phone />
          Call — {item.contact}
        </button>
      </div>
    </div>
  );
}

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'workers' ? 'workers' : 'equipment';
  const initialQ = searchParams.get('q') || '';

  const [step, setStep] = useState(initialQ ? 2 : 1);
  const [category, setCategory] = useState(initialType);
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => { setCategory(initialType); }, [initialType]);
  
  // Reset filter when category changes unless we just loaded from a query
  useEffect(() => { if (!initialQ) setFilterType('All'); }, [category]);

  // Process the global search query if it exists
  useEffect(() => {
    if (initialQ) {
      const qLower = initialQ.toLowerCase();
      
      // Try to find a city in the text
      const foundCity = CITIES.find(c => qLower.includes(c.toLowerCase()));
      if (foundCity) setLocation(foundCity);
      else setLocation(initialQ); // Fallback to raw string

      // Try to find an equipment type or skill
      const types = category === 'equipment' ? EQUIP_TYPES : WORKER_SKILLS;
      const foundType = types.find(t => t !== 'All' && qLower.includes(t.toLowerCase()));
      if (foundType) setFilterType(foundType);
    }
  }, [initialQ, category]);

  const handleSearch = async () => {
    if (!location.trim()) return;
    setLoading(true);
    setStep(3);
    
    try {
      const endpoint = category === 'equipment' ? 'equipment' : 'workers';
      let url = `http://127.0.0.1:8000/api/${endpoint}?location=${encodeURIComponent(location)}`;
      
      if (filterType !== 'All') {
        url += category === 'equipment' ? `&type=${encodeURIComponent(filterType)}` : `&skill=${encodeURIComponent(filterType)}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) throw new Error('Failed to fetch from backend');
      
      const data = await response.json();
      
      // Map backend fields to frontend expectations (e.g. image_url -> images array, add dummy ratings)
      const mapped = data.map(item => ({
        ...item,
        rating: item.rating || (4.0 + Math.random()).toFixed(1),
        distance: item.distance || (Math.random() * 15 + 1).toFixed(1) + ' km',
        images: item.image_url ? [{ url: item.image_url }] : []
      }));
      
      setResults(mapped);
    } catch (err) {
      console.error('Backend search failed:', err);
      // Fallback to mock data if backend isn't running or empty
      const pool = category === 'equipment' ? MOCK_EQUIPMENT : MOCK_WORKERS;
      const filtered = pool.filter(i =>
        (i.location.toLowerCase().includes(location.toLowerCase()) ||
         location.toLowerCase().includes(i.location.toLowerCase())) &&
        (filterType === 'All' || (category === 'equipment' ? i.type.includes(filterType) : i.skill.includes(filterType)))
      );
      setResults(filtered.length ? filtered : pool);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setStep(1); setLocation(''); setFilterType('All'); setResults([]); };

  return (
    <>
      <Navbar />
      <main className="page-content">
        <div className="container">

          {/* Page header */}
          <div className="page-header">
            <h1 className="page-title">
              {step === 3 ? `${results.length} results` : 'Discover'}
            </h1>
            <p className="page-subtitle">
              {step === 1 && 'What are you looking for?'}
              {step === 2 && 'Where do you need it?'}
              {step === 3 && `${category === 'equipment' ? 'Equipment' : 'Workers'} near ${location}`}
            </p>
          </div>

          {/* Step indicator */}
          {step < 3 && (
            <div className="step-indicator">
              {[1,2,3].map((s, i) => (
                <span key={s} style={{ display: 'contents' }}>
                  <div className={`step-circle ${s < step ? 'done' : s === step ? 'active' : 'pending'}`}>
                    {s < step ? <Icons.Check /> : s}
                  </div>
                  {i < 2 && <div className={`step-connector ${s < step ? 'done' : 'pending'}`} />}
                </span>
              ))}
            </div>
          )}

          {/* ── STEP 1: Category ── */}
          {step === 1 && (
            <div className="anim-scale">
              <button
                id="category-equipment"
                className="cta-wide"
                style={{ width: '100%', marginBottom: '10px', border: 'none', fontFamily: 'inherit', textAlign: 'left' }}
                onClick={() => { setCategory('equipment'); setStep(2); }}
              >
                <div className="cta-wide-icon">
                  <Icons.Tractor />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="cta-wide-title">Farm Equipment</div>
                  <div className="cta-wide-desc">Tractors, harvesters, tillers, pumps</div>
                </div>
                <Icons.ChevronRight />
              </button>

              <button
                id="category-workers"
                className="cta-wide"
                style={{ width: '100%', marginBottom: '10px', border: 'none', fontFamily: 'inherit', textAlign: 'left' }}
                onClick={() => { setCategory('workers'); setStep(2); }}
              >
                <div className="cta-wide-icon">
                  <Icons.Worker />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="cta-wide-title">Skilled Workers</div>
                  <div className="cta-wide-desc">Harvesters, planters, irrigators</div>
                </div>
                <Icons.ChevronRight />
              </button>
            </div>
          )}

          {/* ── STEP 2: Location ── */}
          {step === 2 && (
            <div className="anim-scale">
              <div className="form-section" style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ padding: '7px', borderRadius: 'var(--r-md)', background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    {category === 'equipment' ? <Icons.Tractor /> : <Icons.Worker />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{category}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Select location to continue</div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="location-input">
                    <Icons.MapPin />
                    City or Village
                  </label>
                  <input
                    id="location-input"
                    className="form-input"
                    type="text"
                    placeholder="e.g. Palakkad, Thrissur..."
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    autoFocus
                  />
                </div>

                <div style={{ marginBottom: '4px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Nearby cities</div>
                  <div className="city-chips">
                    {CITIES.map(city => (
                      <button key={city} className={`city-chip${location === city ? ' selected' : ''}`} onClick={() => setLocation(city)}>
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    {category === 'equipment' ? 'Equipment Type' : 'Worker Skill'}
                  </div>
                  <div className="pill-grid">
                    {(category === 'equipment' ? EQUIP_TYPES : WORKER_SKILLS).map(s => (
                      <button 
                        key={s} 
                        className={`pill-btn${filterType === s ? ' active' : ''}`} 
                        onClick={() => setFilterType(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                <button id="back-btn" className="btn btn-ghost btn-full" onClick={() => setStep(1)}>
                  <Icons.ChevronLeft /> Back
                </button>
                <button
                  id="search-btn"
                  className="btn btn-primary btn-full"
                  onClick={handleSearch}
                  disabled={!location.trim()}
                  style={{ opacity: !location.trim() ? 0.5 : 1 }}
                >
                  Search
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Results ── */}
          {step === 3 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <button
                  id="new-search-btn"
                  onClick={reset}
                  className="btn btn-ghost btn-sm"
                >
                  <Icons.ChevronLeft /> New search
                </button>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {location}
                </span>
              </div>

              {loading ? (
                <div className="empty-state anim-fade">
                  <div className="empty-icon"><Icons.Discover /></div>
                  <div className="empty-title">Searching...</div>
                  <div className="empty-desc">Finding the best options near you</div>
                  <div className="loading-bar-track">
                    <div className="loading-bar-fill" />
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon"><Icons.Discover /></div>
                  <div className="empty-title">No results found</div>
                  <div className="empty-desc">Try a different city or category</div>
                  <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={reset}>Try again</button>
                </div>
              ) : (
                results.map((item, i) =>
                  category === 'equipment'
                    ? <EquipmentCard key={item.id} item={item} index={i} />
                    : <WorkerCard key={item.id} item={item} index={i} />
                )
              )}
            </div>
          )}

        </div>
      </main>
      <BottomNav />
    </>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="empty-state"><div className="empty-icon"><Icons.Discover /></div></div>}>
      <DiscoverContent />
    </Suspense>
  );
}
