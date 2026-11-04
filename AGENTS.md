# AGENTS.md — Aturan Bersama (Claude, Gemini CLI, Codex, Copilot)

File ini dibaca oleh SEMUA AI yang bekerja di repo ini. Ikuti aturan di sini sebelum mengubah kode.

## Tentang proyek
- Nama: First-game
- Jenis: platformer dengan grafis pixel, tema bajak laut
- Engine/bahasa: Phaser 3 (JavaScript, ES modules), dimuat lewat CDN, tanpa langkah build
- Target: web (bisa dibuka di browser HP)
- Fitur yang diinginkan: latar belakang (background) pixel yang bergerak/beranimasi
- Resolusi dasar: 320x180, `pixelArt: true`

## Alur kerja wajib
1. Mulai sesi: `git pull`, lalu baca `HANDOFF.md` dan `TASKS.md`.
2. Kerjakan HANYA area tugas milik Anda (lihat pembagian di bawah).
3. Buat branch sendiri: `claude/<topik>`, `gemini/<topik>`, `codex/<topik>`, atau `copilot/<topik>`. Jangan commit langsung ke `main`.
4. Selesai sesi: commit kecil dan jelas, push, lalu perbarui `HANDOFF.md`.
5. Jangan menimpa atau menulis ulang file milik AI lain tanpa tercatat di `HANDOFF.md`.

## Pembagian tugas
Rincian per fase ada di `TASKS.md`.

| Area | Pemilik utama | Lokasi |
|------|---------------|--------|
| Logika game, pemain, musuh, level | Claude | `src/main.js`, `src/scenes/`, `src/entities/` |
| Grafis pixel, animasi latar, aset | Gemini CLI | `assets/`, `src/background/` |
| Antarmuka (HUD, menu), skor/nyawa, tes, angka game | Codex | `src/ui/`, `src/systems/`, `src/config/`, `tests/` |
| Dokumentasi, review PR, audit bug | GitHub Copilot | `README.md`, `docs/teknis/` |
| Ide desain, teks (lewat pengguna) | ChatGPT | `docs/desain/` |
| Catatan serah-terima | Siapa saja | `HANDOFF.md` |

Jika perlu mengubah area AI lain: tulis permintaannya di bagian "Permintaan antar-AI" pada `HANDOFF.md`, jangan langsung diubah.

## Kontrak antar-area
- Skor dan nyawa: `this.registry` dengan kunci `skor` dan `nyawa`. Claude mengisi, Codex menampilkan.
- HUD: `src/ui/HudScene.js` (Codex), dijalankan dari `GameScene` (Claude).
- Angka game: `src/config/balance.js` (Codex), dibaca oleh kode Claude.
- Sprite: didaftar Gemini di `assets/README.md` (nama berkas, ukuran frame, nama animasi), dipasang Claude.

## Struktur
```
index.html            # memuat Phaser (CDN) dan src/main.js
src/main.js           # konfigurasi game
src/scenes/           # scene game (logika)
src/entities/         # pemain, musuh
src/background/       # latar belakang bergerak (parallax)
src/ui/               # HUD, menu, layar game over
src/systems/          # skor, nyawa, simpan skor
src/config/           # angka game (balance)
assets/               # gambar/suara
tests/                # tes
docs/                 # catatan desain dan teknis
```

## Gaya kode
- Nama file/fungsi jelas dan konsisten; komentar singkat untuk bagian yang tidak jelas.
- Satu perubahan = satu tujuan. Hindari refactor besar tanpa persetujuan pengguna.
- Jangan menaruh API key, token, atau password di repo.
- Pakai ES modules (`import`/`export`); `Phaser` tersedia sebagai variabel global.

## Perintah penting
- Jalankan game: `python3 -m http.server 8000` lalu buka port 8000
- Tes: belum ada (Codex akan menambahkan di `tests/`)

## Bahasa
Pengguna berbahasa Indonesia. Jelaskan dalam bahasa Indonesia; nama variabel/kode boleh bahasa Inggris.
