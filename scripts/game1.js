var c=document.getElementById("mycanvas");
var ctx=c.getContext("2d");

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                window.setTimeout(callback, 1000/60 );
              };
    })();



 // main function

//event listeners

document.addEventListener('keydown',checkKeyDown,false);
document.addEventListener('keyup',checkKeyUp,false);
document.addEventListener('click',mouseClickedAgain,false);
document.addEventListener('click',mouseClicked,false);

//end event listeners

//progress



function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = [];
}



AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}



AssetManager.prototype.downloadAll = function(downloadCallback) {
    if (this.downloadQueue.length === 0 ) {
        downloadCallback();
    }
      
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            console.log(this.src + ' is loaded');
            that.successCount += 1;
            if (that.isDone()) {
                downloadCallback();
            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCount += 1;
            if (that.isDone()) {
                downloadCallback();
            }
        }, false);
        img.src = path;
        this.cache[path] = img;
    }
}



AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length ) == this.successCount + this.errorCount;
}
//end progress 
//Timer
var w;
function startWorker()
{
if(typeof(Worker)!=="undefined")
  {
  if(typeof(w)=="undefined")
  {
  w=new Worker("scripts/webWorker.js");
  }
  w.onmessage = function (event) {
   $("#seconde").html(event.data);
   	if(event.data=360&&localStorage.level<2){
		localStorage.level=2;
	    levelShow(localStorage.level);
    }
   	
    };
  
  }
else
  {
  document.getElementById("seconde").innerHTML="Sorry, your browser does not support Web Workers...";
  }
}

function terminateWorker(){
	w.postMessage("stop");
}




//end Timer




//main


function main(){
if(playAgain===0){
	drawMenuOver();
}
else{
ctxdownload.drawImage(asset.getAsset("image/F-16-war.png"),0,0,800,500);
drawMenu();
}
jet1 =new Jet();
spawnEnemy(11);
}





function playGame(){	
	clearctxEnemy();
	clearctxjet();
	ctxOver.clearRect(0,0,500,500);
	startLoop();
}


function spawnEnemy(n){
	for(var i=0 ;i<n;i++){
	enemies[i]=new Enemy();
	
	}
}

function drawAllEnemies(){
		clearctxEnemy();
		for(var i=0;i<enemies.length;i++)
		  enemies[i].draw();

}





function loop(){
 if(isPlaying){
 	jet1.draw();
	ctx.drawImage(asset.getAsset("image/backnight.png"),0,0,800,500);
	drawAllEnemies();
	requestAnimFrame(loop);
 }
}


function startLoop(){
	isPlaying=true;
	loop();
}




function stopLoop(){
	isPlaying=false;
}

function drawMenu(){
	ctxMenu.drawImage(asset.getAsset("image/play2.png"),0,0,800,500);
}

function drawMenuOver(){
	ctxOver.drawImage(asset.getAsset("image/gameOver.png"),0,0,500,500);
}

//end main
//jquery level

localStorage.level=1;
function levelShow(level){
	$('.drawlevel').html("level"+level)
	$(".drawlevel").css({color:"white"});
	$('.drawlevel').show().animate({

											                    fontSize:'200px',
																opacity: 0.2,					   

							}, 833 * 5).fadeOut(3000);
;


}



//end level
//background





//button object
function Button(xL,xR,yT,yB){
	this.Xleft=xL;
	this.Xright=xR;
	this.Ytop=yT;
	this.Ybottom=yB;

}
Button.prototype.checkCklicked=function(){

	if(this.Xleft<=mouseX&&this.Xright>=mouseX&&this.Ytop<=mouseY&&this.Ybottom>=mouseY)return true;
	else return false;
}

//end button object








//jet function

function Jet(){

	this.srcX=0;
	this.srcY=500;
	this.drawX=220;
	this.drawY=200;
	this.noseX=this.drawX+20;
	this.noseY=this.drawY-100;
	this.width=40;
	this.height=100;
	this.speed=2.5;
	this.isUpkey=false;
	this.isRightkey=false;
	this.isLeftkey=false;
	this.isDownkey=false;
	this.isSpacebar=false;
	this.isShooting=false;
	this.bullets=[];
	this.currentBullet=0;
	for(var i=0 ;i<20;i++){
		this.bullets[this.bullets.length]=new Bullet();
		
	}

}

Jet.prototype.draw=function(){
	clearctxjet();
	this.checkKey();
	this.noseX=this.drawX+18;
	this.noseY=this.drawY;
	this.checkShooting();
	this.drawAllBullets();
	ctxjet.drawImage(asset.getAsset("image/Mirage.png"),this.drawX,this.drawY,this.width,this.height);
}; 


Jet.prototype.checkKey=function(){
	if((this.isUpkey)&&(this.drawY>0)){
	this.drawY-=this.speed;
	}
	if((this.isDownkey)&&(this.drawY<400)){
	this.drawY+=this.speed;
	}
	if((this.isRightkey)&&(this.drawX<=757)){
	this.drawX+=this.speed;

	}
	if((this.isLeftkey)&&(this.drawX>0)){
	this.drawX-=this.speed;
	}
}; 

