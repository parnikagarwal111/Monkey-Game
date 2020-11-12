
var monkey , monkey_running;
var banana ,bananaImage,bananaGroup;
var obstacle, obstacleImage,obstacleGroup;
var FoodGroup;
var ground;
var score;

function preload(){
  
//monkey animation
  monkey_running =                   
  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
//banana and obstacle animation
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(450,450);
  score=0;
  
  //creating monkey
    monkey=createSprite(30,355,10,10);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.1;
  
  //creating ground
    ground=createSprite(225,380,450,10);
    ground.velocityX=-4;
    ground.x=ground.width/2;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  
  //clear background
  background("green");
  
  //invisible ground
  ground.visible=false;
  
  
  //score display
  fill("black");
  text("Score "+ score, 370,50);
  
  //score increase
  if(monkey.isTouching(bananaGroup)){
  score=score+2;
  bananaGroup.destroyEach();
  }
  
  //scale reset
  if(monkey.isTouching(obstacleGroup)){
    monkey.scale=0.1; 
    obstacleGroup.destroyEach();
  }
  
  //monkey collide
    monkey.collide(ground);
  
  //ground velocity
    if (ground.x < 250){
        ground.x = ground.width/2;
      }
  
  //jump when the space key is pressed
    if(keyDown("space") && monkey.y>=300) {
        monkey.velocityY = -12;
      }
  
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  //banana
    if(frameCount%80===0){
    banana=createSprite(200,Math.round(random(190,220)),10,10);
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;
    bananaGroup.add(banana); 
   }
  
  // obstacle
    if (frameCount % 300 === 0){
     obstacle = createSprite(400,355,10,40);
     obstacle.addImage(obstacleImage);
     obstacle.scale=0.1;
     obstacle.velocityX = -4;
     obstacle.lifetime=200;
     obstacleGroup.add(obstacle);
    }
  
  //monkey size increase
  switch(score){
    case 10: monkey.scale=0.12;
    break;
    case 20: monkey.scale=0.14;
    break;
    case 30: monkey.scale=0.16;
    break;
    case 40: monkey.scale=0.18;
    break;
    default:break;
  }
  
  drawSprites();
}






