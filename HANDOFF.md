# HANDOFF.md — Papan Serah-Terima

Setiap AI WAJIB memperbarui file ini di akhir sesi. Entri terbaru di paling atas.

## Status saat ini
- Game dibuka dengan `MenuScene` (Codex): skor tertinggi, pilihan kesulitan MUDAH/NORMAL/SULIT. Kesulitan menentukan nyawa awal dan kecepatan musuh, dibawa ke semua level dan saat mengulang.
- Skor tertinggi disimpan (`localStorage`) saat game over dan saat TAMAT, lalu ditampilkan di layar akhir.
- Pemain memakai spritesheet Gemini (4 frame 12x16) dengan animasi `player-idle`, `player-walk`, `player-jump`; sprite menghadap arah gerak. Sprite `permata` dan `hati` asli (PNG) sudah dimuat.
- Ada 2 level yang bisa dimainkan, datanya di `src/scenes/levels/`. Level 1 (Dek Kapal): 960 piksel, 17 koin, 1 permata, 1 hati, 4 kepiting. Level 2 (Pelabuhan Berkabut): 1100 piksel, 18 koin, 2 permata, 1 hati, 5 kepiting, 1 camar. Bendera memindahkan ke level berikutnya; skor dan nyawa terbawa.
- Musuh: Kepiting (patroli) dan Burung Camar Pencuri (terbang, berkedip merah sebagai tanda, menukik ke pemain, lalu naik). Camar masih memakai placeholder kode (belum ada PNG).
- HUD dari Codex (`src/ui/HudScene.js`) aktif. Semua angka game (termasuk `skorPermata`, `nyawaHati`, `kecepatanCamar`) ada di `src/config/balance.js`.
- Latar parallax Gemini menyesuaikan gerakan kamera.
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT. Pembagian tugas: `TASKS.md`.

## Log sesi
### 2026-11-09 — Claude (musuh Burung Camar Pencuri)
- Branch: `claude/musuh-camar` (dari `main` terbaru).
- `src/entities/Camar.js` baru: keadaan patroli -> tanda (diam, berkedip merah 450 ms) -> tukik (ke posisi pemain, 110 px/s) -> naik -> patroli (jeda 1,5 detik). Kecepatan patroli dari `ANGKA.kecepatanCamar` (55) dikali pengali kesulitan. Terbang tanpa gravitasi dan tidak menabrak pijakan. Satu injakan dari atas mengalahkannya (+skor musuh); sentuhan lain melukai pemain.
- `GameScene.js`: grup `camar` dari data level (kunci opsional `camar`, daftar `[x, y, batasKiri, batasKanan]`); memakai `temuMusuh` yang sama dengan kepiting.
- `tekstur.js`: placeholder `camar` (12x8). `level2.js`: 1 camar di `[640, 40, 560, 760]`.
- Belum diuji di browser. Perlu dicek: tanda berkedip cukup terlihat, tukikan bisa dihindari, camar tidak menutupi koin/permata di jalur lompat, dan injakan dari atas mudah dilakukan.

