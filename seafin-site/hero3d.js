// The opening's one crafted object: a sculpted fin (for Seafin) in glossy indigo
// with a teal edge light, turning slowly and leaning a little toward the pointer.
// Progressive: if WebGL or the module fails, the hero keeps its indigo field.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

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

  // Fin profile: a swept leading edge, a concave trailing edge, a slightly arched base.
  const s = new THREE.Shape();
  s.moveTo(-1.7, -1.5);
  s.bezierCurveTo(-1.1, -0.4, -0.35, 1.15, 1.05, 2.05);
  s.bezierCurveTo(0.62, 0.95, 0.78, -0.45, 1.75, -1.5);
  s.quadraticCurveTo(0.02, -1.12, -1.7, -1.5);
  let geometry = new THREE.ExtrudeGeometry(s, {
    depth: 0.62, curveSegments: 96,
    bevelEnabled: true, bevelThickness: 0.44, bevelSize: 0.3, bevelSegments: 24,
  });
  geometry.center();

  // Twist and lean the blade along its height so it reads as a sculpted form,
  // not a flat cut-out.
  geometry.computeBoundingBox();
  const { min, max } = geometry.boundingBox;
  const span = max.y - min.y;
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i += 1) {
    v.fromBufferAttribute(pos, i);
    const k = (v.y - min.y) / span; // 0 at the base, 1 at the tip
    const a = (k - 0.35) * 1.05;
    const x = v.x * Math.cos(a) - v.z * Math.sin(a);
    const z = v.x * Math.sin(a) + v.z * Math.cos(a) + 0.55 * k * k;
    pos.setXYZ(i, x, v.y, z);
  }
  // Extruded geometry comes unindexed, which shades every strip flat; weld the
  // vertices so the normals smooth across the bevels.
  geometry.deleteAttribute('normal');
  geometry.deleteAttribute('uv');
  geometry = mergeVertices(geometry, 1e-4);
  geometry.center();
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  const radius = geometry.boundingSphere.radius;

  // Near-black indigo with a mirror clearcoat: the light, not the colour, draws the form.
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x151b6e, metalness: 0.55, roughness: 0.17,
    clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.5,
  });
  const fin = new THREE.Mesh(geometry, material);
  const rig = new THREE.Group();
  rig.add(fin);
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
      rig.position.set(halfW * 0.5, halfH * 0.16, 0);
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
    // A slow sway around a three-quarter view; it never turns edge-on.
    fin.rotation.set(-0.1 + Math.sin(t * 0.31) * 0.07 + tilt.x, 0.3 + Math.sin(t * 0.22) * 0.5 + tilt.y, 0.1);
    fin.position.y = Math.sin(t * 0.55) * 0.05;
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
    fin.rotation.set(-0.1, 0.3, 0.1);
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
