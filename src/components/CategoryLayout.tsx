import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Category, Article } from '../types';
import { Link, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { Calendar, Search, Filter, ChevronDown, BookOpen, Tag, ChevronRight } from 'lucide-react';
import { ArticleLayout } from './ArticleLayout';

interface CategoryLayoutProps {
  category: Category;
}

// Gradient color schemes for different categories
const getCategoryGradient = (categoryId: string): string => {
  const gradients: Record<string, string> = {
    'dsa': 'from-violet-600 via-purple-600 to-indigo-600',
    'web-dev': 'from-blue-600 via-cyan-600 to-teal-600',
    'system-design': 'from-orange-600 via-red-600 to-pink-600',
    'projects': 'from-green-600 via-emerald-600 to-teal-600',
  };
  return gradients[categoryId] || 'from-emerald-600 via-teal-600 to-cyan-600';
};

// Get icon for difficulty level
const getDifficultyBadge = (level?: string) => {
  const badges: Record<string, { color: string; label: string }> = {
    'beginner': { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', label: 'Beginner' },
    'intermediate': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', label: 'Intermediate' },
    'advanced': { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300', label: 'Advanced' },
    'expert': { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', label: 'Expert' },
  };
  return badges[level || ''] || null;
};

export function CategoryLayout({ category }: CategoryLayoutProps) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const isRoot = location.pathname === `/${category.id}`;

  // Get current subcategory filter from URL params
  const currentSubcategory = searchParams.get('subcategory') || 'all';

  // Flatten all articles with subcategory info
  const allArticles = useMemo(() => {
    return category.subcategories.flatMap(subcategory =>
      subcategory.articles.map(article => ({
        ...article,
        subcategoryId: subcategory.id,
        subcategoryTitle: subcategory.title,
      }))
    );
  }, [category]);

  // Filter articles based on subcategory and search query
  const filteredArticles = useMemo(() => {
    let articles = allArticles;

    // Filter by subcategory
    if (currentSubcategory !== 'all') {
      articles = articles.filter(article => article.subcategoryId === currentSubcategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.subcategoryTitle.toLowerCase().includes(query) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    return articles;
  }, [allArticles, currentSubcategory, searchQuery]);

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId: string) => {
    if (subcategoryId === 'all') {
      searchParams.delete('subcategory');
    } else {
      searchParams.set('subcategory', subcategoryId);
    }
    setSearchParams(searchParams);
    setIsFilterOpen(false);
  };

  // For article detail views
  if (!isRoot) {
    return (
      <Routes>
        {category.subcategories.map(subcategory =>
          subcategory.articles.map(article => (
            <Route
              key={article.id}
              path={`${subcategory.id}/${article.slug}`}
              element={
                <ArticleLayout
                  article={article}
                  categoryTitle={category.title}
                  categoryPath={`/${category.id}`}
                />
              }
            />
          ))
        )}
      </Routes>
    );
  }

  const gradient = getCategoryGradient(category.id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Category Header with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-10 mt-6 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} p-8 md:p-12 text-white relative`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8" />
              <span className="text-white/80 text-lg">{allArticles.length} Articles</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{category.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              {category.description}
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${category.title.toLowerCase()} articles...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500"
              />
            </div>

            {/* Subcategory Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 min-w-[200px] justify-between"
              >
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {currentSubcategory === 'all'
                    ? 'All Topics'
                    : category.subcategories.find(s => s.id === currentSubcategory)?.title || 'All Topics'
                  }
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 max-h-80 overflow-y-auto"
                >
                  <button
                    onClick={() => handleSubcategoryChange('all')}
                    className={`w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${currentSubcategory === 'all'
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    <div className="font-medium">All Topics</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Browse all {allArticles.length} articles</div>
                  </button>
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategoryChange(subcategory.id)}
                      className={`w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${currentSubcategory === subcategory.id
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      <div className="font-medium">{subcategory.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {subcategory.articles.length} article{subcategory.articles.length !== 1 ? 's' : ''}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Subcategory Pills (Desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="hidden md:flex gap-2 mb-8 flex-wrap"
        >
          <button
            onClick={() => handleSubcategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentSubcategory === 'all'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-gray-200 dark:border-gray-700'
              }`}
          >
            All Topics
          </button>
          {category.subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              onClick={() => handleSubcategoryChange(subcategory.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentSubcategory === subcategory.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-gray-200 dark:border-gray-700'
                }`}
            >
              {subcategory.title}
            </button>
          ))}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredArticles.length}</span> article{filteredArticles.length !== 1 ? 's' : ''}
          {currentSubcategory !== 'all' && (
            <span> in <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {category.subcategories.find(s => s.id === currentSubcategory)?.title}
            </span></span>
          )}
          {searchQuery && (
            <span> matching "<span className="font-semibold">{searchQuery}</span>"</span>
          )}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <EnhancedArticleCard
                key={article.id}
                article={article}
                categoryId={category.id}
                subcategoryId={article.subcategoryId}
                subcategoryTitle={article.subcategoryTitle}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleSubcategoryChange('all');
              }}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Enhanced Article Card Component
function EnhancedArticleCard({
  article,
  categoryId,
  subcategoryId,
  subcategoryTitle,
  index
}: {
  article: Article & { subcategoryId: string; subcategoryTitle: string };
  categoryId: string;
  subcategoryId: string;
  subcategoryTitle: string;
  index: number;
}) {
  const difficultyBadge = getDifficultyBadge(article.difficultyLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all group"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            {subcategoryTitle}
          </span>
          {difficultyBadge && (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyBadge.color}`}>
              {difficultyBadge.label}
            </span>
          )}
          <span className="text-gray-400 dark:text-gray-500 text-sm">
            {article.readingTime} read
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
          {article.description}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center gap-1 mb-4 flex-wrap">
            <Tag className="h-3 w-3 text-gray-400" />
            {article.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs text-gray-500 dark:text-gray-400">
                {tag}{i < Math.min(article.tags!.length, 3) - 1 ? ',' : ''}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-gray-400">+{article.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mb-4">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{article.lastUpdated}</span>
        </div>

        <Link
          to={`/${categoryId}/${subcategoryId}/${article.slug}`}
          className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium group-hover:translate-x-1 transition-transform"
        >
          Read Article <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
}