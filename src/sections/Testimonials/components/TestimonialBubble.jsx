import React from 'react';

const TestimonialBubble = ({ testimonial, isSunMessage }) => {
  if (!testimonial) return null;

  return (
    <div className={`testimonial-bubble ${isSunMessage ? 'sun-message' : ''}`}>
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