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