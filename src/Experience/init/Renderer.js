import * as THREE from 'three';

export class Renderer {
  constructor(experience) {
    this.experience = experience;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.experience.canvas,
      antialias: true,
      alpha: true
    });
    this.instance.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height
    );
    this.instance.setPixelRatio(this.experience.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height
    );
    this.instance.setPixelRatio(this.experience.sizes.pixelRatio);
  }

  update() {
    this.instance.render(
      this.experience.scene,
      this.experience.camera.instance
    );
  }
}
