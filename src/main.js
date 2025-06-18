import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';

// Scene setup and background color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xA4670A);

// Camera setup
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 5);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load USTH.obj as a mesh
const objLoader = new OBJLoader();
objLoader.load('./model/building/USTH3D.obj', (object) => {
    object.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });// white color for the mesh
        }
    });
    object.position.set(0, 0, 0);
    object.scale.set(0.03, 0.03, 0.03); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
},
undefined,
(error) => {
    console.error('An error happened while loading the OBJ:', error);
}
);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
// Camera movement controls
// Add keyboard controls for camera movement
const moveSpeed = 0.1;
const keys = { w: false, a: false, s: false, d: false };

window.addEventListener('keydown', (e) => {
    if (e.key in keys) keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key in keys) keys[e.key] = false;
});

function moveCamera() {
    // Move left/right along y-axis, up/down along z-axis
    if (keys.a) camera.position.y += moveSpeed;    // Move left (increase y)
    if (keys.d) camera.position.y -= moveSpeed;    // Move right (decrease y)
    if (keys.w) camera.position.z -= moveSpeed;    // Move up (decrease z)
    if (keys.s) camera.position.z += moveSpeed;    // Move down (increase z)
}

// Update animation loop to include movement
const originalAnimate = animate;
animate = function() {
    moveCamera();
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();