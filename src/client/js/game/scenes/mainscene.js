import Phaser from 'phaser';
import ThreeMap from '../threeMap';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    this.threeMap = new ThreeMap();

    // Display the image
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'logo');
  }

  draw3D() {
    // Use Phaser's WebGL renderer to render the Three.js scene
    const renderer = this.game.renderer;
    const camera = this.threeMap.camera;
    this.threeMap.render(renderer, camera);
  }

  update(time, delta) {
    this.draw3D();

    // Update game objects and check for user input here
  }
}