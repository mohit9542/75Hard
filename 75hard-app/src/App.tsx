import { useState, useEffect } from 'react';
import { StatsHeader } from './components/StatsHeader';
import { QuestSection } from './components/QuestSection';
import { SideQuestCard } from './components/SideQuestCard';
import { AchievementsPanel } from './components/AchievementsPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { DayCompleteModal } from './components/DayCompleteModal';
import { XPGainToast } from './components/XPGainToast';
import { InstallBanner } from './components/InstallBanner';
import { useQuestState } from './hooks/useQuestState';
import type { QuestCategory } from './types';
import { CATEGORY_CONFIG } from './data/quests';
import { resetAppData } from './utils/storage';
import { RotateCcw, Shield, ListChecks, Trophy, Clock } from 'lucide-react';
import { format } from 'date-fns';

const CATEGORY_ORDER: QuestCategory[] = [
  'exercise',
  'diet',
  'medicine',
  'skincare',
  'spiritual',
  'reading',
  'finance',
];

type Tab = 'quests' | 'achievements' | 'history';

export default function App() {
  const {
    userStats,
    today,
    dailyRecords,
    todayKey,
    xpGain,
    showDayComplete,
    setShowDayComplete,
    toggleTask,
    toggleSideQuest,
    todayProgress,
    groupedTasks,
  } = useQuestState();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('quests');

  const handleReset = () => {
    resetAppData();
    window.location.reload();
  };

  const todayDate = format(new Date(), 'EEE, MMM d');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showDayComplete || showResetConfirm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showDayComplete, showResetConfirm]);

  return (
    <div
      className="min-h-screen min-h-[100dvh] flex flex-col"
      style={{ background: 'linear-gradient(180deg, #07070F 0%, #0D0D1A 50%, #07070F 100%)' }}
    >
      {/* Ambient background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              background: i % 3 === 0 ? '#6644FF' : i % 3 === 1 ? '#00FF88' : '#FFD700',
              animation: `float ${3 + (i % 4)}s ease-in-out ${(i % 3) * 0.8}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Sticky App Bar */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b border-quest-border/50"
        style={{
          background: 'rgba(7,7,15,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          paddingTop: 'max(12px, env(safe-area-inset-top))',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'linear-gradient(135deg, #6644FF, #00FF88)' }}>
            ⚔️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className="text-sm font-game leading-none"
                style={{ color: '#FFD700', filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.5))' }}
              >
                75 HARD
              </span>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                style={{ background: 'rgba(102,68,255,0.3)', color: '#a78bfa' }}
              >
                LVL {userStats.level}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 leading-none mt-0.5">{todayDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Today's XP chip */}
          {today && today.totalXpEarned > 0 && (
            <div
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(0,255,136,0.1)',
                border: '1px solid rgba(0,255,136,0.3)',
                color: '#00FF88',
              }}
            >
              +{today.totalXpEarned} XP
            </div>
          )}
          <div className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-purple-800/40 bg-purple-950/40 text-purple-400">
            <Shield size={10} />
          </div>
          <button
            className="p-2 rounded-lg text-gray-600 hover:text-gray-400 active:scale-95 transition-all"
            onClick={() => setShowResetConfirm(true)}
            aria-label="Reset data"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </header>

      {/* Install Banner (shown when app is installable) */}
      <InstallBanner />

      {/* XP Toast */}
      {xpGain && <XPGainToast key={xpGain.key} amount={xpGain.amount} />}

      {/* Day Complete Modal */}
      {showDayComplete && today && (
        <DayCompleteModal record={today} stats={userStats} onClose={() => setShowDayComplete(false)} />
      )}

      {/* Reset Confirm */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            className="quest-panel p-6 w-full max-w-sm rounded-2xl text-center"
            style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-lg font-bold text-white mb-2">Reset All Progress?</h3>
            <p className="text-sm text-gray-400 mb-6">
              This will permanently delete all your XP, streaks, and history.
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl border border-white/20 text-gray-300 text-sm font-semibold active:scale-95 transition-all"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white active:scale-95 transition-all"
                style={{ background: 'linear-gradient(135deg, #CC2222, #991111)' }}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main scrollable content */}
      <main className="flex-1 overflow-y-auto no-bounce">
        <div className="max-w-2xl mx-auto px-4 py-4 pb-28">

          {/* Stats Header */}
          <StatsHeader stats={userStats} todayPercent={todayProgress.percent} />

          {/* Tab: Quests */}
          {activeTab === 'quests' && today && (
            <div className="space-y-3">
              <SectionDivider label="MAIN QUESTS" color="purple" />

              {CATEGORY_ORDER.map(category => {
                const tasks = groupedTasks[category];
                if (!tasks || tasks.length === 0) return null;
                return (
                  <QuestSection
                    key={category}
                    category={category}
                    tasks={tasks}
                    onToggleTask={toggleTask}
                  />
                );
              })}

              <SectionDivider label="SIDE QUEST" color="yellow" />
              <SideQuestCard sideQuest={today.sideQuest} onToggle={toggleSideQuest} />

              {/* Daily score summary */}
              <div className="quest-panel p-4 mt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Today's XP</p>
                    <p className="text-2xl font-bold text-quest-xp mt-0.5">
                      {today.totalXpEarned.toLocaleString()}
                      <span className="text-sm text-gray-400 ml-1">XP</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Quests</p>
                    <p className="text-2xl font-bold text-white mt-0.5">
                      {todayProgress.completed}
                      <span className="text-gray-500 text-lg">/{todayProgress.total}</span>
                    </p>
                  </div>
                </div>

                {/* Category status dots */}
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {CATEGORY_ORDER.map(cat => {
                    const tasks = groupedTasks[cat] || [];
                    const done = tasks.length > 0 && tasks.every(t => t.completed);
                    const config = CATEGORY_CONFIG[cat];
                    return (
                      <div
                        key={cat}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-all"
                        style={{
                          background: done ? config.glowColor : 'rgba(255,255,255,0.03)',
                          borderColor: done ? config.glowColor.replace('0.3', '0.5') : 'rgba(255,255,255,0.08)',
                          color: done ? 'white' : '#6b7280',
                        }}
                      >
                        <span>{config.icon}</span>
                      </div>
                    );
                  })}
                  <div
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-all"
                    style={{
                      background: today.sideQuest.completed ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.03)',
                      borderColor: today.sideQuest.completed ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.08)',
                      color: today.sideQuest.completed ? '#FFD700' : '#6b7280',
                    }}
                  >
                    <span>⚡</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Achievements */}
          {activeTab === 'achievements' && (
            <div className="space-y-3">
              <AchievementsPanel stats={userStats} />
            </div>
          )}

          {/* Tab: History */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <HistoryPanel records={dailyRecords} todayKey={todayKey} />
            </div>
          )}

        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center border-t border-quest-border/60"
        style={{
          background: 'rgba(7,7,15,0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <NavTab
          icon={<ListChecks size={20} />}
          label="Quests"
          active={activeTab === 'quests'}
          badge={today ? `${todayProgress.completed}/${todayProgress.total}` : undefined}
          onClick={() => setActiveTab('quests')}
        />
        <NavTab
          icon={<Trophy size={20} />}
          label="Trophies"
          active={activeTab === 'achievements'}
          badge={userStats.unlockedAchievements.length > 0 ? `${userStats.unlockedAchievements.length}` : undefined}
          onClick={() => setActiveTab('achievements')}
        />
        <NavTab
          icon={<Clock size={20} />}
          label="History"
          active={activeTab === 'history'}
          onClick={() => setActiveTab('history')}
        />
      </nav>
    </div>
  );
}

function SectionDivider({ label, color }: { label: string; color: 'purple' | 'yellow' }) {
  const c = color === 'purple' ? 'text-purple-400' : 'text-yellow-400';
  const via = color === 'purple' ? 'via-purple-800/50' : 'via-yellow-800/50';
  return (
    <div className="flex items-center gap-2 my-3">
      <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${via} to-transparent`} />
      <span className={`text-[10px] font-game ${c} tracking-widest px-2`}>{label}</span>
      <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${via} to-transparent`} />
    </div>
  );
}

interface NavTabProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: string;
  onClick: () => void;
}

function NavTab({ icon, label, active, badge, onClick }: NavTabProps) {
  return (
    <button
      className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all active:scale-95
        ${active ? 'text-white' : 'text-gray-600'}`}
      onClick={onClick}
      style={{ touchAction: 'manipulation' }}
    >
      <div className="relative">
        <div
          className={`transition-all ${active ? 'text-quest-glow' : ''}`}
          style={active ? { filter: 'drop-shadow(0 0 6px rgba(102,68,255,0.8))' } : {}}
        >
          {icon}
        </div>
        {badge && (
          <span
            className="absolute -top-1.5 -right-2.5 text-[9px] font-bold px-1 rounded-full min-w-[16px] text-center leading-4"
            style={{ background: active ? '#6644FF' : '#374151', color: 'white' }}
          >
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-semibold tracking-wide">{label}</span>
      {active && (
        <div
          className="absolute bottom-0 w-6 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, #6644FF, #00FF88)' }}
        />
      )}
    </button>
  );
}
