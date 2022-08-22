// Variables
let colorChange = 100;
let obstacle1; // Looks like I don´t have to do that???
let mid; // needed to get length of right obstacle

let backBgY = 0;
let midBgY = 0;
let gameSpeed = 0;
let randomParticles = [];
let goodParticleArray = [];
let obstacleArray = [];
let score = 0;
let gameStarted = false;
let levelCounter = 0;

let gameOver = false;
let levelHeight = 200;
// Need a gameplay-function her... if game started something.y += gamespeed

// sounds
let minimize, maximize, slime, succes;
let thingsArray;

let toggle = true;
let levelOneInfo = "The 🟢 make oRb shrink, the 🔴 make it grow.";
let levelTwoInfo = "🔴🟢 OK! Let´s get a bit more serious!🔴🟢";
let levelThreeInfo = "🔴🟢 Get them all! Don´t get to small!!🔴🟢";

function preload() {
  minimize = loadSound("./sounds/minimize.wav");
  maximize = loadSound("./sounds/maximize.wav");
  slime = loadSound("./sounds/slime.wav");
  succes = loadSound("./sounds/succes.wav");
  gameover = loadSound("./sounds/gameover.wav");
}

function setup() {
  createCanvas(750, 900);
  // Background
  bgImg1 = loadImage("images/three.png");
  bgImg2 = loadImage("images/two.png");
  player = new Player();
  createThings();
  spawnRandomParticles();
  spawnRandomParticles();
}

function draw() {
  background(80);
  drawBackground();
  updatePlayer();
  updateObstacleAndParticles();
  gameStatus();
  spawnLevelTwo();
  spawnLevelThree();

  // debugging
  fill(255);
  textAlign(LEFT);
  textSize(15);
  text(`level ${levelCounter}`, 10, height - 180);
  text(`baseD ${player.baseD}`, 10, height - 160);
  text(`x ${player.x} | y ${player.y}`, 10, height - 140);
  text(`toggle ${toggle}`, 10, height - 120);
  text(`Random particles: ${randomParticles.length}`, 10, height - 100);
  text(`Score: ${score}`, 10, height - 80);
  text(`gameStarted ${gameStarted}`, 10, height - 60);
  text(`gameOver ${gameOver}`, 10, height - 40);
  text(`thingsArray.length ${thingsArray.length}`, 10, height - 20);
}

function updateObstacleAndParticles() {
  updateThingsArray();
  updateRandomParticles();
  updateObstacles();
}

function updateObstacles() {
  thingsArray.forEach((elem) => {
    elem.update();
  });
}

function updatePlayer() {
  player.update();
  player.move();
  player.limitMovement();
}

function drawBackground() {
  image(bgImg1, 0, backBgY, 750, 1000);
  image(bgImg1, 0, backBgY - 1000, 750, 1000);

  image(bgImg2, 0, midBgY, 750, 1000);
  image(bgImg2, 0, midBgY - 1000, 750, 1000);

  backBgY += gameSpeed / 4;
  midBgY += gameSpeed / 2;

  if (backBgY >= height + 100) {
    backBgY = 0;
  }
  if (midBgY >= height + 100) {
    midBgY = 0;
  }
}

function updateRandomParticles() {
  randomParticles = randomParticles.filter((particle) => {
    particle.update();
    particle.move();
    return !particle.collided;
  });

  thingsArray = thingsArray.filter((particle) => {
    return !particle.collided;
  });

  if (randomParticles.length < 30) {
    for (let i = 0; i < 20; i++) {
      randomParticles.push(new RandomParticle());
    }
  }
}

function updateThingsArray() {
  thingsArray = thingsArray.filter((thing) => {
    return !thing.past;
  });
}

function createThings() {
  thingsArray = [
    // Level 0
    // one
    // box left
    new Obstacle(-20, 400, width / 2 - 32, 20),
    new Obstacle(-20, 200, width / 2 - 20, 20),
    new Obstacle(0, 220, 20, 180),
    new Obstacle(width / 2 - 100, 220, 20, 45),
    new Obstacle(width / 2 - 100, 355, 20, 45),
    new Obstacle(width / 2 - 100, 420, 20, 350),
    new TextInfo(50, height - 300, width - 100, 80, levelOneInfo),
    // box right
    new Obstacle(width - width / 2 + 52, 400, width / 2 - 32, 20),
    new Obstacle(width - width / 2 + 40, 200, width / 2 - 20, 20),
    new Obstacle(width - 20, 220, 20, 180),
    new Obstacle(width / 2 + 100, 220, 20, 40),
    new Obstacle(width / 2 + 100, 360, 20, 40),

    new Obstacle(width / 2 + 80, 20, 20, 180),
    // three
    new Obstacle(width - width / 2 + 40, 0, width / 2 - 40, 20),
    // LevelEnd
    new LevelFinish(-20, -100, width + 20, 20, 115, 6),
    new GrowParticle(width - 100, 100, 30, 20),
    new GrowParticle(0 + 100, 100, 30, 20),
    new ShrinkParticle(width - 100, 300, 20, 10, 0),
    new ShrinkParticle(0 + 100, 300, 20, 10, 0),
    new ShrinkParticle(width - 100, height - 410, 20, 10, 0),
    new ShrinkParticle(0 + 100, height - 410, 20, 10, 0),
  ];
}

