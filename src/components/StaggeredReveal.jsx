import React, { useEffect, useRef, useState } from 'react';

/**
 * A component that reveals its direct children with a staggered fade-in animation
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be revealed
 * @param {number} props.baseDelay - Initial delay before animations start (in seconds)
 * @param {number} props.staggerDelay - Delay between each child animation (in seconds)
 * @param {number} props.duration - Animation duration for each child (in seconds)
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.threshold - Intersection observer threshold (0-1)
 * @param {string} props.direction - Animation direction ('up', 'down', 'left', 'right', or 'none')
 */
const StaggeredReveal = ({
  children,
  baseDelay = 0.1,
  staggerDelay = 0.1,
  duration = 0.5,
  className = "",
  threshold = 0.1,
  direction = 'up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  // Direction map for transforms
  const directionMap = {
    up: 'translateY(20px)',
    down: 'translateY(-20px)',
    left: 'translateX(20px)',
    right: 'translateX(-20px)',
    none: 'none'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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

  // Clone children and add staggered animation styles
  const staggeredChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    
    const delay = baseDelay + (index * staggerDelay);
    const initialTransform = directionMap[direction] || directionMap.up;
    
    return React.cloneElement(child, {
      style: {
        ...child.props.style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : initialTransform,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
        willChange: 'opacity, transform'
      }
    });
  });

  return (
    <div ref={ref} className={className}>
      {staggeredChildren}
    </div>
  );
};

export default StaggeredReveal;