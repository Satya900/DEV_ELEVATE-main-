import React from 'react';

export default function Courses() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Courses
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Elevate your coding skills with our structured learning paths
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course cards will be added here */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Data Structures Masterclass
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Learn essential data structures used in modern software development
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-indigo-600 dark:text-indigo-400">8 modules • 24 lessons</span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
              <span className="text-6xl">🧠</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Algorithms Deep Dive
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Master the algorithms that power modern software applications
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-600 dark:text-emerald-400">10 modules • 32 lessons</span>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-6xl">🏆</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Interview Preparation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Comprehensive guide to acing technical interviews
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-600 dark:text-orange-400">6 modules • 18 lessons</span>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 