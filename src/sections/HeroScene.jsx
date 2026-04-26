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
  const dirLight = new DirectionalLight(0xffffff, 0.9);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  // Materials — Starlight palette: near-white, same family as the star canvas
  // torusKnot: warm starlight metallic
  const tealMetal = new MeshStandardMaterial({
    color: 0xe8f2ff,
    metalness: 0.6,
    roughness: 0.2,
    emissive: 0xcce0ff,
    emissiveIntensity: 0.15,
  });
  // roundedCube: slightly cooler white
  const cyanMetal = new MeshStandardMaterial({
    color: 0xf0f6ff,
    metalness: 0.6,
    roughness: 0.25,
    emissive: 0xcce0ff,
    emissiveIntensity: 0.12,
  });
  // ico1 wireframe: pure white
  const iceWire = new MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });
  // ico2 wireframe: faint white (background depth)
  const tealWireFaint = new MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });
  // sphere1: muted cool white (subtle foreground thread)
  const steelMat = new MeshStandardMaterial({ color: 0xc8d8f0, metalness: 0.2, roughness: 0.8 });
  // sphere2: dimmer white (background thread, desktop-only)
  const deepBlueMat = new MeshStandardMaterial({ color: 0xa0b8d8, metalness: 0.4, roughness: 0.6 });
  // sphere3: bright near-white (midground thread, desktop-only)
  const iceBlueMat = new MeshStandardMaterial({ color: 0xf0f8ff, metalness: 0.5, roughness: 0.3 });

  // All objects belong to a single group for mouse parallax
  const group = new Group();
  scene.add(group);

  // ico1 — IcosahedronGeometry(4, 1), ice-blue wireframe 0.5, (12, -1, -6)
  const ico1 = new Mesh(new IcosahedronGeometry(4, 1), iceWire);
  ico1.position.set(16, -3, -7);
  group.add(ico1);

  // torusKnot — TorusKnotGeometry(2, 0.6, 64, 16), rich teal metallic, (-12, 4, -1)
  const torusKnot = new Mesh(new TorusKnotGeometry(2, 0.6, 64, 16), tealMetal);
  torusKnot.position.set(-16, 5, -2);
  group.add(torusKnot);

  // roundedCube — BoxGeometry(2.2, 2.2, 2.2, 4, 4, 4), cyan-blue metallic, (-3, -8, -5)
  const roundedCube = new Mesh(new BoxGeometry(2.2, 2.2, 2.2, 4, 4, 4), cyanMetal);
  roundedCube.position.set(-12, -9, -6);
  group.add(roundedCube);

  // sphere1 — SphereGeometry(0.5, 16, 16), muted steel blue, (3, 2, -2)
  const sphere1 = new Mesh(new SphereGeometry(0.5, 16, 16), steelMat);
  sphere1.position.set(6, -5, -3);
  group.add(sphere1);

  // Desktop-only objects
  let ico2 = null, sphere2 = null, sphere3 = null;
  if (!reduced) {
    // ico2 — DodecahedronGeometry(2.5, 0), faint teal wireframe 0.2, (6, 7, -14)
    ico2 = new Mesh(new DodecahedronGeometry(2.5, 0), tealWireFaint);
    ico2.position.set(12, 9, -14);
    group.add(ico2);

    // sphere2 — SphereGeometry(0.3, 16, 16), deep ocean blue, (-8, 8, -10)
    sphere2 = new Mesh(new SphereGeometry(0.3, 16, 16), deepBlueMat);
    sphere2.position.set(-12, 9, -11);
    group.add(sphere2);

    // sphere3 — SphereGeometry(0.45, 16, 16), pale ice blue, (8, -6, -4)
    sphere3 = new Mesh(new SphereGeometry(0.45, 16, 16), iceBlueMat);
    sphere3.position.set(13, -7, -5);
    group.add(sphere3);
  }



  // Animation loop
  let rafId;
  let t = 0;

  function tick() {
    rafId = requestAnimationFrame(tick);
    t += 0.01;

    // ico1 — slow meditative tumble, tightened vertical drift
    ico1.rotation.x += 0.003;
    ico1.rotation.y += 0.005;
    ico1.position.y = -3 + Math.sin(t * 0.18) * 0.7;

    // torusKnot — confident rotation, reduced horizontal drift to stay left edge
    torusKnot.rotation.x += 0.008;
    torusKnot.rotation.y += 0.006;
    torusKnot.position.y = 5 + Math.sin(t * 0.2 + 1) * 1.0;
    torusKnot.position.x = -16 + Math.cos(t * 0.1) * 0.3;

    // roundedCube — slow grounded sway, period 0.15
    roundedCube.rotation.x += 0.004;
    roundedCube.rotation.y += 0.006;
    roundedCube.position.y = -9 + Math.sin(t * 0.15) * 0.8;

    // sphere1 — tightened orbit in lower-right quadrant
    sphere1.position.x = 6 + Math.sin(t * 0.3) * 1.0;
    sphere1.position.y = -5 + Math.cos(t * 0.25 + 1) * 0.8;

    if (!reduced) {
      // ico2 — barely drifts, period 0.12
      ico2.rotation.y += 0.002;
      ico2.position.y = 9 + Math.sin(t * 0.12) * 0.6;

      // sphere2 — lazy orbit, periods 0.25 / 0.3
      sphere2.position.x = -12 + Math.cos(t * 0.25) * 0.8;
      sphere2.position.y = 9 + Math.sin(t * 0.3) * 0.5;

      // sphere3 — tightened orbit in lower-right quadrant
      sphere3.position.x = 13 + Math.sin(t * 0.22 + 3) * 0.8;
      sphere3.position.y = -7 + Math.cos(t * 0.28 + 4) * 0.6;
    }

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
