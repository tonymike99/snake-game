import { getInputDirection } from "./input.js";

const snake = [{ x: 10, y: 15 }];
let newSegments = 0;

function updateSnake() {
  addSegments();

  const inputDirection = getInputDirection();

  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }

  snake[0].x += inputDirection.x;
  snake[0].y += inputDirection.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snake.push({ ...snake[snake.length - 1] });
  }

  newSegments = 0;
}

function drawSnake(gameBoard) {
  snake.forEach((segment, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    index === 0
      ? snakeElement.classList.add("snake-head")
      : snakeElement.classList.add("snake-body");
    gameBoard.appendChild(snakeElement);
  });
}

function onSnake(position, { ignoreHead = false } = {}) {
  return snake.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function expandSnake(amount) {
  newSegments += amount;
}

function getSnakeHead() {
  return snake[0];
}

function snakeIntersection() {
  return onSnake(snake[0], { ignoreHead: true });
}

export {
  updateSnake,
  drawSnake,
  onSnake,
  expandSnake,
  getSnakeHead,
  snakeIntersection,
};
