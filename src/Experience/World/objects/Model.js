import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function buildTwistMaterial(amount) {
  const material = new THREE.MeshNormalMaterial();
  material.onBeforeCompile = function (shader) {
    shader.uniforms.time = { value: 0 };

    shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      [
        `float theta = sin( time + position.y ) / ${amount.toFixed(1)};`,
        'float c = cos( theta );',
        'float s = sin( theta );',
        'mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );',
        'vec3 transformed = vec3( position ) * m;',
        'vNormal = vNormal * m;'
      ].join('\n')
    );

    material.userData.shader = shader;
  };

  // Make sure WebGLRenderer doesn't reuse a single program

  material.customProgramCacheKey = function () {
    return amount.toFixed(1);
  };

  return material;
}

export class Model {
  constructor(experience, amount) {
    this.experience = experience;
    this.amount = amount;

    this.create();
  }

  create() {
    const loader = new GLTFLoader();
    loader.load('models/gltf/LeePerrySmith/LeePerrySmith.glb', (gltf) => {
      const geometry = gltf.scene.children[0].geometry;

      this.mesh = new THREE.Mesh(geometry, buildTwistMaterial(this.amount));
      console.log('this.mesh', this.mesh );
      
      this.experience.scene.add(this.mesh);
    });
  }

  waitForModelReady() {
    return new Promise((resolve) => {
      try {
        if (this.mesh) {
          resolve();
        } else {
          const interval = setInterval(() => {
            if (this.mesh) {
              resolve();
              clearInterval(interval);
            }
          }, 100);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  update() {
    const shader = this.mesh?.material.userData.shader;
    if (shader) {
      shader.uniforms.time.value = performance.now() / 1000;
    }
  }
}
