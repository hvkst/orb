// Not using preload here, to avoid loadingscreen
function loadBefore() {
  font = loadFont("fonts/MPLUSROUNDED1C-BOLD.TTF");
  // sounds
  bgmusic = loadSound("sounds/background2.mp3");
  minimize = loadSound("sounds/minimize.wav");
  maximize = loadSound("sounds/maximize.wav");
  bop = loadSound("sounds/bop.wav");
  succes = loadSound("sounds/succes.wav");
  gameover = loadSound("sounds/gameover.wav");
  infobop = loadSound("sounds/infobop.wav");
}

function setup() {
  createCanvas(750, 900);
  loadBefore();
  drawVolumeSlider();
  resetSketch(true, 0);
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
    // debugging();
  }
}

// Spwawns new level
function spawnNewLevel() {
  if (levelCounter === 0) spawnLevelOne();
  if (levelCounter === 1) spawnLevelTwo();
  if (levelCounter === 2) spawnLevelThree();
  if (levelCounter === 3) spawnLevelFour();
  if (levelCounter === 4) spawnLevelFive();
  if (levelCounter === 5) spawnLevelSix();
  if (levelCounter === 6) spawnLevelSeven();
}

// Filters and updates the RandomParticleArray
function updateRandomParticles() {
  randomParticles = randomParticles.filter((particle) => {
    particle.update();
    particle.move();
    return !particle.collided;
  });

  if (randomParticles.length < 20) {
    for (let i = 0; i < 1; i++) {
      randomParticles.push(new RandomParticle());
    }
  }
}

// Filters and updates the RandomParticleArray
function updateThings() {
  thingsArray.forEach((thing) => {
    thing.update();
  });

  thingsArray = thingsArray.filter((particle) => {
    return !particle.collided;
  });
}

