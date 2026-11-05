# TASKS.md — Pembagian Tugas Antar-AI (platformer bajak laut)

Baca `AGENTS.md` dan `HANDOFF.md` dulu. Satu tugas = satu branch `<ai>/<topik>`. Jangan sentuh area AI lain; tulis permintaan di `HANDOFF.md` bagian "Permintaan antar-AI".

## Pemain dan area
| AI | Peran | Area (hak ubah) | Prefix branch |
|----|-------|-----------------|---------------|
| Claude | Arsitektur, logika inti, pemain, musuh, level | `src/main.js`, `src/scenes/`, `src/entities/` | `claude/` |
| Gemini CLI | Grafis pixel, animasi, latar | `assets/`, `src/background/` | `gemini/` |
| Codex | Antarmuka, sistem skor/nyawa, tes, konfigurasi | `src/ui/`, `src/systems/`, `src/config/`, `tests/` | `codex/` |
| GitHub Copilot | Dokumentasi, review PR, audit bug | `README.md`, `docs/teknis/` | `copilot/` |
| ChatGPT (konektor GitHub) | Ide desain, teks, tabel angka | `docs/desain/` | `chatgpt/` |

Copilot hanya melapor bug di `HANDOFF.md`; perbaikan kode dikerjakan pemilik area. Pengecualian: salah ketik dan komentar. ChatGPT tidak mengubah kode di `src/` atau `assets/`.

## Kontrak antar-area (agar kode saling cocok)
- **Skor dan nyawa**: disimpan di `this.registry` dengan kunci `skor` dan `nyawa`. Claude yang mengisi dan mengubahnya. Codex membaca dan menampilkannya.
- **HUD**: kelas `HudScene` di `src/ui/HudScene.js` (Codex). Claude menjalankannya dari `GameScene` (`this.scene.run('HudScene')`); `main.js` memuatnya otomatis jika berkasnya ada.
- **Sprite**: Gemini mendaftar tiap berkas di `assets/README.md`: nama berkas, ukuran frame, nama animasi. Claude yang memasangnya ke kode.
- **Angka game** (kecepatan, lompat, skor per koin): ada di `src/config/balance.js` (Codex). Sementara di `src/entities/angka.js`. Claude membaca dari sana, tidak menulis angka langsung di scene.
- Dua AI tidak boleh mengerjakan file yang sama di waktu yang sama.

## Fase 1 — Dasar platformer
- [x] Claude: level 1 di dek kapal (platform dari peti dan papan, kamera mengikuti). Isi `registry` `skor` dan `nyawa`, jalankan `HudScene`. Branch `claude/level-1`.
- [x] Gemini CLI: sprite pemain bajak laut (diam, jalan, lompat) dan ubin dek, peti, tong. Branch `gemini/sprite-pemain`.
- [ ] Codex: `HudScene` (skor dan nyawa, baca dari `registry`), `src/config/balance.js`, tes dasar logika skor di `tests/`. Branch `codex/hud-skor`.
- [ ] Copilot: perbarui `README.md` (cara jalan, struktur folder, daftar AI dan areanya). Review PR Fase 1.
- [ ] ChatGPT: 5 ide level bajak laut, 4 musuh (nama, perilaku, kelemahan), 3 benda koleksi, tulis di `docs/desain/` lewat PR. Pengguna memilih ide yang dipakai.

## Fase 2 — Musuh dan hadiah
- [x] Claude: musuh kepiting jalan bolak-balik, injak untuk kalahkan, koin, kena musuh = nyawa berkurang (di `claude/level-1`). Musuh jenis lain menyusul sesuai ide ChatGPT.
- [x] Gemini CLI: sprite musuh, koin, efek kecil (debu, kilau).
- [ ] Codex: `src/systems/` untuk skor dan nyawa, kondisi game over saat nyawa habis, tes.
- [ ] Copilot: audit bug Fase 2, laporkan di `HANDOFF.md`.
- [ ] ChatGPT: tabel angka awal (kecepatan musuh, skor per koin, jumlah nyawa).

## Fase 3 — Isi dan poles
- [ ] Claude: level 2–3, perpindahan level, uji kontrol sentuh di HP.
- [ ] Gemini CLI: latar tiap level (senja, malam, badai).
- [ ] Codex: menu awal, layar game over, skor tertinggi (`localStorage`), tingkat kesulitan di `src/config/`.
- [ ] Copilot: audit performa dan tampilan di layar kecil.
- [ ] ChatGPT: judul, nama level, teks menu.

## Fase 4 — Rilis
- [ ] Codex: tes akhir semua sistem.
- [ ] Copilot: audit akhir dan cek README.
- [ ] Claude: siapkan gabungan ke `main`.
- [ ] Pengguna: setujui PR, unggah versi baru ke EdgeOne Pages.

## Aturan serah-terima
1. Mulai: `git pull`, baca `HANDOFF.md`.
2. Selesai tugas: centang kotak di file ini, commit kecil, push, buka PR ke `main`.
3. Perbarui `HANDOFF.md`: tambah entri baru di paling atas. Jika bentrok saat gabung, simpan kedua entri.
4. Butuh ubah area AI lain? Tulis di "Permintaan antar-AI".
5. Pengguna yang menekan Merge. Jangan commit langsung ke `main`.
6. Jangan commit rahasia (API key, token).

## Perintah awal (tempel ke tiap AI)
- **Codex**: "Baca AGENTS.md, TASKS.md, HANDOFF.md. Kamu Codex. Kerjakan permintaan [Claude -> Codex] di HANDOFF.md dan tugas Codex di Fase 1 pada branch codex/hud-skor. Ikuti kontrak antar-area."
- **Copilot**: "Baca AGENTS.md, TASKS.md, HANDOFF.md. Kamu Copilot. Kerjakan tugas Copilot di Fase 1 pada branch copilot/readme. Jangan ubah kode logika."
- **ChatGPT**: "Repo: kensokenso-afk/First-game. Baca AGENTS.md, TASKS.md, HANDOFF.md. Kamu ChatGPT. Area kamu HANYA docs/desain/. Buat branch chatgpt/ide-level dari main, tulis ide level, musuh, koleksi, dan tabel angka di docs/desain/, tambah entri di HANDOFF.md, lalu buka pull request ke main. Jangan commit langsung ke main."
