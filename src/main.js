import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  width: 320,
  height: 180,
  pixelArt: true,
  backgroundColor: '#0b0b14',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 600 }, debug: false }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [GameScene]
};

new Phaser.Game(config);