function updateObstacleAndParticles() {
  updateRandomParticles();
  updateThings();
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

// Level Spawning
function spawnLevelOne() {
  if (toggle) {
    // box left
    thingsArray.push(new Obstacle(-20, 400, width / 2 - 32, 20));
    thingsArray.push(new Obstacle(-20, 200, width / 2 - 20, 20));
    thingsArray.push(new Obstacle(0, 220, 20, 180));
    thingsArray.push(new Obstacle(width / 2 - 100, 220, 20, 45));
    thingsArray.push(new Obstacle(width / 2 - 100, 355, 20, 45));
    thingsArray.push(new Obstacle(width / 2 - 100, 420, 20, 350));
    thingsArray.push(new TextInfo(width / 2 - 250, 340, 340, 90, levelOneInfoA, 300, 20));
    thingsArray.push(new TextInfo(width - 430, height - 320, 300, 90, levelOneInfoB, 300, 0));

    thingsArray.push(new Obstacle(175, 600, 100, 20));
    // box right
    thingsArray.push(new Obstacle(width - width / 2 + 52, 400, width / 2 - 32, 20));
    thingsArray.push(new Obstacle(width - width / 2 + 40, 200, width / 2 - 20, 20));
    thingsArray.push(new Obstacle(width - 20, 220, 20, 180));
    thingsArray.push(new Obstacle(width / 2 + 100, 220, 20, 35));
    thingsArray.push(new Obstacle(width / 2 + 100, 365, 20, 35));
    thingsArray.push(new MovingObstacle(0, 120, 240, 80, width / 2 + 20, 115, 1.5));

    thingsArray.push(new TextInfo(5, 109, 275, 90, levelOneInfoC, 275, 0));
    // three
    thingsArray.push(new Obstacle(-20, 0, 250, 20));
    thingsArray.push(new Obstacle(width / 2, 0, width / 2 + 30, 20));
    thingsArray.push(new Obstacle(width / 2 + 80, 20, 20, 180));
    thingsArray.push(new Obstacle(width / 2 - 180, 20, 20, 60));

    // LevelEnd
    thingsArray.push(new LevelFinish(-20, -100, width + 20, 20, 115, 18, 1));
    // Particles from top to bottom
    thingsArray.push(new GrowParticle(width - 100, 100, 30, 20));
    thingsArray.push(new GrowParticle(0 + 100, 100, 30, 20));
    thingsArray.push(new ShrinkParticle(width - 100, 300, 20, 10));
    thingsArray.push(new ShrinkParticle(0 + 100, 300, 20, 10));
    thingsArray.push(new ShrinkParticle(width - 100, height - 410, 20, 10));
    thingsArray.push(new ShrinkParticle(0 + 100, height - 410, 20, 10));
    toggle = false;
  }
}

function spawnLevelTwo() {
  gameSpeed = 2.5;
  if (toggle) {
    thingsArray.push(new TextInfo(width / 2 - 275, -5, 420, 80, levelTwoInfo, 400, 10));
    // One
    thingsArray.push(new MovingObstacle(width, 107, 150, 6, width, 160, 3));
    thingsArray.push(new MovingObstacle(width - 950, 107, 150, 6, width - 450, 160, 3));
    thingsArray.push(new Obstacle(-10, 100, width - 150, 20));
    thingsArray.push(new Obstacle(width - 30, 100, 60, 20));
    // Two
    thingsArray.push(new MovingObstacle(140, -43, 200, 6, 140, 60, 2));
    thingsArray.push(new MovingObstacle(-300, -43, 200, 6, -180, 60, 2));
    thingsArray.push(new Obstacle(140, -50, width - 100, 20));
    thingsArray.push(new Obstacle(0, -160, 20, 260));
    thingsArray.push(new Obstacle(width - 20, -160, 20, 260));
    thingsArray.push(new ShrinkParticle(80, 40, 20, 10));
    thingsArray.push(new ShrinkParticle(80, -60, 20, 10));
    // Three

    thingsArray.push(new MovingObstacle(width - 300, -173, 100, 6, width - 300, 200, 5));
    thingsArray.push(new Obstacle(-10, -180, width - 190, 20));
    thingsArray.push(new ShrinkParticle(width - 150, -105, 20, 10));
    thingsArray.push(new ShrinkParticle(width - 300, -105, 20, 10));
    thingsArray.push(new ShrinkParticle(width - 450, -105, 20, 10));
    // Box right
    thingsArray.push(new Obstacle(width - 100, -280, 20, 120));
    thingsArray.push(new Obstacle(width - 80, -180, 120, 20));
    thingsArray.push(new ShrinkParticle(width - 50, -220, 20, 10));
    // Four
    thingsArray.push(new ShrinkParticle(50, -220, 20, 10));
    thingsArray.push(new Obstacle(110, -280, width - 100, 20));
    thingsArray.push(new Obstacle(-10, -280, 70, 20));
    // Five
    thingsArray.push(new Obstacle(-10, -360, width - 200, 20));
    thingsArray.push(new Obstacle(0, -340, 20, 60));
    // Second box right
    // vert
    thingsArray.push(new Obstacle(width - 90, -440, 20, 100));
    thingsArray.push(new Obstacle(width - 160, -500, 20, 220));
    thingsArray.push(new Obstacle(width - 20, -440, 20, 160));
    // hori
    thingsArray.push(new Obstacle(width - 90, -440, 150, 20));
    thingsArray.push(new ShrinkParticle(width - 45, -320, 20, 10));
    thingsArray.push(new GrowParticle(width - 45, -390, 20, 10));
    // Six
    thingsArray.push(new Obstacle(width - 240, -500, 250, 20));
    thingsArray.push(new Obstacle(-10, -500, width - 260, 20));
    thingsArray.push(new ShrinkParticle(500, -420, 20, 10));
    thingsArray.push(new ShrinkParticle(50, -450, 20, 10));
    // vert
    thingsArray.push(new Obstacle(0, -440, 20, 80));
    thingsArray.push(new Obstacle(80, -480, 20, 80));
    thingsArray.push(new Obstacle(160, -440, 20, 80));
    thingsArray.push(new Obstacle(240, 20 - 500, 20, 80));
    thingsArray.push(new Obstacle(320, -440, 20, 80));
    thingsArray.push(new Obstacle(400, 20 - 500, 20, 80));

    thingsArray.push(new LevelFinish(-20, -600, width + 20, 20, 15, 30, 1));

    toggle = false;
  }
}

function spawnLevelThree() {
  gameSpeed = 3.5;
  if (toggle) {
    thingsArray.push(new TextInfo(width / 2 - 150, 100, 300, 60, levelThreeInfoA, 300, 0));
    thingsArray.push(new TextInfo(width / 2 - 150, 0, 300, 60, levelThreeInfoB, 300, 0));
    // SideWalls
    thingsArray.push(new Obstacle(0, -1800, 20, 2000));
    thingsArray.push(new Obstacle(width - 20, -1800, 20, 2000));

    thingsArray.push(new LevelFinish(-20, -1820, width + 40, 20, 145, 8, 1));
    for (let i = 0; i < 15; i++) {
      thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-50, -1600)), 20, 10));
      thingsArray.push(new ShrinkParticle(width / 2 + round(random(-300, 300)), round(random(-200, -1600)), 20, 10));
      thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-300, -1600)), 20, 10));
      thingsArray.push(new ShrinkParticle(width / 2 + round(random(-300, 300)), round(random(-300, -1750)), 20, 10));
    }
    for (let i = 0; i < 13; i++) {
      thingsArray.push(new GrowParticle(width / 2 + round(random(-300, 300)), round(random(-500, -1750)), 20, 10));
    }

    for (let i = -100; i > -1800; i -= 400) {
      thingsArray.push(new MovingObstacle(random(140, 700), i, 50, 15, width / 2 - 25, 325, random(1, 3)));
    }
  }
  toggle = false;
}

