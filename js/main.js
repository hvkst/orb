// Variables
let colorChange = 120;
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
// Need a gameplay-function her... if game started something.y += gamespeed

// sounds
let minimize, maximize, slime, succes;
let thingsArray;

function preload() {
  minimize = loadSound("./sounds/minimize.wav");
  maximize = loadSound("./sounds/maximize.wav");
  slime = loadSound("./sounds/slime.wav");
  succes = loadSound("./sounds/succes.wav");
}

function setup() {
  createCanvas(750, 900);
  // Background
  bgImg1 = loadImage("images/three.png");
  bgImg2 = loadImage("images/two.png");
  player = new Player();
  createThings();
  spawnRandomParticles();
  // SpawnParticles here
  for (let i = 0; i < 100; i++) {
    randomParticles[i] = new RandomParticle();
  }
}

function draw() {
  background(80);
  drawBackground();
  updatePlayer();
  updateObstacleAndParticles();
  text(`Random particles existing: ${randomParticles.length}`, 200, 10);
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

  if (randomParticles.length < 5) {
    for (let i = 0; i < 10; i++) {
      randomParticles.push(new RandomParticle());
    }
  }
}

function createThings() {
  thingsArray = [
    new Obstacle(0, 200, width / 2 - 40, 20),
    new Obstacle(width - width / 2 + 40, 200, width / 2 - 40, 20),

    new Obstacle(0, 400, width / 2 - 52, 20),
    new Obstacle(width - width / 2 + 52, 400, width / 2 - 52, 20),
    // Maze Testing // x y w h
    new Obstacle(width / 2 - 100, 217, 20, 185),
    new Obstacle(width / 2 + 80, 17, 20, 185),
    new Obstacle(width - width / 2 + 40, 0, width / 2 - 40, 20),
    // LevelEnd
    new LevelFinish(-20, -100, width + 20, 20),

    new GrowParticle(width - 100, 100, 30, 20),
    new GrowParticle(0 + 100, 100, 30, 20),

    new ShrinkParticle(width - 100, 300, 20, 10),
    new ShrinkParticle(0 + 100, 300, 20, 10),

    new ShrinkParticle(width - 100, height - 410, 20, 10),
    new ShrinkParticle(0 + 100, height - 410, 20, 10),
  ];
}

function spawnRandomParticles() {
  for (let i = 0; i < 100; i++) {
    randomParticles[i] = new RandomParticle();
  }
}
