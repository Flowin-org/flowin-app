import { Habit, HabitEntry } from '@/types/habit';

const HABITS_KEY = 'flowin-habits';
const ENTRIES_KEY = 'flowin-entries';

// Habit management
export const getHabits = (): Habit[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const habits = localStorage.getItem(HABITS_KEY);
    return habits ? JSON.parse(habits) : [];
  } catch (error) {
    console.error('Error reading habits from localStorage:', error);
    return [];
  }
};

export const saveHabits = (habits: Habit[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habits to localStorage:', error);
  }
};

export const addHabit = (habit: Habit): void => {
  const habits = getHabits();
  habits.push(habit);
  saveHabits(habits);
};

export const updateHabit = (habitId: string, updates: Partial<Habit>): void => {
  const habits = getHabits();
  const index = habits.findIndex(h => h.id === habitId);
  if (index !== -1) {
    habits[index] = { ...habits[index], ...updates };
    saveHabits(habits);
  }
};

export const deleteHabit = (habitId: string): void => {
  const habits = getHabits();
  const filteredHabits = habits.filter(h => h.id !== habitId);
  saveHabits(filteredHabits);
  
  // Also delete related entries
  const entries = getHabitEntries();
  const filteredEntries = entries.filter(e => e.habitId !== habitId);
  saveHabitEntries(filteredEntries);
};

// Habit entry management
export const getHabitEntries = (): HabitEntry[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const entries = localStorage.getItem(ENTRIES_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error reading habit entries from localStorage:', error);
    return [];
  }
};

export const saveHabitEntries = (entries: HabitEntry[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving habit entries to localStorage:', error);
  }
};

export const getEntriesForDate = (date: string): HabitEntry[] => {
  const entries = getHabitEntries();
  return entries.filter(entry => entry.date === date);
};

export const toggleHabitEntry = (habitId: string, date: string): void => {
  const entries = getHabitEntries();
  const existingEntry = entries.find(entry => entry.habitId === habitId && entry.date === date);
  
  if (existingEntry) {
    existingEntry.completed = !existingEntry.completed;
    existingEntry.completedAt = existingEntry.completed ? new Date().toISOString() : undefined;
  } else {
    const newEntry: HabitEntry = {
      id: generateId(),
      habitId,
      date,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    entries.push(newEntry);
  }
  
  saveHabitEntries(entries);
};

// Utility functions
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getTodayString = (): string => {
  return formatDate(new Date());
};