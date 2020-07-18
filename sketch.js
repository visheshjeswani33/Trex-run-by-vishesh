var trex, trex_running,trex_die, ground, ground_animation, inground, cloud, cloud_animation, obstracle1, obstracle2,obstracle3, obstracle4, obstracle5, obstracle6, obstraclegroup, cloudgroup, gamestate= "play", restart,restart_animation,gameover,gameover_animation, score, hiscore, jump, die, checkpoint;

function preload(){
  
  trex_running= loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_die= loadAnimation("trex_collided.png");
  ground_animation= loadImage("ground2.png");
  cloud_animation= loadImage("cloud.png");
  obstracle1= loadImage("obstacle1.png");
  obstracle2= loadImage("obstacle2.png");
  obstracle3= loadImage("obstacle3.png");
  obstracle4= loadImage("obstacle4.png");
  obstracle5= loadImage("obstacle5.png");
  obstracle6= loadImage("obstacle6.png");
  restart_animation= loadImage("restart.png");
  gameover_animation= loadImage("gameOver.png");
  jump= loadSound("jump.mp3");
  die= loadSound("die.mp3");
  checkpoint= loadSound("checkPoint.mp3")
}


function setup() {
  createCanvas(600, 300);
  
  trex= createSprite(70,240);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("trex_die", trex_die);
  trex.scale=0.6;
  
  ground= createSprite(300,255);
  ground.addImage(ground_animation);
  
  inground=createSprite(300,265,600,1);
  inground.visible=false;
  
  obstraclegroup= new Group();
  cloudsgroup= new Group();
  
  restart= createSprite(280,140,1,1);
  restart.addImage(restart_animation);
  restart.visible= false;
  restart.scale=0.6;
  
  gameover= createSprite(270,100,1,1);
  gameover.addImage(gameover_animation);
  gameover.scale=0.7;
  gameover.visible= false;
  
  score= 0;
  hiscore=0;
  
  
}

function draw() {
  background(180);
  
  textStyle(BOLD);
  textFont("Algerian");
  text("Score:"+ score, 465,85,textSize(20));
  text("HiScore:"+hiscore,350,85,textSize(20));
  
 
  if(frameCount%4===0&& gamestate==="play"){
    
  score=score+1;
  }
  
  if(gamestate==="play"){
    
     if(keyDown("space")&& trex.y>=236){
   
    trex.velocityY=-10 ;
    jump.play();   
       
  }
   
    trex.velocityY=trex.velocityY+0.5;
    
     ground.velocityX=-3;
    
  if(ground.x<0){
    ground.x= ground.width/2;
     }
    
     spawncloud();
  
  spawnobstracle();
    
  if(obstraclegroup.isTouching(trex)){
     
    gameover.visible=true;
    restart.visible=true;
    die.play();
    
    gamestate= "end";
  } 
  } 
  
  else if(gamestate ===  "end"){
  trex.changeAnimation("trex_die",trex_die);
  ground.velocityX=0;
  obstraclegroup.setVelocityXEach(0);
  cloudsgroup.setVelocityXEach(0);
  trex.velocityY=0;
  }
  
  if(mousePressedOver(restart)){
    
   reset();
   
  }
  
  trex.collide(inground); 
  
  drawSprites();
}

function spawncloud(){
  
  if(frameCount%50===0){
 cloud= createSprite(595,Math.round(random(100,160)));
 cloud.addImage(cloud_animation);
 cloud.velocityX=-5;
 cloud.lifetime=150;
 
 cloud.depth = trex.depth;
 trex.depth = trex.depth + 1;

    cloudsgroup.add(cloud );
  }
}

function spawnobstracle(){
 
  if(frameCount%100===0){
 obstracle= createSprite(595,240);
  obstracle.scale=0.6;
          
 var rand= Math.round(random(1,6));
  
 switch(rand)
 {
     
     case 1: obstracle.addImage(obstracle1);
     break;
     
     case 2: obstracle.addImage(obstracle2);
     break;
     
     case 3: obstracle.addImage(obstracle3);
     break;
     
     case 4: obstracle.addImage(obstracle4);
     break;
     
     case 5: obstracle.addImage(obstracle5);
     break;
     
     case 6: obstracle.addImage(obstracle6);
     break;
     default: break;
 } 
  obstracle.velocityX= ground.velocityX;
    
  obstraclegroup.add(obstracle);
  }
}

function reset(){
  
 gamestate="play"; 
 score=0;
 obstraclegroup.destroyEach();
 cloudsgroup.destroyEach();
 trex.changeAnimation("running",trex_running);
 restart.visible=false;
  gameover.visible=false;
  
}