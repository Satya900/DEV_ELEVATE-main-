import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

const categories = ['all', 'web', 'mobile', 'ai', 'blockchain', 'game'] as const;

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('all');

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white pt-20 pb-12 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-black mb-4 mt-6 dark:text-neutral-300">
            Our Projects
          </h1>
          <p className="text-black max-w-2xl mx-auto dark:text-neutral-300">
            Explore our diverse portfolio of projects across different technologies and domains
          </p>
        </motion.div>

        
        <div
          className="
          flex gap-3 mb-12
          overflow-x-auto
          pb-4 px-4 md:px-0
          w-full max-w-full
          scroll-smooth
          snap-x snap-mandatory
          [-webkit-overflow-scrolling:touch]
          [scroll-padding-left:1rem]
          md:justify-center
        "
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 snap-start px-4 py-2 rounded-full capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-black hover:bg-emerald-100 dark:bg-gray-800 dark:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}