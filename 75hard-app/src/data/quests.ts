import type { QuestCategory, CategoryConfig, QuestTask, SideQuest } from '../types';

export const CATEGORY_CONFIG: Record<QuestCategory, CategoryConfig> = {
  diet: {
    id: 'diet',
    label: 'Diet & Nutrition',
    icon: '🥗',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/40',
    borderColor: 'border-emerald-700/50',
    glowColor: 'rgba(52, 211, 153, 0.3)',
    description: 'Fuel your body like a champion',
  },
  exercise: {
    id: 'exercise',
    label: 'Exercise',
    icon: '⚔️',
    color: 'text-red-400',
    bgColor: 'bg-red-950/40',
    borderColor: 'border-red-700/50',
    glowColor: 'rgba(248, 113, 113, 0.3)',
    description: 'Train your body, forge your will',
  },
  medicine: {
    id: 'medicine',
    label: 'Medicine & Health',
    icon: '💊',
    color: 'text-blue-400',
    bgColor: 'bg-blue-950/40',
    borderColor: 'border-blue-700/50',
    glowColor: 'rgba(96, 165, 250, 0.3)',
    description: 'Maintain your health protocols',
  },
  skincare: {
    id: 'skincare',
    label: 'Skin Care',
    icon: '✨',
    color: 'text-pink-400',
    bgColor: 'bg-pink-950/40',
    borderColor: 'border-pink-700/50',
    glowColor: 'rgba(244, 114, 182, 0.3)',
    description: 'Glow up, inside and out',
  },
  spiritual: {
    id: 'spiritual',
    label: 'Spiritual',
    icon: '🔮',
    color: 'text-purple-400',
    bgColor: 'bg-purple-950/40',
    borderColor: 'border-purple-700/50',
    glowColor: 'rgba(167, 139, 250, 0.3)',
    description: 'Nourish your mind and soul',
  },
  reading: {
    id: 'reading',
    label: 'Reading',
    icon: '📖',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-950/40',
    borderColor: 'border-yellow-700/50',
    glowColor: 'rgba(250, 204, 21, 0.3)',
    description: 'Expand your knowledge daily',
  },
  finance: {
    id: 'finance',
    label: 'Finance',
    icon: '💰',
    color: 'text-green-400',
    bgColor: 'bg-green-950/40',
    borderColor: 'border-green-700/50',
    glowColor: 'rgba(74, 222, 128, 0.3)',
    description: 'Build your financial fortress',
  },
};

export const DAILY_QUEST_TEMPLATES: Omit<QuestTask, 'id' | 'completed' | 'completedAt'>[] = [
  // Diet
  {
    category: 'diet',
    title: 'Follow your meal plan',
    description: 'Stick to your diet — no cheat meals, no alcohol',
    xp: 80,
  },
  {
    category: 'diet',
    title: 'Drink 1 gallon of water',
    description: 'Hydrate or die-drate. Drink your full gallon (3.8L)',
    xp: 60,
  },
  {
    category: 'diet',
    title: 'No processed sugar',
    description: 'Zero added sugars, sweets, or junk food today',
    xp: 70,
  },
  // Exercise
  {
    category: 'exercise',
    title: 'Workout #1 (45 min min.)',
    description: 'Complete your first workout — can be any form of exercise',
    xp: 100,
  },
  {
    category: 'exercise',
    title: 'Workout #2 — Outdoor only',
    description: 'Second workout must be outside, rain or shine',
    xp: 100,
  },
  // Medicine
  {
    category: 'medicine',
    title: 'Take all supplements/meds',
    description: 'Every supplement and medication — no skipping',
    xp: 60,
  },
  {
    category: 'medicine',
    title: '8+ hours of sleep',
    description: 'Protect your recovery — log at least 8 hours',
    xp: 70,
  },
  // Skincare
  {
    category: 'skincare',
    title: 'Morning skin routine',
    description: 'Cleanse, tone, moisturize, SPF — full morning routine',
    xp: 50,
  },
  {
    category: 'skincare',
    title: 'Evening skin routine',
    description: 'Double cleanse, serum, moisturize — full night routine',
    xp: 50,
  },
  // Spiritual
  {
    category: 'spiritual',
    title: '10-min meditation or prayer',
    description: 'Quiet the mind. Journal, meditate, or pray for 10+ minutes',
    xp: 70,
  },
  {
    category: 'spiritual',
    title: 'Write 3 daily gratitudes',
    description: 'Name three specific things you are grateful for today',
    xp: 50,
  },
  // Reading
  {
    category: 'reading',
    title: 'Read 10 pages (non-fiction)',
    description: 'Read at least 10 pages of a non-fiction or self-improvement book',
    xp: 80,
  },
  // Finance
  {
    category: 'finance',
    title: 'Log today\'s expenses',
    description: 'Record every dollar you spent or plan to spend',
    xp: 60,
  },
  {
    category: 'finance',
    title: 'No unnecessary purchases',
    description: 'Zero impulse buys — only planned, essential spending',
    xp: 70,
  },
];

