import { useState } from 'react';
import { mockUserProgress } from '../data/userProgress';
import { mockQuestions } from '../data/mockQuestions';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'badges'>('overview');
  const user = mockUserProgress;

  // Format date to human-readable string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate time since a date in a human-readable format
  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };

  // Get question title by ID
  const getQuestionTitle = (id: string) => {
    const question = mockQuestions.find(q => q.id === id);
    return question ? question.title : 'Unknown Question';
  };

  // Get question difficulty by ID
  const getQuestionDifficulty = (id: string) => {
    const question = mockQuestions.find(q => q.id === id);
    return question ? question.difficulty : 'Unknown';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User overview header */}
        <div className="bg-white dark:bg-gray-800/90 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-24 w-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user.displayName.substring(0, 1)}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.displayName}</h1>
              <p className="text-gray-500 dark:text-gray-400">Rank #{user.rank} · Level {user.level} · {user.xp} XP</p>
              
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 px-3 py-1 rounded-full text-sm text-emerald-600 dark:text-emerald-400">
                  <span className="font-medium">{user.totalSolved}</span> Problems Solved
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 px-3 py-1 rounded-full text-sm text-blue-600 dark:text-blue-400">
                  <span className="font-medium">{user.streak.currentStreak}</span> Day Streak
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 px-3 py-1 rounded-full text-sm text-purple-600 dark:text-purple-400">
                  <span className="font-medium">{user.badges.length}</span> Badges
                </div>
              </div>
            </div>
            
            <div className="mt-2 md:mt-0">
              <Link 
                to="/problems" 
                className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-medium"
              >
                Solve Problems
              </Link>
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === 'overview' 
                ? 'text-emerald-600 border-b-2 border-emerald-500' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === 'submissions' 
                ? 'text-emerald-600 border-b-2 border-emerald-500' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('submissions')}
          >
            Submissions
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === 'badges' 
                ? 'text-emerald-600 border-b-2 border-emerald-500' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('badges')}
          >
            Badges
          </button>
        </div>
        
        {/* Overview tab content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Progress card */}
              <div className="bg-white dark:bg-gray-800/90 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Solving Progress</h2>
                
                {/* Progress bar showing all problems */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Total Progress</span>
                    <span>{user.totalSolved} / {mockQuestions.length} problems</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-emerald-500 h-2.5 rounded-full" 
                      style={{ width: `${(user.totalSolved / mockQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Progress by difficulty */}
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">By Difficulty</h3>
                <div className="space-y-3">
                  {user.difficultyProgress.map((diff) => (
                    <div key={diff.difficulty}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={
                          diff.difficulty === 'Beginner' 
                            ? 'text-blue-600 dark:text-blue-400'
                            : diff.difficulty === 'Easy' 
                            ? 'text-green-600 dark:text-green-400' 
                            : diff.difficulty === 'Medium' 
                            ? 'text-yellow-600 dark:text-yellow-400' 
                            : diff.difficulty === 'Hard'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-purple-600 dark:text-purple-400'
                        }>
                          {diff.difficulty}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">{diff.solved} / {diff.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            diff.difficulty === 'Beginner' 
                              ? 'bg-blue-500'
                              : diff.difficulty === 'Easy' 
                              ? 'bg-green-500' 
                              : diff.difficulty === 'Medium' 
                              ? 'bg-yellow-500' 
                              : diff.difficulty === 'Hard'
                              ? 'bg-red-500'
                              : 'bg-purple-500'
                          }`}
                          style={{ width: `${diff.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Topic distribution card */}
              <div className="bg-white dark:bg-gray-800/90 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Topic Distribution</h2>
                
                <div className="space-y-3">
                  {user.categoryProgress.map((category) => (
                    <div key={category.category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{category.category}</span>
                        <span className="text-gray-600 dark:text-gray-400">{category.solved} / {category.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-indigo-500 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                  Focus on Array and Hash Table problems next!
                </div>
              </div>
              
              {/* Streak calendar card */}
              <div className="bg-white dark:bg-gray-800/90 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Streak</h2>
                
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-500">{user.streak.currentStreak}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Current Streak</div>
                  </div>
                  <div className="h-10 border-l border-gray-200 dark:border-gray-700"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-500">{user.streak.longestStreak}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Longest Streak</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Last active: {formatDate(user.streak.lastActive)}</div>
                
                {/* Simple calendar visualization - in a real app, this would be more elaborate */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (9 - i));
                    const dateStr = date.toISOString().split('T')[0];
                    const hasActivity = user.streak.calendar[dateStr] > 0;
                    
                    return (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded-md flex items-center justify-center text-xs 
                          ${hasActivity 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        title={hasActivity 
                          ? `${user.streak.calendar[dateStr]} problems on ${dateStr}` 
                          : `No activity on ${dateStr}`
                        }
                      >
                        {date.getDate()}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Solve at least one problem today to maintain your streak!
                </div>
              </div>
            </div>
            
            {/* Recent activity */}
            <div className="bg-white dark:bg-gray-800/90 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                {user.submissions.map((submission) => (
                  <div key={submission.id} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                      ${submission.status === 'Accepted' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                      {submission.status === 'Accepted' ? '✓' : '✗'}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Link 
                          to={`/problems/${submission.questionId}`}
                          className="text-md font-medium text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 truncate"
                        >
                          {getQuestionTitle(submission.questionId)}
                        </Link>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {timeSince(submission.timestamp)}
                        </span>
                      </div>
                      
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getQuestionDifficulty(submission.questionId) === 'Beginner' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : getQuestionDifficulty(submission.questionId) === 'Easy' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : getQuestionDifficulty(submission.questionId) === 'Medium' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {getQuestionDifficulty(submission.questionId)}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {submission.language}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {submission.runtime} ms
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {submission.memory} KB
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {user.submissions.length === 0 && (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No activity yet. Start solving problems!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Submissions tab content */}
        {activeTab === 'submissions' && (
          <div className="bg-white dark:bg-gray-800/90 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/80">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Problem
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Language
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Runtime
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Memory
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {user.submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/80">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        submission.status === 'Accepted' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        to={`/problems/${submission.questionId}`}
                        className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
                      >
                        {getQuestionTitle(submission.questionId)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {submission.language}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {submission.runtime} ms
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {submission.memory} KB
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(submission.timestamp)}
                    </td>
                  </tr>
                ))}
                
                {user.submissions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                      No submissions yet. Start solving problems!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Badges tab content */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.badges.map((badge) => (
              <div key={badge.id} className="bg-white dark:bg-gray-800/90 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center space-x-4">
                <div className="flex-shrink-0 h-16 w-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-3xl">
                  {badge.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{badge.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Earned {formatDate(badge.earnedAt)}</p>
                </div>
              </div>
            ))}
            
            {/* Locked badges (placeholders) */}
            {[
              { id: "all-easy", name: "Easy Master", description: "Solve all Easy problems", icon: "🥇" },
              { id: "week-streak", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥" },
              { id: "ten-problems", name: "Getting Started", description: "Solve 10 problems in total", icon: "🚀" }
            ].map((badge) => (
              <div key={badge.id} className="bg-gray-100 dark:bg-gray-800/40 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center space-x-4 opacity-70">
                <div className="flex-shrink-0 h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl">
                  {badge.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{badge.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Locked</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
} 