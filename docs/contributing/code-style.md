# Code Style Guide

## General Guidelines

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful comments and documentation

## Naming Conventions

### Variables and Functions
```typescript
// Use camelCase for variables and functions
const userName = 'John';
function calculateTotal() {}

// Use PascalCase for components and classes
class UserProfile {}
function ButtonComponent() {}
```

### Files and Directories
- Use kebab-case for file names: `user-profile.ts`
- Use PascalCase for component files: `UserProfile.astro`

## Component Structure

```typescript
// Import statements
import { useState } from 'react';
import type { User } from '../types';

// Component interface
interface Props {
  user: User;
  onUpdate: (user: User) => void;
}

// Component implementation
export function UserProfile({ user, onUpdate }: Props) {
  // State and hooks
  const [isEditing, setIsEditing] = useState(false);

  // Event handlers
  const handleSubmit = () => {
    // Implementation
  };

  // Render
  return (
    <div>
      {/* JSX content */}
    </div>
  );
}
```

## Best Practices

1. Keep components focused and small
2. Use TypeScript types and interfaces
3. Write unit tests for components
4. Follow accessibility guidelines
5. Optimize performance