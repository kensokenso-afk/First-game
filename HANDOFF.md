# HANDOFF.md — Papan Serah-Terima

Setiap AI WAJIB memperbarui file ini di akhir sesi. Entri terbaru di paling atas.

## Status saat ini
- Level 1 sudah bisa dimainkan (branch `claude/level-1`, menunggu PR): dek kapal selebar 960 piksel, kamera mengikuti, peti dan papan sebagai pijakan, 17 koin, 4 kepiting, bendera akhir.
- Skor dan nyawa ada di `registry` (`skor`, `nyawa`). HUD sementara aktif sampai `HudScene` dari Codex tersedia.
- Injak kepiting = kalah (+50). Kena samping = nyawa berkurang, terpental, kebal 1 detik. Nyawa 0 = game over, sentuh untuk ulang.
- Semua gambar masih placeholder buatan kode (`src/entities/tekstur.js`).
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT. Pembagian tugas: `TASKS.md`.

## Log sesi
### 2026-11-05 — Claude (Level 1 + musuh + koin)
- Dikerjakan: `src/main.js` (memuat `HudScene` otomatis bila ada, lewat dynamic import), `src/scenes/GameScene.js` (level, kamera, tabrakan, skor, nyawa, game over, akhir level), `src/entities/` (`Player.js`, `Kepiting.js`, `tekstur.js`, `angka.js`).
- Keputusan: `GameScene` memakai `this.scene.run('HudScene')` (bukan `launch`) agar aman saat ulang. Latar Gemini diberi `setScrollFactor(0)` dari sisi GameScene agar tetap di layar saat kamera bergerak; berkas Gemini tidak diubah.
- Angka game sementara di `src/entities/angka.js`, menunggu `src/config/balance.js` dari Codex.
- Belum diuji di browser. Pengguna perlu mencoba di HP.
- Mencakup tugas Claude Fase 1 dan sebagian Fase 2 (musuh, koin, nyawa) di `TASKS.md`; kotaknya belum dicentang.

### 2026-11-04 — Claude (pembagian tugas 5 AI)
- Dikerjakan: `TASKS.md` baru (4 fase, pemilik per tugas, kontrak antar-area, perintah awal tiap AI), `AGENTS.md` diperbarui.
- Branch lama `claude/pembagian-tugas` usang; abaikan.

### 2026-11-03 — Claude (ground transparan + perbaikan lompat)
- `ground` tak terlihat, lompat satu kali per tekanan (menutup temuan Copilot soal auto-hop dan permintaan Gemini soal `ground`).

### 2026-11-02 — Gemini CLI (Latar Kapal Bajak Laut)
- `src/background/Background.js`: langit, laut (parallax), dek kapal, tiang, pagar dengan `Phaser.Graphics`. Perspektif oblique 3/4. Branch `gemini/pirate-ship-bg`.

### 2026-11-01 — GitHub Copilot (audit bug)
- Diperiksa: `src/main.js`, `src/scenes/GameScene.js`, `src/background/Background.js`.
- Temuan: auto-hop saat tombol lompat ditahan. Sudah diperbaiki 2026-11-03.
- Belum diuji langsung di browser.

### 2026-10-30 — Claude (setup awal, langsung di main)
- Dibuat: AGENTS.md, CLAUDE.md, GEMINI.md, HANDOFF.md, README.md, index.html, src/main.js, src/scenes/GameScene.js, src/background/Background.js, assets/README.md. Engine: Phaser 3.

## Permintaan antar-AI
- `[Claude -> Gemini]` Ganti placeholder dengan sprite pixel. Kunci dan ukuran saat ini: `player` 12x16, `peti` 16x16, `papan` 32x6, `koin` 8x8, `kepiting` 14x10, `bendera` 12x32. Boleh ubah ukuran asal didaftar di `assets/README.md` (nama berkas, ukuran frame, nama animasi). Claude yang memasangnya ke kode. Cek juga tampilan latar saat kamera bergerak.
- `[Claude -> Codex]` Buat `src/ui/HudScene.js`: kelas `HudScene` (kunci `'HudScene'`, `export default`) yang menampilkan `skor` dan `nyawa` dari `this.registry` dan memperbarui lewat event `changedata`. Gambar tanpa scroll kamera. Setelah berkasnya ada, `main.js` memuatnya otomatis dan HUD sementara mati sendiri.
- `[Claude -> Codex]` Buat `src/config/balance.js` dengan nama kunci yang sama seperti `src/entities/angka.js` (`ANGKA`). Beri tahu Claude agar `angka.js` diganti.
- `[Claude -> Codex]` Tambah tes di `tests/` untuk logika skor dan nyawa (misal `node --test`). Jangan ubah `GameScene.js`; catat temuan di sini.

## Keputusan penting
- Engine: Phaser 3 (dipilih pengguna).
- Jenis game: platformer bertema bajak laut (dikonfirmasi pengguna).
- Lompat: satu lompatan per tekanan (dipilih pengguna).
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT (ditambahkan pengguna).
