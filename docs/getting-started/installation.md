# Installation Guide

This guide will help you set up Dev Elevate locally for development.

## Prerequisites

- Node.js 18 or higher
- npm 7 or higher
- Git

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Satya900/DEV_MAIN.git
cd DEV_MAIN
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Configure Supabase:
   - Create a new project at [Supabase](https://supabase.com)
   - Copy your project credentials
   - Update `.env` with your credentials:
     ```env
     PUBLIC_SUPABASE_URL=your_project_url
     PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

### 4. Database Setup

1. Run migrations:
   ```bash
   npm run supabase:migrate
   ```

2. (Optional) Seed the database:
   ```bash
   npm run supabase:seed
   ```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application running.

## Troubleshooting

### Common Issues

1. **Node Version Mismatch**
   ```bash
   nvm use 18
   npm install
   ```

2. **Port Already in Use**
   ```bash
   # Change port
   npm run dev -- --port 3001
   ```

3. **Supabase Connection Issues**
   - Verify credentials in `.env`
   - Check Supabase dashboard for project status
   - Ensure database migrations are up to date

## Next Steps

- Read our [Development Setup](development-setup.md) guide
- Check out the [Contributing Guidelines](../contributing/guidelines.md)
- Join our [Discord Community](https://discord.gg/develevate)

## Need Help?

- Create an issue on [GitHub](https://github.com/Satya900/DEV_MAIN/issues)
- Ask in our [Discord Community](https://discord.gg/develevate)
- Check our [FAQ](../faq.md)