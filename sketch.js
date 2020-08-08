let urbanTilemap;
let karen;
let environment;

function preload() {
  let references = [
    { x1: 0, y1: 0, x2: 2, y2: 2, name: "grass_wall"},
    { x1: 8, y1: 0, x2: 10, y2: 2, name: "purpur_gray", stop: true},
    { x1: 23, y1: 15, x2: 26, y2: 17, name: "soccer_mom"},
  ];
  
  urbanTilemap = new Tilemap(loadImage("assets/urban_tilemap.png"), 16, 16, references);
  
  karen = new Character(
    new Sprite(urbanTilemap, "soccer_mom"),
    [
      { frames: [5, 9], cycle: 5 },
      { frames: [7, 11], cycle: 5 },
      { frames: [4, 8], cycle: 5 },
      { frames: [6, 10], cycle: 5 },
    ],
    10, 25,
    0.25
  );
}

function setup() {
  createCanvas(480, 480);
  rectMode(CENTER);
}

function draw() {
  background(220);
  
  urbanTilemap.drawReference(1, 1, "purpur_gray");
  urbanTilemap.drawReference(5, 7, "grass_wall");
  urbanTilemap.drawReference(8, 7, "grass_wall");
  
  let animationIndex = 0;
  
  if (keyIsDown(RIGHT_ARROW)) {
    karen.moveRight();
    animationIndex = 1;
  }
  if (keyIsDown(LEFT_ARROW)) {
    karen.moveLeft();
    animationIndex = 2;
  }
  if (keyIsDown(DOWN_ARROW)) {
    karen.moveDown();
    animationIndex = 0;
  }
  if (keyIsDown(UP_ARROW)) {
    karen.moveUp();
    animationIndex = 3;
  }
  
  karen.show(animationIndex);
  
  urbanTilemap.refresh();
}