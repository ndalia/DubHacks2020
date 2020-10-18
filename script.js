/* global p5 */

let p = new p5(() => {});

let backgroundColor, player, gameIsOver;
let canvasHeight;
let canvasWidth;
let img;
let imagedead;


//maskless ppl
let person1, person2, person3, person4, person5, person6, person7;
let person1tl, person1br;
let ppl;
//ppl w masks
let masked1, masked2, masked3, masked4, masked5, masked6,
    masked7, masked8, masked9;
let collision = false;
let win;

//TODO: Add variable to start a new game.
let buffer = 5; 

p.setup = function() {
  player = new Player();
  canvasWidth = 600;
  canvasHeight = 600;
  p.createCanvas(canvasWidth+10, canvasHeight + 210);
  p.colorMode(p.HSB, 360, 100, 100);
  p.background(20);
  img = p.loadImage("https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fbg.png?v=1602973185908");
  
  
  person1 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno1.png?v=1602970454963',
                         false, 60 + buffer, 700);
  person2 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno2.png?v=1602970471278',
                     false, 100 + buffer, 540);
  person3 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno3.png?v=1602970555946',
                      false, 140 + buffer, 340);
  person4 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno4.png?v=1602970705104',
                      false, 340 + buffer, 620);
  person5 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno5.png?v=1602970771396',
                      false, 380 + buffer, 260);
  person6 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno1.png?v=1602970454963',
                      false, 500 + buffer, 540);
  person7 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno2.png?v=1602970471278',
                      false, 580 + buffer, 660);
  
  
  masked1 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask1.png?v=1602970601054',
                      true, 85, 600);
  masked2 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask2.png?v=1602970635720',
                      true, 205, 680);
  masked3 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask3.png?v=1602970851966',
                      true, 205, 560);
  masked4 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask1.png?v=1602970601054',
                      true, 245, 320);
  masked5 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask2.png?v=1602970635720',
                      true, 245, 400);
  masked6 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask3.png?v=1602970851966',
                      true, 325, 760);
  masked7 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask1.png?v=1602970601054',
                      true, 365, 400);
  masked8 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask2.png?v=1602970635720',
                      true, 445, 680);
  masked9 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask3.png?v=1602970851966',
                      true, 485, 360);
  ppl = [person1, person2, person3, person4, person5, person6, person7,
         masked1, masked2, masked3, masked4, masked5, masked6,
    masked7, masked8, masked9];
  
  imagedead = new ImageDisplay('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2FCapture.png?v=1602996343932',
                           300, 300);
  win = new ImageDisplay('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fwin.jpg?v=1602994898148',
                           300, 400);
};

p.draw = function() {
  boardLayout();
  player.showSelf();
  for (let person of ppl) {
    person.showPerson();
  }
  checkWin();
  player.checkCollision();
};

function boardLayout() {
  p.fill(255);
  p.textSize(30);
  p.imageMode(p.CORNER);
  p.image(img,0,0,610,810);
  p.text("Among COVID", 210, 60);
  p.textSize(20);
  p.text("Level 1", 270, 85);
  p.text("Move from room to room while social distancing.", 40, 110);
  p.text("Stay two grids away from people without masks and one grid", 40, 130);
  p.text("away from people with masks. Use arrow keys to move one", 40, 150);
  p.text("block at a time and don't get infected!", 40, 170);
  p.textSize(16);
  p.text("EXIT", 570, 220);
  
    
  
  for (var x = 5; x <= canvasWidth; x += canvasWidth / 15) {
		for (var y = 200; y <= canvasHeight + 200; y += canvasHeight / 15) {
			p.stroke(25);
			p.strokeWeight(1);
			p.line(x, 200, x, canvasHeight + 200);
			p.line(5, y, canvasWidth + 5, y);
		}
	}
  p.line(canvasWidth + 5, 200, canvasWidth + 5, canvasHeight + 200);
	p.line(5, canvasHeight+200, canvasWidth + 5, canvasHeight+200);
  
}


