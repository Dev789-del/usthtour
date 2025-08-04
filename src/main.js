import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// Scene setup and background color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xA4670A);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enableZoom = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load USTH3D.obj as a mesh

const objLoader = new OBJLoader();
objLoader.load('./model/building/USTH3D.obj', (object) => {
    // Set the color for the building mesh having 'Text' in its name
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x0DAEB5, flatShading: true }); // cyan color for text mesh
        }
    });
    
    // Set the color for the building mesh having 'Plane' in its name
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            // white color for plane mesh
            child.material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, flatShading: true });
        }
    });
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
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

// Handle window resize with mouse wheel zoom
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

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
    // Move left/right along x-axis, up/down along z-axis
    if (keys.a) camera.position.x -= moveSpeed;    // Move left (decrease x)
    if (keys.d) camera.position.x += moveSpeed;    // Move right (increase x)
    if (keys.w) camera.position.z -= moveSpeed;    // Move up (decrease z)
    if (keys.s) camera.position.z += moveSpeed;    // Move down (increase z)
}

// When we click on a random position, move the camera to that position from above
window.addEventListener('click', (event) => {
    // Convert click position to normalized device coordinates
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    // Create a raycaster from the camera through the mouse position
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Calculate the intersection with the ground plane
    const plane = new THREE.Plane(new THREE.Vector3(0, 5, 0), 0); // Horizontal plane
    const intersection = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, intersection)) {
        // Move camera to the clicked position from above
        camera.position.set(intersection.x, 3, intersection.z); // Set height to 3 units above the ground
        camera.lookAt(intersection);
        controls.target.copy(intersection);
    }
});

// Add click event listener to place an image at the clicked position
window.addEventListener('click', function(event) {
           // Get the click position in normalized device coordinates based on the previous raycaster
            const mouse = new THREE.Vector2(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            );

            // Create a raycaster from the camera through the mouse position
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            // Calculate the intersection with the ground plane
            const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Horizontal plane
            const intersection = new THREE.Vector3();
            if (raycaster.ray.intersectPlane(plane, intersection)) {
                // Get the x and y coordinates of the intersection point
                const x = intersection.x;
                const y = intersection.y;
            }
            
            // Create a texture loader to load the image
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load('./model/image/position1.png', function(texture) {
                // Create a plane geometry for the image
                const geometry = new THREE.PlaneGeometry(1, 1); // 1x1 unit plane
                const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
                const imageMesh = new THREE.Mesh(geometry, material);
                
                // Set the position of the image mesh to the intersection point
                imageMesh.position.set(intersection.x, intersection.y + 0.5, intersection.z); // Slightly above the ground
                imageMesh.rotation.x = -Math.PI / 2; // Rotate to face upwards
                
                // Add the image mesh to the scene
                scene.add(imageMesh);
            });
        });

let routePoints = [];
let routeLine = null;

// Helper to remove previous route line
function removeRouteLine() {
    if (routeLine) {
        scene.remove(routeLine);
        routeLine.geometry.dispose();
        routeLine.material.dispose();
        routeLine = null;
    }
}

// Listen for clicks to select route points
window.addEventListener('click', function(event) {
    // Convert click position to normalized device coordinates
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Intersect with ground plane at y=0
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersection = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, intersection)) {
        routePoints.push(intersection.clone());
        if (routePoints.length > 2) {
            routePoints = [intersection.clone()];
            removeRouteLine();
        }
        // Draw route if two points are selected
        if (routePoints.length === 2) {
            removeRouteLine();
            // Draw a straight line between the two points (shortest route)
            const geometry = new THREE.BufferGeometry().setFromPoints(routePoints);
            const material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 5 });
            routeLine = new THREE.Line(geometry, material);
            scene.add(routeLine);
        }
    }
});
// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    moveCamera(); // Update camera position based on keyboard input
    renderer.render(scene, camera);
}

animate();