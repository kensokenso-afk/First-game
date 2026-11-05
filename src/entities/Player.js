import { ANGKA } from '../config/balance.js';

// Area: Claude. Pemain: gerak, lompat satu kali per tekanan, terpental saat kena musuh.
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.kunci = scene.input.keyboard.createCursorKeys();
    this.spasi = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.lompatSebelumnya = false;
    this.kebalSampai = 0;
    this.terpentalSampai = 0;
  }

  update(waktu) {
    let kiri = this.kunci.left.isDown;
    let kanan = this.kunci.right.isDown;
    let lompatDitahan = this.kunci.up.isDown || this.spasi.isDown;

    // Kontrol sentuh untuk HP: layar dibagi 3 bagian
    const ptr = this.scene.input.activePointer;
    if (ptr.isDown) {
      const sepertiga = this.scene.scale.width / 3;
      if (ptr.x < sepertiga) kiri = true;
      else if (ptr.x > sepertiga * 2) kanan = true;
      else lompatDitahan = true;
    }

    // Saat terpental, kontrol gerak mendatar ditahan sebentar
    if (waktu >= this.terpentalSampai) {
      if (kiri) this.setVelocityX(-ANGKA.kecepatanPemain);
      else if (kanan) this.setVelocityX(ANGKA.kecepatanPemain);
      else this.setVelocityX(0);
    }

    // Lompat hanya saat tombol BARU ditekan (bukan ditahan)
    const lompatBaru = lompatDitahan && !this.lompatSebelumnya;
    this.lompatSebelumnya = lompatDitahan;
    const dipijak = this.body.blocked.down || this.body.touching.down;
    if (lompatBaru && dipijak) this.setVelocityY(-ANGKA.kekuatanLompat);

    // Berkedip saat kebal
    const berkedip = waktu < this.kebalSampai && Math.floor(waktu / 80) % 2 === 1;
    this.setAlpha(berkedip ? 0.3 : 1);
  }

  // Mengembalikan true jika benar-benar kena (tidak sedang kebal)
  kena(waktu, musuhX) {
    if (waktu < this.kebalSampai) return false;
    this.kebalSampai = waktu + ANGKA.lamaKebalMs;
    this.terpentalSampai = waktu + 250;
    this.setVelocity(this.x < musuhX ? -120 : 120, -150);
    return true;
  }
}
