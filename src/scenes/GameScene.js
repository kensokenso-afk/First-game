import Background from '../background/Background.js';
import Player from '../entities/Player.js';
import Kepiting from '../entities/Kepiting.js';
import Camar from '../entities/Camar.js';
import { buatTekstur } from '../entities/tekstur.js';
import { ANGKA, hitungSkor, hitungNyawa } from '../config/balance.js';
import { ambilTingkatKesulitan } from '../config/difficulty.js';
import { simpanSkorTertinggi } from '../systems/highScore.js';
import { DAFTAR_LEVEL } from './levels/index.js';

// Sprite pixel dari Gemini (assets/). Kunci sama dengan placeholder di tekstur.js.
// 'player' dimuat terpisah sebagai spritesheet (lihat preload).
// 'camar' belum ada PNG-nya: sementara memakai placeholder kode.
const SPRITE = ['peti', 'papan', 'koin', 'kepiting', 'bendera', 'permata', 'hati'];

// Area: Claude (logika game). Latar belakang ada di src/background/ (area Gemini).
// Tujuan tiap level: ambil koin, injak musuh, capai bendera.
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  // data: { level, skor, nyawa, difficulty }; level/skor/nyawa dari level sebelumnya,
  // difficulty dari MenuScene dan dibawa terus. Kosong = mulai baru, kesulitan normal.
  init(data) {
    this.indeksLevel = data?.level ?? 0;
    this.skorAwal = data?.skor ?? 0;
    this.kunciKesulitan = data?.difficulty ?? 'normal';
    this.kesulitan = ambilTingkatKesulitan(this.kunciKesulitan);
    this.nyawaAwal = data?.nyawa ?? this.kesulitan.nyawaAwal;
  }

  preload() {
    // Spritesheet pemain: 4 frame 12x16 (0 diam, 1-2 jalan, 3 lompat)
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 12, frameHeight: 16 });
    SPRITE.forEach((kunci) => this.load.image(kunci, `assets/${kunci}.png`));
  }

  // Animasi pemain dibuat sekali (animasi bersifat global antar-scene).
  // Dilewati jika spritesheet gagal dimuat dan yang ada hanya placeholder 1 frame.
  buatAnimasi() {
    if (this.anims.exists('player-idle') || !this.textures.get('player').has(3)) return;
    this.anims.create({ key: 'player-idle', frames: [{ key: 'player', frame: 0 }], frameRate: 1 });
    this.anims.create({
      key: 'player-walk',
      frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({ key: 'player-jump', frames: [{ key: 'player', frame: 3 }], frameRate: 1 });
  }

  create() {
    this.data_level = DAFTAR_LEVEL[this.indeksLevel];
    const h = this.scale.height;
    const lebar = this.data_level.lebar ?? ANGKA.lebarLevel;
    const dekAtas = h - 40; // sama dengan dek di Background.js

    buatTekstur(this);
    this.buatAnimasi();
    this.berhenti = false;

    this.bg = new Background(this);

    this.physics.world.setBounds(0, 0, lebar, h);
    this.cameras.main.setBounds(0, 0, lebar, h);

    this.registry.set('skor', this.skorAwal);
    this.registry.set('nyawa', this.nyawaAwal);

    const tanah = this.add.rectangle(lebar / 2, dekAtas + 20, lebar, 40).setVisible(false);
    this.physics.add.existing(tanah, true);

    this.buatLevel(dekAtas);

    this.player = new Player(this, 40, dekAtas - 20);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    this.physics.add.collider(this.player, tanah);
    this.physics.add.collider(this.player, this.pijakan);
    this.physics.add.collider(this.musuh, tanah);
    this.physics.add.collider(this.musuh, this.pijakan);

    this.physics.add.overlap(this.player, this.koin, (p, k) => this.ambilKoin(k));
    this.physics.add.overlap(this.player, this.permata, (p, b) => this.ambilPermata(b));
    this.physics.add.overlap(this.player, this.hati, (p, b) => this.ambilHati(b));
    this.physics.add.overlap(this.player, this.musuh, (p, m) => this.temuMusuh(p, m));
    this.physics.add.overlap(this.player, this.camar, (p, m) => this.temuMusuh(p, m));
    this.physics.add.overlap(this.player, this.bendera, () => this.selesaiLevel());

    if (this.scene.get('HudScene')) {
      this.scene.run('HudScene');
      this.scene.bringToTop('HudScene');
    } else {
      this.buatHudSementara();
    }

    // Nama level muncul sebentar
    const judul = this.add.text(160, 40, `LEVEL ${this.indeksLevel + 1}\n${this.data_level.nama}`, {
      fontFamily: 'monospace', fontSize: '10px', color: '#ffffff', align: 'center'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(10);
    this.tweens.add({ targets: judul, alpha: 0, delay: 1800, duration: 600 });

    if (this.indeksLevel === 0) {
      const petunjuk = this.add.text(4, 168, 'Sentuh: kiri / tengah (lompat) / kanan', {
        fontFamily: 'monospace', fontSize: '6px', color: '#ffffff'
      }).setScrollFactor(0).setDepth(10);
      this.tweens.add({ targets: petunjuk, alpha: 0, delay: 4000, duration: 800 });
    }
  }

  buatLevel(dekAtas) {
    const d = this.data_level;

    this.pijakan = this.physics.add.staticGroup();
    d.peti.forEach(([x, tumpuk]) => {
      for (let i = 0; i < tumpuk; i++) this.pijakan.create(x, dekAtas - 8 - i * 16, 'peti');
    });
    d.papan.forEach(([x, yAtas]) => this.pijakan.create(x, yAtas + 3, 'papan'));

    this.koin = this.physics.add.staticGroup();
    d.koin.forEach(([x, y]) => this.koin.create(x, y, 'koin'));

    // Koleksi baru (opsional per level)
    this.permata = this.physics.add.staticGroup();
    (d.permata ?? []).forEach(([x, y]) => this.permata.create(x, y, 'permata'));
    this.hati = this.physics.add.staticGroup();
    (d.hati ?? []).forEach(([x, y]) => this.hati.create(x, y, 'hati'));

    // Berkilau lewat alpha. Jangan ubah skala: hitbox static body tidak ikut mengecil,
    // sehingga tampilan dan area ambil jadi tidak sinkron (temuan Copilot).
    const berkilau = [...this.koin.getChildren(), ...this.permata.getChildren(), ...this.hati.getChildren()];
    this.tweens.add({ targets: berkilau, alpha: 0.55, duration: 450, yoyo: true, repeat: -1 });

    this.musuh = this.physics.add.group();
    d.musuh.forEach(([x, y, kiri, kanan]) => {
      this.musuh.add(new Kepiting(this, x, y, kiri, kanan, this.kesulitan.pengaliMusuh));
    });

    // Camar (opsional per level): terbang, tidak menabrak pijakan, tanpa gravitasi
    this.camar = this.physics.add.group({ allowGravity: false });
    (d.camar ?? []).forEach(([x, y, kiri, kanan]) => {
      this.camar.add(new Camar(this, x, y, kiri, kanan, dekAtas - 6, this.kesulitan.pengaliMusuh));
    });

    this.bendera = this.physics.add.staticImage(d.benderaX, dekAtas - 16, 'bendera');
  }

  tambahSkor(n) {
    this.registry.set('skor', hitungSkor(this.registry.get('skor'), n));
  }

  ambilKoin(koin) {
    koin.destroy();
    this.tambahSkor(ANGKA.skorKoin);
  }

  ambilPermata(permata) {
    permata.destroy();
    this.tambahSkor(ANGKA.skorPermata);
  }

  // Hati hanya diambil jika nyawa belum penuh; kalau penuh, tetap di tempat
  ambilHati(hati) {
    const nyawa = this.registry.get('nyawa');
    if (nyawa >= ANGKA.nyawaMaksimum) return;
    hati.destroy();
    this.registry.set('nyawa', hitungNyawa(nyawa, ANGKA.nyawaHati));
  }

  temuMusuh(pemain, musuh) {
    const dariAtas = pemain.body.velocity.y > 0 && pemain.body.bottom - musuh.body.top < 10;
    if (dariAtas) {
      musuh.destroy();
      pemain.setVelocityY(-ANGKA.pantulanInjak);
      this.tambahSkor(ANGKA.skorMusuh);
      return;
    }
    if (pemain.kena(this.time.now, musuh.x)) {
      const sisa = hitungNyawa(this.registry.get('nyawa'), -1);
      this.registry.set('nyawa', sisa);
      if (sisa <= 0) this.gameOver();
    }
  }

  // Simpan skor akhir; mengembalikan skor tertinggi terbaru
  simpanSkor() {
    return simpanSkorTertinggi(this.registry.get('skor'));
  }

  selesaiLevel() {
    if (this.berhenti) return;
    const skor = this.registry.get('skor');
    const adaBerikutnya = this.indeksLevel + 1 < DAFTAR_LEVEL.length;
    if (!adaBerikutnya) {
      const tertinggi = this.simpanSkor();
      this.akhiri(`TAMAT!\nSkor: ${skor}\nTertinggi: ${tertinggi}\nSentuh untuk main lagi`);
      this.time.delayedCall(700, () => {
        const ulang = () => this.scene.restart({ level: 0, difficulty: this.kunciKesulitan });
        this.input.once('pointerdown', ulang);
        this.input.keyboard.once('keydown-SPACE', ulang);
      });
      return;
    }
    this.akhiri(`LEVEL ${this.indeksLevel + 1} SELESAI!\nSkor: ${skor}`);
    // Skor dan nyawa dibawa ke level berikutnya
    this.time.delayedCall(1800, () => this.scene.restart({
      level: this.indeksLevel + 1,
      skor,
      nyawa: this.registry.get('nyawa'),
      difficulty: this.kunciKesulitan
    }));
  }

  gameOver() {
    const skor = this.registry.get('skor');
    const tertinggi = this.simpanSkor();
    this.akhiri(`GAME OVER\nSkor: ${skor}\nTertinggi: ${tertinggi}\nSentuh untuk ulang`);
    this.time.delayedCall(700, () => {
      // Ulang dari level yang sedang dimainkan, skor dan nyawa direset
      const ulang = () => this.scene.restart({ level: this.indeksLevel, difficulty: this.kunciKesulitan });
      this.input.once('pointerdown', ulang);
      this.input.keyboard.once('keydown-SPACE', ulang);
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

  update(waktu) {
    this.bg.update();
    if (this.berhenti) return;
    this.player.update(waktu);
    this.musuh.getChildren().forEach((m) => m.update());
    this.camar.getChildren().forEach((c) => c.update(waktu, this.player));
  }
}
