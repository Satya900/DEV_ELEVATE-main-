import { Category } from '../../types';

export const systemDesignCategory: Category = {
  id: 'system-design',
  title: 'System Design',
  description: 'Learn to design scalable systems and architectures',
  icon: 'Network',
  subcategories: [
    {
      id: 'fundamentals',
      title: 'System Design Fundamentals',
      description: 'Core concepts of distributed systems',
      articles: [
        {
          id: 'intro-system-design',
          title: 'Introduction to System Design',
          description: 'Understanding system design principles',
          slug: 'introduction-to-system-design',
          markdownFile: 'system-design/fundamentals/intro.md',
          readingTime: '10 min',
          lastUpdated: '2024-03-15'
        },
        {
          id: 'microservices-patterns',
          title: 'Understanding Microservices Architecture Patterns',
          description: 'A comprehensive guide to microservices architecture patterns',
          slug: 'microservices-patterns',
          markdownFile: 'system-design/fundamentals/microservices-patterns.md',
          readingTime: '15 min',
          lastUpdated: '2024-03-28'
        },
        {
          id: 'scalability',
          title: 'Scalability Patterns',
          description: 'Horizontal and vertical scaling strategies',
          slug: 'scalability-patterns',
          markdownFile: 'system-design/fundamentals/scalability.md',
          readingTime: '15 min',
          lastUpdated: '2024-03-15'
        }
      ]
    },
    {
      id: 'databases',
      title: 'Database Design',
      description: 'Database architecture and optimization',
      articles: [
        {
          id: 'db-selection',
          title: 'Choosing the Right Database',
          description: 'SQL vs NoSQL and use cases',
          slug: 'database-selection',
          markdownFile: 'system-design/databases/selection.md',
          readingTime: '12 min',
          lastUpdated: '2024-03-15'
        }
      ]
    }
  ]
};