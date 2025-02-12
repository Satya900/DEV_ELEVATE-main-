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
          id: 'Evolve-arrays',
          title: 'The Evolution of Arrays in Computer Science: A Historical Perspective',
          description: 'A brief history of arrays in computer science',
          slug: 'evolve-arrays',
          markdownFile: 'dsa/arrays/evolve-array.md',
          readingTime: '10 min',
          lastUpdated: '2024-03-15'
        },
        {
          id: 'static-vs-dynamic-arrays',
          title: 'Static vs. Dynamic Arrays: Pros, Cons, and Use Cases',
          description: 'Comparing static and dynamic arrays',
          slug: 'static-vs-dynamic-arrays',
          markdownFile: 'dsa/arrays/static-vs-dynamic-arrays.md',
          readingTime: '8 min',
          lastUpdated: '2025-02-07'
        },
        {
          id: 'Memory Management in Arrays: How Arrays are Stored and Accessed in Memory',
          title: 'Memory Management in Arrays: How Arrays are Stored and Accessed in Memory',
          description: 'How arrays are stored and accessed in memory',
          slug: 'memory-management-in-arrays',
          markdownFile: 'dsa/arrays/memory-management-in-arrays.md',
          readingTime: '12 min',
          lastUpdated: '2025-02-07'

        }
        {
          id: 'Comparing Arrays and Linked Lists: When to Choose Which Structure',
          title: 'Comparing Arrays and Linked Lists: When to Choose Which Structure',
          description: 'Comparing arrays and linked lists',
          slug: 'comparing-arrays-and-linked-lists',
          markdownFile: 'dsa/arrays/arrays-vs-linked-lists.md',
          readingTime: '10 min',
          lastUpdated: '2025-02-12'
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