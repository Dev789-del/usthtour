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

  const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheel1.rotation.z = Math.PI / 2;
  wheel1.position.set(-carWidth / 2 + 25, wheelRadius, 18);

  const wheel2 = wheel1.clone();
  wheel2.position.set(carWidth / 2 - 25, wheelRadius, 18);

  car.add(wheel1, wheel2);

  return car;
}
