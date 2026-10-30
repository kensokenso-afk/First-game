# AGENTS.md — Aturan Bersama (Claude, Gemini CLI, dll.)

File ini dibaca oleh SEMUA AI yang bekerja di repo ini. Ikuti aturan di sini sebelum mengubah kode.

## Tentang proyek
- Nama: First-game
- Jenis: game dengan grafis pixel
- Engine/bahasa: (ISI: mis. Godot / Phaser / Unity / Python-Pygame)
- Target: (ISI: web / Android / PC)
- Fitur yang diinginkan: latar belakang (background) pixel yang bergerak/beranimasi

## Alur kerja wajib
1. Mulai sesi: `git pull`, lalu baca `HANDOFF.md`.
2. Kerjakan HANYA area tugas milik Anda (lihat pembagian di bawah).
3. Buat branch sendiri: `claude/<topik>` atau `gemini/<topik>`. Jangan commit langsung ke `main`.
4. Selesai sesi: commit kecil dan jelas, push, lalu perbarui `HANDOFF.md`.
5. Jangan menimpa atau menulis ulang file milik AI lain tanpa tercatat di `HANDOFF.md`.

## Pembagian tugas (usulan, boleh diubah pengguna)
| Area | Pemilik utama | Folder |
|------|---------------|--------|
| Logika game, pemain, musuh, skor | Claude | `src/` |
| Grafis pixel, animasi latar, aset | Gemini CLI | `assets/`, `src/background/` |
| Dokumentasi & catatan | Siapa saja | `docs/`, `HANDOFF.md` |

Jika perlu mengubah area AI lain: tulis permintaannya di bagian "Permintaan antar-AI" pada `HANDOFF.md`, jangan langsung diubah.

## Gaya kode
- Nama file/fungsi jelas dan konsisten; komentar singkat untuk bagian yang tidak jelas.
- Satu perubahan = satu tujuan. Hindari refactor besar tanpa persetujuan pengguna.
- Jangan menaruh API key, token, atau password di repo.

## Perintah penting
- Jalankan game: (ISI)
- Tes: (ISI)

## Bahasa
Pengguna berbahasa Indonesia. Jelaskan dalam bahasa Indonesia; nama variabel/kode boleh bahasa Inggris.
