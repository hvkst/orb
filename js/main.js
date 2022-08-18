// nothing here yet
// Trying to move a ball trough a hole ;D

// Variables
let colorChange = 120;
let obstacle1; // Looks like I don´t have to do that???
let mid; // needed to get length of right obstacle
let hit = false;
let backBgY = 0;
let midBgY = 0;
let gameSpeed = 0;
let randomParticles = [];
let goodParticleArray = [];
let obstacleArray = [];
let score = 0;
let gameStarted = false;
// Need a gameplay-function her... if game started something.y += gamespeed

//
function setup() {
  createCanvas(750, 900);
  // Background
  bgImg1 = loadImage("images/three.png");
  bgImg2 = loadImage("images/two.png");

  player = new Player();
  finish = new Finish();
  mid = width / 2; // need this to place obstacle on other side // x y w h
  obstacle1 = new Obstacle(0, 200, mid - 40, 20);
  obstacle2 = new Obstacle(width - mid + 40, 200, mid - 40, 20);

  obstacle3 = new Obstacle(0, 400, mid - 50, 20);
  obstacle4 = new Obstacle(width - mid + 50, 400, mid - 50, 20);
  // Maze Testing // x y w h
  obstacle5 = new Obstacle(mid - 100, 217, 20, 185);
  obstacle6 = new Obstacle(mid + 80, 17, 20, 185);
  obstacle7 = new Obstacle(width - mid + 40, 0, mid - 40, 20);

  growParticle1 = new GrowParticle(width - 100, 100, 30, 20);
  growParticle2 = new GrowParticle(0 + 100, 100, 30, 20);

  shrinkParticle1 = new ShrinkParticle(width - 100, 300, 20, 10);
  shrinkParticle2 = new ShrinkParticle(0 + 100, 300, 20, 10);

  shrinkParticle3 = new ShrinkParticle(width - 100, height - 410, 20, 10);
  shrinkParticle4 = new ShrinkParticle(0 + 100, height - 410, 20, 10);

  for (let i = 0; i < 100; i++) {
    randomParticles[i] = new RandomParticle();
  }
  console.log(randomParticles);
}

function draw() {
  background(80);
  drawBackground();
  updatePlayer();
  updateObstacleAndParticles();

  // console.log(randomParticles);
}

function updateObstacleAndParticles() {
  // Maze Testing
  obstacle5.update();
  obstacle6.update();
  obstacle7.update();

  obstacle1.update();
  obstacle2.update();
  obstacle3.update();
  obstacle4.update();

  growParticle1.update();
  growParticle2.update();

  shrinkParticle1.update();
  shrinkParticle2.update();
  shrinkParticle3.update();
  shrinkParticle4.update();

  for (let i = 0; i < randomParticles.length; i++) {
    randomParticles[i].update();
    randomParticles[i].move();
    if (randomParticles[i].collided == true) {
      randomParticles.splice(i, 1);
    }
    if (randomParticles.length < 1) randomParticles.push(new RandomParticle());
  }
}

function updatePlayer() {
  player.update();
  player.move();
  player.limitMovement();
  finish.update();
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

// function cleanRandomParticlesArray() {
//   randomParticles = randomParticles.filter((elem) => {
//     console.log(elem.collided);
//     elem.collided == false;
//   });
// }
