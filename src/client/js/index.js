import Phaser from 'phaser';
import BootScene from './game/scenes/BootScene';
import MainScene from './game/scenes/MainScene';
import { getWeb3 } from './lib/metamask';

(async () => {

  const connectButton = document.getElementById('my-connect-button');
  connectButton.onclick = async () => {
    console.log('Button clicked');
    const web3 = await getWeb3();
    if (!web3) return;

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [BootScene, MainScene],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
  };

    const game = new Phaser.Game(config);
    connectButton.style.display = 'none';
  };
})();