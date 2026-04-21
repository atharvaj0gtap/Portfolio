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
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold text-center mb-3">Testimonials</p>
        <h2 className="font-display text-3xl md:text-4xl mb-4 text-accent-light text-center">What People Say</h2>
        <p className="text-text-muted text-center text-sm mb-12">Click a planet to read a testimonial</p>
        
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