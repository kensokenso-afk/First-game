import { TINGKAT_KESULITAN } from '../config/difficulty.js';
import { bacaSkorTertinggi } from '../systems/highScore.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const tengah = this.scale.width / 2;
    this.add.text(tengah, 32, 'BAJAK LAUT', {
      fontFamily: 'monospace', fontSize: '18px', color: '#ffe08a'
    }).setOrigin(0.5);
    this.add.text(tengah, 52, 'JEJAK HARTA KARUN', {
      fontFamily: 'monospace', fontSize: '9px', color: '#ffffff'
    }).setOrigin(0.5);
    this.add.text(tengah, 72, `SKOR TERTINGGI ${bacaSkorTertinggi()}`, {
      fontFamily: 'monospace', fontSize: '8px', color: '#ffffff'
    }).setOrigin(0.5);
    this.add.text(tengah, 94, 'PILIH KESULITAN', {
      fontFamily: 'monospace', fontSize: '8px', color: '#ffe08a'
    }).setOrigin(0.5);

    const pilihan = Object.entries(TINGKAT_KESULITAN);
    const jarak = 72;
    const mulaiX = tengah - ((pilihan.length - 1) * jarak) / 2;
    pilihan.forEach(([kunci, opsi], indeks) => {
      const tombol = this.add.text(mulaiX + indeks * jarak, 112, opsi.label, {
        fontFamily: 'monospace', fontSize: '8px', color: '#ffffff',
        backgroundColor: '#23506a', padding: { x: 5, y: 4 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      tombol.on('pointerdown', () => this.scene.start('GameScene', { level: 0, difficulty: kunci }));
    });
    this.add.text(tengah, 145, 'KIRI / KANAN: BERGERAK   TENGAH: LOMPAT', {
      fontFamily: 'monospace', fontSize: '6px', color: '#ffffff'
    }).setOrigin(0.5);
  }
}
