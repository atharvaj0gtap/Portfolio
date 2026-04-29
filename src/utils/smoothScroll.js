function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = window.innerWidth >= 768 ? 80 : 20;
  const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
  const startY = window.scrollY;
  const distance = targetY - startY;

  // Scale duration with distance: minimum 400ms, max 900ms
  const duration = Math.min(900, Math.max(400, Math.abs(distance) * 0.4));

  let startTime = null;

  function step(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
