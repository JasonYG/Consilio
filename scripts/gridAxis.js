import * as THREE from '../libraries/three';
import {scene} from './index';
// Create X Axis
const xAxisMaterial = new THREE.LineBasicMaterial({
  color: 0xff0000
});
const xAxisGeometry = new THREE.Geometry();
xAxisGeometry.vertices.push(new THREE.Vector3(-100, 0, 0));
xAxisGeometry.vertices.push(new THREE.Vector3(100, 0, 0));
const xAxisLine = new THREE.Line(xAxisGeometry, xAxisMaterial);
scene.add(xAxisLine);

// Create Y Axis
const yAxisMaterial = new THREE.LineBasicMaterial({
  color: 0x00ff00
});

const yAxisGeometry = new THREE.Geometry();
yAxisGeometry.vertices.push(new THREE.Vector3(0, -100, 0));
yAxisGeometry.vertices.push(new THREE.Vector3(0, 100, 0));
const yAxisLine = new THREE.Line(yAxisGeometry, yAxisMaterial);
scene.add(yAxisLine);

// Create Z Axis
const zAxisMaterial = new THREE.LineBasicMaterial({
  color: 0x0000ff
});

const zAxisGeometry = new THREE.Geometry();
zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, -100));
zAxisGeometry.vertices.push(new THREE.Vector3(0, 0, 100));
const zAxisLine = new THREE.Line(zAxisGeometry, zAxisMaterial);
scene.add(zAxisLine);
