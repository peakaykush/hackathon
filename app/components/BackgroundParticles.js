'use client';

import { useState, useCallback, useMemo } from 'react';

/**
 * Background animated particles
 */
function BackgroundParticles() {
  const particles = useMemo(() => {
    const colors = ['#0078d4', '#8b5cf6', '#ec4899', '#50e6ff', '#06b6d4', '#10b981'];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      background: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: `${Math.random() * 20 + 15}s`,
      animationDelay: `${Math.random() * 10}s`,
    }));
  }, []);

  return (
    <div className="bg-particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            background: p.background,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
          }}
        />
      ))}
    </div>
  );
}

export default BackgroundParticles;
