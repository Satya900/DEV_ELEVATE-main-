import React from 'react';
import { LearningPath } from '../types';
import LearningPathCard from './LearningPathCard';

interface LearningPathListProps {
  learningPaths: LearningPath[];
  className?: string;
}

export default function LearningPathList({ 
  learningPaths,
  className = ''
}: LearningPathListProps) {
  if (learningPaths.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No learning paths available</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Check back later for new learning content.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {learningPaths.map(path => (
        <LearningPathCard 
          key={path.id} 
          learningPath={path} 
        />
      ))}
    </div>
  );
} 