function spawnLevelFour() {
  // Level Four ist still upside down here
  gameSpeed = 3;
  if (toggle) {
    // // finish box
    // // up&down
    thingsArray.push(new LevelFinish(240, -740, 120, 20, 245, 50, 0));
    // left&right
    thingsArray.push(new LevelFinish(200, -740, 20, 220, 245, 50, 1));
    thingsArray.push(new LevelFinish(380, -740, 20, 220, 245, 50, 0));
    // up
    thingsArray.push(new Obstacle(-20, -500, 240, 20));
    thingsArray.push(new Obstacle(width - 370, -500, width + 20, 20));
    // down
    thingsArray.push(new LevelFinish(200, -100, 180, 20, 45, 110, 0));
    // left
    thingsArray.push(new Obstacle(200, -480, 20, 500));
    // // right
    thingsArray.push(new Obstacle(380, -480, 20, 500));
    // left
    // right
    thingsArray.push(new MovingObstacle(440, -460, 180, 15, 220, 220, 2));
    thingsArray.push(new MovingObstacle(0, -160, 180, 15, 220, 220, 2));
    //
    for (let i = 2; i <= 6; i++) {
      thingsArray.push(new ShrinkParticle(width - 280, i * 100 - 600, 20, 10));
      thingsArray.push(new ShrinkParticle(130, i * 100 - 600, 20, 10));
    }

    thingsArray.push(new GrowParticle(300, -200, 50, 100));

    for (let i = 0; i < 10; i++) {
      thingsArray.push(new GrowParticle(random(250, 350), random(-70, -90) - 600, 20, 10));
    }
    toggle = false;
  }
}

