# Development Setup Guide

This guide covers the development environment setup and best practices for Dev Elevate.

## Development Environment

### Required Tools

1. **Code Editor**
   - VS Code (recommended)
   - Required extensions:
     - Astro
     - Tailwind CSS IntelliSense
     - ESLint
     - Prettier

2. **Development Tools**
   - Node.js 18+
   - npm 7+
   - Git
   - Supabase CLI

### Editor Configuration

1. **VS Code Settings**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

2. **Extensions Setup**
   - Install recommended extensions from `.vscode/extensions.json`
   - Configure Prettier with project settings

## Development Workflow

### 1. Local Development

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Type checking
npm run typecheck

# Lint code
npm run lint
```

### 2. Database Development

```bash
# Start Supabase locally
npm run supabase:start

# Run migrations
npm run supabase:migrate

# Reset database
npm run supabase:reset
```

### 3. Content Development

- Create content in `src/content/blog`
- Follow markdown guidelines
- Add proper frontmatter
- Include code examples
- Add images to `public/images`

### 4. Component Development

- Create components in `src/components`
- Use TypeScript
- Add component documentation
- Include tests
- Follow accessibility guidelines

## Project Structure

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

## Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Run specific test
npm run test -- path/to/test

# Watch mode
npm run test:watch
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Open Cypress
npm run cypress:open
```

## Debugging

### Common Issues

1. **Build Errors**
   - Clear cache: `npm run clean`
   - Rebuild: `npm run build`

2. **Database Issues**
   - Reset database: `npm run supabase:reset`
   - Check migrations: `npm run supabase:status`

3. **Content Issues**
   - Validate frontmatter
   - Check markdown syntax
   - Verify file paths

## Performance

### Optimization Tips

1. **Images**
   - Use appropriate formats
   - Optimize size
   - Use responsive images

2. **Components**
   - Lazy load when possible
   - Minimize re-renders
   - Use proper memoization

3. **Styles**
   - Follow Tailwind best practices
   - Minimize custom CSS
   - Use utility classes

## Need Help?

- Check our [FAQ](../faq.md)
- Join [Discord](https://discord.gg/develevate)
- Create an [Issue](https://github.com/Satya900/DEV_MAIN/issues)