let gameLoop, snake, food, dx, dy;
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

function initSnakeGame() {
    clearInterval(gameLoop);
    snake = [{x: 200, y: 200}, {x: 180, y: 200}];
    dx = 20; dy = 0;
    gameLoop = setInterval(draw, 100);
}

function stopSnakeGame() {
    clearInterval(gameLoop);
}

function draw() {
    ctx.fillStyle = "#010409";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Aquí iría el resto de la lógica del Snake que te pasé antes...
    // Mover cabeza, dibujar comida, etc.
}
