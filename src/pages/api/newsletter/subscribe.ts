import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (error) {
      // Handle unique constraint violation
      if (error.code === '23505') {
        return new Response(JSON.stringify({ error: 'Email already subscribed' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};