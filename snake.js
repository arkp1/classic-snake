window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const dotSize = 15;
  canvas.width = Math.floor((95 * window.innerWidth) / 100 / dotSize) * dotSize;
  canvas.height =
    Math.floor((87 * window.innerHeight) / 100 / dotSize) * dotSize;

  let snake, dx, dy, food, gameOver;

  function initGame() {
    snake = [{ x: 0, y: 0 }];
    dx = dotSize;
    dy = 0;
    food = { x: 0, y: 0 };
    gameOver = false;
    spawnFood();
    scoreUpdate();
  }

  function spawnFood() {
    const cols = canvas.width / dotSize;
    const rows = canvas.height / dotSize;
    food.x = Math.floor(Math.random() * cols) * dotSize;
    food.y = Math.floor(Math.random() * rows) * dotSize;
  }

  function scoreUpdate() {
    document.getElementById("score").textContent =
      "SCORE: " + (snake.length - 1);
  }

  function endGame() {
    gameOver = true;
    document.getElementById("finalScore").textContent =
      "Your Score: " + (snake.length - 1);
    document.getElementById("gameOverCard").style.display = "block";
  }

  document.getElementById("restartButton").addEventListener("click", () => {
    initGame();
    document.getElementById("gameOverCard").style.display = "none";
    gameLoop();
  });

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        endGame();
        return;
      }
    }

    if (
      head.x < 0 ||
      head.x >= canvas.width ||
      head.y < 0 ||
      head.y >= canvas.height
    ) {
      endGame();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      spawnFood();
      scoreUpdate();
    } else {
      snake.pop();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, dotSize, dotSize);

    ctx.fillStyle = "gray";
    snake.forEach((seg) => ctx.fillRect(seg.x, seg.y, dotSize, dotSize));
  }

  function gameLoop() {
    if (gameOver) return;
    moveSnake();
    draw();
    setTimeout(gameLoop, 100);
  }

  // Start button logic
  document.getElementById("startButton").addEventListener("click", () => {
    initGame();
    document.getElementById("startCard").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("score").style.display = "block";
    gameLoop();
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if ((key === "arrowup" || key === "w") && dy === 0) {
      dx = 0;
      dy = -dotSize;
    }
    if ((key === "arrowdown" || key === "s") && dy === 0) {
      dx = 0;
      dy = dotSize;
    }
    if ((key === "arrowleft" || key === "a") && dx === 0) {
      dx = -dotSize;
      dy = 0;
    }
    if ((key === "arrowright" || key === "d") && dx === 0) {
      dx = dotSize;
      dy = 0;
    }
  });
});
