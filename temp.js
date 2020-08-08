// RIP charles

/*
let charles;

function setup() {
  createCanvas(400, 400);
  charles = new Box(20, 30, 55, 55, 5);
}

function draw() {
  background(220, 50, 0);

  if (keyIsDown(RIGHT_ARROW)) {
    charles.moveRight();
  }
  if (keyIsDown(LEFT_ARROW)) {
    charles.moveLeft();
  }
  if (keyIsDown(UP_ARROW)) {
    charles.moveUp();
  }
  if (keyIsDown(DOWN_ARROW)) {
    charles.moveDown();
  }

  charles.show();
}
*/


// RIP Box

/*
class Box {
  constructor(x, y, w, h, speed = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveUp() {
    this.y -= this.speed;
  }

  moveDown() {
    this.y += this.speed;
  }

  show() {
    rect(this.x, this.y, this.w, this.h);
  }
}
*/