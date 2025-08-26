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

// Create popup element
const popup = document.createElement('div');
popup.style.position = 'absolute';
popup.style.background = '#333';
popup.style.color = '#fff';
popup.style.padding = '10px';
popup.style.borderRadius = '5px';
popup.style.display = 'none';
popup.innerText = 'Welcome to the USTH sidewalk! Here you can find various information and resources related to the university.';
document.body.appendChild(popup);

// Raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let sidewalkMesh = null; // Store reference to mesh

// Load sidewalk only once
const objLoader = new OBJLoader();
objLoader.load('./model/image/Sidewalk.obj', (object) => {
    object.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: new THREE.TextureLoader().load('./model/image/street_sidewalk_texture.jpg'),
                side: THREE.DoubleSide
            });
            sidewalkMesh = child; // Save mesh for click detection
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

// Handle mouse click (only triggers popup)
window.addEventListener('click', (event) => {
    if (!sidewalkMesh) return; // Prevent action before mesh is loaded

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(sidewalkMesh, true);

    if (intersects.length > 0) {
        popup.style.left = `${event.clientX}px`;
        popup.style.top = `${event.clientY}px`;
        popup.style.display = 'block';

        setTimeout(() => {
            popup.style.display = 'none';
        }, 2000);
    }
});


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
        popup.style.display = 'none';
        popup_BuildingA.style.left = `${event.clientX}px`;
        popup_BuildingA.style.top = `${event.clientY}px`;
        popup_BuildingA.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA.style.display = 'none';
        }, 2000);
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
const msgEN_BuildingA1 = 'Here is Building A1! This place is in front of Gate 18 Hoang Quoc Viet Street.';
const msgVN_BuildingA1 = 'Đây là tòa nhà A1! Nơi này nằm ở trước cổng 18 Hoàng Quốc Việt.';

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
        popup.style.display = 'none';
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.left = `${event.clientX}px`;
        popup_BuildingA1.style.top = `${event.clientY}px`;
        popup_BuildingA1.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA1.style.display = 'none';
        }, 2000);
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
        popup.style.display = 'none';
        popup_BuildingA.style.display = 'none';
        popup_BuildingA1.style.display = 'none';
        popup_BuildingA2.style.left = `${event.clientX}px`;
        popup_BuildingA2.style.top = `${event.clientY}px`;
        popup_BuildingA2.style.display = 'block';

        setTimeout(() => {
            popup_BuildingA2.style.display = 'none';
        }, 2000);
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