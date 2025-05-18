import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { testimonialData, sunData } from '../data/testimonialData';

const PlanetarySystem = ({ 
  setActiveTestimonial, 
  setModalOpen, 
  setSunActive 
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const planetsRef = useRef([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize Three.js scene
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Check if on mobile device
    const isMobile = window.innerWidth < 768;
    
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
    
    // Configure controls differently based on device
    if (isMobile) {
      // Disable all controls on mobile
      controls.enabled = false;
      // Set a fixed, optimized camera position for mobile
      camera.position.set(0, 25, 35); // Slightly adjusted for better mobile view
      camera.lookAt(0, 0, 0);
    } else {
      // Keep existing control configuration for laptop/desktop
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = false;
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    
    // Load textures
    const textureLoader = new THREE.TextureLoader();
    
    // Create sun with texture
    const sunTexture = textureLoader.load('/assets/textures/sun.jpg');
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: 0xf5e942,
      emissiveIntensity: 0.6,
      emissiveMap: sunTexture
    });
    
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    
    // Add user data to enable interaction
    sun.userData = {
      isSun: true,
      originalScale: new THREE.Vector3(1, 1, 1),
      isFocused: false
    };
    
    scene.add(sun);
    
    // Create orbit paths with references to track them
    const createOrbitPath = (radius, index) => {
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
      ellipse.userData = { planetIndex: index };
      scene.add(ellipse);
      
      return ellipse;
    };
    
    // Store orbit paths references
    const orbitPaths = [];
    
    // Create planets
    const planets = [];
    testimonialData.forEach((item, index) => {
      const radius = 8 + index * 5; // Increasing orbit radius
      const orbitPath = createOrbitPath(radius, index);
      orbitPaths.push(orbitPath);
      
      // Create planet
      const planetGeometry = new THREE.SphereGeometry(1.2, 32, 32);
      
      // Load a texture based on planet type
      const planetTexture = textureLoader.load(`/assets/textures/${item.id}.jpg`);
      const planetMaterial = new THREE.MeshStandardMaterial({
        map: planetTexture,
        roughness: 0.9,
        metalness: 0.2,
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
        testimonialId: item.id,
        orbitPathIndex: index, // Store the index of this planet's orbit path
        isFocused: false // Track focus state
      };
      
      scene.add(planet);
      planets.push(planet);
      
      // Make planets focusable and keyboard navigable
      planet.userData.htmlElement = document.createElement('button');
      planet.userData.htmlElement.className = 'sr-only planet-focus-button';
      planet.userData.htmlElement.setAttribute('aria-label', `Testimonial from ${item.name}`);
      planet.userData.htmlElement.style.position = 'absolute';
      planet.userData.htmlElement.style.opacity = '0';
      planet.userData.htmlElement.style.pointerEvents = 'none';
      container.appendChild(planet.userData.htmlElement);
    });
    
    planetsRef.current = planets;
    
    // Make sun focusable for keyboard navigation
    sun.userData.htmlElement = document.createElement('button');
    sun.userData.htmlElement.className = 'sr-only planet-focus-button';
    sun.userData.htmlElement.setAttribute('aria-label', 'Message from Atharva');
    sun.userData.htmlElement.style.position = 'absolute';
    sun.userData.htmlElement.style.opacity = '0';
    sun.userData.htmlElement.style.pointerEvents = 'none';
    container.appendChild(sun.userData.htmlElement);
    
    // Raycaster for interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const handleClick = (event) => {
      // Normalize mouse position
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      // Check for sun intersection
      const sunIntersects = raycaster.intersectObject(sun);
      if (sunIntersects.length > 0) {
        // Show sun message in modal if clicked
        setActiveTestimonial({
          id: 'sun',
          name: sunData.title,
          role: sunData.subtitle,
          testimonial: sunData.message,
          company: "",
          color: "#f5e942" // Sun color
        });
        setModalOpen(true);
        return;
      }
      
      // Check planet intersections
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
      
      // Check for sun intersection
      const sunIntersects = raycaster.intersectObject(sun);
      
      // Reset all planets to normal size
      planets.forEach(planet => {
        if (!planet.userData.isAnimating) {
          planet.scale.set(1, 1, 1);
        }
      });
      
      // Reset sun to normal if not hovered
      if (!sun.userData.isFocused) {
        sun.scale.set(1, 1, 1);
      }
      
      if (sunIntersects.length > 0) {
        // Hover effect for sun
        document.body.style.cursor = 'pointer';
        sun.scale.set(1.3, 1.3, 1.3); // Now matching planet scale
        
        // Rest of code remains the same
        setActiveTestimonial({
          id: 'sun',
          name: sunData.title,
          role: sunData.subtitle,
          testimonial: sunData.message,
          company: "",
          color: "#f5e942" // Sun color
        });
        setSunActive(true);
        return;
      } else {
        setSunActive(false);
      }
      
      // Check planet intersections (existing code)
      const intersects = raycaster.intersectObjects(planets);
      
      document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
      
      // Reset all planets and orbits to normal
      planets.forEach(planet => {
        if (!planet.userData.isFocused) {
          planet.scale.set(1, 1, 1);
        }
      });
      
      orbitPaths.forEach(orbit => {
        orbit.material.opacity = 0.2;
        orbit.material.color.set(0xffffff);
      });
      
      // Scale up hovered planet and highlight its orbit
      if (intersects.length > 0) {
        const planet = intersects[0].object;
        planet.scale.set(1.3, 1.3, 1.3);
        
        // Highlight the orbital path of this planet
        const orbitIndex = planet.userData.orbitPathIndex;
        if (orbitPaths[orbitIndex]) {
          orbitPaths[orbitIndex].material.opacity = 0.6;
          
          const planetId = planet.userData.testimonialId;
          const testimonialItem = testimonialData.find(t => t.id === planetId);
          if (testimonialItem && testimonialItem.color) {
            orbitPaths[orbitIndex].material.color.set(testimonialItem.color);
          }
        }
        
        const testimonial = testimonialData.find(t => t.id === planet.userData.testimonialId);
        setActiveTestimonial(testimonial);
      } else if (!sunIntersects.length > 0) {
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
      
      // Check for sun intersection
      const sunIntersects = raycaster.intersectObject(sun);
      if (sunIntersects.length > 0) {
        sun.scale.set(1.3, 1.3, 1.3);
        renderer.domElement.dataset.touchedElementId = 'sun';
        return;
      }
      
      // Check for planet intersections
      const intersects = raycaster.intersectObjects(planets);
      if (intersects.length > 0) {
        const planet = intersects[0].object;
        planet.scale.set(1.3, 1.3, 1.3);
        
        const planetId = planet.userData.testimonialId;
        renderer.domElement.dataset.touchedElementId = planetId;
      } else {
        renderer.domElement.dataset.touchedElementId = '';
      }
    };

    const handleTouchEnd = (event) => {
      // Get the stored element ID from touchstart
      const touchedElementId = renderer.domElement.dataset.touchedElementId;
      
      if (touchedElementId === 'sun') {
        setActiveTestimonial({
          id: 'sun',
          name: sunData.title,
          role: sunData.subtitle,
          testimonial: sunData.message,
          company: "",
          color: "#f5e942" // Sun color
        });
        setModalOpen(true);
      } else if (touchedElementId) {
        const testimonial = testimonialData.find(t => t.id === parseInt(touchedElementId));
        if (testimonial) {
          setActiveTestimonial(testimonial);
          setModalOpen(true);
        }
      }
      
      // Reset the stored element ID
      renderer.domElement.dataset.touchedElementId = '';
    };

    // Add event listeners
    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    renderer.domElement.addEventListener('touchend', handleTouchEnd);
    
    // Handle keyboard focus
    const handleFocusIn = () => {
      planets.forEach(planet => {
        const planetButton = planet.userData.htmlElement;
        
        // Add focus event listener
        planetButton.addEventListener('focus', () => {
          // Set focus flag
          planet.userData.isFocused = true;
          
          // Scale up planet
          planet.scale.set(1.3, 1.3, 1.3);
          
          // Highlight orbit
          const orbitIndex = planet.userData.orbitPathIndex;
          if (orbitPaths[orbitIndex]) {
            orbitPaths[orbitIndex].material.opacity = 0.6;
            
            const planetId = planet.userData.testimonialId;
            const testimonialItem = testimonialData.find(t => t.id === planetId);
            if (testimonialItem && testimonialItem.color) {
              orbitPaths[orbitIndex].material.color.set(testimonialItem.color);
            }
          }
          
          // Show testimonial
          const testimonial = testimonialData.find(t => t.id === planet.userData.testimonialId);
          setActiveTestimonial(testimonial);
        });
        
        // Add blur event listener
        planetButton.addEventListener('blur', () => {
          planet.userData.isFocused = false;
          planet.scale.set(1, 1, 1);
          
          // Reset orbit highlight
          const orbitIndex = planet.userData.orbitPathIndex;
          if (orbitPaths[orbitIndex]) {
            orbitPaths[orbitIndex].material.opacity = 0.2;
            orbitPaths[orbitIndex].material.color.set(0xffffff);
          }
          
          setActiveTestimonial(null);
        });
        
        // Add keydown event for Enter/Space activation
        planetButton.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const testimonial = testimonialData.find(t => t.id === planet.userData.testimonialId);
            setActiveTestimonial(testimonial);
            setModalOpen(true);
          }
        });
      });
    };
    
    // Add sun focus events
    sun.userData.htmlElement.addEventListener('focus', () => {
      sun.userData.isFocused = true;
      sun.scale.set(1.3, 1.3, 1.3); 
      
      setActiveTestimonial({
        id: 'sun',
        name: sunData.title,
        role: sunData.subtitle,
        testimonial: sunData.message,
        company: "",
        color: "#f5e942" // Sun color
      });
    });
    
    sun.userData.htmlElement.addEventListener('blur', () => {
      sun.userData.isFocused = false;
      sun.scale.set(1, 1, 1);
      setActiveTestimonial(null);
    });
    
    // Add keydown event for Enter/Space activation on sun
    sun.userData.htmlElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveTestimonial({
          id: 'sun',
          name: sunData.title,
          role: sunData.subtitle,
          testimonial: sunData.message,
          company: "",
          color: "#f5e942" // Sun color
        });
        setModalOpen(true);
      }
    });
    
    // Call the focus handler
    handleFocusIn();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate planets in orbit
      planets.forEach(planet => {
        planet.userData.angle += planet.userData.orbitSpeed / 30; 
        
        planet.position.x = Math.cos(planet.userData.angle) * planet.userData.orbitRadius;
        planet.position.z = Math.sin(planet.userData.angle) * planet.userData.orbitRadius;
        
        // Planet self-rotation
        planet.rotation.y += 0.005;
      });
      
      // Animate sun rotation
      sun.rotation.y += 0.001;
      
      // Update focus elements positions
      const updateFocusElements = () => {
        planets.forEach(planet => {
          if (planet.userData.htmlElement) {
            // Project 3D position to screen coordinates
            const vector = new THREE.Vector3();
            vector.setFromMatrixPosition(planet.matrixWorld);
            vector.project(camera);
            
            const x = (vector.x * 0.5 + 0.5) * width;
            const y = (-vector.y * 0.5 + 0.5) * height;
            
            planet.userData.htmlElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
          }
        });
        
        // Update sun focus element
        if (sun.userData.htmlElement) {
          const vector = new THREE.Vector3();
          vector.setFromMatrixPosition(sun.matrixWorld);
          vector.project(camera);
          
          const x = (vector.x * 0.5 + 0.5) * width;
          const y = (-vector.y * 0.5 + 0.5) * height;
          
          sun.userData.htmlElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        }
      };
      
      updateFocusElements();
      
      // Only update controls if not on mobile
      if (!isMobile) {
        controls.update();
      }
      
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
      
      // Update isMobile check on resize
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        // Update controls if device type changes
        if (newIsMobile) {
          controls.enabled = false;
          camera.position.set(0, 25, 35);
          camera.lookAt(0, 0, 0);
        } else {
          controls.enabled = true;
          controls.enableDamping = true;
          controls.enableZoom = false;
          controls.enablePan = false;
          controls.autoRotate = false;
        }
      }
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
        
        if (planet.userData.htmlElement && planet.userData.htmlElement.parentNode) {
          planet.userData.htmlElement.parentNode.removeChild(planet.userData.htmlElement);
        }
      });
      
      scene.remove(sun);
      sunGeometry.dispose();
      sunMaterial.dispose();
      
      renderer.dispose();
      
      // Clean up sun's HTML element
      if (sun.userData.htmlElement && sun.userData.htmlElement.parentNode) {
        sun.userData.htmlElement.parentNode.removeChild(sun.userData.htmlElement);
      }
    };
  }, [setActiveTestimonial, setModalOpen, setSunActive]);

  return (
    <div 
      ref={containerRef} 
      className="planetary-container"
      style={{ height: '500px' }}
    />
  );
};

export default PlanetarySystem;