### 2026-11-08 — Claude (hapus nilai cadangan angka koleksi)
- Branch: `claude/hapus-cadangan-angka` (dari `main` terbaru, setelah PR #17 Codex).
- `GameScene.js`: konstanta `SKOR_PERMATA` dan `NYAWA_HATI` (dengan `?? 50` dan `?? 1`) dihapus; kini memakai `ANGKA.skorPermata` dan `ANGKA.nyawaHati` langsung.
- Laporan Codex (dari sesinya, belum tercatat di HANDOFF): `balance.js` sudah memuat `skorPermata: 50`, `nyawaHati: 1`, `kecepatanCamar: 55` beserta tesnya; `npm test` lulus (3 file, 0 gagal). Dua permintaan `[Claude -> Codex]` dihapus karena sudah selesai.
- Permintaan baru ke Gemini untuk musuh berikutnya (lihat bagian permintaan).
- Belum diuji di browser.

### 2026-11-08 — Claude (animasi pemain + sprite koleksi)
- Branch: `claude/animasi-pemain` (dari `main` terbaru). Menjawab permintaan `[Gemini -> Claude]`.
- `GameScene.js`: `player` dimuat dengan `load.spritesheet` (12x16); `permata` dan `hati` masuk daftar `preload`; `buatAnimasi()` membuat `player-idle` (frame 0), `player-walk` (1-2, 6 fps), `player-jump` (3). Dilewati otomatis jika PNG gagal dimuat dan hanya placeholder yang ada.
- `Player.js`: memilih animasi (udara = lompat, bergerak = jalan, selain itu = diam) dan membalik sprite sesuai arah. Fisika tidak diubah.
- Belum diuji di browser. Perlu dicek: ukuran `player.png` memang 48x16, kaki tidak "tenggelam" ke lantai (ukuran body masih 12x16), dan arah hadap sprite asli (kalau Gemini menggambar menghadap kiri, arah flip terbalik).

### 2026-11-08 — Gemini CLI (Spritesheet Pemain & Koleksi Baru)
- Branch: `gemini/animasi-dan-koleksi`.
- Dikerjakan: Membuat `player.png` sebagai spritesheet (idle, walk1, walk2, jump) dengan ukuran frame 12x16 (total 48x16). Membuat `permata.png` (8x8, biru muda) dan `hati.png` (8x8, merah) menggunakan script Python PIL.
- Dokumentasi: Memperbarui `assets/README.md` dengan daftar aset baru dan konfigurasi animasi untuk pemain.
- Catatan untuk Claude: `player` sekarang perlu dimuat sebagai spritesheet (`spritesheet('player', ...)`), bukan image. `permata` dan `hati` sudah bisa di-`preload`. (Sudah ditangani Claude.)

### 2026-11-06 — Codex (menu, kesulitan, skor tertinggi)
- Branch: `codex/menu-highscore`, dibuat dari `origin/main` terbaru.
- Dikerjakan: `src/ui/MenuScene.js` menyediakan menu pembuka, tampilan skor tertinggi, kontrol, dan pilihan MUDAH/NORMAL/SULIT; `src/config/difficulty.js` memberi konfigurasi nyawa awal dan pengali kecepatan musuh; `src/systems/highScore.js` membaca/menyimpan skor tertinggi di `localStorage` dengan aman saat storage tidak tersedia.
- Tes ditambahkan untuk kesulitan dan skor tertinggi; `npm test` lulus (3 file tes).
- Integrasi masih perlu dilakukan Claude di `src/main.js` (masukkan `MenuScene`, jadikan scene awal) dan `src/scenes/GameScene.js` (baca `difficulty`, gunakan nyawa awal/pengali musuh, simpan skor terbaik saat game selesai atau game over). Scene menu memulai `GameScene` dengan `{ level: 0, difficulty: '<kunci>' }`. (Sudah ditangani Claude.)

### 2026-11-05 — Claude (Permata Laut + Hati Bajak Laut)
- Branch: `claude/koleksi-baru-2` (dari `main` terbaru; menggantikan `claude/koleksi-baru` yang konflik di `HANDOFF.md`).
- `GameScene.js`: grup `permata` dan `hati`; data level punya kunci opsional `permata` dan `hati` (daftar `[x, y]`). Hati hanya terambil jika nyawa belum penuh.
- `tekstur.js`: placeholder `permata` dan `hati` (8x8). `level1.js`: 1 permata, 1 hati. `level2.js`: 2 permata, 1 hati.
- `permata` dan `hati` sengaja tidak di-`preload` agar tidak ada error 404; tambahkan ke `SPRITE` di `GameScene.js` setelah PNG tersedia. (Sudah ditangani 2026-11-08.)
- Belum diuji di browser. Posisi permata (di atas papan tinggi) perlu dicek bisa dijangkau.

### 2026-11-05 — ChatGPT (identitas game, teks menu, blueprint level 3)
- Menambahkan `docs/desain/identitas-menu-blueprint-level-3.md`: rekomendasi judul game dan alternatifnya, nama enam level (termasuk dua level yang sudah ada), teks menu/cara bermain/pesan UI, serta blueprint rinci Level 3 "Atap Pasar Rempah".
- Blueprint mencakup ukuran dunia, koordinat platform, posisi/pola musuh, koleksi, urutan tantangan, arahan visual/audio, dan kriteria playtest.
- Branch: `chatgpt/menu-level-detail`, dibuat dari `main`.
- Batas area: hanya `docs/desain/` dan entri HANDOFF ini; tidak mengubah `src/` atau `assets/`.
- Status: menyiapkan pull request ke `main`; pengguna yang melakukan merge. Semua nama, teks, dan tata letak merupakan usulan untuk ditinjau.

### 2026-11-05 — Claude (level data-driven + level 2)
- Branch: `claude/level-data` (PR #9, sudah digabung). Level kini data di `src/scenes/levels/` (`level1.js`, `level2.js`, `index.js`). Menambah level = tambah berkas + satu baris di `index.js`.
- `GameScene.js`: baca level dari data; bendera pindah ke level berikutnya dengan skor dan nyawa terbawa; level terakhir menampilkan TAMAT; game over mengulang level yang sedang dimainkan.
- Level 2 "Pelabuhan Berkabut" (lebar 1100, 5 kepiting, 18 koin). Papan bergerak naik-turun belum ada (menyusul).
- Catatan Gemini: `Background.update` sekarang dipanggil tanpa argumen delta (memang tidak dipakai).
- Belum diuji di browser. Lebar level kini per level; `ANGKA.lebarLevel` hanya cadangan.

### 2026-11-05 — Claude (integrasi sprite, HUD, balance)
- Branch: `claude/integrasi`, dibuat dari `gemini/sprite-pemain`. Berisi pekerjaan Gemini (sprite, latar) ditambah berkas Codex yang disalin dari `codex/hud-skor` (`src/ui/HudScene.js`, `src/config/balance.js`, `tests/balance.test.js`). Tujuannya satu PR saja, agar `HANDOFF.md` tidak bentrok antar branch. PR `gemini/sprite-pemain` dan `codex/hud-skor` tidak perlu digabung terpisah.
- `GameScene.js`: `preload()` memuat 6 PNG dari `assets/`; memakai `ANGKA`, `hitungSkor`, `hitungNyawa` dari `balance.js`; panggilan `setScrollFactor(0)` pada latar dihapus karena `Background` sudah mengaturnya sendiri.
- `Player.js` dan `Kepiting.js` impor dari `balance.js`. `src/entities/angka.js` dihapus.
- `package.json` baru (`"type": "module"`, `npm test` = `node --test`) agar tes ESM bisa jalan. Catatan untuk Codex: berkas ini di luar area Codex; tolong cek dan jalankan tes.
- Belum diuji di browser.

### 2026-11-05 — Gemini CLI (Sprite & Background Parallax)
- Dikerjakan: sprite PNG di `assets/` (`player`, `peti`, `papan`, `koin`, `kepiting`, `bendera`), daftar di `assets/README.md`, `Background.js` bergaya pixel art dengan parallax yang merespon kamera.
- Catatan untuk Claude: latar digerakkan lewat `Background.update`; `setScrollFactor(0)` sudah ada di dalam kelas. (Sudah ditangani.)
- Branch: `gemini/sprite-pemain`.

### 2026-11-05 — Codex (HUD dan balance)
- Dikerjakan: `src/ui/HudScene.js`, `src/config/balance.js` (`ANGKA` + `hitungSkor`, `hitungNyawa`), `tests/balance.test.js`.
- Keputusan angka: `skorMusuh: 20`, `kecepatanMusuh: 35` mengikuti `docs/desain/ide-level-musuh-koleksi.md`.
- Branch: `codex/hud-skor`. `GameScene.js` tidak diubah. (Permintaan ganti impor sudah ditangani Claude.)

### 2026-11-05 — Claude (Level 1 + musuh + koin)
- `src/main.js`, `src/scenes/GameScene.js`, `src/entities/` (`Player.js`, `Kepiting.js`, `tekstur.js`). Digabung lewat PR #5.

### 2026-11-05 — ChatGPT (ide level dan desain)
- `docs/desain/ide-level-musuh-koleksi.md`: 5 ide level, 4 musuh, 3 benda koleksi, tabel angka awal. Digabung lewat PR #4. Angka masih usulan dan perlu playtest.

### 2026-11-04 — Claude (pembagian tugas 5 AI)
- `TASKS.md`, `AGENTS.md`. Digabung lewat PR #3 dan #6.

### 2026-11-03 — Claude (ground transparan + perbaikan lompat)
- `ground` tak terlihat; lompat satu kali per tekanan (menutup temuan Copilot soal auto-hop).

### 2026-11-02 — Gemini CLI (Latar Kapal Bajak Laut)
- `src/background/Background.js` pertama. Branch `gemini/pirate-ship-bg`.

### 2026-11-01 — GitHub Copilot (audit bug)
- Temuan: auto-hop saat tombol lompat ditahan. Sudah diperbaiki 2026-11-03.

### 2026-10-30 — Claude (setup awal, langsung di main)
- AGENTS.md, CLAUDE.md, GEMINI.md, HANDOFF.md, README.md, index.html, src/main.js, src/scenes/GameScene.js, src/background/Background.js, assets/README.md. Engine: Phaser 3.

## Permintaan antar-AI
(Tulis di sini jika perlu mengubah area AI lain. Format: `[dari -> ke] permintaan`)
- `[Claude -> Gemini]` Untuk musuh berikutnya, buat sprite dan daftarkan di `assets/README.md`: `camar.png` (spritesheet 2 frame sayap naik/turun, ukuran frame 12x8), `penembak.png` (12x16, penembak dek dengan senapan; boleh 2 frame: diam dan mengangkat senapan sebagai tanda), dan `peluru.png` (4x4). Claude yang memasangnya. Sementara Claude memakai placeholder kode (camar sudah memakai placeholder 12x8 single-frame).

## Keputusan penting
- Engine: Phaser 3 (dipilih pengguna).
- Jenis game: platformer bertema bajak laut (dikonfirmasi pengguna).
- Lompat: satu lompatan per tekanan (dipilih pengguna).
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT (ditambahkan pengguna).
- Angka game: `src/config/balance.js`, mengikuti usulan ChatGPT (skor musuh 20, kecepatan musuh 35).
