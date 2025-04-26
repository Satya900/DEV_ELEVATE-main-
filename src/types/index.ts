// Common types used across the application

export interface Tag {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  author: Author;
  tags: Tag[];
  difficulty: DifficultyLevel;
  readingTime: number;
  createdAt: string;
  publishedAt: string;
  updatedAt?: string;
  prerequisites?: Article[];
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  twitterHandle?: string;
  githubUsername?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  articles: Article[];
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  difficulty: DifficultyLevel;
  tags: Tag[];
  estimatedHours: number;
  milestones: Milestone[];
  createdAt: string;
  updatedAt?: string;
} 