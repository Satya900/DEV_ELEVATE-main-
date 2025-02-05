import { motion } from 'framer-motion';
import { Github, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden group">
        <Link to={`/projects/${project.id}`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-full">
              {project.category}
            </span>
          </div>
        </Link>
      </div>

      <div className="p-6">
        <Link 
          to={`/projects/${project.id}`}
          className="block hover:text-emerald-500 transition-colors"
        >
          <h3 className="text-xl font-bold mb-2 text-black">{project.title}</h3>
        </Link>
        <p className="text-black mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-emerald-50 text-emerald-700 text-sm rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-500 hover:text-emerald-600 transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span>Live Demo</span>
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-black hover:text-emerald-500 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>Source</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}