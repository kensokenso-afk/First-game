import Background from '../background/Background.js';

// Area: Claude (logika game). Latar belakang ada di src/background/ (area Gemini).
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.bg = new Background(this);

    // Tanah = dek kayu kapal. Sisi atas di y = h - 40, sama dengan dek di Background.js
    const DEK_TINGGI = 40;
    const ground = this.add.rectangle(w / 2, h - DEK_TINGGI / 2, w, DEK_TINGGI, 0x5d4037);
    this.physics.add.existing(ground, true);

    // Tekstur pemain sementara (pixel 12x16), ganti dengan sprite asli nanti
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xffd166, 1).fillRect(0, 0, 12, 16);
    g.fillStyle(0x000000, 1).fillRect(3, 4, 2, 2).fillRect(7, 4, 2, 2);
    g.generateTexture('player', 12, 16);
    g.destroy();

    // Muncul sedikit di atas dek, lalu jatuh dan menapak
    this.player = this.physics.add.sprite(40, h - DEK_TINGGI - 20, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, ground);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.add.text(4, 4, 'First Game', { fontFamily: 'monospace', fontSize: '8px', color: '#ffffff' })
      .setDepth(10);
    this.add.text(4, 14, 'Sentuh: kiri / tengah (lompat) / kanan', {
      fontFamily: 'monospace', fontSize: '6px', color: '#aaaaaa'
    }).setDepth(10);
  }

  update(time, delta) {
    this.bg.update(delta);

    const speed = 90;
    const p = this.player;
    let left = this.cursors.left.isDown;
    let right = this.cursors.right.isDown;
    let jump = this.cursors.up.isDown || this.spaceKey.isDown;

    // Kontrol sentuh untuk HP: layar dibagi 3 bagian
    const ptr = this.input.activePointer;
    if (ptr.isDown) {
      const third = this.scale.width / 3;
      if (ptr.x < third) left = true;
      else if (ptr.x > third * 2) right = true;
      else jump = true;
    }

    if (left) p.setVelocityX(-speed);
    else if (right) p.setVelocityX(speed);
    else p.setVelocityX(0);

    if (jump && p.body.blocked.down) p.setVelocityY(-260);
  }
}
