import { onSnake, expandSnake } from "./snake.js";
import { getRandomGridPosition } from "./grid.js";
import {
  SNAKE_EXPANSION_RATE,
  DELAY_IN_FIRST_LOAD_OF_FOOD,
  TIME_TO_UPDATE_UNCOLLECTED_FOOD,
} from "./constants.js";

let timerId;
let foodPosition = 0;
let currentScore = 0;
let bestScore = 0;
let currentScoreElement = document.getElementById("current-score");
let bestScoreElement = document.getElementById("best-score");
let startTimeBeforeCollectionOfFood = 0;
let endTimeAfterCollectionOfFood = 0;

setTimeout(() => {
  foodPosition = getRandomFoodPosition();
  startTimeBeforeCollectionOfFood = Date.now();
}, DELAY_IN_FIRST_LOAD_OF_FOOD);

updateFoodAtRegularInterval();

function updateFoodAtRegularInterval() {
  timerId = setInterval(() => {
    foodPosition = getRandomFoodPosition();
  }, TIME_TO_UPDATE_UNCOLLECTED_FOOD);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = getRandomGridPosition();
  }
  return newFoodPosition;
}

function updateFood() {
  if (onSnake(foodPosition)) {
    expandSnake(SNAKE_EXPANSION_RATE);
    foodPosition = getRandomFoodPosition();
    clearInterval(timerId);
    endTimeAfterCollectionOfFood = Date.now();
    let totalTimeTakenForCollectionOfFood =
      endTimeAfterCollectionOfFood - startTimeBeforeCollectionOfFood;
    currentScore += 1 + 1000 / totalTimeTakenForCollectionOfFood;
    bestScore = bestScore > currentScore ? bestScore : currentScore;
    currentScoreElement.innerText = currentScore;
    bestScoreElement.innerText = bestScore;
    updateFoodAtRegularInterval();
    startTimeBeforeCollectionOfFood = Date.now();
  }
}

function drawFood(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = foodPosition.y;
  foodElement.style.gridColumnStart = foodPosition.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

export { updateFood, drawFood };
