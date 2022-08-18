// nothing here yet
// Trying to move a ball trough a hole ;D

// Variables
let colorChange = 150;
let obstacle1; // Looks like I don´t have to do that???
let ow; // needed to get length of right obstacle
let hit = false;

//
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  player = new Player();
  ow = width / 2 - 75;
  obstacle1 = new Obstacle(0, 200, ow + 35, 200);
  obstacle2 = new Obstacle(width, 200, width - ow - 35, 200);

  obstacle3 = new Obstacle(0, 400, ow + 28, 400);
  obstacle4 = new Obstacle(width, 400, width - ow - 28, 400);

  growParticle1 = new GrowParticle(width - 100, 100, 30, 20);
  growParticle2 = new GrowParticle(0 + 100, 100, 30, 20);

  shrinkParticle1 = new ShrinkParticle(width - 100, 300, 20, 10);
  shrinkParticle2 = new ShrinkParticle(0 + 100, 300, 20, 10);

  shrinkParticle3 = new ShrinkParticle(width - 100, height - 410, 20, 10);
  shrinkParticle4 = new ShrinkParticle(0 + 100, height - 410, 20, 10);
}

function draw() {
  background(80);
  updatePlayer();
  updateObstacleAndParticles();
}

function updateObstacleAndParticles() {
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
}

function updatePlayer() {
  player.update();
  player.move();
  player.limitMovement();
}
