import type { UserStats, DailyRecord, QuestTask, SideQuest } from '../types';
import { DAILY_QUEST_TEMPLATES, SIDE_QUESTS, XP_PER_LEVEL, ACHIEVEMENTS } from '../data/quests';
import { format } from 'date-fns';

const STORAGE_KEYS = {
  USER_STATS: '75hard_user_stats',
  DAILY_RECORDS: '75hard_daily_records',
};

export const DEFAULT_USER_STATS: UserStats = {
  level: 1,
  totalXP: 0,
  currentLevelXP: 0,
  xpToNextLevel: XP_PER_LEVEL(1),
  streak: 0,
  longestStreak: 0,
  totalDaysCompleted: 0,
  totalPerfectDays: 0,
  day75Progress: 0,
  unlockedAchievements: [],
  lastActiveDate: '',
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    if (!raw) return { ...DEFAULT_USER_STATS };
    return { ...DEFAULT_USER_STATS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_USER_STATS };
  }
}

export function saveUserStats(stats: UserStats): void {
  localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
}

export function loadDailyRecords(): Record<string, DailyRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_RECORDS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveDailyRecords(records: Record<string, DailyRecord>): void {
  localStorage.setItem(STORAGE_KEYS.DAILY_RECORDS, JSON.stringify(records));
}

export function getTodayKey(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getSideQuestForDate(dateStr: string): SideQuest {
  // Deterministic selection based on date so the quest is same all day
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  const index = hash % SIDE_QUESTS.length;
  const template = SIDE_QUESTS[index];
  return {
    ...template,
    id: `sidequest-${dateStr}`,
    completed: false,
  };
}

export function createDailyRecord(dateStr: string): DailyRecord {
  const tasks: QuestTask[] = DAILY_QUEST_TEMPLATES.map((t, i) => ({
    ...t,
    id: `${dateStr}-${t.category}-${i}`,
    completed: false,
  }));

  const sideQuest = getSideQuestForDate(dateStr);

  return {
    date: dateStr,
    tasks,
    sideQuest,
    totalXpEarned: 0,
    allMainQuestsCompleted: false,
    perfectDay: false,
  };
}

export function addXPToStats(stats: UserStats, xp: number): UserStats {
  const newTotalXP = stats.totalXP + xp;
  let newCurrentLevelXP = stats.currentLevelXP + xp;
  let newLevel = stats.level;
  let xpToNext = stats.xpToNextLevel;

  while (newCurrentLevelXP >= xpToNext) {
    newCurrentLevelXP -= xpToNext;
    newLevel++;
    xpToNext = XP_PER_LEVEL(newLevel);
  }

  return {
    ...stats,
    totalXP: newTotalXP,
    level: newLevel,
    currentLevelXP: newCurrentLevelXP,
    xpToNextLevel: xpToNext,
  };
}

export function checkAndUpdateStreak(stats: UserStats, todayKey: string): UserStats {
  const today = new Date(todayKey);
  const lastActive = stats.lastActiveDate ? new Date(stats.lastActiveDate) : null;

  if (!lastActive) {
    return {
      ...stats,
      streak: 1,
      longestStreak: Math.max(stats.longestStreak, 1),
      lastActiveDate: todayKey,
    };
  }

  const diffDays = Math.round((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return stats; // Same day, no change

  if (diffDays === 1) {
    const newStreak = stats.streak + 1;
    return {
      ...stats,
      streak: newStreak,
      longestStreak: Math.max(stats.longestStreak, newStreak),
      lastActiveDate: todayKey,
    };
  }

  // Streak broken
  return {
    ...stats,
    streak: 1,
    lastActiveDate: todayKey,
  };
}

export function checkAchievements(stats: UserStats): UserStats {
  const newUnlocked: string[] = [...stats.unlockedAchievements];

  for (const ach of ACHIEVEMENTS) {
    if (!newUnlocked.includes(ach.id) && ach.condition(stats as never)) {
      newUnlocked.push(ach.id);
    }
  }

  return { ...stats, unlockedAchievements: newUnlocked };
}

export function calculateDayProgress(record: DailyRecord): { completed: number; total: number; percent: number } {
  const total = record.tasks.length + 1; // +1 for side quest
  const completedTasks = record.tasks.filter(t => t.completed).length;
  const completedSideQuest = record.sideQuest.completed ? 1 : 0;
  const completed = completedTasks + completedSideQuest;
  return { completed, total, percent: Math.round((completed / total) * 100) };
}

export function resetAppData(): void {
  localStorage.removeItem(STORAGE_KEYS.USER_STATS);
  localStorage.removeItem(STORAGE_KEYS.DAILY_RECORDS);
}