p.keyPressed = function() {
  console.log("key pressed: ", p.keyCode);
  if (p.keyCode === p.UP_ARROW) {
    player.moveUp();
  } else if (p.keyCode === p.DOWN_ARROW) {
    player.moveDown();
  } else if (p.keyCode === p.RIGHT_ARROW) {
    player.moveRight();
  } else if (p.keyCode === p.LEFT_ARROW) {
    player.moveLeft();
  } else if (p.keyCode == 32) {
    restartGame();
  } else if (p.keyCode == p.ENTER){
      window.location.href = "/second_level.html";
  }
}

function restartGame() {
  player = new Player();
  p.loop();
}

function gameOver() {
  p.stroke(0);
  p.beginShape();
  p.vertex(100, 400);
  p.vertex(500, 400);
  p.vertex(500, 600);
  p.vertex(100, 600);
  p.endShape(p.CLOSE);
  p.fill(0);
  p.textSize(30);
  
  p.text("You got infected!", 140, 490);
  p.text("Press space to restart :(", 140, 530);
  imagedead.showSelf(600,300);
  p.noLoop();
}

function checkWin(){
  if (player.x >= 580 && player.y <= 220){
    p.stroke(0);
    p.textSize(30);
    p.fill(100);
    win.showSelf(400,300)
    //p.textColor(100);
    p.text("You won! Press enter to", 140, 390);
    p.text("continue to the next level.", 140, 430);
    p.noLoop();
  }
}


class Player {
  constructor() {
    this.img = p.loadImage('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fme.png?v=1602977749478');
    this.x = 25;
    this.y = 780;
    this.speed = 40;
    this.size = 40;
  }
  
  moveLeft(){
    if(this.x > 40){
      this.x -= this.speed;
     // this.checkCollision();
    }
  }
  moveRight(){
    if(this.x < 560){
      this.x += this.speed;
     // this.checkCollision();
    }
  }
  moveUp(){
    if(this.y > 240){
      this.y -= this.speed;
    //  this.checkCollision();
    }
  }
  moveDown(){
    if(this.y < 760){
      this.y += this.speed;
    // this.checkCollision();
    }
  }
  
  checkCollision(){
    for (let person of ppl) {   
      if (this.checkCollision2(person.getX(), person.getY(), (person.getSize() / 2),
                              this.x, this.y, (this.size / 2)))
        {
          gameOver();
        }
    }
  }
  
  checkCollision2(x, y, w, x2, y2, w2) {
    let topLeftX = x - w/2;
		let topLeftY = y - w/2;
		let topLeftX2 = x2 - w2/2;
		let topLeftY2 = y2 - w2/2;
		
		let brX = x + w/2;
		let brY = y + w/2;
		let brX2 = x2 + w2/2;
		let brY2 = y2 + w2/2;
		if (topLeftX > brX2 || topLeftX2 > brX) {
			return false;
		}
		
		if (brY < topLeftY2 || brY2 < topLeftY) {
			return false;
		}
    
    return true;
  }
  
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }

  showSelf() {
    p.imageMode(p.CENTER);
   // p.scale(-1.0,1.0);
    p.image(this.img, this.x, this.y, 40, 40);
  }
}



class Person {
  //pic is a string to the image filepath
  constructor(pic, mask, x, y) {
    this.pic = pic; //string
    this.mask = mask; //bool
    this.x = x;
    this.y = y;
    this.img = p.loadImage(this.pic);
    if(mask) {
      this.size = 80;
    }
    else{
      this.size = 120;
    }
    
  }
  
  showPerson() {
    p.imageMode(p.CENTER);
    p.image(this.img, this.x, this.y, 20, 30);
  }
  
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  
  getSize(){
    return this.size;
  }
}

class ImageDisplay {
  constructor(pic, x, y) {
    this.pic = pic;
    this.x = x;
    this.y = y;
    this.img = p.loadImage(this.pic);
  }
  showSelf(width, height) {
    p.imageMode(p.CENTER);
    p.image(this.img, this.x, this.y, width, height);
  }
}