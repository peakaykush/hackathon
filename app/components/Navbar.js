'use client';

import { useState, useEffect } from 'react';
import { soundManager } from '../utils/sound';

export default function Navbar({ currentView, onNavigate }) {
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(soundManager.enabled);
  }, []);

  const handleToggleSound = () => {
    const newState = soundManager.toggle();
    setSoundOn(newState);
    if (newState) soundManager.playTick();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a
          href="#"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
        >
          <span className="nav-logo-icon">AP</span>
          <span>AzurePrep <span style={{ color: 'var(--azure)' }}>Pro</span></span>
        </a>

        <div className="nav-links">
          <button
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentView === 'study' ? 'active' : ''}`}
            onClick={() => onNavigate('study')}
          >
            Study Guide
          </button>
          <button
            className={`nav-link ${currentView === 'setup' ? 'active' : ''}`}
            onClick={() => onNavigate('setup')}
          >
            Practice
          </button>
          <button
            className={`nav-link ${currentView === 'exam_setup' ? 'active' : ''}`}
            onClick={() => onNavigate('exam_setup')}
          >
            Mock Exam
          </button>
          <button
            className={`nav-link ${currentView === 'analytics' ? 'active' : ''}`}
            onClick={() => onNavigate('analytics')}
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
            className="nav-link"
            href="https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'none', md: 'inline-block' }}
          >
            AZ-900 Outline
          </a>
        </div>
      </div>
    </nav>
  );
}
