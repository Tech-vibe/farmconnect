'use client';
import { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';

export default function CustomDatePicker({ value, onChange, placeholder, min }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (e, day) => {
    e.stopPropagation();
    e.preventDefault();
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Format as YYYY-MM-DD local time
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dStr = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${dStr}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const prevMonth = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Calendar logic
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0-6 (Sun-Sat)
  
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="custom-select-container" ref={containerRef}>
      <div 
        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <span className={!value ? 'placeholder' : ''}>{value || placeholder}</span>
        <div className="select-icon" style={{ display: 'flex' }}>
          <Icons.Calendar style={{ width: 16, height: 16, color: isOpen ? 'var(--green-500)' : 'var(--text-muted)' }} />
        </div>
      </div>
      
      {isOpen && (
        <div className="custom-select-dropdown anim-scale" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <button onClick={prevMonth} className="btn-icon"><Icons.ChevronLeft /></button>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{monthNames[month]} {year}</div>
            <button onClick={nextMonth} className="btn-icon"><Icons.ChevronRight /></button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {days.map((day, idx) => {
              if (!day) return <div key={idx} />;
              
              const d = new Date(year, month, day);
              const y = d.getFullYear();
              const m = String(d.getMonth() + 1).padStart(2, '0');
              const dStr = String(d.getDate()).padStart(2, '0');
              const dateStr = `${y}-${m}-${dStr}`;
              
              const isSelected = value === dateStr;
              let isDisabled = false;
              if (min) {
                isDisabled = dateStr < min;
              }

              return (
                <div 
                  key={idx}
                  onClick={(e) => !isDisabled && handleSelect(e, day)}
                  className={`calendar-day ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
