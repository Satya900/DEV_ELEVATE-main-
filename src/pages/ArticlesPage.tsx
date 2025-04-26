import { useState } from 'react';
import { mockArticles, mockAuthors } from '../data/mockArticles';
import { mockTags } from '../data/mockLearningPaths';
import { DifficultyLevel } from '../types';

export function ArticlesPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'all'>('all');
  const [authorFilter, setAuthorFilter] = useState<string | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string | 'all'>('all');

  // Filter articles based on selected filters
  const filteredArticles = mockArticles.filter(article => {
    const matchesDifficulty = difficultyFilter === 'all' || article.difficulty === difficultyFilter;
    const matchesAuthor = authorFilter === 'all' || article.author.id === authorFilter;
    const matchesTag = tagFilter === 'all' || article.tags.some(tag => tag.id === tagFilter);
    return matchesDifficulty && matchesAuthor && matchesTag;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Articles Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Browse our collection of {mockArticles.length} articles
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Difficulty filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Difficulty
              </label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as DifficultyLevel | 'all')}
                className="w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Author filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Author
              </label>
              <select
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Authors</option>
                {mockAuthors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tag
              </label>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Tags</option>
                {mockTags.map(tag => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <div 
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Cover image */}
              {article.coverImage && (
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {/* Placeholder for image */}
                    {article.title.charAt(0)}
                  </div>
                </div>
              )}
              
              {/* Article content */}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full
                    ${article.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                      article.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' : 
                      'bg-orange-100 text-orange-800'}`}
                  >
                    {article.difficulty}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                    {article.readingTime} min read
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {article.description}
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm">
                    {article.author.name.charAt(0)}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{article.author.name}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag.id}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full px-2 py-1"
                      style={{ backgroundColor: tag.color ? `${tag.color}20` : undefined }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Created: {new Date(article.createdAt).toLocaleDateString()}</span>
                  <span>Published: {new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 