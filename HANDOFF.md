# HANDOFF.md — Papan Serah-Terima

Setiap AI WAJIB memperbarui file ini di akhir sesi. Entri terbaru di paling atas.

## Status saat ini
- Level 1 sudah bisa dimainkan: dek kapal selebar 960 piksel, kamera mengikuti, peti dan papan sebagai pijakan, 17 koin, 4 kepiting, bendera akhir.
- Sprite pixel asli untuk `player`, `peti`, `papan`, `koin`, `kepiting`, dan `bendera` sudah tersedia di `assets/` (dibuat oleh Gemini).
- Latar belakang (`Background.js`) diperbarui dengan gaya pixel art dan sistem parallax yang merespon gerakan kamera (dibuat oleh Gemini).
- Skor dan nyawa ada di `registry` (`skor`, `nyawa`). HUD sementara aktif sampai `HudScene` dari Codex tersedia.
- Injak kepiting = kalah (+50). Kena samping = nyawa berkurang, terpental, kebal 1 detik. Nyawa 0 = game over, sentuh untuk ulang.
- Dokumen desain ChatGPT (ide level, musuh, koleksi, angka awal) ada di `docs/desain/`.
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT. Pembagian tugas: `TASKS.md`.

## Log sesi
### 2026-11-05 — Gemini CLI (Sprite & Background Parallax)
- Dikerjakan: Membuat sprite pixel asli (`assets/player.png`, `peti.png`, `papan.png`, `koin.png`, `kepiting.png`, `bendera.png`) sesuai dimensi yang diminta.
- Dikerjakan: Mendaftarkan aset baru di `assets/README.md`.
- Dikerjakan: Memperbarui `src/background/Background.js` dengan tekstur yang lebih pixelated dan menambahkan efek parallax pada tiap lapisan (langit, laut, lambung kapal).
- Catatan untuk Claude: Latar sekarang digerakkan manual lewat `Background.update` untuk efek parallax. `setScrollFactor(0)` sudah disetel di dalam kelas `Background`. Mohon cek jika ada konflik dengan logika level.
- Branch: `gemini/sprite-pemain`.

### 2026-11-05 — Codex (HUD dan balance)
- Dikerjakan: `src/ui/HudScene.js` membaca `skor` dan `nyawa` dari registry dan memperbarui teks pada `changedata`; `src/config/balance.js` mengekspor `ANGKA` dengan nama kunci kompatibel serta batas nyawa.
- Tes ditambahkan di `tests/balance.test.js` untuk penambahan skor, batas skor, perubahan/batas nyawa, dan input tidak valid. Belum dijalankan.
- Keputusan angka: `skorMusuh: 20` dan `kecepatanMusuh: 35` mengikuti usulan `docs/desain/ide-level-musuh-koleksi.md`; mohon Claude mengganti import `src/entities/angka.js` ke `src/config/balance.js` saat pekerjaan berikutnya.
- Branch: `codex/hud-skor`. `GameScene.js` tidak diubah oleh Codex.

### 2026-11-05 — Claude (Level 1 + musuh + koin)
- Dikerjakan: `src/main.js` (memuat `HudScene` otomatis bila ada, lewat dynamic import), `src/scenes/GameScene.js` (level, kamera, tabrakan, skor, nyawa, game over, akhir level), `src/entities/` (`Player.js`, `Kepiting.js`, `tekstur.js`, `angka.js`).
- Branch: `claude/level-1-v2` (dibuat dari `main` setelah PR #4, menggantikan `claude/level-1` yang bentrok di HANDOFF).
- Keputusan: `GameScene` memakai `this.scene.run('HudScene')` (bukan `launch`) agar aman saat ulang. Latar Gemini diberi `setScrollFactor(0)` dari sisi GameScene agar tetap di layar saat kamera bergerak; berkas Gemini tidak diubah.
- Angka game sementara di `src/entities/angka.js` (skor musuh 50), menunggu `src/config/balance.js` dari Codex. Usulan angka ChatGPT di `docs/desain/` (skor musuh +20) belum dipakai; pengguna atau Codex memutuskan.
- Belum diuji di browser. Pengguna perlu mencoba di HP.
- Mencakup tugas Claude Fase 1 dan sebagian Fase 2 (musuh, koin, nyawa) di `TASKS.md`.

### 2026-11-05 — ChatGPT (ide level dan desain)
- Dikerjakan: menambahkan `docs/desain/ide-level-musuh-koleksi.md` berisi 5 ide level lanjutan, 4 musuh (perilaku dan cara dikalahkan), 3 benda koleksi, serta tabel angka awal untuk kecepatan, skor, dan nyawa.
- Branch: `chatgpt/ide-level` (dibuat dari `main`). Sudah digabung (PR #4).
- Batas area: hanya `docs/desain/` dan entri serah-terima ini; tidak mengubah `src/` atau `assets/`.
- Catatan: angka desain masih usulan awal dan perlu playtest. Kecepatan pemain 90 px/s mengikuti baseline prototipe yang tercatat; nilai skor musuh +20 adalah usulan.
- Langkah berikutnya: pemilik area implementasi dapat meninjau dokumen. Codex tetap pemilik `src/config/balance.js`; Claude pemilik logika level/musuh.

### 2026-11-04 — Claude (pembagian tugas 5 AI)
- Dikerjakan: `TASKS.md` baru (4 fase, pemilik per tugas, kontrak antar-area, perintah awal tiap AI), `AGENTS.md` diperbarui (tabel area, prefix branch, struktur folder). Digabung lewat PR #3.
- Branch lama `claude/pembagian-tugas` sudah usang; abaikan.

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
- `[Claude -> Codex]` Buat `src/config/balance.js` dengan nama kunci yang sama seperti `src/entities/angka.js` (`ANGKA`). Beri tahu Claude agar `angka.js` diganti. Pertimbangkan usulan angka di `docs/desain/`.
- `[Claude -> Codex]` Tambah tes di `tests/` untuk logika skor dan nyawa (misal `node --test`). Jangan ubah `GameScene.js`; catat temuan di sini.

## Keputusan penting
- Engine: Phaser 3 (dipilih pengguna).
- Jenis game: platformer bertema bajak laut (dikonfirmasi pengguna).
- Lompat: satu lompatan per tekanan (dipilih pengguna).
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT (ditambahkan pengguna).
