let gameInterval;
window.initSnakeGame = function() {
    window.stopSnakeGame();
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    const scoreEl = document.getElementById('game-score');
    
    let snake = [{x: 200, y: 200}];
    let food = {x: 100, y: 100};
    let dx = 20, dy = 0;
    let score = 0;

    function main() {
        if (hit()) {
            alert("Fin del juego. Puntuación: " + score);
            window.initSnakeGame();
            return;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 400, 400);

        // Comida
        ctx.fillStyle = "#00d1ff";
        ctx.fillRect(food.x, food.y, 18, 18);

        // Serpiente
        ctx.fillStyle = "#00ffa3";
        snake.forEach(p => ctx.fillRect(p.x, p.y, 18, 18));

        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreEl.innerText = score;
            food = {
                x: Math.floor(Math.random() * 19) * 20,
                y: Math.floor(Math.random() * 19) * 20
            };
        } else {
            snake.pop();
        }
    }

    function hit() {
        const h = snake[0];
        return h.x < 0 || h.x >= 400 || h.y < 0 || h.y >= 400;
    }

    document.onkeydown = (e) => {
        if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -20; }
        if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 20; }
        if (e.key === 'ArrowLeft' && dx === 0) { dx = -20; dy = 0; }
        if (e.key === 'ArrowRight' && dx === 0) { dx = 20; dy = 0; }
    };

    gameInterval = setInterval(main, 100);
}

window.stopSnakeGame = function() {
    clearInterval(gameInterval);
}
