# Database Architecture

## Overview

Dev Elevate uses Supabase (PostgreSQL) as its primary database. This document outlines the database structure and relationships.

## Schema

### Users
```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);
```

### Articles
```sql
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES users(id),
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

### Comments
```sql
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id),
  user_id uuid REFERENCES users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

## Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for write operations
- Public read access for published content