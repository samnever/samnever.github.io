// Click fireworks. Keep this self-contained so the effect works offline too.
(() => {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:32767';
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d');
  if (!context) return;

  const colors = ['#ffb6b9', '#fae3d9', '#bbded6', '#8ac6d1'];
  const bursts = [];
  const random = (min, max) => min + Math.random() * (max - min);
  let frame = 0;

  function resize() {
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * scale);
    canvas.height = Math.round(window.innerHeight * scale);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(scale, 0, 0, scale, 0, 0);
  }

  function draw() {
    frame = 0;
    const now = performance.now();
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = bursts.length - 1; i >= 0; i--) {
      const burst = bursts[i];
      const progress = Math.max(0, (now - burst.start) / 1100);
      if (progress >= 1) {
        bursts.splice(i, 1);
        continue;
      }
      const ease = 1 - Math.pow(1 - progress, 4);

      for (const particle of burst.particles) {
        context.globalAlpha = 1 - progress;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(
          burst.x + Math.cos(particle.angle) * particle.distance * ease,
          burst.y + Math.sin(particle.angle) * particle.distance * ease,
          particle.radius * (1 - progress),
          0,
          Math.PI * 2
        );
        context.fill();
      }

      context.globalAlpha = (1 - progress) * 0.5;
      context.strokeStyle = '#fff';
      context.lineWidth = 6 * (1 - progress);
      context.beginPath();
      context.arc(burst.x, burst.y, 120 * ease, 0, Math.PI * 2);
      context.stroke();

    }

    context.globalAlpha = 1;
    frame = bursts.length ? requestAnimationFrame(draw) : 0;
  }

  document.addEventListener('click', event => {
    if (bursts.length >= 8) bursts.shift();
    bursts.push({
      x: event.clientX,
      y: event.clientY,
      start: performance.now(),
      particles: Array.from({ length: 24 }, () => ({
        angle: random(0, Math.PI * 2),
        distance: random(50, 180),
        radius: random(8, 14),
        color: colors[Math.floor(random(0, colors.length))]
      }))
    });
    if (!frame) frame = requestAnimationFrame(draw);
  });

  window.addEventListener('resize', resize);
  resize();
})();
