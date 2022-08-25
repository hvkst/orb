// Variables
let colorChange = 100;
let white = 255;
let black = 0;

let backBgY = 0;
let midBgY = 0;
let gameSpeed = 0;
let randomParticles = [];
let thingsArray = [];
let score = 0;
let gameStarted = false;
let levelCounter = 0;

let gameOver = false;
let levelHeight = 500;
// Need a gameplay-function here... if game started something.y += gamespeed

// sounds
let minimize, maximize, slime, succes, gameover, infobop, bgmusic;

let toggle = true;

let levelOneInfoA = "The 🟢 make oRb shrink, the 🔴 make it grow.";
let levelOneInfoB = "Use the arrow keys to move oRb arround.";
let levelOneInfoC = "You do not want to touch these... --> ";
let levelTwoInfo = "OK! Let´s get a bit more serious! You want to hurry up here.";
let levelThreeInfoA = "🟢 Get them all! 🔴";
let levelThreeInfoB = "Don´t get too small!!";

let circleD = 0;
let grow = true;
let growAmount = 1;
let startScreenCounter = 0;
let alphaCount = 0;

let startScreenShow = true; //debuggen startscreen already declared... where?
// ###
// GameOverScreen
let gameOverCircleD = 2000;

function preload() {
  bgmusic = loadSound("./sounds/background2.mp3");
}
// Not using preload here, to avoid loadingscreen
function loadBefore() {
  font = loadFont("fonts/MPLUSROUNDED1C-BOLD.TTF");
  // sounds
  minimize = loadSound("./sounds/minimize.wav");
  maximize = loadSound("./sounds/maximize.wav");
  slime = loadSound("./sounds/slime.wav");
  succes = loadSound("./sounds/succes.wav");
  gameover = loadSound("./sounds/gameover.wav");
  infobop = loadSound("./sounds/infobop.wav");
}

function setup() {
  createCanvas(750, 900);
  loadBefore();
  slider = createSlider(0.2, 1, 0.5, 0.02);
  slider.position(50, 50);
  slider.style("width", "80px");
  resetSketch(true);
}

function draw() {
  outputVolume(slider.value());
  if (startScreenShow) {
    startScreen();
  } else if (gameOver) {
    gameOverScreen();
  } else if (!startScreenShow) {
    background(30);
    background(colorChange, 0, 255, colorChange / 10);
    drawBackground();
    updatePlayer();
    updateObstacleAndParticles();
    gameStatus();
    drawScore();
    spawnNewLevel();
    // debugging
    fill(0, 200);
    push();
    noStroke();
    rect(-10, height - 200, 190, 350, 0, 100, 0, 0);
    pop();
    fill(255);
    textAlign(LEFT);
    textSize(15);
    text(`level ${levelCounter}`, 10, height - 180);
    text(`toggle ${toggle}`, 10, height - 160);
    text(`x ${player.x} | y ${player.y}`, 10, height - 140);
    text(`baseD ${player.baseD}`, 10, height - 120);
    // text(`Random particles: ${randomParticles.length}`, 10, height - 100);
    text(`slider ${slider.value()}`, 10, height - 80);
    text(`gameStarted ${gameStarted}`, 10, height - 60);
    text(`gameOver ${gameOver}`, 10, height - 40);
    text(`thingsArray.length ${thingsArray.length}`, 10, height - 20);
  }
}

function spawnNewLevel() {
  if (levelCounter == 0) spawnLevelOne();
  if (levelCounter == 1) spawnLevelTwo();
  if (levelCounter == 2) spawnLevelThree();
  if (levelCounter == 3) spawnLevelFour();
}

function updateObstacleAndParticles() {
  // updateThingsArray();
  updateRandomParticles();
  updateThings();
}

