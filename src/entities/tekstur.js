// Tekstur sementara (placeholder) dibuat lewat kode.
// Jika sprite asli dari Gemini sudah dimuat dengan kunci yang sama, tekstur ini dilewati.
export function buatTekstur(scene) {
  const buat = (kunci, lebar, tinggi, gambar) => {
    if (scene.textures.exists(kunci)) return;
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    gambar(g);
    g.generateTexture(kunci, lebar, tinggi);
    g.destroy();
  };

  buat('player', 12, 16, (g) => {
    g.fillStyle(0xffd166, 1).fillRect(0, 0, 12, 16);
    g.fillStyle(0x000000, 1).fillRect(3, 4, 2, 2).fillRect(7, 4, 2, 2);
  });

  buat('peti', 16, 16, (g) => {
    g.fillStyle(0x8d6e63, 1).fillRect(0, 0, 16, 16);
    g.fillStyle(0x3e2723, 1)
      .fillRect(0, 0, 16, 2).fillRect(0, 14, 16, 2)
      .fillRect(0, 0, 2, 16).fillRect(14, 0, 2, 16)
      .fillRect(2, 7, 12, 2);
  });

  buat('papan', 32, 6, (g) => {
    g.fillStyle(0x795548, 1).fillRect(0, 0, 32, 6);
    g.fillStyle(0x3e2723, 1).fillRect(0, 5, 32, 1).fillRect(10, 0, 1, 6).fillRect(21, 0, 1, 6);
  });

  buat('koin', 8, 8, (g) => {
    g.fillStyle(0xffb300, 1).fillCircle(4, 4, 4);
    g.fillStyle(0xfff176, 1).fillCircle(3, 3, 2);
  });

  buat('kepiting', 14, 10, (g) => {
    g.fillStyle(0xe53935, 1).fillRect(1, 3, 12, 6);
    g.fillStyle(0xb71c1c, 1).fillRect(0, 8, 2, 2).fillRect(12, 8, 2, 2).fillRect(5, 9, 4, 1);
    g.fillStyle(0xffffff, 1).fillRect(3, 1, 2, 2).fillRect(9, 1, 2, 2);
    g.fillStyle(0x000000, 1).fillRect(4, 2, 1, 1).fillRect(10, 2, 1, 1);
  });

  buat('bendera', 12, 32, (g) => {
    g.fillStyle(0xeeeeee, 1).fillRect(0, 0, 2, 32);
    g.fillStyle(0xd32f2f, 1).fillRect(2, 1, 10, 8);
    g.fillStyle(0xffffff, 1).fillRect(5, 3, 3, 3);
  });

  // Permata Laut (8x8): belah ketupat biru muda
  buat('permata', 8, 8, (g) => {
    g.fillStyle(0x00bcd4, 1)
      .fillRect(3, 0, 2, 1).fillRect(2, 1, 4, 1).fillRect(1, 2, 6, 1).fillRect(0, 3, 8, 2)
      .fillRect(1, 5, 6, 1).fillRect(2, 6, 4, 1).fillRect(3, 7, 2, 1);
    g.fillStyle(0xb2ebf2, 1).fillRect(2, 2, 2, 1).fillRect(1, 3, 2, 1);
  });

  // Hati Bajak Laut (8x8): hati merah
  buat('hati', 8, 8, (g) => {
    g.fillStyle(0xe91e63, 1)
      .fillRect(1, 1, 2, 1).fillRect(5, 1, 2, 1).fillRect(0, 2, 8, 2)
      .fillRect(1, 4, 6, 1).fillRect(2, 5, 4, 1).fillRect(3, 6, 2, 1);
    g.fillStyle(0xf8bbd0, 1).fillRect(1, 2, 1, 1);
  });
}
