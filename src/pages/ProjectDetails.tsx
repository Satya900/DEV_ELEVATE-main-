import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Github, Globe, ArrowLeft, Calendar, Users, Code2 } from 'lucide-react';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import '../data/markdown/MarkdownStyles.css';

export function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (project) {
      fetch(`/src/data/markdown/${project.markdownFile}`)
        .then(response => response.text())
        .then(text => setMarkdown(text))
        .catch(error => console.error('Error loading markdown:', error));
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center ">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Project not found</h1>
          <Link to="/projects" className="text-emerald-500 hover:text-emerald-600 inline-flex items-center">
            <ArrowLeft className="mr-2" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-12 dark:bg-black ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <Link
          to="/projects"
          className="inline-flex items-center text-emerald-500 hover:text-emerald-600 mb-8"
        >
          <ArrowLeft className="mr-2" /> Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:bg-black  dark:border-gray-700"
        >
          {/* Hero Section */}
          <div className="relative h-96 ">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-full mb-4 inline-block">
                {project.category}
              </span>
              <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
              <p className="text-xl text-gray-200 max-w-3xl">{project.description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-950  dark:border-gray-700">
                <Code2 className="h-8 w-8 text-emerald-500" />
                <div>
                  <h3 className="text-sm font-medium text-black dark:text-neutral-100">Technologies</h3>
                  <p className="text-lg font-semibold text-black dark:text-neutral-200">{project.technologies.length} Used</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-950  dark:border-gray-700">
                <Calendar className="h-8 w-8 text-emerald-500" />
                <div>
                  <h3 className="text-sm font-medium text-black dark:text-neutral-100">Last Updated</h3>
                  <p className="text-lg font-semibold text-black dark:text-neutral-200">2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-950  dark:border-gray-700">
                <Users className="h-8 w-8 text-emerald-500" />
                <div>
                  <h3 className="text-sm font-medium text-black dark:text-neutral-100">Team Size</h3>
                  <p className="text-lg font-semibold text-black dark:text-neutral-200">4 Members</p>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6 dark:text-neutral-100">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium dark:bg-emerald-400 dark:text-emerald-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-lg max-w-none markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <CodeBlock
                        language={match[1]}
                        value={String(children).replace(/\n$/, '')}
                        {...props}
                      />
                    ) : (
                      <code className="custom-code-block" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>


            {/* Project Links */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
              >
                <Globe className="mr-2 h-5 w-5" />
                View Live Demo
              </a>
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-medium rounded-md text-black bg-white hover:bg-gray-50 transition-colors"
              >
                <Github className="mr-2 h-5 w-5" />
                View Source Code
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}