import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { createCar } from './model/building/Car.js';


// Scene setup and background color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x77F9FE);

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


// Load sidewalk only once
const objLoader = new OBJLoader();
objLoader.load('./model/image/Sidewalk.obj', (object) => {
    object.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/street_sidewalk_texture.jpg'),
                side: THREE.DoubleSide
            });
        }
    });

    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026);
    scene.add(object);

    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    camera.position.set(center.x, box.max.y + 2, center.z + 2);
    camera.lookAt(center);
    controls.target.copy(center);
},
undefined,
(error) => {
    console.error('An error happened while loading the OBJ:', error);
}
);

// Load street components
objLoader.load('./model/image/StreetComponents.obj', (object) => {
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    // Enable its texture from obj file with plane mesh only
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gray_texture.png'),
                side: THREE.DoubleSide
            });
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

// Load gate obj
objLoader.load('./model/image/Gate.obj', (object) => {
    
    // Set texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.118
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.118')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.176
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.176')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/school_wall_texture.jpg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.207
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.207')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/school_wall_texture.jpg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.209
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.209')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.210
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.210')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.211
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.211')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.039 for Gate 18
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.039')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.116 for Gate 18B 
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.116')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.117 for Gate 18C 
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.117')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
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

// Create popup element
const popup_BuildingA = document.createElement('div');
popup_BuildingA.style.position = 'absolute';
popup_BuildingA.style.background = '#333';
popup_BuildingA.style.color = '#fff';
popup_BuildingA.style.padding = '10px';
popup_BuildingA.style.borderRadius = '5px';
popup_BuildingA.style.display = 'none';
popup_BuildingA.innerText = 'Welcome to Building A!';

// Add translate switch button
const translateBtn = document.createElement('button');
translateBtn.innerText = 'VN';
translateBtn.style.marginLeft = '10px';
translateBtn.style.background = '#555';
translateBtn.style.color = '#fff';
translateBtn.style.border = 'none';
translateBtn.style.borderRadius = '3px';
translateBtn.style.padding = '3px 8px';
translateBtn.style.cursor = 'pointer';

let isEnglish = true;
const msgEN = 'Welcome to Building A! This place is the closest to Gate 18C from the north.';
const msgVN = 'Chào mừng đến với tòa nhà A! Nơi này nằm ở gần với cổng 18C nhất từ hướng bắc đi lên.';

translateBtn.onclick = function() {
    isEnglish = !isEnglish;
    popup_BuildingA.innerText = isEnglish ? msgEN : msgVN;
    translateBtn.innerText = isEnglish ? 'VN' : 'EN';
    popup_BuildingA.appendChild(translateBtn);
};

// Append button to popup
popup_BuildingA.appendChild(translateBtn);

document.body.appendChild(popup_BuildingA);

// Raycaster and mouse vector for Building A
const raycaster_BuildingA = new THREE.Raycaster();
const mouse_BuildingA = new THREE.Vector2();
let BuildingA_mesh = null; // Store reference to mesh

// Load BuildingA.obj
objLoader.load('./model/image/BuildingA.obj', (object) => {
    // Set texture for Plane.044
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.044')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/BuildingA_floor1.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for Plane.045
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.045')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/BuildingA_otherfloor_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set color texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA_mesh = object;
    // Set the object's position and scale
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

// Handle mouse click (only triggers popup) for Building A
window.addEventListener('click', (event) => {
    if (!BuildingA_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA.setFromCamera(mouse_BuildingA, camera);
    const intersects = raycaster_BuildingA.intersectObject(BuildingA_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        popup_BuildingA.style.left = `${event.clientX}px`;
        popup_BuildingA.style.top = `${event.clientY}px`;
        popup_BuildingA.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA.style.display = 'none';
        }, 5000);
    }
});


// Create popup element for building A1
const popup_BuildingA1 = document.createElement('div');
popup_BuildingA1.style.position = 'absolute';
popup_BuildingA1.style.background = '#333';
popup_BuildingA1.style.color = '#fff';
popup_BuildingA1.style.padding = '10px';
popup_BuildingA1.style.borderRadius = '5px';
popup_BuildingA1.style.display = 'none';
popup_BuildingA1.innerText = 'Welcome to Building A1!';

// Add translate switch button for building A1
const translateBtn_BuildingA1 = document.createElement('button');
translateBtn_BuildingA1.innerText = 'VN';
translateBtn_BuildingA1.style.marginLeft = '10px';
translateBtn_BuildingA1.style.background = '#555';
translateBtn_BuildingA1.style.color = '#fff';
translateBtn_BuildingA1.style.border = 'none';
translateBtn_BuildingA1.style.borderRadius = '3px';
translateBtn_BuildingA1.style.padding = '3px 8px';
translateBtn_BuildingA1.style.cursor = 'pointer';

let isEnglish_BuildingA1 = true;
const msgEN_BuildingA1 = 'Here is Building A1! This place is Vietnam Academy of Science and Technology which is in front of Gate 18 Hoang Quoc Viet Street.';
const msgVN_BuildingA1 = 'Đây là tòa nhà A1! Nơi này là Viện Hàn lâm Khoa học và Công nghệ Việt Nam, nằm trước cổng 18 đường Hoàng Quốc Việt.';

translateBtn_BuildingA1.onclick = function() {
    isEnglish_BuildingA1 = !isEnglish_BuildingA1;
    popup_BuildingA1.innerText = isEnglish_BuildingA1 ? msgEN_BuildingA1 : msgVN_BuildingA1;
    translateBtn_BuildingA1.innerText = isEnglish_BuildingA1 ? 'VN' : 'EN';
    popup_BuildingA1.appendChild(translateBtn_BuildingA1);
};

// Append button to popup
popup_BuildingA1.appendChild(translateBtn_BuildingA1);

document.body.appendChild(popup_BuildingA1);

// Raycaster and mouse vector for Building A
const raycaster_BuildingA1 = new THREE.Raycaster();
const mouse_BuildingA1 = new THREE.Vector2();
let BuildingA1_mesh = null; // Store reference to mesh

// Load BuildingA1.obj
objLoader.load('./model/image/BuildingA1.obj', (object) => {
    // Set texture for all plane
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set color texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA1_mesh = object;
    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}
, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A1
window.addEventListener('click', (event) => {
    if (!BuildingA1_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA1.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA1.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA1.setFromCamera(mouse_BuildingA1, camera);
    const intersects = raycaster_BuildingA1.intersectObject(BuildingA1_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.left = `${event.clientX}px`;
        popup_BuildingA1.style.top = `${event.clientY}px`;
        popup_BuildingA1.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA1.style.display = 'none';
        }, 5000);
    }
});

// Create popup element
const popup_BuildingA2 = document.createElement('div');
popup_BuildingA2.style.position = 'absolute';
popup_BuildingA2.style.background = '#333';
popup_BuildingA2.style.color = '#fff';
popup_BuildingA2.style.padding = '10px';
popup_BuildingA2.style.borderRadius = '5px';
popup_BuildingA2.style.display = 'none';
popup_BuildingA2.innerText = 'Welcome to Building A2!';

// Add translate switch button for Building A2
const translateBtn_BuildingA2 = document.createElement('button');
translateBtn_BuildingA2.innerText = 'VN';
translateBtn_BuildingA2.style.marginLeft = '10px';
translateBtn_BuildingA2.style.background = '#555';
translateBtn_BuildingA2.style.color = '#fff';
translateBtn_BuildingA2.style.border = 'none';
translateBtn_BuildingA2.style.borderRadius = '3px';
translateBtn_BuildingA2.style.padding = '3px 8px';
translateBtn_BuildingA2.style.cursor = 'pointer';

let isEnglish_BuildingA2 = true;
const msgEN_BuildingA2 = 'Welcome to Building A2! This place is in front of Building A1 and its name is Vietnam Academy of Science and Technology.';
const msgVN_BuildingA2 = 'Chào mừng đến với tòa nhà A2! Nơi này nằm ở trước tòa nhà A1 và tên của nó là Viện Hàn lâm Khoa học và Công nghệ Việt Nam.';

translateBtn_BuildingA2.onclick = function() {
    isEnglish_BuildingA2 = !isEnglish_BuildingA2;
    popup_BuildingA2.innerText = isEnglish_BuildingA2 ? msgEN_BuildingA2 : msgVN_BuildingA2;
    translateBtn_BuildingA2.innerText = isEnglish_BuildingA2 ? 'VN' : 'EN';
    popup_BuildingA2.appendChild(translateBtn_BuildingA2);
};

// Append button to popup
popup_BuildingA2.appendChild(translateBtn_BuildingA2);

document.body.appendChild(popup_BuildingA2);

// Raycaster and mouse vector for Building A2
const raycaster_BuildingA2 = new THREE.Raycaster();
const mouse_BuildingA2 = new THREE.Vector2();
let BuildingA2_mesh = null; // Store reference to mesh


// Load BuildingA2.obj
objLoader.load('./model/image/BuildingA2.obj', (object) => {
    // Set texture for all plane
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/BuildingA2_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set color texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    
    BuildingA2_mesh = object;

    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A2
window.addEventListener('click', (event) => {
    if (!BuildingA2_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA2.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA2.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA2.setFromCamera(mouse_BuildingA2, camera);
    const intersects = raycaster_BuildingA2.intersectObject(BuildingA2_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.left = `${event.clientX}px`;
        popup_BuildingA2.style.top = `${event.clientY}px`;
        popup_BuildingA2.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA2.style.display = 'none';
        }, 5000);
    }
});

// Load Pond.obj
objLoader.load('./model/image/Pond.obj', (object) => {
    // Set texture for all cylinder
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Cylinder')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/lake_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Create popup element for building A3
const popup_BuildingA3 = document.createElement('div');
popup_BuildingA3.style.position = 'absolute';
popup_BuildingA3.style.background = '#333';
popup_BuildingA3.style.color = '#fff';
popup_BuildingA3.style.padding = '10px';
popup_BuildingA3.style.borderRadius = '5px';
popup_BuildingA3.style.display = 'none';
popup_BuildingA3.innerText = 'Welcome to Building A3!';

// Add translate switch button for building A3
const translateBtn_BuildingA3 = document.createElement('button');
translateBtn_BuildingA3.innerText = 'VN';
translateBtn_BuildingA3.style.marginLeft = '10px';
translateBtn_BuildingA3.style.background = '#555';
translateBtn_BuildingA3.style.color = '#fff';
translateBtn_BuildingA3.style.border = 'none';
translateBtn_BuildingA3.style.borderRadius = '3px';
translateBtn_BuildingA3.style.padding = '3px 8px';
translateBtn_BuildingA3.style.cursor = 'pointer';

let isEnglish_BuildingA3 = true;
const msgEN_BuildingA3 = 'Here is Building A3! This place is Institute of Information Technology located on the left of A5 building.';
const msgVN_BuildingA3 = 'Đây là tòa nhà A3! Nơi này là Viện Công nghệ Thông tin nằm ở bên trái tòa nhà A5.';

translateBtn_BuildingA3.onclick = function() {
    isEnglish_BuildingA3 = !isEnglish_BuildingA3;
    popup_BuildingA3.innerText = isEnglish_BuildingA3 ? msgEN_BuildingA3 : msgVN_BuildingA3;
    translateBtn_BuildingA3.innerText = isEnglish_BuildingA3 ? 'VN' : 'EN';
    popup_BuildingA3.appendChild(translateBtn_BuildingA3);
};

// Append button to popup
popup_BuildingA3.appendChild(translateBtn_BuildingA3);

document.body.appendChild(popup_BuildingA3);

// Raycaster and mouse vector for Building A3
const raycaster_BuildingA3 = new THREE.Raycaster();
const mouse_BuildingA3 = new THREE.Vector2();
let BuildingA3_mesh = null; // Store reference to mesh

// Load BuildingA3.obj
objLoader.load('./model/image/BuildingA3.obj', (object) => {
    // Set texture for all plane
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/BuildingA3_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA3_mesh = object;

    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A3
window.addEventListener('click', (event) => {
    if (!BuildingA3_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA3.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA3.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA3.setFromCamera(mouse_BuildingA3, camera);
    const intersects = raycaster_BuildingA3.intersectObject(BuildingA3_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.left = `${event.clientX}px`;
        popup_BuildingA3.style.top = `${event.clientY}px`;
        popup_BuildingA3.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA3.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for building A5
const popup_BuildingA5 = document.createElement('div');
popup_BuildingA5.style.position = 'absolute';
popup_BuildingA5.style.background = '#333';
popup_BuildingA5.style.color = '#fff';
popup_BuildingA5.style.padding = '10px';
popup_BuildingA5.style.borderRadius = '5px';
popup_BuildingA5.style.display = 'none';
popup_BuildingA5.innerText = 'Welcome to Building A5!';

// Add translate switch button for building A5
const translateBtn_BuildingA5 = document.createElement('button');
translateBtn_BuildingA5.innerText = 'VN';
translateBtn_BuildingA5.style.marginLeft = '10px';
translateBtn_BuildingA5.style.background = '#555';
translateBtn_BuildingA5.style.color = '#fff';
translateBtn_BuildingA5.style.border = 'none';
translateBtn_BuildingA5.style.borderRadius = '3px';
translateBtn_BuildingA5.style.padding = '3px 8px';
translateBtn_BuildingA5.style.cursor = 'pointer';

let isEnglish_BuildingA5 = true;
const msgEN_BuildingA5 = 'This is Building A5 ! This place is Vietnam Institute of Mathematics located on the left of A7 building.';
const msgVN_BuildingA5 = 'Đây là tòa nhà A5! Nơi này là Viện Toán học Việt Nam nằm ở bên trái tòa nhà A7.';

translateBtn_BuildingA5.onclick = function() {
    isEnglish_BuildingA5 = !isEnglish_BuildingA5;
    popup_BuildingA5.innerText = isEnglish_BuildingA5 ? msgEN_BuildingA5 : msgVN_BuildingA5;
    translateBtn_BuildingA5.innerText = isEnglish_BuildingA5 ? 'VN' : 'EN';
    popup_BuildingA5.appendChild(translateBtn_BuildingA5);
};

// Append button to popup
popup_BuildingA5.appendChild(translateBtn_BuildingA5);

document.body.appendChild(popup_BuildingA5);

// Raycaster and mouse vector for Building A5
const raycaster_BuildingA5 = new THREE.Raycaster();
const mouse_BuildingA5 = new THREE.Vector2();
let BuildingA5_mesh = null; // Store reference to mesh

// Load A5.obj
objLoader.load('./model/image/A5.obj', (object) => {
    // Set texture for all plane
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/BuildingA5_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA5_mesh = object;

    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A5
window.addEventListener('click', (event) => {
    if (!BuildingA5_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA5.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA5.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA5.setFromCamera(mouse_BuildingA5, camera);
    const intersects = raycaster_BuildingA5.intersectObject(BuildingA5_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.left = `${event.clientX}px`;
        popup_BuildingA5.style.top = `${event.clientY}px`;
        popup_BuildingA5.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA5.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for building A6
const popup_BuildingA6 = document.createElement('div');
popup_BuildingA6.style.position = 'absolute';
popup_BuildingA6.style.background = '#333';
popup_BuildingA6.style.color = '#fff';
popup_BuildingA6.style.padding = '10px';
popup_BuildingA6.style.borderRadius = '5px';
popup_BuildingA6.style.display = 'none';
popup_BuildingA6.innerText = 'Welcome to Building A6!';

// Add translate switch button for building A6
const translateBtn_BuildingA6 = document.createElement('button');
translateBtn_BuildingA6.innerText = 'VN';
translateBtn_BuildingA6.style.marginLeft = '10px';
translateBtn_BuildingA6.style.background = '#555';
translateBtn_BuildingA6.style.color = '#fff';
translateBtn_BuildingA6.style.border = 'none';
translateBtn_BuildingA6.style.borderRadius = '3px';
translateBtn_BuildingA6.style.padding = '3px 8px';
translateBtn_BuildingA6.style.cursor = 'pointer';

let isEnglish_BuildingA6 = true;
const msgEN_BuildingA6 = 'Building A6 is Vietnam National Space Center located in front of A5 building from the north.';
const msgVN_BuildingA6 = 'Tòa nhà A6 là Trung tâm Vũ trụ Quốc gia Việt Nam nằm ở phía trước tòa nhà A5 từ phía bắc.';

translateBtn_BuildingA6.onclick = function() {
    isEnglish_BuildingA6 = !isEnglish_BuildingA6;
    popup_BuildingA6.innerText = isEnglish_BuildingA6 ? msgEN_BuildingA6 : msgVN_BuildingA6;
    translateBtn_BuildingA6.innerText = isEnglish_BuildingA6 ? 'VN' : 'EN';
    popup_BuildingA6.appendChild(translateBtn_BuildingA6);
};

// Append button to popup
popup_BuildingA6.appendChild(translateBtn_BuildingA6);

document.body.appendChild(popup_BuildingA6);

// Raycaster and mouse vector for Building A6
const raycaster_BuildingA6 = new THREE.Raycaster();
const mouse_BuildingA6 = new THREE.Vector2();
let BuildingA6_mesh = null; // Store reference to mesh


// Load BuildingA6.obj
objLoader.load('./model/image/BuildingA6.obj', (object) => {
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/BuildingA6_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    BuildingA6_mesh = object;

    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A6
window.addEventListener('click', (event) => {
    if (!BuildingA6_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA6.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA6.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA6.setFromCamera(mouse_BuildingA6, camera);
    const intersects = raycaster_BuildingA6.intersectObject(BuildingA6_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.left = `${event.clientX}px`;
        popup_BuildingA6.style.top = `${event.clientY}px`;
        popup_BuildingA6.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA6.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for building A7
const popup_BuildingA7 = document.createElement('div');
popup_BuildingA7.style.position = 'absolute';
popup_BuildingA7.style.background = '#333';
popup_BuildingA7.style.color = '#fff';
popup_BuildingA7.style.padding = '10px';
popup_BuildingA7.style.borderRadius = '5px';
popup_BuildingA7.style.display = 'none';
popup_BuildingA7.innerText = 'Welcome to Building A7!';

// Add translate switch button for building A7
const translateBtn_BuildingA7 = document.createElement('button');
translateBtn_BuildingA7.innerText = 'VN';
translateBtn_BuildingA7.style.marginLeft = '10px';
translateBtn_BuildingA7.style.background = '#555';
translateBtn_BuildingA7.style.color = '#fff';
translateBtn_BuildingA7.style.border = 'none';
translateBtn_BuildingA7.style.borderRadius = '3px';
translateBtn_BuildingA7.style.padding = '3px 8px';
translateBtn_BuildingA7.style.cursor = 'pointer';

let isEnglish_BuildingA7 = true;
const msgEN_BuildingA7 = 'Building A7 is Center of Informatics and Computing located in front of gate 18B from the north.';
const msgVN_BuildingA7 = 'Tòa nhà A7 là Trung tâm Thông tin và Tính toán nằm ở phía trước cổng 18B từ phía bắc.';

translateBtn_BuildingA7.onclick = function() {
    isEnglish_BuildingA7 = !isEnglish_BuildingA7;
    popup_BuildingA7.innerText = isEnglish_BuildingA7 ? msgEN_BuildingA7 : msgVN_BuildingA7;
    translateBtn_BuildingA7.innerText = isEnglish_BuildingA7 ? 'VN' : 'EN';
    popup_BuildingA7.appendChild(translateBtn_BuildingA7);
};

// Append button to popup
popup_BuildingA7.appendChild(translateBtn_BuildingA7);

document.body.appendChild(popup_BuildingA7);

// Raycaster and mouse vector for Building A7
const raycaster_BuildingA7 = new THREE.Raycaster();
const mouse_BuildingA7 = new THREE.Vector2();
let BuildingA7_mesh = null; // Store reference to mesh

// Load A7.obj
objLoader.load('./model/image/A7.obj', (object) => {
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/glass_building_texture.jpg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA7_mesh = object;
    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A7
window.addEventListener('click', (event) => {
    if (!BuildingA7_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA7.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA7.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA7.setFromCamera(mouse_BuildingA7, camera);
    const intersects = raycaster_BuildingA7.intersectObject(BuildingA7_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.left = `${event.clientX}px`;
        popup_BuildingA7.style.top = `${event.clientY}px`;
        popup_BuildingA7.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA7.style.display = 'none';
        }, 5000);
    }
});


// Load SmallOffice.obj
objLoader.load('./model/image/SmallOffice.obj', (object) => {
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/cyan_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Create popup element for building A8
const popup_BuildingA8 = document.createElement('div');
popup_BuildingA8.style.position = 'absolute';
popup_BuildingA8.style.background = '#333';
popup_BuildingA8.style.color = '#fff';
popup_BuildingA8.style.padding = '10px';
popup_BuildingA8.style.borderRadius = '5px';
popup_BuildingA8.style.display = 'none';
popup_BuildingA8.innerText = 'Welcome to Building A8!';

// Add translate switch button for building A8
const translateBtn_BuildingA8 = document.createElement('button');
translateBtn_BuildingA8.innerText = 'VN';
translateBtn_BuildingA8.style.marginLeft = '10px';
translateBtn_BuildingA8.style.background = '#555';
translateBtn_BuildingA8.style.color = '#fff';
translateBtn_BuildingA8.style.border = 'none';
translateBtn_BuildingA8.style.borderRadius = '3px';
translateBtn_BuildingA8.style.padding = '3px 8px';
translateBtn_BuildingA8.style.cursor = 'pointer';

let isEnglish_BuildingA8 = true;
const msgEN_BuildingA8 = 'Building A8 is a modern structure designed for collaborative work and its name is Institute of Geophysics.';
const msgVN_BuildingA8 = 'Tòa nhà A8 là một công trình hiện đại được thiết kế cho công việc hợp tác và tên của nó là Viện Vật Lý Địa Cầu.';

translateBtn_BuildingA8.onclick = function() {
    isEnglish_BuildingA8 = !isEnglish_BuildingA8;
    popup_BuildingA8.innerText = isEnglish_BuildingA8 ? msgEN_BuildingA8 : msgVN_BuildingA8;
    translateBtn_BuildingA8.innerText = isEnglish_BuildingA8 ? 'VN' : 'EN';
    popup_BuildingA8.appendChild(translateBtn_BuildingA8);
};

// Append button to popup
popup_BuildingA8.appendChild(translateBtn_BuildingA8);

document.body.appendChild(popup_BuildingA8);

// Raycaster and mouse vector for Building A8
const raycaster_BuildingA8 = new THREE.Raycaster();
const mouse_BuildingA8 = new THREE.Vector2();
let BuildingA8_mesh = null; // Store reference to mesh

// Load A8.obj
objLoader.load('./model/image/A8.obj', (object) => {
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Set texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA8_mesh = object;
    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A8
window.addEventListener('click', (event) => {
    if (!BuildingA8_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA8.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA8.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA8.setFromCamera(mouse_BuildingA8, camera);
    const intersects = raycaster_BuildingA8.intersectObject(BuildingA8_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.left = `${event.clientX}px`;
        popup_BuildingA8.style.top = `${event.clientY}px`;
        popup_BuildingA8.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA8.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for building A9
const popup_BuildingA9 = document.createElement('div');
popup_BuildingA9.style.position = 'absolute';
popup_BuildingA9.style.background = '#333';
popup_BuildingA9.style.color = '#fff';
popup_BuildingA9.style.padding = '10px';
popup_BuildingA9.style.borderRadius = '5px';
popup_BuildingA9.style.display = 'none';
popup_BuildingA9.innerText = 'Welcome to Building A9!';

// Add translate switch button for building A9
const translateBtn_BuildingA9 = document.createElement('button');
translateBtn_BuildingA9.innerText = 'VN';
translateBtn_BuildingA9.style.marginLeft = '10px';
translateBtn_BuildingA9.style.background = '#555';
translateBtn_BuildingA9.style.color = '#fff';
translateBtn_BuildingA9.style.border = 'none';
translateBtn_BuildingA9.style.borderRadius = '3px';
translateBtn_BuildingA9.style.padding = '3px 8px';
translateBtn_BuildingA9.style.cursor = 'pointer';

let isEnglish_BuildingA9 = true;
const msgEN_BuildingA9 = 'Building A9 is Institute of Energy Science and it is located behind Medic Center 1 which is on the right next to Building A8';
const msgVN_BuildingA9 = 'Tòa nhà A9 là Viện Khoa học Năng lượng và nó nằm phía sau Trung tâm Y tế 1, bên phải tòa nhà A8.';

translateBtn_BuildingA9.onclick = function() {
    isEnglish_BuildingA9 = !isEnglish_BuildingA9;
    popup_BuildingA9.innerText = isEnglish_BuildingA9 ? msgEN_BuildingA9 : msgVN_BuildingA9;
    translateBtn_BuildingA9.innerText = isEnglish_BuildingA9 ? 'VN' : 'EN';
    popup_BuildingA9.appendChild(translateBtn_BuildingA9);
};

// Append button to popup
popup_BuildingA9.appendChild(translateBtn_BuildingA9);

document.body.appendChild(popup_BuildingA9);

// Raycaster and mouse vector for Building A9
const raycaster_BuildingA9 = new THREE.Raycaster();
const mouse_BuildingA9 = new THREE.Vector2();
let BuildingA9_mesh = null; // Store reference to mesh

// Load A9.obj
objLoader.load('./model/image/A9.obj', (object) => {
    // Make texture adjustments for A9
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/BuildingA_floor1.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA9_mesh = object;
    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A9
window.addEventListener('click', (event) => {
    if (!BuildingA9_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA9.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA9.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA9.setFromCamera(mouse_BuildingA9, camera);
    const intersects = raycaster_BuildingA9.intersectObject(BuildingA9_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.left = `${event.clientX}px`;
        popup_BuildingA9.style.top = `${event.clientY}px`;
        popup_BuildingA9.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA9.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for building A10
const popup_BuildingA10 = document.createElement('div');
popup_BuildingA10.style.position = 'absolute';
popup_BuildingA10.style.background = '#333';
popup_BuildingA10.style.color = '#fff';
popup_BuildingA10.style.padding = '10px';
popup_BuildingA10.style.borderRadius = '5px';
popup_BuildingA10.style.display = 'none';
popup_BuildingA10.innerText = 'Welcome to Building A10!';

// Add translate switch button for building A10
const translateBtn_BuildingA10 = document.createElement('button');
translateBtn_BuildingA10.innerText = 'VN';
translateBtn_BuildingA10.style.marginLeft = '10px';
translateBtn_BuildingA10.style.background = '#555';
translateBtn_BuildingA10.style.color = '#fff';
translateBtn_BuildingA10.style.border = 'none';
translateBtn_BuildingA10.style.borderRadius = '3px';
translateBtn_BuildingA10.style.padding = '3px 8px';
translateBtn_BuildingA10.style.cursor = 'pointer';

let isEnglish_BuildingA10 = true;
const msgEN_BuildingA10 = 'Building A10 is Institute of Biotechnology which is behind Building A2 from the north and it is on the right side of Medic Center 1.';
const msgVN_BuildingA10 = 'Tòa nhà A10 là Viện Công nghệ Sinh học, nằm phía sau tòa nhà A2 từ phía bắc và bên phải của Trung tâm Y tế 1.';

translateBtn_BuildingA10.onclick = function() {
    isEnglish_BuildingA10 = !isEnglish_BuildingA10;
    popup_BuildingA10.innerText = isEnglish_BuildingA10 ? msgEN_BuildingA10 : msgVN_BuildingA10;
    translateBtn_BuildingA10.innerText = isEnglish_BuildingA10 ? 'VN' : 'EN';
    popup_BuildingA10.appendChild(translateBtn_BuildingA10);
};

// Append button to popup
popup_BuildingA10.appendChild(translateBtn_BuildingA10);

document.body.appendChild(popup_BuildingA10);

// Raycaster and mouse vector for Building A10
const raycaster_BuildingA10 = new THREE.Raycaster();
const mouse_BuildingA10 = new THREE.Vector2();
let BuildingA10_mesh = null; // Store reference to mesh

// Load A10.obj
objLoader.load('./model/image/A10.obj', (object) => {
    // Make texture adjustments for A10
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
        }
    });

    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA10_mesh = object;
    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A10
window.addEventListener('click', (event) => {
    if (!BuildingA10_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA10.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA10.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA10.setFromCamera(mouse_BuildingA10, camera);
    const intersects = raycaster_BuildingA10.intersectObject(BuildingA10_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.left = `${event.clientX}px`;
        popup_BuildingA10.style.top = `${event.clientY}px`;
        popup_BuildingA10.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA10.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for building A11
const popup_BuildingA11 = document.createElement('div');
popup_BuildingA11.style.position = 'absolute';
popup_BuildingA11.style.background = '#333';
popup_BuildingA11.style.color = '#fff';
popup_BuildingA11.style.padding = '10px';
popup_BuildingA11.style.borderRadius = '5px';
popup_BuildingA11.style.display = 'none';
popup_BuildingA11.innerText = 'Welcome to Building A11!';

// Add translate switch button for building A11
const translateBtn_BuildingA11 = document.createElement('button');
translateBtn_BuildingA11.innerText = 'VN';
translateBtn_BuildingA11.style.marginLeft = '10px';
translateBtn_BuildingA11.style.background = '#555';
translateBtn_BuildingA11.style.color = '#fff';
translateBtn_BuildingA11.style.border = 'none';
translateBtn_BuildingA11.style.borderRadius = '3px';
translateBtn_BuildingA11.style.padding = '3px 8px';
translateBtn_BuildingA11.style.cursor = 'pointer';

let isEnglish_BuildingA11 = true;
const msgEN_BuildingA11 = 'Building A11 is our academic library and Institute for Scientific Information which is located to the east of Building A10.';
const msgVN_BuildingA11 = 'Tòa nhà A11 là thư viện học thuật và Viện Thông tin Khoa học của chúng tôi, nằm về phía đông của tòa nhà A10.';

translateBtn_BuildingA11.onclick = function() {
    isEnglish_BuildingA11 = !isEnglish_BuildingA11;
    popup_BuildingA11.innerText = isEnglish_BuildingA11 ? msgEN_BuildingA11 : msgVN_BuildingA11;
    translateBtn_BuildingA11.innerText = isEnglish_BuildingA11 ? 'VN' : 'EN';
    popup_BuildingA11.appendChild(translateBtn_BuildingA11);
};

// Append button to popup
popup_BuildingA11.appendChild(translateBtn_BuildingA11);

document.body.appendChild(popup_BuildingA11);

// Raycaster and mouse vector for Building A11
const raycaster_BuildingA11 = new THREE.Raycaster();
const mouse_BuildingA11 = new THREE.Vector2();
let BuildingA11_mesh = null; // Store reference to mesh

// Load A11.obj
objLoader.load('./model/image/A11.obj', (object) => {
    // Make texture adjustments for A11
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });

    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Circle')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make texture for text mesh
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA11_mesh = object;
    // Set the object's position and scale
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);

}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A11
window.addEventListener('click', (event) => {
    if (!BuildingA11_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA11.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA11.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA11.setFromCamera(mouse_BuildingA11, camera);
    const intersects = raycaster_BuildingA11.intersectObject(BuildingA11_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.left = `${event.clientX}px`;
        popup_BuildingA11.style.top = `${event.clientY}px`;
        popup_BuildingA11.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA11.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for building A12
const popup_BuildingA12 = document.createElement('div');
popup_BuildingA12.style.position = 'absolute';
popup_BuildingA12.style.background = '#333';
popup_BuildingA12.style.color = '#fff';
popup_BuildingA12.style.padding = '10px';
popup_BuildingA12.style.borderRadius = '5px';
popup_BuildingA12.style.display = 'none';
popup_BuildingA12.innerText = 'Welcome to Building A12!';

// Add translate switch button for building A12
const translateBtn_BuildingA12 = document.createElement('button');
translateBtn_BuildingA12.innerText = 'VN';
translateBtn_BuildingA12.style.marginLeft = '10px';
translateBtn_BuildingA12.style.background = '#555';
translateBtn_BuildingA12.style.color = '#fff';
translateBtn_BuildingA12.style.border = 'none';
translateBtn_BuildingA12.style.borderRadius = '3px';
translateBtn_BuildingA12.style.padding = '3px 8px';
translateBtn_BuildingA12.style.cursor = 'pointer';

let isEnglish_BuildingA12 = true;
const msgEN_BuildingA12 = 'Building A12 is Institure for Tropical Technology along with Building A13 which is located to the east of Building A11.';
const msgVN_BuildingA12 = 'Tòa nhà A12 là Viện Công nghệ Nhiệt đới cùng với Tòa nhà A13, nằm ở phía đông của Tòa nhà A11.';

translateBtn_BuildingA12.onclick = function() {
    isEnglish_BuildingA12 = !isEnglish_BuildingA12;
    popup_BuildingA12.innerText = isEnglish_BuildingA12 ? msgEN_BuildingA12 : msgVN_BuildingA12;
    translateBtn_BuildingA12.innerText = isEnglish_BuildingA12 ? 'VN' : 'EN';
    popup_BuildingA12.appendChild(translateBtn_BuildingA12);
};

// Append button to popup
popup_BuildingA12.appendChild(translateBtn_BuildingA12);

document.body.appendChild(popup_BuildingA12);

// Raycaster and mouse vector for Building A12
const raycaster_BuildingA12 = new THREE.Raycaster();
const mouse_BuildingA12 = new THREE.Vector2();
let BuildingA12_mesh = null; // Store reference to mesh

// Load A12.obj
objLoader.load('./model/image/A12.obj', (object) => {
    // Make texture adjustments for A12
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA12_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A12
window.addEventListener('click', (event) => {
    if (!BuildingA12_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA12.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA12.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA12.setFromCamera(mouse_BuildingA12, camera);
    const intersects = raycaster_BuildingA12.intersectObject(BuildingA12_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.left = `${event.clientX}px`;
        popup_BuildingA12.style.top = `${event.clientY}px`;
        popup_BuildingA12.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA12.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for building A13
const popup_BuildingA13 = document.createElement('div');
popup_BuildingA13.style.position = 'absolute';
popup_BuildingA13.style.background = '#333';
popup_BuildingA13.style.color = '#fff';
popup_BuildingA13.style.padding = '10px';
popup_BuildingA13.style.borderRadius = '5px';
popup_BuildingA13.style.display = 'none';
popup_BuildingA13.innerText = 'Welcome to Building A13!';

// Add translate switch button for building A13
const translateBtn_BuildingA13 = document.createElement('button');
translateBtn_BuildingA13.innerText = 'VN';
translateBtn_BuildingA13.style.marginLeft = '10px';
translateBtn_BuildingA13.style.background = '#555';
translateBtn_BuildingA13.style.color = '#fff';
translateBtn_BuildingA13.style.border = 'none';
translateBtn_BuildingA13.style.borderRadius = '3px';
translateBtn_BuildingA13.style.padding = '3px 8px';
translateBtn_BuildingA13.style.cursor = 'pointer';

let isEnglish_BuildingA13 = true;
const msgEN_BuildingA13 = 'Building A13 is part of the Institute for Tropical Technology along with Building A12.';
const msgVN_BuildingA13 = 'Tòa nhà A13 là một phần của Viện Kỹ thuật Nhiệt đới cùng với Tòa nhà A12.';

translateBtn_BuildingA13.onclick = function() {
    isEnglish_BuildingA13 = !isEnglish_BuildingA13;
    popup_BuildingA13.innerText = isEnglish_BuildingA13 ? msgEN_BuildingA13 : msgVN_BuildingA13;
    translateBtn_BuildingA13.innerText = isEnglish_BuildingA13 ? 'VN' : 'EN';
    popup_BuildingA13.appendChild(translateBtn_BuildingA13);
};

// Append button to popup
popup_BuildingA13.appendChild(translateBtn_BuildingA13);

document.body.appendChild(popup_BuildingA13);

// Raycaster and mouse vector for Building A13
const raycaster_BuildingA13 = new THREE.Raycaster();
const mouse_BuildingA13 = new THREE.Vector2();
let BuildingA13_mesh = null; // Store reference to mesh

// Load A13.obj
objLoader.load('./model/image/A13.obj', (object) => {
    // Make texture adjustments for A13
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA13_mesh = object;

    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A13
window.addEventListener('click', (event) => {
    if (!BuildingA13_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA13.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA13.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA13.setFromCamera(mouse_BuildingA13, camera);
    const intersects = raycaster_BuildingA13.intersectObject(BuildingA13_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.left = `${event.clientX}px`;
        popup_BuildingA13.style.top = `${event.clientY}px`;
        popup_BuildingA13.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA13.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for building A14
const popup_BuildingA14 = document.createElement('div');
popup_BuildingA14.style.position = 'absolute';
popup_BuildingA14.style.background = '#333';
popup_BuildingA14.style.color = '#fff';
popup_BuildingA14.style.padding = '10px';
popup_BuildingA14.style.borderRadius = '5px';
popup_BuildingA14.style.display = 'none';
popup_BuildingA14.innerText = 'Welcome to Building A14!';

// Add translate switch button for building A14
const translateBtn_BuildingA14 = document.createElement('button');
translateBtn_BuildingA14.innerText = 'VN';
translateBtn_BuildingA14.style.marginLeft = '10px';
translateBtn_BuildingA14.style.background = '#555';
translateBtn_BuildingA14.style.color = '#fff';
translateBtn_BuildingA14.style.border = 'none';
translateBtn_BuildingA14.style.borderRadius = '3px';
translateBtn_BuildingA14.style.padding = '3px 8px';
translateBtn_BuildingA14.style.cursor = 'pointer';

let isEnglish_BuildingA14 = true;
const msgEN_BuildingA14 = 'Building A14 is our academic canteen which lies behind Institute for Tropical Technology(A12 & A13)';
const msgVN_BuildingA14 = 'Tòa nhà A14 là căng tin của viện hàn lâm chúng tôi nằm phía sau Viện Kỹ thuật Nhiệt đới (A12 & A13)';

translateBtn_BuildingA14.onclick = function() {
    isEnglish_BuildingA14 = !isEnglish_BuildingA14;
    popup_BuildingA14.innerText = isEnglish_BuildingA14 ? msgEN_BuildingA14 : msgVN_BuildingA14;
    translateBtn_BuildingA14.innerText = isEnglish_BuildingA14 ? 'VN' : 'EN';
    popup_BuildingA14.appendChild(translateBtn_BuildingA14);
};

// Append button to popup
popup_BuildingA14.appendChild(translateBtn_BuildingA14);

document.body.appendChild(popup_BuildingA14);

// Raycaster and mouse vector for Building A14
const raycaster_BuildingA14 = new THREE.Raycaster();
const mouse_BuildingA14 = new THREE.Vector2();
let BuildingA14_mesh = null; // Store reference to mesh

// Load A14.obj
objLoader.load('./model/image/A14.obj', (object) => {
    // Make texture adjustments for A14
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/glass_building_texture.jpg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    BuildingA14_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Building A14
window.addEventListener('click', (event) => {
    if (!BuildingA14_mesh) return; // Prevent action before mesh is loaded

    mouse_BuildingA14.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_BuildingA14.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_BuildingA14.setFromCamera(mouse_BuildingA14, camera);
    const intersects = raycaster_BuildingA14.intersectObject(BuildingA14_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.left = `${event.clientX}px`;
        popup_BuildingA14.style.top = `${event.clientY}px`;
        popup_BuildingA14.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA14.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for Medic Center 1
const popup_Medic1 = document.createElement('div');
popup_Medic1.style.position = 'absolute';
popup_Medic1.style.background = '#333';
popup_Medic1.style.color = '#fff';
popup_Medic1.style.padding = '10px';
popup_Medic1.style.borderRadius = '5px';
popup_Medic1.style.display = 'none';
popup_Medic1.innerText = 'Welcome to Medic Center 1!';

// Add translate switch button for Medic Center 1
const translateBtn_Medic1 = document.createElement('button');
translateBtn_Medic1.innerText = 'VN';
translateBtn_Medic1.style.marginLeft = '10px';
translateBtn_Medic1.style.background = '#555';
translateBtn_Medic1.style.color = '#fff';
translateBtn_Medic1.style.border = 'none';
translateBtn_Medic1.style.borderRadius = '3px';
translateBtn_Medic1.style.padding = '3px 8px';
translateBtn_Medic1.style.cursor = 'pointer';

let isEnglish_Medic1 = true;
const msgEN_Medic1 = 'Medic Center 1 is our small clinic located between building A8 and A10.';
const msgVN_Medic1 = 'Trung tâm Y tế 1 là phòng khám nhỏ của chúng tôi nằm giữa tòa nhà A8 và A10.';

translateBtn_Medic1.onclick = function() {
    isEnglish_Medic1 = !isEnglish_Medic1;
    popup_Medic1.innerText = isEnglish_Medic1 ? msgEN_Medic1 : msgVN_Medic1;
    translateBtn_Medic1.innerText = isEnglish_Medic1 ? 'VN' : 'EN';
    popup_Medic1.appendChild(translateBtn_Medic1);
};

// Append button to popup
popup_Medic1.appendChild(translateBtn_Medic1);

document.body.appendChild(popup_Medic1);

// Raycaster and mouse vector for Medic Center 1
const raycaster_Medic1 = new THREE.Raycaster();
const mouse_Medic1 = new THREE.Vector2();
let Medic1_mesh = null; // Store reference to mesh

// Load Medic1.obj
objLoader.load('./model/image/Medic1.obj', (object) => {
    // Make texture adjustments for Medic1
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/medic_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    Medic1_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Medic Center 1
window.addEventListener('click', (event) => {
    if (!Medic1_mesh) return; // Prevent action before mesh is loaded

    mouse_Medic1.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_Medic1.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_Medic1.setFromCamera(mouse_Medic1, camera);
    const intersects = raycaster_Medic1.intersectObject(Medic1_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.left = `${event.clientX}px`;
        popup_Medic1.style.top = `${event.clientY}px`;
        popup_Medic1.style.display = 'block';

        setTimeout(() => {
            popup_Medic1.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for VastMedic
const popup_VastMedic = document.createElement('div');
popup_VastMedic.style.position = 'absolute';
popup_VastMedic.style.background = '#333';
popup_VastMedic.style.color = '#fff';
popup_VastMedic.style.padding = '10px';
popup_VastMedic.style.borderRadius = '5px';
popup_VastMedic.style.display = 'none';
popup_VastMedic.innerText = 'Welcome to Vast Medic Center!';

// Add translate switch button for VastMedic
const translateBtn_VastMedic = document.createElement('button');
translateBtn_VastMedic.innerText = 'VN';
translateBtn_VastMedic.style.marginLeft = '10px';
translateBtn_VastMedic.style.background = '#555';
translateBtn_VastMedic.style.color = '#fff';
translateBtn_VastMedic.style.border = 'none';
translateBtn_VastMedic.style.borderRadius = '3px';
translateBtn_VastMedic.style.padding = '3px 8px';
translateBtn_VastMedic.style.cursor = 'pointer';

let isEnglish_VastMedic = true;
const msgEN_VastMedic = 'This building is Vast Medical Center for Vietnam Academy of Science & Technology and our university. People can access a wide range of medical services here.';
const msgVN_VastMedic = 'Tòa nhà này là Trung tâm Y tế Vast của Viện Hàn lâm Khoa học và Công nghệ Việt Nam và trường đại học của chúng tôi. Mọi người có thể tiếp cận nhiều dịch vụ y tế tại đây.';

translateBtn_VastMedic.onclick = function() {
    isEnglish_VastMedic = !isEnglish_VastMedic;
    popup_VastMedic.innerText = isEnglish_VastMedic ? msgEN_VastMedic : msgVN_VastMedic;
    translateBtn_VastMedic.innerText = isEnglish_VastMedic ? 'VN' : 'EN';
    popup_VastMedic.appendChild(translateBtn_VastMedic);
};

// Append button to popup
popup_VastMedic.appendChild(translateBtn_VastMedic);

document.body.appendChild(popup_VastMedic);

// Raycaster and mouse vector for VastMedic
const raycaster_VastMedic = new THREE.Raycaster();
const mouse_VastMedic = new THREE.Vector2();
let VastMedic_mesh = null; // Store reference to mesh

// Load Medic2.obj
objLoader.load('./model/image/Medic2.obj', (object) => {
    // Make texture adjustments for Medic2
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/glass_building_texture.jpg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/medic_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    VastMedic_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for Vast Medic Center
window.addEventListener('click', (event) => {
    if (!VastMedic_mesh) return; // Prevent action before mesh is loaded

    mouse_VastMedic.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_VastMedic.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_VastMedic.setFromCamera(mouse_VastMedic, camera);
    const intersects = raycaster_VastMedic.intersectObject(VastMedic_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.left = `${event.clientX}px`;
        popup_VastMedic.style.top = `${event.clientY}px`;
        popup_VastMedic.style.display = 'block';

        setTimeout(() => {
            popup_VastMedic.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for A18-1
const popup_A18_1 = document.createElement('div');
popup_A18_1.style.position = 'absolute';
popup_A18_1.style.background = '#333';
popup_A18_1.style.color = '#fff';
popup_A18_1.style.padding = '10px';
popup_A18_1.style.borderRadius = '5px';
popup_A18_1.style.display = 'none';
popup_A18_1.innerText = 'Welcome to A18-1!';

// Add translate switch button for A18-1
const translateBtn_A18_1 = document.createElement('button');
translateBtn_A18_1.innerText = 'VN';
translateBtn_A18_1.style.marginLeft = '10px';
translateBtn_A18_1.style.background = '#555';
translateBtn_A18_1.style.color = '#fff';
translateBtn_A18_1.style.border = 'none';
translateBtn_A18_1.style.borderRadius = '3px';
translateBtn_A18_1.style.padding = '3px 8px';
translateBtn_A18_1.style.cursor = 'pointer';

let isEnglish_A18_1 = true;
const msgEN_A18_1 = 'This building is A18-1 for Vietnam Academy of Science & Technology and our university. Also, its name is Institute of Chemistry along with Building A18-2.';
const msgVN_A18_1 = 'Tòa nhà này là A18-1 của Viện Hàn lâm Khoa học và Công nghệ Việt Nam và trường đại học của chúng tôi. Tên của nó cũng là Viện Hóa học cùng với Tòa nhà A18-2.';

translateBtn_A18_1.onclick = function() {
    isEnglish_A18_1 = !isEnglish_A18_1;
    popup_A18_1.innerText = isEnglish_A18_1 ? msgEN_A18_1 : msgVN_A18_1;
    translateBtn_A18_1.innerText = isEnglish_A18_1 ? 'VN' : 'EN';
    popup_A18_1.appendChild(translateBtn_A18_1);
};

// Append button to popup
popup_A18_1.appendChild(translateBtn_A18_1);

document.body.appendChild(popup_A18_1);

// Raycaster and mouse vector for A18-1
const raycaster_A18_1 = new THREE.Raycaster();
const mouse_A18_1 = new THREE.Vector2();
let A18_1_mesh = null; // Store reference to mesh

// Load A18-1.obj
objLoader.load('./model/image/A18-1.obj', (object) => {
    // Make texture adjustments for A18-1
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    A18_1_mesh = object;

    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for A18-1
window.addEventListener('click', (event) => {
    if (!A18_1_mesh) return; // Prevent action before mesh is loaded

    mouse_A18_1.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A18_1.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_A18_1.setFromCamera(mouse_A18_1, camera);
    const intersects = raycaster_A18_1.intersectObject(A18_1_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.display = 'none';
        popup_A18_1.style.left = `${event.clientX}px`;
        popup_A18_1.style.top = `${event.clientY}px`;
        popup_A18_1.style.display = 'block';

        setTimeout(() => {
            popup_A18_1.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for A18-2
const popup_A18_2 = document.createElement('div');
popup_A18_2.style.position = 'absolute';
popup_A18_2.style.background = '#333';
popup_A18_2.style.color = '#fff';
popup_A18_2.style.padding = '10px';
popup_A18_2.style.borderRadius = '5px';
popup_A18_2.style.display = 'none';
popup_A18_2.innerText = 'Welcome to Building A18-2!';

// Add translate switch button for A18-2
const translateBtn_A18_2 = document.createElement('button');
translateBtn_A18_2.innerText = 'VN';
translateBtn_A18_2.style.marginLeft = '10px';
translateBtn_A18_2.style.background = '#555';
translateBtn_A18_2.style.color = '#fff';
translateBtn_A18_2.style.border = 'none';
translateBtn_A18_2.style.borderRadius = '3px';
translateBtn_A18_2.style.padding = '3px 8px';
translateBtn_A18_2.style.cursor = 'pointer';

let isEnglish_A18_2 = true;
const msgEN_A18_2 = 'This building is A18-2 of Vietnam Academy of Science & Technology and our university. Also, its name is Institute of Chemistry along with Building A18-1.';
const msgVN_A18_2 = 'Tòa nhà này là A18-2 của Viện Hàn lâm Khoa học và Công nghệ Việt Nam và trường đại học của chúng tôi. Tên của nó cũng là Viện Hóa học cùng với Tòa nhà A18-1.';

translateBtn_A18_2.onclick = function() {
    isEnglish_A18_2 = !isEnglish_A18_2;
    popup_A18_2.innerText = isEnglish_A18_2 ? msgEN_A18_2 : msgVN_A18_2;
    translateBtn_A18_2.innerText = isEnglish_A18_2 ? 'VN' : 'EN';
    popup_A18_2.appendChild(translateBtn_A18_2);
};

// Append button to popup
popup_A18_2.appendChild(translateBtn_A18_2);

document.body.appendChild(popup_A18_2);

// Raycaster and mouse vector for A18-2
const raycaster_A18_2 = new THREE.Raycaster();
const mouse_A18_2 = new THREE.Vector2();
let A18_2_mesh = null; // Store reference to mesh

// Load A18-2.obj
objLoader.load('./model/image/A18-2.obj', (object) => {
    // Make texture adjustments for A18-2's faces not rooftop
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.067')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/BuildingA18-2_texture.png'),
                side: THREE.FrontSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    A18_2_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for A18-2
window.addEventListener('click', (event) => {
    if (!A18_2_mesh) return; // Prevent action before mesh is loaded

    mouse_A18_2.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A18_2.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_A18_2.setFromCamera(mouse_A18_2, camera);
    const intersects = raycaster_A18_2.intersectObject(A18_2_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.display = 'none';
        popup_A18_1.style.display = 'none';
        popup_A18_2.style.left = `${event.clientX}px`;
        popup_A18_2.style.top = `${event.clientY}px`;
        popup_A18_2.style.display = 'block';

        setTimeout(() => {
            popup_A18_2.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for A20
const popup_A20 = document.createElement('div');
popup_A20.style.position = 'absolute';
popup_A20.style.background = '#333';
popup_A20.style.color = '#fff';
popup_A20.style.padding = '10px';
popup_A20.style.borderRadius = '5px';
popup_A20.style.display = 'none';
popup_A20.innerText = 'Welcome to Building A20!';

// Add translate switch button for A20
const translateBtn_A20 = document.createElement('button');
translateBtn_A20.innerText = 'VN';
translateBtn_A20.style.marginLeft = '10px';
translateBtn_A20.style.background = '#555';
translateBtn_A20.style.color = '#fff';
translateBtn_A20.style.border = 'none';
translateBtn_A20.style.borderRadius = '3px';
translateBtn_A20.style.padding = '3px 8px';
translateBtn_A20.style.cursor = 'pointer';

let isEnglish_A20 = true;
const msgEN_A20 = 'This building is A20 of Vietnam Academy of Science & Technology and our university. Also, its name is Vietnam National Museum of Nature which opens from Tuesday to Friday with opening hours from 8:30AM to 11:30AM and 1:30PM to 4:30PM.';
const msgVN_A20 = 'Tòa nhà này là A20 của Viện Hàn lâm Khoa học và Công nghệ Việt Nam và trường đại học của chúng tôi. Tên của tòa nhà này là Bảo tàng Thiên nhiên Việt Nam mở cửa từ thứ Ba đến thứ Sáu với giờ mở cửa từ 8:30AM đến 11:30AM trong buổi sáng và 1:30PM đến 4:30PM vào buổi chiều.';

translateBtn_A20.onclick = function() {
    isEnglish_A20 = !isEnglish_A20;
    popup_A20.innerText = isEnglish_A20 ? msgEN_A20 : msgVN_A20;
    translateBtn_A20.innerText = isEnglish_A20 ? 'VN' : 'EN';
    popup_A20.appendChild(translateBtn_A20);
};

// Append button to popup
popup_A20.appendChild(translateBtn_A20);

document.body.appendChild(popup_A20);

// Raycaster and mouse vector for A20
const raycaster_A20 = new THREE.Raycaster();
const mouse_A20 = new THREE.Vector2();
let A20_mesh = null; // Store reference to mesh

// Load A20.obj
objLoader.load('./model/image/A20.obj', (object) => {
    // Make texture adjustments for A20
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    A20_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for A20
window.addEventListener('click', (event) => {
    if (!A20_mesh) return; // Prevent action before mesh is loaded

    mouse_A20.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A20.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_A20.setFromCamera(mouse_A20, camera);
    const intersects = raycaster_A20.intersectObject(A20_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.display = 'none';
        popup_A18_1.style.display = 'none';
        popup_A18_2.style.display = 'none';
        popup_A20.style.left = `${event.clientX}px`;
        popup_A20.style.top = `${event.clientY}px`;
        popup_A20.style.display = 'block';

        setTimeout(() => {
            popup_A20.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for A21
const popup_A21 = document.createElement('div');
popup_A21.style.position = 'absolute';
popup_A21.style.background = '#333';
popup_A21.style.color = '#fff';
popup_A21.style.padding = '10px';
popup_A21.style.borderRadius = '5px';
popup_A21.innerText = 'Welcome to Building A21!';

// Add translate switch button for A21
const translateBtn_A21 = document.createElement('button');
translateBtn_A21.innerText = 'VN';
translateBtn_A21.style.marginLeft = '10px';
translateBtn_A21.style.background = '#555';
translateBtn_A21.style.color = '#fff';
translateBtn_A21.style.border = 'none';
translateBtn_A21.style.borderRadius = '3px';
translateBtn_A21.style.padding = '3px 8px';
translateBtn_A21.style.cursor = 'pointer';

let isEnglish_A21 = true;
const msgEN_A21 = 'This building is A21 of Vietnam Academy of Science & Technology and our university. Also, its name is University of Science and Technology of Hanoi(USTH) and it is also our main office building.';
const msgVN_A21 = 'Tòa nhà này là A21 của Viện Hàn lâm Khoa học và Công nghệ Việt Nam và trường đại học của chúng tôi. Tên của tòa nhà này là Trường Đại học Khoa học và Công nghệ Hà Nội (USTH) và cũng là tòa nhà văn phòng chính của chúng tôi.';

translateBtn_A21.onclick = function() {
    isEnglish_A21 = !isEnglish_A21;
    popup_A21.innerText = isEnglish_A21 ? msgEN_A21 : msgVN_A21;
    translateBtn_A21.innerText = isEnglish_A21 ? 'VN' : 'EN';
    popup_A21.appendChild(translateBtn_A21);
};

// Append button to popup
popup_A21.appendChild(translateBtn_A21);

document.body.appendChild(popup_A21);

// Raycaster and mouse vector for A20
const raycaster_A21 = new THREE.Raycaster();
const mouse_A21 = new THREE.Vector2();
let A21_mesh = null; // Store reference to mesh

// Load A21.obj
objLoader.load('./model/image/A21.obj', (object) => {
    // Make texture adjustments for A21
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/glass_building_texture.jpg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    A21_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for A21
window.addEventListener('click', (event) => {
    if (!A21_mesh) return; // Prevent action before mesh is loaded

    mouse_A21.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A21.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse_A21.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A21.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_A21.setFromCamera(mouse_A21, camera);
    const intersects = raycaster_A21.intersectObject(A21_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.display = 'none';
        popup_A18_1.style.display = 'none';
        popup_A18_2.style.display = 'none';
        popup_A20.style.display = 'none';
        popup_A21.style.left = `${event.clientX}px`;
        popup_A21.style.top = `${event.clientY}px`;
        popup_A21.style.display = 'block';

        setTimeout(() => {
            popup_A21.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for A22
const popup_A22 = document.createElement('div');
popup_A22.style.position = 'absolute';
popup_A22.style.background = '#333';
popup_A22.style.color = '#fff';
popup_A22.style.padding = '10px';
popup_A22.style.borderRadius = '5px';
popup_A22.innerText = 'Welcome to Building A22!';

// Add translate switch button for A22
const translateBtn_A22 = document.createElement('button');
translateBtn_A22.innerText = 'VN';
translateBtn_A22.style.marginLeft = '10px';
translateBtn_A22.style.background = '#555';
translateBtn_A22.style.color = '#fff';
translateBtn_A22.style.border = 'none';
translateBtn_A22.style.borderRadius = '3px';
translateBtn_A22.style.padding = '3px 8px';
translateBtn_A22.style.cursor = 'pointer';

let isEnglish_A22 = true;
const msgEN_A22 = 'A22 is Institute of Space Technology of Vietnam Academy of Science & Technology and our university. It is also known as Space Technology Institute (STI).';
const msgVN_A22 = 'A22 là Viện Công nghệ Vũ trụ của Viện Hàn lâm Khoa học và Công nghệ Việt Nam và trường đại học của chúng tôi. Nó cũng được biết đến với tên gọi Viện Công nghệ Vũ trụ (STI).';

translateBtn_A22.onclick = function() {
    isEnglish_A22 = !isEnglish_A22;
    popup_A22.innerText = isEnglish_A22 ? msgEN_A22 : msgVN_A22;
    translateBtn_A22.innerText = isEnglish_A22 ? 'VN' : 'EN';
    popup_A22.appendChild(translateBtn_A22);
};

// Append button to popup
popup_A22.appendChild(translateBtn_A22);

document.body.appendChild(popup_A22);

// Raycaster and mouse vector for A22
const raycaster_A22 = new THREE.Raycaster();
const mouse_A22 = new THREE.Vector2();
let A22_mesh = null; // Store reference to mesh

// Load A22.obj
objLoader.load('./model/image/A22.obj', (object) => {
    // Make texture adjustments for A22
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/cyan_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    A22_mesh = object;

    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for A22
window.addEventListener('click', (event) => {
    if (!A22_mesh) return; // Prevent action before mesh is loaded

    mouse_A22.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A22.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse_A22.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A22.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_A22.setFromCamera(mouse_A22, camera);
    const intersects = raycaster_A22.intersectObject(A22_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.display = 'none';
        popup_A18_1.style.display = 'none';
        popup_A18_2.style.display = 'none';
        popup_A20.style.display = 'none';
        popup_A21.style.display = 'none';
        popup_A22.style.left = `${event.clientX}px`;
        popup_A22.style.top = `${event.clientY}px`;
        popup_A22.style.display = 'block';

        setTimeout(() => {
            popup_A22.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for A23
const popup_A23 = document.createElement('div');
popup_A23.style.position = 'absolute';
popup_A23.style.background = '#333';
popup_A23.style.color = '#fff';
popup_A23.style.padding = '10px';
popup_A23.style.borderRadius = '5px';
popup_A23.innerText = 'Welcome to Building A23!';

// Add translate switch button for A23
const translateBtn_A23 = document.createElement('button');
translateBtn_A23.innerText = 'VN';
translateBtn_A23.style.marginLeft = '10px';
translateBtn_A23.style.background = '#555';
translateBtn_A23.style.color = '#fff';
translateBtn_A23.style.border = 'none';
translateBtn_A23.style.borderRadius = '3px';
translateBtn_A23.style.padding = '3px 8px';
translateBtn_A23.style.cursor = 'pointer';

let isEnglish_A23 = true;
const msgEN_A23 = 'A23 is Institute of Space Technology of Vietnam Academy of Science & Technology and our university along with building A22';
const msgVN_A23 = 'A23 là Viện Công nghệ Vũ trụ của Viện Hàn lâm Khoa học và Công nghệ Việt Nam và trường đại học của chúng tôi cùng với tòa nhà A22.';

translateBtn_A23.onclick = function() {
    isEnglish_A23 = !isEnglish_A23;
    popup_A23.innerText = isEnglish_A23 ? msgEN_A23 : msgVN_A23;
    translateBtn_A23.innerText = isEnglish_A23 ? 'VN' : 'EN';
    popup_A23.appendChild(translateBtn_A23);
};

// Append button to popup
popup_A23.appendChild(translateBtn_A23);

document.body.appendChild(popup_A23);

// Raycaster and mouse vector for A23
const raycaster_A23 = new THREE.Raycaster();
const mouse_A23 = new THREE.Vector2();
let A23_mesh = null; // Store reference to mesh

// Load A23.obj
objLoader.load('./model/image/A23.obj', (object) => {
    // Make texture adjustments for A23
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/cyan_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    A23_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for A23
window.addEventListener('click', (event) => {
    if (!A23_mesh) return; // Prevent action before mesh is loaded

    mouse_A23.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A23.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse_A23.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A23.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_A23.setFromCamera(mouse_A23, camera);
    const intersects = raycaster_A23.intersectObject(A23_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.display = 'none';
        popup_A18_1.style.display = 'none';
        popup_A18_2.style.display = 'none';
        popup_A20.style.display = 'none';
        popup_A21.style.display = 'none';
        popup_A22.style.display = 'none';
        popup_A23.style.left = `${event.clientX}px`;
        popup_A23.style.top = `${event.clientY}px`;
        popup_A23.style.display = 'block';

        setTimeout(() => {
            popup_A23.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for A30
const popup_A30 = document.createElement('div');
popup_A30.style.position = 'absolute';
popup_A30.style.background = '#333';
popup_A30.style.color = '#fff';
popup_A30.style.padding = '10px';
popup_A30.style.borderRadius = '5px';
popup_A30.innerText = 'Welcome to Building A30!';

// Add translate switch button for A30
const translateBtn_A30 = document.createElement('button');
translateBtn_A30.innerText = 'VN';
translateBtn_A30.style.marginLeft = '10px';
translateBtn_A30.style.background = '#555';
translateBtn_A30.style.color = '#fff';
translateBtn_A30.style.border = 'none';
translateBtn_A30.style.borderRadius = '3px';
translateBtn_A30.style.padding = '3px 8px';
translateBtn_A30.style.cursor = 'pointer';

let isEnglish_A30 = true;
const msgEN_A30 = 'A30 is Institute of Environmental Technology of Hanoi University of Science and Technology.';
const msgVN_A30 = 'A30 là Viện Công nghệ Môi trường của Trường Đại học Khoa học và Công nghệ Hà Nội.';

translateBtn_A30.onclick = function() {
    isEnglish_A30 = !isEnglish_A30;
    popup_A30.innerText = isEnglish_A30 ? msgEN_A30 : msgVN_A30;
    translateBtn_A30.innerText = isEnglish_A30 ? 'VN' : 'EN';
    popup_A30.appendChild(translateBtn_A30);
};

// Append button to popup
popup_A30.appendChild(translateBtn_A30);

document.body.appendChild(popup_A30);

// Raycaster and mouse vector for A30
const raycaster_A30 = new THREE.Raycaster();
const mouse_A30 = new THREE.Vector2();
let A30_mesh = null; // Store reference to mesh

// Load A30.obj
objLoader.load('./model/image/A30.obj', (object) => {
    // Make texture adjustments for A30
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.069')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/BuildingA30_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make texture adjustments for A30's small building
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane.063')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/SmallA30_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    A30_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for A30
window.addEventListener('click', (event) => {
    if (!A30_mesh) return; // Prevent action before mesh is loaded

    mouse_A30.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A30.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse_A30.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A30.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_A30.setFromCamera(mouse_A30, camera);
    const intersects = raycaster_A30.intersectObject(A30_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.display = 'none';
        popup_A18_1.style.display = 'none';
        popup_A18_2.style.display = 'none';
        popup_A20.style.display = 'none';
        popup_A21.style.display = 'none';
        popup_A22.style.display = 'none';
        popup_A23.style.display = 'none';
        popup_A25.style.display = 'none';
        popup_A26.style.display = 'none';
        popup_A30.style.left = `${event.clientX}px`;
        popup_A30.style.top = `${event.clientY}px`;
        popup_A30.style.display = 'block';

        setTimeout(() => {
            popup_A30.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for A25
const popup_A25 = document.createElement('div');
popup_A25.style.position = 'absolute';
popup_A25.style.background = '#333';
popup_A25.style.color = '#fff';
popup_A25.style.padding = '10px';
popup_A25.style.borderRadius = '5px';
popup_A25.innerText = 'Welcome to Building A25!';

// Add translate switch button for A25
const translateBtn_A25 = document.createElement('button');
translateBtn_A25.innerText = 'VN';
translateBtn_A25.style.marginLeft = '10px';
translateBtn_A25.style.background = '#555';
translateBtn_A25.style.color = '#fff';
translateBtn_A25.style.border = 'none';
translateBtn_A25.style.borderRadius = '3px';
translateBtn_A25.style.padding = '3px 8px';
translateBtn_A25.style.cursor = 'pointer';

let isEnglish_A25 = true;
const msgEN_A25 = 'A25 is Institute of Physics which lies inside USTH(University of Science and Technology of Hanoi) which lies on the right next to building A30.';
const msgVN_A25 = 'A25 là Viện Vật lý nằm trong USTH (Đại học Khoa học và Công nghệ Hà Nội) nằm bên phải tòa nhà A30.';

translateBtn_A25.onclick = function() {
    isEnglish_A25 = !isEnglish_A25;
    popup_A25.innerText = isEnglish_A25 ? msgEN_A25 : msgVN_A25;
    translateBtn_A25.innerText = isEnglish_A25 ? 'VN' : 'EN';
    popup_A25.appendChild(translateBtn_A25);
};

// Append button to popup
popup_A25.appendChild(translateBtn_A25);

document.body.appendChild(popup_A25);

// Raycaster and mouse vector for A25
const raycaster_A25 = new THREE.Raycaster();
const mouse_A25 = new THREE.Vector2();
let A25_mesh = null; // Store reference to mesh

// Load A25.obj
objLoader.load('./model/image/A25.obj', (object) => {
    // Make texture adjustments for A25
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/cyan_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    A25_mesh = object;
    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for A25
window.addEventListener('click', (event) => {
    if (!A25_mesh) return; // Prevent action before mesh is loaded

    mouse_A25.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A25.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse_A25.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A25.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_A25.setFromCamera(mouse_A25, camera);
    const intersects = raycaster_A25.intersectObject(A25_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.display = 'none';
        popup_A18_1.style.display = 'none';
        popup_A18_2.style.display = 'none';
        popup_A20.style.display = 'none';
        popup_A21.style.display = 'none';
        popup_A22.style.display = 'none';
        popup_A23.style.display = 'none';
        popup_A30.style.display = 'none';
        popup_A25.style.left = `${event.clientX}px`;
        popup_A25.style.top = `${event.clientY}px`;
        popup_A25.style.display = 'block';

        setTimeout(() => {
            popup_A25.style.display = 'none';
        }, 5000);
    }
});

// Create popup element for A26
const popup_A26 = document.createElement('div');
popup_A26.style.position = 'absolute';
popup_A26.style.background = '#333';
popup_A26.style.color = '#fff';
popup_A26.style.padding = '10px';
popup_A26.style.borderRadius = '5px';
popup_A26.innerText = 'Welcome to Building A26!';

// Add translate switch button for A26
const translateBtn_A26 = document.createElement('button');
translateBtn_A26.innerText = 'VN';
translateBtn_A26.style.marginLeft = '10px';
translateBtn_A26.style.background = '#555';
translateBtn_A26.style.color = '#fff';
translateBtn_A26.style.border = 'none';
translateBtn_A26.style.borderRadius = '3px';
translateBtn_A26.style.padding = '3px 8px';
translateBtn_A26.style.cursor = 'pointer';

let isEnglish_A26 = true;
const msgEN_A26 = 'A26 is Center of Applied Physics and Scientific Instruments which is a part of Institute of Physics(A25).';
const msgVN_A26 = 'A26 là Trung tâm Vật lý ứng dụng và Thiết bị khoa học, là một phần của Viện Vật lý (A25).';

translateBtn_A26.onclick = function() {
    isEnglish_A26 = !isEnglish_A26;
    popup_A26.innerText = isEnglish_A26 ? msgEN_A26 : msgVN_A26;
    translateBtn_A26.innerText = isEnglish_A26 ? 'VN' : 'EN';
    popup_A26.appendChild(translateBtn_A26);
};

// Append button to popup
popup_A26.appendChild(translateBtn_A26);

document.body.appendChild(popup_A26);

// Raycaster and mouse vector for A26
const raycaster_A26 = new THREE.Raycaster();
const mouse_A26 = new THREE.Vector2();
let A26_mesh = null; // Store reference to mesh

// Load A26.obj
objLoader.load('./model/image/A26.obj', (object) => {
    // Make texture adjustments for A26
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    A26_mesh = object;

    object.position.set(0, 0, 0);
    object.scale.set(0.026, 0.026, 0.026); // Scale down the mesh
    scene.add(object);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    // Place camera in front of the building, aligned with the mesh center's y-coordinate
    camera.position.set(center.x, box.max.y + 2, center.z+2);
    camera.lookAt(center);
    controls.target.copy(center);
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Handle mouse click (only triggers popup) for A26
window.addEventListener('click', (event) => {
    if (!A26_mesh) return; // Prevent action before mesh is loaded

    mouse_A26.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A26.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse_A26.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse_A26.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster_A26.setFromCamera(mouse_A26, camera);
    const intersects = raycaster_A26.intersectObject(A26_mesh, true);

    if (intersects.length > 0) {
        // Hide all other popups
        
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.display = 'none';
        popup_BuildingA3.style.display = 'none';
        popup_BuildingA5.style.display = 'none';
        popup_BuildingA6.style.display = 'none';
        popup_BuildingA7.style.display = 'none';
        popup_BuildingA8.style.display = 'none';
        popup_BuildingA9.style.display = 'none';
        popup_BuildingA10.style.display = 'none';
        popup_BuildingA11.style.display = 'none';
        popup_BuildingA12.style.display = 'none';
        popup_BuildingA13.style.display = 'none';
        popup_BuildingA14.style.display = 'none';
        popup_Medic1.style.display = 'none';
        popup_VastMedic.style.display = 'none';
        popup_A18_1.style.display = 'none';
        popup_A18_2.style.display = 'none';
        popup_A20.style.display = 'none';
        popup_A21.style.display = 'none';
        popup_A22.style.display = 'none';
        popup_A23.style.display = 'none';
        popup_A30.style.display = 'none';
        popup_A25.style.display = 'none';
        popup_A26.style.left = `${event.clientX}px`;
        popup_A26.style.top = `${event.clientY}px`;
        popup_A26.style.display = 'block';

        setTimeout(() => {
            popup_A26.style.display = 'none';
        }, 5000);
    }
});

// Load B2.obj
objLoader.load('./model/image/B2.obj', (object) => {
    // Make texture adjustments for B2
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load A27.obj
objLoader.load('./model/image/A27.obj', (object) => {
    // Make texture adjustments for A27 left and right parts
    object.traverse((child) => {
        if (child.isMesh && child.name && (child.name.includes('Plane.006') || child.name.includes('Plane.065'))) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make texture adjustments for A27 middle parts
    object.traverse((child) => {
        if (child.isMesh && child.name && (child.name.includes('Plane.022') || child.name.includes('Plane.064'))) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/cyan_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });

    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load A28.obj
objLoader.load('./model/image/A28.obj', (object) => {
    // Make texture adjustments for A28
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/glass_building_texture.jpg'),   
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
                });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load 2H.obj
objLoader.load('./model/image/2H.obj', (object) => {
    // Make texture adjustments for 2H
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/glass_building_texture.jpg'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load 1H.obj
objLoader.load('./model/image/1H.obj', (object) => {
    // Make texture adjustments for 1H
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/green_color_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load 2A.obj
objLoader.load('./model/image/2A.obj', (object) => {
    // Make texture adjustments for 2A
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/green_color_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load 2B.obj
objLoader.load('./model/image/2B.obj', (object) => {
    // Make texture adjustments for 2A
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/green_color_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load 2C.obj
objLoader.load('./model/image/2C.obj', (object) => {
    // Make texture adjustments for 2C
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/green_color_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load B1.obj
objLoader.load('./model/image/B1.obj', (object) => {
    // Make texture adjustments for B1
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/glass_building_texture.jpg'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load B3.obj
objLoader.load('./model/image/B3.obj', (object) => {
    // Make texture adjustments for B3
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/gate_station_color.jpeg'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load B4.obj
objLoader.load('./model/image/B4.obj', (object) => {
    // Make texture adjustments for B4
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/building_default_color.png'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});

// Load B5.obj
objLoader.load('./model/image/B5.obj', (object) => {
    // Make texture adjustments for B5
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Plane')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/green_color_texture.png'),
                side: THREE.DoubleSide
            });
        }
    });
    // Make text mesh with texture
    object.traverse((child) => {
        if (child.isMesh && child.name && child.name.includes('Text')) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/dark_blue_texture.png'),
                side: THREE.DoubleSide
            });
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
}, undefined, (error) => {
    console.error('An error happened while loading the OBJ:', error);
});


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
camera.position.set(car.position.x, car.position.y + 3, car.position.z ); // Set camera position behind the car
camera.lookAt(car.position); // Make the camera look at the car
controls.target.copy(car.position); // Update controls target to follow the car

// Add the car to the scene
scene.add(car);

// Handle window resize with mouse wheel zoom
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 

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

// Add click event listener to place an image at the clicked position
window.addEventListener('click', function(event) {
        // Get the click position and resize the image
        var x = event.clientX;
        var y = event.clientY;
        
        // Create the image element
        var img = document.createElement('img');
        img.src = './model/image/location.png'; // Path to your image
        img.style.position = 'absolute'; // Position it absolutely
        img.style.left = (x - 10) + 'px'; // Center the image on the click
        img.style.top = (y - 10) + 'px'; // Center the image on the click
        img.style.width = '20px'; 
        img.style.height = '20px'; 
        img.style.zIndex = '1000'; // Ensure it's on top

        // Append the image to the body
        document.body.appendChild(img);

        // Remove all images and make a new one after the third click
        var images = document.querySelectorAll('img');
        if (images.length >= 3) {
            images.forEach(function(image) {
                image.remove();
            });
        }
    });


// Add a function to move camera pov with keys with west, north, east, south direction
function moveCamera(event) {
    switch (event.key) {
        case 'w':
            camera.position.z -= 0.1;
            break;
        case 's':
            camera.position.z += 0.1;
            break;
        case 'a':
            camera.position.x -= 0.1;
            break;
        case 'd':
            camera.position.x += 0.1;
            break;
    }
}

window.addEventListener('keydown', moveCamera);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}

animate();