function updateThings() {
  thingsArray.forEach((thing) => {
    thing.update();
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

  backBgY += gameSpeed / 6;
  midBgY += gameSpeed / 4;

  if (backBgY >= height + 100) {
    backBgY = 0;
  }
  if (midBgY >= height + 100) {
    midBgY = 0;
  }
}

function drawScore() {
  textAlign(CENTER);
  fill(255);
  textSize(20);
  text(`${score}`, 20, 20);
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

  if (randomParticles.length < 40) {
    for (let i = 0; i < 10; i++) {
      randomParticles.push(new RandomParticle());
    }
  }
}

// function updateThingsArray() {
//   thingsArray = thingsArray.filter((thing) => {
//     return !thing.past;
//   });
// }

function spawnLevelOne() {
  if (toggle == false) {
    // box left
    thingsArray.push(new Obstacle(-20, 400, width / 2 - 32, 20));
    thingsArray.push(new Obstacle(-20, 200, width / 2 - 20, 20));
    thingsArray.push(new Obstacle(0, 220, 20, 180));
    thingsArray.push(new Obstacle(width / 2 - 100, 220, 20, 45));
    thingsArray.push(new Obstacle(width / 2 - 100, 355, 20, 45));
    thingsArray.push(new Obstacle(width / 2 - 100, 420, 20, 350));
    thingsArray.push(new TextInfo(width / 2 - 200, 270, 400, 80, levelOneInfoA, 400));
    thingsArray.push(new TextInfo(width - 430, height - 320, 350, 80, levelOneInfoB, 350));

    // box right
    thingsArray.push(new Obstacle(width - width / 2 + 52, 400, width / 2 - 32, 20));
    thingsArray.push(new Obstacle(width - width / 2 + 40, 200, width / 2 - 20, 20));
    thingsArray.push(new Obstacle(width - 20, 220, 20, 180));
    thingsArray.push(new Obstacle(width / 2 + 100, 220, 20, 40));
    thingsArray.push(new Obstacle(width / 2 + 100, 360, 20, 40));
    thingsArray.push(new MovingObstacle(0, 120, 240, 80, width / 2 + 20, 115, 1));
    // format!###############################################################
    thingsArray.push(new TextInfo(5, 120, 275, 80, levelOneInfoC, 275));
    // three
    thingsArray.push(new Obstacle(-20, 0, 250, 20));
    thingsArray.push(new Obstacle(width / 2, 0, width / 2 + 30, 20));
    thingsArray.push(new Obstacle(width / 2 + 80, 20, 20, 180));
    thingsArray.push(new Obstacle(width / 2 - 180, 20, 20, 60));

    // LevelEnd
    thingsArray.push(new LevelFinish(-20, -100, width + 20, 20, 115, 20, 1));
    // Particles from top to bottom
    thingsArray.push(new GrowParticle(width - 100, 100, 30, 20));
    thingsArray.push(new GrowParticle(0 + 100, 100, 30, 20));
    thingsArray.push(new ShrinkParticle(width - 100, 300, 20, 10));
    thingsArray.push(new ShrinkParticle(0 + 100, 300, 20, 10));
    thingsArray.push(new ShrinkParticle(width - 100, height - 410, 20, 10));
    thingsArray.push(new ShrinkParticle(0 + 100, height - 410, 20, 10));
    toggle = true;
  }
}

// function createThings() {
//   //original
//   thingsArray = [
//     // moving obstacle testing
//     // new MovingObstacle(x, y, w, h, baseX, baseY, moveX, moveY)
//     // Level 0
//     // box left
//     new Obstacle(-20, 400, width / 2 - 32, 20),
//     new Obstacle(-20, 200, width / 2 - 20, 20),
//     new Obstacle(0, 220, 20, 180),
//     new Obstacle(width / 2 - 100, 220, 20, 45),
//     new Obstacle(width / 2 - 100, 355, 20, 45),
//     new Obstacle(width / 2 - 100, 420, 20, 350),
//     new TextInfo(width / 2 - 200, 270, 400, 80, levelOneInfoA, 400),
//     new TextInfo(width - 430, height - 320, 350, 80, levelOneInfoB, 350),

//     // box right
//     new Obstacle(width - width / 2 + 52, 400, width / 2 - 32, 20),
//     new Obstacle(width - width / 2 + 40, 200, width / 2 - 20, 20),
//     new Obstacle(width - 20, 220, 20, 180),
//     new Obstacle(width / 2 + 100, 220, 20, 40),
//     new Obstacle(width / 2 + 100, 360, 20, 40),
//     new MovingObstacle(0, 120, 240, 80, width / 2 + 20, 115, 1),
//     // format!###############################################################
//     new TextInfo(5, 120, 275, 80, levelOneInfoC, 275),
//     // three
//     new Obstacle(-20, 0, 250, 20),
//     new Obstacle(width / 2, 0, width / 2 + 30, 20),
//     new Obstacle(width / 2 + 80, 20, 20, 180),
//     new Obstacle(width / 2 - 180, 20, 20, 60),

//     // LevelEnd
//     new LevelFinish(-20, -100, width + 20, 20, 115, 20, 1),
//     // Particles from top to bottom
//     new GrowParticle(width - 100, 100, 30, 20),
//     new GrowParticle(0 + 100, 100, 30, 20),
//     new ShrinkParticle(width - 100, 300, 20, 10),
//     new ShrinkParticle(0 + 100, 300, 20, 10),
//     new ShrinkParticle(width - 100, height - 410, 20, 10),
//     new ShrinkParticle(0 + 100, height - 410, 20, 10),
//   ];
// }

function spawnLevelTwo() {
  // Some problems here with moving obstacles... outside of canvas left
  if (levelCounter === 1 && toggle == false) {
    thingsArray.push(new TextInfo(width / 2 - 275, 495 - levelHeight, 500, 80, levelTwoInfo, 480));
    // Level 2
    // One
    thingsArray.push(new MovingObstacle(width, 607 - levelHeight, 150, 6, width, 160, 3));
    thingsArray.push(new MovingObstacle(width - 850, 607 - levelHeight, 150, 6, width - 450, 160, 3));
    thingsArray.push(new Obstacle(-10, 600 - levelHeight, width - 150, 20));
    thingsArray.push(new Obstacle(width - 30, 600 - levelHeight, 60, 20));

    // Two
    thingsArray.push(new MovingObstacle(140, 457 - levelHeight, 200, 6, 140, 60, 2));
    thingsArray.push(new MovingObstacle(-300, 457 - levelHeight, 200, 6, -180, 60, 2));
    thingsArray.push(new Obstacle(140, 450 - levelHeight, width - 100, 20));
    thingsArray.push(new Obstacle(0, 340 - levelHeight, 20, 260));
    thingsArray.push(new Obstacle(width - 20, 340 - levelHeight, 20, 260));
    thingsArray.push(new ShrinkParticle(80, 540 - levelHeight, 20, 10));
    thingsArray.push(new ShrinkParticle(80, 440 - levelHeight, 20, 10));

    // Three
    thingsArray.push(new MovingObstacle(width, 327 - levelHeight, 150, 6, width, 200, 5));
    thingsArray.push(new Obstacle(-10, 320 - levelHeight, width - 190, 20));
    thingsArray.push(new ShrinkParticle(width - 150, 395 - levelHeight, 20, 10));
    thingsArray.push(new ShrinkParticle(width - 300, 395 - levelHeight, 20, 10));
    thingsArray.push(new ShrinkParticle(width - 450, 395 - levelHeight, 20, 10));

    // Box right
    thingsArray.push(new Obstacle(width - 100, 220 - levelHeight, 20, 120));
    thingsArray.push(new Obstacle(width - 80, 320 - levelHeight, 120, 20));
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
    thingsArray.push(new ShrinkParticle(width - 45, 180 - levelHeight, 20, 10));
    thingsArray.push(new GrowParticle(width - 45, 110 - levelHeight, 20, 10));

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

    thingsArray.push(new LevelFinish(-20, -100 - levelHeight, width + 20, 20, 15, 30, 1));

    toggle = true;
  }
}

function spawnLevelThree() {
  if (levelCounter === 2 && toggle == false) {
    thingsArray.push(new TextInfo(width / 2 - 150, 100, 300, 60, levelThreeInfoA, 300));
    thingsArray.push(new TextInfo(width / 2 - 150, 0, 300, 60, levelThreeInfoB, 300));
    // SideWalls
    thingsArray.push(new Obstacle(0, -1800, 20, 2000));
    thingsArray.push(new Obstacle(width - 20, -1800, 20, 2000));

    thingsArray.push(new LevelFinish(-20, -1820, width + 40, 20, 145, 8, 1));
    for (let i = 0; i < 25; i++) {
      // Could use more logic here to make it harder...
      thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-100, -1600)), 20, 10));
      thingsArray.push(new ShrinkParticle(width / 2 + round(random(-300, 300)), round(random(-150, -1600)), 20, 10));
      thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-300, -1600)), 20, 10));
      thingsArray.push(new ShrinkParticle(width / 2 + round(random(-300, 300)), round(random(-300, -1750)), 20, 10));
    }
    for (let i = 0; i < 13; i++) {
      thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-1000, -1750)), 20, 10));
    }
    thingsArray.push(new MovingObstacle(560, -100, 50, 15, width / 2 - 25, 325, 2));
    thingsArray.push(new MovingObstacle(140, -500, 50, 15, width / 2 - 25, 225, 2));
    thingsArray.push(new MovingObstacle(210, -900, 50, 15, width / 2 - 25, 275, 2));
    thingsArray.push(new MovingObstacle(420, -1300, 50, 15, width / 2 - 25, 225, 2));
    thingsArray.push(new MovingObstacle(700, -1700, 50, 15, width / 2 - 25, 325, 2));
    toggle = true;
  }
}

