document.addEventListener('DOMContentLoaded', () => {
  // ===== Chuva de corações contínua =====
  const heartsBg = document.querySelector('.hearts-background');
  function createFallingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '❤';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.fontSize = (14 + Math.random() * 18) + 'px';
    heart.style.color = ['#ff4d8d', '#ff80b5', '#6b4f9a', '#ff99c8'][Math.floor(Math.random()*4)];
    heart.style.top = '-20px';
    heart.style.opacity = '0.8';
    heartsBg.appendChild(heart);

    let top = -20;
    const fall = setInterval(() => {
      top += 2;
      heart.style.top = top + 'px';
      if (top > window.innerHeight + 20) {
        clearInterval(fall);
        heart.remove();
      }
    }, 50);
  }
  setInterval(createFallingHeart, 600);

  // ===== Helpers =====
  function fadeIn(el) {
    if (!el) return;
    el.classList.add('fade-in');
    void el.offsetWidth;
    el.classList.add('show');
  }
  function typewriter(el, text, speed = 28) {
    if (!el) return;
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text.charAt(i++);
      if (i >= text.length) clearInterval(timer);
    }, speed);
  }

  // ===== Subtítulo com typewriter =====
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) typewriter(subtitle, subtitle.textContent.trim(), 22);

  // ===== Funny quote (AGORA mostra a surpresa) =====
  const quoteDiv = document.querySelector('.funny-quote');
  if (quoteDiv) {
    const surpriseBox = document.createElement('div');
    surpriseBox.className = "funny-surprise";
    surpriseBox.style.display = "none";
    surpriseBox.style.marginTop = "20px";
    surpriseBox.style.fontFamily = "'Indie Flower', cursive";
    surpriseBox.style.fontSize = "1.2rem";
    surpriseBox.style.background = "rgba(255,255,255,0.95)";
    surpriseBox.style.padding = "20px";
    surpriseBox.style.borderRadius = "15px";
    surpriseBox.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
    surpriseBox.textContent = "Feliz aniversário! Que seu dia seja tão especial e incrível quanto você é para mim. :)";
    quoteDiv.parentElement.appendChild(surpriseBox);

    quoteDiv.addEventListener('click', () => {
      surpriseBox.style.display = "block";
      fadeIn(surpriseBox);
    });
    fadeIn(quoteDiv);
  }

  // ===== Surpresa (AGORA só mostra alert) =====
  const surpriseBtn = document.querySelector('.surprise-btn');
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      alert("Eu te amo muito! 💕 Fiz esse presentinho com carinho, espero que goste. Que a gente possa passar muitos aniversários juntos! 💫");
    });
  }

  // ===== Último presente continua normal =====
  const lastGiftBtn = document.getElementById('lastGiftBtn');
  const lastGift = document.getElementById('lastGift');
  if (lastGiftBtn) {
    lastGiftBtn.addEventListener('click', () => {
      lastGift.style.display = 'block';
      fadeIn(lastGift);
      lastGiftBtn.style.display = 'none';
    });
  }

  // ===== Roleta fofinha =====
  const roleta = document.getElementById('roleta');
  const btnGirar = document.getElementById('girarRoleta');
  const fraseResultado = document.getElementById('fraseResultado');
  const frasesFofas = [
    "Você ilumina meus dias como um nascer do sol ",
    "Você é tão especial que até as estrelas ficam com inveja de você.",
    "Você faz o mundo ficar mais lindo.",
    "Coração quentinho é quando penso em você.",
    "Que bom que você aconteceu na minha vida.",
    "um feliz aniversario pra minha pessoa favorita.",
    "Seu jeito me encanta todos os dias.",  
  ];
  let anguloAtual = 0;
  btnGirar.addEventListener('click', () => {
    const anguloGiro = Math.floor(Math.random() * 360 + 720);
    anguloAtual += anguloGiro;
    roleta.style.transition = `transform 2s cubic-bezier(0.33, 1, 0.68, 1)`;
    roleta.style.transform = `rotate(${anguloAtual}deg)`;
    setTimeout(() => {
      const indice = Math.floor(Math.random() * frasesFofas.length);
      fraseResultado.textContent = frasesFofas[indice];
    }, 2000);
  });
});
