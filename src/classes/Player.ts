import { CollisionBlock } from "./CollisionBlock";

const X_VELOCITY = 200;
const Y_VELOCITY = 200;

type PlayerT = {
  x: number;
  y: number;
  size: number;
  velocity?: { x: number; y: number };
};

type KeysT = {
  [key: string]: {
    pressed: boolean;
  };
};

export class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: { x: number; y: number };

  constructor({ x, y, size, velocity = { x: 0, y: 0 } }: PlayerT) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
    this.velocity = velocity;
  }

  draw(c: CanvasRenderingContext2D) {
    // Red square debug code
    c.fillStyle = "rgba(0, 0, 255, 0.5)";
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update(deltaTime: number, collisionBlocks: CollisionBlock[]) {
    if (!deltaTime) return;

    // Update horizontal position and check collisions
    this.updateHorizontalPosition(deltaTime);
    this.checkForHorizontalCollisions(collisionBlocks);

    // Update vertical position and check collisions
    this.updateVerticalPosition(deltaTime);
    this.checkForVerticalCollisions(collisionBlocks);
  }

  updateHorizontalPosition(deltaTime: number) {
    this.x += this.velocity.x * deltaTime;
  }

  updateVerticalPosition(deltaTime: number) {
    this.y += this.velocity.y * deltaTime;
  }

  handleInput(keys: KeysT) {
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (keys.d.pressed) {
      this.velocity.x = X_VELOCITY;
    } else if (keys.a.pressed) {
      this.velocity.x = -X_VELOCITY;
    } else if (keys.w.pressed) {
      this.velocity.y = -Y_VELOCITY;
    } else if (keys.s.pressed) {
      this.velocity.y = Y_VELOCITY;
    }
  }

  checkForHorizontalCollisions(collisionBlocks: CollisionBlock[]) {
    const buffer = 0.0001;
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i];

      // Check if a collision exists on all axes
      if (
        this.x <= collisionBlock.x + collisionBlock.width &&
        this.x + this.width >= collisionBlock.x &&
        this.y + this.height >= collisionBlock.y &&
        this.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Check collision while player is going left
        if (this.velocity.x < -0) {
          this.x = collisionBlock.x + collisionBlock.width + buffer;
          break;
        }

        // Check collision while player is going right
        if (this.velocity.x > 0) {
          this.x = collisionBlock.x - this.width - buffer;

          break;
        }
      }
    }
  }

  checkForVerticalCollisions(collisionBlocks: CollisionBlock[]) {
    const buffer = 0.0001;
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i];

      // If a collision exists
      if (
        this.x <= collisionBlock.x + collisionBlock.width &&
        this.x + this.width >= collisionBlock.x &&
        this.y + this.height >= collisionBlock.y &&
        this.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Check collision while player is going up
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.y = collisionBlock.y + collisionBlock.height + buffer;
          break;
        }

        // Check collision while player is going down
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.y = collisionBlock.y - this.height - buffer;
          break;
        }
      }
    }
  }
}
