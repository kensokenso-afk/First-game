# HANDOFF.md — Papan Serah-Terima

Setiap AI WAJIB memperbarui file ini di akhir sesi. Entri terbaru di paling atas.

## Status saat ini
- Latar belakang kapal bajak laut (perspektif 3/4) sudah diimplementasikan.
- Pemain masih kotak sementara, tanah masih berwarna hijau (perlu disesuaikan).

## Log sesi
### 2026-11-02 — Gemini CLI (Latar Kapal Bajak Laut)
- Dikerjakan: Perubahan `src/background/Background.js` untuk membuat suasana kapal bajak laut.
- Aset: Menggunakan `Phaser.Graphics` untuk membuat langit, laut (parallax), dek kapal, tiang, dan pagar.
- Branch: `gemini/pirate-ship-bg`.
- Catatan: Menambahkan detail perspektif oblique pada pagar dan tiang untuk efek 3/4.

### 2026-11-01 — GitHub Copilot (audit bug)
- Area diperiksa: `src/main.js`, `src/scenes/GameScene.js`, `src/background/Background.js`.
- Temuan perilaku: di `GameScene.update()`, lompat dipicu selama input masih ditahan dan pemain menyentuh tanah. Menahan tombol atas/spasi atau sentuhan di area tengah menyebabkan pemain melompat lagi setelah mendarat (auto-hop). Ini bug jika desainnya satu lompatan per tekanan; jika auto-hop memang diinginkan, bukan bug.
- Tindak lanjut untuk Claude: konfirmasi perilaku lompat yang diinginkan; jika harus satu lompatan per tekanan, gunakan deteksi input baru ditekan.
- Validasi: pemeriksaan sintaks JavaScript dan diagnostik editor lolos. Belum diuji langsung di browser.

### 2026-10-30 — Claude (setup awal, langsung di main)
- Dikerjakan: AGENTS.md, CLAUDE.md, GEMINI.md, HANDOFF.md, README.md, index.html, src/main.js, src/scenes/GameScene.js, src/background/Background.js, assets/README.md.
- Engine dipilih: Phaser 3.
- Belum selesai: aset pixel asli, desain gameplay, musuh/rintangan, skor.
- Langkah berikutnya:
  - Gemini: perhalus latar di `src/background/` dan buat sprite pixel di `assets/`.
  - Claude: tambah mekanik game setelah pengguna menentukan jenis game.

## Permintaan antar-AI
- `[Gemini -> Claude]` Mohon sesuaikan warna `ground` di `src/scenes/GameScene.js` (saat ini hijau `0x2d6a4f`) menjadi coklat kayu (misal `0x5d4037`) agar senada dengan dek kapal bajak laut.
- `[Gemini -> Claude]` Jika memungkinkan, posisikan `ground` agar pemain terlihat menapak tepat di atas dek kayu (sekitar `h - 40`).

## Keputusan penting
- Engine: Phaser 3 (dipilih pengguna).
- Jenis game (platformer, shooter, dll.): platformer (berdasarkan mekanik lompat yang ada).
