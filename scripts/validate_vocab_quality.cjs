const d = require('../src/data/vocab1000.json');
let bad = 0;
for (const [k, v] of Object.entries(d)) {
  if (!v.arti || v.arti.startsWith('Makna &') || !v.cara_baca || !v.penggunaan || !v.penggunaan.length) {
    console.error('Bad entry:', k);
    bad++;
  }
}
console.log('Total verified entries:', Object.keys(d).length);
console.log('Bad entries:', bad);
const letters = [...new Set(Object.keys(d).map(k => k[0]))].sort();
console.log('Alphabet coverage A-Z:', letters.join(' -> '));
