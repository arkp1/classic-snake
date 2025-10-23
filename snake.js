window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const dotSize = 15;
  canvas.width = Math.floor((95 * window.innerWidth) / 100 / dotSize) * dotSize;
  canvas.height =
    Math.floor((87 * window.innerHeight) / 100 / dotSize) * dotSize;

  let snake = [{ x: 0, y: 0 }];
  let dx = dotSize;
  let dy = 0;

  let food = { x: 0, y: 0 };

  function spawnFood() {
    const cols = canvas.width / dotSize;
    const rows = canvas.height / dotSize;
    food.x = Math.floor(Math.random() * cols) * dotSize;
    food.y = Math.floor(Math.random() * rows) * dotSize;
  }
  spawnFood();

  function scoreUpdate() {
    document.getElementById("score").textContent =
      "SCORE: " + (snake.length - 1);
  }

  function moveSnake() {
    const head = {
      x: snake[0].x + dx,
      y: snake[0].y + dy,
    };

    if (
      head.x < 0 ||
      head.x >= canvas.width ||
      head.y < 0 ||
      head.y >= canvas.height
    )
      return window.Error("Game over"); // hit wall

    snake.unshift(head);

    // ate the food or not check
    if (head.x === food.x && head.y === food.y) {
      spawnFood();
      scoreUpdate();
    } else {
      snake.pop();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, dotSize, dotSize);

    // draw snake
    ctx.fillStyle = "gray";
    snake.forEach((seg) => {
      ctx.fillRect(seg.x, seg.y, dotSize, dotSize);
    });
  }

  function gameLoop() {
    moveSnake();
    draw();
    setTimeout(gameLoop, 100);
  }
  gameLoop();

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
