import { useMemo, useState } from 'react';
import { techbuzz } from '../data/categories/techbuzz';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArticleLayout } from '../components/ArticleLayout';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown } from 'lucide-react';

// Define all available categories
const BLOG_CATEGORIES = [
  { id: 'all', name: 'All Articles', description: 'Browse all tech articles' },
  { id: 'AI', name: 'AI & ML Trends', description: 'Artificial Intelligence and Machine Learning' },
  { id: 'Web3', name: 'Web3 & Blockchain', description: 'Decentralized technologies' },
  { id: 'Cloud', name: 'Cloud & DevOps', description: 'Cloud computing and DevOps practices' },
  { id: 'DevTools', name: 'Developer Tools', description: 'Tools to boost productivity' },
];

export default function TechBuzz() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get current category from URL params
  const currentCategory = searchParams.get('category') || 'all';

  // Flatten all articles from all subcategories
  const allArticles = useMemo(() => techbuzz.subcategories.flatMap(sub => sub.articles.map(article => ({
    ...article,
    category: sub.title
  }))), []);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    let articles = allArticles;

    // Filter by category
    if (currentCategory !== 'all') {
      articles = articles.filter(article =>
        article.category.toLowerCase().includes(currentCategory.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
      );
    }

    return articles;
  }, [allArticles, currentCategory, searchQuery]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
    setIsFilterOpen(false);
  };

  // Article detail view
  if (slug) {
    const article = allArticles.find(a => a.slug === slug);
    if (!article) {
      return (
        <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">The article you're looking for doesn't exist or has been moved.</p>
              <Link
                to="/techbuzz"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                ← Back to Blog
              </Link>
            </motion.div>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12">
        <Helmet>
          <title>{article.title} | TechBuzz - DevElevate</title>
          <meta name="description" content={article.description} />
          <meta property="og:title" content={article.title} />
          <meta property="og:description" content={article.description} />
          <meta property="og:type" content="article" />
        </Helmet>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleLayout
            article={article}
            categoryTitle="TechBuzz"
            categoryPath="/techbuzz"
          />
          <div className="mt-8 flex gap-4">
            <Link
              to="/techbuzz"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Blog listing view
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-20 pb-12">
      <Helmet>
        <title>Blog | DevElevate - Tech Articles & Tutorials</title>
        <meta name="description" content="Explore trending tech articles on AI, Web3, Cloud, DevTools, and more. Stay updated with the latest in technology." />
        <meta property="og:title" content="Blog | DevElevate" />
        <meta property="og:description" content="Trending tech articles on AI, Web3, Cloud, DevTools, and more." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 md:p-12 text-white relative"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">TechBuzz Blog</h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl">
              {techbuzz.description}
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500"
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 min-w-[180px] justify-between"
              >
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {BLOG_CATEGORIES.find(c => c.id === currentCategory)?.name || 'All Articles'}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                >
                  {BLOG_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${currentCategory === category.id
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{category.description}</div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Category Pills (Desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="hidden md:flex gap-2 mb-8 flex-wrap"
        >
          {BLOG_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentCategory === category.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-gray-200 dark:border-gray-700'
                }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredArticles.length}</span> article{filteredArticles.length !== 1 ? 's' : ''}
          {currentCategory !== 'all' && (
            <span> in <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {BLOG_CATEGORIES.find(c => c.id === currentCategory)?.name}
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
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all group"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                      {article.category}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 text-sm">
                      {article.readingTime} read
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
                    {article.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mb-4">
                    <span>📅 {article.lastUpdated}</span>
                  </div>
                  <Link
                    to={`/techbuzz/${article.slug}`}
                    className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium group-hover:translate-x-1 transition-transform"
                  >
                    Read Article <span className="ml-1">→</span>
                  </Link>
                </div>
              </motion.div>
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
                handleCategoryChange('all');
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