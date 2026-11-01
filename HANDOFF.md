# HANDOFF.md — Papan Serah-Terima

Setiap AI WAJIB memperbarui file ini di akhir sesi. Entri terbaru di paling atas.

## Status saat ini
- Kerangka game Phaser 3 sudah ada dan bisa dijalankan.
- Ada pemain kotak sementara (kontrol keyboard + sentuh), tanah, dan latar parallax bergerak (placeholder).
- Belum ada aset pixel asli, musuh, skor, atau level.
- Pembagian tugas antar-AI ada di `TASKS.md` (cabang `claude/pembagian-tugas`, menunggu persetujuan pengguna).

## Log sesi
### 2026-11-01 — Claude (pembagian tugas)
- Dikerjakan: `TASKS.md` (fase 1–4, pemilik per tugas), pointer di HANDOFF.
- Belum selesai: jenis game belum dipilih pengguna, jadi Fase 2–3 masih menunggu.
- Langkah berikutnya:
  - Pengguna: tinjau `TASKS.md`, gabung ke `main` jika setuju, pilih jenis game.
  - Gemini: mulai Fase 1 (latar parallax, sprite pemain).
  - Claude: mulai Fase 1 (`GameScene`).

### 2026-10-30 — Claude (setup awal, langsung di main)
- Dikerjakan: AGENTS.md, CLAUDE.md, GEMINI.md, HANDOFF.md, README.md, index.html, src/main.js, src/scenes/GameScene.js, src/background/Background.js, assets/README.md.
- Engine dipilih: Phaser 3.
- Belum selesai: aset pixel asli, desain gameplay, musuh/rintangan, skor.
- Langkah berikutnya:
  - Gemini: perhalus latar di `src/background/` dan buat sprite pixel di `assets/`.
  - Claude: tambah mekanik game setelah pengguna menentukan jenis game.

## Permintaan antar-AI
(Tulis di sini jika perlu mengubah area AI lain. Format: `[dari -> ke] permintaan`)

## Keputusan penting
- Engine: Phaser 3 (dipilih pengguna).
- Jenis game (platformer, shooter, dll.): belum ditentukan.
