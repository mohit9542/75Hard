import { useState } from 'react';
import type { QuestTask, QuestCategory } from '../types';
import { CATEGORY_CONFIG } from '../data/quests';
import { QuestTaskItem } from './QuestTaskItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  category: QuestCategory;
  tasks: QuestTask[];
  onToggleTask: (taskId: string) => void;
}

export function QuestSection({ category, tasks, onToggleTask }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const config = CATEGORY_CONFIG[category];
  const completedCount = tasks.filter(t => t.completed).length;
  const allDone = completedCount === tasks.length;
  const totalXP = tasks.reduce((sum, t) => sum + t.xp, 0);
  const earnedXP = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.xp, 0);

  return (
    <div
      className={`quest-panel border transition-all duration-300 ${config.borderColor} ${
        allDone ? 'opacity-80' : ''
      }`}
      style={allDone ? { boxShadow: `0 0 20px ${config.glowColor}` } : {}}
    >
      {/* Section Header */}
      <button
        className={`w-full flex items-center gap-3 p-4 text-left transition-colors rounded-lg ${config.bgColor}`}
        onClick={() => setCollapsed(!collapsed)}
      >
        {/* Category icon */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 font-bold"
          style={{
            background: `${config.glowColor}`,
            boxShadow: allDone ? `0 0 12px ${config.glowColor}` : 'none',
          }}
        >
          {config.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold tracking-wide ${config.color}`}>
              {config.label}
            </span>
            {allDone && (
              <span
                className="text-[10px] font-game px-2 py-0.5 rounded-full bg-quest-xp/20 text-quest-xp border border-quest-xp/30"
              >
                CLEAR!
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{config.description}</p>
        </div>

        {/* Progress + XP */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-gray-400 font-semibold">
              <span className={config.color}>{earnedXP}</span>/{totalXP} XP
            </div>
            <div className="text-xs text-gray-600">{completedCount}/{tasks.length} done</div>
          </div>

          {/* Mini Progress Circle */}
          <div className="relative w-8 h-8 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle
                cx="12" cy="12" r="9" fill="none"
                stroke={allDone ? '#00FF88' : config.glowColor.replace('0.3', '0.9')}
                strokeWidth="2"
                strokeDasharray={`${(completedCount / tasks.length) * 56.5} 56.5`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">{completedCount}</span>
            </div>
          </div>

          {collapsed
            ? <ChevronDown size={16} className="text-gray-500" />
            : <ChevronUp size={16} className="text-gray-500" />
          }
        </div>
      </button>

      {/* Tasks */}
      {!collapsed && (
        <div className="px-3 pb-3 space-y-1 mt-1">
          {/* Progress bar */}
          <div className="h-1 rounded-full bg-white/5 mb-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(completedCount / tasks.length) * 100}%`,
                background: `linear-gradient(90deg, ${config.glowColor.replace('0.3', '0.8')}, ${config.glowColor.replace('0.3', '0.5')})`,
              }}
            />
          </div>
          {tasks.map(task => (
            <QuestTaskItem key={task.id} task={task} onToggle={onToggleTask} />
          ))}
        </div>
      )}
    </div>
  );
};
