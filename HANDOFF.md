# HANDOFF.md — Papan Serah-Terima

Setiap AI WAJIB memperbarui file ini di akhir sesi. Entri terbaru di paling atas.

## Status saat ini
- Latar belakang kapal bajak laut (perspektif 3/4) sudah diimplementasikan.
- `ground` sekarang tak terlihat (hanya pijakan fisika), sisi atas di `h - 40`. Dek dan garis papan digambar `Background.js`.
- Lompat: satu lompatan per tekanan (bug auto-hop sudah diperbaiki).
- Pemain masih kotak sementara.

## Log sesi
### 2026-11-03 — Claude (ground transparan + perbaikan lompat)
- Dikerjakan: `src/scenes/GameScene.js`. `ground` dibuat tak terlihat (`setVisible(false)`), body fisika tetap. Lompat kini memakai deteksi baru-ditekan (`jumpHeldBefore`), berlaku untuk keyboard dan sentuhan.
- Branch: `claude/ground-dek-kayu` (dibuat dari `gemini/pirate-ship-bg`, jadi memuat commit Gemini juga).
- Menutup temuan Copilot (auto-hop) dan permintaan Gemini soal `ground`.
- Belum diuji di browser. Pengguna perlu coba di HP: lompat satu kali per sentuhan di area tengah.
- Catatan untuk Gemini: garis papan dek di `Background.js` kini terlihat lagi. Pemain menapak di `h - 40`.

### 2026-11-02 — Gemini CLI (Latar Kapal Bajak Laut)
- Dikerjakan: Perubahan `src/background/Background.js` untuk membuat suasana kapal bajak laut.
- Aset: Menggunakan `Phaser.Graphics` untuk membuat langit, laut (parallax), dek kapal, tiang, dan pagar.
- Branch: `gemini/pirate-ship-bg`.
- Catatan: Menambahkan detail perspektif oblique pada pagar dan tiang untuk efek 3/4.

### 2026-11-01 — GitHub Copilot (audit bug)
- Area diperiksa: `src/main.js`, `src/scenes/GameScene.js`, `src/background/Background.js`.
- Temuan perilaku: di `GameScene.update()`, lompat dipicu selama input masih ditahan dan pemain menyentuh tanah (auto-hop).
- Tindak lanjut: sudah diperbaiki Claude pada 2026-11-03.
- Validasi: pemeriksaan sintaks JavaScript dan diagnostik editor lolos. Belum diuji langsung di browser.

### 2026-10-30 — Claude (setup awal, langsung di main)
- Dikerjakan: AGENTS.md, CLAUDE.md, GEMINI.md, HANDOFF.md, README.md, index.html, src/main.js, src/scenes/GameScene.js, src/background/Background.js, assets/README.md.
- Engine dipilih: Phaser 3.
- Belum selesai: aset pixel asli, desain gameplay, musuh/rintangan, skor.
- Langkah berikutnya:
  - Gemini: perhalus latar di `src/background/` dan buat sprite pixel di `assets/`.
  - Claude: tambah mekanik game setelah pengguna menentukan jenis game.

## Permintaan antar-AI
- ~~`[Gemini -> Claude]` warna `ground` jadi coklat kayu~~ — diganti: `ground` kini tak terlihat, dek dari Background (2026-11-03).
- ~~`[Gemini -> Claude]` posisi `ground` di `h - 40`~~ — selesai (2026-11-03).

## Keputusan penting
- Engine: Phaser 3 (dipilih pengguna).
- Jenis game: platformer (dikonfirmasi pengguna).
- Lompat: satu lompatan per tekanan (dipilih pengguna).
