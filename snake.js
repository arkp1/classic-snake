window.addEventListener("DOMContentLoaded", () => {
  const dot = document.getElementById("dot");
  const container = document.querySelector("#container");

  let x = dot.offsetLeft,
    y = dot.offsetTop;
  const speed = 10;
  let dx = speed,
    dy = 0;

  const containerRect = container.getBoundingClientRect();
  const dotRect = dot.getBoundingClientRect();

  const maxX = containerRect.width - dotRect.width;
  const maxY = containerRect.height - dotRect.height;

  function move() {
    const nextX = x + dx;
    const nextY = y + dy;

    if (nextX >= 0 && nextX <= maxX && nextY >= 0 && nextY <= maxY) {
      x = nextX;
      y = nextY;
      dot.style.left = x + "px";
      dot.style.top = y + "px";
    }
    requestAnimationFrame(move);
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (dy === 0) {
          dx = 0;
          dy = -speed;
        }
        break;
      case "ArrowDown":
        if (dy === 0) {
          dx = 0;
          dy = speed;
        }
        break;
      case "ArrowLeft":
        if (dx === 0) {
          dx = -speed;
          dy = 0;
        }
        break;
      case "ArrowRight":
        if (dx === 0) {
          dx = speed;
          dy = 0;
        }
        break;
    }
  });

  move();
});