function spawnLevelFour() {
  if (levelCounter === 3 && toggle == false) {
    // // Level 4 testing
    // // finish box
    // // up&down
    thingsArray.push(new LevelFinish(240, -140, 120, 20, 245, 50, 0));
    // left&right
    thingsArray.push(new LevelFinish(200, -140, 20, 220, 245, 50, 0));
    thingsArray.push(new LevelFinish(380, -140, 20, 220, 245, 50, 0));
    // up
    thingsArray.push(new Obstacle(-20, 100, 240, 20));
    thingsArray.push(new Obstacle(width - 370, 100, width + 20, 20));
    // down
    thingsArray.push(new LevelFinish(200, 500, 180, 20, 45, 110, 0));
    // left
    thingsArray.push(new Obstacle(200, 120, 20, 500));
    // // right
    thingsArray.push(new Obstacle(380, 120, 20, 500));
    // left
    // right
    //
    thingsArray.push(new MovingObstacle(440, 140, 180, 15, 220, 220, 2));
    thingsArray.push(new MovingObstacle(0, 440, 180, 15, 220, 220, 2));
    //
    for (let i = 2; i <= 6; i++) {
      thingsArray.push(new ShrinkParticle(width - 280, i * 100, 20, 10));
      thingsArray.push(new ShrinkParticle(130, i * 100, 20, 10));
    }

    thingsArray.push(new GrowParticle(300, 400, 50, 100));

    for (let i = 0; i < 10; i++) {
      thingsArray.push(new GrowParticle(random(250, 350), random(-70, -90), 20, 10));
    }
  }
}

