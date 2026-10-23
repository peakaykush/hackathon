'use client';

import { useState, useMemo } from 'react';
import { STUDY_SECTIONS } from '../data/studyGuide';

export default function StudyGuideView({ onStartPracticeWithTopic }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');

  const filteredSections = useMemo(() => {
    return STUDY_SECTIONS.map(sec => {
      if (selectedSection !== 'all' && sec.id !== selectedSection) {
        return null;
      }

      const matchingTopics = sec.topics.filter(topic => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        const matchesName = topic.name.toLowerCase().includes(q);
        const matchesSummary = topic.summary.toLowerCase().includes(q);
        const matchesPoints = topic.points.some(p => p.term.toLowerCase().includes(q) || p.def.toLowerCase().includes(q));
        return matchesName || matchesSummary || matchesPoints;
      });

      if (matchingTopics.length === 0) return null;

      return {
        ...sec,
        topics: matchingTopics,
      };
    }).filter(Boolean);
  }, [searchQuery, selectedSection]);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', animation: 'fadeInUp 0.3s ease-out' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="hero-badge" style={{ marginBottom: 'var(--space-xs)' }}>
          <span>High-Yield Study Reference</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 'var(--space-xs)', color: 'var(--text-primary)' }}>
          AZ-900 Exam Study Guide
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Key terminology, shared responsibility tables, architectural patterns, and verified exam tips.
        </p>
      </div>

      {/* Search & Topic Filters */}
      <div className="study-search-bar" style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-md)' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Filter by concept (e.g. ExpressRoute, Blob, CapEx, Sentinel, RBAC)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-card)', fontSize: '0.9rem', color: 'var(--text-primary)' }}
        />
        {searchQuery && (
          <button className="btn btn-secondary" onClick={() => setSearchQuery('')} style={{ fontSize: '0.85rem' }}>
            Clear
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
        <button
          className={`ai-tab-btn ${selectedSection === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedSection('all')}
        >
          All Domains
        </button>
        {STUDY_SECTIONS.map(sec => (
          <button
            key={sec.id}
            className={`ai-tab-btn ${selectedSection === sec.id ? 'active' : ''}`}
            onClick={() => setSelectedSection(sec.id)}
          >
            <span style={{ fontWeight: 700, marginRight: '4px', opacity: 0.8 }}>[{sec.icon}]</span>
            {sec.title.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {/* Content */}
      {filteredSections.length === 0 ? (
        <div className="glass-card-static" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--text-primary)' }}>No matching concepts found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
            Try searching for terms like &quot;IaaS&quot;, &quot;Blob&quot;, &quot;ExpressRoute&quot;, or &quot;Locks&quot;.
          </p>
          <button className="btn btn-primary" onClick={() => setSearchQuery('')}>
            Reset Filter
          </button>
        </div>
      ) : (
        filteredSections.map(sec => (
          <div key={sec.id} className="study-topic-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
            <div className="study-topic-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-md)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: 'var(--bg-inset)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)'
                  }}>
                    {sec.icon}
                  </span>
                  <span>{sec.title}</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                  {sec.description}
                </p>
              </div>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                onClick={() => onStartPracticeWithTopic(sec.id)}
              >
                Practice Domain Questions →
              </button>
            </div>

            {/* Topics inside this section */}
            {sec.topics.map(topic => (
              <div key={topic.id} style={{ marginBottom: 'var(--space-xl)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-xs)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {topic.name}
                  </h3>
                  <span style={{ fontSize: '0.72rem', background: 'var(--bg-inset)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)', fontWeight: 600 }}>
                    {topic.badge}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: 'var(--space-sm)' }}>
                  {topic.summary}
                </p>

                {/* Points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 'var(--space-md)' }}>
                  {topic.points.map((pt, idx) => (
                    <div key={idx} className="study-point-card" style={{ padding: '8px 12px', background: 'var(--bg-inset)', borderRadius: '4px', fontSize: '0.86rem', lineHeight: '1.5' }}>
                      <strong style={{ color: 'var(--text-primary)', marginRight: '6px' }}>
                        {pt.term}:
                      </strong>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {pt.def}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Comparison Table if present */}
                {topic.comparisonTable && (
                  <div style={{ overflowX: 'auto', marginBottom: 'var(--space-md)' }}>
                    <table className="study-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                      <thead>
                        <tr style={{ background: 'var(--bg-inset)', borderBottom: '1px solid var(--border)' }}>
                          <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>Resource / Layer</th>
                          <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>IaaS</th>
                          <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>PaaS</th>
                          <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>SaaS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topic.comparisonTable.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{row.item}</td>
                            <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{row.iaas}</td>
                            <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{row.paas}</td>
                            <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{row.saas}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Exam Tip */}
                {topic.examTip && (
                  <div style={{ padding: '10px 14px', background: 'var(--bg-inset)', borderLeft: '3px solid var(--azure)', borderRadius: '4px', fontSize: '0.85rem' }}>
                    <strong style={{ color: 'var(--azure)', marginRight: '6px' }}>Exam Principle:</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{topic.examTip}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
