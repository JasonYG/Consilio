class Position {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getCoordinates() {
    console.log("Coord: (" + x + ", " + y + ", " + z + ")");
  }
}

class Palm {
  //constructor for Palm
  constructor() {
    this.position = new Position(0, 0, 0);
  }
  //update position
  updatePosition(vector) {
    this.position.x = vector[0];
    this.position.y = vector[1];
    this.position.z = vector[2];
  }
}
