import MenuScene from './ui/MenuScene.js';
import GameScene from './scenes/GameScene.js';

// Scene pertama dalam daftar dijalankan lebih dulu: MenuScene (dari Codex), lalu GameScene.
// HudScene dibuat Codex di src/ui/. Dimuat otomatis jika berkasnya sudah ada.
const scenes = [MenuScene, GameScene];
try {
  const modul = await import('./ui/HudScene.js');
  scenes.push(modul.default);
} catch (err) {
  console.warn('HudScene belum tersedia, memakai HUD sementara.', err);
}

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
  scene: scenes
};

new Phaser.Game(config);
