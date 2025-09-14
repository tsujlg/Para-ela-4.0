const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 500;

let bear, coins, bombs, score, gameOver, victory, animationId;
const coinSound = document.getElementById("coinSound");
const boomSound = document.getElementById("boomSound");
const victorySound = document.getElementById("victorySound");

function resetGame() {
  bear = { x: 180, y: 420, size: 40, speed: 5 };
  coins = Array.from({ length: 5 }, () => ({
    x: Math.random() * 360,
    y: Math.random() * 400,
    size: 20
  }));
  bombs = Array.from({ length: 3 }, () => ({
    x: Math.random() * 360,
    y: Math.random() * 400,
    size: 25
  }));
  score = 0;
  gameOver = false;
  victory = false;
}

function drawBear() {
  ctx.fillStyle = "#b5651d";
  ctx.beginPath();
  ctx.arc(bear.x, bear.y, bear.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawCoin(coin) {
  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.stroke();
}

function drawBomb(bomb) {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(bomb.x, bomb.y, bomb.size, 0, Math.PI * 2);
  ctx.fill();
}

function checkCollision(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < a.size + b.size;
}

function addHeart(x, y, emoji) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = emoji;
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBear();

  coins.forEach((coin, i) => {
    drawCoin(coin);
    if (checkCollision(bear, coin)) {
      coins.splice(i, 1);
      score++;
      coinSound.play();
      addHeart(bear.x + 200, bear.y + 50, "❤️");
      if (score >= 5) {
        victory = true;
        document.getElementById("victory").classList.remove("hidden");
        victorySound.play();
        cancelAnimationFrame(animationId); // PAUSA na vitória
      }
    }
  });

  bombs.forEach((bomb) => {
    drawBomb(bomb);
    if (checkCollision(bear, bomb)) {
      gameOver = true;
      document.getElementById("gameOver").classList.remove("hidden");
      boomSound.play();
      addHeart(bear.x + 200, bear.y + 50, "💔");
      cancelAnimationFrame(animationId); // PAUSA no game over
    }
  });
}

function update() {
  if (!gameOver && !victory) {
    draw();
    animationId = requestAnimationFrame(update);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && bear.x - bear.size > 0) bear.x -= bear.speed;
  if (e.key === "ArrowRight" && bear.x + bear.size < canvas.width) bear.x += bear.speed;
  if (e.key === "ArrowUp" && bear.y - bear.size > 0) bear.y -= bear.speed;
  if (e.key === "ArrowDown" && bear.y + bear.size < canvas.height) bear.y += bear.speed;
});

// 🎮 Controle de toque (apenas dentro do canvas)
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  if (x < bear.x) bear.x -= bear.speed; // toca à esquerda → move
  if (x > bear.x) bear.x += bear.speed; // toca à direita → move
  if (y < bear.y) bear.y -= bear.speed; // toca acima → move
  if (y > bear.y) bear.y += bear.speed; // toca abaixo → move
});

function restartGame() {
  document.getElementById("gameOver").classList.add("hidden");
  document.getElementById("victory").classList.add("hidden");
  resetGame();
  update();
}

resetGame();
update();
