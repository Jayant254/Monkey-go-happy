var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running ,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstaclesGroup;
var survivalTime=0;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600, 355);
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  //console.log(ground.x);
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  survivalTime=0;
}


function draw() {
background("lightblue");
text("Survival Time: "+ survivalTime, 500,50);

if (gameState===PLAY){
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 2*survivalTime/100);
  
if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
  }
  
    monkey.velocityY = monkey.velocityY + 0.1 
if(ground.x>0){
  ground.x=ground.width/2;
  }
  if(keyDown("space")){
    monkey.velocityY= -14;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
  }
  if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  foodF();
  obstaclesF();
}
  else if (gameState === END) {
   ground.velocityX = 0;
   monkey.velocityY = 0; 
   foodGroup.velocityX = 0;
  
  }
  
  monkey.collide(ground);
  console.log(frameCount);
  drawSprites();
}

function foodF(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,200,40,10);
    banana.y = Math.round(random(250,150));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 230;
    
    foodGroup.add(banana);
  }
}

function obstaclesF(){
  
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,330,10,40);
    obstacle.velocityX = -(6 + 3*survivalTime/100);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 230;

    obstaclesGroup.add(obstacle);
  }
}