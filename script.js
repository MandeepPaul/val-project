const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const response = document.getElementById("response");
const gif = document.getElementById("gif");
const heartsContainer = document.getElementById("heartsContainer");

let isAccepted = false;

/* ---------- CREATE FLOATING HEARTS (BACKGROUND) ---------- */
function createHearts(count = 30) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 10 + "s";
    heart.style.fontSize = Math.random() * 2 + 1 + "rem";
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heartsContainer.appendChild(heart);
  }
}
createHearts(40); // plenty of floating hearts

/* ---------- SMART NO BUTTON MOVEMENT ---------- */
document.addEventListener("mousemove", (e) => {
  if (isAccepted) return;
  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );
  if (distance < 140) {
    moveNoButton();
  }
});

document.addEventListener("touchmove", (e) => {
  if (isAccepted) return;
  moveNoButton();
});

function moveNoButton() {
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;
  const randomX = Math.max(10, Math.min(maxX, Math.random() * maxX));
  const randomY = Math.max(10, Math.min(maxY, Math.random() * maxY));
  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

/* ---------- YES BUTTON CLICK (with confetti!) ---------- */
yesBtn.addEventListener("click", () => {
  isAccepted = true;

  response.innerText = "Yay! You've made me the happiest! 💖🥰";
  document.body.style.background =
    "radial-gradient(circle at 30% 30%, #ff9a9e, #fad0c4, #fbc2c2)";
  gif.src = "valentine.gif"; // replace with your romantic GIF

  // Hide buttons gracefully
  yesBtn.style.opacity = "0";
  noBtn.style.opacity = "0";
  setTimeout(() => {
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
  }, 300);

  // --- CONFETTI EXPLOSION! ---
  // First burst: classic confetti in romantic colors
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#ff4d6d', '#ff7b8c', '#ffb6c1', '#ffffff', '#ff99aa']
  });

  // Second burst: heart-shaped confetti (requires canvas-confetti v1.6+)
  // If you want simple emoji hearts, we can use a custom shape:
  var heartCanvas = document.createElement('canvas');
  heartCanvas.width = 10;
  heartCanvas.height = 10;
  var ctx = heartCanvas.getContext('2d');
  ctx.fillStyle = '#ff4d6d';
  ctx.font = '10px Arial';
  ctx.fillText('❤️', 0, 10);
  
  // Fire heart confetti multiple times
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: 0.2 + i * 0.15, y: 0.5 },
        shapes: [heartCanvas], // use our drawn heart as shape
        colors: ['#ff4d6d', '#ff7b8c']
      });
    }, i * 150);
  }

  // Optional: third burst with big confetti
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.4 },
      startVelocity: 25,
      colors: ['#f8d7e3', '#ffb6c1', '#ffffff']
    });
  }, 300);
});

/* ---------- OPTIONAL: Add more hearts after acceptance? Not needed, but you can ---------- */
// If you want even more hearts after yes, you can call createHearts(20) again.