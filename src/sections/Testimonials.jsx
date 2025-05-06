import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Testimonials.css';
import TestimonialModal from '../components/TestimonialModal';

const testimonialData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Senior Developer at TechCorp",
    company: "TechCorp",
    testimonial: "Atharva's attention to detail and problem-solving skills are exceptional. The solutions he developed streamlined our processes by 40%.",
    image: "/assets/testimonials/person1.jpg",
    color: "#FF6B6B" // Mars-like
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Manager",
    company: "InnovateX",
    testimonial: "Working with Atharva was a game-changer for our project. His ability to translate complex requirements into elegant code made all the difference.",
    image: "/assets/testimonials/person2.jpg",
    color: "#4ECDC4" // Neptune-like
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "CTO",
    company: "StartupVision",
    testimonial: "Atharva not only delivered on time but exceeded our expectations with additional optimizations we hadn't even considered.",
    image: "/assets/testimonials/person3.jpg",
    color: "#FFD166" // Saturn-like
  },
  {
    id: 4,
    name: "Jamie Wilson",
    role: "Design Lead",
    company: "CreativeSphere",
    testimonial: "The collaboration between our design team and Atharva was seamless. He has a rare talent for understanding both visual aesthetics and technical limitations.",
    image: "/assets/testimonials/person4.jpg",
    color: "#6A0572" // Jupiter-like
  }
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const planetsRef = useRef([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize Three.js scene
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 20, 40);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = false;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    
    // Create sun (logo)
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({
      emissive: 0xf5e942,
      emissiveIntensity: 1,
      color: 0xf5e942
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    // Create orbit paths
    const createOrbitPath = (radius) => {
      const curve = new THREE.EllipseCurve(
        0, 0,             // Center x, y
        radius, radius,   // xRadius, yRadius
        0, 2 * Math.PI,   // Start angle, end angle
        false,            // Clockwise
        0                 // Rotation
      );
      
      const points = curve.getPoints(128);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.2
      });
      
      const ellipse = new THREE.Line(geometry, material);
      ellipse.rotation.x = Math.PI / 2;
      scene.add(ellipse);
    };
    
    // Create planets
    const planets = [];
    testimonialData.forEach((item, index) => {
      const radius = 8 + index * 5; // Increasing orbit radius
      createOrbitPath(radius);
      
      // Create planet
      const planetGeometry = new THREE.SphereGeometry(1.2, 32, 32);
      const planetMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(item.color),
        roughness: 0.7,
        metalness: 0.3
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      
      // Random starting position on the orbit
      const angle = Math.random() * Math.PI * 2;
      planet.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
      
      // Store the orbit parameters for animation
      planet.userData = {
        orbitRadius: radius,
        orbitSpeed: 0.05 - (index * 0.01), // Slower speed for outer planets
        angle: angle,
        testimonialId: item.id
      };
      
      scene.add(planet);
      planets.push(planet);
    });
    
    planetsRef.current = planets;
    
    // Raycaster for interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const handleClick = (event) => {
      // Normalize mouse position
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets);
      
      if (intersects.length > 0) {
        const planetId = intersects[0].object.userData.testimonialId;
        const testimonial = testimonialData.find(t => t.id === planetId);
        setActiveTestimonial(testimonial);
        setModalOpen(true);
      }
    };
    
    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets);
      
      document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
      
      // Reset all planets to normal size
      planets.forEach(planet => {
        if (!planet.userData.isAnimating) {
          planet.scale.set(1, 1, 1);
        }
      });
      
      // Scale up hovered planet
      if (intersects.length > 0) {
        const planet = intersects[0].object;
        planet.scale.set(1.3, 1.3, 1.3);
        
        const testimonial = testimonialData.find(t => t.id === planet.userData.testimonialId);
        setActiveTestimonial(testimonial);
      } else {
        setActiveTestimonial(null);
      }
    };
    
    // Add touch events for mobile users
    const handleTouchStart = (event) => {
      // Prevent default to avoid scrolling issues
      event.preventDefault();
      
      // Convert touch to mouse position
      const touch = event.touches[0];
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((touch.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((touch.clientY - rect.top) / height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets);
      
      if (intersects.length > 0) {
        const planet = intersects[0].object;
        planet.scale.set(1.3, 1.3, 1.3);
        
        const planetId = planet.userData.testimonialId;
        const testimonial = testimonialData.find(t => t.id === planetId);
        setActiveTestimonial(testimonial);
        
        // Store the touched planet for validation on touchend
        renderer.domElement.dataset.touchedPlanetId = planetId;
      } else {
        renderer.domElement.dataset.touchedPlanetId = '';
      }
    };

    const handleTouchEnd = (event) => {
      // Get the stored planet ID from touchstart
      const touchedPlanetId = renderer.domElement.dataset.touchedPlanetId;
      
      if (touchedPlanetId) {
        const testimonial = testimonialData.find(t => t.id === parseInt(touchedPlanetId));
        if (testimonial) {
          setActiveTestimonial(testimonial);
          setModalOpen(true);
        }
        
        // Reset the stored planet ID
        renderer.domElement.dataset.touchedPlanetId = '';
      }
    };

    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    renderer.domElement.addEventListener('touchend', handleTouchEnd);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate planets in orbit
      planets.forEach(planet => {
        planet.userData.angle += planet.userData.orbitSpeed / 30; // Slow motion
        
        planet.position.x = Math.cos(planet.userData.angle) * planet.userData.orbitRadius;
        planet.position.z = Math.sin(planet.userData.angle) * planet.userData.orbitRadius;
        
        // Planet self-rotation
        planet.rotation.y += 0.005;
      });
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      renderer.domElement.removeEventListener('touchend', handleTouchEnd);
      
      container.removeChild(renderer.domElement);
      
      planets.forEach(planet => {
        scene.remove(planet);
        planet.geometry.dispose();
        planet.material.dispose();
      });
      
      scene.remove(sun);
      sunGeometry.dispose();
      sunMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);
  
  return (
    <section id="testimonials" className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center">What People Say</h2>
        
        <div 
          ref={containerRef} 
          className="planetary-container"
          style={{ height: '500px' }}
        />
        
        {activeTestimonial && !modalOpen && (
          <div className="testimonial-bubble">
            <p className="testimonial-quote">"{activeTestimonial.testimonial}"</p>
            <div className="testimonial-author">
              <span className="font-bold">{activeTestimonial.name}</span>
              <span className="text-sm opacity-75">{activeTestimonial.role} at {activeTestimonial.company}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Use our new modal component */}
      <TestimonialModal 
        isOpen={modalOpen}
        testimonial={activeTestimonial}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default Testimonials;