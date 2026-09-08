// Centralized Pronoun Normalizer for Ranglish (Anak Rantau Edition)
// Normalizes all Indonesian formal pronouns and possessive suffixes to pure Anak Rantau (gw / lu).

export function normalizePronounsToJaksel(text) {
  if (!text || typeof text !== 'string') return '';
  let s = text;

  // Prepositional & compound pronoun replacements
  s = s.replace(/\btanpamu\b/gi, 'tanpa lu');
  s = s.replace(/\btanpaku\b/gi, 'tanpa gw');
  s = s.replace(/\bdenganmu\b/gi, 'sama lu');
  s = s.replace(/\bdenganku\b/gi, 'sama gw');
  s = s.replace(/\bbersamamu\b/gi, 'bareng lu');
  s = s.replace(/\bbersamaku\b/gi, 'bareng gw');
  s = s.replace(/\buntukmu\b/gi, 'buat lu');
  s = s.replace(/\buntukku\b/gi, 'buat gw');
  s = s.replace(/\bpadamu\b/gi, 'ke lu');
  s = s.replace(/\bpadaku\b/gi, 'ke gw');
  s = s.replace(/\bkepadamu\b/gi, 'ke lu');
  s = s.replace(/\bkepadaku\b/gi, 'ke gw');
  s = s.replace(/\bterhadapmu\b/gi, 'ke lu');
  s = s.replace(/\bterhadapku\b/gi, 'ke gw');
  s = s.replace(/\bmenurutmu\b/gi, 'kata lu');
  s = s.replace(/\bmenurutku\b/gi, 'kata gw');
  s = s.replace(/\bkarenamu\b/gi, 'karena lu');
  s = s.replace(/\bkarenaku\b/gi, 'karena gw');
  s = s.replace(/\bolehmu\b/gi, 'sama lu');
  s = s.replace(/\bolehku\b/gi, 'sama gw');
  s = s.replace(/\bdirimu\b/gi, 'diri lu');
  s = s.replace(/\bdiriku\b/gi, 'diri gw');
  s = s.replace(/\bmilikmu\b/gi, 'punya lu');
  s = s.replace(/\bmilikku\b/gi, 'punya gw');

  // Common relational & emotional nouns/verbs with -mu and -ku
  s = s.replace(/\bcintamu\b/gi, 'cinta lu');
  s = s.replace(/\bcintaku\b/gi, 'cinta gw');
  s = s.replace(/\bsayangmu\b/gi, 'sayang lu');
  s = s.replace(/\bsayangku\b/gi, 'sayang gw');
  s = s.replace(/\bhatimu\b/gi, 'hati lu');
  s = s.replace(/\bhatiku\b/gi, 'hati gw');
  s = s.replace(/\bmatamu\b/gi, 'mata lu');
  s = s.replace(/\bmataku\b/gi, 'mata gw');
  s = s.replace(/\bhidupmu\b/gi, 'hidup lu');
  s = s.replace(/\bhidupku\b/gi, 'hidup gw');
  s = s.replace(/\bsenyummu\b/gi, 'senyum lu');
  s = s.replace(/\bsenyumku\b/gi, 'senyum gw');
  s = s.replace(/\bjiwamu\b/gi, 'jiwa lu');
  s = s.replace(/\bjiwaku\b/gi, 'jiwa gw');
  s = s.replace(/\bkatamu\b/gi, 'kata lu');
  s = s.replace(/\bkataku\b/gi, 'kata gw');
  s = s.replace(/\bpikiranmu\b/gi, 'pikiran lu');
  s = s.replace(/\bpikiranku\b/gi, 'pikiran gw');
  s = s.replace(/\bdoamu\b/gi, 'doa lu');
  s = s.replace(/\bdoaku\b/gi, 'doa gw');

  s = s.replace(/\bmemelukku\b/gi, 'meluk gw');
  s = s.replace(/\bmemelukmu\b/gi, 'meluk lu');
  s = s.replace(/\bmembantuku\b/gi, 'bantu gw');
  s = s.replace(/\bmembantumu\b/gi, 'bantu lu');
  s = s.replace(/\bmenemaniku\b/gi, 'nemenin gw');
  s = s.replace(/\bmenemanimu\b/gi, 'nemenin lu');
  s = s.replace(/\bmencintaiku\b/gi, 'cinta sama gw');
  s = s.replace(/\bmencintaimu\b/gi, 'cinta sama lu');
  s = s.replace(/\bmeninggalkanku\b/gi, 'ninggalin gw');
  s = s.replace(/\bmeninggalkanmu\b/gi, 'ninggalin lu');
  s = s.replace(/\bmengajakmu\b/gi, 'ngajak lu');
  s = s.replace(/\bmengajakku\b/gi, 'ngajak gw');
  s = s.replace(/\bmemandangmu\b/gi, 'mandang lu');
  s = s.replace(/\bmemandangku\b/gi, 'mandang gw');
  s = s.replace(/\bmerindukanmu\b/gi, 'kangen sama lu');
  s = s.replace(/\bmerindukanku\b/gi, 'kangen sama gw');

  // Standalone pronouns
  s = s.replace(/\baku\b/gi, 'gw');
  s = s.replace(/\bsaya\b/gi, 'gw');
  s = s.replace(/\bdaku\b/gi, 'gw');
  s = s.replace(/\bkamu\b/gi, 'lu');
  s = s.replace(/\banda\b/gi, 'lu');
  s = s.replace(/\bengkau\b/gi, 'lu');
  s = s.replace(/\bkau\b/gi, 'lu');

  // Trailing suffixes -mu and -ku on remaining words (e.g. ceritamu -> cerita lu)
  s = s.replace(/\b([a-zA-Z]{3,})mu\b/gi, (match, p1) => {
    const p1Low = p1.toLowerCase();
    if (['ta', 'il', 'te', 'ra', 'le', 'jam'].includes(p1Low)) return match;
    return `${p1} lu`;
  });
  s = s.replace(/\b([a-zA-Z]{3,})ku\b/gi, (match, p1) => {
    const p1Low = p1.toLowerCase();
    if (['ku', 'su', 'be', 'ka', 'sa', 'la'].includes(p1Low)) return match;
    return `${p1} gw`;
  });

  s = s.replace(/\b-ku\b/gi, ' gw');
  s = s.replace(/\b-mu\b/gi, ' lu');

  return s.trim();
}
