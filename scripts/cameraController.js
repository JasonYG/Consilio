import Camera from './camera.js';

const speedLimiter = 0.04;
const cameraLocked = false;

let startX = 0;
let startY = 0;

let xPosList = [];
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
      velYSum += (yPosList[i] - yPosList[i - 1]);
    }
  }
  let averageYVel = velYSum / 10;

  let swipeAngleRad = Math.atan2(startY - parseInt(touchObj.clientY), startX - parseInt(touchObj.clientX));
  let swipeAngleDeg = swipeAngleRad * 180 / Math.PI;

  if (cameraLocked) {
    if (Math.abs(swipeAngleDeg) < 45 || Math.abs(swipeAngleDeg) > 135) camera.rotateX(averageXVel, speedLimiter);
    else if (Math.abs(swipeAngleDeg) >= 45 && Math.abs(swipeAngleDeg) <= 135) camera.rotateY(averageYVel, speedLimiter);
  } else {
    camera.rotateX(averageXVel, speedLimiter);
    camera.rotateY(averageYVel, speedLimiter);
  }
}, false);

window.addEventListener('touchend', e => {
  xPosList = [];
  yPosList = [];
  iterationCount = 0;
  averageXVel = 0;
})
