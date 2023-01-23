// Variables
let colorChange = 100; // Changing color of different things
let slider; // VolumeSlider

let backBgY = 0; // Background position
let midBgY = 0;
let gameSpeed = 0;
let randomParticles = []; // Array for background particles
let thingsArray = []; // Array for everything else

let score = 0;
let levelCounter = 0;
let toggle = true; // Used to trigger things only once (game start, sounds)
let gameOverToggle1 = true; // Used to trigger things only once (game start, sounds)
let gameOverToggle2 = true; // Used to trigger things only once (game start, sounds)

let gameStarted = false; // Used to start movement of everything except player
let gameOver = false;
let startGame = false; // Used to play sound on start screen only once
let restartGame = false; // Used to play sound on game over screen only once

// sounds
let minimize, maximize, bop, succes, gameover, infobop, bgmusic;

// StartScreen
let circleD = 0; // circle grows from here
let grow; // used for shrinking/growing of orb
let growAmount = 1; // Speed with wich orb "breathes"
let startScreenCounter; // Used for timing
let alphaCount; // used for fading in of text
let GameOverAlphaCount; // used for fading in of text
let startScreenShow = true; // if true startScreen is shown, don´t change. To show no StartScreen use resetSketch in setup
let white = 255; // Used to change colors on start and game over screen
let black = 0;

// GameOverScreen
let gameOverCircleD = 2000; // circle shrinks from here

// InfoTexts
const levelOneInfoA = 'The 🟢 make orb shrink, the 🔴 make it grow.';
const levelOneInfoB = 'Use the arrow keys to move orb arround.';
const levelOneInfoC = 'You do not want to touch these... --> ';

const levelTwoInfo = 'OK! const´s get a bit more serious! You want to hurry up here.';

const levelThreeInfoA = '🟢 Get them all! 🔴';
const levelThreeInfoB = 'Don´t get too small!!';

const levelSixInfoA = "That´s it, you did it! This was 'orb' 🎉";
const levelSixInfoB = 'I hope you enjoyed the ride. Creating it was a lot of fun 😊';
const levelSixInfoC = 'But I need a break now. Some sleep, maybe Netflix... Have a nice day! Thanks for playing!';

const levelSixInfoD = 'Too bad, Better Call Saul is over...';
const levelSixInfoE = 'But what a final... 🤯';

const levelSixInfoF = 'Hey! So you are still here. o-k-a-y...';
const levelSixInfoG = 'You wanna play some more?';
const levelSixInfoH = 'Here, I have a bonus level. Nothing to achieve there, except fo staying alive 😅';
const levelSixInfoI = 'Have fun!';
