import { ANGKA } from '../config/balance.js';

// Area: Claude. Musuh kepiting: jalan bolak-balik di antara dua batas.
// pengali: dari tingkat kesulitan (mudah 0.75, normal 1, sulit 1.25).
export default class Kepiting extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, batasKiri, batasKanan, pengali = 1) {
    super(scene, x, y, 'kepiting');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.batasKiri = batasKiri;
    this.batasKanan = batasKanan;
    this.kecepatan = ANGKA.kecepatanMusuh * pengali;
    this.arah = 1;
  }

  update() {
    if (this.x <= this.batasKiri) this.arah = 1;
    else if (this.x >= this.batasKanan) this.arah = -1;
    this.setVelocityX(this.arah * this.kecepatan);
    this.setFlipX(this.arah < 0);
  }
}
