import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface TagListProps {
  tags: string[];
  size?: 'sm' | 'md' | 'lg';
  linkable?: boolean;
  className?: string;
}

export default function TagList({ 
  tags, 
  size = 'md', 
  linkable = true,
  className = '' 
}: TagListProps) {
  // Size classes for different tag sizes
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5',
    lg: 'text-base py-1.5 px-3'
  };
  
  // Get a consistent color for a tag based on its name
  const getTagColor = (tag: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    ];
    
    // Simple hash function to consistently get the same color for a tag
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = ((hash << 5) - hash) + tag.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    
    // Ensure positive index
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <motion.div
          key={tag}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`rounded-full ${sizeClasses[size]} font-medium ${getTagColor(tag)} transition-colors`}
        >
          {linkable ? (
            <Link to={`/search?tag=${encodeURIComponent(tag)}`} className="block">
              #{tag}
            </Link>
          ) : (
            <span>#{tag}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
} 