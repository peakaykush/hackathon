'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Confetti from './components/Confetti';
import Navbar from './components/Navbar';
import AiMentorSection from './components/AiMentorSection';
import StudyGuideView from './components/StudyGuideView';
import AnalyticsView from './components/AnalyticsView';
import CertificateModal from './components/CertificateModal';
import { TOPICS, QUESTIONS, getQuestionsByTopic, getShuffledQuestions, getAllShuffledQuestions, getTopicById } from './data/questions';
import { soundManager } from './utils/sound';
import { storage } from './utils/storage';

// ===== APP VIEWS =====
const VIEW = {
  HOME: 'home',
  STUDY: 'study',
  SETUP: 'setup',
  EXAM_SETUP: 'exam_setup',
  QUIZ: 'quiz',
  RESULTS: 'results',
  REVIEW: 'review',
  ANALYTICS: 'analytics',
};

// ===== FOOTER COMPONENT =====
function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        <strong>Unofficial Study Tool</strong> — Not affiliated with or endorsed by Microsoft Corporation.
        <br />
        Content meticulously aligned with the public{' '}
        <a
          className="footer-link"
          href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          AZ-900 skills outline
        </a>{' '}
        on Microsoft Learn. Built for the{' '}
        <span style={{ color: 'var(--azure)' }}>#1MillionDevs</span> Movement.
      </p>
    </footer>
  );
}

