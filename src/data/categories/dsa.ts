import { Category } from '../../types';
import { Square as AlgorithmSquare, Binary, BrainCircuit, GitGraph } from 'lucide-react';

export const dsaCategory: Category = {
  id: 'dsa',
  title: 'Data Structures & Algorithms',
  description: 'Master the fundamentals of DSA with comprehensive tutorials and practice problems',
  icon: 'AlgorithmSquare',
  subcategories: [
    {
      id: 'basics',
      title: 'DSA Basics',
      description: 'Fundamental concepts and principles',
      articles: [
        {
          id: 'intro-to-dsa',
          title: 'Introduction to DSA',
          description: 'Understanding the importance of DSA',
          slug: 'introduction-to-dsa',
          markdownFile: 'dsa/basics/intro-to-dsa.md',
          readingTime: '5 min',
          lastUpdated: '2024-03-15'
        },
        {
          id: 'time-complexity',
          title: 'Time & Space Complexity',
          description: 'Understanding Big O notation',
          slug: 'time-space-complexity',
          markdownFile: 'dsa/basics/complexity.md',
          readingTime: '8 min',
          lastUpdated: '2024-03-15'
        }
      ]
    },
    {
      id: 'arrays',
      title: 'Arrays & Strings',
      description: 'Linear data structures and algorithms',
      articles: [
        {
          id: 'array-basics',
          title: 'Introduction to Arrays',
          description: 'Understanding arrays and their fundamentals',
          slug: 'arrays-basics',
          markdownFile: 'dsa/arrays/array-basics.md',
          readingTime: '15 min',
          lastUpdated: '2024-03-28'
        },
        {
          id: 'array-operations',
          title: 'Array Operations',
          description: 'Basic array manipulation techniques',
          slug: 'array-operations',
          markdownFile: 'dsa/arrays/operations.md',
          readingTime: '10 min',
          lastUpdated: '2024-03-15'
        }
      ]
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      description: 'Understanding linear linked structures',
      articles: [
        {
          id: 'linked-list-basics',
          title: 'Linked List Basics',
          description: 'Introduction to linked lists',
          slug: 'linked-list-basics',
          markdownFile: 'dsa/linked-lists/basics.md',
          readingTime: '7 min',
          lastUpdated: '2024-03-15'
        }
      ]
    }
  ]
};