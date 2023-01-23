import {
  updateSnake,
  drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { updateFood, drawFood } from "./food.js";
import { isSnakeOutsideTheGrid } from "./grid.js";
import { SNAKE_SPEED } from "./constants.js";

let lastRenderTime = 0;
let isGameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  if (isGameOver) {
    if (confirm("You lost. Do you want to play again?")) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();
  draw();
}

function update() {
  updateSnake();
  updateFood();
  isGameOver = isSnakeOutsideTheGrid(getSnakeHead()) || snakeIntersection();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

window.requestAnimationFrame(main);
