import xesto from "xesto-wave-npm"
const client = xesto('3182202afc174a47b6b6ff5b00893dbe')

let palm = new Palm();

client.connect().then( controller => {
  //This is a Leap.Controller object, and we can pass it gesture names to have
  //our app react to gestures!

  controller.on("Down", () => {
    console.log("Woo! Swipe left!");
    //TODO: Add parenting algorithm
    //palm.add()
  });

  //Allows frames to update properly
  controller.on('connect', function(){
    setInterval(function(){
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
    console.log(palm);
  }

  controller.connect();
})
