import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  
  const searchData = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    slug: post.slug,
    tags: post.data.tags,
    category: post.data.category
  }));

  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}