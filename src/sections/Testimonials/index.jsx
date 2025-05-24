import React, { useState } from 'react';
import './Testimonials.css';
import PlanetarySystem from './components/PlanetarySystem';
import TestimonialBubble from './components/TestimonialBubble';
import TestimonialModal from '../../components/TestimonialModal';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sunActive, setSunActive] = useState(false); // Track if sun is active
  
  // Customize the appearance of sun message
  const isSunMessage = activeTestimonial && activeTestimonial.id === 'sun';
  
  return (
    <section id="testimonials" className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-accent-light text-center">What People Say</h2>
        
        <PlanetarySystem 
          setActiveTestimonial={setActiveTestimonial}
          setModalOpen={setModalOpen}
          setSunActive={setSunActive}
        />
        
        {/* Show testimonial or sun message */}
        {activeTestimonial && !modalOpen && (
          <TestimonialBubble 
            testimonial={activeTestimonial}
            isSunMessage={isSunMessage}
            onDismiss={() => {
              setActiveTestimonial(null);
            }}
          />
        )}
      </div>
      
      {/* Use our modal component */}
      <TestimonialModal 
        isOpen={modalOpen}
        testimonial={activeTestimonial}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default Testimonials;