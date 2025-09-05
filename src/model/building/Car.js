import * as THREE from 'three';

// Car.js - exports a function to create a car group

export function createCar() {
  // Car parameters
  const carWidth = 120;
  const carHeight = 40;
  const wheelRadius = 15;

  // Car group
  const car = new THREE.Group();

  // Car body
  const bodyGeometry = new THREE.BoxGeometry(carWidth, carHeight, 40);
  const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x2196f3 });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(0, carHeight / 2, 0);
  car.add(body);

  // Car roof
  const roofGeometry = new THREE.BoxGeometry(carWidth - 40, 20, 40);
  const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x1976d2 });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.set(0, carHeight + 10, 0);
  car.add(roof);

  // Wheels
  const wheelGeometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, 12, 32);
  const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x212121 });

  // Front left wheel
  const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheelFL.rotation.z = Math.PI / 2;
  wheelFL.position.set(-carWidth / 2 + 25, wheelRadius, 18);

  // Front right wheel
  const wheelFR = wheelFL.clone();
  wheelFR.position.set(carWidth / 2 - 25, wheelRadius, 18);

  // Rear left wheel
  const wheelRL = wheelFL.clone();
  wheelRL.position.set(-carWidth / 2 + 25, wheelRadius, -18);

  // Rear right wheel
  const wheelRR = wheelFL.clone();
  wheelRR.position.set(carWidth / 2 - 25, wheelRadius, -18);

  // Add all 4 wheels to the car
  car.add(wheelFL, wheelFR, wheelRL, wheelRR);

  return car;
}
