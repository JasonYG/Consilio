import xesto from "xesto-wave-npm";
const client = xesto('3182202afc174a47b6b6ff5b00893dbe');
import Palm from './palm';
require("../libraries/three");
require("./materials");
require("./camera");
require("./cameraController");
require("./index");
require("./gridAxis");

let palm = new Palm();

client.connect().then( controller => {
  //This is a Leap.Controller object, and we can pass it gesture names to have
  //our app react to gestures!

  controller.on("Grabbing", () => {
    console.log("Attempting to Grab Object");

    let closestDistance = INFINITY;
    let closestObjectIndex = null;
    for (let i = 0; i < materials.length; i++) {
      let deltaX = materials[i].position.x - palm.position.x;
      let deltaY = materials[i].position.y - palm.position.y;
      let deltaZ = materials[i].position.z - palm.position.z;

      let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2));
      if (distance < closestDistance) closestObjectIndex = i;
    }

    if (materials[closestObjectIndex] < 100) palm.add(materials[closestObjectIndex]);
  });

  controller.on("Releasing", () => {
    console.log("Releasing Object");
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
    palm.updatePosition(palmPosition);
    console.log(palm.position);
  }

  controller.connect();
})
