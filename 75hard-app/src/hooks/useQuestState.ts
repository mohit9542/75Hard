import { useState, useEffect, useCallback, useRef } from 'react';
import type { UserStats, DailyRecord } from '../types';
import {
  loadUserStats,
  saveUserStats,
  loadDailyRecords,
  saveDailyRecords,
  getTodayKey,
  createDailyRecord,
  addXPToStats,
  checkAndUpdateStreak,
  checkAchievements,
  calculateDayProgress,
} from '../utils/storage';

interface XPGain {
  amount: number;
  key: number;
}

export function useQuestState() {
  const [userStats, setUserStats] = useState<UserStats>(() => loadUserStats());
  const [dailyRecords, setDailyRecords] = useState<Record<string, DailyRecord>>(() => loadDailyRecords());
  const [today, setToday] = useState<DailyRecord | null>(null);
  const [xpGain, setXpGain] = useState<XPGain | null>(null);
  const [showDayComplete, setShowDayComplete] = useState(false);
  const prevAllDoneRef = useRef(false);
  const xpKeyRef = useRef(0);

  const todayKey = getTodayKey();

  // Initialize today's record
  useEffect(() => {
    let todayRecord = dailyRecords[todayKey];
    if (!todayRecord) {
      todayRecord = createDailyRecord(todayKey);
      const newRecords = { ...dailyRecords, [todayKey]: todayRecord };
      setDailyRecords(newRecords);
      saveDailyRecords(newRecords);
    }
    setToday(todayRecord);
  }, [todayKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const flashXP = useCallback((amount: number) => {
    xpKeyRef.current += 1;
    setXpGain({ amount, key: xpKeyRef.current });
    setTimeout(() => setXpGain(null), 900);
  }, []);

  const updateStatsWithXP = useCallback((xp: number, updatedRecord: DailyRecord) => {
    setUserStats(prev => {
      const withXP = addXPToStats(prev, xp);
      const withStreak = checkAndUpdateStreak(withXP, todayKey);

      // Update day progress only if just completed all main quests for first time
      const allMainDone = updatedRecord.allMainQuestsCompleted;
      const wasDone = prevAllDoneRef.current;
      let withProgress = withStreak;

      if (allMainDone && !wasDone) {
        withProgress = {
          ...withStreak,
          totalDaysCompleted: withStreak.totalDaysCompleted + 1,
          day75Progress: Math.min(75, withStreak.day75Progress + 1),
        };
        prevAllDoneRef.current = true;
      }

      if (updatedRecord.perfectDay && !prev.unlockedAchievements.includes('__perfect_counted')) {
        withProgress = {
          ...withProgress,
          totalPerfectDays: withProgress.totalPerfectDays + 1,
        };
      }

      const checked = checkAchievements(withProgress);
      saveUserStats(checked);
      return checked;
    });
  }, [todayKey]);

  const toggleTask = useCallback((taskId: string) => {
    if (!today) return;

    const taskIndex = today.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = today.tasks[taskIndex];
    const wasCompleted = task.completed;
    const xpDelta = wasCompleted ? -task.xp : task.xp;

    const updatedTasks = today.tasks.map(t =>
      t.id === taskId
        ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : undefined }
        : t
    );

    const allMainDone = updatedTasks.every(t => t.completed);
    const perfectDay = allMainDone && today.sideQuest.completed;
    const newXpEarned = Math.max(0, today.totalXpEarned + xpDelta);

    const updatedRecord: DailyRecord = {
      ...today,
      tasks: updatedTasks,
      totalXpEarned: newXpEarned,
      allMainQuestsCompleted: allMainDone,
      perfectDay,
    };

    setToday(updatedRecord);
    const newRecords = { ...dailyRecords, [todayKey]: updatedRecord };
    setDailyRecords(newRecords);
    saveDailyRecords(newRecords);

    if (!wasCompleted) {
      flashXP(task.xp);
      updateStatsWithXP(task.xp, updatedRecord);

      // Show day complete modal when all main quests done for first time
      if (allMainDone && !prevAllDoneRef.current) {
        setTimeout(() => setShowDayComplete(true), 400);
      }
    } else {
      setUserStats(prev => {
        const updated = addXPToStats(prev, -task.xp < 0 ? 0 : 0); // No negative XP
        saveUserStats(updated);
        return updated;
      });
    }
  }, [today, dailyRecords, todayKey, flashXP, updateStatsWithXP]);

  const toggleSideQuest = useCallback(() => {
    if (!today) return;

    const wasDone = today.sideQuest.completed;
    const xpDelta = wasDone ? 0 : today.sideQuest.xp;

    const updatedSideQuest = {
      ...today.sideQuest,
      completed: !wasDone,
      completedAt: !wasDone ? new Date().toISOString() : undefined,
    };

    const allMainDone = today.tasks.every(t => t.completed);
    const perfectDay = allMainDone && !wasDone;
    const newXpEarned = today.totalXpEarned + (wasDone ? 0 : xpDelta);

    const updatedRecord: DailyRecord = {
      ...today,
      sideQuest: updatedSideQuest,
      totalXpEarned: newXpEarned,
      perfectDay,
    };

    setToday(updatedRecord);
    const newRecords = { ...dailyRecords, [todayKey]: updatedRecord };
    setDailyRecords(newRecords);
    saveDailyRecords(newRecords);

    if (!wasDone) {
      flashXP(today.sideQuest.xp);
      updateStatsWithXP(today.sideQuest.xp, updatedRecord);

      if (perfectDay) {
        setTimeout(() => setShowDayComplete(true), 400);
      }
    }
  }, [today, dailyRecords, todayKey, flashXP, updateStatsWithXP]);

  const todayProgress = today ? calculateDayProgress(today) : { completed: 0, total: 0, percent: 0 };

  const groupedTasks: Record<string, DailyRecord['tasks']> = today
    ? today.tasks.reduce((acc: Record<string, DailyRecord['tasks']>, t) => {
        if (!acc[t.category]) acc[t.category] = [];
        acc[t.category].push(t);
        return acc;
      }, {})
    : {};

  return {
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
  };
}
