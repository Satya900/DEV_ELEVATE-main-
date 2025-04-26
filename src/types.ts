export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  title: string;
  description: string;
  articles: Article[];
}

// Defining valid difficulty levels for articles
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Defining types of content for articles
export type ContentType = 'tutorial' | 'guide' | 'reference' | 'concept' | 'practice' | 'case-study';

export interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  markdownFile: string;
  
  // Enhanced metadata
  difficultyLevel: DifficultyLevel;
  contentType: ContentType;
  author: string;
  authorImageUrl?: string;
  estimatedMinutes: number;
  lastUpdated: string;
  
  // Tags for improved categorization and search
  tags: string[];
  
  // Prerequisites for learning path
  prerequisites?: string[]; // Array of article IDs that should be completed first
  
  // Learning outcomes
  learningOutcomes?: string[];
  
  // Related content
  relatedArticles?: string[]; // Array of related article IDs
  
  // Additional resources
  externalResources?: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'documentation' | 'github' | 'other';
  }[];
  
  // For backward compatibility
  readingTime?: string;
}

export interface CategoryData {
  dsa: Category;
  webDev: Category;
  systemDesign: Category;
  projects: Category;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  sourceUrl: string;
  markdownFile: string;
}

// Learning path structure
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  categories: string[]; // Related categories
  stages: LearningPathStage[];
  tags: string[];
}

export interface LearningPathStage {
  id: string;
  title: string;
  description: string;
  articleIds: string[]; // Articles to complete in this stage
  optional?: boolean; // Whether this stage is optional
  milestoneProject?: string; // Project ID for this milestone
}