/**
 * Storage and progress manager for AzurePrep Pro
 */

const STORAGE_KEYS = {
  HISTORY: 'azureprep_quiz_history',
  BOOKMARKS: 'azureprep_bookmarked_ids',
  WEAK_QUESTIONS: 'azureprep_weak_questions',
  USER_PROFILE: 'azureprep_user_profile',
};

export const storage = {
  // Get all quiz attempts
  getHistory() {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // Save a quiz attempt
  saveQuizResult(result) {
    if (typeof window === 'undefined') return;
    try {
      const history = this.getHistory();
      const newEntry = {
        id: 'quiz_' + Date.now(),
        date: new Date().toISOString(),
        ...result,
      };
      history.unshift(newEntry);
      // Keep last 50 attempts
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 50)));

      // Update weak questions based on wrong answers
      if (result.answers) {
        const weak = this.getWeakQuestions();
        result.answers.forEach(a => {
          if (!a.isCorrect) {
            weak[a.questionId] = (weak[a.questionId] || 0) + 1;
          } else if (weak[a.questionId]) {
            // Decrement if answered correctly
            weak[a.questionId] = Math.max(0, weak[a.questionId] - 1);
            if (weak[a.questionId] === 0) delete weak[a.questionId];
          }
        });
        localStorage.setItem(STORAGE_KEYS.WEAK_QUESTIONS, JSON.stringify(weak));
      }
    } catch (e) {
      console.error('Failed to save quiz history', e);
    }
  },

  // Bookmarked questions
  getBookmarks() {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  isBookmarked(questionId) {
    const list = this.getBookmarks();
    return list.includes(questionId);
  },

  toggleBookmark(questionId) {
    if (typeof window === 'undefined') return false;
    try {
      let list = this.getBookmarks();
      const exists = list.includes(questionId);
      if (exists) {
        list = list.filter(id => id !== questionId);
      } else {
        list.push(questionId);
      }
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
      return !exists;
    } catch (e) {
      return false;
    }
  },

  // Weak questions (wrong count)
  getWeakQuestions() {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WEAK_QUESTIONS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  // User profile (Learner name for certificate)
  getUserProfile() {
    if (typeof window === 'undefined') return { name: 'Azure Cloud Learner' };
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : { name: 'Azure Cloud Learner' };
    } catch (e) {
      return { name: 'Azure Cloud Learner' };
    }
  },

  saveUserProfile(profile) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  // Aggregated analytics calculation
  getAnalytics() {
    const history = this.getHistory();
    const bookmarks = this.getBookmarks();
    const weakQuestions = this.getWeakQuestions();

    if (history.length === 0) {
      return {
        totalQuizzes: 0,
        totalQuestionsAnswered: 0,
        averageScore: 0,
        passRate: 0,
        readinessIndex: 0,
        bookmarkedCount: bookmarks.length,
        weakCount: Object.keys(weakQuestions).length,
        topicMastery: {
          'cloud-concepts': { total: 0, correct: 0, pct: 0 },
          'azure-architecture': { total: 0, correct: 0, pct: 0 },
          'azure-management': { total: 0, correct: 0, pct: 0 },
        },
      };
    }

    let totalAnswered = 0;
    let totalCorrect = 0;
    let passedCount = 0;
    const topicStats = {
      'cloud-concepts': { total: 0, correct: 0 },
      'azure-architecture': { total: 0, correct: 0 },
      'azure-management': { total: 0, correct: 0 },
    };

    history.forEach(h => {
      totalAnswered += h.totalQuestions || 0;
      totalCorrect += h.correctCount || 0;
      if (h.percentage >= 70) passedCount += 1;

      if (h.topicScores) {
        h.topicScores.forEach(t => {
          if (topicStats[t.id]) {
            topicStats[t.id].total += t.total || 0;
            topicStats[t.id].correct += t.correct || 0;
          }
        });
      }
    });

    const averageScore = Math.round((totalCorrect / Math.max(1, totalAnswered)) * 100);
    const passRate = Math.round((passedCount / history.length) * 100);

    // Topic mastery %
    const topicMastery = {};
    Object.keys(topicStats).forEach(key => {
      const item = topicStats[key];
      topicMastery[key] = {
        total: item.total,
        correct: item.correct,
        pct: item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0,
      };
    });

    // Readiness formula: weighted combo of average score, pass rate, and quiz count
    const recentScores = history.slice(0, 5).map(h => h.percentage);
    const recentAvg = Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length);
    const volumeBonus = Math.min(20, history.length * 4); // Up to 20 pts for doing >=5 quizzes
    const readinessIndex = Math.min(100, Math.round(recentAvg * 0.8 + volumeBonus));

    return {
      totalQuizzes: history.length,
      totalQuestionsAnswered: totalAnswered,
      averageScore,
      passRate,
      readinessIndex,
      bookmarkedCount: bookmarks.length,
      weakCount: Object.keys(weakQuestions).length,
      topicMastery,
      recentHistory: history.slice(0, 10),
    };
  },

  clearData() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    localStorage.removeItem(STORAGE_KEYS.WEAK_QUESTIONS);
  }
};
