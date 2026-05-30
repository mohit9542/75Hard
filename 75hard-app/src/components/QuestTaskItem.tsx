import { useState } from 'react';
import type { QuestTask } from '../types';
import { Check, Zap } from 'lucide-react';

interface Props {
  task: QuestTask;
  onToggle: (taskId: string) => void;
}

export function QuestTaskItem({ task, onToggle }: Props) {
  const [showXP, setShowXP] = useState(false);

  const handleToggle = () => {
    if (!task.completed) {
      setShowXP(true);
      setTimeout(() => setShowXP(false), 800);
    }
    onToggle(task.id);
  };

  return (
    <div
      className={`relative flex items-center gap-3 rounded-xl cursor-pointer select-none transition-all duration-150 active:scale-[0.98]
        ${task.completed
          ? 'bg-white/5 opacity-70'
          : 'bg-white/[0.03] active:bg-white/[0.08]'
        }`}
      style={{
        padding: '12px 12px',
        minHeight: '56px', // generous touch target
        touchAction: 'manipulation',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
      onClick={handleToggle}
    >
      {/* XP float animation */}
      {showXP && (
        <div
          className="absolute right-2 -top-2 text-xs font-bold pointer-events-none z-10 animate-xp-gain"
          style={{ color: '#00FF88', textShadow: '0 0 8px rgba(0,255,136,0.8)' }}
        >
          +{task.xp} XP
        </div>
      )}

      {/* Checkbox — wrapped in a slightly larger hit area div */}
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
        <div className={`quest-checkbox ${task.completed ? 'checked' : ''}`}>
          {task.completed && (
            <Check size={14} className="text-quest-darker" strokeWidth={3} />
          )}
        </div>
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold leading-tight ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-100'
          }`}
        >
          {task.title}
        </p>
        <p className={`text-xs mt-0.5 leading-snug ${
          task.completed ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {task.description}
        </p>
      </div>

      {/* XP badge */}
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
          task.completed ? 'bg-quest-xp/10 text-quest-xp/40' : 'bg-quest-xp/10 text-quest-xp'
        }`}
      >
        <Zap size={10} />
        {task.xp}
      </div>
    </div>
  );
}
