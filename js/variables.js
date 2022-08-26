// Variables
let colorChange = 100;

let backBgY = 0;
let midBgY = 0;
let gameSpeed = 0;
let randomParticles = [];
let thingsArray = [];

let score = 0;
let levelCounter = 0;
let toggle = true;

let gameStarted = false;
let gameOver = false;
let startGame = false;
let restartGame = false;

// sounds
let minimize, maximize, bop, succes, gameover, infobop, bgmusic;

// StartScreen
let circleD = 0;
let grow = true;
let growAmount = 1;
let startScreenCounter = 0;
let alphaCount = 0;
let startScreenShow = true;
let white = 255;
let black = 0;

// GameOverScreen
let gameOverCircleD = 2000;

// InfoTexts
let levelOneInfoA = "The 🟢 make orb shrink, the 🔴 make it grow.";
let levelOneInfoB = "Use the arrow keys to move orb arround.";
let levelOneInfoC = "You do not want to touch these... --> ";
let levelTwoInfo = "OK! Let´s get a bit more serious! You want to hurry up here.";
let levelThreeInfoA = "🟢 Get them all! 🔴";
let levelThreeInfoB = "Don´t get too small!!";
let levelSixInfoA = "That´s it, you did it! This was 'orb' 🎉";
let levelSixInfoB = "I hope you enjoyed the ride. Creating it was a lot of fun 😊";
let levelSixInfoC = "But I need a break now. Some sleep, maybe Netflix... Have a nice day! Thanks for playing!";

let levelSixInfoD = "Too bad, Better Call Saul is over...";
let levelSixInfoE = "But what a final... 🤯";

let levelSixInfoF = "Hey! So you are still here. o-k-a-y...";
let levelSixInfoG = "You wanna play some more?";
let levelSixInfoH = "Here, I have a bonus level. Nothing to achieve there, except fo staying alive 😅";
let levelSixInfoI = "Have fun!";
