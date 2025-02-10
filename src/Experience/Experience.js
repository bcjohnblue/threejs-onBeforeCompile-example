import * as THREE from 'three';
import { Camera, Renderer, Sizes, Time, Helpers, Debug } from './init';
import { World } from './World';

export class Experience {
  constructor(_canvas) {
    // Options
    this.canvas = _canvas;

    // Setup
    this.scene = new THREE.Scene();

    // this.helpers = new Helpers(this);
    // this.debug = new Debug(this);

    this.sizes = new Sizes();
    this.time = new Time();
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.world = new World(this);

    // Resize event
    this.sizes.on('resize', () => {
      this.resize();
    });

    // Time tick event
    this.time.on('tick', (...args) => {
      this.update(...args);
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update(...args) {
    this.camera.update(...args);
    this.world.update(...args);
    this.renderer.update(...args);
  }
}
