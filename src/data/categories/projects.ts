import { Category } from '../../types';

export const projectsCategory: Category = {
  id: 'projects',
  title: 'Projects',
  description: 'Hands-on projects to build your portfolio',
  icon: 'FolderKanban',
  subcategories: [
    {
      id: 'web-projects',
      title: 'Web Development Projects',
      description: 'Full-stack web applications',
      articles: [
        {
          id: 'social-media-app',
          title: 'Build a Social Media App',
          description: 'Full-stack social platform',
          slug: 'social-media-app',
          markdownFile: 'projects/web/social-media.md',
          readingTime: '30 min',
          lastUpdated: '2024-03-15'
        },
        {
          id: 'e-commerce',
          title: 'E-commerce Platform',
          description: 'Online shopping application',
          slug: 'e-commerce-platform',
          markdownFile: 'projects/web/e-commerce.md',
          readingTime: '25 min',
          lastUpdated: '2024-03-15'
        }
      ]
    },
    {
      id: 'ml-projects',
      title: 'Machine Learning Projects',
      description: 'AI and ML applications',
      articles: [
        {
          id: 'image-classifier',
          title: 'Image Classification System',
          description: 'Build an image classifier',
          slug: 'image-classifier',
          markdownFile: 'projects/ml/image-classifier.md',
          readingTime: '20 min',
          lastUpdated: '2024-03-15'
        }
      ]
    }
  ]
};