import { useState } from 'react';
import type { UserStats } from '../types';
import { ACHIEVEMENTS } from '../data/quests';
import { Trophy, Lock, ChevronDown, ChevronUp } from 'lucide-react';


export function AchievementsPanel({ stats }: { stats: UserStats }) {
  const [expanded, setExpanded] = useState(false);
  const unlocked = stats.unlockedAchievements;

  return (
    <div className="quest-panel">
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <Trophy size={18} className="text-yellow-400" />
          <span className="font-bold text-gray-200 tracking-wide">Achievements</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 font-semibold">
            {unlocked.length}/{ACHIEVEMENTS.length}
          </span>
        </div>
        {expanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ACHIEVEMENTS.map(ach => {
            const isUnlocked = unlocked.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  isUnlocked
                    ? 'bg-yellow-950/30 border-yellow-700/40'
                    : 'bg-white/[0.02] border-white/5 opacity-50'
                }`}
              >
                <div
                  className={`text-2xl w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isUnlocked ? 'bg-yellow-400/20' : 'bg-white/5'
                  }`}
                >
                  {isUnlocked ? ach.icon : <Lock size={14} className="text-gray-600" />}
                </div>
                <div>
                  <p className={`text-sm font-bold ${isUnlocked ? 'text-yellow-300' : 'text-gray-600'}`}>
                    {ach.title}
                  </p>
                  <p className="text-xs text-gray-500">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
