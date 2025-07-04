import { CategoryData } from '../../types';
import { dsaCategory } from './dsa';
import { webDevCategory } from './web-dev';
import { systemDesignCategory } from './system-design';
import { projectsCategory } from './projects';

export const categories: CategoryData = {
  dsa: dsaCategory,
  webDev: webDevCategory,
  systemDesign: systemDesignCategory,
  projects: projectsCategory
};

export const techbuzz = {
  title: 'TechBuzz',
  path: '/techbuzz',
  description: 'Trending tech articles on AI, Web3, Cloud, DevTools, and more.',
  subcategories: [
    {
      title: 'AI',
      articles: [
        {
          id: 'ai-trends-2024',
          title: 'The Rise of Generative AI',
          description: 'Explore how generative AI is transforming industries in 2024.',
          slug: 'ai-trends-2024',
          markdownFile: 'techbuzz/ai-trends-2024.md',
          readingTime: '4 min',
          lastUpdated: '2024-05-01',
        },
      ],
    },
  ],
};

export * from './techbuzz';