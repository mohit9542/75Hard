import { useState } from 'react';
import { StatsHeader } from './components/StatsHeader';
import { QuestSection } from './components/QuestSection';
import { SideQuestCard } from './components/SideQuestCard';
import { AchievementsPanel } from './components/AchievementsPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { DayCompleteModal } from './components/DayCompleteModal';
import { XPGainToast } from './components/XPGainToast';
import { useQuestState } from './hooks/useQuestState';
import type { QuestCategory } from './types';
import { CATEGORY_CONFIG } from './data/quests';
import { resetAppData } from './utils/storage';
import { RotateCcw, Shield } from 'lucide-react';
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

  const handleReset = () => {
    resetAppData();
    window.location.reload();
  };

  const todayDate = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #07070F 0%, #0D0D1A 50%, #07070F 100%)',
      }}
    >
      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#6644FF' : i % 3 === 1 ? '#00FF88' : '#FFD700',
              animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
              transform: `scale(${0.5 + Math.random()})`,
            }}
          />
        ))}
      </div>

      {/* XP Toast */}
      {xpGain && <XPGainToast key={xpGain.key} amount={xpGain.amount} onDone={() => {}} />}

      {/* Day Complete Modal */}
      {showDayComplete && today && (
        <DayCompleteModal
          record={today}
          stats={userStats}
          onClose={() => setShowDayComplete(false)}
        />
      )}

      {/* Reset Confirm Dialog */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div className="quest-panel p-6 max-w-sm w-full text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-lg font-bold text-white mb-2">Reset All Progress?</h3>
            <p className="text-sm text-gray-400 mb-6">
              This will permanently delete all your data, XP, and streaks. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 py-2.5 rounded-lg border border-white/20 text-gray-300 text-sm font-semibold hover:bg-white/10 transition-colors"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
                style={{ background: 'linear-gradient(135deg, #CC2222, #991111)' }}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Date + Reset */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Daily Quest Board</p>
            <p className="text-sm text-gray-300 font-medium mt-0.5">{todayDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1.5 rounded-full">
              <Shield size={12} />
              <span className="font-semibold">75 HARD</span>
            </div>
            <button
              className="text-gray-600 hover:text-gray-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
              onClick={() => setShowResetConfirm(true)}
              title="Reset all data"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Stats Header */}
        <StatsHeader stats={userStats} todayPercent={todayProgress.percent} />

        {/* Today's Quests */}
        {today ? (
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-800/50 to-transparent" />
              <span className="text-xs font-game text-purple-400 tracking-widest px-2">MAIN QUESTS</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-800/50 to-transparent" />
            </div>

            {CATEGORY_ORDER.map(category => {
              const tasks = (groupedTasks as Record<string, typeof today.tasks>)[category];
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

            {/* Side Quest */}
            <div>
              <div className="flex items-center gap-2 my-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-800/50 to-transparent" />
                <span className="text-xs font-game text-yellow-400 tracking-widest px-2">SIDE QUEST</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-800/50 to-transparent" />
              </div>
              <SideQuestCard sideQuest={today.sideQuest} onToggle={toggleSideQuest} />
            </div>

            {/* Daily XP Summary */}
            <div className="quest-panel p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Today's Score</p>
                  <p className="text-2xl font-bold text-quest-xp mt-1">
                    {today.totalXpEarned.toLocaleString()} <span className="text-sm text-gray-400">XP</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Quests Done</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {todayProgress.completed}<span className="text-gray-500 text-lg">/{todayProgress.total}</span>
                  </p>
                </div>
              </div>

              {/* Category dots */}
              <div className="flex gap-1.5 mt-4 flex-wrap">
                {CATEGORY_ORDER.map(cat => {
                  const tasks = (groupedTasks as Record<string, typeof today.tasks>)[cat] || [];
                  const done = tasks.every(t => t.completed);
                  const config = CATEGORY_CONFIG[cat];
                  return (
                    <div
                      key={cat}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border"
                      style={{
                        background: done ? `${config.glowColor}` : 'rgba(255,255,255,0.03)',
                        borderColor: done ? config.glowColor.replace('0.3', '0.5') : 'rgba(255,255,255,0.08)',
                        color: done ? 'white' : '#6b7280',
                      }}
                    >
                      <span>{config.icon}</span>
                      <span className="hidden sm:inline">{config.label.split(' ')[0]}</span>
                    </div>
                  );
                })}
                <div
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border"
                  style={{
                    background: today.sideQuest.completed ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.03)',
                    borderColor: today.sideQuest.completed ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.08)',
                    color: today.sideQuest.completed ? '#FFD700' : '#6b7280',
                  }}
                >
                  <span>⚡</span>
                  <span className="hidden sm:inline">Side</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">Loading quests...</div>
        )}

        {/* Achievements */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-800/30 to-transparent" />
            <span className="text-xs font-game text-yellow-600 tracking-widest px-2">TROPHIES</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-800/30 to-transparent" />
          </div>
          <AchievementsPanel stats={userStats} />
        </div>

        {/* History */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-800/30 to-transparent" />
            <span className="text-xs font-game text-blue-600 tracking-widest px-2">HISTORY</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-800/30 to-transparent" />
          </div>
          <HistoryPanel records={dailyRecords} todayKey={todayKey} />
        </div>

        {/* Footer */}
        <div className="text-center pb-4">
          <p className="text-xs text-gray-700">
            75 HARD Quest Log • Stay hard, stay consistent
          </p>
        </div>
      </div>
    </div>
  );
}
