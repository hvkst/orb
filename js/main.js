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
  obstacle1 = new Obstacle(0, 200, ow + 25, 200);
  obstacle2 = new Obstacle(width, 200, width - ow - 25, 200);

  obstacle3 = new Obstacle(0, 400, ow, 400);
  obstacle4 = new Obstacle(width, 400, width - ow, 400);

  particle1 = new Particle(width - 50, height - 50, 20);
  particle2 = new Particle(0 + 50, height - 50, 20);
  particle3 = new Particle(width - 50, height - 410, 20);
  particle4 = new Particle(0 + 50, height - 410, 20);
}

function draw() {
  background(120);
  obstacle1.update();
  // line(0, 200, width - 75, 200);
  obstacle2.update();
  obstacle3.update();
  obstacle4.update();
  particle1.update();
  particle2.update();
  particle3.update();
  particle4.update();
  player.update();
  player.move();
  player.limitMovement();
  // obstacle5.update();
  // obstacle6.update();
}
