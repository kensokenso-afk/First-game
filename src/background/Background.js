// Area: Gemini CLI (grafis & animasi latar).
// Latar kapal bajak laut dengan perspektif oblique 3/4.
export default class Background {
  constructor(scene) {
    this.scene = scene;
    const w = scene.scale.width;
    const h = scene.scale.height;

    this.makeTextures(scene, w, h);

    // Layers from far to near
    // speed: animasi otomatis (ombak/langit)
    // parallax: respon terhadap gerakan kamera
    this.layers = [
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-sky').setOrigin(0), speed: 0.02, parallax: 0 },
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-sea-far').setOrigin(0), speed: 0.05, parallax: 0.1 },
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-sea-near').setOrigin(0), speed: 0.1, parallax: 0.3 },
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-ship-hull').setOrigin(0), speed: 0, parallax: 1.0 }
    ];
    this.layers.forEach((l) => {
      l.sprite.setDepth(-10);
      l.sprite.setScrollFactor(0); // Digerakkan manual di update untuk kontrol penuh parallax
    });
  }

  makeTextures(scene, w, h) {
    if (scene.textures.exists('bg-sky')) return;

    const buat = (kunci, lebar, tinggi, gambar) => {
      const g = scene.make.graphics({ x: 0, y: 0, add: false });
      gambar(g);
      g.generateTexture(kunci, lebar, tinggi);
      g.destroy();
    };

    // 1. Langit (320x180) - Gradasi biru dengan awan pixel
    buat('bg-sky', w, h, (g) => {
      g.fillStyle(0x81d4fa, 1).fillRect(0, 0, w, h);
      g.fillStyle(0xb3e5fc, 1).fillRect(0, 40, w, 60);
      g.fillStyle(0xe1f5fe, 1).fillRect(0, 100, w, 80);
      
      // Awan pixel sederhana
      g.fillStyle(0xffffff, 0.4);
      for (let i = 0; i < 5; i++) {
        const ax = Phaser.Math.Between(0, w);
        const ay = Phaser.Math.Between(10, 50);
        g.fillRect(ax, ay, 20, 4).fillRect(ax + 4, ay - 4, 12, 4).fillRect(ax + 6, ay + 4, 8, 4);
      }
    });

    // 2. Laut Jauh (320x100)
    buat('bg-sea-far', w, 100, (g) => {
      g.fillStyle(0x0277bd, 1).fillRect(0, 0, w, 100);
      // Detail ombak pixel
      g.fillStyle(0x01579b, 0.5);
      for (let i = 0; i < 40; i++) {
        g.fillRect(Phaser.Math.Between(0, w), Phaser.Math.Between(10, 90), 4, 1);
      }
    });

    // 3. Laut Dekat (320x100)
    buat('bg-sea-near', w, 100, (g) => {
      g.fillStyle(0x01579b, 0.8).fillRect(0, 0, w, 100);
      // Buih ombak pixel
      g.fillStyle(0xffffff, 0.3);
      for (let i = 0; i < 20; i++) {
        const ox = Phaser.Math.Between(0, w);
        const oy = Phaser.Math.Between(20, 80);
        g.fillRect(ox, oy, 8, 1).fillRect(ox + 2, oy + 1, 4, 1);
      }
    });

    // 4. Lambung Kapal & Pagar (320x80)
    buat('bg-ship-hull', w, 80, (g) => {
      const woodDark = 0x3e2723;
      const woodMid = 0x5d4037;
      const woodLight = 0x795548;

      // Dek/Lantai
      g.fillStyle(woodMid, 1).fillRect(0, 40, w, 40);
      g.fillStyle(woodDark, 0.5);
      for (let y = 40; y < 80; y += 8) g.fillRect(0, y, w, 1);

      // Tiang (Mast)
      const mastX = w * 0.5;
      g.fillStyle(woodDark, 1).fillRect(mastX - 8, 0, 16, 40);
      g.fillStyle(woodMid, 1).fillRect(mastX - 2, 0, 4, 40);

      // Pagar
      g.fillStyle(woodDark, 1);
      for (let x = 0; x < w; x += 32) g.fillRect(x + 10, 20, 4, 20);
      g.fillStyle(woodLight, 1).fillRect(0, 20, w, 4);
    });
  }

  update(delta) {
    const camX = this.scene.cameras.main.scrollX;
    
    this.layers.forEach((l, i) => {
      // Kombinasi animasi otomatis dan parallax kamera
      // Sky (0) tidak gerak parallax, cuma scroll pelan
      // Hull (3) gerak 1:1 dengan kamera (tapi karena setScrollFactor(0), kita harus geser tilePositionX)
      
      let scrollX = camX * l.parallax;
      let autoScroll = (this.scene.time.now * l.speed) % 320;
      
      l.sprite.tilePositionX = scrollX + autoScroll;
      
      // Khusus hull, posisinya harus di bawah
      if (i === 3) {
        l.sprite.y = this.scene.scale.height - 80;
      } else if (i === 1) {
        l.sprite.y = this.scene.scale.height * 0.4;
      } else if (i === 2) {
        l.sprite.y = this.scene.scale.height * 0.55;
      }
    });
  }
}

