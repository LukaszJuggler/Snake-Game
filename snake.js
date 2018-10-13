class Snake {
      constructor(name, pos, dir, color) {

            this.name = name;
            this.pos = pos;
            this.color = color;
            this.dir = dir;
            this.score = 0;
            this.blockXChange = false;
            this.blockYChange = false;
      };


      collide(otherSnake) {

      for (let i = 1; i< this.pos.x.length; i++) {
            // collision with self
            if (this.pos.x[0] === this.pos.x[i] && this.pos.y[0] === this.pos.y[i]) {
                  this.reset();
            }
      if (multiplayer) {
            for (let i = 0; i< otherSnake.pos.x.length; i++) {
                  // collision with other snake
                  if (this.pos.x[0] === otherSnake.pos.x[i] && this.pos.y[0] === otherSnake.pos.y[i]) {
                        this.reset();
                  }
            }
      }
      }};

      draw() {
      ctx.fillStyle = this.color;
      
      for (let i = 0; i< this.pos.x.length; i++) {
            ctx.fillRect(this.pos.x[i]*sq, this.pos.y[i]*sq, sq, sq);
      }
      };

      eat() {
            if (this.pos.x[0] === fruit.pos.x && this.pos.y[0] === fruit.pos.y) {
                  // extend body
                  this.pos.x.push(this.pos.x[length-1]);
                  this.pos.y.push(this.pos.y[length-1]);
                  
                  newFruitPos();
                  this.score++;
            }
      };

      move() {
      for (let i = this.pos.x.length-1; i > 0; i--) {
            this.pos.x[i] = this.pos.x[i-1];
            this.pos.y[i] = this.pos.y[i-1];
      }
      this.pos.x[0] += this.dir[0];
      this.pos.y[0] += this.dir[1];
      // this.pos.x.unshift(this.pos.x[0] += this.dir[0]);
      // this.pos.y.unshift(this.pos.y[0] += this.dir[1]);
      // this.pos.x.pop();
      // this.pos.y.pop();

      
      // check if teleport
      if (this.pos.x[0] < 0) {
            this.pos.x[0] = gridWidth-1;
      } else if (this.pos.x[0] > gridWidth-1) {
            this.pos.x[0] = 0;
      }
      if (this.pos.y[0] < 0) {
            this.pos.y[0] = gridHeight-1;
      } else if (this.pos.y[0] > gridHeight-1) {
            this.pos.y[0] = 0;
      }
      // block pressing opposite key than direction
            //if dir was horizontal
            if (this.dir[0] !== 0)
            {
                  this.blockYChange = false;
            } 
            //if dir was vertical
            else
            {
                  this.blockXChange = false;
            }
      };
      reset() {
            // if (this.gameOver) {
                  console.log('collision - game over');
                  this.score = 0;
                  this.pos.x.length = 1;
                  this.pos.y.length = 1;
            // }
            // this.gameOver = false;
      }
      win() {
            if(this.score >= 20) {
                  drawText(this.name, this.score); 
            }
      }
}