class Character {
  constructor(sprite, animations, x, y, speed) {
    this.sprite = sprite;
    this.animations = animations;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  show(animationIndex) {
    let animation = this.animations[animationIndex];
    let x = Math.floor(this.x);
    let y = Math.floor(this.y);

    this.sprite.drawAnimate(x, y, animation.frames, animation.cycle);
  }

  moveRight() {
    if (this.canMove({offsetX: 1})) this.x += this.speed;
  }

  moveLeft() {
    if (this.canMove({offsetX: -1})) this.x -= this.speed;
  }

  moveDown() {
    if (this.canMove({offsetY: 1})) this.y += this.speed;
  }

  moveUp() {
    if (this.canMove({offsetY: -1})) this.y -= this.speed;
  }

  canMove({
    offsetX = 0,
    offsetY = 0
  }) {
    let checkX = Math.floor(this.x) + offsetX;
    let checkY = Math.floor(this.y) + offsetY;
    return !(!!this.sprite.tilemap.collisionData[coordinates(checkX, checkY)]);
  }
}

/*
[
  { frames: [5, 9], cycle: 5 },
  ...
]
*/