// The opening's one crafted object: an abstract twisted ribbon ring in glossy,
// near-black indigo with teal and violet edge light. It turns slowly, the twist
// carries the highlights round the loop, and it leans a little toward the pointer.
// Progressive: if WebGL or the module fails, the hero keeps its indigo field.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const canvas = document.querySelector('.hero-object');
const hero = canvas?.closest('.hero');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

function start() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  // A ribbon ring with one full twist: a stadium-shaped section (wide, thin,
  // fully rounded edges) swept round a circle while it turns 360 degrees.
  // Abstract on purpose; the finish and the moving highlights carry it.
  const R = 1.55;          // ring radius
  const W = 0.62;          // half-width of the ribbon
  const T = 0.17;          // half-thickness, also the edge radius
  const SEG_U = 320;       // around the ring
  const SEG_V = 64;        // around the section
  const section = [];
  for (let j = 0; j < SEG_V; j += 1) {
    // Stadium outline: two straight runs joined by half-circles.
    const t = j / SEG_V;
    const straight = 2 * (W - T);
    const arc = Math.PI * T;
    const total = 2 * straight + 2 * arc;
    let d = t * total;
    let x; let y;
    if (d < straight) { x = -(W - T) + d; y = T; }
    else if ((d -= straight) < arc) { const a = d / T; x = (W - T) + Math.sin(a) * T; y = Math.cos(a) * T; }
    else if ((d -= arc) < straight) { x = (W - T) - d; y = -T; }
    else { d -= straight; const a = d / T; x = -(W - T) - Math.sin(a) * T; y = -Math.cos(a) * T; }
    section.push([x, y]);
  }
  const positions = new Float32Array(SEG_U * SEG_V * 3);
  for (let i = 0; i < SEG_U; i += 1) {
    const u = (i / SEG_U) * Math.PI * 2;
    const twist = u; // one full turn of the section per lap
    const cu = Math.cos(u); const su = Math.sin(u);
    const ct = Math.cos(twist); const st = Math.sin(twist);
    for (let j = 0; j < SEG_V; j += 1) {
      const [sx, sy] = section[j];
      const rx = sx * ct - sy * st;   // along the radius
      const rz = sx * st + sy * ct;   // along the ring's axis
      const k = (i * SEG_V + j) * 3;
      positions[k] = (R + rx) * cu;
      positions[k + 1] = (R + rx) * su;
      positions[k + 2] = rz;
    }
  }
  const index = [];
  for (let i = 0; i < SEG_U; i += 1) {
    const i2 = (i + 1) % SEG_U;
    for (let j = 0; j < SEG_V; j += 1) {
      const j2 = (j + 1) % SEG_V;
      const a = i * SEG_V + j; const b = i2 * SEG_V + j; const c = i2 * SEG_V + j2; const d = i * SEG_V + j2;
      index.push(a, b, d, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(index);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  const radius = geometry.boundingSphere.radius;
  // Near-black indigo with a mirror clearcoat: the light, not the colour, draws the form.
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x151b6e, metalness: 0.55, roughness: 0.17,
    clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.5,
  });
  const form = new THREE.Mesh(geometry, material);
  const lean = new THREE.Group(); // tilt toward the viewer; the ring spins inside it
  lean.add(form);
  const rig = new THREE.Group();
  rig.add(lean);
  scene.add(rig);

  const tealRim = new THREE.DirectionalLight(0x38b3da, 6);
  tealRim.position.set(-6, 2, -3);
  const violetRim = new THREE.DirectionalLight(0x7d86ff, 4);
  violetRim.position.set(6, 4, -2);
  const key = new THREE.DirectionalLight(0xffffff, 0.7);
  key.position.set(3, 5, 7);
  scene.add(tealRim, violetRim, key);

  // Frame the object: right of the headline on wide screens, above it on narrow ones.
  function layout() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    // Keep the whole object in frame with room to turn: its bounding sphere
    // never exceeds the space it is given.
    // Large and partly cropped by the frame, like a sculpture seen up close; the
    // headline sits over its lower edge on wide screens.
    if (w >= 900) {
      const r = Math.min(halfH * 0.98, halfW * 0.5);
      rig.scale.setScalar(r / radius);
      rig.position.set(halfW * 0.56, halfH * 0.2, 0);
    } else {
      const r = Math.min(halfH * 0.42, halfW * 0.82);
      rig.scale.setScalar(r / radius);
      rig.position.set(halfW * 0.28, halfH * 0.5, 0);
    }
  }
  new ResizeObserver(layout).observe(canvas);
  layout();

  // Motion: a slow turn and a gentle float; the pointer tilts it a few degrees.
  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  });
  hero.addEventListener('pointerleave', () => { pointer.x = 0; pointer.y = 0; });

  const clock = new THREE.Clock(false);
  let elapsed = 0; // only advances while playing, so a resume never jumps
  let running = false;
  let shown = false;

  function pose(t) {
    tilt.x += (pointer.y * 0.18 - tilt.x) * 0.05;
    tilt.y += (pointer.x * 0.28 - tilt.y) * 0.05;
    // The ring turns about its own axis (the twist travels round it) inside a
    // slow lean that never shows it edge-on.
    form.rotation.z = t * 0.14;
    lean.rotation.set(-0.98 + Math.sin(t * 0.27) * 0.06 + tilt.x, 0.36 + Math.sin(t * 0.19) * 0.1 + tilt.y, 0.2);
    lean.position.y = Math.sin(t * 0.55) * 0.05;
  }

  function frame() {
    if (!running) return;
    elapsed += Math.min(clock.getDelta(), 0.05);
    pose(elapsed);
    renderer.render(scene, camera);
    if (!shown) { shown = true; canvas.classList.add('is-ready'); }
    requestAnimationFrame(frame);
  }

  function still() {
    form.rotation.z = 0.6;
    lean.rotation.set(-0.98, 0.36, 0.2);
    renderer.render(scene, camera);
    if (!shown) { shown = true; canvas.classList.add('is-ready'); }
  }

  function play() {
    if (reduce.matches) { running = false; still(); return; }
    if (running || document.hidden) return;
    running = true;
    clock.start();
    clock.getDelta();
    requestAnimationFrame(frame);
  }
  function pause() { running = false; clock.stop(); }

  new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause())).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
  reduce.addEventListener('change', () => { pause(); play(); });
}

if (canvas && hero) start();