function spawnRandomParticles() {
  for (let i = 0; i < 50; i++) {
    randomParticles[i] = new RandomParticle();
  }
}

// level two
// function createThings() {
//   thingsArray.push(new TextInfo(width / 2 - 275, 640 - levelHeight, 550, 80, levelTwoInfo, 550));
//   // Level 2
//   // One
//   thingsArray.push(new MovingObstacle(width, 607 - levelHeight, 150, 6, width, 160, 3));
//   thingsArray.push(new MovingObstacle(width - 950, 607 - levelHeight, 150, 6, width - 450, 160, 3));
//   thingsArray.push(new Obstacle(-10, 600 - levelHeight, width - 150, 20));
//   thingsArray.push(new Obstacle(width - 30, 600 - levelHeight, 60, 20));

//   // Two
//   thingsArray.push(new MovingObstacle(140, 457 - levelHeight, 200, 6, 140, 60, 2));
//   thingsArray.push(new MovingObstacle(-300, 457 - levelHeight, 200, 6, -180, 60, 2));
//   thingsArray.push(new Obstacle(140, 450 - levelHeight, width - 100, 20));
//   thingsArray.push(new Obstacle(0, 340 - levelHeight, 20, 260));
//   thingsArray.push(new Obstacle(width - 20, 340 - levelHeight, 20, 260));
//   thingsArray.push(new ShrinkParticle(80, 540 - levelHeight, 20, 10));
//   thingsArray.push(new ShrinkParticle(80, 440 - levelHeight, 20, 10));

