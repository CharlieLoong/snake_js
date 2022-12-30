const BOARD_SIZE = 21;

export function getRandomPosition() {
  let pos = { x: 0, y: 0 };
  pos.x = Math.floor(Math.random() * 21) + 1;
  pos.y = Math.floor(Math.random() * 21) + 1;
  return pos;
}
