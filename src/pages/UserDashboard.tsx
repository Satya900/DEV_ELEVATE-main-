import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockQuestions } from '../data/mockQuestions';
import { Link } from 'react-router-dom';
import { 
  BarChart2, Calendar, Award, Code, CheckCircle, XCircle, 
  Clock, Star, ChevronsUp, Filter, Search, BookOpen, 
  Zap, Target, Trophy, Medal, Activity, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'badges'>('overview');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { userProgress } = useAuth();

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

  // Filter submissions based on difficulty and search query
  const filteredSubmissions = useMemo(() => {
    if (!userProgress?.submissions) return [];
    
    return userProgress.submissions.filter(submission => {
      const questionTitle = submission.questionTitle || getQuestionTitle(submission.questionId);
      const difficulty = getQuestionDifficulty(submission.questionId);
      
      const matchesDifficulty = difficultyFilter === 'all' || difficulty === difficultyFilter;
      const matchesSearch = questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           submission.language.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesDifficulty && matchesSearch;
    });
  }, [userProgress, difficultyFilter, searchQuery]);

  // Calculate stats
  const stats = useMemo(() => {
    if (!userProgress) return {
      totalSolved: 0,
      totalSubmissions: 0,
      acceptanceRate: 0,
      streak: 0,
      xp: 0,
      level: 1
    };
    
    const totalSubmissions = userProgress.submissions?.length || 0;
    const acceptedSubmissions = userProgress.submissions?.filter(s => s.status === 'Accepted').length || 0;
    
    return {
      totalSolved: userProgress.totalSolved || 0,
      totalSubmissions,
      acceptanceRate: totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0,
      streak: userProgress.streak?.currentStreak || 0,
      xp: userProgress.xp || 0,
      level: userProgress.level || 1
    };
  }, [userProgress]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User overview header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-24 w-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {userProgress?.displayName?.substring(0, 1) || 'D'}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userProgress?.displayName || 'Developer'}</h1>
              <p className="text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center mr-3">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                  Rank #{userProgress?.rank || 0}
                </span>
                <span className="inline-flex items-center mr-3">
                  <Star className="h-4 w-4 mr-1 text-emerald-500" />
                  Level {userProgress?.level || 1}
                </span>
                <span className="inline-flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-blue-500" />
                  {userProgress?.xp || 0} XP
                </span>
              </p>
              
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 px-3 py-1 rounded-full text-sm text-emerald-600 dark:text-emerald-400 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="font-medium">{userProgress?.totalSolved || 0}</span> Problems Solved
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 px-3 py-1 rounded-full text-sm text-blue-600 dark:text-blue-400 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="font-medium">{userProgress?.streak?.currentStreak || 0}</span> Day Streak
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 px-3 py-1 rounded-full text-sm text-purple-600 dark:text-purple-400 flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="font-medium">{userProgress?.badges?.length || 0}</span> Badges
                </div>
              </div>
            </div>
            
            <div className="mt-2 md:mt-0">
              <Link 
                to="/problems" 
                className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium shadow-sm"
              >
                <Code className="h-4 w-4 mr-2" />
                Solve Problems
              </Link>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Level {stats.level}</span>
              <span>Level {stats.level + 1}</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(stats.xp % 100) / 100 * 100}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
              {100 - (stats.xp % 100)} XP until next level
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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-emerald-500" />
                  Solving Progress
                </h2>
                
                {/* Progress bar showing all problems */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Total Progress</span>
                    <span>{userProgress?.totalSolved || 0} / {mockQuestions.length} problems</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${((userProgress?.totalSolved || 0) / mockQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Progress by difficulty */}
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">By Difficulty</h3>
                <div className="space-y-3">
                  {userProgress?.difficultyProgress.map((diff) => (
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
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
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
                
                <div className="mt-4 text-center">
                  <Link
                    to="/problems"
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-800/50"
                  >
                    View All Problems
                  </Link>
                </div>
              </div>
              
              {/* Topic distribution card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-emerald-500" />
                  Topic Distribution
                </h2>
                
                <div className="space-y-3">
                  {userProgress?.categoryProgress.map((category) => (
                    <div key={category.category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{category.category}</span>
                        <span className="text-gray-600 dark:text-gray-400">{category.solved} / {category.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Link
                    to="/topics"
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/50"
                  >
                    Explore Topics
                  </Link>
                </div>
              </div>
              
              {/* Streak calendar card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-emerald-500" />
                  Activity Streak
                </h2>
                
                <div className="flex items-center justify-center space-x-8 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-500">{userProgress?.streak?.currentStreak || 0}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Current Streak</div>
                  </div>
                  <div className="h-14 border-l border-gray-200 dark:border-gray-700"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-500">{userProgress?.streak?.longestStreak || 0}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Longest Streak</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Last active: {userProgress?.streak?.lastActive ? formatDate(userProgress.streak.lastActive) : 'Never'}</div>
                
                {/* Calendar visualization */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (13 - i));
                    const dateStr = date.toISOString().split('T')[0];
                    const hasActivity = userProgress?.streak?.calendar?.[dateStr] > 0;
                    
                    return (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded-md flex items-center justify-center text-xs 
                          ${hasActivity 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        title={hasActivity 
                          ? `${userProgress?.streak?.calendar?.[dateStr]} problems on ${dateStr}` 
                          : `No activity on ${dateStr}`
                        }
                      >
                        {date.getDate()}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                  Solve at least one problem today to maintain your streak!
                </div>
              </div>
            </div>
            
            {/* Recent activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-emerald-500" />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {userProgress?.submissions?.slice(0, 5).map((submission, index) => (
                  <div key={submission.id || index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                      ${submission.status === 'Accepted' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                      {submission.status === 'Accepted' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Link 
                          to={`/solve/${submission.questionId}`}
                          className="text-md font-medium text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 truncate"
                        >
                          {submission.questionTitle || getQuestionTitle(submission.questionId)}
                        </Link>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {timeSince(new Date(submission.timestamp))}
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
                        {submission.runtime && (
                          <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {submission.runtime} ms
                          </span>
                        )}
                        {submission.memory && (
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {submission.memory} KB
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {(!userProgress?.submissions || userProgress.submissions.length === 0) && (
                  <div className="text-center py-10 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <Code className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      No activity yet. Start solving problems!
                    </p>
                    <Link
                      to="/problems"
                      className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600"
                    >
                      Explore Problems
                    </Link>
                  </div>
                )}
                
                {userProgress?.submissions && userProgress.submissions.length > 5 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setActiveTab('submissions')}
                      className="inline-flex items-center text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                      View all submissions
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Performance metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-emerald-500" />
                  Accuracy
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                        className="dark:stroke-gray-700"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        strokeDasharray={`${stats.acceptanceRate}, 100`}
                        className="dark:stroke-emerald-400"
                      />
                      <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#111827" className="dark:fill-white font-bold">
                        {stats.acceptanceRate}%
                      </text>
                    </svg>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Acceptance Rate
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Medal className="h-5 w-5 mr-2 text-emerald-500" />
                  Level Progress
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.level}
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${(stats.xp % 100) / 100 * 100}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {100 - (stats.xp % 100)} XP until Level {stats.level + 1}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <ChevronsUp className="h-5 w-5 mr-2 text-emerald-500" />
                  Ranking
                </h3>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                      #{userProgress?.rank || 0}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Global Rank
                    </p>
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                      Top {userProgress?.rank ? Math.min(100, Math.round((userProgress.rank / 10000) * 100)) : 100}% of all users
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Submissions tab content */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search submissions..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="w-full md:w-48">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                    >
                      <option value="all">All Difficulties</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submissions table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
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
                    {filteredSubmissions.map((submission, index) => (
                      <tr key={submission.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
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
                            to={`/solve/${submission.questionId}`}
                            className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
                          >
                            {submission.questionTitle || getQuestionTitle(submission.questionId)}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {submission.language}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {submission.runtime || submission.executionTime || '-'} ms
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {submission.memory || '-'} KB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(submission.timestamp)}
                        </td>
                      </tr>
                    ))}
                    
                    {filteredSubmissions.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                          {userProgress?.submissions && userProgress.submissions.length > 0 
                            ? 'No submissions match your filters. Try adjusting your search criteria.'
                            : 'No submissions yet. Start solving problems!'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Badges tab content */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Award className="h-5 w-5 mr-2 text-emerald-500" />
                Your Achievements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProgress?.badges && userProgress.badges.length > 0 ? (
                  userProgress.badges.map((badge) => (
                    <motion.div 
                      key={badge.id} 
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-3xl">
                          {badge.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{badge.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Earned {formatDate(badge.earnedAt)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Badges Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                      Complete challenges and solve problems to earn badges and achievements. 
                      They'll appear here once you've earned them.
                    </p>
                    <Link
                      to="/problems"
                      className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600"
                    >
                      Start Solving
                    </Link>
                  </div>
                )}
                
                {/* Locked badges (placeholders) */}
                {[
                  { id: "all-easy", name: "Easy Master", description: "Solve all Easy problems", icon: "🥇" },
                  { id: "week-streak", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥" },
                  { id: "ten-problems", name: "Getting Started", description: "Solve 10 problems in total", icon: "🚀" },
                  { id: "language-master", name: "Polyglot", description: "Solve problems in 3 different languages", icon: "🌐" },
                  { id: "hard-problem", name: "Challenge Accepted", description: "Solve a Hard difficulty problem", icon: "💪" },
                  { id: "perfect-score", name: "Perfectionist", description: "Solve a problem with optimal time complexity", icon: "⚡" }
                ].slice(0, 6 - (userProgress?.badges?.length || 0)).map((badge) => (
                  <motion.div 
                    key={badge.id} 
                    whileHover={{ y: -2 }}
                    className="bg-gray-100 dark:bg-gray-800/40 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center space-x-4 opacity-70"
                  >
                    <div className="flex-shrink-0 h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl">
                      {badge.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{badge.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Locked</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Achievement Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievement Progress</h2>
              
              <div className="space-y-4">
                {/* Streak achievement */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">7-Day Streak</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {Math.min(userProgress?.streak?.currentStreak || 0, 7)} / 7 days
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${Math.min(((userProgress?.streak?.currentStreak || 0) / 7) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Problem count achievement */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Solve 10 Problems</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {Math.min(userProgress?.totalSolved || 0, 10)} / 10 problems
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${Math.min(((userProgress?.totalSolved || 0) / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Language diversity achievement */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Use 3 Different Languages</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {Math.min(
                        new Set(userProgress?.submissions?.map(s => s.language) || []).size, 
                        3
                      )} / 3 languages
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ 
                        width: `${Math.min(
                          (new Set(userProgress?.submissions?.map(s => s.language) || []).size / 3) * 100, 
                          100
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}