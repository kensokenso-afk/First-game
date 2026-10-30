// Area: Gemini CLI (grafis & animasi latar). Ini versi awal sebagai placeholder.
// Latar pixel berlapis (parallax) yang bergerak terus. Semua digambar lewat kode,
// jadi belum butuh file gambar. Boleh diganti dengan aset pixel asli di assets/.
export default class Background {
  constructor(scene) {
    this.scene = scene;
    const w = scene.scale.width;
    const h = scene.scale.height;

    this.makeTextures(scene, w, h);

    // speed = kecepatan geser tiap lapisan (lapisan jauh lebih lambat)
    this.layers = [
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-stars').setOrigin(0), speed: 0.05 },
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-hills-far').setOrigin(0), speed: 0.15 },
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-hills-near').setOrigin(0), speed: 0.35 }
    ];
    this.layers.forEach((l) => l.sprite.setDepth(-10));
  }

  makeTextures(scene, w, h) {
    if (scene.textures.exists('bg-stars')) return;

    // Langit + bintang
    let g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x0b0b24, 1).fillRect(0, 0, w, h);
    for (let i = 0; i < 60; i++) {
      const x = Phaser.Math.Between(0, w - 1);
      const y = Phaser.Math.Between(0, h - 40);
      g.fillStyle(0xffffff, Phaser.Math.FloatBetween(0.3, 1)).fillRect(x, y, 1, 1);
    }
    g.generateTexture('bg-stars', w, h);
    g.destroy();

    // Bukit jauh dan dekat (gelombang sinus agar bisa disambung mulus)
    this.makeHills(scene, 'bg-hills-far', w, h, 0x1b2a49, h - 70, 14, 2);
    this.makeHills(scene, 'bg-hills-near', w, h, 0x14213d, h - 45, 10, 3);
  }

  makeHills(scene, key, w, h, color, baseY, amp, waves) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(color, 1);
    for (let x = 0; x < w; x++) {
      const y = baseY + Math.round(amp * Math.sin((2 * Math.PI * waves * x) / w));
      g.fillRect(x, y, 1, h - y);
    }
    g.generateTexture(key, w, h);
    g.destroy();
  }

  update(delta) {
    this.layers.forEach((l) => {
      l.sprite.tilePositionX += l.speed * (delta / 16);
    });
  }
}
