import test from 'node:test';
import assert from 'node:assert/strict';
import { bacaSkorTertinggi, KUNCI_SKOR_TERTINGGI, simpanSkorTertinggi } from '../src/systems/highScore.js';

function buatStorage(nilai = null) {
  const data = new Map();
  if (nilai !== null) data.set(KUNCI_SKOR_TERTINGGI, String(nilai));
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value)
  };
}

test('skor tertinggi awalnya nol dan skor baru disimpan', () => {
  const storage = buatStorage();
  assert.equal(bacaSkorTertinggi(storage), 0);
  assert.equal(simpanSkorTertinggi(120, storage), 120);
  assert.equal(bacaSkorTertinggi(storage), 120);
});

test('skor yang lebih rendah tidak mengganti skor tertinggi', () => {
  const storage = buatStorage(250);
  assert.equal(simpanSkorTertinggi(200, storage), 250);
});

test('skor tidak valid ditolak', () => {
  assert.throws(() => simpanSkorTertinggi(-1, buatStorage()), TypeError);
  assert.throws(() => simpanSkorTertinggi(Number.NaN, buatStorage()), TypeError);
});
