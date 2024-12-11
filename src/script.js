import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Position the camera
camera.position.set(0, 1, 1);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 2, 3);
scene.add(directionalLight);

// Add OrbitControls for mouse interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 4; // Limit vertical rotation (upwards)
controls.minPolarAngle = 0; // Limit vertical rotation (downwards)

// Load the GLB model
let loadedModel = null;
const loader = new GLTFLoader();
loader.load(
  "/assets/faccia.glb", // Path to your GLB file
  (gltf) => {
    loadedModel = gltf.scene; // Store the loaded model
    scene.add(loadedModel); // Add the model to the scene
    console.log("Model loaded successfully!");
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded"); // Progress
  },
  (error) => {
    console.error("An error occurred:", error); // Error callback
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update OrbitControls
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
