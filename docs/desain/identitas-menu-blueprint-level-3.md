# Identitas Game, Teks Menu, dan Blueprint Level 3

Dokumen usulan desain untuk **First-game**, platformer pixel bertema bajak laut (Phaser 3). Resolusi dasar 320×180; nama dan teks dibuat singkat agar terbaca pada layar HP. Semua nama/teks masih dapat dipilih atau disesuaikan pengguna.

## 1. Judul game

### Rekomendasi utama: **Bajak Laut: Jejak Harta Karun**
- Menjelaskan tema dan tujuan petualangan secara langsung.
- Mudah diingat dan cukup ringkas untuk logo/menu.
- Subjudul opsional dalam layar pembuka: *Petualangan dimulai dari geladak!*

Alternatif:
1. **Kapten Cilik: Pulau Harta** — terasa ringan dan ramah untuk pemain kasual.
2. **Kutukan Laut Biru** — lebih misterius, cocok bila cerita nantinya menonjolkan kapal hantu.
3. **Petualangan Tujuh Samudra** — memberi kesan perjalanan melewati banyak wilayah.

## 2. Nama level

Urutan ini mempertahankan dua level yang sudah ada di game, lalu meneruskan tema dari ide level sebelumnya.

| Nomor | Nama level | Gambaran singkat |
|---|---|---|
| 1 | **Dek Kapal** | Pemain belajar bergerak, melompat, menginjak kepiting, dan mengumpulkan koin. |
| 2 | **Pelabuhan Berkabut** | Dermaga, peti, perahu, dan kepiting penjaga. |
| 3 | **Atap Pasar Rempah** | Melompati kanopi, kios, dan jemuran di atas pasar. |
| 4 | **Gua Pasang Surut** | Lorong karang dan jalur yang dipengaruhi pasang laut. |
| 5 | **Benteng Mercusuar** | Benteng batu dengan menara dan ancaman meriam. |
| 6 | **Kapal Hantu di Badai** | Geladak kapal hantu, petir, dan angin kencang sebagai tantangan akhir. |

## 3. Teks menu dan antarmuka

### Menu utama
- **Judul:** BAJAK LAUT: JEJAK HARTA KARUN
- **Tagline:** Petualangan dimulai dari geladak!
- **Tombol utama:** MULAI BERLAYAR
- **Tombol kedua:** LANJUTKAN
- **Tombol bantuan:** CARA BERMAIN
- **Tombol opsional:** KREDIT

Jika fitur simpan progres belum tersedia, sembunyikan tombol **LANJUTKAN** sampai sistem penyimpanan dibuat.

### Cara bermain
- **KIRI / KANAN** — Bergerak
- **LOMPAT** — Melompati celah dan menginjak musuh dari atas
- **KUMPULKAN KOIN** — Tambahkan skor
- **HINDARI SERANGAN** — Sentuhan musuh dari samping mengurangi nyawa

Untuk layar HP, tampilkan ikon tombol sentuh; jangan mengandalkan teks panjang.

### Pesan dalam permainan
| Situasi | Teks |
|---|---|
| Memulai level | **LEVEL [NOMOR] — [NAMA LEVEL]** |
| Mengambil koin | **+10 KOIN!** |
| Mengambil permata | **PERMATA LANGKA +50!** |
| Kehilangan nyawa | **AWAS! NYAWA TERSISA: [JUMLAH]** |
| Nyawa habis | **KAPAL karam... COBA LAGI!** |
| Menyelesaikan level | **HEBAT! LEVEL SELESAI!** |
| Menyelesaikan semua level | **HARTA KARUN DITEMUKAN! KAMU JUARA!** |
| Jeda | **JEDA** / **LANJUTKAN** |

## 4. Blueprint detail Level 3 — Atap Pasar Rempah

**Tema:** pasar pelabuhan yang ramai. Pemain melompat dari atap kios ke kanopi kain dan papan jemuran untuk mengejar peta harta yang dibawa angin.

**Tujuan desain:** memperkenalkan platform rapuh (kanopi) dan musuh udara (burung camar) tanpa membuat pemain menghadapi dua ancaman baru sekaligus.

### Parameter rancangan
- Lebar dunia: sekitar **1.200 px** (sekitar 3,75 layar dasar).
- Tinggi dunia: **180 px**.
- Area pijakan bawah: permukaan aman sekitar **Y=150**.
- Titik mulai pemain: **X=32, Y=120**.
- Titik akhir/bendera: sekitar **X=1.145, Y=118**.
- HUD tetap di bagian atas; hindari menempatkan koin atau musuh tepat di belakang HUD.
- Angka koordinat adalah rancangan awal dalam koordinat dunia; perlu disesuaikan dengan ukuran collider aktual pemain dan gravitasi game.

### Tata letak platform

