import { useState } from 'react';
import type { QuestTask } from '../types';
import { Check, Zap } from 'lucide-react';

interface Props {
  task: QuestTask;
  onToggle: (taskId: string) => void;
}

export const QuestTaskItem: React.FC<Props> = ({ task, onToggle }) => {
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
      className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer group transition-all duration-200 select-none
        ${task.completed
          ? 'bg-white/5 opacity-75'
          : 'bg-white/[0.03] hover:bg-white/[0.07] active:scale-[0.99]'
        }`}
      onClick={handleToggle}
    >
      {/* XP float */}
      {showXP && (
        <div
          className="absolute right-2 -top-2 text-xs font-bold text-quest-xp pointer-events-none z-10 animate-xp-gain"
          style={{ textShadow: '0 0 8px rgba(0,255,136,0.8)' }}
        >
          +{task.xp} XP
        </div>
      )}

      {/* Checkbox */}
      <div
        className={`quest-checkbox ${task.completed ? 'checked' : ''}`}
      >
        {task.completed && (
          <Check size={14} className="text-quest-darker font-bold" strokeWidth={3} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold leading-tight transition-colors ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-100'
          }`}
        >
          {task.title}
        </p>
        <p className={`text-xs mt-0.5 leading-tight transition-colors ${
          task.completed ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {task.description}
        </p>
      </div>

      {/* XP Badge */}
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 transition-all
          ${task.completed
            ? 'bg-quest-xp/10 text-quest-xp/50'
            : 'bg-quest-xp/10 text-quest-xp group-hover:bg-quest-xp/20'
          }`}
      >
        <Zap size={10} />
        {task.xp}
      </div>
    </div>
  );
};
