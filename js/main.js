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
let levelHeight = 900;
// Need a gameplay-function her... if game started something.y += gamespeed

// sounds
let minimize, maximize, slime, succes;
let thingsArray;

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
  spawnMoreGoodParticles();

  // debugging
  fill(255);
  textAlign(LEFT);
  text(`Random particles existing: ${randomParticles.length}`, 10, height - 100);
  text(`Score: ${score}`, 10, height - 80);
  text(`gameStarted ${gameStarted}`, 10, height - 60);
  text(`gameOver ${gameOver}`, 10, height - 40);
  text(`thingsArray.length ${thingsArray.length}`, 10, height - 20);
}

function updateObstacleAndParticles() {
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

function createThings() {
  thingsArray = [
    // Level 1
    // one
    // box left
    new Obstacle(0, 400, width / 2 - 52, 20),
    new Obstacle(0, 200, width / 2 - 40, 20),
    new Obstacle(0, 220, 20, 180),
    new Obstacle(width / 2 - 100, 220, 20, 45),
    new Obstacle(width / 2 - 100, 355, 20, 45),
    new Obstacle(width / 2 - 100, 420, 20, 350),
    // new Obstacle(width / 2 - 200, 600, 100, 20),
    // box right
    new Obstacle(width - width / 2 + 52, 400, width / 2 - 52, 20),
    new Obstacle(width - width / 2 + 40, 200, width / 2 - 40, 20),
    new Obstacle(width - 20, 220, 20, 180),
    new Obstacle(width / 2 + 100, 220, 20, 40),
    new Obstacle(width / 2 + 100, 360, 20, 40),

    new Obstacle(width / 2 + 80, 20, 20, 180),
    // three
    new Obstacle(width - width / 2 + 40, 0, width / 2 - 40, 20),
    // LevelEnd
    new LevelFinish(-20, -100, width + 20, 20, 115),
    new GrowParticle(width - 100, 100, 30, 20),
    new GrowParticle(0 + 100, 100, 30, 20),
    new ShrinkParticle(width - 100, 300, 20, 10),
    new ShrinkParticle(0 + 100, 300, 20, 10),
    new ShrinkParticle(width - 100, height - 410, 20, 10),
    new ShrinkParticle(0 + 100, height - 410, 20, 10),

    // Level 2
    // One
    new Obstacle(-10, 600 - levelHeight, width - 150, 20),
    new Obstacle(width - 30, 600 - levelHeight, 60, 20),

    // Two
    new Obstacle(140, 450 - levelHeight, width - 100, 20),
    new Obstacle(0, 340 - levelHeight, 20, 260),
    new ShrinkParticle(60, 540 - levelHeight, 20, 10),
    new ShrinkParticle(60, 540 - levelHeight, 20, 10),

    // Three
    new Obstacle(-10, 320 - levelHeight, width - 190, 20),
    new ShrinkParticle(width - 150, 400 - levelHeight, 20, 10),
    new ShrinkParticle(width - 150, 400 - levelHeight, 20, 10),
    new ShrinkParticle(width - 150, 400 - levelHeight, 20, 10),

    // Box right
    new Obstacle(width - 100, 220 - levelHeight, 20, 120),
    new Obstacle(width - 80, 320 - levelHeight, 90, 20),
    new ShrinkParticle(width - 50, 280 - levelHeight, 20, 10),

    // Four
    new ShrinkParticle(50, 280 - levelHeight, 20, 10),
    new Obstacle(110, 220 - levelHeight, width - 100, 20),
    new Obstacle(-10, 220 - levelHeight, 70, 20),

    // Five
    new Obstacle(-10, 140 - levelHeight, width - 200, 20),
    new Obstacle(0, 160 - levelHeight, 20, 60),

    // Second box right
    // vert
    new Obstacle(width - 90, 60 - levelHeight, 20, 100),
    new Obstacle(width - 160, 0 - levelHeight, 20, 220),
    new Obstacle(width - 20, 60 - levelHeight, 20, 160),
    // hori
    new Obstacle(width - 90, 60 - levelHeight, 150, 20),
    // new ShrinkParticle(width - 50, 100 - levelHeight, 20, 10),

    // Six
    new Obstacle(width - 240, 0 - levelHeight, 250, 20),
    new Obstacle(-10, 0 - levelHeight, width - 260, 20),
    new ShrinkParticle(50, 80 - levelHeight, 20, 10),
    new ShrinkParticle(500, 80 - levelHeight, 20, 10),
    new ShrinkParticle(50, -50 - levelHeight, 20, 10),
    // vert
    new Obstacle(0, 60 - levelHeight, 20, 80),
    new Obstacle(80, 20 - levelHeight, 20, 80),
    new Obstacle(160, 60 - levelHeight, 20, 80),
    new Obstacle(240, 20 - levelHeight, 20, 80),
    new Obstacle(320, 60 - levelHeight, 20, 80),
    new Obstacle(400, 20 - levelHeight, 20, 80),

    new LevelFinish(-20, -100 - levelHeight, width + 20, 20, 15),

    // level 3
    new Obstacle(0, -3200, 20, 2000),
    new Obstacle(width - 20, -3200, 20, 2000),
  ];
}

function spawnRandomParticles() {
  for (let i = 0; i < 50; i++) {
    randomParticles[i] = new RandomParticle();
  }
}

function spawnMoreGoodParticles() {
  // LoopCounter not working yet... how to stop...after 3 Rounds or so?
  let loopCounter = 0;
  if (levelCounter === 2 && loopCounter < 199 && thingsArray.length < 60) {
    for (let i = 0; i < 50; i++) {
      thingsArray.push(new GrowParticle(width / 2 + round(random(-350, 350)), round(random(400, -400)), 20, 10));
      thingsArray.push(new ShrinkParticle(width / 2 + round(random(-350, 350)), round(random(300, -450)), 20, 10));
      loopCounter++;
    }
    for (let i = 0; i < 3; i++) {
      thingsArray.push(new GrowParticle(width / 2 + round(random(-350, 350)), round(random(200, -450)), 20, 10));
    }
  }
}
