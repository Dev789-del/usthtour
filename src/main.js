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
            child.material = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true }); // white color for plane mesh
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
// window.addEventListener('click', (event) => {
//     // Convert click position to normalized device coordinates
//     const mouse = new THREE.Vector2(
//         (event.clientX / window.innerWidth) * 2 - 1,
//         -(event.clientY / window.innerHeight) * 2 + 1
//     );

//     // Create a raycaster from the camera through the mouse position
//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouse, camera);

//     // Calculate the intersection with the ground plane
//     const plane = new THREE.Plane(new THREE.Vector3(0, 5, 0), 0); // Horizontal plane
//     const intersection = new THREE.Vector3();
//     if (raycaster.ray.intersectPlane(plane, intersection)) {
//         // Move camera to the clicked position from above
//         camera.position.set(intersection.x, 3, intersection.z); // Set height to 3 units above the ground
//         camera.lookAt(intersection);
//         controls.target.copy(intersection);
//     }
// });

// Add these variables at the top
// Add these variables at the top with your other variables
// Add these variables at the top with your other variables
let isAnimating = false;
let animationStartTime = 0;
const animationDuration = 1000; // 1 second transition
let startCameraPosition = new THREE.Vector3();
let targetCameraPosition = new THREE.Vector3();
let startControlsTarget = new THREE.Vector3();
let targetControlsTarget = new THREE.Vector3();

// Replace your existing click event listener with this one
window.addEventListener('click', (event) => {
    if (isAnimating) return; // Don't start new animation if one is in progress
    
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Check for intersection with the building mesh
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        const intersection = intersects[0];
        const clickedPoint = intersection.point;
        
        // Calculate position directly above the clicked point
        const heightAboveBuilding = 5; // Adjust this value as needed
        targetCameraPosition.set(
            clickedPoint.x, 
            clickedPoint.y + heightAboveBuilding, 
            clickedPoint.z
        );
        
        // Target for camera to look at (the exact clicked point)
        targetControlsTarget.copy(clickedPoint);
        
        // Store start positions
        startCameraPosition.copy(camera.position);
        startControlsTarget.copy(controls.target);
        
        // Start animation
        isAnimating = true;
        animationStartTime = Date.now();
    }
});

// Add click event listener to place an image at the clicked position
window.addEventListener('click', function(event) {
            // Get the click coordinates most accurately
            var x = event.clientX;
            var y = event.clientY;

            // Create the image element
            var img = document.createElement('img');
            img.src = './model/logo/position1.png'; // Path to your image
            img.style.position = 'absolute'; // Position it absolutely
            img.style.left = (x - 10) + 'px'; // Center the image on the click
            img.style.top = (y - 10) + 'px'; // Center the image on the click
            img.style.width = '40px'; 
            img.style.height = '40px'; 
            img.style.zIndex = '1000'; // Ensure it's on top

            // Append the image to the body
            document.body.appendChild(img);

            // Remove the image after a new click like google map feature
            setTimeout(function() {
                img.remove();
            }, 1000); // Adjust the timeout as needed
        });

// Animation loop with smooth transition
function animate() {
    requestAnimationFrame(animate);
    
    if (isAnimating) {
        const now = Date.now();
        const elapsed = now - animationStartTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // Cubic easing for smooth start/end
        const easedProgress = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        // Interpolate camera position
        camera.position.lerpVectors(
            startCameraPosition,
            targetCameraPosition,
            easedProgress
        );
        
        // Interpolate controls target
        controls.target.lerpVectors(
            startControlsTarget,
            targetControlsTarget,
            easedProgress
        );
        
        if (progress === 1) {
            isAnimating = false;
        }
    }
    
    controls.update();
    renderer.render(scene, camera);
}

// Reduce the jet lag effect by setting the animation loop
renderer.setAnimationLoop(() => {
    moveCamera(); // Call the camera movement function
    animate(); // Call the animate function
});