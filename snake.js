import { getInputDirection } from './input';

const snakeBody = [
  { x: 11, y: 11 },
  { x: 11, y: 10 },
  { x: 11, y: 9 },
];
const MOVE_SPEED = 1;
const EXPENSION_RATE = 1;

export function update() {
  const direction = getInputDirection();
  if (direction.x === 0 && direction.y === 0) return;
  const snakeHead = {};
  Object.assign(snakeHead, snakeBody[0]);
  snakeHead.x += direction.x;
  snakeHead.y += direction.y;
  snakeBody.unshift(snakeHead);
  snakeBody.pop();
}

export function draw(board) {
  snakeBody.forEach((segment, i) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    if (i === 0) {
      snakeElement.classList.add('snake-head');
    }
    board.appendChild(snakeElement);
  });
}

export function grow() {
  snakeBody.push(snakeBody[snakeBody.length - 1]);
}

export function getHead() {
  return snakeBody[0];
}

export function selfCollison() {
  const snakeHead = getHead();
  return snakeBody.some(
    ({ x, y }, i) => i !== 0 && x === snakeHead.x && y === snakeHead.y
  );
}
