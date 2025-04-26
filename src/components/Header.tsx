import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { currentUser } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-black/80 z-40 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-end sm:px-6 lg:px-8">
        {currentUser ? (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Welcome, {currentUser.displayName || currentUser.email?.split('@')[0] || 'Developer'}
          </div>
        ) : (
          <div className="space-x-2">
            <Link 
              to="/signup" 
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
} 