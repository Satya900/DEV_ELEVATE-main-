import React from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Article } from '../types'
import { ArticleLayout } from '../components/ArticleLayout'
import { categories } from '../data/categories'

function TechArticle() {
  const { feild, subdomain, markdownfile } = useParams<{
    feild?: string
    subdomain?: string
    markdownfile?: string
  }>()
  // console.log(feild, subdomain, markdownfile)
  // console.log(categories)

  const cat = Object.entries(categories).filter((cat: any) => {
    // console.log(cat[1].id)
    return cat[1].id === feild
  })
  // console.log(cat[0][1], 'this is the selected cat')

  const sub = cat[0][1].subcategories.filter((cat: any) => cat.id === subdomain)

  // console.log(sub)
  const art = sub[0].articles.filter((artt: any) =>
    artt.markdownFile.includes(markdownfile)
  )

  // console.log(art)

  return (
    <div>
      <ArticleLayout
        article={art[0]}
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
  )
}

export default TechArticle
