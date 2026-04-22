import { useRef, useEffect } from 'react';
import './StarryBackground.css';

function createSprites(sizeLimit) {
  // 4 size variants from tiny to sizeLimit/2 radius
  const radii = [0.5, sizeLimit * 0.25, sizeLimit * 0.375, sizeLimit * 0.5];
  return radii.map(radius => {
    const blur = Math.max(1, radius * 3);
    const size = Math.ceil((radius + blur) * 2 + 4);
    const offscreen = document.createElement('canvas');
    offscreen.width = size;
    offscreen.height = size;
    const ctx = offscreen.getContext('2d');
    const center = size / 2;
    ctx.shadowBlur = blur;
    ctx.shadowColor = 'rgba(255, 255, 255, 1)';
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fill();
    return { canvas: offscreen, half: center };
  });
}

const StarryBackground = ({
  densityRatio = 0.15,
  sizeLimit = 3,
  defaultAlpha = 0.3,
}) => {
  const staticCanvasRef = useRef(null);
  const animCanvasRef = useRef(null);

  useEffect(() => {
    const staticCanvas = staticCanvasRef.current;
    const animCanvas = animCanvasRef.current;
    if (!staticCanvas || !animCanvas) return;

    const staticCtx = staticCanvas.getContext('2d');
    const animCtx = animCanvas.getContext('2d');

    const sprites = createSprites(sizeLimit);
    let staticStars = [];
    let animStars = [];
    let rafId = null;
    let time = 0;
    let lastFrame = 0;
    const FRAME_DURATION = 1000 / 30; // 30fps cap

    function generateStars() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const vmin = Math.min(w, h);
      const mobileRatio = w < 768 ? 0.7 : 1;
      const total = Math.floor(vmin * densityRatio * mobileRatio);
      const staticCount = Math.floor(total * 0.7);
      const animCount = total - staticCount;
      const randAlpha = () => 0.25 + Math.random() * Math.max(0, defaultAlpha - 0.25);

      staticStars = Array.from({ length: staticCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        spriteIdx: Math.floor(Math.random() * sprites.length),
        alpha: randAlpha(),
      }));

      animStars = Array.from({ length: animCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        spriteIdx: Math.floor(Math.random() * sprites.length),
        baseBrightness: randAlpha(),
        twinkleSpeed: 2 + Math.random(),
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleMagnitude: 0.4 + Math.random() * 0.5,
      }));
    }

    function sizeCanvases() {
      // DPR capped at 1 — stars are blurry glows, extra pixels are invisible
      staticCanvas.width = window.innerWidth;
      staticCanvas.height = window.innerHeight;
      animCanvas.width = window.innerWidth;
      animCanvas.height = window.innerHeight;
    }

    function drawStaticLayer() {
      staticCtx.clearRect(0, 0, staticCanvas.width, staticCanvas.height);
      for (const star of staticStars) {
        const sprite = sprites[star.spriteIdx];
        staticCtx.globalAlpha = star.alpha;
        staticCtx.drawImage(sprite.canvas, star.x - sprite.half, star.y - sprite.half);
      }
      staticCtx.globalAlpha = 1;
    }

    function tick(now) {
      rafId = requestAnimationFrame(tick);
      if (now - lastFrame < FRAME_DURATION) return;
      lastFrame = now;
      time += 0.03;

      animCtx.clearRect(0, 0, animCanvas.width, animCanvas.height);
      for (const star of animStars) {
        const alpha = star.baseBrightness +
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) *
          star.twinkleMagnitude * star.baseBrightness;
        const sprite = sprites[star.spriteIdx];
        animCtx.globalAlpha = Math.max(0.01, Math.min(1, alpha));
        animCtx.drawImage(sprite.canvas, star.x - sprite.half, star.y - sprite.half);
      }
      animCtx.globalAlpha = 1;
    }

    function handleResize() {
      sizeCanvases();
      generateStars();
      drawStaticLayer();
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (rafId === null) {
        lastFrame = 0;
        rafId = requestAnimationFrame(tick);
      }
    }

    sizeCanvases();
    generateStars();
    drawStaticLayer();
    rafId = requestAnimationFrame(tick);

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [densityRatio, sizeLimit, defaultAlpha]);

  return (
    <>
      <canvas ref={staticCanvasRef} className="starry-background" />
      <canvas ref={animCanvasRef} className="starry-background" />
    </>
  );
};

export default StarryBackground;
