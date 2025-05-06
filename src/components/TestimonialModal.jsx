import React from 'react';

const TestimonialModal = ({ isOpen, testimonial, onClose }) => {
  if (!isOpen || !testimonial) return null;
  
  return (
    <div className="testimonial-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-grid">
          <div className="modal-image-container">
            <div 
              className="modal-image" 
              style={{ 
                backgroundColor: testimonial.color,
                backgroundImage: `url(${testimonial.image})`
              }}
            />
          </div>
          
          <div className="modal-text">
            <blockquote className="modal-quote">
              "{testimonial.testimonial}"
            </blockquote>
            
            <div className="modal-author">
              <h3 className="author-name">{testimonial.name}</h3>
              <p className="author-title">{testimonial.role}</p>
              <p className="author-company">{testimonial.company}</p>
            </div>
            
            <div className="modal-actions">
              <button className="action-button">View Case Study</button>
              <button className="action-button secondary">Contact Reference</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialModal;