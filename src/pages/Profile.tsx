import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Award, BookOpen, Code, Edit, Check, X, Loader, Terminal, Star, Clock, BarChart, Medal, ChevronsUp, Calendar, Database } from 'lucide-react';
import { UserProfile } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';
import { topics } from '../data/topics';
import { mockQuestions } from '../data/mockQuestions';

export default function Profile() {
  const { currentUser, userProfile, profileLoading, updateUserProfile, userProgress } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'coding'>('overview');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newBio, setNewBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbTestResult, setDbTestResult] = useState<string | null>(null);
  
  // Update local state when profile data is loaded
  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || currentUser?.displayName || '');
      setBio(userProfile.bio || '');
    }
  }, [userProfile, currentUser]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    
    try {
      await updateUserProfile({
        displayName,
        bio
      });
      setIsEditing(false);
    } catch (error) {
      setSaveError('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    if (userProfile) {
      setDisplayName(userProfile.displayName || currentUser?.displayName || '');
      setBio(userProfile.bio || '');
    }
    setIsEditing(false);
    setSaveError('');
  };

  const testAndFixFirebaseConnection = async () => {
    setDbTestResult("Testing Firebase connection...");
    
    try {
      if (!currentUser?.uid) {
        setDbTestResult("❌ No user logged in. Please sign in first.");
        return;
      }
      
      // Test 1: Basic connectivity - write and read a test document
      const testDocRef = doc(db, "testCollection", "testDocument");
      await setDoc(testDocRef, {
        timestamp: new Date(),
        test: true,
        message: "Firebase connection test"
      });
      
      const docSnap = await getDoc(testDocRef);
      if (!docSnap.exists()) {
        setDbTestResult("❌ Firebase write succeeded but read failed.");
        return;
      }
      
      // Test 2: Check if user progress document exists, create if not
      const userProgressRef = doc(db, "userProgress", currentUser.uid);
      const userProgressSnap = await getDoc(userProgressRef);
      
      if (!userProgressSnap.exists()) {
        // Create default user progress
        const defaultProgress = {
          solvedQuestions: {},
          totalSolved: 0,
          xp: 0,
          level: 1,
          streak: {
            currentStreak: 0,
            lastSolveDate: null,
            longestStreak: 0
          },
          difficultyProgress: {
            easy: 0,
            medium: 0,
            hard: 0
          },
          categoryProgress: {},
          badges: [],
          submissions: []
        };
        
        await setDoc(userProgressRef, defaultProgress);
        setDbTestResult("✅ Firebase connection successful! Created missing user progress document.");
      } else {
        // Force an update to user progress with a test submission
        await updateDoc(userProgressRef, {
          submissions: arrayUnion({
            questionId: "0",
            status: "success",
            language: "javascript",
            code: "console.log('Hello, World!');",
            timestamp: new Date(),
            message: "Test submission from Profile page"
          })
        });
        
        // Force an update to make sure "Hello World" is marked as solved
        const userData = userProgressSnap.data();
        const updatedSolvedQuestions = {
          ...userData.solvedQuestions,
          "0": true
        };
        
        await updateDoc(userProgressRef, {
          solvedQuestions: updatedSolvedQuestions,
          totalSolved: Object.keys(updatedSolvedQuestions).length
        });
        
        setDbTestResult("✅ Firebase connection successful! Updated user progress: marked 'Hello World' as solved and added test submission.");
      }
    } catch (error) {
      console.error("Firebase test error:", error);
      setDbTestResult(`❌ Firebase connection error: ${error}`);
    }
  };

  const renderDebugSection = () => {
    if (!dbTestResult) return null;
    
    return (
      <div className={`mt-4 p-4 rounded-lg text-sm ${
        dbTestResult.includes('✅') 
          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
          : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
      }`}>
        <h3 className="font-medium mb-1">Firebase Connectivity Test</h3>
        <p>{dbTestResult}</p>
      </div>
    );
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="h-12 w-12 text-emerald-500 animate-spin" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-32 sm:h-48 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            
            {/* Avatar */}
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
                  <User size={60} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="pt-20 px-4 sm:px-6 pb-8">
            <div className="text-center">
              {isEditing ? (
                <div className="mb-4 flex justify-center items-center">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="text-2xl font-bold text-center border-b-2 border-emerald-500 focus:outline-none bg-transparent dark:text-white"
                    placeholder="Your name"
                  />
                </div>
              ) : (
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex justify-center items-center">
                  {displayName || 'DevElevate User'}
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="ml-2 p-1 text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                </h1>
              )}
              
              <div className="mt-1 flex justify-center items-center text-gray-600 dark:text-gray-300">
                <Mail size={16} className="mr-1" />
                <span>{currentUser?.email}</span>
              </div>
              
              {isEditing ? (
                <div className="mt-4">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full max-w-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows={3}
                    placeholder="Tell us about yourself"
                  />
                  <div className="mt-2 flex justify-center gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className={`inline-flex items-center px-3 py-1 bg-emerald-500 text-white text-sm rounded-full ${isSaving ? 'opacity-75 cursor-not-allowed' : 'hover:bg-emerald-600'}`}
                    >
                      {isSaving ? (
                        <Loader size={16} className="mr-1 animate-spin" />
                      ) : (
                        <Check size={16} className="mr-1" />
                      )}
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <X size={16} className="mr-1" />
                      Cancel
                    </button>
                  </div>
                  
                  {saveError && (
                    <p className="mt-2 text-red-500 text-sm">{saveError}</p>
                  )}
                </div>
              ) : (
                <p className="mt-4 max-w-lg mx-auto text-sm text-gray-600 dark:text-gray-300">
                  {bio}
                </p>
              )}
              
              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard 
                  icon={<Terminal className="h-5 w-5 text-emerald-500" />}
                  label="Problems Solved"
                  value={userProgress?.totalSolved || 0}
                />
                <StatCard 
                  icon={<Star className="h-5 w-5 text-emerald-500" />}
                  label="XP Points"
                  value={userProgress?.xp || 0}
                />
                <StatCard 
                  icon={<ChevronsUp className="h-5 w-5 text-emerald-500" />}
                  label="Level"
                  value={userProgress?.level || 1}
                />
                <StatCard 
                  icon={<Calendar className="h-5 w-5 text-emerald-500" />}
                  label="Current Streak"
                  value={userProgress?.streak?.currentStreak || 0}
                />
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="mt-8 border-b border-gray-200 dark:border-gray-700">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'text-emerald-500 border-b-2 border-emerald-500'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('coding')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'coding'
                      ? 'text-emerald-500 border-b-2 border-emerald-500'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Coding Progress
                </button>
              </nav>
            </div>
            
            {activeTab === 'overview' && (
              <div className="mt-6">
                {/* Activity Section */}
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                  </h2>
                  {userProfile?.activities && userProfile.activities.length > 0 ? (
                    <div className="space-y-4">
                      {userProfile.activities.map((activity, index) => (
                        <ActivityItem 
                          key={index}
                          title={activity.title}
                          timestamp={formatTimestamp(activity.timestamp)}
                          type={activity.type}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No activity recorded yet. Start learning to see your activity here!
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'coding' && (
              <div className="mt-6">
                {/* Coding Progress */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Difficulty Progress */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                      <BarChart className="h-5 w-5 mr-2 text-emerald-500" />
                      Difficulty Progress
                    </h3>
                    
                    {userProgress?.difficultyProgress.map(diff => (
                      <div key={diff.difficulty} className="mb-3">
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
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
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
                  
                  {/* Badges Earned */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                      <Medal className="h-5 w-5 mr-2 text-emerald-500" />
                      Badges Earned
                    </h3>
                    
                    {userProgress?.badges && userProgress.badges.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {userProgress.badges.map(badge => (
                          <div 
                            key={badge.id} 
                            className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                          >
                            <div className="text-2xl mb-1">{badge.icon}</div>
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{badge.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                              {badge.description}
                            </p>
                            <span className="text-xs text-gray-400 mt-2">
                              {formatDate(badge.earnedAt)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No badges earned yet. Solve problems to earn badges!
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Recent Submissions */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <Code className="h-5 w-5 mr-2 text-emerald-500" />
                    Recent Submissions
                  </h3>
                  
                  {userProgress?.submissions && userProgress.submissions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Problem</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Language</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {userProgress.submissions.slice(0, 5).map(submission => (
                            <tr key={submission.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Link 
                                  to={`/problems/${submission.questionId}`}
                                  className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                                >
                                  {submission.questionTitle || getQuestionTitle(submission.questionId)}
                                </Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span 
                                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    submission.status === 'Accepted' 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                      : submission.status === 'Wrong Answer' 
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                  }`}
                                >
                                  {submission.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                {submission.language}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                {formatDate(submission.timestamp)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {userProgress.submissions.length > 5 && (
                        <div className="text-center mt-4">
                          <Link
                            to="/submissions"
                            className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            View all submissions
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No submissions yet. Start solving problems!
                    </p>
                  )}
                </div>
                
                {/* Streak Calendar */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-emerald-500" />
                    Coding Streak
                  </h3>
                  
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-emerald-500">
                        {userProgress?.streak?.currentStreak || 0}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Current Streak</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-3xl font-bold text-emerald-500">
                        {userProgress?.streak?.longestStreak || 0}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Longest Streak</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    Keep your streak going by solving at least one problem every day!
                  </p>
                </div>
                
                {/* Topic Progress */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-emerald-500" />
                    Topic Progress
                  </h3>
                  
                  {userProgress?.topicProgress && userProgress.topicProgress.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userProgress.topicProgress
                        .sort((a, b) => (b.points || 0) - (a.points || 0))
                        .slice(0, 6)
                        .map(topicProgress => {
                          const topic = topics.find(t => t.id === topicProgress.topicId);
                          if (!topic) return null;
                          
                          const percentage = topic.questions.length > 0 
                            ? Math.round((topicProgress.solvedQuestions.length / topic.questions.length) * 100) 
                            : 0;
                          
                          return (
                            <div key={topic.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <div 
                                    className="p-2 rounded-full mr-2"
                                    style={{ backgroundColor: `${topic.color}20`, color: topic.color }}
                                  >
                                    {topic.icon === 'Algorithm' ? <BarChart className="h-4 w-4" /> :
                                     topic.icon === 'DataStructure' ? <Database className="h-4 w-4" /> :
                                     topic.icon === 'Java' ? <Code className="h-4 w-4" /> :
                                     topic.icon === 'Python' ? <Terminal className="h-4 w-4" /> :
                                     <BookOpen className="h-4 w-4" />}
                                  </div>
                                  <span className="font-medium text-gray-900 dark:text-white">{topic.name}</span>
                                </div>
                                {topicProgress.badgeLevel !== 'none' && (
                                  <span className="text-lg">
                                    {topicProgress.badgeLevel === 'bronze' ? '🥉' : 
                                     topicProgress.badgeLevel === 'silver' ? '🥈' : 
                                     topicProgress.badgeLevel === 'gold' ? '🥇' : ''}
                                  </span>
                                )}
                              </div>
                              
                              <div className="mb-1 flex justify-between text-xs">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {topicProgress.solvedQuestions.length} of {topic.questions.length} solved
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  {topicProgress.points} pts
                                </span>
                              </div>
                              
                              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                                <div 
                                  className="h-1.5 rounded-full" 
                                  style={{ width: `${percentage}%`, backgroundColor: topic.color }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No topic progress yet. Start solving problems to track your progress by topic!
                    </p>
                  )}
                  
                  <div className="text-center mt-4">
                    <Link
                      to="/topics"
                      className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      View all topics
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Add this button after the user info section */}
            <div className="mt-4">
              <button
                onClick={testAndFixFirebaseConnection}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-800/50"
              >
                Test & Fix Firebase Connection
              </button>
            </div>
            
            {renderDebugSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <p className="mt-2 text-gray-500 dark:text-gray-400 text-xs text-center">{label}</p>
      <p className="mt-1 text-xl font-semibold text-center text-gray-900 dark:text-white">{value}</p>
    </motion.div>
  );
}

function ActivityItem({ title, timestamp, type }: { title: string; timestamp: string; type: 'course' | 'project' }) {
  return (
    <div className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
        type === 'course' 
          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300'
          : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
      }`}>
        {type === 'course' ? <BookOpen size={20} /> : <Code size={20} />}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</p>
      </div>
    </div>
  );
}

const getQuestionTitle = (questionId: string): string => {
  const question = mockQuestions.find(q => q.id === questionId);
  return question ? question.title : `Problem #${questionId}`;
}; 