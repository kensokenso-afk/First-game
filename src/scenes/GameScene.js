import Background from '../background/Background.js';
import Player from '../entities/Player.js';
import Kepiting from '../entities/Kepiting.js';
import { buatTekstur } from '../entities/tekstur.js';
import { ANGKA } from '../entities/angka.js';

// Area: Claude (logika game). Latar belakang ada di src/background/ (area Gemini).
// Level 1: dek kapal bajak laut. Tujuan: ambil koin, injak kepiting, capai bendera.
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const h = this.scale.height;
    const lebar = ANGKA.lebarLevel;
    const dekAtas = h - 40; // sama dengan dek di Background.js

    buatTekstur(this);
    this.berhenti = false;

    // Latar tetap di layar walau kamera bergerak
    this.bg = new Background(this);
    this.bg.layers.forEach((l) => l.sprite.setScrollFactor(0));

    this.physics.world.setBounds(0, 0, lebar, h);
    this.cameras.main.setBounds(0, 0, lebar, h);

    // Skor dan nyawa ada di registry (dibaca HudScene)
    this.registry.set('skor', 0);
    this.registry.set('nyawa', ANGKA.nyawaAwal);

    // Tanah tak terlihat; dek digambar oleh Background
    const tanah = this.add.rectangle(lebar / 2, dekAtas + 20, lebar, 40).setVisible(false);
    this.physics.add.existing(tanah, true);

    this.buatLevel(dekAtas);

    this.player = new Player(this, 40, dekAtas - 20);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Tabrakan
    this.physics.add.collider(this.player, tanah);
    this.physics.add.collider(this.player, this.pijakan);
    this.physics.add.collider(this.musuh, tanah);
    this.physics.add.collider(this.musuh, this.pijakan);

    // Tumpang tindih
    this.physics.add.overlap(this.player, this.koin, (p, k) => this.ambilKoin(k));
    this.physics.add.overlap(this.player, this.musuh, (p, m) => this.temuMusuh(p, m));
    this.physics.add.overlap(this.player, this.bendera, () => this.selesaiLevel());

    // HUD: pakai HudScene (Codex) jika ada, jika tidak pakai HUD sementara
    if (this.scene.get('HudScene')) {
      this.scene.run('HudScene');
      this.scene.bringToTop('HudScene');
    } else {
      this.buatHudSementara();
    }

    const petunjuk = this.add.text(4, 168, 'Sentuh: kiri / tengah (lompat) / kanan', {
      fontFamily: 'monospace', fontSize: '6px', color: '#ffffff'
    }).setScrollFactor(0).setDepth(10);
    this.tweens.add({ targets: petunjuk, alpha: 0, delay: 4000, duration: 800 });
  }

  buatLevel(dekAtas) {
    // Peti dan papan sebagai pijakan
    this.pijakan = this.physics.add.staticGroup();
    const peti = (x, tumpuk) => {
      for (let i = 0; i < tumpuk; i++) this.pijakan.create(x, dekAtas - 8 - i * 16, 'peti');
    };
    const papan = (x, yAtas) => this.pijakan.create(x, yAtas + 3, 'papan');

    peti(120, 1);
    peti(190, 2); peti(206, 1);
    papan(262, 104); papan(332, 84); papan(402, 104);
    peti(430, 2); peti(446, 2);
    papan(502, 100); papan(562, 76);
    peti(620, 1); peti(636, 2);
    peti(760, 2); peti(776, 2);

    // Koin
    this.koin = this.physics.add.staticGroup();
    [
      [80, 126], [100, 126], [150, 126], [190, 94], [262, 92], [332, 72], [402, 92],
      [470, 126], [502, 88], [562, 64], [622, 112], [636, 94], [700, 126], [740, 126],
      [768, 94], [840, 126], [870, 126]
    ].forEach(([x, y]) => this.koin.create(x, y, 'koin'));
    this.tweens.add({ targets: this.koin.getChildren(), scaleX: 0.3, duration: 450, yoyo: true, repeat: -1 });

    // Musuh: x, y, batas kiri, batas kanan
    this.musuh = this.physics.add.group();
    [
      [260, 130, 235, 330], [500, 130, 470, 560], [680, 130, 660, 740], [850, 130, 810, 900]
    ].forEach(([x, y, kiri, kanan]) => this.musuh.add(new Kepiting(this, x, y, kiri, kanan)));

    // Bendera akhir level
    this.bendera = this.physics.add.staticImage(920, dekAtas - 16, 'bendera');
  }

  tambahSkor(n) {
    this.registry.set('skor', this.registry.get('skor') + n);
  }

  ambilKoin(koin) {
    koin.destroy();
    this.tambahSkor(ANGKA.skorKoin);
  }

  temuMusuh(pemain, musuh) {
    // Injak dari atas = kalahkan musuh
    const dariAtas = pemain.body.velocity.y > 0 && pemain.body.bottom - musuh.body.top < 10;
    if (dariAtas) {
      musuh.destroy();
      pemain.setVelocityY(-ANGKA.pantulanInjak);
      this.tambahSkor(ANGKA.skorMusuh);
      return;
    }
    if (pemain.kena(this.time.now, musuh.x)) {
      const sisa = this.registry.get('nyawa') - 1;
      this.registry.set('nyawa', sisa);
      if (sisa <= 0) this.gameOver();
    }
  }

  selesaiLevel() {
    if (this.berhenti) return;
    this.akhiri(`LEVEL 1 SELESAI!\nSkor: ${this.registry.get('skor')}`);
  }

  gameOver() {
    this.akhiri('GAME OVER\nSentuh untuk ulang');
    this.time.delayedCall(700, () => {
      this.input.once('pointerdown', () => this.scene.restart());
      this.input.keyboard.once('keydown-SPACE', () => this.scene.restart());
    });
  }

  akhiri(pesan) {
    this.berhenti = true;
    this.physics.pause();
    this.add.text(160, 80, pesan, {
      fontFamily: 'monospace', fontSize: '12px', color: '#ffffff', align: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)', padding: { x: 6, y: 4 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(20);
  }

  buatHudSementara() {
    const teks = this.add.text(4, 4, '', {
      fontFamily: 'monospace', fontSize: '8px', color: '#ffffff'
    }).setScrollFactor(0).setDepth(10);
    const segar = () => teks.setText(`Skor ${this.registry.get('skor')}   Nyawa ${this.registry.get('nyawa')}`);
    segar();
    this.registry.events.on('changedata', segar);
    this.events.once('shutdown', () => this.registry.events.off('changedata', segar));
  }

  update(waktu, delta) {
    this.bg.update(delta);
    if (this.berhenti) return;
    this.player.update(waktu);
    this.musuh.getChildren().forEach((m) => m.update());
  }
}
