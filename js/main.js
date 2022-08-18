// nothing here yet
// Trying to move a ball trough a hole ;D

// Variables
let colorChange = 120;
let obstacle1; // Looks like I don´t have to do that???
let ow; // needed to get length of right obstacle
let hit = false;
let backBgY = 0;
let midBgY = 0;
let gameSpeed = 2;
let randomParticles = [];

//
function setup() {
  createCanvas(750, 900);
  // Background
  bgImg1 = loadImage("images/three.png");
  bgImg2 = loadImage("images/two.png");

  player = new Player();
  ow = width / 2 - 40; // need this to place obstacle on other side // x y w h
  obstacle1 = new Obstacle(0, 200, ow, 20);
  obstacle2 = new Obstacle(width - ow, 200, ow, 20);

  obstacle3 = new Obstacle(0, 400, ow - 10, 20);
  obstacle4 = new Obstacle(width - ow + 10, 400, ow - 10, 20);

  growParticle1 = new GrowParticle(width - 100, 100, 30, 20);
  growParticle2 = new GrowParticle(0 + 100, 100, 30, 20);

  shrinkParticle1 = new ShrinkParticle(width - 100, 300, 20, 10);
  shrinkParticle2 = new ShrinkParticle(0 + 100, 300, 20, 10);

  shrinkParticle3 = new ShrinkParticle(width - 100, height - 410, 20, 10);
  shrinkParticle4 = new ShrinkParticle(0 + 100, height - 410, 20, 10);

  // testParticle1 = new RandomParticle();
  // testParticle2 = new RandomParticle();

  for (let i = 0; i < 100; i++) {
    randomParticles[i] = new RandomParticle();
  }
}

function draw() {
  background(80);
  drawBackground();
  updatePlayer();
  updateObstacleAndParticles();

  // console.log(randomParticles);
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

  for (let i = 0; i < randomParticles.length; i++) {
    randomParticles[i].update();
    randomParticles[i].move();
    if (randomParticles[i].collided == true) {
      randomParticles.splice(i, 1);
    }
    if (randomParticles.length < 10) randomParticles.push(new RandomParticle());
  }
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

// function cleanRandomParticlesArray() {
//   randomParticles = randomParticles.filter((elem) => {
//     console.log(elem.collided);
//     elem.collided == false;
//   });
// }
