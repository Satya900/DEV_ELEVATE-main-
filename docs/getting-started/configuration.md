# Configuration Guide

This document explains how to configure Dev Elevate for your needs.

## Environment Variables

Create a `.env` file in the root directory:

```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Astro Configuration

The `astro.config.mjs` file contains project configuration:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://develevate.tech',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
```

## Tailwind Configuration

Customize Tailwind in `tailwind.config.mjs`:

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: []
};
```

## TypeScript Configuration

TypeScript settings in `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/base"
}
```