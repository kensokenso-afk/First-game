// Area: Gemini CLI (grafis & animasi latar).
// Latar kapal bajak laut dengan perspektif oblique 3/4.
export default class Background {
  constructor(scene) {
    this.scene = scene;
    const w = scene.scale.width;
    const h = scene.scale.height;

    this.makeTextures(scene, w, h);

    // Layers from far to near
    this.layers = [
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-sky').setOrigin(0), speed: 0 },
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-sea-far').setOrigin(0), speed: 0.1 },
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-sea-near').setOrigin(0), speed: 0.25 },
      { sprite: scene.add.tileSprite(0, 0, w, h, 'bg-ship-hull').setOrigin(0), speed: 0.5 }
    ];
    this.layers.forEach((l) => l.sprite.setDepth(-10));
  }

  makeTextures(scene, w, h) {
    if (scene.textures.exists('bg-sky')) return;

    // 1. Langit
    let g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillGradientStyle(0x81d4fa, 0x81d4fa, 0xe1f5fe, 0xe1f5fe, 1);
    g.fillRect(0, 0, w, h);
    g.generateTexture('bg-sky', w, h);
    g.destroy();

    // 2. Laut Jauh
    g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x0277bd, 1);
    g.fillRect(0, h * 0.4, w, h * 0.6);
    // Tambah ombak kecil
    g.fillStyle(0x01579b, 0.5);
    for (let i = 0; i < 20; i++) {
      g.fillRect(Phaser.Math.Between(0, w), Phaser.Math.Between(h * 0.45, h * 0.6), 4, 1);
    }
    g.generateTexture('bg-sea-far', w, h);
    g.destroy();

    // 3. Laut Dekat
    g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x01579b, 0.8);
    g.fillRect(0, h * 0.55, w, h * 0.45);
    // Ombak lebih besar
    g.fillStyle(0xffffff, 0.3);
    for (let i = 0; i < 15; i++) {
      g.fillRect(Phaser.Math.Between(0, w), Phaser.Math.Between(h * 0.6, h * 0.7), 8, 2);
    }
    g.generateTexture('bg-sea-near', w, h);
    g.destroy();

    // 4. Lambung Kapal, Pagar & Tiang (Perspektif 3/4)
    g = scene.make.graphics({ x: 0, y: 0, add: false });
    
    // Warna kayu
    const woodDark = 0x3e2723;
    const woodMid = 0x5d4037;
    const woodLight = 0x795548;

    // Lantai/Dek (bagian bawah layar)
    g.fillStyle(woodMid, 1);
    g.fillRect(0, h - 40, w, 40);
    
    // Garis-garis papan dek
    g.fillStyle(woodDark, 0.5);
    for (let y = h - 40; y < h; y += 8) {
      g.fillRect(0, y, w, 1);
    }

    // Tiang Utama (Mast) - di tengah agak ke belakang
    const mastX = w * 0.5;
    g.fillStyle(woodDark, 1);
    g.fillRect(mastX - 10, 20, 20, h - 40); // Tiang utama
    g.fillStyle(woodMid, 1);
    g.fillRect(mastX - 2, 20, 4, h - 40); // Highlight tiang

    // Layar tergulung (Sails rolled up)
    g.fillStyle(0xf5f5f5, 1);
    g.fillRect(mastX - 40, 40, 80, 8);
    g.fillStyle(0xe0e0e0, 1);
    g.fillRect(mastX - 40, 48, 80, 2);

    // Pagar (Railing)
    g.fillStyle(woodDark, 1);
    const railY = h - 60;
    for (let x = 0; x < w; x += 32) {
      g.fillRect(x + 10, railY, 4, 20);
      g.fillStyle(woodMid, 1);
      g.fillRect(x + 14, railY, 1, 20);
      g.fillStyle(woodDark, 1);
    }
    
    g.fillStyle(woodLight, 1);
    g.fillRect(0, railY, w, 4);
    g.fillStyle(woodMid, 1);
    g.fillRect(0, railY + 4, w, 2);

    g.generateTexture('bg-ship-hull', w, h);
    g.destroy();

  }

  update(delta) {
    this.layers.forEach((l) => {
      if (l.speed > 0) {
        l.sprite.tilePositionX += l.speed * (delta / 16);
      }
    });
  }
}

