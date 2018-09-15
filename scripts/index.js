// Initialize Scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xa5f3ff);

// Initialize Camera
const originalDistance = 10;
let camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000, 0, 0, originalDistance);
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
  // camera.update();
  // frame++;
  // let angle = (frame) * (0.5 * Math.PI / 60);
  // // console.log(angle);
  // camera.position.set(10 * Math.cos(angle), camera.position.y, 10 * Math.sin(angle));
  // // console.log(camera.position);
  // camera.lookAt(0, 0, 0);

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

let averageXVel = 0;
let xPosList = [];
let averageYVel = 0;
let yPosList = [];
let touchObj = null;
let iterationCount = 0;

window.addEventListener('touchstart', e => {
  touchObj = e.changedTouches[0];
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

  // console.log("(" + averageXVel + ", " + averageYVel + ")");
  console.log(averageXVel > 0.03 ? 0.03 : averageXVel < -0.03 ? -0.03 : averageXVel);
  console.log(averageYVel > 0.03 ? 0.03 : averageYVel < -0.03 ? -0.03 : averageYVel);
  camera.rotateX(averageXVel > 0.03 ? 0.03 : averageXVel < -0.03 ? -0.03 : averageXVel);
  camera.rotateY(averageYVel > 0.03 ? 0.03 : averageYVel < -0.03 ? -0.03 : averageYVel);
}, false);

window.addEventListener('touchend', e => {
  averageXVel = 0;
})



// let startX = 0; // starting x coordinate of touch point
// let startY = 0; // starting y coordinate of touch point
// let touchDistX = 0; // distance traveled by touch point in x
// let touchDistY = 0; // distance traveled by touch point in y
// let touchObj = null; // Touch object holder
//
// window.addEventListener('touchstart', e => {
//   touchObj = e.changedTouches[0]; // reference first touch point
//   startX = parseInt(touchObj.clientX); // get x coord of touch point
//   startY = parseInt(touchObj.clientX); // get x coord of touch point
//   e.preventDefault(); // prevent default click behavior
// }, false);
//
// window.addEventListener('touchmove', e => {
//   touchobj = e.changedTouches[0]; // reference first touch point for this event
//   touchDistX = parseInt(touchobj.clientX) - startX; // calculate dist traveled by touch point
//   touchDistY = parseInt(touchobj.clientX) - startY; // calculate dist traveled by touch point
//   if (touchDistX > 20) camera.rotateXTouch(0.1 * touchDistX);
//   if (touchDistY > 20) camera.rotateY(0.1 * touchDistY);
//
//   console.log("Dist X: " + touchDistX + ", Dist Y: " + touchDistY);
//   e.preventDefault();
// }, false);
//
// window.addEventListener('touchend', e => {
//   if (touchDistX > 50) camera.xAngle = touchDistX * (MATH.PI / 300);
// }, false);
