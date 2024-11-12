import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { moon } from "./sec3_scene_components.js";

// ----- RENDERER -----
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor("black");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// ----- SCENE -----
const scene = new THREE.Scene();

scene.add(moon);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// ----- CONTROLS -----
window.addEventListener("keydown", (event) => {
  if (event.key === "s") {
    orbit.saveState();
    console.log("camera position saved");
    console.log(camera.position);
    console.log(camera.rotation);
  }
  if (event.key === "r") {
    orbit.reset();
  }
});
const gridHelper = new THREE.GridHelper(200, 200);
const axesHelper = new THREE.AxesHelper(100);

// ----- LIGHT -----

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

let animationState = 0;
let travelSpeed = 1;

export function updateCamera(t) {
  const time = t * travelSpeed;
  const loopTime = 30;
  const p = time / loopTime;
  console.log(p);
  if (p < 0.99) {
    const position = tubeGeometry.parameters.path.getPointAt(p);
    const lookAt = tubeGeometry.parameters.path.getPointAt((p + 0.01) % 1);
    camera.position.copy(position);
    camera.lookAt(lookAt);
  } else {
    camera.position.copy(tubeGeometry.parameters.path.getPointAt(0.9));
    animationState = 1;
  }
}

const clock = new THREE.Clock();

camera.position.set(0, 30, 20);
camera.lookAt(20, 0, 0);

function animate() {
  const deltaTime = clock.getElapsedTime();
  outerTubeTextureMaterial.uniforms.uTime.value = deltaTime;
  if (animationState === 0) {
    updateCamera(deltaTime);
  } else if (animationState === 1) {
    updateCamera2(deltaTime);
  }
  moon.rotation.y += 0.01;

  // controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

export { scene, renderer };
