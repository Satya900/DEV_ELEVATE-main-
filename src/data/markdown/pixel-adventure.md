# Pixel Adventure

[Previous content remains the same until the first code block]

### Game Engine Architecture
```typescript
class GameEngine {
  private entities: Entity[] = [];
  private physics: PhysicsEngine;
  private renderer: Renderer;
  
  update(deltaTime: number) {
    this.physics.update(deltaTime);
    this.entities.forEach(entity => entity.update(deltaTime));
    this.renderer.render(this.entities);
  }
}

class Entity {
  position: Vector2;
  velocity: Vector2;
  sprite: Sprite;
  
  update(deltaTime: number) {
    // Entity update logic
  }
}

class PhysicsEngine {
  update(deltaTime: number) {
    // Physics calculations
  }
  
  checkCollisions(entities: Entity[]) {
    // Collision detection
  }
}
```

[Previous content remains the same until the next code block]

## Level Editor
```typescript
class LevelEditor {
  private grid: Tile[][];
  private selectedTile: TileType;
  
  placeTile(x: number, y: number) {
    this.grid[y][x] = new Tile(this.selectedTile);
  }
  
  exportLevel(): string {
    return JSON.stringify(this.grid);
  }
}
```

[Rest of the content remains the same]