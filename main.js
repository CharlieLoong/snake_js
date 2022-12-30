import './style.css';
import { draw as drawSnake, update as updateSnake, grow, getHead, selfCollison } from './snake';
import { draw as drawFood, update as updateFood, foodPosition, refreshFood } from './food';
import { getInputDirection } from './input';

document.querySelector('#app').innerHTML = `
  <div id='game-board'>
  </div>
  <button id='move'>move</button>
  <button id='grow'>grow</button>
`;
const board = document.getElementById('game-board');
let gameOver = false;
let GAME_SPEED = 10;
const BOARD_SIZE = 21

let lastRenderTime = 0;


function main(currentTime) {
  if (gameOver) {
    alert('GG!');
    window.location = '/';
    return;
  }
  
  //getInputDirection();

  window.requestAnimationFrame(main);
  
  const secondsPass = (currentTime - lastRenderTime) / 1000;
  if (secondsPass < 1 / GAME_SPEED) {
    return;
  }

  lastRenderTime = currentTime;
  update();
  draw();
  
}

// entrance
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  collisionTest();
}

function draw() {
  board.innerHTML = '';
  drawSnake(board);
  drawFood(board);
}

// test button
const moveButton = document.getElementById('move');
moveButton.onclick = () => {
  updateSnake();
};

const growButton = document.getElementById('grow');
growButton.onclick = () => {
  grow();
};

const speedInput = document.getElementById('speed');
speedInput.onchange = (e) => {
  GAME_SPEED = e.target.value
}

function collisionTest() {
  const snakeHead = getHead();
  // check food
  if (snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y) {
    console.log('eat!');
    grow();
    refreshFood();
  }
  // check self collision
  if (selfCollison()) {
    console.log('self collide')
    gameOver = true
  }
  // check border
  if (snakeHead.x > BOARD_SIZE || snakeHead.x < 1 || snakeHead.y > BOARD_SIZE || snakeHead.y < 1) {
    console.log('reach border')
    gameOver = true
  }
}