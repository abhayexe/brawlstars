import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 4, 5);

// Set the background color of the scene to a specific color
scene.background = new THREE.Color(0x000); // Light blue color


//adds a picture as background
// const textureLoader = new THREE.TextureLoader();
// const backgroundTexture = textureLoader.load('texture.jpg');
// scene.background = backgroundTexture;


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 70;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();


//plane
const groundGeometry = new THREE.PlaneGeometry(100, 100, 2, 1);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x92e668,
  side: THREE.DoubleSide,
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
groundMesh.position.y = 0.7;
scene.add(groundMesh);

const boxGeometry = new THREE.BoxGeometry(1, .2, 1.1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xa05670});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

// Move the boxMesh 
boxMesh.position.y = .964;
boxMesh.position.x = .9;
boxMesh.position.z = 1.5;
scene.add(boxMesh);

const circleRadius = 2; // Set the radius of the circle
const circleSegments = 32; // Set the number of segments (more segments = smoother circle)
const circleGeometry = new THREE.CircleGeometry(circleRadius, circleSegments);

// Option 1: Apply a solid color material to the circle
const circleMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green color

// Option 2: Apply a texture to the circle (uncomment this section if you want to use a texture)
// const textureLoader = new THREE.TextureLoader();
// const circleTexture = textureLoader.load('public/textures/yourImage.jpg'); // Replace with your image path
// const circleMaterial = new THREE.MeshStandardMaterial({ map: circleTexture });

// Create the circle mesh using the geometry and material
const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);

// Set the position of the circle and add it to the scene
circleMesh.position.set(0, 1, 0); // Adjust the position as needed
circleMesh.rotation.x = -Math.PI / 2; // Rotate to make it horizontal (like a disc on the ground)
//scene.add(circleMesh);

const sphereGeometry = new THREE.SphereGeometry(0.21, 32, 32); // radius, widthSegments, heightSegments
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x63a842 }); // Blue color
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(1, 2, 0); // Position in the scene
//scene.add(sphereMesh);

const coneGeometry = new THREE.ConeGeometry(0.1, 0.2, 32); // radius, height, radialSegments
const coneMaterial = new THREE.MeshStandardMaterial({ color: 0x63a842 }); // Yellow color
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh.position.set(0.95, 1.4, 1.5); // Position in the scene
scene.add(coneMesh);

const coneMesh1 = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh1.position.set(0.95, 1.5, 1.5); // Position in the scene
scene.add(coneMesh1);

const coneMesh2 = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh2.position.set(0.95, 1.3, 1.5); // Position in the scene
scene.add(coneMesh2);

const cylinderGeometry = new THREE.CylinderGeometry(0.01, 0.03, 0.5, 32); // radiusTop, radiusBottom, height, radialSegments
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x964B00}); // brown color
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(0.95, 1.3, 1.5); // Position in the scene
scene.add(cylinderMesh);



// const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
// spotLight.position.set(0, 25, 0);
// spotLight.castShadow = true;
// spotLight.shadow.bias = -0.0011;
// scene.add(spotLight);

// Main Spotlight
const spotLight1 = new THREE.SpotLight(0xffffff, 10000, 100, Math.PI / 2, 1);
spotLight1.position.set(20, 40, 20);
spotLight1.castShadow = true;
spotLight1.shadow.bias = -0.0011;
scene.add(spotLight1);

// Additional Spotlight 1
const spotLight2 = new THREE.SpotLight(0xffffff, 4500, 100, Math.PI / 6, 1);
spotLight2.position.set(10, 35, -10);
spotLight2.castShadow = true;
spotLight2.shadow.bias = -0.0011;
scene.add(spotLight2);

// Additional Spotlight 2
const spotLight3 = new THREE.SpotLight(0xff0000, 2500, 100, Math.PI / 6, 1);
spotLight3.position.set(30, 15, 30);
spotLight3.castShadow = true;
spotLight3.shadow.bias = -0.0001;
scene.add(spotLight3);


const loader = new GLTFLoader().setPath('public/millennium_falcon/');
loader.load(
  'scene.gltf',
  (gltf) => {
    console.log('loading model');
    const mesh = gltf.scene;

    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    mesh.scale.set(0.7, 1.5, 0.5); // Increase the size of the model
    mesh.scale.set(0.1, 0.1, 0.1);
    mesh.position.set(0, 1.05, -1);
    scene.add(mesh);

    document.getElementById('progress-container').style.display = 'none';
  },
  (xhr) => {
    console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
  },
  (error) => {
    console.error(error);
  }
);

// Post-processing setup for distance blur
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bokehPass = new BokehPass(scene, camera, {
  focus: 10.0, // Adjust the focus distance
  aperture: 0.00025, // Adjust the aperture (higher values create a stronger blur effect)
  maxblur: 0.1, // Maximum blur amount
  width: window.innerWidth,
  height: window.innerHeight,
});
//add blurr
//composer.addPass(bokehPass);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  composer.render();
}

animate();
