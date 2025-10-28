import { useMemo } from 'react'
import { techbuzz } from '../data/categories/techbuzz'
import { Link, useParams } from 'react-router-dom'
import { ArticleLayout } from '../components/ArticleLayout'
import { Helmet } from 'react-helmet'
import { a } from 'framer-motion/client'

export default function TechBuzz() {
  const { slug } = useParams()
  // Flatten all articles from all subcategories
  const articles = useMemo(
    () =>
      techbuzz.subcategories.flatMap((sub) =>
        sub.articles.map((article) => ({
          ...article,
          category: sub.title,
        }))
      ),
    []
  )

  if (slug) {
    const article = articles.find((a) => a.slug === slug)
    console.log(article, 'this is the find article')
    if (!article) {
      return (
        <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Article Not Found
            </h1>
            <Link to="/techbuzz" className="text-emerald-600 hover:underline">
              Back to TechBuzz
            </Link>
          </div>
        </div>
      )
    }
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12">
        <Helmet>
          <title>{article.title} | TechBuzz</title>
          <meta name="description" content={article.description} />
        </Helmet>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleLayout
            article={article}
            categoryTitle="TechBuzz"
            categoryPath="/techbuzz"
          />
          <div className="mt-8">
            <Link
              to="/techbuzz"
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Back to TechBuzz
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 pb-12">
      <Helmet>
        <title>TechBuzz | DevElevate</title>
        <meta
          name="description"
          content="Trending tech articles on AI, Web3, Cloud, DevTools, and more."
        />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border border-gray-700 rounded-2xl p-8 bg-black">
          <h1 className="text-4xl font-extrabold text-white mb-2">TechBuzz</h1>
          <p className="text-xl text-white font-semibold">
            {techbuzz.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {article.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                    {article.readingTime} read
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span className="mr-2">🗓️ {article.lastUpdated}</span>
                </div>
                <Link
                  to={`/techbuzz/${article.slug}`}
                  className="mt-auto inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  Read More <span className="ml-1">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
