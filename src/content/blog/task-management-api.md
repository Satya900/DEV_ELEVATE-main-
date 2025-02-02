---
title: "Building a Task Management API with Node.js and Express"
description: "Create a RESTful API for task management using Node.js, Express, and TypeScript"
pubDate: 2024-03-28
category: "Projects"
author: "Dev Elevate Team"
tags: ["backend", "node.js", "express", "typescript"]
---

# Building a Task Management API with Node.js and Express

Let's create a robust RESTful API for task management using Node.js, Express, and TypeScript. This API will handle task creation, updates, deletion, and filtering.

## Project Overview

- **Tech Stack**: Node.js, Express, TypeScript, PostgreSQL
- **Difficulty**: Intermediate
- **Time**: 3-5 hours

## Features

1. CRUD operations for tasks
2. User authentication
3. Task filtering and sorting
4. Rate limiting
5. API documentation
6. Error handling

## Implementation

### 1. Project Setup

First, set up the project structure and install dependencies:

```typescript
// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  dueDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// src/routes/tasks.ts
import express from 'express';
import { body, query } from 'express-validator';
import { createTask, updateTask, deleteTask, getTasks } from '../controllers/tasks';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  [
    body('title').notEmpty().trim(),
    body('description').optional().trim(),
    body('status').isIn(['todo', 'in_progress', 'done']),
    body('dueDate').isISO8601().toDate()
  ],
  createTask
);

router.get(
  '/',
  authMiddleware,
  [
    query('status').optional().isIn(['todo', 'in_progress', 'done']),
    query('sortBy').optional().isIn(['dueDate', 'createdAt', 'status']),
    query('order').optional().isIn(['asc', 'desc'])
  ],
  getTasks
);

router.put(
  '/:id',
  authMiddleware,
  [
    body('title').optional().trim(),
    body('description').optional().trim(),
    body('status').optional().isIn(['todo', 'in_progress', 'done']),
    body('dueDate').optional().isISO8601().toDate()
  ],
  updateTask
);

router.delete('/:id', authMiddleware, deleteTask);

export default router;

// src/controllers/tasks.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../db';

export const createTask = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, dueDate } = req.body;
    const userId = req.user.id;

    const task = await db.task.create({
      data: {
        title,
        description,
        status,
        dueDate,
        userId
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { status, sortBy = 'createdAt', order = 'desc' } = req.query;
    const userId = req.user.id;

    const where = {
      userId,
      ...(status ? { status: status as string } : {})
    };

    const tasks = await db.task.findMany({
      where,
      orderBy: {
        [sortBy as string]: order
      }
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add other controller methods...
```

### 2. Error Handling

Create a centralized error handling system:

```typescript
// src/utils/errors.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
```

### 3. Rate Limiting

Implement rate limiting to protect the API:

```typescript
// src/middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
```

### 4. API Documentation

Create OpenAPI/Swagger documentation:

```typescript
// src/swagger.ts
export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Task Management API',
    version: '1.0.0',
    description: 'API for managing tasks'
  },
  paths: {
    '/api/tasks': {
      post: {
        summary: 'Create a new task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'status', 'dueDate'],
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  status: {
                    type: 'string',
                    enum: ['todo', 'in_progress', 'done']
                  },
                  dueDate: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Task created successfully'
          }
        }
      }
    }
  }
};
```

## Project Structure

```
src/
  controllers/
    tasks.ts
  middleware/
    auth.ts
    errorHandler.ts
    rateLimiter.ts
  routes/
    tasks.ts
  types/
    task.ts
  utils/
    errors.ts
  app.ts
  swagger.ts
```

## Key Learning Points

1. RESTful API design
2. TypeScript with Express
3. Authentication and authorization
4. Error handling
5. Rate limiting
6. API documentation
7. Database integration

## Testing

Create comprehensive tests:

```typescript
// src/__tests__/tasks.test.ts
import request from 'supertest';
import { app } from '../app';
import { db } from '../db';

describe('Task API', () => {
  beforeEach(async () => {
    await db.task.deleteMany();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${testToken}`)
        .send({
          title: 'Test Task',
          status: 'todo',
          dueDate: new Date().toISOString()
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });
});
```

## Next Steps

1. Add task categories
2. Implement task assignments
3. Add file attachments
4. Create task comments
5. Add task priorities
6. Implement task search

Remember to follow security best practices and add proper input validation throughout the API!