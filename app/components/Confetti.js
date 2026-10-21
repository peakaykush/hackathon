'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

/**
 * Confetti effect component - triggers on quiz completion
 */
export default function Confetti({ trigger }) {
  const [pieces, setPieces] = useState([]);
  const hasFired = useRef(false);

  useEffect(() => {
    if (trigger && !hasFired.current) {
      hasFired.current = true;
      const colors = ['#0078d4', '#8b5cf6', '#ec4899', '#50e6ff', '#10b981', '#f59e0b', '#ef4444'];
      const shapes = ['square', 'circle'];
      const newPieces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 8 + 6,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);
      
      // Clear after animation
      const timer = setTimeout(() => setPieces([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (pieces.length === 0) return null;

  return (
    <div className="confetti-container">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
