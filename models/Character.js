class Character {
  constructor(data) {
    let {
      tileBlock,
      animations,
      x,
      y,
      speed
    } = data;

    this.tileBlock = tileBlock;
    this.animations = animations.map(animation => window[animation]);
    this.x = x;
    this.y = y;
    this.speed = speed;
    
    this.sprite = new Sprite(tileBlock);
  }

  
  floorCoordinates() {
    return coordinates(Math.floor(this.x), Math.floor(this.y));
  }

  animate(index) {
    // TODO: Figure out why I need to index 0
    let animation = this.animations[0][index];
    let x = Math.floor(this.x);
    let y = Math.floor(this.y);

    this.sprite.drawAnimate(x, y, animation.frames, animation.cycle);

    const {
      stop,
      damage
    } = this.sprite.reference;
    window.tilemap.collisionData[this.floorCoordinates()] = {
      stop,
      damage
    };
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
    let collisionCheck = window.tilemap.collisionData[coordinates(checkX, checkY)];
    
    return !(collisionCheck && collisionCheck.stop);
  }
}