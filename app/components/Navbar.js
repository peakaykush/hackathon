'use client';

import { useState, useEffect } from 'react';
import { soundManager } from '../utils/sound';

export default function Navbar({ currentView, onNavigate }) {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundOn(soundManager.enabled);
  }, []);

  const handleToggleSound = () => {
    const newState = soundManager.toggle();
    setSoundOn(newState);
    if (newState) soundManager.playTick();
  };

  const handleNav = (view) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a
          href="#"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); handleNav('home'); }}
        >
          <span className="nav-logo-icon">AP</span>
          <span>AzurePrep <span style={{ color: 'var(--azure)' }}>Pro</span></span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links">
          <button
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentView === 'study' ? 'active' : ''}`}
            onClick={() => handleNav('study')}
          >
            Study Guide
          </button>
          <button
            className={`nav-link ${currentView === 'setup' ? 'active' : ''}`}
            onClick={() => handleNav('setup')}
          >
            Practice
          </button>
          <button
            className={`nav-link ${currentView === 'exam_setup' ? 'active' : ''}`}
            onClick={() => handleNav('exam_setup')}
          >
            Mock Exam
          </button>
          <button
            className={`nav-link ${currentView === 'analytics' ? 'active' : ''}`}
            onClick={() => handleNav('analytics')}
          >
            Progress
          </button>

          <button
            className={`sound-toggle-btn ${soundOn ? 'sound-active' : 'sound-muted'}`}
            onClick={handleToggleSound}
            title={soundOn ? 'Sound Effects Enabled' : 'Sound Muted'}
          >
            <span className="sound-indicator-dot" />
            <span>{soundOn ? 'Sound On' : 'Sound Muted'}</span>
          </button>

          <a
            className="nav-link nav-external-link"
            href="https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
            target="_blank"
            rel="noopener noreferrer"
          >
            AZ-900 Outline ↗
          </a>
        </div>

        {/* Mobile Header Actions */}
        <div className="nav-mobile-actions">
          <button
            className={`sound-toggle-btn sound-mobile-btn ${soundOn ? 'sound-active' : 'sound-muted'}`}
            onClick={handleToggleSound}
            aria-label={soundOn ? 'Sound Effects Enabled' : 'Sound Muted'}
            title={soundOn ? 'Sound On' : 'Sound Muted'}
          >
            <span className="sound-indicator-dot" />
            <span className="sound-text">{soundOn ? 'Sound' : 'Muted'}</span>
          </button>

          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-icon">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <>
          <div className="nav-mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
          <div className="nav-mobile-drawer">
            <button
              className={`nav-mobile-link ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => handleNav('home')}
            >
              <span>🏠</span> Home
            </button>
            <button
              className={`nav-mobile-link ${currentView === 'study' ? 'active' : ''}`}
              onClick={() => handleNav('study')}
            >
              <span>📖</span> Study Guide & Cheat Sheet
            </button>
            <button
              className={`nav-mobile-link ${currentView === 'setup' ? 'active' : ''}`}
              onClick={() => handleNav('setup')}
            >
              <span>🎯</span> Practice Quizzes
            </button>
            <button
              className={`nav-mobile-link ${currentView === 'exam_setup' ? 'active' : ''}`}
              onClick={() => handleNav('exam_setup')}
            >
              <span>⏱️</span> Pearson VUE Mock Exam
            </button>
            <button
              className={`nav-mobile-link ${currentView === 'analytics' ? 'active' : ''}`}
              onClick={() => handleNav('analytics')}
            >
              <span>📊</span> Progress & Readiness Index
            </button>
            <a
              className="nav-mobile-link nav-mobile-external"
              href="https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>🔗</span> Official AZ-900 Outline ↗
            </a>
          </div>
        </>
      )}
    </nav>
  );
}
