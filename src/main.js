import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { createCar } from './model/building/Car.js';


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
    // Create and add a car to the scene
    const car = createCar();
    car.position.set(0.1, 0, 2);
    // Scale the car down to fit the scene
    car.scale.set(0.001, 0.001, 0.001);
    // Set car movement speed and keyboard controls left right up down arrow keys
    car.userData = { speed: 0.1 }; // Add speed property to car for movement
    car.userData.direction = new THREE.Vector3(0, 0, -1); // Initial direction facing towards the building
    
    // Add keyboard controls for car movement A, D, W, S keys
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w': // Move forward
                car.userData.direction.set(0, 0, -1);
                car.position.addScaledVector(car.userData.direction, car.userData.speed);
                break;
            case 's': // Move backward
                car.userData.direction.set(0, 0, 1);
                car.position.addScaledVector(car.userData.direction, car.userData.speed);
                break;
            case 'a': // Move to West direction
                car.userData.direction.set(-1, 0, 0);
                car.position.addScaledVector(car.userData.direction, car.userData.speed);
                break;
            case 'd': // Move to East direction
                car.userData.direction.set(1, 0, 0);
                car.position.addScaledVector(car.userData.direction, car.userData.speed);
                break;
        }
    });
    //Make sure the camera follows the car even when it moves
    camera.position.set(car.position.x, car.position.y + 4, car.position.z ); // Set camera position behind the car
    camera.lookAt(car.position); // Make the camera look at the car
    controls.target.copy(car.position); // Update controls target to follow the car

    // Add the car to the scene
    scene.add(car);

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
        // Get the click position and resize the image
        var x = event.clientX;
        var y = event.clientY;
        
        // Create the image element
        var img = document.createElement('img');
        img.src = './model/logo/location.png'; // Path to your image
        img.style.position = 'absolute'; // Position it absolutely
        img.style.left = (x - 10) + 'px'; // Center the image on the click
        img.style.top = (y - 10) + 'px'; // Center the image on the click
        img.style.width = '20px'; 
        img.style.height = '20px'; 
        img.style.zIndex = '1000'; // Ensure it's on top

        // Append the image to the body
        document.body.appendChild(img);

        // Remove the image after a new click like google map feature
        setTimeout(function() {
            img.remove();
        }, 1000); // Adjust the timeout as needed
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

//Make a chatbot that guides the user through the scene
const chatBot = document.createElement('div');
chatBot.style.position = 'fixed';
chatBot.style.bottom = '20px';
chatBot.style.right = '20px';
chatBot.style.width = '300px';
chatBot.style.height = '200px';
chatBot.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
chatBot.style.border = '1px solid #ccc';
chatBot.style.padding = '10px';
chatBot.style.borderRadius = '10px';
chatBot.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
chatBot.innerHTML = `
    <h3>Chatbot</h3>
    <p>Welcome to the USTH 3D scene! Use WASD keys to move around.</p>
    <p>Click on the ground to place an image or select route points.</p>
    <p>Click on two points to draw a route between them.</p>
`;
document.body.appendChild(chatBot);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}

animate();