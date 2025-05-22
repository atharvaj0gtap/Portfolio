import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Show button when page is scrolled down and determine scroll direction
  useEffect(() => {
    const toggleVisibility = () => {
      const currentScrollY = window.pageYOffset;
      
      // Set visibility based on scroll position
      if (currentScrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Determine scroll direction
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [lastScrollY]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  // Handle button click based on current scroll direction
  const handleClick = () => {
    if (scrollingDown) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
  };

  return (
    <>
      {isVisible && (
        <button 
          className="scroll-to-top-btn"
          onClick={handleClick}
          aria-label={scrollingDown ? "Scroll to bottom" : "Scroll to top"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {scrollingDown ? (
              // Down arrow path
              <path d="M6 9l6 6 6-6"/>
            ) : (
              // Up arrow path (existing)
              <path d="M18 15l-6-6-6 6"/>
            )}
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;