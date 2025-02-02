---
title: "Building a Snake Game with JavaScript"
description: "Create a classic Snake game using vanilla JavaScript and HTML5 Canvas"
pubDate: 2024-03-28
category: "Projects"
author: "Dev Elevate Team"
tags: ["games", "javascript", "canvas"]
---

# Building a Snake Game with JavaScript

Let's create a classic Snake game using vanilla JavaScript and HTML5 Canvas. This project will help you understand game development concepts and canvas manipulation.

## Project Overview

- **Tech Stack**: HTML5, CSS3, JavaScript
- **Difficulty**: Beginner to Intermediate
- **Time**: 2-3 hours

## Features

1. Snake movement
2. Food generation
3. Score tracking
4. Collision detection
5. Game over handling
6. Responsive controls

## Implementation

### 1. Game Setup

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="game-container">
        <canvas id="gameCanvas"></canvas>
        <div class="score">Score: <span id="scoreValue">0</span></div>
        <button id="startButton">Start Game</button>
    </div>
    <script src="game.js"></script>
</body>
</html>
```

```css
/* styles.css */
.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

canvas {
    border: 2px solid #333;
    background: #f0f0f0;
}

.score {
    font-size: 24px;
    margin: 10px 0;
}

button {
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
}

button:hover {
    background: #45a049;
}
```

### 2. Game Logic

```javascript
// game.js
class SnakeGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 400;
        this.canvas.height = 400;
        
        // Game settings
        this.gridSize = 20;
        this.tileCount = 20;
        this.snake = [
            { x: 10, y: 10 }
        ];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.gameOver = false;
        
        // Bind methods
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        
        // Event listeners
        document.addEventListener('keydown', this.handleKeyPress);
        document.getElementById('startButton').addEventListener('click', () => {
            this.startGame();
        });
    }
    
    startGame() {
        this.snake = [{ x: 10, y: 10 }];
        this.direction = 'right';
        this.score = 0;
        this.gameOver = false;
        this.updateScore();
        this.gameLoop();
    }
    
    generateFood() {
        return {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowUp':
                if (this.direction !== 'down') this.direction = 'up';
                break;
            case 'ArrowDown':
                if (this.direction !== 'up') this.direction = 'down';
                break;
            case 'ArrowLeft':
                if (this.direction !== 'right') this.direction = 'left';
                break;
            case 'ArrowRight':
                if (this.direction !== 'left') this.direction = 'right';
                break;
        }
    }
    
    moveSnake() {
        const head = { ...this.snake[0] };
        
        switch(this.direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }
        
        // Check collision with walls
        if (head.x < 0 || head.x >= this.tileCount ||
            head.y < 0 || head.y >= this.tileCount) {
            this.gameOver = true;
            return;
        }
        
        // Check collision with self
        for (let i = 0; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver = true;
                return;
            }
        }
        
        // Add new head
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#4CAF50';
        this.snake.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
        
        // Draw food
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );
        
        // Draw game over
        if (this.gameOver) {
            this.ctx.fillStyle = 'black';
            this.ctx.font = '48px Arial';
            this.ctx.fillText(
                'Game Over!',
                this.canvas.width / 4,
                this.canvas.height / 2
            );
        }
    }
    
    updateScore() {
        document.getElementById('scoreValue').textContent = this.score;
    }
    
    gameLoop() {
        if (this.gameOver) return;
        
        setTimeout(() => {
            this.moveSnake();
            this.draw();
            requestAnimationFrame(this.gameLoop);
        }, 100);
    }
}

// Initialize game
const game = new SnakeGame('gameCanvas');
```

## Key Learning Points

1. Canvas manipulation
2. Game loop implementation
3. Collision detection
4. Event handling
5. Object-oriented programming
6. Animation techniques

## Game Mechanics

1. Snake Movement:
   - The snake moves continuously in the current direction
   - Direction can be changed using arrow keys
   - The snake grows when eating food
   - Movement speed increases with score

2. Collision Detection:
   - Check for wall collisions
   - Check for self-collisions
   - Check for food collisions

3. Scoring System:
   - Points awarded for eating food
   - High score tracking
   - Score display updates

## Next Steps

1. Add difficulty levels
2. Implement high scores
3. Add sound effects
4. Create power-ups
5. Add mobile controls
6. Create multiplayer mode

Remember to add proper comments and error handling throughout the code!