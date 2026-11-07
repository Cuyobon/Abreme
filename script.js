const envelope = document.getElementById("envelope");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let opened = false;

/* ---------- Abrir el sobre ---------- */
function openEnvelope() {
  if (opened) return;
  opened = true;

  envelope.classList.add("open");          // abre la solapa y baja el sobre
  document.body.classList.add("opened");   // las fotos salen volando

  setTimeout(launchConfetti, 1600);
  // cuando terminan de llegar, se activan hover y "flotar"
  setTimeout(() => document.body.classList.add("ready"), 2700);
}

envelope.addEventListener("click", openEnvelope);

/* ---------- Ver foto en grande ---------- */
document.querySelectorAll(".card img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("show");
  });
});
lightbox.addEventListener("click", () => lightbox.classList.remove("show"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("show");
});

/* ---------- Confeti ---------- */
function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const colors = ["#e07a6f", "#8e1f2a", "#ffd166", "#f7a6b5", "#ffffff", "#c9544c"];
  const pieces = Array.from({ length: 160 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 120,
    y: innerHeight * 0.55,
    vx: (Math.random() - 0.5) * 16,
    vy: -Math.random() * 16 - 6,
    size: Math.random() * 8 + 5,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  const start = performance.now();
  (function frame(now) {
    const t = now - start;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    pieces.forEach((p) => {
      p.vy += 0.35;          // gravedad
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - t / 4000);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    if (t < 4000) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })(start);
}
