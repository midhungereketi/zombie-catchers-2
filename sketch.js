var hunter ,hunterimg,hunterfall;
var bgImg;
var bg;
var zombie1,zombie2,zombie3,zombie4,zombie5;
var zombie1img,zombie2img,zombie3img,zombie4img,zombie5img;
var bullet,bulletimg;
var bulletg ;
var zombieg ;
var Score;
var PLAY=1;
var END=0;
var gameState =PLAY;
var kill;
var restart,restartimg;
function preload(){
	hunterimg=loadImage("hunter2.png");
bgImg=loadImage("zombie_bg.webp");
zombie1img=loadImage("z1.png");
zombie2img=loadImage("z2.png");
zombie3img=loadImage("z7.png");
zombie4img=loadImage("z61.png");

zombie5img=loadImage("z5.png");
bulletimg=loadImage("bullet3.png");
hunterfall=loadImage("hunterfall2.png")
restartimg=loadImage("restart.png")
}
function setup (){
	createCanvas(displayWidth,displayHeight);
 bulletg=new Group();
 zombieg=new Group();
 Score=0;
//bg=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
//bg.addImage(bgImg)
//bg.scale=2.5;
hunter = createSprite(50,displayHeight-70,40,40);
hunter.addImage(hunterimg);
hunter.scale=0.5;
//hunter.debug=true;
hunter.setCollider("rectangle",0,0,100,200);
restart =createSprite(displayWidth/2,displayHeight/2+50);
restart.addImage(restartimg);
restart.scale=0.3;
restart.visible=false;
}
function draw(){
	background(bgImg)
	textSize(40);
	fill(255)
	text("Score:"+Score,displayWidth-200,100)
	if(gameState===PLAY){
    for(var i=0;i<zombieg.length ; i++){
		kill=zombieg.get(i);
		if(bulletg.isTouching(kill)){
			kill.destroy();
			bulletg.destroyEach();
			Score=Score+10;
		}
	}
	
	//if(keyWentDown(UP_ARROW)){
		//hunter.y=hunter.y-10
	//}
	//if(keyWentDown(DOWN_ARROW)){
		hunter.y=mouseY;
		hunter.x=mouseX; BBBBBBBBBB
	//}
	
	if(hunter.isTouching(zombieg)){
		hunter.addImage(hunterfall);
		gameState=END;
	}

	zombies();
	Bullet();
}else if(gameState===END){
	zombieg.setVelocityXEach(0);
	text("HUNTER DIED",displayWidth/2,displayHeight/2);
	restart.visible=true;
	if(touches.length>0 ||mousePressedOver(restart)){
		reset();
		touches=[];
	}
	
}
	drawSprites();
}
function zombies(){
	if(frameCount%100===0){
		zombie1=createSprite(displayWidth+10,random(displayHeight-500,displayHeight-50),15,15);
		//zombie1.debug=true;
		zombie1.setCollider("rectangle",0,0,100,400);
		var n =Math.round(random(1,5))
		switch(n){
			case 1: zombie1.addImage(zombie1img);
			break;
			case 2: zombie1.addImage(zombie2img);
			break;
			case 3: zombie1.addImage(zombie3img);
			break;
			case 4: zombie1.addImage(zombie4img);
			break;
			case 5: zombie1.addImage(zombie5img);
			break;
			default:break;
		}
		zombie1.velocityX=-(5+4*Score/100);
		zombie1.scale=0.4;
		zombieg.add(zombie1);
	}
}
function Bullet(){
	if(touches.length>0 || keyDown("space")){
	var bullet = createSprite(0,0,15,15);
	bullet.addImage(bulletimg);
	bullet.scale=0.1;
	bullet.x=hunter.x;
	bullet.y=hunter.y;
	bullet.velocityX=+5;
	bulletg.add(bullet);
	//bullet.debug=true;
	bullet.setCollider("rectangle",0,0,20,20);
	touches=[];
	}
	
}
function reset(){
	gameState=PLAY;
	zombieg.destroyEach();
	Score=0;
	bulletg.destroyEach();
	hunter.addImage(hunterimg)
	restart.visible=false;
}