function clearctxjet(){
     ctxjet.clearRect(0,0,800,500);
}

Jet.prototype.drawAllBullets=function(){

		clearctxEnemy();
		for(var i=0;i<this.bullets.length;i++)
			{if(this.bullets[i].drawX>=0)
				this.bullets[i].draw();	
			if(this.bullets[i].explosion.hasHit){
				if(this.bullets[i].explosion.currentFrame==1){
					this.bullets[i].explosion.explode();
				}
				this.bullets[i].explosion.draw();
				
			}

			}

};



Jet.prototype.checkShooting=function(){
	
	if(this.isSpacebar && !this.isShooting){
		this.isShooting=true;
		 soundManager.play("bullet");
		this.bullets[this.currentBullet].fire(this.noseX,this.noseY);
		this.currentBullet++;
		if(this.currentBullet>=this.bullets.length) this.currentBullet=0;
	}
	else if(!this.isSpacebar){
		this.isShooting=false;
	}
};



//bullet functions

function Bullet(){
	this.drawX=-20;
	this.drawY=0;
	this.width=5;
	this.height=5;
	this.explosion = new Explosion();
}


Bullet.prototype.draw=function(){
   this.drawY-=4;
  ctxjet.drawImage(asset.getAsset("image/bullet.png"),this.drawX,this.drawY,this.width,this.height);
   this.checkHitEnemy();
  if(this.drawY<0){
	  this.drawX=-20;
    }
  }; 
 
 
 Bullet.prototype.fire=function(x,y){
    this.drawX=x;
	this.drawY=y;
  }; 
  
  
  Bullet.prototype.checkHitEnemy=function(){
	for(var i=0;i<enemies.length;i++){
	     if(this.drawX>=enemies[i].drawX &&
			this.drawX<=enemies[i].drawX +enemies[i].width&&
			this.drawY>=enemies[i].drawY &&
			this.drawY<=enemies[i].drawY +enemies[i].height){
			this.explosion.drawX=enemies[i].drawX-(this.explosion.width/2);
			this.explosion.drawY=enemies[i].drawY;
			
			score++;
			if(score>=20){
				$("#score").css("color","green");
			}
			$("#score").html("score: "+score);
			enemies[i].numberHit+=1;
			this.drawX=-20;
			
			enemies[i].recycle();
		    this.explosion.hasHit=true;
			}
		  }

  };

 


//end function
//explosion functions
function Explosion(){
	this.drawX=-20;
	this.drawY=0;
	this.width=50;
	this.height=50;
	this.currentFrame=0
	this.totalFrame=30;
	this.hasHit=false;
}

Explosion.prototype.explode=function(){
	soundManager.onready(function() {
		soundManager.play("click");
		});
}

Explosion.prototype.draw=function(){
   if( this.currentFrame<=this.totalFrame){
   ctxjet.drawImage(asset.getAsset("image/explosion.png"),this.drawX,this.drawY,this.width,this.height);
   this.currentFrame++;
   }else{
   this.hasHit=false;
   this.currentFrame=0;
    }

  };

//end explosion



//background

function clearctxbg(){
ctx.clearRect(0,0,800,500);
}



//event function
function checkKeyDown(e){
var keyID=e.keyCode || e.keywich;
if(keyID == 38 || keyID== 87){// 38 up ,87 w
jet1.isUpkey=true;
e.preventDefault();
}
if(keyID == 39|| keyID== 68){// 39 right,68 D
jet1.isRightkey=true;
e.preventDefault();
}
if(keyID == 40 || keyID== 83){// down , s
jet1.isDownkey=true;
e.preventDefault();
}
if(keyID == 37 || keyID== 65){// left ,A
jet1.isLeftkey=true;
e.preventDefault();
}
if(keyID == 32){// Spacebar
jet1.isSpacebar=true;
e.preventDefault();
}

}



function checkKeyUp(e){
var keyID=(e.keyCode)? e.keyCode:e.which;
if(keyID == 38 || keyID== 87){// 38 up ,87 w
jet1.isUpkey=false;
e.preventDefault();
}
if(keyID == 39|| keyID== 68){// 39 right,68 D
jet1.isRightkey=false;
e.preventDefault();
}
if(keyID == 40 || keyID== 83){// down , s
jet1.isDownkey=false;
e.preventDefault();
}
if(keyID == 37 || keyID== 65){// left ,A
jet1.isLeftkey=false;
e.preventDefault();
}
if(keyID == 32){// Spacebar
jet1.isSpacebar=false;
e.preventDefault();
}

}

function mouseClickedAgain(e){
	mouseX=e.pageX-c5.offsetLeft;
	mouseY=e.pageY-c5.offsetTop;
	if(btnPlayAgain.checkCklicked()&&playAgain===0){
		$("#meilleurScore").hide();
		$("#score").css("color","white");
		$("#score").show();
		levelShow(localStorage.level);
		playGame();

		playAgain+=1;
	}

}

