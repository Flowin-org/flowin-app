'use client';

import { useState } from 'react';
import { Habit } from '@/types/habit';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
}

const HABIT_PRESETS = [
  { name: 'Drink Water', icon: '💧', color: 'blue', description: 'Stay hydrated throughout the day' },
  { name: 'Exercise', icon: '🏃', color: 'green', description: 'Physical activity or workout' },
  { name: 'Meditate', icon: '🧘', color: 'purple', description: 'Mindfulness and mental well-being' },
  { name: 'Read', icon: '📚', color: 'yellow', description: 'Reading books or educational content' },
  { name: 'Sleep Early', icon: '😴', color: 'indigo', description: 'Get adequate rest' },
  { name: 'Healthy Eating', icon: '🥗', color: 'green', description: 'Nutritious meals and snacks' },
  { name: 'Walk', icon: '🚶', color: 'orange', description: 'Daily walk or movement' },
  { name: 'Journal', icon: '📝', color: 'red', description: 'Write thoughts and reflections' },
];

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('✅');
  const [color, setColor] = useState('blue');
  const [description, setDescription] = useState('');
  const [showPresets, setShowPresets] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      icon,
      color,
      description: description.trim() || undefined,
    });

    // Reset form
    setName('');
    setIcon('✅');
    setColor('blue');
    setDescription('');
    setShowPresets(true);
    onClose();
  };

  const selectPreset = (preset: typeof HABIT_PRESETS[0]) => {
    setName(preset.name);
    setIcon(preset.icon);
    setColor(preset.color);
    setDescription(preset.description);
    setShowPresets(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Habit</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showPresets && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Popular Habits</h3>
            <div className="grid grid-cols-2 gap-2">
              {HABIT_PRESETS.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => selectPreset(preset)}
                  className="p-3 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{preset.icon}</span>
                    <span className="text-sm font-medium">{preset.name}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowPresets(false)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Create custom habit
              </button>
            </div>
          </div>
        )}

        {!showPresets && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Habit Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Drink 8 glasses of water"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Icon (Emoji)
              </label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="💧"
                maxLength={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Color Theme
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="indigo">Indigo</option>
                <option value="orange">Orange</option>
                <option value="pink">Pink</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Brief description of your habit"
                rows={2}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowPresets(true)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Back to Presets
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={!name.trim()}
              >
                Add Habit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};