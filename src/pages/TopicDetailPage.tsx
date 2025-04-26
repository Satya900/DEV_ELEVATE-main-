import { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { topics, getTopicById, calculateTopicProgress } from '../data/topics';
import { mockQuestions } from '../data/mockQuestions';
import { TopicIcon } from '../components/icons';
import { ArrowLeft, Star, Clock, ChevronRight, Filter, Tag } from 'lucide-react';

export default function TopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { userProgress } = useAuth();
  const [difficulty, setDifficulty] = useState<string>('all');

  // Get topic data
  const topic = useMemo(() => {
    return getTopicById(topicId || '');
  }, [topicId]);

  // Get questions for this topic
  const questions = useMemo(() => {
    if (!topic) return [];
    return topic.questions.map(id => mockQuestions.find(q => q.id === id)).filter(Boolean);
  }, [topic]);

  // Get progress for this topic
  const progress = useMemo(() => {
    if (!topic || !userProgress) return null;

    // Convert solved questions to array if needed
    const solvedQuestions = Array.isArray(userProgress.solvedQuestions) 
      ? userProgress.solvedQuestions 
      : Object.keys(userProgress.solvedQuestions || {}).filter(id => userProgress.solvedQuestions[id]);

    return calculateTopicProgress(topic, solvedQuestions);
  }, [topic, userProgress]);

  // Get topic progress details from user progress
  const topicProgress = useMemo(() => {
    if (!topic || !userProgress?.topicProgress) return null;
    return userProgress.topicProgress.find(tp => tp.topicId === topic.id);
  }, [topic, userProgress]);

  // Filter questions by difficulty
  const filteredQuestions = useMemo(() => {
    if (difficulty === 'all') return questions;
    return questions.filter(q => q?.difficulty.toLowerCase() === difficulty.toLowerCase());
  }, [questions, difficulty]);

  // Calculate next badge threshold
  const nextBadge = useMemo(() => {
    if (!topic || !progress) return null;
    
    const currentPoints = progress.points;
    
    if (currentPoints < topic.badgeThresholds.bronze) {
      return {
        level: 'bronze',
        points: topic.badgeThresholds.bronze,
        remaining: topic.badgeThresholds.bronze - currentPoints
      };
    } else if (currentPoints < topic.badgeThresholds.silver) {
      return {
        level: 'silver',
        points: topic.badgeThresholds.silver,
        remaining: topic.badgeThresholds.silver - currentPoints
      };
    } else if (currentPoints < topic.badgeThresholds.gold) {
      return {
        level: 'gold',
        points: topic.badgeThresholds.gold,
        remaining: topic.badgeThresholds.gold - currentPoints
      };
    }
    
    return null;
  }, [topic, progress]);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Topic not found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">The topic you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/topics')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Go Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with back button */}
        <div className="mb-8">
          <Link 
            to="/topics"
            className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Topics
          </Link>
          
          <div className="mt-4 flex items-center">
            <div 
              className="p-3 rounded-md mr-4" 
              style={{ backgroundColor: `${topic.color}20`, color: topic.color }}
            >
              <TopicIcon name={topic.icon} size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{topic.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
            </div>
          </div>
        </div>
        
        {/* Progress Stats */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Badge Progress */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Current Badge</h3>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">
                    {progress?.badgeLevel === 'gold' ? '🥇' : 
                    progress?.badgeLevel === 'silver' ? '🥈' : 
                    progress?.badgeLevel === 'bronze' ? '🥉' : '⭐'}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {progress?.badgeLevel === 'none' ? 'No Badge Yet' : 
                      `${progress?.badgeLevel.charAt(0).toUpperCase()}${progress?.badgeLevel.slice(1)} Badge`}
                    </p>
                    {nextBadge && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {nextBadge.remaining} more points for {nextBadge.level} badge
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Points */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Points Earned</h3>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {progress?.points} / {topic.totalPoints} points
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, (progress?.points || 0) / topic.totalPoints * 100)}%`,
                          backgroundColor: topic.color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Problems Solved */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Problems Solved</h3>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-emerald-500 mr-2" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {topicProgress?.solvedQuestions?.length || 0} / {topic.questions.length} completed
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {progress?.percentage || 0}% complete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Problems List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Problems in this Topic</h2>
            
            {/* Difficulty Filter */}
            <div className="relative">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="appearance-none bg-transparent pr-8 pl-1 py-1 text-sm text-gray-700 dark:text-gray-200 border-none focus:outline-none focus:ring-0"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="expert">Expert</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 transform rotate-90" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Problem
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acceptance
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Solve</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredQuestions.map((question) => {
                  if (!question) return null;
                  
                  // Check if question is solved
                  const isSolved = topicProgress?.solvedQuestions?.includes(question.id) || false;
                  
                  return (
                    <tr key={question.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-4 w-4 rounded-full ${
                            isSolved 
                              ? 'bg-green-500' 
                              : 'bg-gray-200 dark:bg-gray-600'
                          }`}></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {question.id}. {question.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            question.difficulty === 'Beginner' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              : question.difficulty === 'Easy' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                              : question.difficulty === 'Medium' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                              : question.difficulty === 'Hard'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                          }`}
                        >
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {question.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            >
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                          {question.tags.length > 2 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{question.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {question.acceptanceRate}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/solve/${question.id}`}
                          className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                          Solve
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                
                {filteredQuestions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                      No problems match the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 