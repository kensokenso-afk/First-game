// Level 2: Pelabuhan Berkabut. Dermaga lebih rapat, lebih banyak kepiting.
// Selisih tinggi antar pijakan dijaga <= 40 px (lompat maksimal ~56 px).
// camar [x, y, batasKiri, batasKanan]: terbang di ketinggian y, menukik ke pemain.
export default {
  nama: 'Pelabuhan Berkabut',
  lebar: 1100,
  peti: [[90, 1], [150, 1], [300, 2], [316, 1], [520, 1], [536, 2], [552, 1], [800, 2], [816, 2], [832, 1]],
  papan: [
    [210, 104], [380, 100], [440, 80], [610, 104], [670, 84], [730, 64], [900, 100], [960, 80]
  ],
  koin: [
    [70, 126], [90, 110], [150, 110], [210, 92], [260, 126], [300, 94], [380, 88], [440, 68],
    [490, 126], [536, 94], [610, 92], [670, 72], [730, 52], [780, 126], [816, 94],
    [900, 88], [960, 68], [1030, 126]
  ],
  permata: [[730, 38], [960, 54]],
  hati: [[832, 110]],
  musuh: [
    [240, 130, 190, 280], [420, 130, 340, 500], [600, 130, 570, 700],
    [880, 130, 850, 940], [1000, 130, 970, 1060]
  ],
  camar: [[640, 40, 560, 760]],
  benderaX: 1060
};
