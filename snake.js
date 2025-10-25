window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const dotSize = 20;
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

    let newX, newY, onSnake;

    do {
      newX = Math.floor(Math.random() * cols) * dotSize;
      newY = Math.floor(Math.random() * rows) * dotSize;

      onSnake = snake.some((seg) => seg.x === newX && seg.y === newY);
    } while (onSnake);

    food.x = newX;
    food.y = newY; 
  }

  function scoreUpdate() {
    document.getElementById("score").textContent = snake.length - 1;
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

  // drawing snake + food
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mini = dotSize / 3;
    ctx.fillStyle = "#000000ff";

    const emptyPositions = [0, 2, 4, 6, 8];

    let pos = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!emptyPositions.includes(pos)) {
          ctx.fillRect(
            food.x + j * mini,
            food.y + i * mini,
            mini - 1,
            mini - 1
          );
        }
        pos++;
      }
    }

    ctx.fillStyle = "black";
    snake.forEach((seg) => {
      const mini = dotSize / 3;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          ctx.fillRect(seg.x + i * mini, seg.y + j * mini, mini - 1, mini - 1);
        }
      }
    });
  }

  function gameLoop() {
    if (gameOver) return;
    moveSnake();
    draw();
    setTimeout(gameLoop, 150);
  }

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
