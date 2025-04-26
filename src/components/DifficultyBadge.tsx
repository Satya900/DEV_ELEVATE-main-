import React from 'react';
import { DifficultyLevel } from '../types';
import { BarChart2 } from 'lucide-react';

interface DifficultyBadgeProps {
  level: DifficultyLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function DifficultyBadge({ 
  level, 
  showLabel = true, 
  size = 'md',
  className = '' 
}: DifficultyBadgeProps) {
  // Colors for different difficulty levels
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    advanced: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    expert: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  };
  
  // Size classes for different badge sizes
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5',
    lg: 'text-base py-1.5 px-3'
  };
  
  // Icon size based on badge size
  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20
  };
  
  // Number of bars to display based on difficulty level
  const barCount = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4
  };
  
  return (
    <div 
      className={`inline-flex items-center rounded-full ${sizeClasses[size]} ${difficultyColors[level]} ${className}`}
    >
      <BarChart2 size={iconSize[size]} className="mr-1" />
      {showLabel && (
        <span className="capitalize">{level}</span>
      )}
    </div>
  );
} 