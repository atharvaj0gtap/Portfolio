import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  IcosahedronGeometry,
  DodecahedronGeometry,
  TorusKnotGeometry,
  BoxGeometry,
  SphereGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Mesh,
  Group,
} from 'three';

export function createHeroScene(canvas, { reduced = false } = {}) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const scene = new Scene();

  const camera = new PerspectiveCamera(60, w / h, 0.1, 100);
  camera.position.set(0, 0, 20);

  const renderer = new WebGLRenderer({ canvas, antialias: !reduced, alpha: true });
  renderer.setPixelRatio(reduced ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);

  // Lights — cool blue-white directional to tint metallic surfaces naturally
  const ambient = new AmbientLight(0xe8f2ff, 0.35);
  scene.add(ambient);
  const dirLight = new DirectionalLight(0xb0d8ff, 0.9);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  // Materials — Stellar Blue palette: all objects in the same brand-accent blue family
  // torusKnot: full sapphire blue (primary hero object)
  const tealMetal = new MeshStandardMaterial({
    color: 0x4a9ce8,
    metalness: 0.75,
    roughness: 0.25,
    emissive: 0x1a4a99,
    emissiveIntensity: 0.2,
  });
  // roundedCube: slightly brighter blue
  const cyanMetal = new MeshStandardMaterial({
    color: 0x5aaaf0,
    metalness: 0.75,
    roughness: 0.3,
    emissive: 0x1a4a99,
    emissiveIntensity: 0.15,
  });
  // ico1 wireframe: bright accent-light blue
  const iceWire = new MeshBasicMaterial({
    color: 0x72b8f8,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  // ico2 wireframe: faint same blue (background depth)
  const tealWireFaint = new MeshBasicMaterial({
    color: 0x72b8f8,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  });
  // sphere1: desaturated blue-gray (muted foreground thread)
  const steelMat = new MeshStandardMaterial({ color: 0x8aaac4, metalness: 0.15, roughness: 0.85 });
  // sphere2: darker accent blue (background thread, desktop-only)
  const deepBlueMat = new MeshStandardMaterial({ color: 0x2a6ab4, metalness: 0.5, roughness: 0.5 });
  // sphere3: pale bright blue (midground thread, desktop-only)
  const iceBlueMat = new MeshStandardMaterial({ color: 0xaad0f0, metalness: 0.6, roughness: 0.4 });

  // All objects belong to a single group for mouse parallax
  const group = new Group();
  scene.add(group);

  // ico1 — IcosahedronGeometry(4, 1), ice-blue wireframe 0.5, (12, -1, -6)
  const ico1 = new Mesh(new IcosahedronGeometry(4, 1), iceWire);
  ico1.position.set(12, -1, -6);
  group.add(ico1);

  // torusKnot — TorusKnotGeometry(2, 0.6, 64, 16), rich teal metallic, (-12, 4, -1)
  const torusKnot = new Mesh(new TorusKnotGeometry(2, 0.6, 64, 16), tealMetal);
  torusKnot.position.set(-12, 4, -1);
  group.add(torusKnot);

  // roundedCube — BoxGeometry(2.2, 2.2, 2.2, 4, 4, 4), cyan-blue metallic, (-3, -8, -5)
  const roundedCube = new Mesh(new BoxGeometry(2.2, 2.2, 2.2, 4, 4, 4), cyanMetal);
  roundedCube.position.set(-3, -8, -5);
  group.add(roundedCube);

  // sphere1 — SphereGeometry(0.5, 16, 16), muted steel blue, (3, 2, -2)
  const sphere1 = new Mesh(new SphereGeometry(0.5, 16, 16), steelMat);
  sphere1.position.set(3, 2, -2);
  group.add(sphere1);

  // Desktop-only objects
  let ico2 = null, sphere2 = null, sphere3 = null;
  if (!reduced) {
    // ico2 — DodecahedronGeometry(2.5, 0), faint teal wireframe 0.2, (6, 7, -14)
    ico2 = new Mesh(new DodecahedronGeometry(2.5, 0), tealWireFaint);
    ico2.position.set(6, 7, -14);
    group.add(ico2);

    // sphere2 — SphereGeometry(0.3, 16, 16), deep ocean blue, (-8, 8, -10)
    sphere2 = new Mesh(new SphereGeometry(0.3, 16, 16), deepBlueMat);
    sphere2.position.set(-8, 8, -10);
    group.add(sphere2);

    // sphere3 — SphereGeometry(0.45, 16, 16), pale ice blue, (8, -6, -4)
    sphere3 = new Mesh(new SphereGeometry(0.45, 16, 16), iceBlueMat);
    sphere3.position.set(8, -6, -4);
    group.add(sphere3);
  }


  // Mouse parallax state
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  const onMouseMove = (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('mousemove', onMouseMove);

  // Animation loop
  let rafId;
  let t = 0;

  function tick() {
    rafId = requestAnimationFrame(tick);
    t += 0.01;

    // ico1 — slow meditative tumble, vertical sine float, period 0.18
    ico1.rotation.x += 0.003;
    ico1.rotation.y += 0.005;
    ico1.position.y = -1 + Math.sin(t * 0.18) * 1.5;

    // torusKnot — confident rotation, vertical float (0.2) + horizontal cosine (0.1)
    torusKnot.rotation.x += 0.008;
    torusKnot.rotation.y += 0.006;
    torusKnot.position.y = 4 + Math.sin(t * 0.2) * 1.0;
    torusKnot.position.x = -12 + Math.cos(t * 0.1) * 0.5;

    // roundedCube — slow grounded sway, period 0.15
    roundedCube.rotation.x += 0.004;
    roundedCube.rotation.y += 0.006;
    roundedCube.position.y = -8 + Math.sin(t * 0.15) * 0.8;

    // sphere1 — lazy wandering orbit, periods 0.18 / 0.22
    sphere1.position.x = 3 + Math.cos(t * 0.18) * 1.0;
    sphere1.position.y = 2 + Math.sin(t * 0.22) * 0.8;

    if (!reduced) {
      // ico2 — barely drifts, period 0.12
      ico2.rotation.y += 0.002;
      ico2.position.y = 7 + Math.sin(t * 0.12) * 0.6;

      // sphere2 — lazy orbit, periods 0.25 / 0.3
      sphere2.position.x = -8 + Math.cos(t * 0.25) * 0.8;
      sphere2.position.y = 8 + Math.sin(t * 0.3) * 0.5;

      // sphere3 — lazy orbit, periods 0.2 / 0.18
      sphere3.position.x = 8 + Math.cos(t * 0.2) * 0.7;
      sphere3.position.y = -6 + Math.sin(t * 0.18) * 0.6;
    }

    // Mouse parallax lerp (0.05)
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    group.rotation.y = currentX * 0.15;
    group.rotation.x = currentY * 0.1;

    renderer.render(scene, camera);
  }

  tick();

  const onResize = () => {
    const nw = window.innerWidth;
    const nh = window.innerHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh, false);
  };
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    scene.traverse((obj) => {
      obj.geometry?.dispose();
      if (obj.material) {
        Array.isArray(obj.material)
          ? obj.material.forEach((m) => m.dispose())
          : obj.material.dispose();
      }
    });
    renderer.dispose();
  };
}