function mouseClicked (e){
	mouseX=e.pageX-c.offsetLeft;
	mouseY=e.pageY-c.offsetTop;
	
	if(btnPlay.checkCklicked()&&oneTimeClicked===0){
		$("#score").html("score: 0");
		startWorker();
		levelShow(1);
		playGame();
		oneTimeClicked+=1;
		ctxMenu.clearRect(0,0,800,500);
		ctxdownload.clearRect(0,0,800,500);
	}
	
}

//enemie jet



function Enemy(){
	this.srcX=0;
	this.srcY=500;
	this.drawX=Math.floor(Math.random()*700);
	this.drawY=Math.floor(Math.random()*-500)-Math.floor(Math.random()*500);
	this.width=40;
	this.height=100;
	this.speed=2;
	this.explosion = new Explosion();
	this.finX=0;
	this.numberHit=0;

}


Enemy.prototype.draw=function(){
	

	this.drawY+=this.speed;

	if(score>10){

	
			if(this.drawX>20&&this.finX===0)
			this.drawX-=this.speed;
			else{
					this.finX=1;
					this.drawX+=this.speed;
					if(this.drawX>760)
						this.finX=0;

				}
	}

ctxenmy.drawImage(asset.getAsset("image/MirageEnemy.png"),this.drawX,this.drawY,this.width,this.height);
this.checkEscape();
this.checkHitjet();

if(this.explosion.hasHit){

		this.explosion.draw();
		this.explosion.explode();
		stopLoop();
		if(score>localStorage.best){
			localStorage.best=score;
		    $("#meilleurScore").html("the best recorde: "+localStorage.best);
	    }else{
	    	 $("#meilleurScore").html("the best recorde: "+localStorage.best);
	    }
	    $("#meilleurScore").show();
		playAgain=0;
		score=0;
		terminateWorker();
		$("#score").hide();
		$("#score").html("score: "+score);
		main();

}
			
};


Enemy.prototype.checkEscape=function(){
	if(this.drawY-this.height>=500){
		this.recycle();
	}
};


Enemy.prototype.recycle=function(){
 this.drawX = Math.floor(Math.random() * 700) ;
 this.drawY = Math.floor(Math.random() * -500)-Math.floor(Math.random()*500);
 this.numberHit=0;
};


function clearctxEnemy(){
ctxenmy.clearRect(0,0,800,500);
}


//end enemie jet




//jet explosion

Enemy.prototype.checkHitjet=function(){
	
		 if(((this.drawX>=jet1.drawX&& jet1.drawX+jet1.width-20>=this.drawX)||(this.drawX<=jet1.drawX&& jet1.drawX<=this.drawX+this.width-6))&&
			((this.drawY<=jet1.drawY && this.drawY>=jet1.drawY-jet1.height+20)||(this.drawY>=jet1.drawY&&this.drawY-this.height+20<=jet1.drawY))){
			this.explosion.drawX=jet1.drawX-jet1.width/2;
			this.explosion.drawY=jet1.drawY;
			this.explosion.hasHit=true;
			this.explosion.width=90;
			this.explosion.height=80;

			}


  };
  


var c2=document.getElementById("canvasjet");
var ctxjet=c2.getContext("2d");

var c3=document.getElementById("canvasenemie");
var ctxenmy=c3.getContext("2d");


var c5=document.getElementById("gameOver");
var ctxOver=c5.getContext("2d");

var c6=document.getElementById("download");
var ctxdownload=c6.getContext("2d");

var  c7=document.getElementById("playCanvas");
var  ctxMenu=c7.getContext("2d");

var  isPlaying=false;

var i=0;
var spawnInterval;
var enemies=[];
var spawnRate=2000;
var spawnAmount=2;
var mouseX=0;
var mouseY=0;
var btnPlay=new Button(310,470,330,370);
var btnPlayAgain=new Button(220,280,310,370);
var jet1;
var enemy1;
var oneTimeClicked=0;
var score=0;
var playAgain=1;
date =0;
var asset=new AssetManager();

	asset.queueDownload("image/F-16-war.png");
	asset.queueDownload("image/backnight.png");
	asset.queueDownload("image/Mirage.png");
	asset.queueDownload("image/MirageEnemy.png");
	asset.queueDownload("image/bullet.png");
	asset.queueDownload("image/explosion.png");
	asset.queueDownload("image/play2.png");
	asset.queueDownload("image/gameOver.png");

$("#score").css( "font-family",'Tangerine');
$("#score").css("font-size", "48px");

$("#meilleurScore").css( "font-family",'Tangerine');
$("#meilleurScore").css("font-size", "48px");


asset.downloadAll(
	function (){
	main();
	//SoundJS.play("back",SoundJS.INTERRUPT_NONE,0,0,1,0.3);
});





//end explosion