export const SIDE_QUESTS: Omit<SideQuest, 'id' | 'completed' | 'completedAt'>[] = [
  // Common
  {
    title: 'Cold Shower Challenge',
    description: 'End your shower with 60 seconds of cold water. Embrace the discomfort!',
    xp: 50,
    rarity: 'common',
    icon: '🚿',
  },
  {
    title: 'Digital Detox Hour',
    description: 'Put your phone away for 1 full hour. No social media, no scrolling.',
    xp: 50,
    rarity: 'common',
    icon: '📵',
  },
  {
    title: 'Random Act of Kindness',
    description: 'Do something kind for a stranger or loved one today. No strings attached.',
    xp: 60,
    rarity: 'common',
    icon: '💙',
  },
  {
    title: 'Power Posing',
    description: 'Stand in a power pose for 2 minutes. Shoulders back, chin up, own the room.',
    xp: 40,
    rarity: 'common',
    icon: '🦁',
  },
  {
    title: 'Morning Journaling',
    description: 'Write 1 full page in a journal before any screens. No prompts — just flow.',
    xp: 55,
    rarity: 'common',
    icon: '📝',
  },
  {
    title: 'Stretching Session',
    description: 'Spend 15 minutes stretching. Full body — hold each stretch for 30 seconds.',
    xp: 45,
    rarity: 'common',
    icon: '🧘',
  },
  // Rare
  {
    title: 'Sunlight Protocol',
    description: 'Get 10 minutes of direct sunlight before 10am. No sunglasses — let your eyes see it.',
    xp: 80,
    rarity: 'rare',
    icon: '☀️',
  },
  {
    title: 'Call Someone You Love',
    description: 'Call (not text) a family member or close friend. Talk for at least 15 minutes.',
    xp: 75,
    rarity: 'rare',
    icon: '📞',
  },
  {
    title: 'Vision Board Update',
    description: 'Spend 20 minutes updating or creating your vision board. See your future clearly.',
    xp: 85,
    rarity: 'rare',
    icon: '🎯',
  },
  {
    title: 'No Complaining Day',
    description: 'Zero complaints — not out loud, not in text, not even in your head. Pure discipline.',
    xp: 100,
    rarity: 'rare',
    icon: '🤐',
  },
  {
    title: 'Deep Work Sprint',
    description: 'Do 90 minutes of deep, focused work on your most important goal. Zero distractions.',
    xp: 90,
    rarity: 'rare',
    icon: '🔥',
  },
  {
    title: 'New Skill 30-Minute Session',
    description: 'Spend 30 minutes learning something completely new — a language, instrument, or skill.',
    xp: 85,
    rarity: 'rare',
    icon: '🧠',
  },
  // Epic
  {
    title: 'Social Media Blackout',
    description: 'Zero social media for the ENTIRE day. No Instagram, TikTok, Twitter — nothing.',
    xp: 150,
    rarity: 'epic',
    icon: '🛡️',
  },
  {
    title: 'The Extra Mile',
    description: 'Add an extra mile to one of your workouts. Literally run, walk, or bike one more mile.',
    xp: 130,
    rarity: 'epic',
    icon: '🏃',
  },
  {
    title: 'Cook From Scratch',
    description: 'Prepare every single meal today from raw ingredients. No shortcuts, no delivery.',
    xp: 120,
    rarity: 'epic',
    icon: '👨‍🍳',
  },
  {
    title: 'Invest in Your Future',
    description: 'Put money into savings, an investment account, or pay off debt today — any amount.',
    xp: 140,
    rarity: 'epic',
    icon: '📈',
  },
  // Legendary
  {
    title: 'THE IRON WILL',
    description: 'Complete ALL tasks before noon. The entire day\'s checklist — done before lunch.',
    xp: 250,
    rarity: 'legendary',
    icon: '⚡',
  },
  {
    title: 'Teach to Learn',
    description: 'Teach someone else something you know for 30+ minutes. The best way to master anything.',
    xp: 200,
    rarity: 'legendary',
    icon: '🏆',
  },
  {
    title: 'The Warrior\'s Fast',
    description: 'Complete a 16-hour fast today. Eat only within an 8-hour window. Discipline supreme.',
    xp: 220,
    rarity: 'legendary',
    icon: '⚔️',
  },
  {
    title: 'Face Your Fear',
    description: 'Do one thing today that genuinely scares you. One brave act that moves you forward.',
    xp: 230,
    rarity: 'legendary',
    icon: '🌟',
  },
];

export const XP_PER_LEVEL = (level: number): number => {
  return 500 + (level - 1) * 150;
};

export const ACHIEVEMENTS = [
  {
    id: 'first_blood',
    title: 'First Blood',
    description: 'Complete your very first day',
    icon: '🗡️',
    condition: (stats: { totalDaysCompleted: number }) => stats.totalDaysCompleted >= 1,
  },
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Complete 7 days in a row',
    icon: '🔥',
    condition: (stats: { streak: number }) => stats.streak >= 7,
  },
  {
    id: 'perfect_day',
    title: 'Flawless Victory',
    description: 'Complete every task including the side quest',
    icon: '💎',
    condition: (stats: { totalPerfectDays: number }) => stats.totalPerfectDays >= 1,
  },
  {
    id: 'halfway',
    title: 'Halfway There',
    description: 'Reach day 37 of 75 Hard',
    icon: '🏅',
    condition: (stats: { day75Progress: number }) => stats.day75Progress >= 37,
  },
  {
    id: 'level_5',
    title: 'Rising Champion',
    description: 'Reach Level 5',
    icon: '⭐',
    condition: (stats: { level: number }) => stats.level >= 5,
  },
  {
    id: 'level_10',
    title: 'Legendary Status',
    description: 'Reach Level 10',
    icon: '🌟',
    condition: (stats: { level: number }) => stats.level >= 10,
  },
  {
    id: 'streak_30',
    title: 'Iron Streak',
    description: '30-day streak',
    icon: '⚡',
    condition: (stats: { streak: number }) => stats.streak >= 30,
  },
  {
    id: 'streak_75',
    title: '75 HARD CHAMPION',
    description: 'Complete the full 75-day challenge',
    icon: '👑',
    condition: (stats: { day75Progress: number }) => stats.day75Progress >= 75,
  },
  {
    id: 'perfect_5',
    title: 'Perfectionist',
    description: 'Complete 5 perfect days',
    icon: '🎯',
    condition: (stats: { totalPerfectDays: number }) => stats.totalPerfectDays >= 5,
  },
];
