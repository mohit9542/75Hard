
import type { UserStats } from '../types';
import { XPBar } from './XPBar';
import { Flame, Trophy, Calendar, Star } from 'lucide-react';

interface Props {
  stats: UserStats;
  todayPercent: number;
}

export const StatsHeader: React.FC<Props> = ({ stats, todayPercent }) => {
  const day75Display = Math.min(stats.day75Progress, 75);

  return (
    <header className="quest-panel p-4 md:p-6 mb-6 animate-glow-pulse">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none rounded-lg"
        style={{
          backgroundImage: 'linear-gradient(rgba(102,68,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(102,68,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10">
        {/* Title Row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1
              className="text-xl md:text-2xl font-game leading-tight mb-1"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))',
              }}
            >
              75 HARD
            </h1>
            <p className="text-purple-300 text-sm tracking-[0.2em] uppercase font-semibold">Quest Log</p>
          </div>

          {/* Day Progress */}
          <div
            className="flex-shrink-0 relative w-16 h-16"
            title={`Day ${day75Display} of 75`}
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="rgba(102,68,255,0.2)"
                strokeWidth="2.5"
              />
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="url(#progressGrad)"
                strokeWidth="2.5"
                strokeDasharray={`${(day75Display / 75) * 100} 100`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6644FF" />
                  <stop offset="100%" stopColor="#00FF88" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-game text-white leading-none">{day75Display}</span>
              <span className="text-[8px] text-gray-400 leading-none mt-0.5">/ 75</span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mb-5">
          <XPBar stats={stats} />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatPill
            icon={<Flame size={14} className={stats.streak >= 7 ? 'text-orange-400 animate-streak-fire' : 'text-orange-400'} />}
            label="Streak"
            value={`${stats.streak} days`}
            color="text-orange-400"
            glow={stats.streak >= 7}
          />
          <StatPill
            icon={<Trophy size={14} className="text-yellow-400" />}
            label="Best Streak"
            value={`${stats.longestStreak} days`}
            color="text-yellow-400"
          />
          <StatPill
            icon={<Calendar size={14} className="text-blue-400" />}
            label="Days Done"
            value={`${stats.totalDaysCompleted}`}
            color="text-blue-400"
          />
          <StatPill
            icon={<Star size={14} className="text-pink-400" />}
            label="Perfect Days"
            value={`${stats.totalPerfectDays}`}
            color="text-pink-400"
          />
        </div>

        {/* Today's progress bar */}
        {todayPercent > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span className="font-semibold tracking-wider uppercase text-gray-300">Today's Progress</span>
              <span className="text-quest-xp font-semibold">{todayPercent}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${todayPercent}%`,
                  background: todayPercent === 100
                    ? 'linear-gradient(90deg, #FFD700, #FFA500)'
                    : 'linear-gradient(90deg, #6644FF, #00FF88)',
                  boxShadow: todayPercent === 100
                    ? '0 0 10px rgba(255,215,0,0.5)'
                    : '0 0 8px rgba(0,255,136,0.4)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface StatPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  glow?: boolean;
}

const StatPill: React.FC<StatPillProps> = ({ icon, label, value, color, glow }) => (
  <div
    className={`flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10 transition-all ${glow ? 'border-orange-500/40' : ''}`}
    style={glow ? { boxShadow: '0 0 10px rgba(255, 120, 0, 0.3)' } : {}}
  >
    {icon}
    <div className="min-w-0">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider leading-none">{label}</div>
      <div className={`text-sm font-bold ${color} leading-tight mt-0.5`}>{value}</div>
    </div>
  </div>
);
