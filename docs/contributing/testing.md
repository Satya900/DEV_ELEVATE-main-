# Testing Guide

## Overview

Dev Elevate uses a comprehensive testing strategy including:
- Unit Tests
- Integration Tests
- End-to-End Tests
- Component Tests

## Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test path/to/test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## Writing Tests

### Unit Tests
```typescript
import { describe, it, expect } from 'vitest';
import { calculateTotal } from './utils';

describe('calculateTotal', () => {
  it('should calculate correct total', () => {
    expect(calculateTotal([10, 20, 30])).toBe(60);
  });

  it('should handle empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

### Component Tests
```typescript
import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('should render user information', () => {
    render(<UserProfile user={{ name: 'John' }} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

## Best Practices

1. Write tests before implementing features (TDD)
2. Keep tests focused and isolated
3. Use meaningful test descriptions
4. Test edge cases and error conditions
5. Maintain test coverage above 80%