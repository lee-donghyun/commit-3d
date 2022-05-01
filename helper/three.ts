import * as THREE from "three";

import { MapControls } from "three/examples/jsm/controls/OrbitControls";

import {
  COLORSET,
  INITIAL_CAMERA_X,
  INITIAL_CAMERA_Y,
  INITIAL_CAMERA_Z,
  POSITION_OFFSET_X,
} from "./constants";

let camera: THREE.PerspectiveCamera,
  controls: MapControls,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer;

function init(data: CommitData[]) {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(INITIAL_CAMERA_X, INITIAL_CAMERA_Y, INITIAL_CAMERA_Z);

  controls = new MapControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;

  controls.screenSpacePanning = false;

  controls.minDistance = 100;
  controls.maxDistance = 500;

  controls.maxPolarAngle = Math.PI / 2;

  // world

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.translate(0, 0.5, 0);
  const materials = COLORSET.map(
    (color) => new THREE.MeshPhongMaterial({ color, flatShading: true })
  );

  data.forEach((data, index) => {
    const mesh = new THREE.Mesh(geometry, materials[data.level]);
    mesh.position.x = POSITION_OFFSET_X + Math.floor(index / 7) * 8;
    mesh.position.y = 0;
    mesh.position.z = (index % 7) * 8;
    mesh.scale.x = 8;
    mesh.scale.y = data.count;
    mesh.scale.z = 8;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  });

  // lights

  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x002288);
  dirLight2.position.set(-1, -1, -1);
  scene.add(dirLight2);

  const dirLight3 = new THREE.DirectionalLight(0xf1f1f1);
  dirLight3.position.set(1, 1, -1);
  scene.add(dirLight3);

  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  //

  window.addEventListener("resize", onWindowResize);
  window.addEventListener("click", (e) => {
    console.log(e);

    if ((e.target as Element).classList?.contains("rotater")) {
      controls.autoRotate = !controls.autoRotate;
    }
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  console.log("r");
}

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();
}

function render() {
  renderer.render(scene, camera);
}

function run(data: CommitData[]) {
  if (!scene) {
    init(data);
    animate();
  }
}

export default run;