// ===== HOME VIEW =====
function HomeView({ onStartPractice, onStartMockExam, onSelectTopic, onOpenStudyGuide, onOpenAnalytics }) {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span>AZ-900 Smart Prep Engine</span>
        </div>
        <h1 className="hero-title">
          Master Azure Fundamentals<br />with smart quizzes
        </h1>
        <p className="hero-subtitle">
          Accelerate your path to Microsoft Certified: Azure Fundamentals. Practice with instant feedback, deep-dive architectural breakdowns, and realistic exam simulation.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
          <button className="btn btn-primary btn-lg" onClick={onStartPractice}>
            Start Practice
          </button>
          <button className="btn btn-secondary btn-lg" onClick={onStartMockExam}>
            Take Mock Exam
          </button>
          <button className="btn btn-ghost btn-lg" onClick={onOpenStudyGuide}>
            Study Guide
          </button>
        </div>
        <p className="hero-disclaimer">
          57+ verified questions across all 3 official exam domains
        </p>
      </section>

      {/* Quick Launch Cards */}
      <section style={{ marginBottom: 'var(--space-3xl)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          <div className="glass-card launch-card" style={{ cursor: 'pointer', borderTop: '4px solid var(--azure)' }} onClick={onOpenStudyGuide}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge" style={{ background: 'var(--azure-faint)', color: 'var(--azure)', fontWeight: 700, fontSize: '0.72rem' }}>HANDBOOK</span>
              <span style={{ color: 'var(--azure)', fontSize: '0.82rem', fontWeight: 600 }}>Explore →</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>High-Yield Study Guide</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Side-by-side service comparisons, shared responsibility charts, and exam traps.
            </p>
          </div>

          <div className="glass-card launch-card" style={{ cursor: 'pointer', borderTop: '4px solid #6366f1' }} onClick={onStartMockExam}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', fontWeight: 700, fontSize: '0.72rem' }}>SIMULATION</span>
              <span style={{ color: '#6366f1', fontSize: '0.82rem', fontWeight: 600 }}>Launch →</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Full Mock Exam</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              35 questions, 45 minutes, question flagging, and 700/1000 Pearson VUE scoring.
            </p>
          </div>

          <div className="glass-card launch-card" style={{ cursor: 'pointer', borderTop: '4px solid var(--green)' }} onClick={onOpenAnalytics}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge" style={{ background: 'var(--green-faint)', color: 'var(--green)', fontWeight: 700, fontSize: '0.72rem' }}>ANALYTICS</span>
              <span style={{ color: 'var(--green)', fontSize: '0.82rem', fontWeight: 600 }}>View Stats →</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>Progress & Readiness</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              View your pass probability, drill your weak areas, and review saved questions.
            </p>
          </div>
        </div>
      </section>

      {/* Topic Selection Grid */}
      <section>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 'var(--space-xs)', textAlign: 'center' }}>
          Official Exam Objectives
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', fontSize: '0.92rem' }}>
          Focus your practice on individual certification domains or take a comprehensive mixed test.
        </p>

        <div className="topic-grid">
          {TOPICS.map((topic, i) => {
            const questionCount = getQuestionsByTopic(topic.id).length;
            const btnThemeClass = topic.id === 'cloud-concepts' ? 'topic-btn-cloud' : topic.id === 'azure-architecture' ? 'topic-btn-arch' : 'topic-btn-mgmt';
            return (
              <div
                key={topic.id}
                className="glass-card topic-card"
                onClick={() => onSelectTopic(topic.id)}
              >
                <div className="topic-card-header">
                  <div className={`topic-icon ${topic.iconClass}`}>
                    {topic.id === 'cloud-concepts' ? 'CC' : topic.id === 'azure-architecture' ? 'AS' : 'MG'}
                  </div>
                  <div>
                    <div className="topic-name">{topic.name}</div>
                    <div className="topic-weight">Exam Weight: {topic.weight}</div>
                  </div>
                </div>
                <p className="topic-description">{topic.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: 'var(--space-md)' }}>
                  {topic.subtopics.map(st => (
                    <span key={st} style={{
                      padding: '2px 8px',
                      fontSize: '0.72rem',
                      background: 'var(--bg-inset)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-secondary)',
                      fontWeight: 500
                    }}>
                      {st}
                    </span>
                  ))}
                </div>
                <div className="topic-meta">
                  <span className="topic-question-count">{questionCount} questions</span>
                  <button className={`topic-btn ${btnThemeClass}`}>Practice Domain →</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section style={{ marginTop: 'var(--space-3xl)' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          Why learners pass with AzurePrep Pro
        </h2>
        <div className="topic-grid">
          {[
            { title: 'Deep Analysis', desc: 'Layered breakdowns: Official concept, ELI5 analogies, distractor analysis, and enterprise cases.' },
            { title: 'Exam Simulator', desc: 'Real 45-minute timed exam with question flagging and Pearson VUE 70% passing threshold.' },
            { title: 'African Tech Context', desc: 'Real-world African engineering examples (M-Pesa, Flutterwave, mobile telecoms) for sticky learning.' },
            { title: 'Bookmarks', desc: 'Save tricky questions with one click and drill only your saved questions anytime.' },
            { title: 'Targeted Drilling', desc: 'The app tracks your wrong answers and lets you practice precisely what you missed.' },
            { title: 'Certificate', desc: 'Earn and print your customized Certificate of Readiness when achieving 70%+.' },
          ].map((feature, i) => (
            <div key={i} className="glass-card">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 'var(--space-xs)', color: 'var(--text-primary)' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ===== PRACTICE SETUP VIEW =====
function SetupView({ selectedTopic, onStartQuiz, onBack }) {
  const [questionCount, setQuestionCount] = useState(10);
  const [mode, setMode] = useState('practice'); // practice or timed

  const topicInfo = selectedTopic ? getTopicById(selectedTopic) : null;
  const availableCount = selectedTopic
    ? getQuestionsByTopic(selectedTopic).length
    : QUESTIONS.length;

  const countOptions = [5, 10, 15, 20].filter(n => n <= availableCount);
  if (!countOptions.includes(availableCount) && availableCount > 0) {
    countOptions.push(availableCount);
    countOptions.sort((a, b) => a - b);
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 'var(--space-lg)' }}>
        ← Back
      </button>

      <div className="glass-card-static">
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
          Practice Quiz Setup
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 'var(--space-xl)' }}>
          {topicInfo ? `Domain: ${topicInfo.name} (${topicInfo.weight})` : 'Comprehensive Mixed Quiz (All Domains)'}
        </p>

        {/* Mode Selector */}
        <div className="setting-group">
          <div className="setting-label">Quiz Mode</div>
          <div className="mode-selector">
            <div
              className={`mode-card ${mode === 'practice' ? 'active' : ''}`}
              onClick={() => setMode('practice')}
            >
              <div className="mode-title">Practice Mode</div>
              <div className="mode-desc">Instant answer verification & explanations</div>
            </div>
            <div
              className={`mode-card ${mode === 'timed' ? 'active' : ''}`}
              onClick={() => setMode('timed')}
            >
              <div className="mode-title">Speed Timed</div>
              <div className="mode-desc">45 seconds per question</div>
            </div>
          </div>
        </div>

        {/* Question Count */}
        <div className="setting-group">
          <div className="setting-label">Number of Questions ({availableCount} available)</div>
          <div className="setting-options">
            {countOptions.map(count => (
              <button
                key={count}
                className={`setting-chip ${questionCount === count ? 'active' : ''}`}
                onClick={() => setQuestionCount(count)}
              >
                {count === availableCount ? `All (${count})` : count}
              </button>
            ))}
          </div>
        </div>

        {/* Launch */}
        <button
          className="btn btn-primary btn-lg"
          style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-lg)' }}
          onClick={() => onStartQuiz(questionCount, mode)}
        >
          Start {mode === 'timed' ? 'Timed' : 'Practice'} Quiz — {questionCount} Questions
        </button>
      </div>
    </div>
  );
}

// ===== MOCK EXAM SETUP VIEW =====
function MockExamSetupView({ onStartExam, onBack }) {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 'var(--space-lg)' }}>
        ← Back
      </button>

      <div className="glass-card-static" style={{ border: '2px solid var(--amber-border)' }}>
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '4px' }}>
            AZ-900 Mock Exam
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Simulate the actual Microsoft certification testing environment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: 'var(--space-xl)' }}>
          <div style={{ background: 'var(--bg-inset)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Question Pool</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>35 Questions</div>
          </div>
          <div style={{ background: 'var(--bg-inset)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Duration</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>45 Minutes</div>
          </div>
          <div style={{ background: 'var(--bg-inset)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Passing Score</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--green)' }}>700 / 1000 (70%)</div>
          </div>
          <div style={{ background: 'var(--bg-inset)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Feedback Rule</div>
            <div style={{ fontSize: '1rem', fontWeight: 600 }}>End of Exam Only</div>
          </div>
        </div>

        <div style={{ background: 'var(--amber-faint)', borderLeft: '3px solid var(--amber)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: 'var(--space-xl)' }}>
          <strong>Exam Instructions:</strong>
          <ul style={{ marginLeft: '18px', marginTop: '6px', color: 'var(--text-secondary)' }}>
            <li>No answers or explanations are revealed during the exam.</li>
            <li>Use the <strong>Flag for Review</strong> button to mark questions you want to reconsider.</li>
            <li>Review all answered and flagged questions on the Review Summary screen before final submission.</li>
          </ul>
        </div>

        <button
          className="btn btn-primary btn-lg"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={onStartExam}
        >
          Begin Mock Exam
        </button>
      </div>
    </div>
  );
}

// ===== QUIZ VIEW =====
function QuizView({ questions, mode, customTitle, onFinish, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]); // array of { questionId, selectedIndex, isCorrect, flagged }
  const [flaggedMap, setFlaggedMap] = useState({});
  const [streak, setStreak] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showExamReviewModal, setShowExamReviewModal] = useState(false);

  // Timers:
  // For 'timed' mode: 45s countdown per question
  // For 'exam' mode: 45m (2700s) total exam countdown
  const [questionTimer, setQuestionTimer] = useState(45);
  const [totalExamSeconds, setTotalExamSeconds] = useState(45 * 60);

  const question = questions[currentIndex];
  const isExamMode = mode === 'exam';

  // Check initial bookmark state on question change
  useEffect(() => {
    if (question) {
      setIsBookmarked(storage.isBookmarked(question.id));
      const existing = answers.find(a => a.questionId === question.id);
      if (existing) {
        setSelectedAnswer(existing.selectedIndex);
        setShowExplanation(!isExamMode);
      } else {
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
      setQuestionTimer(45);
    }
  }, [currentIndex, question, answers, isExamMode]);

  // Timed mode per-question interval
  useEffect(() => {
    if (mode !== 'timed' || showExplanation) return;

    const timer = setInterval(() => {
      setQuestionTimer(prev => {
        if (prev <= 5 && prev > 1) {
          soundManager.playTick();
        }
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpired();
          return 45;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, showExplanation, currentIndex]);

  // Exam mode total countdown interval
  useEffect(() => {
    if (!isExamMode) return;

    const examInterval = setInterval(() => {
      setTotalExamSeconds(prev => {
        if (prev <= 1) {
          clearInterval(examInterval);
          handleSubmitFinalExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(examInterval);
  }, [isExamMode]);

  const handleTimeExpired = () => {
    if (selectedAnswer !== null) return;
    recordAnswer(-1);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleSubmitFinalExam();
    }
  };

  const recordAnswer = (index) => {
    const isCorrect = index === question.correctIndex;
    const newAnswerObj = {
      questionId: question.id,
      selectedIndex: index,
      isCorrect,
      flagged: Boolean(flaggedMap[question.id]),
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== question.id);
      return [...filtered, newAnswerObj];
    });

    return isCorrect;
  };

  const handleSelectAnswer = (index) => {
    if (selectedAnswer !== null && !isExamMode) return; // Locked in practice mode

    setSelectedAnswer(index);
    const isCorrect = recordAnswer(index);

    if (!isExamMode) {
      setShowExplanation(true);
      if (isCorrect) {
        soundManager.playCorrect();
        setStreak(prev => prev + 1);
      } else {
        soundManager.playIncorrect();
        setStreak(0);
      }
    }
  };

  const handleToggleFlag = () => {
    const newState = !flaggedMap[question.id];
    setFlaggedMap(prev => ({ ...prev, [question.id]: newState }));
  };

  const handleToggleBookmark = () => {
    const newState = storage.toggleBookmark(question.id);
    setIsBookmarked(newState);
    soundManager.playTick();
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (isExamMode) {
      setShowExamReviewModal(true);
    } else {
      handleSubmitFinalExam();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmitFinalExam = () => {
    // Fill any unanswered questions as skipped (-1)
    const finalAnswers = questions.map(q => {
      const existing = answers.find(a => a.questionId === q.id);
      if (existing) return existing;
      return {
        questionId: q.id,
        selectedIndex: -1,
        isCorrect: false,
        flagged: Boolean(flaggedMap[q.id]),
      };
    });

    onFinish(finalAnswers);
  };

  const formatExamTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const topicInfo = getTopicById(question?.topic);
  const correctCount = answers.filter(a => a.isCorrect).length;
  const isFlagged = Boolean(flaggedMap[question?.id]);

  return (
    <div className="quiz-container">
      {/* Exam Mode Banner */}
      {isExamMode && (
        <div className="exam-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, color: 'var(--amber)' }}>TIME REMAINING:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.05rem' }}>
              {formatExamTime(totalExamSeconds)}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`exam-flag-btn ${isFlagged ? 'flagged' : ''}`}
              onClick={handleToggleFlag}
            >
              {isFlagged ? 'Flagged' : 'Flag'}
            </button>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              onClick={() => setShowExamReviewModal(true)}
            >
              Review ({answers.length}/{questions.length})
            </button>
          </div>
        </div>
      )}

      {/* Quiz Header */}
      <div className="quiz-header">
        <div className="quiz-progress-section">
          <div className="quiz-topic-label">
            {customTitle || topicInfo?.name || 'Azure'}
          </div>
          <div className="quiz-progress-text">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', flexWrap: 'wrap' }}>
          {streak >= 3 && !isExamMode && (
            <span className="streak-badge">{streak} streak</span>
          )}

          {!isExamMode && (
            <span className="quiz-score-badge">
              {correctCount}/{answers.length}
            </span>
          )}

          {mode === 'timed' && !showExplanation && (
            <span
              className="quiz-timer"
              style={questionTimer <= 10 ? { color: 'var(--red)', borderColor: 'var(--red-border)', animation: 'pulse 1s infinite' } : {}}
            >
              {questionTimer}s
            </span>
          )}

          <button
            className={`icon-btn ${isBookmarked ? 'active' : ''}`}
            onClick={handleToggleBookmark}
            title={isBookmarked ? 'Question bookmarked' : 'Bookmark this question'}
          >
            <span style={{ fontSize: '0.75rem' }}>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Question Navigation Dots */}
      <div className="question-dots">
        {questions.map((q, i) => {
          let dotClass = 'question-dot';
          const answeredEntry = answers.find(a => a.questionId === q.id);
          const flagged = flaggedMap[q.id];

          if (i === currentIndex) dotClass += ' current';
          if (flagged) dotClass += ' flagged';

          if (answeredEntry) {
            if (isExamMode) {
              dotClass += ' answered'; // In exam mode, don't reveal if correct or wrong
            } else {
              dotClass += answeredEntry.isCorrect ? ' answered' : ' answered-wrong';
            }
          }

          return (
            <button
              key={q.id}
              className={dotClass}
              onClick={() => setCurrentIndex(i)}
              title={`Question ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      <div className="glass-card-static question-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <span className="question-number">Question {currentIndex + 1}</span>
            <span className={`difficulty-badge ${question.difficulty}`}>
              {question.difficulty}
            </span>
          </div>
          {isExamMode && (
            <button
              className={`exam-flag-btn ${isFlagged ? 'flagged' : ''}`}
              onClick={handleToggleFlag}
            >
              {isFlagged ? 'Flagged' : 'Flag'}
            </button>
          )}
        </div>

        <h3 className="question-text">{question.question}</h3>

        {/* Options */}
        <div className="options-list">
          {question.options.map((option, i) => {
            const letter = String.fromCharCode(65 + i);
            let className = 'option-btn';

            if (isExamMode) {
              if (selectedAnswer === i) className += ' selected';
            } else if (showExplanation) {
              if (i === question.correctIndex) className += ' correct';
              else if (i === selectedAnswer && i !== question.correctIndex) className += ' incorrect';
              else className += ' disabled';
            } else if (selectedAnswer === i) {
              className += ' selected';
            }

            return (
              <button
                key={i}
                className={className}
                onClick={() => handleSelectAnswer(i)}
                disabled={showExplanation && !isExamMode}
              >
                <span className="option-letter">{letter}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Practice Mode AI Mentor Section */}
        {!isExamMode && showExplanation && (
          <AiMentorSection question={question} selectedIndex={selectedAnswer} />
        )}
      </div>

      {/* Actions Bar */}
      <div className="quiz-actions">
        <button className="btn btn-ghost" onClick={onBack}>
          Quit Quiz
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {currentIndex > 0 && (
            <button className="btn btn-secondary" onClick={handlePrev}>
              ← Previous
            </button>
          )}

          {isExamMode ? (
            currentIndex < questions.length - 1 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Next →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setShowExamReviewModal(true)}>
                Review & Finish
              </button>
            )
          ) : (
            showExplanation && (
              <button className="btn btn-primary" onClick={handleNext}>
                {currentIndex === questions.length - 1 ? 'View Results' : 'Next →'}
              </button>
            )
          )}
        </div>
      </div>

      {/* Exam Review Summary Modal */}
      {showExamReviewModal && (
        <div className="certificate-overlay" onClick={() => setShowExamReviewModal(false)}>
          <div className="certificate-box" style={{ maxWidth: '600px', textAlign: 'left' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
              Exam Submission Review
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Check your questions before final scoring. Click any question number to jump back.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px', textAlign: 'center' }}>
              <div style={{ background: 'var(--green-faint)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--green-border)' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--green)' }}>{answers.length}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Answered</div>
              </div>
              <div style={{ background: 'var(--amber-faint)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--amber-border)' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--amber)' }}>
                  {Object.values(flaggedMap).filter(Boolean).length}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Flagged</div>
              </div>
              <div style={{ background: 'var(--red-faint)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--red-border)' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--red)' }}>
                  {Math.max(0, questions.length - answers.length)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unanswered</div>
              </div>
            </div>

            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px' }}>
              <div className="question-dots" style={{ justifyContent: 'flex-start' }}>
                {questions.map((q, i) => {
                  const answered = answers.some(a => a.questionId === q.id);
                  const flagged = flaggedMap[q.id];
                  return (
                    <button
                      key={q.id}
                      className={`question-dot ${answered ? 'answered' : ''} ${flagged ? 'flagged' : ''}`}
                      onClick={() => {
                        setCurrentIndex(i);
                        setShowExamReviewModal(false);
                      }}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowExamReviewModal(false)}>
                Continue Exam
              </button>
              <button className="btn btn-primary" onClick={handleSubmitFinalExam}>
                Submit & Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== RESULTS VIEW =====
function ResultsView({ questions, answers, mode, onReview, onRetry, onHome }) {
  const [showCertificate, setShowCertificate] = useState(false);

  const totalQuestions = questions.length;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const incorrectCount = answers.filter(a => !a.isCorrect && a.selectedIndex !== -1).length;
  const skippedCount = answers.filter(a => a.selectedIndex === -1).length;
  const percentage = Math.round((correctCount / Math.max(1, totalQuestions)) * 100);
  const passed = percentage >= 70; // 70% ≈ 700/1000

  // Per topic calculations
  const topicScores = TOPICS.map(topic => {
    const topicQuestions = questions.filter(q => q.topic === topic.id);
    const topicAnswers = topicQuestions.map(q => answers.find(a => a.questionId === q.id));
    const topicCorrect = topicAnswers.filter(a => a && a.isCorrect).length;
    const topicTotal = topicQuestions.length;
    return {
      ...topic,
      correct: topicCorrect,
      total: topicTotal,
      percentage: topicTotal > 0 ? Math.round((topicCorrect / topicTotal) * 100) : 0,
    };
  }).filter(t => t.total > 0);

  // Play fanfare and save to storage on mount
  useEffect(() => {
    if (passed) {
      soundManager.playFanfare();
    }

    storage.saveQuizResult({
      totalQuestions,
      correctCount,
      percentage,
      mode,
      topicScores,
      answers,
    });
  }, []);

  const circumference = 2 * Math.PI * 85;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="results-container">
      <Confetti trigger={passed} />

      {/* Score Ring */}
      <div className="results-score-ring">
        <svg viewBox="0 0 200 200">
          <defs>
            <linearGradient id="gradient-success" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a7f37" />
              <stop offset="100%" stopColor="#1a7f37" />
            </linearGradient>
            <linearGradient id="gradient-fail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9a6700" />
              <stop offset="100%" stopColor="#9a6700" />
            </linearGradient>
          </defs>
          <circle className="ring-bg" cx="100" cy="100" r="85" />
          <circle
            className={`ring-fill ${passed ? 'pass' : 'fail'}`}
            cx="100"
            cy="100"
            r="85"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="results-score-value">
          <span className="results-percentage">{percentage}%</span>
          <span className="results-label">{correctCount}/{totalQuestions} correct</span>
        </div>
      </div>

      {/* Pass/Fail Message */}
      <h2 className={`results-title ${passed ? 'pass' : 'fail'}`}>
        {passed ? 'Congratulations — You Passed' : 'Keep Studying'}
      </h2>
      <p className="results-message">
        {passed
          ? `You scored ${percentage}% (Scaled: ${Math.round(percentage * 10)}/1000). You meet the official Microsoft passing mark of 700. You are ready to sit the AZ-900 exam.`
          : `You scored ${percentage}% (Scaled: ${Math.round(percentage * 10)}/1000). The AZ-900 passing bar is 700/1000 (~70%). Review your explanations and drill the weak domains below.`}
      </p>

      {/* Certificate Callout Button for Passing Scores */}
      {passed && (
        <div style={{ margin: 'var(--space-lg) 0' }}>
          <button
            className="btn btn-certificate btn-lg"
            onClick={() => setShowCertificate(true)}
          >
            Claim Your Readiness Certificate →
          </button>
        </div>
      )}

      {/* KPI Stats */}
      <div className="results-stats">
        <div className="stat-card stat-correct">
          <div className="stat-value correct-color">{correctCount}</div>
          <div className="stat-label">Correct Answers</div>
        </div>
        <div className="stat-card stat-incorrect">
          <div className="stat-value incorrect-color">{incorrectCount}</div>
          <div className="stat-label">Needs Review</div>
        </div>
        <div className="stat-card stat-skipped">
          <div className="stat-value skipped-color">{skippedCount}</div>
          <div className="stat-label">Skipped Questions</div>
        </div>
      </div>

      {/* Topic Diagnostic Breakdown */}
      {topicScores.length > 0 && (
        <div className="topic-breakdown">
          <h3>Domain Diagnostic Breakdown</h3>
          {topicScores.map(topic => (
            <div key={topic.id} className="breakdown-item">
              <span className="breakdown-label">{topic.name}</span>
              <span className="breakdown-score">{topic.correct}/{topic.total} ({topic.percentage}%)</span>
              <div className="breakdown-bar">
                <div
                  className={`breakdown-bar-fill ${topic.percentage >= 70 ? 'good' : topic.percentage >= 50 ? 'medium' : 'poor'}`}
                  style={{ width: `${topic.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="results-actions" style={{ marginTop: 'var(--space-xl)' }}>
        <button className="btn btn-primary" onClick={onReview}>
          Review All Explanations
        </button>
        <button className="btn btn-secondary" onClick={onRetry}>
          Retake Quiz
        </button>
        <button className="btn btn-ghost" onClick={onHome}>
          ← Home
        </button>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          score={percentage}
          totalQuestions={totalQuestions}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}

// ===== REVIEW VIEW =====
function ReviewView({ questions, answers, onBack }) {
  const [filter, setFilter] = useState('all'); // all, incorrect, bookmarked
  const [bookmarkedIds, setBookmarkedIds] = useState(() => storage.getBookmarks());

  const handleToggleBookmark = (qId) => {
    storage.toggleBookmark(qId);
    setBookmarkedIds(storage.getBookmarks());
    soundManager.playTick();
  };

  const filteredQuestions = questions.filter((q, index) => {
    const answer = answers[index];
    if (filter === 'incorrect') return !answer?.isCorrect;
    if (filter === 'bookmarked') return bookmarkedIds.includes(q.id);
    return true;
  });

  return (
    <div className="review-list">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            Answer Review & Analysis
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Study official concepts, distractor logic, and tips for every question.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Results
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
        <button
          className={`ai-tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Questions ({questions.length})
        </button>
        <button
          className={`ai-tab-btn ${filter === 'incorrect' ? 'active' : ''}`}
          onClick={() => setFilter('incorrect')}
        >
          Mistakes Only ({answers.filter(a => !a.isCorrect).length})
        </button>
        <button
          className={`ai-tab-btn ${filter === 'bookmarked' ? 'active' : ''}`}
          onClick={() => setFilter('bookmarked')}
        >
          Saved ({questions.filter(q => bookmarkedIds.includes(q.id)).length})
        </button>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="glass-card-static" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
          <h3>No questions matching this filter</h3>
          <button className="btn btn-primary" style={{ marginTop: '12px' }} onClick={() => setFilter('all')}>
            Show All Questions
          </button>
        </div>
      ) : (
        filteredQuestions.map((question) => {
          const originalIndex = questions.findIndex(q => q.id === question.id);
          const answer = answers[originalIndex];
          const isCorrect = answer?.isCorrect;
          const selectedIndex = answer?.selectedIndex ?? -1;
          const topicInfo = getTopicById(question.topic);
          const isBookmarked = bookmarkedIds.includes(question.id);

          return (
            <div key={question.id} className="glass-card-static review-item">
              <div className="review-status-bar">
                <span className={`review-status-dot ${isCorrect ? 'correct' : 'incorrect'}`} />
                <span className={`review-status-text ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {selectedIndex === -1 ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}
                </span>
                <span style={{ flex: 1 }} />
                <button
                  className={`icon-btn ${isBookmarked ? 'active' : ''}`}
                  onClick={() => handleToggleBookmark(question.id)}
                  style={{ marginRight: '6px' }}
                >
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>
                <span className={`difficulty-badge ${question.difficulty}`}>
                  {question.difficulty}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                  {topicInfo?.name}
                </span>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 'var(--space-md) 0', color: 'var(--text-primary)' }}>
                {originalIndex + 1}. {question.question}
              </h3>

              {/* Options */}
              <div className="options-list">
                {question.options.map((option, i) => {
                  const letter = String.fromCharCode(65 + i);
                  let className = 'option-btn disabled';
                  if (i === question.correctIndex) className = 'option-btn correct disabled';
                  else if (i === selectedIndex && !isCorrect) className = 'option-btn incorrect disabled';

                  return (
                    <div key={i} className={className} style={{ cursor: 'default' }}>
                      <span className="option-letter">{letter}</span>
                      <span>{option}</span>
                    </div>
                  );
                })}
              </div>

              {/* Deep Analysis with AI Mentor */}
              <AiMentorSection question={question} selectedIndex={selectedIndex} />
            </div>
          );
        })
      )}

      <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
        <button className="btn btn-primary" onClick={onBack}>
          ← Back to Results
        </button>
      </div>
    </div>
  );
}

// ===== ROOT APP COMPONENT =====
export default function Home() {
  const [view, setView] = useState(VIEW.HOME);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState('practice');
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [customQuizTitle, setCustomQuizTitle] = useState(null);

  // Navigation handlers
  const handleNavigate = (targetView) => {
    setView(targetView);
    if (targetView === VIEW.HOME) {
      setSelectedTopic(null);
      setCustomQuizTitle(null);
    }
    window.scrollTo(0, 0);
  };

  const handleSelectTopic = (topicId) => {
    setSelectedTopic(topicId);
    setCustomQuizTitle(null);
    setView(VIEW.SETUP);
    window.scrollTo(0, 0);
  };

  const handleStartQuickPractice = () => {
    setSelectedTopic(null);
    setCustomQuizTitle(null);
    setView(VIEW.SETUP);
    window.scrollTo(0, 0);
  };

  const handleStartMockExam = () => {
    // 35 questions total across domains, 45 minutes
    const examQuestions = getAllShuffledQuestions(35);
    setQuizQuestions(examQuestions);
    setQuizMode('exam');
    setCustomQuizTitle('AZ-900 Mock Exam (Pearson VUE Simulation)');
    setQuizAnswers([]);
    setView(VIEW.QUIZ);
    window.scrollTo(0, 0);
  };

  const handleStartStandardQuiz = (count, mode) => {
    const questions = selectedTopic
      ? getShuffledQuestions(selectedTopic, count)
      : getAllShuffledQuestions(count);
    setQuizQuestions(questions);
    setQuizMode(mode);
    setCustomQuizTitle(null);
    setQuizAnswers([]);
    setView(VIEW.QUIZ);
    window.scrollTo(0, 0);
  };

  const handleStartCustomQuiz = (questionsList, title) => {
    const shuffled = [...questionsList].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled);
    setQuizMode('practice');
    setCustomQuizTitle(title);
    setQuizAnswers([]);
    setView(VIEW.QUIZ);
    window.scrollTo(0, 0);
  };

  const handleFinishQuiz = (answers) => {
    setQuizAnswers(answers);
    setView(VIEW.RESULTS);
    window.scrollTo(0, 0);
  };

  const handleRetry = () => {
    const count = quizQuestions.length;
    const questions = selectedTopic
      ? getShuffledQuestions(selectedTopic, count)
      : getAllShuffledQuestions(count);
    setQuizQuestions(questions);
    setQuizAnswers([]);
    setView(VIEW.QUIZ);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">
      <Navbar currentView={view} onNavigate={handleNavigate} />

      <main className="main-content">
        {view === VIEW.HOME && (
          <HomeView
            onStartPractice={handleStartQuickPractice}
            onStartMockExam={() => setView(VIEW.EXAM_SETUP)}
            onSelectTopic={handleSelectTopic}
            onOpenStudyGuide={() => handleNavigate(VIEW.STUDY)}
            onOpenAnalytics={() => handleNavigate(VIEW.ANALYTICS)}
          />
        )}

        {view === VIEW.STUDY && (
          <StudyGuideView
            onStartPracticeWithTopic={(topicId) => handleSelectTopic(topicId)}
          />
        )}

        {view === VIEW.SETUP && (
          <SetupView
            selectedTopic={selectedTopic}
            onStartQuiz={handleStartStandardQuiz}
            onBack={() => handleNavigate(VIEW.HOME)}
          />
        )}

        {view === VIEW.EXAM_SETUP && (
          <MockExamSetupView
            onStartExam={handleStartMockExam}
            onBack={() => handleNavigate(VIEW.HOME)}
          />
        )}

        {view === VIEW.ANALYTICS && (
          <AnalyticsView
            onStartCustomQuiz={handleStartCustomQuiz}
            onNavigate={handleNavigate}
          />
        )}

        {view === VIEW.QUIZ && (
          <QuizView
            questions={quizQuestions}
            mode={quizMode}
            customTitle={customQuizTitle}
            onFinish={handleFinishQuiz}
            onBack={() => handleNavigate(VIEW.HOME)}
          />
        )}

        {view === VIEW.RESULTS && (
          <ResultsView
            questions={quizQuestions}
            answers={quizAnswers}
            mode={quizMode}
            onReview={() => setView(VIEW.REVIEW)}
            onRetry={handleRetry}
            onHome={() => handleNavigate(VIEW.HOME)}
          />
        )}

        {view === VIEW.REVIEW && (
          <ReviewView
            questions={quizQuestions}
            answers={quizAnswers}
            onBack={() => setView(VIEW.RESULTS)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
