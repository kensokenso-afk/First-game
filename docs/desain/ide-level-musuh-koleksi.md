# Ide Level, Musuh, Koleksi, dan Angka Awal

Dokumen desain untuk platformer pixel bajak laut **First-game**. Target tampilan 320×180 piksel, Phaser 3. Angka di bawah adalah nilai awal untuk prototipe dan perlu diuji saat implementasi.

## 1. Lima ide level berikutnya

Urutan berikut dimulai setelah level pembuka di dek kapal. Setiap level memperkenalkan satu tantangan utama agar pemain belajar secara bertahap.

| Urutan | Nama level | Latar dan rintangan platform | Tantangan utama |
|---|---|---|---|
| 1 | Pelabuhan Berkabut | Dermaga kayu, peti, tali tambat, dan perahu kecil. | Papan dermaga yang bergerak naik-turun serta penjaga pelabuhan. |
| 2 | Atap Pasar Rempah | Atap kios warna-warni, kanopi kain, cerobong, dan jemuran. | Kanopi rapuh yang runtuh sesaat setelah diinjak; lompatan harus tepat. |
| 3 | Gua Pasang Surut | Gua laut dengan karang, peti karam, dan genangan. | Air naik-turun secara periodik; jalur rendah hanya aman saat air surut. |
| 4 | Benteng Mercusuar | Dinding batu, balkon meriam, tangga, dan menara mercusuar. | Meriam memberi tanda kilatan sebelum menembak; pemain harus berlindung atau melompat melewati peluru. |
| 5 | Kapal Hantu di Badai | Geladak kapal hantu, layar robek, petir, dan tiang patah. | Geladak miring/bergoyang dan hembusan angin mengubah momentum lompatan. |

**Catatan produksi:** untuk layar 320×180, tampilkan satu fokus tantangan pada satu waktu. Gunakan siluet latar yang sederhana dan kontras jelas antara platform yang bisa diinjak dan dekorasi. Hindari menumpuk terlalu banyak objek bergerak di area kecil.

## 2. Empat musuh baru

Musuh dirancang dengan pola yang terbaca pada ukuran sprite kecil. Beri animasi/indikator singkat sebelum serangan agar pemain punya waktu bereaksi.

| Nama | Perilaku | Cara dikalahkan |
|---|---|---|
| Kepiting Penjaga | Berjalan bolak-balik di platform pendek. Saat berbalik, capitnya terbuka sebentar. | Injak dari atas ketika capit terbuka. Sentuhan dari samping tetap melukai pemain. |
| Burung Camar Pencuri | Terbang mendatar, lalu menukik ke arah posisi pemain setelah jeda singkat. | Hindari saat menukik lalu injak dari atas ketika burung kembali terbang rendah; satu injakan mengalahkannya. |
| Penembak Dek | Menjaga satu titik dan menembakkan satu peluru lurus setelah mengangkat senapan sebagai tanda. | Lompat melewati peluru lalu injak saat jeda mengisi ulang; atau lewati tanpa kontak. |
| Kerangka Kelasi | Berpatroli perlahan; sesekali mengangkat pedang dan melakukan tebasan jarak pendek. | Pancing tebasannya, lompat melewati ayunan, lalu injak dari atas ketika pemulihan. |

**Aturan umum:** semua musuh memberi damage saat tersentuh dari samping. Serangan injak hanya dihitung jika pemain jatuh dari atas; jangan membuat musuh kalah hanya karena pemain menyentuh sisi atau bagian bawahnya.

## 3. Tiga benda koleksi

| Benda | Fungsi permainan | Saran penempatan |
|---|---|---|
| Koin Emas | Menambah skor **+10**. | Jalur utama dan rangkaian melengkung yang menuntun arah lompatan. |
| Permata Laut | Benda langka, menambah skor **+50**. | Jalur samping berisiko atau platform opsional. |
| Hati Bajak Laut | Memulihkan **1 nyawa**, tetapi tidak melebihi batas maksimum. | Tempat tersembunyi atau setelah bagian level yang sulit; batasi jumlahnya per level. |

## 4. Tabel angka awal

Angka berikut merupakan titik mulai untuk playtest, bukan angka final. Kecepatan dinyatakan dalam piksel per detik (px/s).

| Parameter | Nilai awal | Keterangan |
|---|---:|---|
| Kecepatan jalan pemain | 90 px/s | Mengikuti nilai gerak prototipe yang tercatat; cukup untuk layar 320×180 tanpa membuat platform terasa terlalu sempit. |
| Kecepatan Kepiting Penjaga | 35 px/s | Lambat, cocok sebagai musuh pengenal. |
| Kecepatan Burung Camar Pencuri | 55 px/s | Lebih cepat, tetapi pola menukiknya harus punya jeda. |
| Kecepatan Penembak Dek | 0 px/s | Diam; ancamannya berasal dari proyektil. |
| Kecepatan patroli Kerangka Kelasi | 40 px/s | Sedikit lebih cepat dari kepiting. |
| Skor Koin Emas | 10 poin | Hadiah umum. |
| Skor Permata Laut | 50 poin | Hadiah langka. |
| Skor mengalahkan musuh | 20 poin | Nilai seragam untuk versi awal; evaluasi setelah playtest. |
| Nyawa awal pemain | 3 | Cukup memberi ruang belajar tanpa menghilangkan risiko. |
| Batas maksimum nyawa | 5 | Hati tidak bisa menaikkan nyawa melebihi batas ini. |

### Asumsi dan hal untuk diuji

- Kecepatan pemain 90 px/s diambil sebagai baseline prototipe terdahulu; konfirmasi lagi terhadap implementasi terkini sebelum angka dipindahkan ke konfigurasi game.
- Uji tiap level pada resolusi dasar 320×180 dan layar HP: pemain harus bisa membaca telegraph serangan, jarak lompatan, dan batas platform.
- Nilai skor musuh +20 bersifat usulan desain; jika musuh terlalu mudah dikalahkan, pertimbangkan skor berbeda per tipe.
- Dokumen ini hanya spesifikasi desain. Implementasi logika, sprite, HUD, dan konfigurasi tetap menjadi area AI pemiliknya sesuai AGENTS.md dan TASKS.md.
