---
title: "Node.js Fundamentals"
description: "Getting started with Node.js backend development"
pubDate: 2024-03-15
category: "Web Development"
author: "Dev Elevate Team"
tags: ["nodejs", "backend", "javascript"]
---

# Node.js Fundamentals

Node.js is a powerful runtime that allows you to build scalable network applications using JavaScript on the server side.

## Core Concepts

### 1. Event Loop
```javascript
console.log('Starting');

setTimeout(() => {
  console.log('2 seconds passed');
}, 2000);

console.log('Finishing');
```

### 2. Modules
```javascript
// math.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;

// app.js
const math = require('./math');
console.log(math.add(5, 3)); // 8
```

## Building a Basic Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Working with Files

```javascript
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}
```

## Express.js Basics

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our API' });
});

app.listen(3000, () => {
  console.log('Express server running on port 3000');
});
```

## Error Handling

```javascript
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
```

## Best Practices

1. Use async/await for asynchronous operations
2. Implement proper error handling
3. Use environment variables
4. Follow the separation of concerns principle
5. Implement logging

## Common Use Cases

1. REST APIs
2. Real-time applications
3. Microservices
4. CLI tools
5. Static file servers

## Performance Tips

1. Use clustering for CPU-intensive tasks
2. Implement caching strategies
3. Optimize database queries
4. Use compression middleware
5. Implement rate limiting