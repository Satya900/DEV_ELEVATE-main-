import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  readingTime: string;
  lastUpdated: string;
}

export function RecentPosts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Gather recent posts from all categories
    const allPosts: Post[] = [];
    Object.values(categories).forEach(category => {
      category.subcategories.forEach(subcategory => {
        subcategory.articles.forEach(article => {
          allPosts.push({
            id: article.id,
            title: article.title,
            description: article.description,
            category: category.title,
            slug: article.slug,
            readingTime: article.readingTime,
            lastUpdated: article.lastUpdated,
          });
        });
      });
    });

    // Sort by lastUpdated date
    const sortedPosts = allPosts.sort((a, b) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );

    setPosts(sortedPosts.slice(0, 5)); // Keep only 5 most recent posts
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [posts.length]);

  if (posts.length === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="relative h-[300px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-8 flex flex-col justify-center"
          >
            <span className="text-sm font-medium text-emerald-500 mb-2">
              {posts[currentIndex].category}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {posts[currentIndex].title}
            </h3>
            <p className="text-gray-600 mb-6">
              {posts[currentIndex].description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {posts[currentIndex].readingTime} read
              </div>
              <Link
                to={`/${posts[currentIndex].category.toLowerCase().replace(' ', '-')}/${posts[currentIndex].slug}`}
                className="inline-flex items-center text-emerald-500 hover:text-emerald-600 font-medium"
              >
                Read More
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}