'use client';

import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { TOPICS, QUESTIONS } from '../data/questions';

export default function AnalyticsView({ onStartCustomQuiz, onNavigate }) {
  const [analytics, setAnalytics] = useState(null);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [weakQuestionsList, setWeakQuestionsList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = storage.getAnalytics();
    setAnalytics(data);

    const bmIds = storage.getBookmarks();
    const bms = QUESTIONS.filter(q => bmIds.includes(q.id));
    setBookmarkedQuestions(bms);

    const weakDict = storage.getWeakQuestions();
    const weakIds = Object.keys(weakDict);
    const weaks = QUESTIONS.filter(q => weakIds.includes(q.id));
    setWeakQuestionsList(weaks);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to reset all quiz history and saved bookmarks?')) {
      storage.clearData();
      loadData();
    }
  };

  if (!analytics) return null;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', animation: 'fadeInUp 0.3s ease-out' }}>
      {/* Title */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="hero-badge" style={{ marginBottom: 'var(--space-xs)' }}>
          <span>Learner Analytics & Readiness</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 'var(--space-xs)', color: 'var(--text-primary)' }}>
          Exam Preparedness Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Personalized performance metrics, domain mastery tracking, and targeted question review.
        </p>
      </div>

      {/* Readiness Card */}
      <div className="glass-card-static" style={{ marginBottom: 'var(--space-xl)', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 600 }}>
            Estimated Certification Readiness
          </div>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: analytics.readinessIndex >= 70 ? 'var(--green)' : analytics.readinessIndex >= 50 ? 'var(--amber)' : 'var(--text-primary)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
            {analytics.readinessIndex}%
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
            {analytics.readinessIndex >= 85
              ? 'Outstanding performance. Your current scores indicate strong readiness for the official Microsoft AZ-900 exam.'
              : analytics.readinessIndex >= 70
              ? 'Passing threshold reached (~700/1000 benchmark). Reinforce your weaker subtopics to ensure consistency.'
              : analytics.totalQuizzes === 0
              ? 'Complete a practice quiz or mock exam to generate your readiness metrics.'
              : 'Continuing practice recommended. Review the Study Guide and drill weak areas to achieve 70%+.'}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {weakQuestionsList.length > 0 && (
              <button
                className="btn btn-primary"
                onClick={() => onStartCustomQuiz(weakQuestionsList, 'Practice Weak Areas')}
              >
                Drill {weakQuestionsList.length} Missed Questions
              </button>
            )}
            {bookmarkedQuestions.length > 0 && (
              <button
                className="btn btn-secondary"
                onClick={() => onStartCustomQuiz(bookmarkedQuestions, 'Saved Bookmarks')}
              >
                Review {bookmarkedQuestions.length} Bookmarks
              </button>
            )}
            <button
              className="btn btn-ghost"
              onClick={() => onNavigate('exam_setup')}
            >
              Start Full Mock Exam
            </button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="analytics-grid" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="analytics-card">
          <div className="analytics-label">Quizzes Completed</div>
          <div className="analytics-value" style={{ color: 'var(--azure)' }}>
            {analytics.totalQuizzes}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {analytics.totalQuestionsAnswered} questions attempted
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-label">Overall Accuracy</div>
          <div className="analytics-value" style={{ color: analytics.averageScore >= 70 ? 'var(--green)' : 'var(--amber)' }}>
            {analytics.averageScore}%
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Exam pass target: 70%
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-label">Mock Pass Rate</div>
          <div className="analytics-value" style={{ color: 'var(--text-primary)' }}>
            {analytics.passRate}%
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Across all attempts
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-label">Saved for Review</div>
          <div className="analytics-value" style={{ color: 'var(--text-primary)' }}>
            {analytics.bookmarkedCount}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Flagged / bookmarked
          </div>
        </div>
      </div>

      {/* Domain Mastery Breakdown */}
      <div className="glass-card-static" style={{ marginBottom: 'var(--space-xl)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>
          Domain Mastery Breakdown
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {TOPICS.map(topic => {
            const mastery = analytics.topicMastery[topic.id] || { pct: 0, correct: 0, total: 0 };
            return (
              <div key={topic.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '24px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: 'var(--bg-inset)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)'
                    }}>
                      {topic.icon}
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{topic.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({topic.weight})</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: mastery.pct >= 70 ? 'var(--green)' : mastery.pct >= 50 ? 'var(--amber)' : 'var(--text-secondary)' }}>
                    {mastery.pct}% ({mastery.correct}/{mastery.total})
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${mastery.pct}%`,
                      background: mastery.pct >= 70 ? 'var(--green)' : mastery.pct >= 50 ? 'var(--amber)' : 'var(--red)'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent History Table */}
      {analytics.recentHistory && analytics.recentHistory.length > 0 && (
        <div className="glass-card-static" style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Recent Quiz History
            </h3>
            <button className="btn btn-ghost" style={{ fontSize: '0.8rem', color: 'var(--red)' }} onClick={handleClear}>
              Clear History
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Questions</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentHistory.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td>{new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td style={{ textTransform: 'capitalize' }}>{item.mode || 'Practice'}</td>
                    <td><strong>{item.percentage}%</strong> ({item.correctCount}/{item.totalQuestions})</td>
                    <td>
                      <span className={`difficulty-badge ${item.percentage >= 70 ? 'easy' : 'hard'}`}>
                        {item.percentage >= 70 ? 'Passed' : 'Needs Review'}
                      </span>
                    </td>
                    <td>{item.totalQuestions} questions</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
