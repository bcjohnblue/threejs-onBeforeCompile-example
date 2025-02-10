import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Camera {
  constructor(experience) {
    this.experience = experience;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      27,
      this.experience.sizes.width / this.experience.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 0, 20);
    this.experience.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.experience.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect =
      this.experience.sizes.width / this.experience.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
