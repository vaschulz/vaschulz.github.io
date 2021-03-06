import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Objects
// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Cube-me

const valentinTexture = new THREE.TextureLoader().load('Passfoto_Valentin_2019.jpeg');
const valentin = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: valentinTexture})
);
valentin.position.z = -5;
valentin.position.x = 2;
scene.add(valentin);

// Sun

const sunTexture = new THREE.TextureLoader().load('8k_sun.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(30, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture
  })
);
sun.position.z = -30;
sun.position.x = -150;
scene.add(sun);

// Moon

const moonTexture = new THREE.TextureLoader().load('8k_moon.jpg');
const normalTexture = new THREE.TextureLoader().load('moon_normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
moon.position.z = 30;
moon.position.x = -10;
scene.add(moon);

// Earth

const earthTexture = new THREE.TextureLoader().load('8k_earth_daymap.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture
  })
);
earth.position.z = 40;
earth.position.x = -10;
scene.add(earth);

// Lighting

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// OrbitControls

const control = new OrbitControls(camera, renderer.domElement);

// Background

const spaceTexture = new THREE.TextureLoader().load('space2.png');
scene.background = spaceTexture;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff} )
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  earth.rotation.y += 0.05;

  valentin.rotation.y += 0.01;
  valentin.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  renderer.render(scene, camera);
}

animate();