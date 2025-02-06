import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import { Clock, Calendar, ChevronLeft, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleLayoutProps {
  article: Article;
  categoryTitle: string;
  categoryPath: string;
}

interface Frontmatter {
  title: string;
  description: string;
  pubDate: string;
  category: string;
  author: string;
  tags: string[];
}

export function ArticleLayout({ article, categoryTitle, categoryPath }: ArticleLayoutProps) {
  const [content, setContent] = useState('');
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);

  useEffect(() => {
    // Update the fetch path to use the content directory
    fetch(`/content/${article.markdownFile}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load article: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(text => {
        // Extract frontmatter
        const match = text.match(/^---([\s\S]*?)---\n([\s\S]*)$/);
        if (match) {
          const [, frontmatterText, contentText] = match;
          const parsedFrontmatter = frontmatterText
            .split('\n')
            .filter(line => line.trim())
            .reduce((acc, line) => {
              const [key, ...valueParts] = line.split(':');
              let value = valueParts.join(':').trim();
              if (key === 'tags') {
                // Parse tags array from the format ["tag1", "tag2", "tag3"]
                value = JSON.parse(value.replace(/'/g, '"'));
              }
              return { ...acc, [key.trim()]: value };
            }, {}) as Frontmatter;
          
          setFrontmatter(parsedFrontmatter);
          setContent(contentText);
        } else {
          setContent(text);
        }
      })
      .catch(error => {
        console.error('Error loading article:', error);
        setContent('# Error\nFailed to load the article content. Please try again later.');
      });
  }, [article.markdownFile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={categoryPath}
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {categoryTitle}
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
        >
          <div className="p-8 md:p-12">
            {frontmatter && (
              <header className="mb-12">
                <div className="flex items-center space-x-2 text-sm text-emerald-600 font-medium mb-4">
                  <span className="uppercase tracking-wider">{frontmatter.category}</span>
                </div>
                
                <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                  {frontmatter.title}
                </h1>
                
                <p className="text-xl text-black mb-6">
                  {frontmatter.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-black">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-emerald-500" />
                    {frontmatter.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-emerald-500" />
                    Published: {new Date(frontmatter.pubDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                    {article.readingTime} read
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </header>
            )}

            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-black mt-8 mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-black mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-black mt-6 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-black leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-black">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-black">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-black">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-black my-4">{children}</blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-emerald-600 hover:text-emerald-700 underline">{children}</a>
                  ),
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <CodeBlock
                        language={match[1]}
                        value={String(children).replace(/\n$/, '')}
                        {...props}
                      />
                    ) : (
                      <code className="bg-gray-100 text-black px-1.5 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full divide-y divide-gray-200">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{children}</td>
                  ),
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} className="rounded-lg shadow-md my-8" />
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
  );
}