# Architecture Overview

## System Architecture

Dev Elevate follows a modern JAMstack architecture:

- **Frontend**: Astro.js with Tailwind CSS
- **Backend**: Supabase for authentication and database
- **Content**: Markdown files for tutorials and documentation
- **Deployment**: Continuous deployment via GitHub Actions

## Key Components

1. **Content Management**
   - Markdown-based content
   - Astro Collections for organization
   - Frontmatter for metadata

2. **Authentication**
   - Supabase Auth
   - JWT-based sessions
   - Role-based access control

3. **Database**
   - PostgreSQL via Supabase
   - Row Level Security
   - Real-time subscriptions

4. **API Layer**
   - RESTful endpoints
   - Type-safe API routes
   - OpenAPI documentation

## Directory Structure

```
dev-elevate/
├── src/
│   ├── components/    # UI components
│   ├── content/       # Blog posts and content
│   ├── layouts/       # Page layouts
│   ├── lib/          # Shared utilities
│   ├── pages/        # Route pages
│   └── styles/       # Global styles
├── public/           # Static assets
├── tests/           # Test files
├── docs/            # Documentation
└── supabase/        # Database migrations
```