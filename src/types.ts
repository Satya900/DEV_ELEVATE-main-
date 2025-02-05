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

export interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  markdownFile: string;
  readingTime: string;
  lastUpdated: string;
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