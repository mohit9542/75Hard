# 75 HARD Quest Log ⚔️

A gamified daily to-do tracker for the 75 Hard challenge — built with React, TypeScript, and Tailwind CSS.

## Features

- **7 Quest Categories**: Exercise, Diet, Medicine, Skin Care, Spiritual, Reading, Finance
- **Daily Side Quest**: A randomly-selected bonus challenge each day (Common → Legendary rarity)
- **XP & Leveling System**: Earn XP for completing tasks, level up through 10+ titles
- **Streaks & Achievements**: Track your daily streak, best streak, and unlock 9 achievements
- **75-Day Progress Tracker**: Circular progress display showing your day count toward 75
- **Perfect Day Bonus**: Complete every task including the side quest for a perfect day
- **Completion Modal**: Celebration screen when you clear all main quests
- **Quest History**: Review the last 14 days of progress
- **Persistent State**: All data stored in localStorage — no account needed

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS 3** (styling)
- **Lucide React** (icons)
- **date-fns** (date utilities)

## Getting Started

```bash
cd 75hard-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
cd 75hard-app
npm run build
```

## How It Works

Every day a fresh set of quests is generated from templates across all 7 categories. A deterministic seed based on the date picks a unique side quest each day — so the same quest always appears on the same date. Completing tasks awards XP, which fills your level bar. When you clear all main quests the app detects day completion and updates your 75-day counter.

Stay hard. 🔥
