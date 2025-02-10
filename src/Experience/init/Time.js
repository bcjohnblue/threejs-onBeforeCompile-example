import EventEmitter from 'eventemitter3';

export class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.start = Date.now();
    this.currentTime = this.start;
    this.elapsedTime = 0;
    this.deltaTime = 16;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.deltaTime = currentTime - this.currentTime;
    this.currentTime = currentTime;
    this.elapsedTime = this.currentTime - this.start;

    this.emit('tick', {
      currentTime: this.currentTime,
      elapsedTime: this.elapsedTime,
      deltaTime: this.deltaTime
    });

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
