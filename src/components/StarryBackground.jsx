import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './StarryBackground.css';

const StarryBackground = ({
  densityRatio = 0.15,     // Lower density for subtle effect
  sizeLimit = 3,          // Smaller stars
  defaultAlpha = 0.3,     // Low opacity by default
  scaleLimit = 2.5,       // How much stars can scale up
  proximityRatio = 0.15   // How close the mouse needs to be
}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const starsRef = useRef(null);
  const vminRef = useRef(null);
  const scaleMapperRef = useRef(null);
  const alphaMapperRef = useRef(null);
  const timeRef = useRef(0);
  const animationFrameRef = useRef(null);  // Add reference to track animation frame
  const starsDataRef = useRef(null);  // Store stars data separately for persistence
  
  useEffect(() => {
    // Get the canvas context
    contextRef.current = canvasRef.current.getContext('2d');
    
    const LOAD = () => {
        // Calculate viewport min dimension and setup references
      vminRef.current = Math.min(window.innerHeight, window.innerWidth);
      
      // Mobile optimization: reduce star density on smaller screens
      const isMobile = window.innerWidth < 768;
      const mobileRatio = isMobile ? 0.7 : 1; // 30% fewer stars on mobile
      const STAR_COUNT = Math.floor(vminRef.current * densityRatio * mobileRatio);
      
      // Create mapping functions for scale and alpha based on distance
      scaleMapperRef.current = gsap.utils.mapRange(
        0,
        vminRef.current * proximityRatio,
        scaleLimit,
        1
      );
      alphaMapperRef.current = gsap.utils.mapRange(
        0,
        vminRef.current * proximityRatio,
        1,
        defaultAlpha
      );
      
      // Size the canvas to fill the viewport
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      
      // Preserve star data if already exists (for mobile persistence)
      if (!starsDataRef.current || starsDataRef.current.length !== STAR_COUNT) {
        starsDataRef.current = new Array(STAR_COUNT).fill().map(() => ({
          x: gsap.utils.random(0, window.innerWidth, 1),
          y: gsap.utils.random(0, window.innerHeight, 1),
          size: gsap.utils.random(1, sizeLimit, 1),
          scale: 1,
          alpha: gsap.utils.random(0.1, defaultAlpha, 0.1),
          baseBrightness: gsap.utils.random(0.1, defaultAlpha, 0.1),
          twinkleSpeed: gsap.utils.random(2, 3, 0.5), 
          twinkleOffset: gsap.utils.random(0, Math.PI * 2, 0.01),
          twinkleMagnitude: gsap.utils.random(0.3, 0.7, 0.01)
        }));
      }
      
      // Always use the preserved star data
      starsRef.current = starsDataRef.current;
    };
    
    // Function to render all stars
    const RENDER = () => {
      // Increment time for animation - increased for more noticeable twinkling
      timeRef.current += 0.03; // Faster time progression
      
      if (!contextRef.current || !canvasRef.current || !starsRef.current) return;
      
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      
      starsRef.current.forEach(star => {
        // Calculate twinkling alpha modifier with more dramatic effect
        const twinkleAlpha = star.baseBrightness + 
          Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset) * 
          star.twinkleMagnitude * star.baseBrightness;
        
        // Use the higher of twinkling alpha or interaction alpha
        const displayAlpha = Math.max(twinkleAlpha, star.alpha);
        
        contextRef.current.fillStyle = `rgba(255, 255, 255, ${displayAlpha})`;

        contextRef.current.beginPath();
        contextRef.current.arc(
          star.x,
          star.y,
          (star.size / 2) * star.scale,
          0,
          Math.PI * 2
        );
        contextRef.current.fill();
      });
    };
    
    // Function to update stars based on pointer position
    const UPDATE = ({ clientX, clientY }) => {
      if (!starsRef.current) return;
      
      starsRef.current.forEach(star => {
        const DISTANCE = Math.sqrt(
          Math.pow(star.x - clientX, 2) + Math.pow(star.y - clientY, 2)
        );
        gsap.to(star, {
          scale: scaleMapperRef.current(
            Math.min(DISTANCE, vminRef.current * proximityRatio)
          ),
          alpha: alphaMapperRef.current(
            Math.min(DISTANCE, vminRef.current * proximityRatio)
          ),
          duration: 0.3
        });
      });
    };
    
    // Function to reset stars when pointer leaves
    const EXIT = () => {
      if (!starsRef.current) return;
      
      gsap.to(starsRef.current, {
        scale: 1,
        alpha: gsap.utils.distribute({
          base: 0.1,
          amount: defaultAlpha - 0.1,
          ease: "power1.in"
        }),
        duration: 0.5
      });
    };
    
    // Initialize
    LOAD();
    
    // Use direct requestAnimationFrame for more reliable animation
    let animationFrameId;
    const animate = () => {
      RENDER();
      animationFrameId = requestAnimationFrame(animate);
      animationFrameRef.current = animationFrameId; // Store ID in ref for persistence
    };
    animate();
    
    // Add event listeners
    window.addEventListener('resize', LOAD);
    window.addEventListener('pointermove', UPDATE);
    window.addEventListener('pointerleave', EXIT);
    
    // Mobile-specific: handle visibility changes to prevent refresh on section change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        animate(); // Resume animation when visible again
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', LOAD);
      window.removeEventListener('pointermove', UPDATE);
      window.removeEventListener('pointerleave', EXIT);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [densityRatio, sizeLimit, defaultAlpha, scaleLimit, proximityRatio]);
  
  return <canvas ref={canvasRef} className="starry-background" />;
};

export default StarryBackground;