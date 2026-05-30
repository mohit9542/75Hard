import { useState } from 'react';
import type { SideQuest } from '../types';
import { Check, Zap, Sparkles } from 'lucide-react';

interface Props {
  sideQuest: SideQuest;
  onToggle: () => void;
}

const RARITY_STYLES = {
  common: {
    label: 'COMMON',
    gradient: 'linear-gradient(135deg, #4a4a6a, #2a2a4a)',
    border: 'rgba(150,150,200,0.3)',
    glow: 'rgba(150,150,200,0.2)',
    textColor: 'text-gray-300',
    badge: 'bg-gray-700/50 text-gray-300 border-gray-600/50',
    xpColor: 'text-gray-300',
  },
  rare: {
    label: 'RARE',
    gradient: 'linear-gradient(135deg, #0a2a6a, #0a1a4a)',
    border: 'rgba(68,136,255,0.5)',
    glow: 'rgba(68,136,255,0.3)',
    textColor: 'text-blue-300',
    badge: 'bg-blue-900/50 text-blue-300 border-blue-600/50',
    xpColor: 'text-blue-300',
  },
  epic: {
    label: 'EPIC',
    gradient: 'linear-gradient(135deg, #2a0a6a, #1a0a4a)',
    border: 'rgba(168,85,247,0.5)',
    glow: 'rgba(168,85,247,0.3)',
    textColor: 'text-purple-300',
    badge: 'bg-purple-900/50 text-purple-300 border-purple-600/50',
    xpColor: 'text-purple-300',
  },
  legendary: {
    label: 'LEGENDARY',
    gradient: 'linear-gradient(135deg, #3a2a00, #2a1500)',
    border: 'rgba(255,215,0,0.6)',
    glow: 'rgba(255,215,0,0.3)',
    textColor: 'text-yellow-300',
    badge: 'bg-yellow-900/50 text-yellow-300 border-yellow-600/50',
    xpColor: 'text-yellow-300',
  },
};

export const SideQuestCard: React.FC<Props> = ({ sideQuest, onToggle }) => {
  const [showXP, setShowXP] = useState(false);
  const style = RARITY_STYLES[sideQuest.rarity];

  const handleToggle = () => {
    if (!sideQuest.completed) {
      setShowXP(true);
      setTimeout(() => setShowXP(false), 1000);
    }
    onToggle();
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 select-none"
      style={{
        background: style.gradient,
        borderColor: style.border,
        boxShadow: sideQuest.completed
          ? `0 0 30px ${style.glow}, 0 0 60px ${style.glow}`
          : `0 0 15px ${style.glow}`,
      }}
      onClick={handleToggle}
    >
      {/* Animated shimmer for legendary */}
      {sideQuest.rarity === 'legendary' && !sideQuest.completed && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.08) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s linear infinite',
          }}
        />
      )}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className={`${style.textColor} opacity-70`} />
            <span className="text-xs font-game tracking-widest text-gray-400">SIDE QUEST</span>
          </div>
          <span
            className={`text-[10px] font-game px-2 py-0.5 rounded-full border ${style.badge}`}
          >
            {style.label}
          </span>
        </div>

        {/* Quest info */}
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 border"
            style={{
              background: `${style.glow}`,
              borderColor: style.border,
            }}
          >
            {sideQuest.icon}
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-base font-bold mb-1 ${style.textColor}`}
              style={sideQuest.rarity === 'legendary' ? {
                background: 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% auto',
                animation: 'shimmer 3s linear infinite',
              } : {}}
            >
              {sideQuest.title}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">{sideQuest.description}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
          <div className={`flex items-center gap-1.5 font-bold text-sm ${style.xpColor}`}>
            <Zap size={14} />
            <span>+{sideQuest.xp} BONUS XP</span>
          </div>

          {/* Complete button */}
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border
              ${sideQuest.completed
                ? 'bg-quest-xp/20 text-quest-xp border-quest-xp/40'
                : 'border-white/20 text-white/70 hover:bg-white/10 hover:text-white active:scale-95'
              }`}
            onClick={(e) => { e.stopPropagation(); handleToggle(); }}
          >
            {sideQuest.completed ? (
              <>
                <Check size={14} strokeWidth={3} />
                Completed!
              </>
            ) : (
              'Mark Complete'
            )}
          </button>
        </div>

        {/* XP Float */}
        {showXP && (
          <div
            className="absolute right-4 top-2 text-sm font-bold text-yellow-400 pointer-events-none z-20 animate-xp-gain"
            style={{ textShadow: '0 0 12px rgba(255,215,0,0.9)' }}
          >
            +{sideQuest.xp} BONUS XP! ⚡
          </div>
        )}
      </div>
    </div>
  );
};
