import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Award, BookOpen, Code, Edit, Check, X, Loader } from 'lucide-react';
import { UserProfile } from '../context/AuthContext';

export default function Profile() {
  const { currentUser, userProfile, profileLoading, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  
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
                  icon={<BookOpen className="h-5 w-5 text-emerald-500" />}
                  label="Articles Read"
                  value={userProfile?.stats.articlesRead || 0}
                />
                <StatCard 
                  icon={<Code className="h-5 w-5 text-emerald-500" />}
                  label="Projects Completed"
                  value={userProfile?.stats.projectsCompleted || 0}
                />
                <StatCard 
                  icon={<Award className="h-5 w-5 text-emerald-500" />}
                  label="Contributions"
                  value={userProfile?.stats.contributions || 0}
                />
                <StatCard 
                  icon={<Award className="h-5 w-5 text-emerald-500" />}
                  label="Points Earned"
                  value={userProfile?.stats.points || 0}
                />
              </div>
            </div>
            
            {/* Activity Section */}
            <div className="mt-12">
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
        </div>
      </div>
    </div>
  );
}

function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch (e) {
    return 'Unknown date';
  }
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center"
    >
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </motion.div>
  );
}

function ActivityItem({ title, timestamp, type }: { title: string; timestamp: string; type: 'course' | 'project' }) {
  return (
    <div className="flex items-start">
      <div className={`p-2 rounded-full ${type === 'course' ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-500' : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-500'} mr-3`}>
        {type === 'course' ? <BookOpen size={16} /> : <Code size={16} />}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
      </div>
    </div>
  );
} 