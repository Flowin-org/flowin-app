'use client';

import { useState, useEffect } from 'react';
import { Habit, HabitEntry } from '@/types/habit';
import { 
  getHabits, 
  getHabitEntries, 
  addHabit, 
  updateHabit, 
  deleteHabit, 
  toggleHabitEntry,
  getEntriesForDate,
  getTodayString 
} from '@/utils/storage';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<HabitEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load habits and entries on component mount
  useEffect(() => {
    setHabits(getHabits());
    setEntries(getHabitEntries());
    setLoading(false);
  }, []);

  const createHabit = (habitData: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      createdAt: new Date().toISOString(),
    };
    
    addHabit(newHabit);
    setHabits(getHabits());
  };

  const editHabit = (habitId: string, updates: Partial<Habit>) => {
    updateHabit(habitId, updates);
    setHabits(getHabits());
  };

  const removeHabit = (habitId: string) => {
    deleteHabit(habitId);
    setHabits(getHabits());
    setEntries(getHabitEntries());
  };

  const toggleHabit = (habitId: string, date: string = getTodayString()) => {
    toggleHabitEntry(habitId, date);
    setEntries(getHabitEntries());
  };

  const getTodayProgress = () => {
    const today = getTodayString();
    const todayEntries = getEntriesForDate(today);
    const completedCount = todayEntries.filter(entry => entry.completed).length;
    
    return {
      date: today,
      entries: todayEntries,
      completedCount,
      totalHabits: habits.length,
    };
  };

  const getHabitStatus = (habitId: string, date: string = getTodayString()) => {
    const entry = entries.find(e => e.habitId === habitId && e.date === date);
    return entry?.completed || false;
  };

  return {
    habits,
    entries,
    loading,
    createHabit,
    editHabit,
    removeHabit,
    toggleHabit,
    getTodayProgress,
    getHabitStatus,
  };
};