'use client';

interface DailyProgressProps {
  completed: number;
  total: number;
  date: string;
}

export const DailyProgress: React.FC<DailyProgressProps> = ({ completed, total, date }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getMotivationalMessage = () => {
    if (total === 0) return "Add your first habit to get started! 🚀";
    if (percentage === 100) return "Perfect day! You're crushing it! 🎉";
    if (percentage >= 75) return "Almost there! Keep going! 💪";
    if (percentage >= 50) return "Great progress! You're on track! 👍";
    if (percentage >= 25) return "Good start! Keep building momentum! 🌱";
    return "Every journey starts with a single step! 🌟";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Today&apos;s Progress
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate(date)}
          </p>
        </div>
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`transition-all duration-300 ease-in-out ${
                percentage >= 100 
                  ? 'text-green-500' 
                  : percentage >= 75 
                  ? 'text-blue-500' 
                  : percentage >= 50 
                  ? 'text-yellow-500' 
                  : 'text-gray-400'
              }`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Completed</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {completed} of {total}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              percentage >= 100 
                ? 'bg-green-500' 
                : percentage >= 75 
                ? 'bg-blue-500' 
                : percentage >= 50 
                ? 'bg-yellow-500' 
                : 'bg-gray-400'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-sm text-center font-medium text-gray-700 dark:text-gray-300 mt-4">
          {getMotivationalMessage()}
        </p>
      </div>
    </div>
  );
};