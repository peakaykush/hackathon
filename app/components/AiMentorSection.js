'use client';

import { useState } from 'react';
import { getEnhancedQuestionAnalysis } from '../utils/aiMentor';

export default function AiMentorSection({ question, selectedIndex }) {
  const [activeTab, setActiveTab] = useState('explanation'); // explanation, eli5, distractors, enterprise, trap
  const analysis = getEnhancedQuestionAnalysis(question, selectedIndex);

  return (
    <div className="ai-mentor-container">
      <div className="ai-mentor-header">
        <div className="ai-mentor-title">
          <span className="badge" style={{ background: 'var(--azure-faint)', color: 'var(--azure)', border: '1px solid var(--azure-faint-border)', fontWeight: 600 }}>
            MENTOR ANALYSIS
          </span>
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Azure Concept Deep-Dive</span>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="ai-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '12px 0 16px' }}>
        <button
          className={`ai-tab-btn ${activeTab === 'explanation' ? 'active' : ''}`}
          onClick={() => setActiveTab('explanation')}
        >
          Core Concept
        </button>
        <button
          className={`ai-tab-btn ${activeTab === 'eli5' ? 'active' : ''}`}
          onClick={() => setActiveTab('eli5')}
        >
          Intuition & Analogy
        </button>
        <button
          className={`ai-tab-btn ${activeTab === 'distractors' ? 'active' : ''}`}
          onClick={() => setActiveTab('distractors')}
        >
          Distractor Breakdown
        </button>
        <button
          className={`ai-tab-btn ${activeTab === 'enterprise' ? 'active' : ''}`}
          onClick={() => setActiveTab('enterprise')}
        >
          Enterprise Pattern
        </button>
        <button
          className={`ai-tab-btn ${activeTab === 'trap' ? 'active' : ''}`}
          onClick={() => setActiveTab('trap')}
        >
          Exam Trap
        </button>
      </div>

      {/* Tab Content */}
      <div className="ai-tab-content" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>
        {activeTab === 'explanation' && (
          <div>
            <p style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>{analysis.explanation}</p>
            {analysis.tip && (
              <div style={{ marginTop: '12px', padding: '10px 14px', background: 'var(--bg-inset)', borderLeft: '3px solid var(--azure)', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--azure)', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Key Exam Principle
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>{analysis.tip}</div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'eli5' && (
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Simplified Mental Model
            </div>
            <p style={{ color: 'var(--text-primary)' }}>{analysis.eli5}</p>
          </div>
        )}

        {activeTab === 'distractors' && (
          <div className="distractor-list">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Understanding why incorrect options fail is essential for official Microsoft certification:
            </div>
            {analysis.optionBreakdowns.map(opt => (
              <div
                key={opt.letter}
                className={`distractor-item ${opt.isCorrect ? 'correct' : 'incorrect'}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '10px 12px',
                  marginBottom: '8px',
                  borderRadius: '6px',
                  background: opt.isCorrect ? 'var(--green-faint)' : 'var(--bg-card)',
                  border: opt.isCorrect ? '1px solid var(--green-border)' : '1px solid var(--border)'
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: opt.isCorrect ? 'var(--green)' : 'var(--bg-inset)',
                    color: opt.isCorrect ? '#ffffff' : 'var(--text-secondary)',
                    flexShrink: 0
                  }}
                >
                  {opt.letter}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {opt.text} {opt.isCorrect && <span style={{ color: 'var(--green)', fontSize: '0.8rem', marginLeft: '6px' }}>[Correct Answer]</span>}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: opt.isCorrect ? 'var(--text-secondary)' : 'var(--text-muted)', marginTop: '3px' }}>
                    {opt.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'enterprise' && (
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--azure)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Production Architecture Context
            </div>
            <p style={{ color: 'var(--text-primary)' }}>{analysis.enterpriseScenario}</p>
          </div>
        )}

        {activeTab === 'trap' && (
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--red)', marginBottom: '6px', textTransform: 'uppercase' }}>
              Common Exam Distractor Pattern
            </div>
            <p style={{ color: 'var(--text-primary)' }}>{analysis.examTrap}</p>
          </div>
        )}
      </div>
    </div>
  );
}
