import * as THREE from 'three';

export class Helpers {
  constructor(experience) {
    this.experience = experience;

    this.createHelpers();
  }

  createHelpers() {
    // Axes helper
    this.axesHelper = new THREE.AxesHelper(5);
    this.experience.scene.add(this.axesHelper);
  }
}