//   // Three
//   thingsArray.push(new MovingObstacle(width, 327 - levelHeight, 150, 6, width, 200, 5));
//   thingsArray.push(new Obstacle(-10, 320 - levelHeight, width - 190, 20));
//   thingsArray.push(new ShrinkParticle(width - 150, 395 - levelHeight, 20, 10));
//   thingsArray.push(new ShrinkParticle(width - 300, 395 - levelHeight, 20, 10));
//   thingsArray.push(new ShrinkParticle(width - 450, 395 - levelHeight, 20, 10));

//   // Box right
//   thingsArray.push(new Obstacle(width - 100, 220 - levelHeight, 20, 120));
//   thingsArray.push(new Obstacle(width - 80, 320 - levelHeight, 160, 20));
//   thingsArray.push(new ShrinkParticle(width - 50, 280 - levelHeight, 20, 10));

//   // Four
//   thingsArray.push(new ShrinkParticle(50, 280 - levelHeight, 20, 10));
//   thingsArray.push(new Obstacle(110, 220 - levelHeight, width - 100, 20));
//   thingsArray.push(new Obstacle(-10, 220 - levelHeight, 70, 20));

//   // Five
//   thingsArray.push(new Obstacle(-10, 140 - levelHeight, width - 200, 20));
//   thingsArray.push(new Obstacle(0, 160 - levelHeight, 20, 60));

//   // Second box right
//   // vert
//   thingsArray.push(new Obstacle(width - 90, 60 - levelHeight, 20, 100));
//   thingsArray.push(new Obstacle(width - 160, 0 - levelHeight, 20, 220));
//   thingsArray.push(new Obstacle(width - 20, 60 - levelHeight, 20, 160));
//   // hori
//   thingsArray.push(new Obstacle(width - 90, 60 - levelHeight, 150, 20));
//   thingsArray.push(new ShrinkParticle(width - 45, 180 - levelHeight, 20, 10));
//   thingsArray.push(new GrowParticle(width - 45, 110 - levelHeight, 20, 10));

//   // Six
//   thingsArray.push(new Obstacle(width - 240, 0 - levelHeight, 250, 20));
//   thingsArray.push(new Obstacle(-10, 0 - levelHeight, width - 260, 20));
//   // new ShrinkParticle(50, 80 - levelHeight, 20, 10),
//   thingsArray.push(new ShrinkParticle(500, 80 - levelHeight, 20, 10));
//   thingsArray.push(new ShrinkParticle(50, -50 - levelHeight, 20, 10));
//   // vert
//   thingsArray.push(new Obstacle(0, 60 - levelHeight, 20, 80));
//   thingsArray.push(new Obstacle(80, 20 - levelHeight, 20, 80));
//   thingsArray.push(new Obstacle(160, 60 - levelHeight, 20, 80));
//   thingsArray.push(new Obstacle(240, 20 - levelHeight, 20, 80));
//   thingsArray.push(new Obstacle(320, 60 - levelHeight, 20, 80));
//   thingsArray.push(new Obstacle(400, 20 - levelHeight, 20, 80));

