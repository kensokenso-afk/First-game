export const KUNCI_SKOR_TERTINGGI = 'first-game.skor-tertinggi';

function storageDefault() {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

export function bacaSkorTertinggi(storage = storageDefault()) {
  if (!storage) return 0;
  try {
    const skor = Number.parseInt(storage.getItem(KUNCI_SKOR_TERTINGGI), 10);
    return Number.isFinite(skor) && skor > 0 ? skor : 0;
  } catch {
    return 0;
  }
}

export function simpanSkorTertinggi(skor, storage = storageDefault()) {
  if (!Number.isFinite(skor) || skor < 0) {
    throw new TypeError('Skor harus berupa angka nol atau lebih.');
  }
  const tertinggi = Math.max(bacaSkorTertinggi(storage), Math.floor(skor));
  try {
    storage?.setItem(KUNCI_SKOR_TERTINGGI, String(tertinggi));
  } catch {
    // Game tetap dapat dimainkan saat penyimpanan browser tidak tersedia.
  }
  return tertinggi;
}
