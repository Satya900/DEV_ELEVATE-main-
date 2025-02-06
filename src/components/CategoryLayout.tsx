import { motion } from 'framer-motion';
import { Category, Subcategory, Article } from '../types';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { ChevronRight, Clock, Calendar } from 'lucide-react';
import { ArticleLayout } from './ArticleLayout';

interface CategoryLayoutProps {
  category: Category;
}

export function CategoryLayout({ category }: CategoryLayoutProps) {
  const location = useLocation();
  const isRoot = location.pathname === `/${category.id}`;

  if (!isRoot) {
    return (
      <Routes>
        {category.subcategories.map((subcategory) =>
          subcategory.articles.map((article) => (
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

  return (
    <div className="min-h-screen bg-white pt-20 pb-12 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100 dark:bg-black dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl font-bold text-black mb-4 dark:text-neutral-200">
              {category.title}
            </h1>
            <p className="text-lg text-black dark:text-neutral-300">
              {category.description}
            </p>
          </motion.div>
        </div>

        {/* Subcategories */}
        <div className="space-y-12">
          {category.subcategories.map((subcategory) => (
            <SubcategorySection
              key={subcategory.id}
              subcategory={subcategory}
              categoryId={category.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubcategorySection({
  subcategory,
  categoryId,
}: {
  subcategory: Subcategory;
  categoryId: string;
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-black mb-6 dark:text-neutral-200">
        {subcategory.title}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subcategory.articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            categoryId={categoryId}
            subcategoryId={subcategory.id}
          />
        ))}
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  categoryId,
  subcategoryId,
}: {
  article: Article;
  categoryId: string;
  subcategoryId: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:bg-black dark:border-gray-700"
    >
      <Link
        to={`/${categoryId}/${subcategoryId}/${article.slug}`}
        className="block p-6"
      >
        <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-emerald-500 dark:text-neutral-200">
          {article.title}
        </h3>
        <p className="text-black mb-4 dark:text-neutral-300">{article.description}</p>
        <div className="flex items-center text-sm text-black space-x-4 dark:text-neutral-300">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-emerald-500" />
            {article.readingTime}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-emerald-500" />
            {article.lastUpdated}
          </div>
        </div>
        <div className="mt-4 flex items-center text-emerald-500 font-medium">
          Read More
          <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </Link>
    </motion.div>
  );
}
