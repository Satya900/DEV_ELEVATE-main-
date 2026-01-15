import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from './CodeBlock'
import { Clock, Calendar, ChevronLeft, User, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Article } from '../types'

// Simplified article type for TechBuzz and other blog-style articles
export interface SimpleArticle {
  id: string;
  title: string;
  description: string;
  slug: string;
  markdownFile: string;
  readingTime?: string;
  lastUpdated?: string;
  category?: string;
}

// Union type that accepts either full Article or simplified article
type ArticleType = Article | SimpleArticle;

interface ArticleLayoutProps {
  article: ArticleType
  categoryTitle: string
  categoryPath: string
}

interface Frontmatter {
  title: string
  description: string
  pubDate: string
  category: string
  author: string
  tags: string[]
}

export function ArticleLayout({
  article,
  categoryTitle,
  categoryPath,
}: ArticleLayoutProps) {
  const [content, setContent] = useState('')
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null)

  useEffect(() => {
    let isMounted = true
    // Fetch markdown from public/content
    fetch(`/content/${article.markdownFile}`, {
      headers: { Accept: 'text/markdown, text/plain, text/*;q=0.9, */*;q=0.8' },
    })
      .then(async (response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error(
            `Failed to load article: ${response.status} ${response.statusText}`
          )
        }
        const contentType = response.headers.get('content-type') || ''
        const text = await response.text()

        // Guard: if content-type indicates HTML or the text clearly starts like an HTML document,
        // treat as an error (likely SPA fallback) instead of rendering raw HTML.
        // Note: Do NOT flag occurrences of "<html>" inside fenced code blocks.
        if (
          contentType.includes('text/html') ||
          /^\s*<!doctype html>/i.test(text)
        ) {
          throw new Error(
            'Unexpected HTML received instead of markdown. Check file path.'
          )
        }
        return text
      })
      .then((text) => {
        // Extract frontmatter
        const match = text.match(/^---([\s\S]*?)---\n([\s\S]*)$/)
        if (match) {
          const [, frontmatterText, contentText] = match
          const parsedFrontmatter = frontmatterText
            .split('\n')
            .filter((line) => line.trim())
            .reduce((acc, line) => {
              const [key, ...valueParts] = line.split(':')
              let value = valueParts.join(':').trim()
              if (key === 'tags') {
                // Parse tags array from the format ["tag1", "tag2", "tag3"]
                value = JSON.parse(value.replace(/'/g, '"'))
              }
              return { ...acc, [key.trim()]: value }
            }, {}) as Frontmatter

          if (isMounted) {
            setFrontmatter(parsedFrontmatter)
            setContent(contentText)
          }
        } else {
          if (isMounted) {
            setContent(text)
          }
        }
      })
      .catch((error) => {
        console.error('Error loading article:', error)
        if (isMounted) {
          setFrontmatter(null)
          setContent(
            '# Error\nFailed to load the article content. Please try again later.'
          )
        }
      })

    return () => {
      isMounted = false
    }
  }, [article.markdownFile])

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={categoryPath}
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-8 transition-colors mt-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {categoryTitle}
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          <div className="p-8 md:p-12">
            {frontmatter && (
              <header className="mb-12">
                <div className="flex items-center space-x-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-4">
                  <span className="uppercase tracking-wider">
                    {frontmatter.category}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {frontmatter.title}
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {frontmatter.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-emerald-500 dark:text-emerald-400" />
                    {frontmatter.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-emerald-500 dark:text-emerald-400" />
                    Published:{' '}
                    {new Date(frontmatter.pubDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-emerald-500 dark:text-emerald-400" />
                    {article.readingTime} read
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </header>
            )}

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700 dark:text-gray-300">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4 bg-gray-50 dark:bg-gray-800 py-2">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline"
                    >
                      {children}
                    </a>
                  ),
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <CodeBlock
                        language={match[1]}
                        code={String(children).replace(/\n$/, '')}
                        {...props}
                      />
                    ) : (
                      <code
                        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  },
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {children}
                    </td>
                  ),
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt}
                      className="rounded-lg shadow-md my-8 max-w-full h-auto"
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  )
}
