import { useEffect, useRef } from 'react';
import './StarryBackground.css';

const SPRITE_VARIANTS = [
  { radius: 0.55, core: 255, alpha: 0.55, halo: 0 },
  { radius: 1.0, core: 255, alpha: 0.75, halo: 0.35 },
  { radius: 1.5, core: 255, alpha: 0.9, halo: 0.55 },
  { radius: 2.2, core: 255, alpha: 1.0, halo: 0.9 },
];

const buildSprite = ({ radius, alpha, halo }) => {
  const sprite = document.createElement('canvas');
  const size = Math.ceil(radius * 7 + 8);
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;

  if (halo > 0) {
    const gradient = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, size / 2);
    gradient.addColorStop(0, `hsla(45, 95%, 86%, ${alpha * halo})`);
    gradient.addColorStop(0.35, `hsla(42, 80%, 70%, ${alpha * halo * 0.35})`);
    gradient.addColorStop(1, 'hsla(42, 80%, 70%, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(45, 100%, 96%, ${alpha})`;
  ctx.fill();

  return sprite;
};

const pickVariant = () => {
  const roll = Math.random();
  if (roll > 0.92) return 3;
  if (roll > 0.7) return 2;
  if (roll > 0.3) return 1;
  return 0;
};

/**
 * Two-layer starfield optimized for low CPU cost.
 *
 *   Layer A (static):   drawn once, never re-rendered
 *   Layer B (twinkle):  30% of stars, pulses via sin, capped at 30fps
 *
 * No shadowBlur. No per-frame arcs. Sprites are rasterized once and blitted.
 */
const StarryBackground = ({ densityRatio = 0.18 }) => {
  const staticCanvasRef = useRef(null);
  const twinkleCanvasRef = useRef(null);

  useEffect(() => {
    const staticCanvas = staticCanvasRef.current;
    const twinkleCanvas = twinkleCanvasRef.current;
    if (!staticCanvas || !twinkleCanvas) return;

    const staticCtx = staticCanvas.getContext('2d');
    const twinkleCtx = twinkleCanvas.getContext('2d');

    const sprites = SPRITE_VARIANTS.map(buildSprite);

    let staticStars = [];
    let twinkleStars = [];
    let rafId = null;
    let lastFrame = 0;
    const TARGET_FPS = 30;
    const FRAME_DURATION = 1000 / TARGET_FPS;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      staticCanvas.width = w;
      staticCanvas.height = h;
      twinkleCanvas.width = w;
      twinkleCanvas.height = h;

      const vmin = Math.min(w, h);
      const isMobile = w < 768;
      const ratio = isMobile ? 0.65 : 1;
      const total = Math.floor(vmin * densityRatio * ratio);

      const staticCount = Math.floor(total * 0.72);
      const twinkleCount = total - staticCount;

      const makeStar = () => {
        const variant = pickVariant();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          variant,
          baseAlpha: 0.4 + Math.random() * 0.55,
          speed: 0.6 + Math.random() * 1.4,
          offset: Math.random() * Math.PI * 2,
          magnitude: 0.25 + Math.random() * 0.4,
        };
      };

      staticStars = Array.from({ length: staticCount }, makeStar);
      twinkleStars = Array.from({ length: twinkleCount }, makeStar);

      drawStatic();
    };

    const drawStatic = () => {
      staticCtx.clearRect(0, 0, staticCanvas.width, staticCanvas.height);
      staticCtx.globalCompositeOperation = 'lighter';
      for (const star of staticStars) {
        const sprite = sprites[star.variant];
        staticCtx.globalAlpha = star.baseAlpha;
        staticCtx.drawImage(
          sprite,
          star.x - sprite.width / 2,
          star.y - sprite.height / 2
        );
      }
      staticCtx.globalAlpha = 1;
      staticCtx.globalCompositeOperation = 'source-over';
    };

    const drawTwinkle = (now) => {
      twinkleCtx.clearRect(0, 0, twinkleCanvas.width, twinkleCanvas.height);
      twinkleCtx.globalCompositeOperation = 'lighter';
      const t = now * 0.001;
      for (const star of twinkleStars) {
        const sprite = sprites[star.variant];
        const pulse = Math.sin(t * star.speed + star.offset) * star.magnitude;
        const alpha = Math.max(0.05, Math.min(1, star.baseAlpha + pulse));
        twinkleCtx.globalAlpha = alpha;
        twinkleCtx.drawImage(
          sprite,
          star.x - sprite.width / 2,
          star.y - sprite.height / 2
        );
      }
      twinkleCtx.globalAlpha = 1;
      twinkleCtx.globalCompositeOperation = 'source-over';
    };

    const loop = (now) => {
      rafId = requestAnimationFrame(loop);
      if (now - lastFrame < FRAME_DURATION) return;
      lastFrame = now;
      drawTwinkle(now);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!rafId) {
        rafId = requestAnimationFrame(loop);
      }
    };

    resize();
    rafId = requestAnimationFrame(loop);

    let resizeRaf = null;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }, [densityRatio]);

  return (
    <>
      <canvas ref={staticCanvasRef} className="starfield-static" aria-hidden="true" />
      <canvas ref={twinkleCanvasRef} className="starfield-twinkle" aria-hidden="true" />
      <div className="starfield-veil" aria-hidden="true" />
    </>
  );
};

export default StarryBackground;
