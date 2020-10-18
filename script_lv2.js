/* global p5 */

let p = new p5(() => {});

let backgroundColor, player, gameIsOver;
let canvasHeight;
let canvasWidth;
let img;
let kid = true; //bool to check kids
let imgkid;

//maskless ppl
let person1, person2, person3, person4, person5, person6, person7, person8, person9, person10, person11, person12;
let ppl;
//ppl w masks
let masked1, masked2, masked3, masked4, masked5, masked6,
    masked7, masked8, masked9;
let collision = false;

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
                     false, 60 + buffer, 300);
  person3 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno3.png?v=1602970555946',
                      false, 220 + buffer, 340);
  person4 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno4.png?v=1602970705104',
                      false, 300 + buffer, 420);
  person5 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno5.png?v=1602970771396',
                      false, 220 + buffer, 700);
  person6 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno1.png?v=1602970454963',
                      false, 260 + buffer, 580);
  person7 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno2.png?v=1602970471278',
                      false, 380 + buffer, 740);
  person8 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno3.png?v=1602970555946',
                      false, 460 + buffer, 580);
  person9 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno4.png?v=1602970705104',
                      false, 540 + buffer, 300);
  person10 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno5.png?v=1602970771396',
                      false, 540 + buffer, 460);
  person11 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno1.png?v=1602970454963',
                      false, 540 + buffer, 620);
  person12 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fno2.png?v=1602970471278',
                      false, 540 + buffer, 740);
  
  masked1 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask1.png?v=1602970601054',
                      true, 80 + buffer, 440);
  masked2 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask2.png?v=1602970635720',
                      true, 80 + buffer, 520);
  masked3 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask3.png?v=1602970851966',
                      true, 160 + buffer, 560);
  masked4 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask1.png?v=1602970601054',
                      true, 200 + buffer, 440);
  masked5 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask2.png?v=1602970635720',
                      true, 360 + buffer, 600);
  masked6 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask3.png?v=1602970851966',
                      true, 440 + buffer, 240);
  masked7 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask1.png?v=1602970601054',
                      true, 440 + buffer, 360);
  masked8 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask2.png?v=1602970635720',
                      true, 440 + buffer, 480);
  masked9 = new Person('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fmask2.png?v=1602970635720',
                      true, 360 + buffer, 360);
  ppl = [person1, person2, person3, person4, person5, person6, person7, person8, person9, person10, person11, person12,
         masked1, masked2, masked3, masked4, masked5, masked6, masked7, masked8, masked9];
  
  imgkid = new Kid('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fpet.png?v=1602972488070',
                  380, 540);
};

p.draw = function() {
  boardLayout();
  player.showSelf();
  for (let person of ppl) {
    person.showPerson();
  }
  checkWin();
  player.checkCollision();
 if (player.x == 380 && player.y == 540 && kid == true){
   kid = false;
   player.changeImage();
 }
 if (kid){
   imgkid.showKid();
  }
};



function boardLayout() {
  p.fill(255);
  p.textSize(30);
  p.imageMode(p.CORNER);
  p.image(img,0,0,610,810);
  p.text("Among COVID", 210, 60);
  p.textSize(20);
  p.text("Level 2", 270, 85);
  p.text("Once again, move from room to room while social distancing,", 40, 110);
  p.text("but be sure to pick up your kid on the way! Use arrow", 40, 130);
  p.text("keys to move one block at a time and don't get infected.", 40, 150);
  p.textSize(16);
  p.text("EXIT", 450, 785);
  
    
  
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
  }
}

function restartGame() {
  player = new Player();
  kid = true;
  p.loop();
}

function gameOver() {
  p.stroke(0);
  p.beginShape();
  p.vertex(100, 300);
  p.vertex(500, 300);
  p.vertex(500, 500);
  p.vertex(100, 500);
  p.endShape(p.CLOSE);
  p.fill(0);
  p.textSize(30);
  p.text("You got infected!", 140, 390);
  p.text("Press space to restart :(", 140, 430);
  p.noLoop();
}

function checkWin(){
  if (player.x >= 450 && player.y >= 780 && kid == false){
    p.stroke(0);
    p.beginShape();
    p.vertex(100, 300);
    p.vertex(500, 300);
    p.vertex(500, 500);
    p.vertex(100, 500);
    p.endShape(p.CLOSE);
    p.fill(0);
    p.textSize(30);
    p.text("You won! Press space to", 140, 390);
    p.text("continue to the next level.", 140, 430);
    p.noLoop();
  }
}


class Player {
  constructor() {
    this.img = p.loadImage('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fme_no_pet.png?v=1602971357062');
    this.x = 380;
    this.y = 220;
    this.speed = 40;
    this.size = 40;
  }
  
  changeImage(){
    this.img = p.loadImage('https://cdn.glitch.com/40e6aec2-6c7e-4b9a-983f-07df74926da6%2Fme.png?v=1602977749478');
    
  }
  
  moveLeft(){
    if(this.x > 40){
      this.x -= this.speed;
     
    }
  }
  moveRight(){
    if(this.x < 560){
      this.x += this.speed;

    }
  }
  moveUp(){
    if(this.y > 240){
      this.y -= this.speed;

    }
  }
  moveDown(){
    if(this.y < 760){
      this.y += this.speed;

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

class Kid {
  //pic is a string to the image filepath
  constructor(pic, x, y) {
    this.pic = pic; //string
    this.x = x;
    this.y = y;
    this.img = p.loadImage(this.pic);
    
  }
  
  showKid() {
    p.imageMode(p.CENTER);
    p.image(this.img, this.x, this.y, 20, 20);
  }
}