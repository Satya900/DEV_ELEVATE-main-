import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  site: 'https://develevate.tech', // Replace with your actual site URL
  integrations: [
    tailwind(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ['@astrojs/rss', 'sanitize-html', 'marked']
    }
  }
});