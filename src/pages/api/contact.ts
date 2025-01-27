import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    const { error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    return new Response(JSON.stringify({ error: 'Failed to save contact' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};