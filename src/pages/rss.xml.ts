import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

function getSafeUrl(path: string, site: URL): string {
  try {
    const safePath = path === '' ? '' : `/${path}`;
    return new URL(safePath, site).toString();
  } catch (error) {
    console.error(`Error creating URL for path: ${path}`, error);
    return `${site.toString().replace(/\/$/, '')}/${path}`;
  }
}

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('Site URL is not defined. Please set a site in your Astro config.');
  }

  const posts = await getCollection('blog');
  
  return rss({
    title: 'Dev Elevate Blog',
    description: 'A comprehensive technical blog covering DSA, Web Development, System Design, OOP, and Machine Learning',
    site: site.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getSafeUrl(`blog/${post.slug}`, site),
      content: sanitizeHtml(marked.parse(post.body)),
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author
    })),
    customData: `
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Astro</generator>
    `
  });
};