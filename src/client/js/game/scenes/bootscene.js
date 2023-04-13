import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Load a sample image
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.scene.start('MainScene');
  }
}
