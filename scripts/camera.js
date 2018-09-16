import * as THREE from '../libraries/three';
export default class Camera extends THREE.PerspectiveCamera {
  constructor(fov, size, min, max, x, y, z, hyp) {
    super(fov, size, min, max);
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    this.xAngle = Math.atan2(this.position.x, this.position.y);
    this.yAngle = Math.atan2(this.position.y, this.position.z);
    this.hypA = hyp;
  }

  getCoordinates() {
    console.log("Coord: (" + this.position.x + ", " + this.position.y + ", " + this.position.z + ")");
  }

  rotateX(_speed, speedLimit) {
    let speed = Math.abs(_speed) > speedLimit ? Math.sign(_speed) * speedLimit : _speed;
    this.xAngle += speed;
  }

  rotateY(_speed, speedLimit) {
    let speed = Math.abs(_speed) > speedLimit ? Math.sign(_speed) * speedLimit : _speed;
    this.yAngle += speed;
  }

  update() {
    let newY = this.hypA * Math.sin(this.yAngle);
    let hypB = this.hypA * Math.cos(this.yAngle);
    let newZ = hypB * Math.cos(this.xAngle);
    let newX = hypB * Math.sin(this.xAngle);
    this.position.set(newX, newY, newZ);
    this.lookAt(0, 0, 0);
  }
}
