import xesto from "xesto-wave-npm";
const client = xesto('3182202afc174a47b6b6ff5b00893dbe');
import { Palm } from './materials.js';
import * as THREE from '../libraries/three';
import { scene, materials } from './index';
require("../libraries/three");
require("./materials");
require("./camera");
require("./cameraController");
require("./index");
require("./gridAxis");

let palm = new Palm(new THREE.BoxGeometry(1, 0.25, 0.25), new THREE.MeshBasicMaterial({color: 0x000000}));
scene.add(palm);

let closestObjectIndex = null;

client.connect().then( controller => {
  //This is a Leap.Controller object, and we can pass it gesture names to have
  //our app react to gestures!

  controller.on("Grabbing", () => {
    console.log("Attempting to Grab Object");

    let closestDistance = Infinity;
    for (let i = 0; i < materials.length; i++) {
      let deltaX = materials[i].position.x - palm.position.x;
      let deltaY = materials[i].position.y - palm.position.y;
      let deltaZ = materials[i].position.z - palm.position.z;

      let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2));
      if (distance < closestDistance) closestObjectIndex = i;
    }
    console.log(closestObjectIndex);
    console.log(materials[closestObjectIndex]);
    palm.add(materials[closestObjectIndex]);
    materials[closestObjectIndex].position.set(palm.position.x, palm.position.y, palm.position.z);
  });

  controller.on("Releasing", () => {
    console.log("Releasing Object");
    materials[closestObjectIndex].position.set(palm.position.x, palm.position.y, palm.position.z);
    scene.add(materials[closestObjectIndex])
    palm.children = [];
  });

  //Allows frames to update properly
  controller.on('connect', () => {
    setInterval(() => {
      let frame = controller.frame();
      if (frame.hands.length > 0) {
        updateHandPosition(frame);
      }
    }, 100/6);
  });

  let updateHandPosition = function(frame) {
    //vector with palmPosition
    let palmPosition = frame.hands[0].palmPosition;
    palm.updatePosition(palmPosition, 25);
    // console.log(palm.position);
  }

  controller.connect();
})
