import test from 'node:test';
import assert from 'node:assert/strict';
import { ANGKA, hitungNyawa, hitungSkor } from '../src/config/balance.js';

test('skor bertambah sesuai poin yang diperoleh', () => {
  assert.equal(hitungSkor(20, ANGKA.skorKoin), 30);
  assert.equal(hitungSkor(30, ANGKA.skorMusuh), 80);
});

test('skor tidak turun di bawah nol', () => {
  assert.equal(hitungSkor(10, -20), 0);
});

test('menolak nilai skor yang bukan angka valid', () => {
  assert.throws(() => hitungSkor(Number.NaN, 10), TypeError);
  assert.throws(() => hitungSkor(10, Infinity), TypeError);
});

test('nyawa berkurang dan tidak pernah kurang dari nol', () => {
  assert.equal(hitungNyawa(3, -1), 2);
  assert.equal(hitungNyawa(0, -1), 0);
});

test('nyawa pulih tanpa melewati batas maksimum', () => {
  assert.equal(hitungNyawa(2, 1), 3);
  assert.equal(hitungNyawa(ANGKA.nyawaMaksimum, 1), ANGKA.nyawaMaksimum);
});
