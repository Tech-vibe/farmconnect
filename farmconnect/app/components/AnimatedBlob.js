'use client';
import { useEffect, useRef } from 'react';

export default function AnimatedBlob() {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    const move = () => {
      const maxX = window.innerWidth - 360;
      const maxY = window.innerHeight - 360;
      const x = Math.random() * Math.max(maxX, 0);
      const y = Math.random() * Math.max(maxY, 0);
      blob.style.left = `${x}px`;
      blob.style.top  = `${y}px`;
    };

    // Kick off immediately, then every 10s (slow float)
    move();
    const id = setInterval(move, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="anim-blob-wrap" aria-hidden="true">
      <div ref={blobRef} className="anim-blob" />
    </div>
  );
}
