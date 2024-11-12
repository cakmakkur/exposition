import * as dat from "dat.gui";
import * as THREE from "three";

const gui = new dat.GUI();

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
