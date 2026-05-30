export type QuestCategory =
  | 'diet'
  | 'finance'
  | 'medicine'
  | 'skincare'
  | 'spiritual'
  | 'reading'
  | 'exercise';

export interface QuestTask {
  id: string;
  category: QuestCategory;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  completedAt?: string;
}

export interface SideQuest {
  id: string;
  title: string;
  description: string;
  xp: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  completed: boolean;
  completedAt?: string;
}

export interface DailyRecord {
  date: string; // ISO date string YYYY-MM-DD
  tasks: QuestTask[];
  sideQuest: SideQuest;
  totalXpEarned: number;
  allMainQuestsCompleted: boolean;
  perfectDay: boolean; // all tasks + side quest done
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  condition: (stats: UserStats) => boolean;
}

export interface UserStats {
  level: number;
  totalXP: number;
  currentLevelXP: number;
  xpToNextLevel: number;
  streak: number;
  longestStreak: number;
  totalDaysCompleted: number;
  totalPerfectDays: number;
  day75Progress: number; // 0-75 days completed
  unlockedAchievements: string[];
  lastActiveDate: string;
}

export interface AppState {
  userStats: UserStats;
  dailyRecords: Record<string, DailyRecord>;
  today: DailyRecord | null;
  showXPGain: { amount: number; key: number } | null;
}

export interface CategoryConfig {
  id: QuestCategory;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  description: string;
}
