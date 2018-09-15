class vector3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getCoordinates() {
    console.log("Coord: (" + x + ", " + y + ", " + z + ")");
  }
}

class Camera extends THREE.PerspectiveCamera {
  constructor(fov, size, min, max, x, y, z) {
    super(fov, size, min, max);
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    this.xAngle = Math.atan2(this.position.z, this.position.x);
    this.yAngle = Math.atan2(this.position.z, this.position.y);
    this.yAngle = 0;
    this.hyp = 0;
    this.originalDistance = z;
  }

  getCoordinates() {
    console.log("Coord: (" + this.position.x + ", " + this.position.y + ", " + this.position.z + ")");
  }

  rotateX(speed) {
    // this.xAngle += speed * (Math.PI / 360);
    this.xAngle += 0.01;
    let newX = this.originalDistance * Math.cos(this.xAngle);
    let newZ = this.originalDistance * Math.sin(this.xAngle);
    camera.position.set(newX, this.position.y, newZ);
    this.yAngle = Math.atan2(this.position.z, this.position.y);
  }

  rotateY(speed) {
    // this.yAngle += speed * (Math.PI / 360);
    this.yAngle += 0.01;
    let newY = this.originalDistance * Math.sin(this.yAngle);
    let newZ = this.originalDistance * Math.cos(this.yAngle);
    camera.position.set(this.position.x, newY, newZ);
    this.xAngle = Math.atan2(this.position.z, this.position.x);
  }

  // rotateXTouch(dist) {
  //   let newAngle = this.xAngle + dist * (Math.PI / 300);
  //   console.log(newAngle);
  //   // this.xAngle += speed * (Math.PI / 360);
  //   let newX = this.originalDistance * Math.cos(newAngle);
  //   let newZ = this.originalDistance * Math.sin(newAngle);
  //   camera.position.set(newX, this.position.y, newZ);
  //   this.yAngle = Math.atan2(this.position.z, this.position.y);
  // }

  calcHyp() {
    return Math.sqrt(Math.pow(this.position.x, 2) + Math.pow(this.position.y, 2) + Math.pow(this.position.z, 2));
  }

  update() {
    this.hyp = this.calcHyp();
    this.lookAt(0, 0, 0);
    // this.rotateX();
    this.rotateY();
    // this.getCoordinates();
  }
}
