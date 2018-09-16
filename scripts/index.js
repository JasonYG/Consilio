// Initialize Scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xa5f3ff);

// Initialize Camera
const originalDistance = 10;
let camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000, 0, 0, 5, 5);
camera.lookAt(0, 0, 0);

// Initialize Lighting
let light = new THREE.AmbientLight(0xffffff);
scene.add(light);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);
scene.add(cube2);
scene.add(cube3);

cube2.position.x += 1.5;
cube2.position.y += 1.5;
cube2.position.z += 1.5;

cube3.position.x += -1.5;
cube3.position.y += -1.5;
cube3.position.z += -1.5;

animate();

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;
  cube3.rotation.x += 0.01;
  cube3.rotation.y += 0.01;

  camera.update();
  renderer.render(scene, camera);
}

document.addEventListener('keydown', event => {
  const key = event.key;

  switch(key) {
    case "ArrowLeft":
      console.log("Left Pressed");
      camera.rotateX(1.5);
      camera.getCoordinates();
      break;
    case "ArrowUp":
      console.log("Up Pressed");
      camera.rotateY(-1.5);
      break;
    case "ArrowRight":
      console.log("Right Pressed");
      camera.rotateX(-1.5);
      break;
    case "ArrowDown":
      console.log("Down Pressed Pressed");
      camera.rotateY(1.5);
      break;
  }
}, false);

const speedLimiter = 0.03;
let startX = 0;
let averageXVel = 0;
let xPosList = [];
let startY = 0;
let averageYVel = 0;
let yPosList = [];
let touchObj = null;
let iterationCount = 0;

window.addEventListener('touchstart', e => {
  touchObj = e.changedTouches[0];
  startX = parseInt(touchObj.clientX);
  startY = parseInt(touchObj.clientY)
}, false);

window.addEventListener('touchmove', e => {
  touchObj = e.changedTouches[0];
  if (iterationCount < 10) {
    iterationCount++;
  } else {
    xPosList.shift();
    yPosList.shift();
  }

  xPosList.push(parseInt(touchObj.clientX));
  yPosList.push(parseInt(touchObj.clientY));

  let velXSum = 0;
  for (let i = 0; i < iterationCount; i++) {
    if (i > 0) {
      velXSum += (xPosList[i] - xPosList[i - 1]) / 300;
    }
  }
  let averageXVel = velXSum / 10;

  let velYSum = 0;
  for (let i = 0; i < iterationCount; i++) {
    if (i > 0) {
      velYSum += (yPosList[i] - yPosList[i - 1]) / 5;
    }
  }
  let averageYVel = velYSum / 10;

  let swipeAngleRad = Math.atan2(startY - parseInt(touchObj.clientY), startX - parseInt(touchObj.clientX));
  let swipeAngleDeg = swipeAngleRad * 180 / Math.PI;

  if (Math.abs(swipeAngleDeg) < 45 || Math.abs(swipeAngleDeg) > 135) camera.rotateX(averageXVel, speedLimiter);
  else if (Math.abs(swipeAngleDeg) >= 45 && Math.abs(swipeAngleDeg) <= 135) camera.rotateY(averageYVel, speedLimiter);
}, false);

window.addEventListener('touchend', e => {
  xPosList = [];
  yPosList = [];
  iterationCount = 0;
  averageXVel = 0;
})
