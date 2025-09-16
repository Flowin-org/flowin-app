'use client';

import { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { HabitCard } from '@/components/HabitCard';
import { AddHabitModal } from '@/components/AddHabitModal';
import { DailyProgress } from '@/components/DailyProgress';

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { 
    habits, 
    loading, 
    createHabit, 
    removeHabit, 
    toggleHabit, 
    getTodayProgress, 
    getHabitStatus 
  } = useHabits();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your habits...</p>
        </div>
      </div>
    );
  }

  const todayProgress = getTodayProgress();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Flowin
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track your daily habits and build consistency
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Habit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-1">
            <DailyProgress 
              completed={todayProgress.completedCount}
              total={todayProgress.totalHabits}
              date={todayProgress.date}
            />
          </div>

          {/* Habits Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Today&apos;s Habits
              </h2>
              
              {habits.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No habits yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start building better habits by adding your first one!
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Add Your First Habit
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {habits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      completed={getHabitStatus(habit.id)}
                      onToggle={() => toggleHabit(habit.id)}
                      onDelete={() => removeHabit(habit.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {habits.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {habits.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Total Habits
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {todayProgress.completedCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Completed Today
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round((todayProgress.completedCount / todayProgress.totalHabits) * 100) || 0}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Success Rate
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Habit Modal */}
      <AddHabitModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={createHabit}
      />
    </div>
  );
}
