var xesto = require("xesto-wave-npm");
var Leap = require("leapjs");
const client = xesto('3182202afc174a47b6b6ff5b00893dbe')

client.connect().then(controller => {
  //This is a Leap.Controller objesct, and we can pass it gesture names to have
  //our app react to gestures!
  //console.log(controller);
  //controller.connection.opts.enableGestures = true;
  controller.setBackground(true);
  console.log(controller.frameEventName);

  controller.on('Down', function() {
    console.log('down!');
  });

  controller.on('streamingStarted', function(device){
    setInterval(function() {
      var frame = controller.frame();
      checkFrame(frame);
    }, 500);
  });
  var checkFrame = function(frame) {
    console.log(frame.hand.length);
  }
  controller.connect();
})
