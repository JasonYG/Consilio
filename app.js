import xesto from "xesto-wave-npm"
const client = xesto( YOUR-API-KEY-HERE )

client.connect().then( controller => {
  //This is a Leap.Controller object, and we can pass it gesture names to have
  //our app react to gestures!

  controller.on("Down", () => {
    console.log("Woo! Swipe left!");
  });

  controller.connect();
})
