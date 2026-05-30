import { useState } from 'react';
import type { DailyRecord } from '../types';
import { format, parseISO } from 'date-fns';
import { Calendar, ChevronDown, ChevronUp, Star, Check } from 'lucide-react';

interface Props {
  records: Record<string, DailyRecord>;
  todayKey: string;
}

export const HistoryPanel: React.FC<Props> = ({ records, todayKey }) => {
  const [expanded, setExpanded] = useState(false);

  const sortedDates = Object.keys(records)
    .filter(d => d !== todayKey)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 14);

  if (sortedDates.length === 0) return null;

  return (
    <div className="quest-panel">
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-blue-400" />
          <span className="font-bold text-gray-200 tracking-wide">Quest History</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-400 font-semibold">
            {sortedDates.length} days
          </span>
        </div>
        {expanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {sortedDates.map(dateStr => {
            const rec = records[dateStr];
            const completedTasks = rec.tasks.filter(t => t.completed).length;
            const total = rec.tasks.length + 1;
            const done = completedTasks + (rec.sideQuest.completed ? 1 : 0);
            const pct = Math.round((done / total) * 100);

            return (
              <div
                key={dateStr}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  rec.perfectDay
                    ? 'bg-yellow-950/20 border-yellow-700/30'
                    : rec.allMainQuestsCompleted
                    ? 'bg-green-950/20 border-green-700/30'
                    : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <div className="text-sm font-semibold text-gray-300 w-24 flex-shrink-0">
                  {format(parseISO(dateStr), 'MMM d, yyyy')}
                </div>

                {/* Progress */}
                <div className="flex-1 min-w-0">
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: rec.perfectDay
                          ? 'linear-gradient(90deg, #FFD700, #FFA500)'
                          : rec.allMainQuestsCompleted
                          ? 'linear-gradient(90deg, #00FF88, #00CC66)'
                          : 'linear-gradient(90deg, #6644FF, #4422CC)',
                      }}
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-400 w-12 text-right flex-shrink-0">{pct}%</div>

                <div className="flex-shrink-0">
                  {rec.perfectDay ? (
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                  ) : rec.allMainQuestsCompleted ? (
                    <Check size={14} className="text-quest-xp" strokeWidth={3} />
                  ) : (
                    <span className="text-xs text-gray-600">{done}/{total}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