function spawnLevelTwo() {
  if (levelCounter === 1 && toggle == false) {
    thingsArray.push(new TextInfo(50, height - 400, width - 100, 80, levelTwoInfo));
    // Level 2
    // One
    thingsArray.push(new Obstacle(-10, 600 - levelHeight, width - 150, 20));
    thingsArray.push(new Obstacle(width - 30, 600 - levelHeight, 60, 20));

    // Two
    thingsArray.push(new Obstacle(140, 450 - levelHeight, width - 100, 20));
    thingsArray.push(new Obstacle(0, 340 - levelHeight, 20, 260));
    thingsArray.push(new Obstacle(width - 20, 340 - levelHeight, 20, 260));
    thingsArray.push(new ShrinkParticle(60, 540 - levelHeight, 20, 10));
    thingsArray.push(new ShrinkParticle(60, 540 - levelHeight, 20, 10));

    // Three
    thingsArray.push(new Obstacle(-10, 320 - levelHeight, width - 190, 20));
    thingsArray.push(new ShrinkParticle(width - 150, 400 - levelHeight, 20, 10));
    thingsArray.push(new ShrinkParticle(width - 150, 400 - levelHeight, 20, 10));
    thingsArray.push(new ShrinkParticle(width - 150, 400 - levelHeight, 20, 10));

    // Box right
    thingsArray.push(new Obstacle(width - 100, 220 - levelHeight, 20, 120));
    thingsArray.push(new Obstacle(width - 80, 320 - levelHeight, 90, 20));
    thingsArray.push(new ShrinkParticle(width - 50, 280 - levelHeight, 20, 10));

    // Four
    thingsArray.push(new ShrinkParticle(50, 280 - levelHeight, 20, 10));
    thingsArray.push(new Obstacle(110, 220 - levelHeight, width - 100, 20));
    thingsArray.push(new Obstacle(-10, 220 - levelHeight, 70, 20));

    // Five
    thingsArray.push(new Obstacle(-10, 140 - levelHeight, width - 200, 20));
    thingsArray.push(new Obstacle(0, 160 - levelHeight, 20, 60));

    // Second box right
    // vert
    thingsArray.push(new Obstacle(width - 90, 60 - levelHeight, 20, 100));
    thingsArray.push(new Obstacle(width - 160, 0 - levelHeight, 20, 220));
    thingsArray.push(new Obstacle(width - 20, 60 - levelHeight, 20, 160));
    // hori
    thingsArray.push(new Obstacle(width - 90, 60 - levelHeight, 150, 20));
    thingsArray.push(new ShrinkParticle(width - 50, 100 - levelHeight, 20, 10));

    // Six
    thingsArray.push(new Obstacle(width - 240, 0 - levelHeight, 250, 20));
    thingsArray.push(new Obstacle(-10, 0 - levelHeight, width - 260, 20));
    // new ShrinkParticle(50, 80 - levelHeight, 20, 10),
    thingsArray.push(new ShrinkParticle(500, 80 - levelHeight, 20, 10));
    thingsArray.push(new ShrinkParticle(50, -50 - levelHeight, 20, 10));
    // vert
    thingsArray.push(new Obstacle(0, 60 - levelHeight, 20, 80));
    thingsArray.push(new Obstacle(80, 20 - levelHeight, 20, 80));
    thingsArray.push(new Obstacle(160, 60 - levelHeight, 20, 80));
    thingsArray.push(new Obstacle(240, 20 - levelHeight, 20, 80));
    thingsArray.push(new Obstacle(320, 60 - levelHeight, 20, 80));
    thingsArray.push(new Obstacle(400, 20 - levelHeight, 20, 80));

    thingsArray.push(new LevelFinish(-20, -100 - levelHeight, width + 20, 20, 15, 20));

    toggle = true;
    // levelCounter++;
  } // else if (levelCounter === 2) thingsArray.push(new TextInfo(50, 50, width - 100, 100, levelThreeInfo));
}

function spawnLevelThree() {
  if (levelCounter === 2) {
    thingsArray.push(new TextInfo(50, 50, width - 100, 80, levelThreeInfo));
    // SideWalls
    thingsArray.push(new Obstacle(0, -1800, 20, 2000));
    thingsArray.push(new Obstacle(width - 20, -1800, 20, 2000));

    thingsArray.push(new LevelFinish(-20, -1820, width + 40, 20, 145, 4));
    // && thingsArray < x (maybe in the very end of development)
    for (let i = 0; i < 50; i++) {
      // Could use more logic here to make it harder...
      thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-100, -1600)), 20, 10));
      thingsArray.push(new ShrinkParticle(width / 2 + round(random(-300, 300)), round(random(-200, -1600)), 20, 10));
      thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-300, -1600)), 20, 10));
      thingsArray.push(new ShrinkParticle(width / 2 + round(random(-300, 300)), round(random(-500, -1750)), 20, 10));
    }
    for (let i = 0; i < 13; i++) {
      thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-1200, -1750)), 20, 10));
    }
    levelCounter++;
  } // else if (levelCounter === 2) thingsArray.push(new TextInfo(50, 50, width - 100, 100, levelThreeInfo));
}

function spawnRandomParticles() {
  for (let i = 0; i < 50; i++) {
    randomParticles[i] = new RandomParticle();
  }
}
