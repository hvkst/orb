// Starts the game and checks for game over
function gameStatus() {
  if (player.y < height / 2) {
    gameStarted = true;
  }

  if (gameStarted) {
    gameSpeed = 1.5;
  }

  if (gameOver) {
    black = 0; // Using these for color-effect on both start and gameover screen, thus the reset
    white = 255;
    gameover.play();
    bgmusic.stop();
  }
}

function drawScore() {
  push();
  strokeWeight(1);
  fill(200, 200, 0, colorChange / 2 + 50);
  circle(42, 42, 40);
  textAlign(CENTER);
  textFont(font);
  fill(0);
  textSize(18);
  text(`${score}`, 42, 39);
  pop();
}

function drawVolumeSlider() {
  slider = createSlider(0, 0.6, 0.3, 0.02);
  slider.position(50, 40);
  slider.style("width", "80px");
}

function startScreen() {
  push();
  textFont(font);
  background(0);
  fill(white);
  circle(width / 2, height / 2, circleD);
  fill(255);
  textAlign(CENTER);

  if (startScreenCounter > 10) {
    // startScreenCounter starts when "orb" appeared
    textSize(75);
    fill(black, alphaCount * 2); // using alphaCount to have a fading in
    text("orb", width / 2, height / 2 + 25);
  }

  if (startScreenCounter > 50) {
    textSize(40);
    fill(white);
    text("Press 'orb' to play", width / 2, height / 2 + 300);
  }
  pop();
  // Growing/shrinking cycle
  if (circleD > 200) {
    grow = false;
  }
  if (circleD < 181) {
    grow = true;
  }
  // different tempo at smallest and biggest size
  if (grow == true) {
    if (circleD > 197) {
      circleD += growAmount / 4;
      startScreenCounter++;
    } else if (circleD < 180) {
      circleD += growAmount;
    } else {
      circleD += growAmount / 2;
      if (startScreenCounter > 0) alphaCount += 2; // "orb" fades in, after some time
    }
  } else {
    if (circleD < 183) {
      circleD -= growAmount / 4;
    } else {
      circleD -= growAmount / 3;
    }
  }
}

function gameOverScreen() {
  push();
  textFont(font);
  background(255);
  fill(black);
  noStroke();
  circle(width / 2, height / 2, gameOverCircleD);

  if (gameOverCircleD > 200) {
    gameOverCircleD -= 10;
  }

  if (gameOverCircleD < 201) {
    textSize(40);
    fill(white);
    textAlign(CENTER);
    fill(white, GameOverAlphaCount);
    text("Game", width / 2, height / 2 - 25);
    text("Over", width / 2, height / 2 + 15);
    fill(black);
    text(`Your Score is ${score}`, width / 2, height / 2 + 150);

    if (GameOverAlphaCount < -600) {
      textSize(75);
      fill(white);
      text("orb", width / 2, height / 2 - 15);
      if (gameOverToggle1) {
        infobop.play();
        gameOverToggle1 = false;
      }
    }

    if (GameOverAlphaCount < -1600) {
      if (gameOverToggle2) {
        infobop.play();
        gameOverToggle2 = false;
      }
      textSize(40);
      fill(black);
      text("Press 'orb' to play again", width / 2, height / 2 + 300);
      textSize(17);
      text("Which is not important, because this", width / 2, height / 2 + 190);
      text("is just a silly game on the internet ♡", width / 2, height / 2 + 212);
    }
  }
  pop();
  if (gameOverCircleD > 199) {
    grow = false;
  }
  if (gameOverCircleD < 181) {
    grow = true;
  }

  if (grow == true) {
    if (gameOverCircleD > 197) {
      gameOverCircleD += growAmount / 4;
    } else {
      gameOverCircleD += growAmount / 2;
      GameOverAlphaCount -= 25;
    }
  } else {
    if (gameOverCircleD < 183) {
      gameOverCircleD -= growAmount / 4;
    } else {
      gameOverCircleD -= growAmount / 3;
    }
  }
}
// Checks for mouse clicks during start and game over screen
function mousePressed() {
  if (startScreenShow && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 - 100 && mouseY < height / 2 + 100) {
    black = 255;
    white = 0;
    if (!startGame) {
      infobop.play();
      setTimeout(fromStartToGame, 2000);
      startGame = true;
    }
  }
  if (gameOver && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 - 100 && mouseY < height / 2 + 100) {
    black = 255;
    white = 0;
    if (!restartGame) {
      infobop.play();
      setTimeout(fromGameOverToGame, 2000);
      restartGame = true;
    }
  }
}

// used in mousePressed
function fromStartToGame() {
  startScreenShow = false;
  bgmusic.loop();
}

// used in mousePressed
function fromGameOverToGame() {
  bgmusic.loop();
  resetSketch(false, 0);
}
// Resets the game to starting conditions. Two Arguments: Show start screen and level to start in (for developing)
function resetSketch(startScreenShow, startInLevel) {
  // For detailed comments on variables check variables.js
  white = 255;
  black = 0;
  score = 0;
  gameStarted = false;
  startGame = false;
  levelCounter = startInLevel;
  gameSpeed = 0;
  gameOver = false;
  thingsArray = [];
  toggle = true;
  gameOverScreenToggle1 = true;
  gameOverScreenToggle2 = true;
  // Startscreen
  circleD = 0;
  grow = true;
  growAmount = 1;
  startScreenCounter = 0;
  alphaCount = 0;
  GameOverAlphaCount = 255;
  startScreenShow = startScreenShow;

  // GameOverScreen
  gameOverCircleD = 2000;

  // Background
  bgImg1 = loadImage("images/three.png");
  bgImg2 = loadImage("images/two.png");
  player = new Player();
}
