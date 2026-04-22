import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  Group,
  Mesh,
  IcosahedronGeometry,
  DodecahedronGeometry,
  TorusKnotGeometry,
  BoxGeometry,
  SphereGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  BufferGeometry,
  BufferAttribute,
  Points,
  PointsMaterial,
  AdditiveBlending,
  Color,
  MathUtils,
  Vector2,
} from 'three';

/**
 * Constellation of Thought — hero 3D scene for JagtapWorks.
 *
 * Composition: upper-left to lower-right diagonal, center kept clear for hero text.
 * Foreground geometric forms evoke the "builder-visionary" — architectural precision,
 * warm gold light, and the Midnight Observatory palette.
 */
export function mountHeroScene(canvas, { reduced = false } = {}) {
  const GOLD = new Color('#D4A94A');
  const GOLD_BRIGHT = new Color('#EBC160');
  const STONE = new Color('#A69880');
  const COPPER = new Color('#B87333');
  const WARM_WHITE = new Color('#FAF7F2');

  const scene = new Scene();

  const camera = new PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 12);
  camera.lookAt(0, 0, 0);

  const renderer = new WebGLRenderer({
    canvas,
    antialias: !reduced,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, reduced ? 1.25 : 1.75)
  );
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setClearColor(0x000000, 0);

  const ambient = new AmbientLight(WARM_WHITE, 0.4);
  scene.add(ambient);

  const keyLight = new DirectionalLight(GOLD, 0.85);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);

  const rimLight = new DirectionalLight(new Color('#4fa5d4'), 0.22);
  rimLight.position.set(-6, -2, -4);
  scene.add(rimLight);

  const group = new Group();
  scene.add(group);

  const metalGold = new MeshStandardMaterial({
    color: GOLD,
    metalness: 0.82,
    roughness: 0.28,
    emissive: GOLD,
    emissiveIntensity: 0.14,
  });

  const metalGoldBright = new MeshStandardMaterial({
    color: GOLD_BRIGHT,
    metalness: 0.88,
    roughness: 0.24,
    emissive: GOLD,
    emissiveIntensity: 0.18,
  });

  const wireMatGold = new MeshBasicMaterial({
    color: GOLD,
    wireframe: true,
    transparent: true,
    opacity: 0.48,
  });

  const wireMatGoldFaint = new MeshBasicMaterial({
    color: GOLD,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  });

  const stoneMat = new MeshStandardMaterial({
    color: STONE,
    metalness: 0.15,
    roughness: 0.85,
  });

  const copperMat = new MeshStandardMaterial({
    color: COPPER,
    metalness: 0.62,
    roughness: 0.45,
    emissive: COPPER,
    emissiveIntensity: 0.08,
  });

  /* === Foreground === */
  const torusKnot = new Mesh(
    new TorusKnotGeometry(2, 0.58, reduced ? 48 : 96, 16),
    metalGoldBright
  );
  torusKnot.position.set(-12, 4, -1);
  torusKnot.scale.setScalar(0.95);
  group.add(torusKnot);

  const sphere1 = new Mesh(new SphereGeometry(0.5, 20, 20), stoneMat);
  sphere1.position.set(3, 2, -2);
  group.add(sphere1);

  /* === Midground === */
  const ico1 = new Mesh(new IcosahedronGeometry(4, 1), wireMatGold);
  ico1.position.set(12, -1, -6);
  group.add(ico1);

  const roundedCube = new Mesh(
    new BoxGeometry(2.2, 2.2, 2.2, 4, 4, 4),
    metalGold
  );
  roundedCube.position.set(-3, -8, -5);
  group.add(roundedCube);

  const sphere3 = new Mesh(
    new SphereGeometry(0.45, 18, 18),
    new MeshStandardMaterial({
      color: GOLD,
      metalness: 0.92,
      roughness: 0.2,
      emissive: GOLD,
      emissiveIntensity: 0.15,
    })
  );
  sphere3.position.set(8, -6, -4);

  /* === Background === */
  const ico2 = new Mesh(new DodecahedronGeometry(2.5, 0), wireMatGoldFaint);
  ico2.position.set(6, 7, -14);

  const sphere2 = new Mesh(new SphereGeometry(0.3, 16, 16), copperMat);
  sphere2.position.set(-8, 8, -10);

  if (!reduced) {
    group.add(ico2, sphere2, sphere3);
  }

  /* === Particle dust === */
  const particleCount = reduced ? 30 : 80;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = MathUtils.randFloatSpread(28);
    particlePositions[i * 3 + 1] = MathUtils.randFloatSpread(18);
    particlePositions[i * 3 + 2] = MathUtils.randFloatSpread(20) - 4;
  }
  const particleGeometry = new BufferGeometry();
  particleGeometry.setAttribute('position', new BufferAttribute(particlePositions, 3));
  const particleMaterial = new PointsMaterial({
    color: GOLD_BRIGHT,
    size: 0.08,
    transparent: true,
    opacity: 0.85,
    blending: AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const particles = new Points(particleGeometry, particleMaterial);
  scene.add(particles);

  /* === Animation === */
  const mouse = new Vector2(0, 0);
  const target = new Vector2(0, 0);

  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  let frameId = null;
  let lastTime = performance.now();

  const tick = (now) => {
    const delta = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    const t = now * 0.001;

    /* Parallax */
    target.x += (mouse.x * 0.5 - target.x) * 0.05;
    target.y += (mouse.y * 0.35 - target.y) * 0.05;
    group.rotation.x = target.y * 0.18;
    group.rotation.y = target.x * 0.22;

    /* Per-object motion */
    ico1.rotation.x += 0.0018;
    ico1.rotation.y += 0.0028;
    ico1.position.y = -1 + Math.sin(t * 0.18) * 0.4;

    if (!reduced) {
      ico2.rotation.x += 0.0006;
      ico2.rotation.y += 0.0014;
      ico2.position.y = 7 + Math.sin(t * 0.12) * 0.25;

      sphere2.position.x = -8 + Math.cos(t * 0.22) * 0.6;
      sphere2.position.y = 8 + Math.sin(t * 0.28) * 0.5;

      sphere3.position.x = 8 + Math.cos(t * 0.3) * 0.5;
      sphere3.position.y = -6 + Math.sin(t * 0.24) * 0.4;
    }

    torusKnot.rotation.x += 0.0042;
    torusKnot.rotation.y += 0.006;
    torusKnot.position.y = 4 + Math.sin(t * 0.2) * 0.5;
    torusKnot.position.x = -12 + Math.cos(t * 0.1) * 0.35;

    roundedCube.rotation.x += 0.0022;
    roundedCube.rotation.y += 0.0018;
    roundedCube.position.y = -8 + Math.sin(t * 0.15) * 0.32;

    sphere1.position.x = 3 + Math.cos(t * 0.3) * 0.35;
    sphere1.position.y = 2 + Math.sin(t * 0.18) * 0.25;

    /* Particles drift */
    const positions = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.002;
    }
    particleGeometry.attributes.position.needsUpdate = true;
    particles.rotation.y += delta * 0.02;

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);

  /* === Resize === */
  let resizeRaf = null;
  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  const onResize = () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(resize);
  };
  window.addEventListener('resize', onResize);

  return () => {
    if (frameId) cancelAnimationFrame(frameId);
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', onResize);

    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });
    renderer.dispose();
  };
}
