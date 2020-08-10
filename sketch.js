const W_KEY = 87;
const S_KEY = 83;
const D_KEY = 68;
const A_KEY = 65;
const E_KEY = 69;
const Q_KEY = 81;
const SPACE_KEY = 32;

const TURN_RIGHT = 1;
const TURN_LEFT = 2;
const TURN_DOWN = 0; // for what
const TURN_UP = 3;

// Asset variables
let tilemapImage;
let fontRomulus;

// Data variables

// - Tiles
let tileBlocks;
let walkingAnimation;
let environmentData;

// - Actors
let karenData;
let managersData;

// - Dialogues
let welcomeDialogueData;

// Game objects
let karen;
let managers;
let welcomeDialogue;

// State variables
let gameStart = false;

function preload() {
  // Assets
  tilemapImage = loadImage("assets/urban_tilemap.png");
  fontRomulus = loadFont("assets/romulus.ttf");

  // Data
  tileBlocks = loadJSON("data/tile_blocks.json");
  walkingAnimation = loadJSON("data/walking_animation.json");
  karenData = loadJSON("data/karen.json");
  managersData = loadJSON("data/managers.json");
  welcomeDialogueData = loadJSON("data/welcome_dialogue.json");
  environmentData = loadJSON("data/environment.json");
}

function setup() {
  createCanvas(480, 480);
  textFont(fontRomulus);

  // Global variables (1)
  window.tilemap = new Tilemap(tilemapImage, 16, 16, tileBlocks);
  window.walkingAnimation = walkingAnimation;

  // Actors (Karen, managers, etc)
  karen = {
    character: new Character(karenData.character),
    battler: new Battler(karenData.battler),
  }

  managers = Object.values(managersData).map(data => ({
    character: new Character(data.character),
    battler: new Battler(data.battler),
  }));

  // Dialogues
  welcomeDialogue = new Dialogue(Object.values(welcomeDialogueData));

  // Global variables (2)
  window.currentDialogue = welcomeDialogue;

  // Set things in motion
  welcomeDialogue.restore();
  setTimeout(() => {
    welcomeDialogue.nextLine();
    gameStart = true;
  }, 2000);
}

function draw() {
  background(220);

  if (!gameStart) {

  }

  Object.values(environmentData).forEach(({
    x,
    y,
    tileBlock
  }) => {
    window.tilemap.drawReference(x, y, tileBlock);
  });

  // Manager visibility+stop hack
  managers.forEach(({
    character
  }) => {
    window.tilemap.drawReference(character.x, character.y, character.tileBlock);
  });

  // Karen, animate!
  let animationIndex = 0;

  if (keyIsDown(D_KEY)) {
    karen.character.moveRight();
    animationIndex = TURN_RIGHT;
  }
  if (keyIsDown(A_KEY)) {
    karen.character.moveLeft();
    animationIndex = TURN_LEFT;
  }
  if (keyIsDown(S_KEY)) {
    karen.character.moveDown();
    animationIndex = TURN_DOWN; // for what
  }
  if (keyIsDown(W_KEY)) {
    karen.character.moveUp();
    animationIndex = TURN_UP;
  }

  karen.character.animate(animationIndex);

  // Managers, animate!
  managers.forEach(manager => {
    manager.character.animate(TURN_DOWN); // for what
  });

  // UI, beget!
  karen.battler.drawHealthBar();
  karen.battler.drawExpBar();

  fill('black');
  textSize(32);
  text(`Level: ${karen.battler.levelIndex + 1}`, 360, 30);

  // Dialogue, reveal thyself!
  window.currentDialogue.drawBox();

  window.tilemap.refresh();
}

function keyPressed() {
  if (keyCode === SPACE_KEY) {
    let nearbyManagers = managers.filter(manager => {
      let managerPosition = {
        x: manager.character.x,
        y: manager.character.y
      }
      let karenPosition = {
        x: karen.character.x,
        y: karen.character.y
      }

      let xDistance = Math.floor(managerPosition.x) - Math.floor(karenPosition.x);
      let yDistance = Math.floor(managerPosition.y) - Math.floor(karenPosition.y);
      let totalDistance = Math.sqrt(xDistance ** 2 + yDistance ** 2);

      return totalDistance <= 1;
    });

    nearbyManagers.forEach(manager => {
      karen.battler.attack(manager);

      if (!manager.battler.isDead()) manager.battler.attack(karen);
      else {
        // Karen gets manager exp
        karen.battler.gainExperience(manager.battler.exp);
        // Debug
        console.log(karen.battler.exp);

        // Remove manager from main managers list
        let managerIndex = managers.indexOf(manager);
        managers.splice(managerIndex, 1);
      }
    });
    
    if (managers.length === 0) {
      welcomeDialogue.nextLine();
    }
  }
}


