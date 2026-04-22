import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const el = glowRef.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId = null;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const update = () => {
      rafId = null;
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      el.style.transform = `translate3d(${currentX - 210}px, ${currentY - 210}px, 0)`;

      if (Math.abs(mouseX - currentX) > 0.5 || Math.abs(mouseY - currentY) > 0.5) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    /* Hover amplification over interactive elements */
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        el.dataset.hover = 'true';
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        el.dataset.hover = 'false';
      }
    };
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
};

export default CursorGlow;
