class Object {
    constructor (canvas, context, posX, posY, width, height) {
     this.canvas = canvas;
     this.context = context;
     this.posX = posX;
     this.posY = posY;
     this.width = width;
     this.height = height;
    }
   move (speed) {
     this.posY += speed;
   }
   top = () => {
   return this.posY;
 
   };
   bottom = () => {
   return this.posY + this.height;
 
   };
   left = () => {
   return this.posX;
 
   };
   right = () => {
   return this.posX + this.width;
 
   };
 
   crashWith = (obstacle) => {
     return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom()
     || this.right() < obstacle.left() || this.left() > obstacle.right());
   };
 }
 
 class Field extends Object {
    constructor(canvas, context, posX, posY, width, height, image) {
        super (canvas, context, posX, posY, width, height);
        this.image = image;
    }
 
    drawField = () => {
     this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
     this.context.drawImage(this.image, this.posX, this.posY - this.height, this.width, this.height);
 
     this.resetFieldPos();
   }
 
   resetFieldPos = () => {
     if (this.posY > this.height) {
       this.posY = 0;
     }
   }
 }
 
 class Obstacle extends Object {
     constructor(canvas, context, posX, posY, width, height, image) {
       super(canvas, context, posX, posY, width, height);
       this.image = image;
     }
        drawObstacle = () => {
      this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
     }
   };

 class Player extends Object {
     constructor(canvas, context, posX, posY, width, height, image) {
         super (canvas, context, posX, posY, width, height);
         this.image = image;
     }
     drawPlayer = () => {
       this.context.drawImage(this.image, this.posX, this.posY, this.width, this.height);
     }
     move = (keyCode, speed) => {
       switch (keyCode) {
         case 37:
          if (this.posX < 175) return;
          this.posX -= speed;
         break;
         
         case 39:
          if (this.posX > this.canvas.width - 75) return;
          this.posX += speed;
         break;

        case 38:
         if (this.posY < this.canvas.height - 800) return;
         this.posY -= speed;
         break;
         
        case 40:
         if (this.posY > this.canvas.height - 75) return;
         this.posY += speed;
         break;

         default:
         console.log('Tecla inv??lida');
       }
     }
  }