class Game {
    constructor (canvas, context, field, player, obstacleConstructor, capivaraImg, ciclistaImg) {
      this.canvas = canvas;
      this.context = context;
      this.field = field;
      this.player = player;
      this.obstacleConstructor = obstacleConstructor;
      this.animationId = 0;
      this.obstacles = [];
      this.fieldSpeed = 2;
      this.newCapivaraFPS = 300;
      this.capivaraImg = capivaraImg;
      this.newCiclistaFPS = 150;
      this.ciclistaImg = ciclistaImg
      this.playerSpeed = {  
        initialSpeed: 0,
        speedIncrement: 1,
      };
      this.frames = 0;
      this.isGameOver = false;
      this.score = {
        htmlElement: document.querySelector('#game-score'),
        points: 0,
        pointsIncrementFPS: 30,
      };
      this.context.font = '40px Comics Sans';
    }
  
    configurarTeclado = () => {
      document.onkeydown = (event) => {
    if (!this.isGameOver) {
        this.playerSpeed.initialSpeed += this.playerSpeed.speedIncrement; 
        this.player.move(event.keyCode, this.playerSpeed.initialSpeed);
        };
      };
  
      document.onkeyup = () => {
        this.playerSpeed.initialSpeed = 0;
      };
    }
  
    startGame = () => {
      this.clearField();
  
      this.field.drawField();
      this.field.move(this.fieldSpeed);
  
      this.player.drawPlayer();
  
      this.createCapivara();
      this.createCiclista();
      this.moveObstacles();
      this.checkClearObstacles();
  
      this.checkCollision();
  
      this.updateScore();
  
      this.frames += 1;
  
      if (this.isGameOver) {
        window.cancelAnimationFrame(this.animationId);
        this.showFinalGameStats();
      } else {
        this.animationId = window.requestAnimationFrame(()=> this.startGame());  
      }
    }
  
    clearField = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
    createCapivara = () => {
      if (this.frames % this.newCapivaraFPS === 0) {
        const newCapivara = this.generateCapivara();  
        this.obstacles.push(newCapivara);
      };
    };
       
    createCiclista = () => {
      if (this.frames % this.newCiclistaFPS === 0) {
        const newCiclista = this.generateCiclista();
        this.obstacles.push(newCiclista);
      };
    };

    moveObstacles = () => {
      this.obstacles.forEach((obstacle) => {
        obstacle.drawObstacle();
        obstacle.move(this.fieldSpeed);
      });
    }
    checkClearObstacles = () => {
      this.obstacles.forEach((obstacle, index) => {
        if (obstacle.posY >= this.canvas.height) {
          this.obstacles.splice(index, 1);
        }
      }); 
    }
    generateCapivara = () => {
      const randomPosX = this.generateRandomNumber(390, 500);
      
        const newCapivara = new this.obstacleConstructor(
        this.canvas, this.context, randomPosX, 100, 100, 30, this.capivaraImg,
      );
    
      return newCapivara;
    }

    generateCiclista = () => {
      const randomPosX = this.generateRandomNumber(175, 340);

      const newCiclista = new this.obstacleConstructor(
      this.canvas, this.context, randomPosX, 0, 50, 50, this.ciclistaImg,
    );
  
    return newCiclista;
  }
    generateRandomNumber(minValue, maxValue) {
      const min = minValue;
      const max = maxValue;
      const random = Math.floor(Math.random() * (max - min +1)) + min;
  
      return random;
    };
    checkCollision = () => {
      this.obstacles.forEach((obstacle) => {
        if (this.player.crashWith(obstacle)) {
          this.isGameOver = true;
        }
      })
    };
    
    updateScore = () => {
      if (this.frames % this.score.pointsIncrementFPS) {
        this.score.points += 1;
      }
  
      this.drawScore();
    };
  
    drawScore = () => {
      this.score.htmlElement.innerText = this.score.points;
    };
    showFinalGameStats = () =>{
      setTimeout(() =>{
        this.clearField();
  
        this.context.fillStyle ='black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.context.textAlign = 'center';
        this.context.font = '50px Comic Sans'
        this.context.fillStyle ='red';
        this.context.fillText("You're winner!", this.canvas.width / 2, this.canvas.height / 3);
  
        this.context.fillStyle ='white';
        this.context.fillText("Your final score is:", this.canvas.width / 2, this.canvas.height / 3 + 70);
        this.context.fillText(this.score.points, this.canvas.width / 2, this.canvas.height / 3 + 140);
      }, 1000);
    };
  }