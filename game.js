let gameInterval, snake, food, dx, dy, score;
const box = 20;

function initSnakeGame() {
    stopSnakeGame();
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    
    snake = [{x: 200, y: 200}, {x: 180, y: 200}, {x: 160, y: 200}];
    dx = 20; dy = 0; score = 0;
    document.getElementById('game-score').innerText = score;
    
    createFood();

    function draw() {
        if (isGameOver()) {
            stopSnakeGame();
            alert("GAME OVER - Score: " + score);
            initSnakeGame();
            return;
        }

        ctx.fillStyle = "#010409";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar comida
        ctx.fillStyle = "#00d1ff";
        ctx.fillRect(food.x, food.y, box, box);

        // Dibujar serpiente
        snake.forEach((part, i) => {
            ctx.fillStyle = i === 0 ? "#00ffa3" : "rgba(0, 255, 163, 0.3)";
            ctx.fillRect(part.x, part.y, box, box);
        });

        // Mover cabeza
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        
        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById('game-score').innerText = score;
            createFood();
        } else {
            snake.pop();
        }
        
        snake.unshift(head);
    }

    function isGameOver() {
        const h = snake[0];
        const hitWall = h.x < 0 || h.x >= canvas.width || h.y < 0 || h.y >= canvas.height;
        const hitSelf = snake.slice(1).some(part => part.x === h.x && part.y === h.y);
        return hitWall || hitSelf;
    }

    function createFood() {
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    }

    // Listener de teclado específico para el juego
    const handleKeys = (e) => {
        if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -box; }
        if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = box; }
        if (e.key === 'ArrowLeft' && dx === 0) { dx = -box; dy = 0; }
        if (e.key === 'ArrowRight' && dx === 0) { dx = box; dy = 0; }
    };

    document.addEventListener('keydown', handleKeys);
    gameInterval = setInterval(draw, 100);

    // Guardar referencia para limpiar el listener luego
    window._gameKeyListener = handleKeys;
}

function stopSnakeGame() {
    clearInterval(gameInterval);
    if (window._gameKeyListener) {
        document.removeEventListener('keydown', window._gameKeyListener);
    }
}

document.getElementById('reset-game-btn').addEventListener('click', initSnakeGame);
