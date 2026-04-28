import React, { useRef, useEffect } from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderer,
  AmbientLight, PointLight, TextureLoader,
  MeshStandardMaterial, SphereGeometry, Mesh,
  EllipseCurve, BufferGeometry, LineBasicMaterial, Line,
  Raycaster, Vector2, Vector3,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { testimonialData, sunData } from '../data/testimonialData';

const PlanetarySystem = ({
  setActiveTestimonial,
  setModalOpen,
  setSunActive,
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const planetsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 20, 40);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    if (isMobile) {
      controls.enabled = false;
      camera.position.set(0, 35, 45);
      camera.lookAt(0, 0, 0);
    } else {
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = false;
    }

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new PointLight(0xffffff, 2);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Sun
    const textureLoader = new TextureLoader();
    const sunTexture = textureLoader.load('/assets/textures/sun.jpg');
    const sunMaterial = new MeshStandardMaterial({
      map: sunTexture,
      emissive: 0xf5e942,
      emissiveIntensity: 0.6,
      emissiveMap: sunTexture,
    });
    const sunGeometry = new SphereGeometry(3, 32, 32);
    const sun = new Mesh(sunGeometry, sunMaterial);
    sun.userData = {
      isSun: true,
      originalScale: new Vector3(1, 1, 1),
      isFocused: false,
    };
    scene.add(sun);

    // Orbit paths
    const createOrbitPath = (radius, index) => {
      const curve = new EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128);
      const geometry = new BufferGeometry().setFromPoints(points);
      const material = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
      const ellipse = new Line(geometry, material);
      ellipse.rotation.x = Math.PI / 2;
      ellipse.userData = { planetIndex: index };
      scene.add(ellipse);
      return ellipse;
    };

    const orbitPaths = [];

    // Planets
    const planets = [];
    testimonialData.forEach((item, index) => {
      const radius = 8 + index * 5;
      const orbitPath = createOrbitPath(radius, index);
      orbitPaths.push(orbitPath);

      const planetGeometry = new SphereGeometry(1.2, 32, 32);
      const planetTexture = textureLoader.load(`/assets/textures/${item.id}.jpg`);
      const planetMaterial = new MeshStandardMaterial({
        map: planetTexture,
        roughness: 0.9,
        metalness: 0.2,
      });
      const planet = new Mesh(planetGeometry, planetMaterial);

      const angle = Math.random() * Math.PI * 2;
      planet.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      planet.userData = {
        orbitRadius: radius,
        orbitSpeed: 0.05 - index * 0.01,
        angle,
        testimonialId: item.id,
        orbitPathIndex: index,
        isFocused: false,
      };

      scene.add(planet);
      planets.push(planet);

      const btn = document.createElement('button');
      btn.className = 'sr-only planet-focus-button';
      btn.setAttribute('aria-label', `Testimonial from ${item.name}`);
      btn.style.position = 'absolute';
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
      container.appendChild(btn);
      planet.userData.htmlElement = btn;
    });

    planetsRef.current = planets;

    // Sun accessible button
    const sunBtn = document.createElement('button');
    sunBtn.className = 'sr-only planet-focus-button';
    sunBtn.setAttribute('aria-label', 'Message from Atharva');
    sunBtn.style.position = 'absolute';
    sunBtn.style.opacity = '0';
    sunBtn.style.pointerEvents = 'none';
    container.appendChild(sunBtn);
    sun.userData.htmlElement = sunBtn;

    // Raycaster
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const handleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const sunIntersects = raycaster.intersectObject(sun);
      if (sunIntersects.length > 0) {
        // Sun is hover-only — clicking it does nothing
        return;
      }

      const intersects = raycaster.intersectObjects(planets);
      if (intersects.length > 0) {
        const testimonial = testimonialData.find((t) => t.id === intersects[0].object.userData.testimonialId);
        setActiveTestimonial(testimonial);
        setModalOpen(true);
      }
    };

    const handleMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const sunIntersects = raycaster.intersectObject(sun);

      planets.forEach((planet) => { if (!planet.userData.isAnimating) planet.scale.set(1, 1, 1); });
      if (!sun.userData.isFocused) sun.scale.set(1, 1, 1);

      if (sunIntersects.length > 0) {
        document.body.style.cursor = 'pointer';
        sun.scale.set(1.2, 1.2, 1.2);
        setActiveTestimonial({ id: 'sun', name: sunData.title, role: sunData.subtitle, testimonial: sunData.message, company: '', color: '#f5e942' });
        setSunActive(true);
        return;
      } else {
        setSunActive(false);
      }

      const intersects = raycaster.intersectObjects(planets);
      document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';

      planets.forEach((planet) => { if (!planet.userData.isFocused) planet.scale.set(1, 1, 1); });
      orbitPaths.forEach((orbit) => { orbit.material.opacity = 0.2; orbit.material.color.set(0xffffff); });

      if (intersects.length > 0) {
        const planet = intersects[0].object;
        planet.scale.set(1.3, 1.3, 1.3);
        const orbitIndex = planet.userData.orbitPathIndex;
        if (orbitPaths[orbitIndex]) {
          orbitPaths[orbitIndex].material.opacity = 0.6;
          const item = testimonialData.find((t) => t.id === planet.userData.testimonialId);
          if (item?.color) orbitPaths[orbitIndex].material.color.set(item.color);
        }
        const testimonial = testimonialData.find((t) => t.id === planet.userData.testimonialId);
        setActiveTestimonial(testimonial);
      } else {
        setActiveTestimonial(null);
      }
    };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((touch.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((touch.clientY - rect.top) / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const sunIntersects = raycaster.intersectObject(sun);
      const planetIntersects = raycaster.intersectObjects(planets);
      if (sunIntersects.length > 0 || planetIntersects.length > 0) event.preventDefault();

      // Sun is not interactive on mobile — ignore touch
      if (sunIntersects.length > 0) {
        renderer.domElement.dataset.touchedElementId = '';
        return;
      }
      const intersects = raycaster.intersectObjects(planets);
      if (intersects.length > 0) {
        intersects[0].object.scale.set(1.2, 1.2, 1.2);
        renderer.domElement.dataset.touchedElementId = intersects[0].object.userData.testimonialId;
      } else {
        renderer.domElement.dataset.touchedElementId = '';
      }
    };

    const handleTouchEnd = () => {
      const id = renderer.domElement.dataset.touchedElementId;
      // Always reset all planet scales on touch end
      planets.forEach((p) => p.scale.set(1, 1, 1));
      if (id) {
        const testimonial = testimonialData.find((t) => t.id === parseInt(id));
        if (testimonial) { setActiveTestimonial(testimonial); setModalOpen(true); }
      }
      renderer.domElement.dataset.touchedElementId = '';
    };

    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    renderer.domElement.addEventListener('touchend', handleTouchEnd);

    // Keyboard accessibility
    planets.forEach((planet) => {
      const btn = planet.userData.htmlElement;
      btn.addEventListener('focus', () => {
        planet.userData.isFocused = true;
        planet.scale.set(1.3, 1.3, 1.3);
        const orbitIndex = planet.userData.orbitPathIndex;
        if (orbitPaths[orbitIndex]) {
          orbitPaths[orbitIndex].material.opacity = 0.6;
          const item = testimonialData.find((t) => t.id === planet.userData.testimonialId);
          if (item?.color) orbitPaths[orbitIndex].material.color.set(item.color);
        }
        const testimonial = testimonialData.find((t) => t.id === planet.userData.testimonialId);
        setActiveTestimonial(testimonial);
      });
      btn.addEventListener('blur', () => {
        planet.userData.isFocused = false;
        planet.scale.set(1, 1, 1);
        const orbitIndex = planet.userData.orbitPathIndex;
        if (orbitPaths[orbitIndex]) { orbitPaths[orbitIndex].material.opacity = 0.2; orbitPaths[orbitIndex].material.color.set(0xffffff); }
        setActiveTestimonial(null);
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const testimonial = testimonialData.find((t) => t.id === planet.userData.testimonialId);
          setActiveTestimonial(testimonial);
          setModalOpen(true);
        }
      });
    });

    sunBtn.addEventListener('focus', () => {
      sun.userData.isFocused = true;
      sun.scale.set(1.3, 1.3, 1.3);
      setActiveTestimonial({ id: 'sun', name: sunData.title, role: sunData.subtitle, testimonial: sunData.message, company: '', color: '#f5e942' });
    });
    sunBtn.addEventListener('blur', () => {
      sun.userData.isFocused = false;
      sun.scale.set(1, 1, 1);
      setActiveTestimonial(null);
    });
    // Sun is hover-only — no keyboard activation

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      planets.forEach((planet) => {
        planet.userData.angle += planet.userData.orbitSpeed / 30;
        planet.position.x = Math.cos(planet.userData.angle) * planet.userData.orbitRadius;
        planet.position.z = Math.sin(planet.userData.angle) * planet.userData.orbitRadius;
        planet.rotation.y += 0.005;
      });

      sun.rotation.y += 0.001;

      // Sync accessible buttons to 3D positions
      [...planets, sun].forEach((obj) => {
        const btn = obj.userData.htmlElement;
        if (!btn) return;
        const v = new Vector3();
        v.setFromMatrixPosition(obj.matrixWorld);
        v.project(camera);
        const x = (v.x * 0.5 + 0.5) * width;
        const y = (-v.y * 0.5 + 0.5) * height;
        btn.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      });

      if (!isMobile) controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      renderer.domElement.removeEventListener('touchend', handleTouchEnd);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      planets.forEach((planet) => {
        scene.remove(planet);
        planet.geometry.dispose();
        planet.material.dispose();
        if (planet.userData.htmlElement?.parentNode) planet.userData.htmlElement.parentNode.removeChild(planet.userData.htmlElement);
      });
      scene.remove(sun);
      sunGeometry.dispose();
      sunMaterial.dispose();
      renderer.dispose();
      if (sunBtn.parentNode) sunBtn.parentNode.removeChild(sunBtn);
    };
  }, [setActiveTestimonial, setModalOpen, setSunActive]);

  return (
    <div
      ref={containerRef}
      className="planetary-container"
      style={{ height: '700px' }}
    />
  );
};

export default PlanetarySystem;
