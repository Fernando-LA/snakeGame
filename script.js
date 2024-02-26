//Define HTML elements
const gameBoard = document.getElementById('gameBoard');


//Define game variables
let snake = [{x: 10, y:10}];
let food = generateFood();
let direction = 'left'
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;




function draw() {
  gameBoard.innerHTML = '';
  drawSnake();
  drawFood();
}
//Snake's functions
function drawSnake() {
  snake.forEach((segment) =>  {
    const snakeElement = createGameElement('div', 'snake')
    setPosition(snakeElement, segment)
    gameBoard.appendChild(snakeElement)
  });
  
}
//Create snake or food element/div with class
const createGameElement = (tag,className) => {
  const element = document.createElement(tag)
  element.className = className
  return element
}
//Set position of the snake
const setPosition = (element,position) => {
  element.style.gridColumn = position.x
  element.style.gridRow = position.y

}

function drawFood ()  {
  const foodElement = createGameElement('div', 'food')
  setPosition(foodElement,food)
  gameBoard.appendChild(foodElement)
}

function generateFood () {
  const x = Math.floor(Math.random() * 20) + 1;
  const y = Math.floor(Math.random() * 20) + 1;
  return {x, y}
}
// draw()

//Moving snake
function move() {
  const head = {...snake[0]}
  switch (direction) {
    case 'right':
      head.x++;
      break;
    case 'left':
      head.x--;
      break;
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
  }

  snake.unshift(head);
 

  if (head.x === food.x && head.y === food.y){
    food = generateFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      draw();

    }, gameSpeedDelay)
    increaseSpeed();
    console.log(gameSpeedDelay);
  } else {
    snake.pop();
  }

}


function startGame() {
  gameStarted = true;
  gameInterval = setInterval(() => {
    move();
    draw();
  }, gameSpeedDelay)
}

function handleKeyEvent(event) {
  if (
    (!gameStarted && event.code === "Space") ||
    (!gameStarted && event.key === " ") ||
    (!gameStarted && event.code === "Enter")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
    }
  }
}

document.addEventListener('keydown',handleKeyEvent);


function increaseSpeed() {
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
    resetGame();
  }
}

















