import { ANGKA } from '../config/balance.js';

// Pengaturan perilaku (ms dan px). Angka kecepatan patroli ada di balance.js (kecepatanCamar).
const JARAK_INCAR = 90;      // jarak mendatar pemain agar camar mulai mengincar
const JEDA_TANDA_MS = 450;   // camar diam dan berkedip merah sebelum menukik
const JEDA_ULANG_MS = 1500;  // jeda sebelum bisa menukik lagi
const KECEPATAN_TUKIK = 110;
const KECEPATAN_NAIK = 50;
const TUKIK_MINIMAL = 25;    // kedalaman tukikan minimal agar selalu terlihat

// Area: Claude. Burung Camar Pencuri: terbang mendatar, berkedip sebagai tanda,
// menukik ke posisi pemain, lalu naik kembali. Satu injakan dari atas mengalahkannya.
// Keadaan: patroli -> tanda -> tukik -> naik -> patroli.
export default class Camar extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, batasKiri, batasKanan, yBawah, pengali = 1) {
    super(scene, x, y, 'camar');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.setCollideWorldBounds(true);

    this.batasKiri = batasKiri;
    this.batasKanan = batasKanan;
    this.yAwal = y;
    this.yBawah = yBawah;
    this.kecepatan = ANGKA.kecepatanCamar * pengali;
    this.arah = 1;
    this.keadaan = 'patroli';
    this.siapSerangSampai = scene.time.now + 1000;
    this.tandaSampai = 0;
    this.yTujuan = y;
  }

  update(waktu, pemain) {
    if (this.keadaan === 'patroli') this.patroli(waktu, pemain);
    else if (this.keadaan === 'tanda') this.tanda(waktu, pemain);
    else if (this.keadaan === 'tukik') this.tukik();
    else this.naik(waktu);
  }

  patroli(waktu, pemain) {
    if (this.x <= this.batasKiri) this.arah = 1;
    else if (this.x >= this.batasKanan) this.arah = -1;
    this.setVelocity(this.arah * this.kecepatan, 0);
    this.setFlipX(this.arah < 0);

    const dekat = Math.abs(pemain.x - this.x) < JARAK_INCAR && pemain.y > this.y;
    if (waktu >= this.siapSerangSampai && dekat) {
      this.keadaan = 'tanda';
      this.tandaSampai = waktu + JEDA_TANDA_MS;
      this.setVelocity(0, 0);
    }
  }

  // Tanda: diam dan berkedip merah supaya pemain sempat bereaksi
  tanda(waktu, pemain) {
    this.setFlipX(pemain.x < this.x);
    this.setTint(Math.floor(waktu / 80) % 2 === 0 ? 0xff5252 : 0xffffff);
    if (waktu < this.tandaSampai) return;

    this.clearTint();
    this.yTujuan = Math.min(Math.max(pemain.y, this.y + TUKIK_MINIMAL), this.yBawah);
    this.scene.physics.moveTo(this, pemain.x, this.yTujuan, KECEPATAN_TUKIK);
    this.keadaan = 'tukik';
  }

  tukik() {
    if (this.y >= this.yTujuan) {
      this.keadaan = 'naik';
      this.setVelocity(0, -KECEPATAN_NAIK);
    }
  }

  naik(waktu) {
    if (this.y > this.yAwal) return;
    this.y = this.yAwal;
    this.keadaan = 'patroli';
    this.siapSerangSampai = waktu + JEDA_ULANG_MS;
    this.setVelocity(0, 0);
  }
}
