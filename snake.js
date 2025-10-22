window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const head = document.getElementById("dot"); 
  const dotSize = 15;
  const speed = 15; // move in grid steps

  let dx = speed, dy = 0;

  // snake array with head first
  let snake = [head];

  // create food
  const food = document.createElement("div");
  food.id = "food";
  container.appendChild(food);

  function spawnFood() {
    const cols = container.clientWidth / dotSize;
    const rows = container.clientHeight / dotSize;
    const x = Math.floor(Math.random() * cols) * dotSize;
    const y = Math.floor(Math.random() * rows) * dotSize;
    food.style.left = x + "px";
    food.style.top = y + "px";
  }

  spawnFood();

  function scoreUpdate() {
    const score = document.getElementById("scoreboard");
    score.textContent = "SCORE: " + (snake.length - 1);
  }

  function move() {
    const headX = snake[0].offsetLeft + dx;
    console.log(headX, "head X")
    const headY = snake[0].offsetTop + dy;
    console.log(headY, "head Y")


    const maxX = container.getClientRects()[0].width - dotSize;
    // console.log("max X", maxX);
    const maxY = container.getClientRects()[0].height - dotSize;
    // console.log("max Y", maxY);

    if (headX < 0 || headX > maxX || headY < 0 || headY > maxY) return;

    // move tail segments
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].style.left = snake[i - 1].style.left;
      snake[i].style.top = snake[i - 1].style.top;
    }

    // move head
    snake[0].style.left = headX + "px";
    snake[0].style.top = headY + "px";

    // collision with food
    const foodX = parseInt(food.style.left);
    const foodY = parseInt(food.style.top);

    if (headX === foodX && headY === foodY) {
      // add new segment at tail
      const tail = document.createElement("div");
      tail.classList.add("segment");
      const last = snake[snake.length - 1];
      tail.style.left = last.style.left;
      tail.style.top = last.style.top;
      container.appendChild(tail);
      snake.push(tail);

      scoreUpdate();
      spawnFood();
    }

    setTimeout(move, 100); // snake speed
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp": if(dy===0){ dx=0; dy=-speed; } break;
      case "ArrowDown": if(dy===0){ dx=0; dy=speed; } break;
      case "ArrowLeft": if(dx===0){ dx=-speed; dy=0; } break;
      case "ArrowRight": if(dx===0){ dx=speed; dy=0; } break;
    }
  });

  move();
});
