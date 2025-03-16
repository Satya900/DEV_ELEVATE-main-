import { Category } from '../../types';

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

        },
        {
          id: 'Comparing Arrays and Linked Lists: When to Choose Which Structure',
          title: 'Comparing Arrays and Linked Lists: When to Choose Which Structure',
          description: 'Comparing arrays and linked lists',
          slug: 'comparing-arrays-and-linked-lists',
          markdownFile: 'dsa/arrays/array-vs-linked-list.md',
          readingTime: '10 min',
          lastUpdated: '2025-02-12'
        },
        {
          id: 'Functional Programming with Arrays: Map, Filter, and Reduce Operations',
          title: 'Functional Programming with Arrays: Map, Filter, and Reduce Operations',
          description: 'Functional programming with arrays',
          slug: 'functional-programming-with-arrays',
          markdownFile: 'dsa/arrays/functional-program-arrays.md',
          readingTime: '10 min',
          lastUpdated: '2025-02-12'
        },
        {
          id: 'Advanced Array Algorithms: From Kadane’s Algorithm to Dynamic Programming',
          title: 'Advanced Array Algorithms: From Kadane’s Algorithm to Dynamic Programming',
          description: 'Advanced array algorithms',
          slug: 'advanced-array-algorithms',
          markdownFile: 'dsa/arrays/advance-array-algo.md',
          readingTime: '10 min',
          lastUpdated: '2025-02-13'
        },
        {
          id: 'Multidimensional Arrays: Concepts, Implementation, and Applications',
          title: 'Multidimensional Arrays: Concepts, Implementation, and Applications',
          description: 'Explanation of Multidimensional arrays in Multiple Languages',
          slug: 'multidimensional-arrays',
          markdownFile: 'dsa/arrays/multi-dimensional-arrays.md',
          readingTime: '10 min',
          lastUpdated: '2025-02-13'
        },
        {
          id: 'Optimizing Array Performance: Tips for High-Performance Computing',
          title: 'Optimizing Array Performance: Tips for High-Performance Computing',
          description: 'Optimizing array performance',
          slug: 'optimizing-array-performance',
          markdownFile: 'dsa/arrays/optimizing-performance-in-array.md',
          readingTime: '10 min',
          lastUpdated: '2025-02-14'
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
        },
        {
          id: 'Singly Linked Lists 101: A Step-by-Step Guide',
          title: 'Singly Linked Lists 101: A Step-by-Step Guide',
          description: 'Full Explanation of Singly Linked Lists in language of your choice',
          slug: 'singly-linked-lists',
          markdownFile: 'dsa/linked-lists/singly-linked-list-101.md',
          readingTime: '10 min',
          lastUpdated: '2025-02-21'
        }
      ]
    },
    {
      id: 'Stack',
      title: 'Stack',
      description: 'Understanding the stack data structure',
      articles: [
        {
          id: 'Introduction to the Stack Data Structure: Principles and Application',
          title: 'Introduction to the Stack Data Structure: Principles and Application',
          description: 'Introduction to the stack data structure',
          slug: 'introduction-to-stack',
          markdownFile: 'dsa/Stack/intro-to-stack.md',
          readingTime: '5 min',
          lastUpdated: '2025-02-21'
        },
        {
          id: 'Understanding the Last-In-First-Out (LIFO) Principle in Stack Data Structure',
          title: 'Understanding the Last-In-First-Out (LIFO) Principle in Stack Data Structure',
          description: 'Understanding the Last-In-First-Out in detail.',
          slug: 'understanding-lifo-in-stack',
          markdownFile: 'dsa/Stack/understanding-lifo-principle.md',
          readingTime: '5 min',
          lastUpdated: '2025-03-13'
        },
        {
          id: 'Implementing a Stack in C and C++: A Step-by-Step Guide',
          title: 'Implementing a Stack in C and C++: A Step-by-Step Guide',
          description: 'In this guide, well learn how to implement a stack using both C and C++.',
          slug: 'implementing-stack-in-c-and-c++',
          markdownFile: 'dsa/Stack/Implement-Stack-c-and-cpp.md',
          readingTime: '5 min',
          lastUpdated: '2025-03-16'
        }
      ]
    }
  ]
};