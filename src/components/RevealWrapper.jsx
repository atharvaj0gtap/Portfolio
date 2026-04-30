import React, { useEffect, useRef, useState } from 'react';

/**
 * A component that reveals its children with a fade-in animation when scrolled into view
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be revealed
 * @param {number} props.delay - Delay before animation starts (in seconds)
 * @param {number} props.duration - Animation duration (in seconds)
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.threshold - Intersection observer threshold (0-1)
 * @param {string} props.direction - Animation direction ('up', 'down', 'left', 'right', or 'none')
 */
const RevealWrapper = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = "", 
  threshold = 0.1,
  direction = 'up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element comes into view, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: threshold
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Set up transform direction
  const directionMap = {
    up: 'translateY(20px)',
    down: 'translateY(-20px)',
    left: 'translateX(20px)',
    right: 'translateX(-20px)',
    none: 'none'
  };

  const initialTransform = directionMap[direction] || directionMap.up;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : initialTransform,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
        willChange: isVisible ? 'auto' : 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default RevealWrapper;