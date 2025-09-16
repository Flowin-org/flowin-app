export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  createdAt: string;
}

export interface HabitEntry {
  id: string;
  habitId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  completed: boolean;
  completedAt?: string; // ISO timestamp
}

export interface DailyProgress {
  date: string;
  entries: HabitEntry[];
  completedCount: number;
  totalHabits: number;
}