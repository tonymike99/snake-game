import { NUMBER_OF_GRID_ROWS, NUMBER_OF_GRID_COLUMNS } from "./constants.js";

function getRandomGridPosition() {
  return {
    x: Math.floor(Math.random() * NUMBER_OF_GRID_COLUMNS + 1),
    y: Math.floor(Math.random() * NUMBER_OF_GRID_ROWS + 1),
  };
}

function isSnakeOutsideTheGrid(snakeHeadPosition) {
  return (
    snakeHeadPosition.x < 1 ||
    snakeHeadPosition.x > NUMBER_OF_GRID_COLUMNS ||
    snakeHeadPosition.y < 1 ||
    snakeHeadPosition.y > NUMBER_OF_GRID_ROWS
  );
}

export { getRandomGridPosition, isSnakeOutsideTheGrid };
