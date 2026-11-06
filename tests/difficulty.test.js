import test from 'node:test';
import assert from 'node:assert/strict';
import { ANGKA } from '../src/config/balance.js';
import { ambilTingkatKesulitan, TINGKAT_KESULITAN } from '../src/config/difficulty.js';

test('tiap kesulitan punya label, kecepatan musuh, dan nyawa awal yang valid', () => {
  assert.deepEqual(Object.keys(TINGKAT_KESULITAN), ['mudah', 'normal', 'sulit']);
  assert.equal(TINGKAT_KESULITAN.mudah.nyawaAwal, ANGKA.nyawaMaksimum);
  assert.equal(TINGKAT_KESULITAN.normal.nyawaAwal, ANGKA.nyawaAwal);
  assert.ok(TINGKAT_KESULITAN.mudah.pengaliMusuh < TINGKAT_KESULITAN.normal.pengaliMusuh);
  assert.ok(TINGKAT_KESULITAN.sulit.pengaliMusuh > TINGKAT_KESULITAN.normal.pengaliMusuh);
});

test('kunci kesulitan tidak dikenal memakai normal', () => {
  assert.equal(ambilTingkatKesulitan('lainnya'), TINGKAT_KESULITAN.normal);
});
