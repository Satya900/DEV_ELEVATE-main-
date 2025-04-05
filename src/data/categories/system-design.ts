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
          title: 'Introduction to Microservices Architecture',
          description: 'A comprehensive guide to microservices architecture patterns',
          slug: 'intro-to-microservices-architecture',
          markdownFile: 'system-design/fundamentals/intro-to-microservices-architecture.md',
          readingTime: '10 min',
          lastUpdated: '2025-02-22'
        },
        {
          id: 'scalability',
          title: 'Scalability Patterns',
          description: 'Horizontal and vertical scaling strategies',
          slug: 'scalability-patterns',
          markdownFile: 'system-design/fundamentals/scalability.md',
          readingTime: '15 min',
          lastUpdated: '2024-03-15'
        },
        {
          id: 'Why decompose a Monoliths',
          title: 'Why Decompose a Monolith?',
          description: 'Explore the benefits, business drivers, and practical strategies for breaking up legacy monolithic systems into microservices.',
          slug: 'why-decompose-monoliths',
          markdownFile: 'system-design/fundamentals/why-decompose-monolith.md',
          readingTime: '12 min',
          lastUpdated: '2025-04-05'
        },
        {
          id: 'Fundamentals of Service Decomposition',
          title: 'Fundamentals of Service Decomposition',
          description: 'Learn the principles and techniques for effective service decomposition in microservices architecture.',
          slug: 'fundamentals-of-service-decomposition',
          markdownFile: 'system-design/fundamentals/fundamentals-of-service-decomposition.md',
          readingTime: '12 min',
          lastUpdated: '2025-04-05'
        }
      ]
    },
    {
      id: 'HA & FT',
      title: 'High Availability and Fault Tolerance',
      description: 'Design patterns for ensuring system reliability and uptime.',
      articles: [
        {
          id: 'Introduction to High Availability & Fault Tolerance',
          title: 'Introduction to High Availability & Fault Tolerance',
          description: 'Learn the fundamentals of High Availability (HA) and Fault Tolerance (FT), their differences, and how to build resilient and reliable systems.',
          slug: 'introduction-to-ha-ft',
          markdownFile: 'system-design/High Availability and Fault tolerance/introduction-to-HA-&-FT.md',
          readingTime: '05 min',
          lastUpdated: '2025-04-05'
        }
      ]
    }
  ]
};