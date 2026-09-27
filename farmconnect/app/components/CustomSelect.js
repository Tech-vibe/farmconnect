'use client';
import { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';

export default function CustomSelect({ options, value, onChange, placeholder, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (e, opt) => {
    e.stopPropagation();
    e.preventDefault();
    onChange(opt);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container" ref={containerRef} id={id}>
      <div 
        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <span className={!value ? 'placeholder' : ''}>{value || placeholder}</span>
        <Icons.ChevronDown className="select-icon" />
      </div>
      
      {isOpen && (
        <div className="custom-select-dropdown anim-scale" style={{ animationDuration: '0.2s' }}>
          {options.map((opt) => (
            <div 
              key={opt} 
              className={`custom-select-option ${value === opt ? 'selected' : ''}`}
              onClick={(e) => handleSelect(e, opt)}
            >
              {opt}
              {value === opt && <div style={{ color: 'var(--green-500)', marginLeft: 'auto' }}><Icons.Check style={{ width: 14, height: 14 }} /></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
