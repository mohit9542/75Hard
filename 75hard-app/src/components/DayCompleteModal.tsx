import * as React from 'react';
import { useEffect } from 'react';
import type { DailyRecord, UserStats } from '../types';
import { Trophy, Zap, Star, X } from 'lucide-react';

interface Props {
  record: DailyRecord;
  stats: UserStats;
  onClose: () => void;
}

export function DayCompleteModal({ record, stats, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isPerfect = record.perfectDay;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="relative rounded-2xl overflow-hidden max-w-md w-full text-center p-8"
        style={{
          background: isPerfect
            ? 'linear-gradient(135deg, #1a1000, #2a1800, #1a1000)'
            : 'linear-gradient(135deg, #0a0a1a, #12122a, #0a0a1a)',
          border: `2px solid ${isPerfect ? 'rgba(255,215,0,0.5)' : 'rgba(0,255,136,0.4)'}`,
          boxShadow: isPerfect
            ? '0 0 60px rgba(255,215,0,0.4), 0 0 120px rgba(255,165,0,0.2)'
            : '0 0 60px rgba(0,255,136,0.3), 0 0 120px rgba(102,68,255,0.2)',
        }}
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-float"
          style={{
            background: isPerfect
              ? 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.1))'
              : 'linear-gradient(135deg, rgba(0,255,136,0.2), rgba(102,68,255,0.1))',
            border: `2px solid ${isPerfect ? 'rgba(255,215,0,0.5)' : 'rgba(0,255,136,0.4)'}`,
          }}
        >
          {isPerfect ? '👑' : '🏆'}
        </div>

        {/* Title */}
        <h2
          className="text-xl font-game mb-2 leading-tight"
          style={{
            background: isPerfect
              ? 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700)'
              : 'linear-gradient(90deg, #00FF88, #6644FF, #00FF88)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% auto',
            animation: 'shimmer 3s linear infinite',
          }}
        >
          {isPerfect ? 'PERFECT DAY!' : 'QUEST CLEAR!'}
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          {isPerfect
            ? 'You completed every single quest including the side quest. Absolute legend!'
            : 'All main quests complete! Champion discipline!'}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatBox
            icon={<Zap size={16} className="text-quest-xp" />}
            label="XP Earned"
            value={`+${record.totalXpEarned}`}
            color="text-quest-xp"
          />
          <StatBox
            icon={<Star size={16} className="text-yellow-400" />}
            label="Level"
            value={`${stats.level}`}
            color="text-yellow-400"
          />
          <StatBox
            icon={<Trophy size={16} className="text-orange-400" />}
            label="Streak"
            value={`${stats.streak}🔥`}
            color="text-orange-400"
          />
        </div>

        {/* Day progress */}
        <div className="text-xs text-gray-500 mb-4">
          Day <span className="text-white font-bold">{stats.day75Progress}</span> of{' '}
          <span className="text-quest-xp font-bold">75</span> complete
        </div>

        <button
          className="btn-primary w-full text-white"
          onClick={onClose}
        >
          Keep Going! ⚔️
        </button>
      </div>
    </div>
  );
};

function StatBox({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: string; color: string
}) {
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <div className="flex items-center justify-center mb-1">{icon}</div>
      <div className={`text-base font-bold ${color}`}>{value}</div>
      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
