import { motion } from 'framer-motion'
import { Category, Subcategory, Article } from '../types'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import { ChevronRight, Clock, Calendar } from 'lucide-react'
import { ArticleLayout } from './ArticleLayout'
import { useEffect } from 'react'
import { Github } from 'lucide-react'

interface CategoryLayoutProps {
  category: Category
}

export function CategoryLayout({ category }: CategoryLayoutProps) {
  const location = useLocation()
  const isRoot = location.pathname === `/${category.id}/`

  // Debugging: log the current pathname and whether we consider this the root
  // console.log('CategoryLayout:', {
  //   categoryId: category.id,
  //   pathname: location.pathname,
  //   isRoot,
  // })

  let cat = category.subcategories

  if (!isRoot) {
    cat = category.subcategories.filter((elem) =>
      location.pathname.includes(elem.id)
    )
  }

  // Fancy empty state with contribution links
  if (cat.length === 0) {
    const repoUrl = 'https://github.com/Satya900/DEV_ELEVATE-main-' // change to your repo
    const newDocUrl = `https://github.com/Satya900/DEV_ELEVATE-main-/issues`
    const issueUrl = `${repoUrl}/issues/new?title=Docs%3A%20%5BTopic%5D&labels=documentation`

    return (
      <div className="min-h-screen bg-white pt-20 pb-12 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-emerald-50/70 to-cyan-50/70 dark:from-gray-900 dark:to-black p-10 mt-6 text-center"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <Github />
            </div>
            <h2 className="text-2xl font-bold text-black mb-3 dark:text-neutral-100">
              No articles here — yet
            </h2>
            <p className="text-lg text-black/80 dark:text-neutral-300">
              Help us grow these docs. Add an article or suggest a topic on
              GitHub.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={newDocUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-white hover:bg-emerald-700 transition-colors"
              >
                Add article on GitHub
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
              <a
                href={`${repoUrl}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-900/30 transition-colors"
              >
                Contribute to docs
              </a>
            </div>

            <div className="mt-4 text-sm text-black/70 dark:text-neutral-400">
              Prefer opening an issue?{' '}
              <a
                href={issueUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline underline-offset-2"
              >
                Suggest a topic
              </a>
            </div>

            <div className="mt-8">
              <Link
                to={`/${category.id}/`}
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Browse all topics
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-12 dark:bg-black ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 mt-6 border border-gray-100  dark:bg-black dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl font-bold text-black mb-4 dark:text-neutral-100">
              {category.title}
            </h1>
            <p className="text-lg text-black dark:text-neutral-300">
              {category.description}
            </p>
          </motion.div>
        </div>

        {/* Subcategories */}
        <div className="space-y-12 ">
          {cat.map((subcategory) => (
            <SubcategorySection
              key={subcategory.id}
              subcategory={subcategory}
              categoryId={category.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SubcategorySection({
  subcategory,
  categoryId,
}: {
  subcategory: Subcategory
  categoryId: string
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-black mb-6 dark:text-neutral-100">
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
  )
}

function ArticleCard({
  article,
  categoryId,
  subcategoryId,
}: {
  article: Article
  categoryId: string
  subcategoryId: string
}) {
  console.log(JSON.stringify(article), 'this is the article')
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100  dark:bg-black dark:border-gray-700"
    >
      <Link to={`/tech/${article.markdownFile}`} className="block p-6">
        <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-emerald-500 dark:text-neutral-100">
          {article.title}
        </h3>
        <p className="text-black mb-4 dark:text-neutral-300">
          {article.description}
        </p>
        <div className="flex items-center text-sm text-black space-x-4">
          <div className="flex items-center dark:text-neutral-100">
            <Clock className="h-4 w-4 mr-1 text-emerald-500 " />
            {article.readingTime}
          </div>
          <div className="flex items-center dark:text-neutral-100">
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
  )
}
