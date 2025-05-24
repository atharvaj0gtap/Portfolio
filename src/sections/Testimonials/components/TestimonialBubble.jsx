import React, { useRef, useState, useEffect } from 'react';

const TestimonialBubble = ({ testimonial, isSunMessage, onDismiss }) => {
  const [swipePosition, setSwipePosition] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const startXRef = useRef(0);
  const bubbleRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle swipe dismissal (mobile only)
  useEffect(() => {
    if (isMobile && Math.abs(swipePosition) > 100 && onDismiss) {
      const direction = swipePosition > 0 ? 'right' : 'left';
      onDismiss(direction);
    }
  }, [swipePosition, onDismiss, isMobile]);

  if (!testimonial) return null;

  // Swipe handlers (only active on mobile)
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    startXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isMobile || !isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    setSwipePosition(diff);
  };
  
  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    // If not swiped far enough, animate back to center
    if (Math.abs(swipePosition) <= 100) {
      setSwipePosition(0);
    }
    
    setIsSwiping(false);
  };

  // Calculate opacity based on swipe distance (mobile only)
  const mobileStyles = isMobile ? {
    opacity: Math.max(0, 1 - Math.abs(swipePosition) / 200),
    transition: isSwiping ? 'none' : 'transform 0.3s ease, opacity 0.3s ease'
  } : {};

  return (
    <div 
      ref={bubbleRef}
      className={`testimonial-bubble ${isSunMessage ? 'sun-message' : ''}`}
      style={mobileStyles}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Display the short testimonial in the bubble */}
      <p className="testimonial-quote">"{testimonial.shortTestimonial || testimonial.testimonial}"</p>
      <div className="testimonial-author">
        <span className="font-bold">{testimonial.name}</span>
        <span className="text-sm opacity-75">{testimonial.role}</span>
        {testimonial.company && (
          <span className="text-sm opacity-75"> at {testimonial.company}</span>
        )}
      </div>
    </div>
  );
};

export default TestimonialBubble;