# AGENTS.md — Aturan Bersama (Claude, Gemini CLI, dll.)

File ini dibaca oleh SEMUA AI yang bekerja di repo ini. Ikuti aturan di sini sebelum mengubah kode.

## Tentang proyek
- Nama: First-game
- Jenis: game dengan grafis pixel
- Engine/bahasa: Phaser 3 (JavaScript, ES modules), dimuat lewat CDN, tanpa langkah build
- Target: web (bisa dibuka di browser HP)
- Fitur yang diinginkan: latar belakang (background) pixel yang bergerak/beranimasi
- Resolusi dasar: 320x180, `pixelArt: true`

## Alur kerja wajib
1. Mulai sesi: `git pull`, lalu baca `HANDOFF.md`.
2. Kerjakan HANYA area tugas milik Anda (lihat pembagian di bawah).
3. Buat branch sendiri: `claude/<topik>` atau `gemini/<topik>`. Jangan commit langsung ke `main` (kecuali setup awal).
4. Selesai sesi: commit kecil dan jelas, push, lalu perbarui `HANDOFF.md`.
5. Jangan menimpa atau menulis ulang file milik AI lain tanpa tercatat di `HANDOFF.md`.

## Pembagian tugas (usulan, boleh diubah pengguna)
| Area | Pemilik utama | Lokasi |
|------|---------------|--------|
| Logika game, pemain, musuh, skor | Claude | `src/main.js`, `src/scenes/` |
| Grafis pixel, animasi latar, aset | Gemini CLI | `assets/`, `src/background/` |
| Dokumentasi & catatan | Siapa saja | `README.md`, `HANDOFF.md` |

Jika perlu mengubah area AI lain: tulis permintaannya di bagian "Permintaan antar-AI" pada `HANDOFF.md`, jangan langsung diubah.

## Struktur
```
index.html            # memuat Phaser (CDN) dan src/main.js
src/main.js           # konfigurasi game
src/scenes/           # scene game (logika)
src/background/       # latar belakang bergerak (parallax)
assets/               # gambar/suara
```

## Gaya kode
- Nama file/fungsi jelas dan konsisten; komentar singkat untuk bagian yang tidak jelas.
- Satu perubahan = satu tujuan. Hindari refactor besar tanpa persetujuan pengguna.
- Jangan menaruh API key, token, atau password di repo.
- Pakai ES modules (`import`/`export`); `Phaser` tersedia sebagai variabel global.

## Perintah penting
- Jalankan game: `python3 -m http.server 8000` lalu buka port 8000
- Tes: belum ada

## Bahasa
Pengguna berbahasa Indonesia. Jelaskan dalam bahasa Indonesia; nama variabel/kode boleh bahasa Inggris.
