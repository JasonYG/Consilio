// Initialize Global Constants
const backgroundColour = 0xa5f3ff;
const startingDistance = 10;

// Initialize Scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(backgroundColour);

// Initialize Camera
let camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000, 0, 0, startingDistance, startingDistance);

// Initialize Lighting
let light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Initialize Renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("webgl-container").appendChild(renderer.domElement);

// Initialize Global Variables
let materials = [];
// materials.push(newBox(3, 3, 3, 0xff00ff, 0, 0, 0));

let cubes = [];
for (let i = 0; i < 3; i++) {
  cubes.push(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xffffff})));
}

for (let cube of cubes) {
  scene.add(cube);
}

cubes[1].position.x += 1.5;
cubes[1].position.y += 1.5;
cubes[1].position.z += 1.5;

cubes[2].position.x += -1.5;
cubes[2].position.y += -1.5;
cubes[2].position.z += -1.5;

animate();

function animate() {
  requestAnimationFrame(animate);
  for (let cube of cubes) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  camera.update();
  renderer.render(scene, camera);
}

document.addEventListener('keydown', event => {
  const key = event.key;

  switch(key) {
    case 'Enter':
      console.log("Enter Pressed");
      newBox(Math.random() * 3, Math.random() * 3, Math.random() * 3, 0xff0000, Math.random() * 5, Math.random() * 5, Math.random() * 5);
      break;
    case 'Escape':
      console.log("Escape Pressed");
      for (let material of materials) {
        scene.remove(material);
      }
      materials = [];
      break;
  }
}, false);
