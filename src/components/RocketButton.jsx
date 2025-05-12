import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './RocketButton.css'; // We'll create this for the border animation

const RocketButton = ({ href, text }) => {
  const buttonRef = useRef(null);
  const rocketRef = useRef(null);
  const flameRef = useRef(null);
  const textRef = useRef(null);
  const timeline = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const rocketSize = { width: "18px", height: "28px" }; // Store size consistently

  // Initialize flame
  useEffect(() => {
    // Initialize flame to be invisible
    gsap.set(flameRef.current, { 
      scaleY: 0.5, 
      transformOrigin: 'top center',
      opacity: 0,
      display: 'none'
    });
    
    // Navigation event listener to reset button if user navigates back
    const handleNavigation = () => {
      resetButton();
    };
    
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, []);
  
  // Function to reset button to initial state
  const resetButton = () => {
    gsap.killTweensOf([buttonRef.current, rocketRef.current, flameRef.current, textRef.current]);
    
    gsap.set(buttonRef.current, { 
      opacity: 1,
      clearProps: "all" 
    });
    
    // Don't clear all props for the rocket - maintain its size
    gsap.set(rocketRef.current, { 
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      // Explicitly set the size again to ensure consistency
      width: rocketSize.width,
      height: rocketSize.height
    });
    
    gsap.set(textRef.current, {
      opacity: 1,
      y: 0,
      clearProps: "all"
    });
    
    gsap.set(flameRef.current, { 
      scaleY: 0.5, 
      opacity: 0,
      display: 'none'
    });
    
    setIsAnimating(false);
  };

  const handleMouseEnter = () => {
    if (isAnimating) return;
    
    if (timeline.current) {
      timeline.current.kill();
    }
    
    // Create fresh hover effect
    const hoverTimeline = gsap.timeline();
    timeline.current = hoverTimeline;
    
    hoverTimeline
      .to(flameRef.current, { 
        opacity: 1,
        display: 'block',
        scaleY: 0.7,
        duration: 0.1 
      })
      .to(flameRef.current, {
        scaleY: () => gsap.utils.random(0.5, 0.9),
        duration: 0.1,
        repeat: -1,
        yoyo: true
      });
  };
  
  const handleMouseLeave = () => {
    if (isAnimating) return;
    
    if (timeline.current) {
      // Kill the timeline completely rather than pausing
      timeline.current.kill();
      timeline.current = null;
      
      // Direct animation to hide flame
      gsap.to(flameRef.current, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          gsap.set(flameRef.current, { display: 'none' });
        }
      });
    }
  };
  
  const handleClick = (e) => {
    e.preventDefault();
    
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Stop hover animation
    if (timeline.current) {
      timeline.current.kill();
      timeline.current = null;
    }
    
    // Create launch animation
    const launchTimeline = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          // Reset before navigating to ensure everything is back to normal
          resetButton();
          
          // Navigate to the target page
          window.location.href = href;
        }, 100);
      }
    });
    
    launchTimeline
      .to(flameRef.current, {
        opacity: 1,
        display: 'block',
        scaleY: 1.5,
        duration: 0.2,
        overwrite: true
      })
      .to(rocketRef.current, {
        y: -15,
        duration: 0.3,
        ease: "power1.in"
      })
      .to(flameRef.current, {
        scaleY: 2.5,
        duration: 0.2
      }, "-=0.2")
      .to(rocketRef.current, {
        y: -window.innerHeight,
        duration: 0.8,
        ease: "power4.in"
      })
      .to(buttonRef.current, {
        opacity: 0.5,
        duration: 0.3
      }, "-=0.7")
      .to(textRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2
      }, "-=0.8");
      
    // Safety timeout - if animation doesn't complete in 3 seconds, reset
    setTimeout(() => {
      if (isAnimating) {
        resetButton();
      }
    }, 3000);
  };
  
  return (
    <a 
      ref={buttonRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rocket-button px-6 py-3 bg-surface-overlay border border-accent-main/50 text-text-primary rounded-lg transition-all duration-600 relative"
    >
      <span ref={textRef} className="z-10">{text}</span>
      {/* Adjusted rocket size to better fill the button */}
      <div 
        ref={rocketRef} 
        className="relative z-10 inline-block ml-2 align-middle" 
        style={{ ...rocketSize, verticalAlign: "middle", marginBottom: "0px" }}
      >
        <svg 
          viewBox="0 0 20.91 41.39" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ width: "100%", height: "100%" }}
        >
          <path className="rocket-body" fill="currentColor" d="M-77.27,293.87a0.22,0.22,0,0,0-.06-0.14,0.48,0.48,0,0,0-.45,0c-1.36,3.09-3.42,12.92-3.09,14.75l4.68-5.93ZM-80.46,307q0.33-1.61.7-3.26,0.93-4.15,2-8l0.73,6.4Z" transform="translate(80.91 -267.9)"/>
          <path fill="currentColor" d="M-64.71,302.59l4.68,5.93c0.33-1.83-1.73-11.66-3.09-14.75a0.48,0.48,0,0,0-.45,0,0.22,0.22,0,0,0-.06.14Zm0.82-.43,0.73-6.4q1.07,3.83,2,8,0.37,1.65,.7,3.26Z" transform="translate(80.91 -267.9)"/>
          <path fill="currentColor" d="M-70.48,285.59A5.08,5.08,0,0,1-74,284.17a0.45,0.45,0,0,1,0-.64,0.45,0.45,0,0,1,.64,0,4.16,4.16,0,0,0,2.92,1.16,4.16,4.16,0,0,0,2.92-1.16,0.45,0.45,0,0,1,.64,0,0.45,0.45,0,0,1,0,.64A5.08,5.08,0,0,1-70.48,285.59Z" transform="translate(80.91 -267.9)"/>
          <polygon fill="currentColor" points="11.53 17.24 10.44 32.8 9.34 17.24 11.53 17.24"/>
          <path fill="currentColor" d="M-62.5,281.12l-8-13.22-7.65,13.16,3.37,21.14A4.33,4.33,0,0,0-74,303a5.76,5.76,0,0,0,7,0,4.33,4.33,0,0,0,.75-0.84Zm-4.43,19.65a5.14,5.14,0,0,1-1.31.87,5.6,5.6,0,0,1-4.42,0,5.14,5.14,0,0,1-1.31-.87l-3-19.19c0.76-1.79,1.66-3.69,2.73-5.68a70.71,70.71,0,0,1,3.75-6.2,70.73,70.73,0,0,1,3.75,6.2c1.06,2,2,3.89,2.73,5.68Z" transform="translate(80.91 -267.9)"/>
          <path fill="currentColor" d="M-70.48,278.32a3.16,3.16,0,0,0-3.33,3,3.16,3.16,0,0,0,3.33,3,3.16,3.16,0,0,0,3.33-3A3.16,3.16,0,0,0-70.48,278.32Z" transform="translate(80.91 -267.9)"/>
        </svg>
        
        {/* Adjusted flame size to match */}
        <div 
          ref={flameRef} 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[80%]"
          style={{ display: 'none', filter: 'drop-shadow(0 0 2px rgba(255, 150, 50, 0.7))', width: "8px", height: "14px" }}
        >
          <svg width="8" height="14" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 0C5 0 0 5 0 8.5C0 12 2.5 15 5 15C7.5 15 10 12 10 8.5C10 5 5 0 5 0Z" fill="#FF9D00"/>
            <path d="M5 3C5 3 2 7 2 9.5C2 12 3.5 13.5 5 13.5C6.5 13.5 8 12 8 9.5C8 7 5 3 5 3Z" fill="#FF0000"/>
          </svg>
        </div>
      </div>
    </a>
  );
};

export default RocketButton;