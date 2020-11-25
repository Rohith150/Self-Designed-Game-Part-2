const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var playImg, pauseImg, backgroundImg, boardImg, bowImg, arrowImg, pauseScreenImg;

var playButton, pauseButton, pauseScreen, homeButton, retryButton, resumeButton;

var bow, arrow, board, sling;

var  arrowCollider, f;

var gameState = "menu";

var score = 0;

function preload() {
  playImg = loadImage('Images/play.png');
  pauseImg = loadImage('Images/pause.png');
  backgroundImg = loadImage('Images/background.png');
  boardImg = loadImage('Images/board.png');
  bowImg = loadImage('Images/bow.png');
  arrowImg = loadImage('Images/arrow.png')
  pauseScreenImg = loadImage('Images/pauseScreen.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  playButton = createSprite(windowWidth / 2, windowHeight / 2 + 200);
  playButton.addImage(playImg);

    arrow = new Arrow(windowWidth / 6, windowHeight / 1.5, 250, 70, PI/2);
  //sling = new Sling();
}

function draw() {
  background(backgroundImg);
  
  if (mousePressedOver(playButton) && gameState === "menu") {
    playButton.destroy();
    play();
  }

  if (mousePressedOver(pauseButton) && gameState === "play") {
    pause();
  }

  if (mousePressedOver(homeButton) && gameState === "pause") {
    gameState = "menu";
    bow.destroy();
    //board.destroy();
    pauseScreen.destroy();
    homeButton.destroy();
    resumeButton.destroy();
    playButton = createSprite(windowWidth / 2, windowHeight / 2 + 200);
    playButton.addImage(playImg);
  }

  if (mousePressedOver(resumeButton) && gameState === "pause") {
    gameState = "play";
    pauseScreen.destroy();
    pauseScreen.destroy();
    homeButton.destroy();
    resumeButton.destroy();
    pauseButton = createSprite(windowWidth / 1.05, windowHeight / 9.5);
    pauseButton.addImage(pauseImg);
    pauseButton.scale = 1;
  }

  if(gameState === "play"){
    arrow.display();
  }

  drawSprites();

  if (gameState === "menu") {
    fill("Brown");
    textSize(200);
    text("Archery", windowWidth / 3.5, windowHeight / 3.0);
  }

  if(gameState === "play"){
    textSize(30);
    text("score: " + score, windowWidth/ 1.3, windowHeight/ 9.5);
  }
}

function play() {
  gameState = "play";
  pauseButton = createSprite(windowWidth / 1.05, windowHeight / 9.5);
  pauseButton.addImage(pauseImg);
  pauseButton.scale = 1;
  bow = createSprite(windowWidth / 6, windowHeight / 1.5);
  bow.addImage(bowImg);
  bow.scale = 0.4;
  board = createSprite(windowWidth/1.5, windowHeight/2);
  board.addImage(boardImg);
  arrowCollider = createSprite(0,0,1,1);
  arrowCollider.visible = false;
  arrowCollider.x = arrow.body.position.x+106.8;
  arrowCollider.y = arrow.body.position.y+0.8;
}

function pause() {
  gameState = "pause";
  pauseButton.destroy();
  pauseScreen = createSprite(windowWidth / 2, windowHeight / 2);
  pauseScreen.addImage(pauseScreenImg);
  homeButton = createSprite(windowWidth / 1.81, windowHeight / 1.83, 50, 50);
  homeButton.setCollider("circle", 0, 0, 25);
  homeButton.visible = false;
  resumeButton = createSprite(windowWidth / 2, windowHeight / 1.86, 60, 60);
  resumeButton.setCollider("circle", 0, -3, 30);
  resumeButton.visible = false;
}
