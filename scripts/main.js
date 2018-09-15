let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Create X Axis
const xAxisMaterial = new THREE.LineBasicMaterial({
  color: 0xff0000
});

const xAxisGeometry = new THREE.Geometry();
xAxisGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
xAxisGeometry.vertices.push(new THREE.Vector3(10, 0, 0));
const xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);
scene.add(xAxisLine);

// Create Y Axis
const yAxisMaterial = new THREE.LineBasicMaterial({
  color: 0x00ff00
});

const yAxisGeometry = new THREE.Geometry();
yAxisGeometry.vertices.push(new THREE.Vector3(0, -10, 0));
yAxisGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
const yAxisLine = new THREE.Line(yAxisGeometry, yAxisMaterial);
scene.add(yAxisLine);

// Create Z Axis
const zAxisMaterial = new THREE.LineBasicMaterial({
  color: 0x0000ff
});

const zAxisGeometry = new THREE.Geometry();
zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, -10));
zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, 10));
const zAxisLine = new THREE.Line(zAxisGeometry, zAxisMaterial);
scene.add(zAxisLine);

camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);

animate();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  camera.translation.x += 1;
  // camera.lookAt(0, 0, 0);
}
