'use client';
import { useRef, useState, useCallback } from 'react';

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const MAX_PHOTOS = 4;

export default function ImageUploader({ photos, onChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const processFiles = useCallback((files) => {
    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) return;

    const valid = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .slice(0, remaining);

    valid.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(prev => [...prev, { url: e.target.result, name: file.name }]);
      };
      reader.readAsDataURL(file);
    });
  }, [photos.length, onChange]);

  const handleInputChange = (e) => {
    processFiles(e.target.files);
    // reset so same file can be re-selected
    e.target.value = '';
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const removePhoto = (idx) => {
    onChange(prev => prev.filter((_, i) => i !== idx));
  };

  const canAddMore = photos.length < MAX_PHOTOS;

  return (
    <div>
      {/* Upload zone — hide when max reached */}
      {canAddMore && (
        <div
          className={`photo-upload-zone${dragging ? ' drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleInputChange}
            style={{ display: 'none' }}
            id="equipment-photo-input"
          />
          <div className="photo-upload-icon">
            <UploadIcon />
          </div>
          <div className="photo-upload-title">
            {photos.length === 0 ? 'Add equipment photos' : 'Add more photos'}
          </div>
          <div className="photo-upload-hint">
            <span>Tap to browse</span> or drag & drop here
            <br />
            JPG, PNG, WEBP · Up to {MAX_PHOTOS} photos
          </div>
        </div>
      )}

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div>
          {canAddMore && <div style={{ height: '10px' }} />}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="photo-count-badge">
              <ImageIcon />
              {photos.length} / {MAX_PHOTOS} photo{photos.length !== 1 ? 's' : ''} added
            </span>
            {!canAddMore && (
              <span style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>Maximum reached</span>
            )}
          </div>
          <div className="photo-grid">
            {photos.map((photo, idx) => (
              <div key={idx} className="photo-thumb">
                <img src={photo.url} alt={`Equipment photo ${idx + 1}`} />
                <button
                  type="button"
                  className="photo-thumb-remove"
                  onClick={() => removePhoto(idx)}
                  aria-label="Remove photo"
                  id={`remove-photo-${idx}`}
                >
                  ✕
                </button>
              </div>
            ))}
            {/* Add more tile — if under max and at least 1 photo */}
            {canAddMore && photos.length > 0 && (
              <div
                className="photo-thumb"
                onClick={() => inputRef.current?.click()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: 'var(--accent-light)',
                  border: '1.5px dashed var(--accent-mid)',
                  flexDirection: 'column',
                  gap: '4px',
                  color: 'var(--accent)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span style={{ fontSize: '0.6rem', fontWeight: 600 }}>Add</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
