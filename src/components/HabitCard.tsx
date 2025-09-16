'use client';

import { Habit } from '@/types/habit';

interface HabitCardProps {
  habit: Habit;
  completed: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`
      p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
      ${completed 
        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1" onClick={onToggle}>
          <div className={`
            text-2xl p-2 rounded-full
            ${completed ? 'bg-green-100 dark:bg-green-800' : `bg-${habit.color}-100 dark:bg-${habit.color}-800`}
          `}>
            {habit.icon}
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold ${completed ? 'line-through text-gray-500' : ''}`}>
              {habit.name}
            </h3>
            {habit.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {habit.description}
              </p>
            )}
          </div>
          <div className="flex items-center">
            {completed ? (
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
            )}
          </div>
        </div>
        
        {(onEdit || onDelete) && (
          <div className="flex items-center space-x-2 ml-4">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Are you sure you want to delete "${habit.name}"?`)) {
                    onDelete();
                  }
                }}
                className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};