                                                      // canvas
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const sq = 40;

let loc;
// default location
loc = 'mainMenu';
let multiplayer;

                                                      // map

const gridWidth = 32;
const gridHeight = 18;


                                                      // fruit
                                                
const fruit = {
      pos: {x: null, y: null},
      color: 'red'
};                                                      

function newFruitPos()
{
      fruit.pos.x = Math.floor(Math.random() * gridWidth);
      fruit.pos.y = Math.floor(Math.random() * gridHeight);
      // dont allow new fruit appear under snake body
      player1.pos.x.forEach((element, i) =>
      {
            if (element === fruit.pos.x && player1.pos.y[i] === fruit.pos.y)
            {
                  newFruitPos();
                  //disable later recuraction  when the snake is max
            }
      });
      if (multiplayer)
      {
            // dont allow new fruit appear under snake body
            player2.pos.x.forEach((element, i) =>
            {
                  if (element === fruit.pos.x && player2.pos.y[i] === fruit.pos.y)
                  {
                        newFruitPos();
                        //disable later recuraction  when the snake is max
                  }
            });
      }    
      
};

function drawFruit() {
      ctx.fillStyle = fruit.color;
      ctx.fillRect(fruit.pos.x*sq, fruit.pos.y*sq, sq, sq);
};



                                                      // score

function drawScore() {
      ctx.font = `${sq}px Calibri`;
      ctx.textAlign = "left";
      ctx.fillStyle = "white";
      ctx.fillText(`P1: ${player1.score}`, sq, sq);
      if (multiplayer) {
            ctx.fillText(`P2: ${player2.score}`, sq, 2*sq);
      }

};



                                                      // draw menu functions

function drawBg() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
};

function drawButtons() {
      // draw blocks
      const block = {w: 450, h: 100};
      const fontSize = 100;
      ctx.fillStyle = "orange";

      if (activeBtn1P === true) {
            ctx.fillRect(cvs.width/2 - block.w/2, 340, block.w, block.h);
      }
      else {
            ctx.fillRect(cvs.width/2 - block.w/2, 490, block.w, block.h);
      }

      // draw text on buttons
      ctx.font = `${fontSize}px Calibri`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText('1 PLAYER', cvs.width/2, 420);
      ctx.fillText('2 PLAYERS', cvs.width/2, 570);
};

function drawFooter() {

      ctx.font = '20px Calibri';
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText('Ł.U. 2018', cvs.width/2, 680);
};

function drawLogo() {

      ctx.font = '60px Calibri';
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText('SNAKE', cvs.width/2, 200);
};

// function drawText(font, color, align, content, posX, posY) {
//       ctx.font = font;
//       ctx.fillStyle = color;
//       ctx.textAlign = align;
//       ctx.fillText(content, posX, posY);
// }

                                                      //controls
let activeBtn1P = true;

document.addEventListener('keydown', (e)=> {
      if (loc === 'mainMenu') {
            if (e.keyCode === 40 || e.keyCode === 38) {
                  if (activeBtn1P) {
                        activeBtn1P = false;
                  }
                  else {
                        activeBtn1P = true;
                  }
            } else if (e.keyCode === 13) {
                  if (activeBtn1P) {
                        newGame(1);
                  }
                  else {
                        // to do
                        newGame(2);
                  }
            }
      } else if (loc === 'game') {
            //left
            if (event.keyCode === 37 && !player1.blockXChange) {
                  player1.dir = [-1, 0];
                  player1.blockXChange = true;
            //right
            } else if (event.keyCode === 39 && !player1.blockXChange) {
                  player1.dir = [1, 0];
                  player1.blockXChange = true;
            //up
            } else if (event.keyCode === 38 && !player1.blockYChange) {
                  player1.dir = [0, -1];
                  player1.blockYChange = true;
            //down  
            } else if (event.keyCode === 40 && !player1.blockYChange) {
                  player1.dir = [0, 1];
                  player1.blockYChange = true;
            }
            if (multiplayer) {
                  //left
                  if (event.keyCode === 65 && !player2.blockXChange) {
                        player2.dir = [-1, 0];
                        player2.blockXChange = true;
                  //right
                  } else if (event.keyCode === 68 && !player2.blockXChange) {
                        player2.dir = [1, 0];
                        player2.blockXChange = true;
                  //up
                  } else if (event.keyCode === 87 && !player2.blockYChange) {
                        player2.dir = [0, -1];
                        player2.blockYChange = true;
                  //down  
                  } else if (event.keyCode === 83 && !player2.blockYChange) {
                        player2.dir = [0, 1];
                        player2.blockYChange = true;
                  }
            }
      }
});


                                                      // setup new game

let player1, player2;

function newGame(playerNum) {
      loc = 'game';
      player1 = new Snake('Player 1', {x: [3], y: [3]}, [0, 0], "green");
      player1.blockXChange = true;
      player1.dir = [0,1];
      if (playerNum === 2) {
            multiplayer = true;
            player2 = new Snake('Player 2', {x: [6], y: [7]}, [0, -1], "orange");
      }
      newFruitPos();
};


                                                      // program loop

const timeInterval = 100;
let timeCounter = 0;
let lastTime = 0;

function mainLoop(time = 0) {

      if (loc === 'game') {

            const deltaTime = time - lastTime;
            lastTime = time;
            timeCounter += deltaTime;

            if (timeCounter > timeInterval) {
                  timeCounter = 0;
                  if (multiplayer) {
                        player1.move();
                        player2.move();
                        player1.collide(player2);
                        player2.collide(player1);
                        player1.eat();
                        player2.eat();
                        drawBg();
                        drawFruit();
                        player1.draw();
                        player2.draw();
                  }
                  else {
                        player1.move();
                        player1.collide();
                        player1.eat();
                        drawBg();
                        drawFruit();
                        player1.draw();
                  }
                  drawScore();
            }

      } else if (loc === 'mainMenu'){
            drawBg();
            drawLogo();
            drawButtons();
            drawFooter();
      }

      requestAnimationFrame(mainLoop);
};

mainLoop();