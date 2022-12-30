import { getRandomPosition } from "./board";

export let foodPosition = getRandomPosition();

export function refreshFood() {
  foodPosition = getRandomPosition();
}

export function draw(board) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = foodPosition.y;
  foodElement.style.gridColumnStart = foodPosition.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

export function update() {

}