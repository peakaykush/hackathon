# ⚡ AzurePrep Pro — Smart AZ-900 Exam Preparation Engine

> **Unofficial Study Tool** — Not affiliated with or endorsed by Microsoft Corporation.
> Content aligned with the public [AZ-900 skills outline](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900) on Microsoft Learn.

AzurePrep Pro is a premium, full-featured web application built to help learners **master the Microsoft Azure Fundamentals (AZ-900) certification exam** through smart quizzes, deep AI-powered explanations, realistic exam simulation, and personalized progress tracking.

Built with ❤️ for the **#1MillionDevs Movement**.

---

## 🚀 Features

### 📖 High-Yield Study Guide & Cheat Sheet
- Searchable reference covering all 3 official AZ-900 exam domains
- Side-by-side comparison tables (IaaS vs PaaS vs SaaS, Storage Tiers, Shared Responsibility)
- Exam trap alerts and key takeaway callouts for rapid revision

### 🧠 Smart Practice Quiz Engine
- **57+ verified questions** across Cloud Concepts, Azure Architecture & Services, and Azure Management & Governance
- Difficulty levels: 🟢 Easy, 🟡 Medium, 🔴 Hard
- Topic-focused or comprehensive mixed practice
- **Practice Mode** with instant answer feedback
- **Speed Timed Mode** with 45-second per-question countdown

### 🤖 AI Cloud Mentor (5-Tab Deep Analysis)
Every answered question provides layered learning:
1. **Official Concept** — Microsoft-aligned explanation with key takeaway
2. **Simple Analogy (ELI5)** — Relatable real-world analogy for sticky learning
3. **Why Others Are Wrong** — Per-option distractor analysis
4. **Real Enterprise Case** — Production architecture scenario
5. **Exam Pitfall** — Common Microsoft exam traps to watch for

### ⏱️ Full Mock Exam Simulator (Pearson VUE Style)
- 35 randomized questions across all domains
- 45-minute total exam countdown timer
- 🚩 **Question flagging** for review before submission
- No answers revealed during exam — results only after submission
- Scaled scoring: 700/1000 (70%) passing threshold

### 📊 Progress & Readiness Analytics Dashboard
- **Exam Readiness Index** — Weighted score based on recent performance
- Per-domain mastery breakdown with visual progress bars
- Quiz history table with pass/fail status tracking
- **Drill Weak Areas** — Automatically practice only your missed questions
- **Saved Bookmarks** — Star questions during quizzes for later review

### 🎓 Certificate of Readiness
- Earn a customizable, printable certificate when achieving 70%+
- Personalized with your name, credential ID, issue date, and scaled score
- Print-optimized CSS for clean PDF export

### 🔊 Audio Feedback
- Web Audio API synthesized sound effects (zero external audio files)
- Correct answer chime, incorrect buzzer, exam fanfare, and timer tick warnings
- Toggle sound on/off from the navbar (persisted in localStorage)

### 🌍 African Tech Context
- Real-world examples from African engineering (M-Pesa, Safaricom, Flutterwave)
- Making abstract cloud concepts relatable and memorable

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | React 19 + JavaScript |
| Styling | Vanilla CSS with custom design system (glassmorphism, dark mode, gradients) |
| Typography | Inter + JetBrains Mono (Google Fonts) |
| Audio | Web Audio API (zero external assets) |
| Persistence | localStorage (quiz history, bookmarks, weak questions, user profile) |
| Animations | CSS keyframes + micro-interactions |

---

## 📁 Project Structure

```
app/
├── page.js                    # Root app with all views and navigation
├── layout.js                  # HTML layout with metadata and SEO
├── globals.css                # Complete design system (1700+ lines)
├── components/
│   ├── Navbar.js              # Navigation with sound toggle
│   ├── BackgroundParticles.js # Ambient floating particles
│   ├── Confetti.js            # CSS confetti on passing scores
│   ├── AiMentorSection.js     # 5-tab AI Cloud Mentor analysis
│   ├── StudyGuideView.js      # Searchable cheat sheet & study guide
│   ├── AnalyticsView.js       # Progress dashboard & readiness index
│   └── CertificateModal.js    # Printable achievement certificate
├── data/
│   ├── questions.js           # 57+ AZ-900 question bank
│   └── studyGuide.js          # High-yield study guide data
└── utils/
    ├── sound.js               # Web Audio API synthesizer
    ├── storage.js             # localStorage persistence manager
    └── aiMentor.js            # AI analysis and distractor engine
```

---

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start studying.

---

## 📋 AZ-900 Exam Domain Coverage

| Domain | Weight | Questions |
|--------|--------|-----------|
| ☁️ Cloud Concepts | 25–30% | 17 |
| 🏗️ Azure Architecture & Services | 35–40% | 25 |
| ⚙️ Azure Management & Governance | 30–35% | 15 |
| **Total** | **100%** | **57** |

---

## ⚠️ Disclaimer

This is an **unofficial, community-built study tool**. It is not affiliated with, endorsed by, or associated with Microsoft Corporation. All question content is original and written for educational purposes based on the publicly available [AZ-900 exam skills outline](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900).

Microsoft, Azure, and AZ-900 are trademarks of Microsoft Corporation.

---

## 📜 License

Built for the #1MillionDevs Movement. Free for educational use.
