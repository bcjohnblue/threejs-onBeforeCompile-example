import { Model } from './objects';

export class World {
  constructor(experience) {
    this.experience = experience;

    this.leftModel = new Model(experience, 2.0);
    this.leftModel.waitForModelReady().then(() => {
      this.leftModel.mesh.position.x = -3.5;
      this.leftModel.mesh.position.y = -0.5;
    });

    this.rightModel = new Model(experience, -2.0);
    this.rightModel.waitForModelReady().then(() => {
      this.rightModel.mesh.position.x = 3.5;
      this.rightModel.mesh.position.y = -0.5;
    });
  }

  update(...arg) {
    if (this.leftModel) {
      this.leftModel.update(...arg);
    }
    if (this.rightModel) {
      this.rightModel.update(...arg);
    }
  }
}