//   thingsArray.push(new LevelFinish(-20, -100 - levelHeight, width + 20, 20, 15, 20));
// }

// level three
// function createThings() {
//   if (toggle == true) {
//     thingsArray.push(new TextInfo(100, 200, 560, 60, levelThreeInfo, 560));

//     // SideWalls
//     thingsArray.push(new Obstacle(0, -1800, 20, 2000));
//     thingsArray.push(new Obstacle(width - 20, -1800, 20, 2000));

//     thingsArray.push(new LevelFinish(-20, -1820, width + 40, 20, 145, 4));
//     // && thingsArray < x (maybe in the very end of development)
//     for (let i = 0; i < 50; i++) {
//       // Could use more logic here to make it harder...
//       thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-100, -1600)), 20, 10));
//       thingsArray.push(new ShrinkParticle(width / 2 + round(random(-300, 300)), round(random(-200, -1600)), 20, 10));
//       thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-300, -1600)), 20, 10));
//       thingsArray.push(new ShrinkParticle(width / 2 + round(random(-300, 300)), round(random(-500, -1750)), 20, 10));
//     }
//     for (let i = 0; i < 13; i++) {
//       thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-1200, -1750)), 20, 10));
//     }
//     thingsArray.push(new MovingObstacle(560, -100, 50, 15, width / 2 - 25, 325, 2));
//     thingsArray.push(new MovingObstacle(140, -500, 50, 15, width / 2 - 25, 225, 2));
//     thingsArray.push(new MovingObstacle(210, -900, 50, 15, width / 2 - 25, 275, 2));
//     thingsArray.push(new MovingObstacle(420, -1300, 50, 15, width / 2 - 25, 225, 2));
//     thingsArray.push(new MovingObstacle(700, -1700, 50, 15, width / 2 - 25, 325, 2));
//     toggle = false;
//     // levelCounter++;
//   }
// }

//
// function createThings() {
//   player.baseD = 145;
//   // // Level 4 testing
//   // // finish box
//   // // up&down
//   thingsArray.push(new LevelFinish(240, -140, 120, 20, 245, 50, 0));
//   // left&right
//   thingsArray.push(new LevelFinish(200, -140, 20, 220, 245, 50, 0));
//   thingsArray.push(new LevelFinish(380, -140, 20, 220, 245, 50, 0));
//   // up
//   thingsArray.push(new Obstacle(-20, 100, 240, 20));
//   thingsArray.push(new Obstacle(width - 370, 100, width + 20, 20));
//   // down
//   thingsArray.push(new LevelFinish(200, 500, 180, 20, 45, 110, 0));
//   // left
//   thingsArray.push(new Obstacle(200, 120, 20, 500));
//   // // right
//   thingsArray.push(new Obstacle(380, 120, 20, 500));
//   // left
//   // right
//   //
//   thingsArray.push(new MovingObstacle(440, 140, 180, 15, 220, 220, 2));
//   thingsArray.push(new MovingObstacle(0, 440, 180, 15, 220, 220, 2));
//   //
//   for (let i = 2; i <= 6; i++) {
//     thingsArray.push(new ShrinkParticle(width - 280, i * 100, 20, 10));
//     thingsArray.push(new ShrinkParticle(130, i * 100, 20, 10));
//   }

//   thingsArray.push(new GrowParticle(300, 400, 50, 100));

//   for (let i = 0; i < 10; i++) {
//     thingsArray.push(new GrowParticle(random(250, 350), random(-70, -90), 20, 10));
//   }
// }
