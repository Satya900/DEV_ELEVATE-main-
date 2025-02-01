import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getSafeUrl(path: string, site: URL): string {
  try {
    // Handle empty path for homepage
    const safePath = path === '' ? '' : `/${path}`;
    return new URL(safePath, site).toString();
  } catch (error) {
    console.error(`Error creating URL for path: ${path}`, error);
    // Fallback to simple string concatenation
    return `${site.toString().replace(/\/$/, '')}/${path}`;
  }
}

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('Site URL is not defined. Please set a site in your Astro config.');
  }

  // Get all blog posts
  const posts = await getCollection('blog');
  
  // Define static pages
  const staticPages = [
    '',
    'dsa',
    'web-dev',
    'system-design',
    'oops',
    'machine-learning',
    'contact'
  ];

  // Generate sitemap entries for static pages
  const staticEntries = staticPages.map((page) => `
    <url>
      <loc>${getSafeUrl(page, site)}</loc>
      <lastmod>${formatDate(new Date())}</lastmod>
      <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('');

  // Generate sitemap entries for blog posts
  const postEntries = posts.map((post) => `
    <url>
      <loc>${getSafeUrl(`blog/${post.slug}`, site)}</loc>
      <lastmod>${formatDate(post.data.pubDate)}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('');

  // Combine all entries
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticEntries}
      ${postEntries}
    </urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}