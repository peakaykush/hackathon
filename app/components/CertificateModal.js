'use client';

import { useState } from 'react';
import { storage } from '../utils/storage';

export default function CertificateModal({ score, totalQuestions, onClose }) {
  const [learnerName, setLearnerName] = useState(() => {
    return storage.getUserProfile().name || 'Azure Cloud Professional';
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveName = () => {
    storage.saveUserProfile({ name: learnerName });
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const certId = 'AZ900-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="certificate-overlay" onClick={onClose}>
      <div className="certificate-box" onClick={(e) => e.stopPropagation()} style={{ border: '2px solid var(--border)', background: '#ffffff', color: '#1b1f24', padding: '40px', maxWidth: '640px', width: '90%', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}>
        <button
          className="icon-btn"
          style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'transparent', fontSize: '1rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Seal Monogram */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: '2px solid var(--azure)',
            color: 'var(--azure)',
            fontSize: '1rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            margin: '0 auto'
          }}>
            AZ
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '4px', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>
          Certificate of Exam Readiness
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
          Microsoft Certified: Azure Fundamentals (AZ-900)
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0 8px', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
          This certifies that
        </div>

        {isEditing ? (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '12px 0' }}>
            <input
              type="text"
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              className="search-input"
              style={{ maxWidth: '320px', textAlign: 'center', fontWeight: 'bold' }}
              autoFocus
            />
            <button className="btn btn-primary" onClick={handleSaveName}>
              Save
            </button>
          </div>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            title="Click to edit name"
            style={{
              textAlign: 'center',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#0f172a',
              padding: '6px 12px',
              borderBottom: '1px dashed #cbd5e1',
              display: 'inline-block',
              margin: '0 auto',
              cursor: 'pointer'
            }}
          >
            {learnerName}
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '8px', fontWeight: 400 }}>(edit)</span>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: '500px', margin: '16px auto 24px' }}>
          has demonstrated foundational proficiency across Cloud Concepts, Azure Architecture & Services, and Azure Management & Governance with an exam readiness score of <strong>{score}%</strong> ({Math.round(score * 10)}/1000).
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #e2e8f0', paddingTop: '16px', margin: '20px 0', fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>Issue Date</div>
            <div>{issueDate}</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>Credential ID</div>
            <div style={{ fontFamily: 'var(--font-mono)' }}>{certId}</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>Program</div>
            <div>#1MillionDevs Movement</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '24px' }}>
          <button className="btn btn-primary" onClick={handlePrint}>
            Print / Save PDF
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
