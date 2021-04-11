var p1,p2,alien1,alien2,alien3;
var blast,blastImage,space,spaceImage;
var boy, boyImage, laserImage;
var shoot = 0;
var score = 0;
var laser,asteroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;


function preload() 
{
//preloading background image
  spaceImage = loadImage("space.jpg");
  
  //preloading sprite images
  boyImage = loadImage("boy.png");
  laserImage = loadImage("laser.png");
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  alien3 = loadImage("alien3.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
 
}

function setup() {  
  canvas = createCanvas(1500, 700);
  
  //add background image
  space = createSprite(500, 0, 500, 500);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);
  
  //adding image for boy 
  boy = createSprite(250,600);
  boy.addImage(boyImage);
  boy.scale = 0.3;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  alienGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
     
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("up") && shoot < 460) {
      laser = createSprite(boy.x,boy.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.2;
      laserGroup.add(laser);
      
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && boy.x < 1400) {
      boy.x = boy.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && boy.x > 50) {
      boy.x = boy.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(alienGroup.isTouching(p2) || alienGroup.isTouching(p1)) {
      alienGroup.destroyEach();
      var blast = createSprite(boy.x,boy.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
     
      boy.destroy();
      gameState = end;
    }
    
    if(alienGroup.isTouching(laserGroup)) {
      alienGroup.destroyEach();
      laserGroup.destroyEach();
     
      score = score + 1;
    }

    aliens();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    // ending of game
    if(alienGroup.isTouching(endline)) {
      alienGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    fill("yellow");
    textSize(100);
    text("GAME OVER!!",200, 350);
    
  }


  if(gameState === instruction) {
    stroke("yellow");
    fill("yellow");
    textSize(35);
    text("  Press the 'up arrow' to shoot.",canvas.width/2-300,canvas.height/2-90);
    text("  Use the right and left arrows to move.",canvas.width/2-300,canvas.height/2-50);
    text("  Press 'spacebar' to start the game.",canvas.width/2-300,canvas.height/2-10);
    
    if(keyDown("space")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}
  

function aliens() {
  if(frameCount % 110 === 0) {
  
    var alien = createSprite(Math.round(random(50,1350)),-20);
    alien.velocityY = (6 + score/10);
    alien.lifetime = 200;
    alien.scale = random(0.4,0.5);
    //alien.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: alien.addImage(alien1);
              alien.setCollider("circle",-80,10,160);
              break;
      case 2: alien.addImage(alien2);
              alien.setCollider("circle",50,0,150);
              break;
      case 3: alien.addImage(alien3);
              alien.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(alien.x);
    alienGroup.add(alien);
  }
}
