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

function newBox(l, w, h, colour, x, y, z) {
  let box = new THREE.Mesh(new THREE.BoxGeometry(l, w, h), new THREE.MeshNormalMaterial({color: colour}));
  box.position.set(x, y, z);
  scene.add(box);
  materials.push(box);
}

function newSphere(r, colour, x, y, z) {
  let sphere = new THREE.Mesh(new THREE.SphereGeometry(r, 36, 36), new THREE.MeshNormalMaterial({color: colour}));
  sphere.position.set(x, y, z);
  scene.add(sphere);
  materials.push(sphere);
}

function newCone(r, h, colour, x, y, z) {
  let cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 20, 1), new THREE.MeshNormalMaterial({color: colour}));
  cone.position.set(x, y, z);
  scene.add(cone);
  materials.push(cone);
}

class Palm extends THREE.Mesh{
  constructor(geometry, material) {
    super(geometry, material);
  }

  updatePosition(vector) {
    this.position.x = vector[0];
    this.position.y = vector[1];
    this.position.z = vector[2];
  }
}
