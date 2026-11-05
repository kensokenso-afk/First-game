# HANDOFF.md — Papan Serah-Terima

Setiap AI WAJIB memperbarui file ini di akhir sesi. Entri terbaru di paling atas.

## Log sesi
### 2026-11-05 — ChatGPT (ide level dan desain)
- Dikerjakan: menambahkan `docs/desain/ide-level-musuh-koleksi.md` berisi 5 ide level lanjutan, 4 musuh (perilaku dan cara dikalahkan), 3 benda koleksi, serta tabel angka awal untuk kecepatan, skor, dan nyawa.
- Branch: `chatgpt/ide-level` (dibuat dari `main`).
- Batas area: hanya `docs/desain/` dan entri serah-terima ini; tidak mengubah `src/` atau `assets/`.
- PR: diajukan ke `main`; pengguna diminta meninjau dan melakukan merge.
- Catatan: angka desain masih usulan awal dan perlu playtest. Kecepatan pemain 90 px/s mengikuti baseline prototipe yang tercatat; nilai skor musuh +20 adalah usulan.
- Langkah berikutnya: pemilik area implementasi dapat meninjau dokumen setelah PR digabung. Codex tetap pemilik `src/config/balance.js`; Claude pemilik logika level/musuh.

## Status saat ini
- Latar belakang kapal bajak laut (perspektif 3/4) sudah diimplementasikan.
- `ground` tak terlihat (hanya pijakan fisika), sisi atas di `h - 40`. Dek dan garis papan digambar `Background.js`.
- Lompat: satu lompatan per tekanan.
- Pemain masih kotak sementara.
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT. Pembagian tugas ada di `TASKS.md` (menunggu persetujuan pengguna lewat PR).

## Log sesi
### 2026-11-04 — Claude (pembagian tugas 5 AI)
- Dikerjakan: `TASKS.md` baru (4 fase, pemilik per tugas, kontrak antar-area, perintah awal tiap AI), `AGENTS.md` diperbarui (tabel area, prefix branch `codex/` dan `copilot/`, struktur folder).
- Branch: `claude/pembagian-tugas-codex`.
- Belum selesai: menunggu pengguna menggabungkan PR. Setelah itu tiap AI mulai Fase 1.
- Langkah berikutnya:
  - Pengguna: gabung PR, tempel perintah awal ke Codex, Copilot, ChatGPT.
  - Claude: `claude/level-1`. Gemini: `gemini/sprite-pemain`. Codex: `codex/hud-skor`.
- Branch lama `claude/pembagian-tugas` sudah usang (dibuat sebelum PR sebelumnya digabung); abaikan.

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
(Tulis di sini jika perlu mengubah area AI lain. Format: `[dari -> ke] permintaan`)

## Keputusan penting
- Engine: Phaser 3 (dipilih pengguna).
- Jenis game: platformer bertema bajak laut (dikonfirmasi pengguna).
- Lompat: satu lompatan per tekanan (dipilih pengguna).
- Tim AI: Claude, Gemini CLI, Codex, GitHub Copilot, ChatGPT (ditambahkan pengguna).
