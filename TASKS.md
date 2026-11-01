# TASKS.md — Pembagian Tugas Antar-AI

Baca `AGENTS.md` dan `HANDOFF.md` dulu. Satu tugas = satu branch (`<ai>/<topik>`). Jangan sentuh area AI lain; tulis permintaan di `HANDOFF.md` bagian "Permintaan antar-AI".

## Pemain
| AI | Peran | Area (hak ubah) |
|----|-------|-----------------|
| Claude | Logika game, arsitektur, review | `src/main.js`, `src/scenes/`, `src/systems/` |
| Gemini CLI | Grafis pixel, animasi latar, aset | `assets/`, `src/background/` |
| DeepSeek (harness Codespace) | Bug fix, tes, penyeimbangan angka | `tests/`, `src/config/` |
| GitHub Copilot | Saran kode kecil, dokumentasi, review PR | `README.md`, komentar kode |
| ChatGPT (di luar repo) | Ide desain, teks, nama, cerita | Hasil ditempel pengguna ke `docs/` |

## Blokir utama
- [ ] **Pengguna**: tentukan jenis game (platformer / shooter / lainnya). Semua fase di bawah menunggu ini, kecuali Fase 1.

## Fase 1 — Dasar (bisa jalan sekarang)
- [ ] Claude: rapikan `GameScene` (pemain, gerak, lompat, kamera). Cabang `claude/dasar-pemain`.
- [ ] Gemini CLI: ganti latar placeholder jadi parallax pixel 3 lapis (langit, jauh, dekat). Cabang `gemini/latar-parallax`.
- [ ] Gemini CLI: sprite pemain 16x16 (diam, jalan, lompat). Cabang `gemini/sprite-pemain`.
- [ ] Copilot: perbarui `README.md` (cara jalan, struktur folder).

## Fase 2 — Inti game (setelah jenis game dipilih)
- [ ] Claude: musuh/rintangan, tabrakan, nyawa.
- [ ] Claude: skor dan HUD.
- [ ] Gemini CLI: sprite musuh, ubin (tile), efek ledakan/partikel.
- [ ] DeepSeek: tes tabrakan dan skor; laporkan bug lewat `HANDOFF.md`.
- [ ] ChatGPT: 5 ide level + nama musuh; pengguna pilih.

## Fase 3 — Isi dan poles
- [ ] Claude: level 1–3, layar menu, layar game over.
- [ ] Gemini CLI: animasi menu, latar tiap level.
- [ ] DeepSeek: atur kesulitan (kecepatan, jumlah musuh) di `src/config/`.
- [ ] Claude: kontrol sentuh untuk HP, uji layar kecil.

## Fase 4 — Rilis
- [ ] DeepSeek: cek akhir (bug, performa di HP).
- [ ] Claude: gabung cabang ke `main` setelah pengguna setuju.
- [ ] Pengguna: unggah versi baru ke EdgeOne Pages.

## Aturan serah-terima
1. Selesai tugas: centang kotak di file ini, commit kecil, push.
2. Perbarui `HANDOFF.md` (entri terbaru di atas).
3. Butuh perubahan di area AI lain? Tulis di "Permintaan antar-AI".
4. Dua AI jangan kerja di file yang sama bersamaan.
5. Jangan commit rahasia (API key, token).
