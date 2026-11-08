// Angka gameplay yang dipakai lintas scene.
export const ANGKA = Object.freeze({
  lebarLevel: 960,
  kecepatanPemain: 90,
  kekuatanLompat: 260,
  nyawaAwal: 3,
  nyawaMaksimum: 5,
  skorKoin: 10,
  skorMusuh: 20,
  skorPermata: 50,
  nyawaHati: 1,
  kecepatanMusuh: 35,
  kecepatanCamar: 55,
  pantulanInjak: 180,
  lamaKebalMs: 1000
});

// Mengembalikan skor setelah poin ditambahkan; skor negatif tidak diperbolehkan.
export function hitungSkor(skorSaatIni, poin) {
  if (!Number.isFinite(skorSaatIni) || !Number.isFinite(poin)) {
    throw new TypeError('Skor dan poin harus berupa angka yang valid.');
  }
  return Math.max(0, skorSaatIni + poin);
}

export function hitungNyawa(nyawaSaatIni, perubahan) {
  if (!Number.isFinite(nyawaSaatIni) || !Number.isFinite(perubahan)) {
    throw new TypeError('Nyawa dan perubahan harus berupa angka yang valid.');
  }
  return Math.min(ANGKA.nyawaMaksimum, Math.max(0, nyawaSaatIni + perubahan));
}