Koordinat `Y` adalah posisi sisi atas platform. Rentang `X` dan lebar ditulis dalam piksel.

| Bagian | Platform (X, Y, lebar) | Fungsi / tantangan |
|---|---|---|
| A — Awal pasar | (0, 150, 190), (125, 124, 66) | Jalur datar untuk orientasi, lalu lompatan pendek ke atap kios. |
| B — Kanopi pertama | (235, 136, 72), (330, 112, 68), (420, 132, 78) | Kanopi pertama menjadi platform rapuh; jeda runtuh yang disarankan 0,7–1 detik setelah diinjak. |
| C — Jemuran | (535, 108, 82), (650, 128, 72) | Dua pijakan kecil dengan jarak sedang; koin membentuk busur untuk memberi petunjuk lompatan. |
| D — Atap tinggi | (755, 98, 100), (880, 122, 75) | Area lebih tinggi sebagai jeda visual dan tempat menghadapi satu camar. |
| E — Lompatan akhir | (980, 140, 70), (1.075, 118, 90), (1.145, 150, 55) | Turun ke atap terakhir, lalu mencapai bendera. |

Catatan: permukaan bawah `Y=150` dapat berfungsi sebagai jalur pemulihan agar jatuh dari beberapa platform tidak langsung menghukum pemain. Jika game memakai jurang mematikan, ganti bagian bawah dengan zona jatuh dan letakkan pijakan aman di titik yang ditentukan.

### Penempatan musuh

| Musuh | Posisi awal (X, Y) | Area patroli / pola | Catatan keadilan |
|---|---:|---|---|
| Kepiting Penjaga 1 | (165, 132) | X=145–185 di platform awal | Musuh familiar; pemain sudah melihatnya di level sebelumnya. |
| Burung Camar Pencuri 1 | (385, 82) | Terbang X=350–455; menukik setelah jeda | Letakkan setelah kanopi pertama, bukan tepat di titik lompatan awal. |
| Kepiting Penjaga 2 | (690, 108) | X=660–710 di platform jemuran | Beri ruang untuk mendarat sebelum kontak. |
| Burung Camar Pencuri 2 | (920, 88) | Terbang X=890–970 | Jangan menukik saat pemain masih berada di udara dari lompatan sebelumnya. |

Y musuh menunjukkan posisi referensi awal, bukan ukuran sprite. Collider harus diselaraskan dengan permukaan platform. Jika tipe Burung Camar belum diimplementasikan, ganti sementara dengan kepiting yang sudah tersedia; jangan menambah logika musuh ke dokumen atau area kode ChatGPT.

### Koleksi dan alur pemain
- **Koin umum:** kelompokkan 3 koin di jalur aman menjelang platform (125,124), (420,132), dan (650,128).
- **Rangkaian lompatan:** 3–4 koin membentuk busur di atas kanopi (235–498) untuk mengajari pemain membaca jarak lompatan.
- **Permata opsional:** satu permata di atas platform tinggi (755,98); hadiah untuk lompatan berisiko, bukan syarat menyelesaikan level.
- **Bendera akhir:** di sekitar X=1.145, pada jalur aman setelah platform terakhir.

### Urutan pengalaman (checkpoint desain)
1. **Ajar:** pemain melihat satu kepiting di jalur yang lebar.
2. **Latih:** pemain melompati kanopi rapuh dengan tanda visual retak sebelum runtuh.
3. **Variasi:** camar muncul sendiri di ruang udara yang lapang.
4. **Uji:** gabungkan lompatan jemuran dengan satu kepiting, tetapi beri tempat mendarat yang cukup.
5. **Hadiah:** permata opsional di atap tinggi dan bendera terlihat dari platform terakhir.

### Arahan visual dan audio
- Atap kios memakai warna hangat; kanopi punya pola garis yang mudah dibedakan dari platform permanen.
- Beri retakan/gerakan kecil sebagai peringatan sebelum kanopi runtuh.
- Camar mengeluarkan bunyi pendek atau bayangan sebelum menukik.
- Musik pasar bernuansa riang; efek runtuh dan kepakan sayap harus jelas tetapi tidak menutupi suara penting.

### Kriteria playtest
- Pemain dapat memahami bahwa kanopi akan runtuh sebelum benar-benar jatuh.
- Camar memiliki telegraph yang terlihat pada resolusi 320×180.
- Tidak ada penempatan musuh tepat di atas titik pendaratan yang wajib.
- Level dapat diselesaikan tanpa mengambil permata opsional.
- Seluruh bagian dapat dimainkan dengan kontrol sentuh pada HP.

---
**Status:** usulan desain untuk ditinjau. Dokumen ini tidak mengubah logika game, data level, sprite, HUD, atau konfigurasi angka. Implementasi tetap mengikuti pembagian tugas di `AGENTS.md`.
