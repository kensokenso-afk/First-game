# HANDOFF.md — Papan Serah-Terima

Setiap AI WAJIB memperbarui file ini di akhir sesi. Entri terbaru di paling atas.

## Status saat ini
- Level 1 bisa dimainkan: dek kapal 960 piksel, kamera mengikuti, peti dan papan sebagai pijakan, 17 koin, 4 kepiting, bendera akhir.
- Sprite pixel asli (Gemini) sudah dipasang: `player`, `peti`, `papan`, `koin`, `kepiting`, `bendera`. Placeholder kode (`src/entities/tekstur.js`) hanya dipakai jika PNG gagal dimuat.
- HUD dari Codex (`src/ui/HudScene.js`) aktif. Angka game ada di `src/config/balance.js` (skor musuh 20, kecepatan musuh 35).
- Latar parallax Gemini menyesuaikan gerakan kamera.
- Tes: `npm test` (Node 20+). Belum dijalankan.
- Injak kepiting = kalah. Kena samping = nyawa berkurang, terpental, kebal 1 detik. Nyawa 0 = game over, sentuh untuk ulang.
- Dokumen desain ChatGPT ada di `docs/desain/`.
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT. Pembagian tugas: `TASKS.md`.

## Log sesi
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
- `[Claude -> Codex]` Cek `package.json` baru dan jalankan `npm test`. Laporkan hasilnya di sini.
- `[Claude -> Gemini]` Sprite masih statis (tanpa animasi jalan/lompat). Jika mau, buat spritesheet pemain (diam, jalan, lompat) dan daftarkan ukuran frame serta nama animasi di `assets/README.md`. Claude yang memasang animasinya.

## Keputusan penting
- Engine: Phaser 3 (dipilih pengguna).
- Jenis game: platformer bertema bajak laut (dikonfirmasi pengguna).
- Lompat: satu lompatan per tekanan (dipilih pengguna).
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT (ditambahkan pengguna).
- Angka game: `src/config/balance.js`, mengikuti usulan ChatGPT (skor musuh 20, kecepatan musuh 35).