function spawnLevelFive() {
  gameSpeed = 3.5;
  if (toggle) {
    thingsArray.push(new Obstacle(-20, -760, width / 2 + 160, 20));
    thingsArray.push(new Obstacle(width / 2 + 180, -760, width / 2 - 160, 20));
    thingsArray.push(new MovingObstacle(0, -765, 100, 5, 325, 330, 2));
    thingsArray.push(new MovingObstacle(-300, -765, 100, 5, 325, 330, 2.5));
    thingsArray.push(new MovingObstacle(-600, -765, 100, 5, 325, 330, 3));
    thingsArray.push(new MovingObstacle(0, -850, 200, 5, 275, 275, 4));
    thingsArray.push(new MovingObstacle(-750, -900, 200, 5, 275, 275, 4));

    thingsArray.push(new Obstacle(-20, -700, width / 2 - 200, 20));
    thingsArray.push(new Obstacle(width / 2 - 180, -700, width / 2 + 200, 20));
    thingsArray.push(new MovingObstacle(-100, -680, 100, 5, 325, 330, 2));
    thingsArray.push(new MovingObstacle(500, -680, 100, 5, 325, 330, 2));

    thingsArray.push(new Obstacle(-20, -600, width / 2 + 200, 20));
    thingsArray.push(new Obstacle(width / 2 + 220, -600, width / 2 - 200, 20));
    thingsArray.push(new MovingObstacle(200, -580, 100, 5, 325, 330, 2));

    thingsArray.push(new Obstacle(-20, -500, width / 2 - 200, 20));
    thingsArray.push(new Obstacle(width / 2 - 180, -500, width / 2 + 200, 20));
    thingsArray.push(new MovingObstacle(-100, -480, 100, 5, 325, 330, 2));

    thingsArray.push(new Obstacle(-20, -400, width / 2, 20));
    thingsArray.push(new Obstacle(width / 2 + 20, -400, width / 2, 20));
    thingsArray.push(new MovingObstacle(500, -380, 100, 5, 325, 330, 2));

    thingsArray.push(new Obstacle(-20, -300, width / 2 - 50, 20));
    thingsArray.push(new Obstacle(width / 2 + 70, -300, width / 2 - 50, 20));

    for (let i = 1; i <= 5; i++) {
      thingsArray.push(new ShrinkParticle((width / 12) * i, 0 - i * 50, 30, 20)); //-100
      thingsArray.push(new ShrinkParticle(width - (width / 12) * i, 0 - i * 50, 30, 20));
    }
    thingsArray.push(new ShrinkParticle(width / 2, -300, 30, 20));
    thingsArray.push(new LevelFinish(-20, -1000, width + 40, 20, 25, 50, 1));
  }
  toggle = false;
}

function spawnLevelSix() {
  gameSpeed = 4;
  if (toggle) {
    thingsArray.push(new TextInfo(width / 2 - 160, -100, 280, 90, levelSixInfoA, 250, 15));
    thingsArray.push(new TextInfo(width / 2 - 120, -600, 280, 135, levelSixInfoB, 250, 15));
    thingsArray.push(new TextInfo(width / 2 - 285, -900, 630, 90, levelSixInfoC, 600, 15));

    thingsArray.push(new TextInfo(width / 2 - 200, -1600, 450, 45, levelSixInfoD, 420, 15));
    thingsArray.push(new TextInfo(width / 2 - 50, -2000, 280, 45, levelSixInfoE, 250, 15));

    thingsArray.push(new TextInfo(width / 2 - 140, -2400, 390, 90, levelSixInfoF, 370, 15));
    thingsArray.push(new TextInfo(width / 2 - 140, -2700, 240, 90, levelSixInfoG, 220, 15));
    thingsArray.push(new TextInfo(width / 2 - 140, -3000, 360, 135, levelSixInfoH, 330, 15));
    thingsArray.push(new TextInfo(width / 2 - 140, -3200, 180, 45, levelSixInfoI, 150, 15));
    thingsArray.push(new LevelFinish(-20, -3400, width + 20, 20, 25, 110, 1));
  }
  toggle = false;
}

function spawnLevelSeven() {
  gameSpeed = 8;

  if (thingsArray.length < 8) {
    for (let i = 0; i < 2; i++) {
      thingsArray.push(new ShrinkParticle(random(0, width), random(0, -height), 20, 10));
      thingsArray.push(new GrowParticle(random(0, width), random(0, -height), 20, 10));
    }
    thingsArray.push(new MovingObstacle(-100, random(0, 100), random(50, 100), 5, width / 2 - 50, 350, random(1, 6)));
    thingsArray.push(new MovingObstacle(width + 100, random(-500, -600), random(50, 100), 5, width / 2 - 50, 350, random(1, 6)));

    if (score > 100) {
      for (let i = 0; i < round(score / 200); i++) {
        thingsArray.push(new MovingObstacle(-100, random(0, -1500), random(50, 100), 5, width / 2 - 50, 350, random(6, 8)));
      }
    }
  }
}

// Displays different infos about the game in the bottom left corner
function debugging() {
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
  text(`gameSpeed: ${gameSpeed}`, 10, height - 100);
  text(`FPS ${round(frameRate())}`, 10, height - 80);
  text(`gameStarted ${gameStarted}`, 10, height - 60);
  text(`gameOver ${gameOver}`, 10, height - 40);
  text(`thingsArray.length ${thingsArray.length}`, 10, height - 20);
}
