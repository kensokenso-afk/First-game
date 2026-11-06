import { ANGKA } from './balance.js';

// Pengali diterapkan oleh GameScene pada kecepatan musuh; nyawa awal berdiri sendiri.
export const TINGKAT_KESULITAN = Object.freeze({
  mudah: Object.freeze({ label: 'MUDAH', pengaliMusuh: 0.75, nyawaAwal: ANGKA.nyawaMaksimum }),
  normal: Object.freeze({ label: 'NORMAL', pengaliMusuh: 1, nyawaAwal: ANGKA.nyawaAwal }),
  sulit: Object.freeze({ label: 'SULIT', pengaliMusuh: 1.25, nyawaAwal: 2 })
});

export function ambilTingkatKesulitan(kunci) {
  return TINGKAT_KESULITAN[kunci] ?? TINGKAT_KESULITAN.normal;
}
