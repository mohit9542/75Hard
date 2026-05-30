
import type { UserStats } from '../types';
import { Zap } from 'lucide-react';

interface Props {
  stats: UserStats;
}

const LEVEL_TITLES: Record<number, string> = {
  1: 'Novice',
  2: 'Apprentice',
  3: 'Warrior',
  4: 'Champion',
  5: 'Hero',
  6: 'Elite',
  7: 'Master',
  8: 'Grandmaster',
  9: 'Legend',
  10: 'Mythic',
};

function getLevelTitle(level: number): string {
  if (level >= 10) return 'MYTHIC';
  return LEVEL_TITLES[level] || 'Novice';
}

export const XPBar: React.FC<Props> = ({ stats }) => {
  const percent = Math.min(100, Math.round((stats.currentLevelXP / stats.xpToNextLevel) * 100));

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Level Badge */}
      <div className="flex-shrink-0 relative">
        <div
          className="w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 border-purple-500/60"
          style={{
            background: 'linear-gradient(135deg, #1a0a3a, #2d1463)',
            boxShadow: '0 0 20px rgba(102, 68, 255, 0.5), inset 0 0 10px rgba(102,68,255,0.2)',
          }}
        >
          <span className="text-xs font-game text-purple-300 leading-none">LVL</span>
          <span
            className="text-lg font-game leading-none"
            style={{ color: '#FFD700', textShadow: '0 0 8px rgba(255,215,0,0.6)' }}
          >
            {stats.level}
          </span>
        </div>
      </div>

      {/* XP Progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-xs font-semibold text-purple-300 tracking-widest uppercase">
              {getLevelTitle(stats.level)}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            <span className="text-purple-300 font-semibold">{stats.currentLevelXP.toLocaleString()}</span>
            <span className="text-gray-500"> / {stats.xpToNextLevel.toLocaleString()} XP</span>
          </span>
        </div>
        <div className="xp-bar">
          <div
            className="xp-bar-fill"
            style={{ width: `${percent}%` }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 21px)',
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">
            Total: <span className="text-gray-400">{stats.totalXP.toLocaleString()} XP</span>
          </span>
          <span className="text-xs text-gray-500">{percent}%</span>
        </div>
      </div>
    </div>
  );
};
