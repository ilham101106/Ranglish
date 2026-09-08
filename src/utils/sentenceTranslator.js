// Smart Conversational Sentence & Phrase Translator for Ranglish (Anak Rantau Edition)
// High-accuracy Indonesian translations, authentic Temen Ngobrol / Jaksel nuances,
// and Indonesian-friendly phonetic system (500+ verified entries) with zero-compromise quality.

import { normalizePronounsToJaksel } from './pronounNormalizer.js';
import { generateDynamicRantauNote, generateDynamicMaknaFilosofis } from './rantauInsightGenerator.js';
import { pickVariedTemplate, validateAndSanitizeExample, classifyText } from './textClassifier.js';

// ══════════════════════════════════════════════════════════════════════════════
// 1. COMPREHENSIVE INDONESIAN-FRIENDLY PHONETIC DICTIONARY (500+ ENTRIES)
// ══════════════════════════════════════════════════════════════════════════════
// Principles:
// - Short 'a' in closed syllables -> 'e' ("angry" -> "eng-gri", "cat" -> "ket", "bad" -> "bed", "happy" -> "hep-pi")
// - Clear American 'r' ending -> "-er" ("better" -> "bet-ter", "never" -> "nev-er", "water" -> "wah-ter")
// - Long "ee" stays "ee"
// - Consistent hyphen "-" syllable boundaries
export const PHONETIC_DICT = {
  // Common Contractions & Pronouns
  'i': 'ay',
  'im': 'aym',
  "i'm": 'aym',
  'iam': 'ay-em',
  'ive': 'ayv',
  "i've": 'ayv',
  'id': 'ayd',
  "i'd": 'ayd',
  'ill': 'ayl',
  "i'll": 'ayl',
  'me': 'mee',
  'my': 'may',
  'mine': 'mayn',
  'myself': 'may-self',
  'you': 'yoo',
  'u': 'yoo',
  'your': 'yoor',
  'ur': 'yoor',
  'youre': 'yoor',
  "you're": 'yoor',
  'yours': 'yoorz',
  'yourself': 'yoor-self',
  'yourselves': 'yoor-selvz',
  'we': 'wee',
  'were': 'wer',
  "we're": 'weer',
  'us': 'as',
  'our': 'owr',
  'ours': 'owrz',
  'ourselves': 'owr-selvz',
  'they': 'they',
  'theyre': 'thair',
  "they're": 'thair',
  'them': 'them',
  'their': 'thair',
  'theirs': 'thairz',
  'themselves': 'them-selvz',
  'he': 'hee',
  'hes': 'heez',
  "he's": 'heez',
  'him': 'him',
  'his': 'hiz',
  'himself': 'him-self',
  'she': 'shee',
  'shes': 'sheez',
  "she's": 'sheez',
  'her': 'her',
  'hers': 'herz',
  'herself': 'her-self',
  'it': 'it',
  'its': 'its',
  "it's": 'its',
  'itself': 'it-self',
  'this': 'this',
  'that': 'that',
  'these': 'theez',
  'those': 'thohz',

  // Indefinite Pronouns
  'someone': 'sam-wan',
  'somebody': 'sam-bah-dee',
  'something': 'sam-thing',
  'somethin': 'sam-thing',
  'somewhere': 'sam-wair',
  'anyone': 'en-ee-wan',
  'anybody': 'en-ee-bah-dee',
  'anything': 'en-ee-thing',
  'anywhere': 'en-ee-wair',
  'everyone': 'ev-ree-wan',
  'everybody': 'ev-ree-bah-dee',
  'everything': 'ev-ree-thing',
  'everywhere': 'ev-ree-wair',
  'no one': 'noh wan',
  'no': 'noh',
  'one': 'wan',
  'nobody': 'noh-bah-dee',
  'nothing': 'nath-ing',
  'nothin': 'nath-ing',
  'nowhere': 'noh-wair',

  // Auxiliary Verbs & Negations
  'is': 'iz',
  'isnt': 'iz-ent',
  "isn't": 'iz-ent',
  'am': 'em',
  'are': 'ahr',
  'arent': 'ahrnt',
  "aren't": 'ahrnt',
  'was': 'waz',
  'wasnt': 'waz-ent',
  "wasn't": 'waz-ent',
  'werent': 'wernt',
  "weren't": 'wernt',
  'do': 'doo',
  'dont': 'dohnt',
  "don't": 'dohnt',
  'does': 'daz',
  'doesnt': 'daz-ent',
  "doesn't": 'daz-ent',
  'did': 'did',
  'didnt': 'did-ent',
  "didn't": 'did-ent',
  'have': 'hev',
  'havent': 'hev-ent',
  "haven't": 'hev-ent',
  'has': 'hez',
  'hasnt': 'hez-ent',
  "hasn't": 'hez-ent',
  'had': 'hed',
  'hadnt': 'hed-ent',
  "hadn't": 'hed-ent',
  'can': 'ken',
  'cant': 'kent',
  "can't": 'kent',
  'cannot': 'ken-not',
  'could': 'kood',
  'couldnt': 'kood-ent',
  "couldn't": 'kood-ent',
  'would': 'wood',
  'wouldnt': 'wood-ent',
  "wouldn't": 'wood-ent',
  'should': 'shood',
  'shouldnt': 'shood-ent',
  "shouldn't": 'shood-ent',
  'will': 'wil',
  'wont': 'wohnt',
  "won't": 'wohnt',
  'shall': 'shel',
  'might': 'mayt',
  'must': 'mast',
  'may': 'mey',

  // Question Words & Connectors
  'what': 'wut',
  'whats': 'wuts',
  "what's": 'wuts',
  'why': 'way',
  'how': 'how',
  'when': 'wen',
  'where': 'wair',
  'who': 'hoo',
  'whom': 'hoom',
  'whose': 'hooz',
  'which': 'wich',
  'that': 'that',
  'the': 'the',
  'a': 'uh',
  'an': 'en',
  'and': 'end',
  'or': 'ohr',
  'but': 'bat',
  'so': 'soh',
  'if': 'if',
  'then': 'then',
  'because': 'bee-kawz',
  'cause': 'kawz',
  'cuz': 'kaz',
  'though': 'thoh',
  'although': 'awl-thoh',
  'even': 'ee-ven',
  'while': 'wayl',
  'until': 'an-til',
  'till': 'til',
  'since': 'sins',
  'unless': 'an-les',

  // Prepositions & Adverbs
  'about': 'uh-bowt',
  'bout': 'bowt',
  'above': 'uh-bav',
  'across': 'uh-kros',
  'after': 'af-ter',
  'against': 'uh-genst',
  'along': 'uh-long',
  'among': 'uh-mang',
  'around': 'uh-rownd',
  'at': 'et',
  'before': 'bee-fohr',
  'behind': 'bee-haynd',
  'below': 'bee-loh',
  'beneath': 'bee-neeth',
  'beside': 'bee-sayd',
  'between': 'bee-tween',
  'beyond': 'bee-yond',
  'by': 'bay',
  'down': 'down',
  'during': 'dyoor-ing',
  'for': 'fohr',
  'from': 'frahm',
  'in': 'in',
  'into': 'in-too',
  'near': 'neer',
  'of': 'ov',
  'off': 'awf',
  'on': 'on',
  'onto': 'on-too',
  'out': 'owt',
  'over': 'oh-ver',
  'through': 'throo',
  'to': 'too',
  'towards': 'tuh-wahrdz',
  'toward': 'tuh-wahrd',
  'under': 'an-der',
  'up': 'ap',
  'upon': 'uh-pon',
  'with': 'with',
  'within': 'with-in',
  'without': 'with-owt',

  // Core Verbs & Variations (from VOCAB_MAP & Beyond)
  'owe': 'oh',
  'owing': 'oh-ing',
  'make': 'meyk',
  'makes': 'meyks',
  'making': 'meyk-ing',
  'made': 'meyd',
  'feel': 'feel',
  'feels': 'feelz',
  'feeling': 'feel-ing',
  'felt': 'felt',
  'think': 'thingk',
  'thinks': 'thingks',
  'thinking': 'thingk-ing',
  'thought': 'thawt',
  'know': 'noh',
  'knows': 'nohz',
  'knowing': 'noh-ing',
  'knew': 'noo',
  'known': 'nohn',
  'want': 'wont',
  'wants': 'wonts',
  'wanting': 'wont-ing',
  'wanted': 'won-tid',
  'need': 'need',
  'needs': 'needz',
  'needing': 'need-ing',
  'needed': 'nee-did',
  'leave': 'leev',
  'leaves': 'leevz',
  'leaving': 'leev-ing',
  'left': 'left',
  'stay': 'stey',
  'stays': 'steyz',
  'staying': 'stey-ing',
  'stayed': 'steyd',
  'change': 'cheynj',
  'changes': 'cheyn-jiz',
  'changing': 'cheyn-jing',
  'changed': 'cheynjd',
  'help': 'help',
  'helps': 'helps',
  'helping': 'help-ing',
  'helped': 'helpt',
  'talk': 'tawk',
  'talks': 'tawks',
  'talking': 'tawk-ing',
  'talked': 'tawkt',
  'tell': 'tel',
  'tells': 'telz',
  'telling': 'tel-ing',
  'told': 'tohld',
  'say': 'sey',
  'says': 'sez',
  'saying': 'sey-ing',
  'said': 'sed',
  'listen': 'lis-en',
  'listens': 'lis-enz',
  'listening': 'lis-en-ing',
  'listened': 'lis-end',
  'hear': 'heer',
  'hears': 'heerz',
  'hearing': 'heer-ing',
  'heard': 'herd',
  'see': 'see',
  'sees': 'seez',
  'seeing': 'see-ing',
  'saw': 'saw',
  'seen': 'seen',
  'look': 'look',
  'looks': 'looks',
  'looking': 'look-ing',
  'looked': 'lookt',
  'find': 'faynd',
  'finds': 'fayndz',
  'finding': 'faynd-ing',
  'found': 'fownd',
  'give': 'giv',
  'gives': 'givz',
  'giving': 'giv-ing',
  'gave': 'geyv',
  'given': 'giv-en',
  'take': 'teyk',
  'takes': 'teyks',
  'taking': 'teyk-ing',
  'took': 'took',
  'taken': 'teyk-en',
  'bring': 'bring',
  'brings': 'bringz',
  'bringing': 'bring-ing',
  'brought': 'brawt',
  'come': 'kam',
  'comes': 'kamz',
  'coming': 'kam-ing',
  'came': 'keym',
  'go': 'goh',
  'goes': 'gohz',
  'going': 'goh-ing',
  'went': 'went',
  'gone': 'gon',
  'run': 'ran',
  'runs': 'ranz',
  'running': 'ran-ing',
  'ran': 'ren',
  'stop': 'stop',
  'stops': 'stops',
  'stopping': 'stop-ing',
  'stopped': 'stopt',
  'start': 'stahrt',
  'starts': 'stahrts',
  'starting': 'stahrt-ing',
  'started': 'stahr-tid',
  'finish': 'fin-ish',
  'finishes': 'fin-ish-iz',
  'finishing': 'fin-ish-ing',
  'finished': 'fin-isht',
  'try': 'tray',
  'tries': 'trayz',
  'trying': 'tray-ing',
  'tried': 'trayd',
  'wait': 'weyt',
  'waits': 'weyts',
  'waiting': 'weyt-ing',
  'waited': 'wey-tid',
  'love': 'lav',
  'loves': 'lavz',
  'loving': 'lav-ing',
  'loved': 'lavd',
  'hate': 'heyt',
  'hates': 'heyts',
  'hating': 'heyt-ing',
  'hated': 'hey-tid',
  'miss': 'mis',
  'misses': 'mis-iz',
  'missing': 'mis-ing',
  'missed': 'mist',
  'forget': 'for-get',
  'forgets': 'for-gets',
  'forgetting': 'for-get-ing',
  'forgot': 'for-got',
  'forgotten': 'for-got-en',
  'remember': 'ree-mem-ber',
  'remembers': 'ree-mem-berz',
  'remembering': 'ree-mem-ber-ing',
  'remembered': 'ree-mem-berd',
  'break': 'breyk',
  'breaks': 'breyks',
  'breaking': 'breyk-ing',
  'broke': 'brohk',
  'broken': 'broh-ken',
  'care': 'kair',
  'cares': 'kairz',
  'caring': 'kair-ing',
  'cared': 'kaird',
  'hurt': 'hert',
  'hurts': 'herts',
  'hurting': 'hert-ing',
  'cry': 'kray',
  'cries': 'krayz',
  'crying': 'kray-ing',
  'cried': 'krayd',
  'smile': 'smayl',
  'smiles': 'smaylz',
  'smiling': 'smayl-ing',
  'smiled': 'smayld',
  'laugh': 'laf',
  'laughs': 'lafs',
  'laughing': 'laf-ing',
  'laughed': 'laft',
  'sleep': 'sleep',
  'sleeps': 'sleeps',
  'sleeping': 'sleep-ing',
  'slept': 'slept',
  'wake': 'weyk',
  'wakes': 'weyks',
  'waking': 'weyk-ing',
  'woke': 'wohk',
  'woken': 'woh-ken',
  'live': 'liv',
  'lives': 'livz',
  'living': 'liv-ing',
  'lived': 'livd',
  'die': 'day',
  'dies': 'dayz',
  'dying': 'day-ing',
  'died': 'dayd',
  'buy': 'bay',
  'buys': 'bayz',
  'buying': 'bay-ing',
  'bought': 'bawt',
  'sell': 'sel',
  'sells': 'selz',
  'selling': 'sel-ing',
  'sold': 'sohld',
  'spend': 'spend',
  'spends': 'spendz',
  'spending': 'spend-ing',
  'spent': 'spent',
  'save': 'seyv',
  'saves': 'seyvz',
  'saving': 'seyv-ing',
  'saved': 'seyvd',
  'lose': 'looz',
  'loses': 'looz-iz',
  'losing': 'looz-ing',
  'lost': 'lost',
  'win': 'win',
  'wins': 'winz',
  'winning': 'win-ing',
  'won': 'wan',
  'fall': 'fawl',
  'falls': 'fawlz',
  'falling': 'fawl-ing',
  'fell': 'fel',
  'fallen': 'faw-len',
  'trust': 'trast',
  'trusts': 'trasts',
  'trusting': 'trast-ing',
  'trusted': 'tras-tid',
  'forgive': 'for-giv',
  'forgives': 'for-givz',
  'forgiving': 'for-giv-ing',
  'forgave': 'for-geyv',
  'forgiven': 'for-giv-en',
  'blame': 'bleym',
  'blames': 'bleymz',
  'blaming': 'bleym-ing',
  'blamed': 'bleymd',
  'judge': 'jaj',
  'judges': 'jaj-iz',
  'judging': 'jaj-ing',
  'judged': 'jajd',
  'matter': 'mat-ter',
  'matters': 'mat-terz',
  'mattering': 'mat-ter-ing',
  'mattered': 'mat-terd',
  'mind': 'maynd',
  'minds': 'mayndz',
  'minding': 'maynd-ing',
  'minded': 'mayn-did',
  'handle': 'hen-del',
  'handles': 'hen-delz',
  'handling': 'hen-dling',
  'handled': 'hen-deld',
  'figure': 'fig-yer',
  'figures': 'fig-yerz',
  'figuring': 'fig-yer-ing',
  'figured': 'fig-yerd',
  'keep': 'keep',
  'keeps': 'keeps',
  'keeping': 'keep-ing',
  'kept': 'kept',
  'hold': 'hohld',
  'holds': 'hohldz',
  'holding': 'hohld-ing',
  'held': 'held',
  'let': 'let',
  'lets': 'lets',
  'letting': 'let-ing',
  'put': 'poot',
  'puts': 'poots',
  'putting': 'poot-ing',
  'set': 'set',
  'sets': 'sets',
  'setting': 'set-ing',
  'ask': 'esk',
  'asks': 'esks',
  'asking': 'esk-ing',
  'asked': 'eskt',
  'answer': 'en-ser',
  'answers': 'en-serz',
  'answering': 'en-ser-ing',
  'answered': 'en-serd',
  'show': 'shoh',
  'shows': 'shohz',
  'showing': 'shoh-ing',
  'showed': 'shohd',
  'shown': 'shohn',
  'stand': 'stend',
  'stands': 'stendz',
  'standing': 'stend-ing',
  'stood': 'stood',
  'move': 'moov',
  'moves': 'moovz',
  'moving': 'moov-ing',
  'moved': 'moovd',
  'play': 'pley',
  'plays': 'pleyz',
  'playing': 'pley-ing',
  'played': 'pleyd',
  'walk': 'wawk',
  'walks': 'wawks',
  'walking': 'wawk-ing',
  'walked': 'wawkt',
  'drive': 'drayv',
  'drives': 'drayvz',
  'driving': 'drayv-ing',
  'drove': 'drohv',
  'driven': 'driv-en',
  'call': 'kawl',
  'calls': 'kawlz',
  'calling': 'kawl-ing',
  'called': 'kawld',

  // Adjectives & Feelings (Indonesian Lidah Optimized)
  'happy': 'hep-pi',
  'sad': 'sed',
  'angry': 'eng-gri',
  'mad': 'med',
  'tired': 'tay-erd',
  'exhausted': 'eg-zaws-tid',
  'bored': 'bohrd',
  'busy': 'biz-ee',
  'free': 'free',
  'alone': 'uh-lohn',
  'lonely': 'lohn-lee',
  'scared': 'skaird',
  'afraid': 'uh-freyd',
  'nervous': 'ner-vas',
  'excited': 'ek-say-tid',
  'proud': 'prowd',
  'confused': 'kon-fyoozd',
  'surprised': 'ser-prayzd',
  'shocked': 'shokt',
  'curious': 'kyoor-ee-as',
  'jealous': 'jel-as',
  'guilty': 'gil-tee',
  'comfortable': 'kamf-ter-bel',
  'uncomfortable': 'an-kamf-ter-bel',
  'awkward': 'awk-werd',
  'weird': 'weerd',
  'crazy': 'krey-zee',
  'silly': 'sil-ee',
  'stupid': 'stoo-pid',
  'smart': 'smahrt',
  'kind': 'kaynd',
  'rude': 'rood',
  'polite': 'poh-layt',
  'honest': 'on-ist',
  'fake': 'feyk',
  'toxic': 'tok-sik',
  'worth': 'werth',
  'worthy': 'wer-thee',
  'easy': 'ee-zee',
  'hard': 'hahrd',
  'difficult': 'dif-ih-kalt',
  'simple': 'sim-pel',
  'safe': 'seyf',
  'dangerous': 'deyn-jer-as',
  'expensive': 'ek-spen-siv',
  'cheap': 'cheep',
  'clean': 'kleen',
  'dirty': 'der-tee',
  'beautiful': 'byoo-tih-ful',
  'handsome': 'hen-sam',
  'cool': 'kool',
  'good': 'good',
  'bad': 'bed',
  'better': 'bet-ter',
  'worse': 'wers',
  'best': 'best',
  'worst': 'werst',
  'real': 'ree-el',
  'true': 'troo',
  'false': 'fawls',
  'wrong': 'rong',
  'right': 'rayt',
  'ready': 'red-ee',
  'late': 'leyt',
  'early': 'er-lee',
  'fast': 'fest',
  'slow': 'sloh',
  'sweet': 'sweet',
  'cute': 'kyoot',
  'pretty': 'prit-ee',
  'trace': 'treys',
  'traced': 'treyst',
  'tracing': 'treys-ing',
  'wife': 'wayf',
  'wives': 'wayvz',
  'husband': 'haz-band',
  'soul': 'sohl',
  'souls': 'sohlz',
  'light': 'layt',
  'lights': 'layts',
  'colleague': 'kol-eeg',
  'colleagues': 'kol-eegz',
  'pointed': 'poyn-tid',
  'point': 'poynt',
  'situation': 'sich-oo-ey-shun',
  'takeaway': 'teyk-uh-wey',
  'break': 'breyk',
  'breaks': 'breyks',
  'breaking': 'breyk-ing',
  'broken': 'broh-ken',
  'little': 'lit-el',
  'small': 'smawl',
  'big': 'big',
  'great': 'greyt',
  'fine': 'fayn',
  'okay': 'oh-key',
  'ok': 'oh-key',
  'nice': 'nays',
  'hot': 'hot',
  'cold': 'kohld',
  'warm': 'wahrm',
  'fresh': 'fresh',
  'young': 'yang',
  'old': 'ohld',
  'new': 'noo',
  'deep': 'deep',
  'high': 'hay',
  'low': 'loh',
  'dark': 'dahrk',
  'light': 'layt',
  'strong': 'strong',
  'weak': 'week',
  'clear': 'kleer',
  'loud': 'lowd',
  'quiet': 'kway-et',
  'silent': 'say-lent',

  // Core Nouns (Conversational, Music & Movie Themes)
  'heart': 'hahrt',
  'soul': 'sohl',
  'mind': 'maynd',
  'head': 'hed',
  'eye': 'ay',
  'eyes': 'ayz',
  'face': 'feys',
  'hand': 'hend',
  'hands': 'hendz',
  'voice': 'voys',
  'word': 'werd',
  'words': 'werdz',
  'song': 'song',
  'songs': 'songz',
  'music': 'myoo-zik',
  'track': 'trek',
  'verse': 'vers',
  'line': 'layn',
  'life': 'layf',
  'world': 'werld',
  'time': 'taym',
  'day': 'dey',
  'days': 'deyz',
  'night': 'nayt',
  'nights': 'nayts',
  'morning': 'mohr-ning',
  'evening': 'eev-ning',
  'home': 'hohm',
  'house': 'hows',
  'friend': 'frend',
  'friends': 'frendz',
  'people': 'pee-pel',
  'person': 'per-son',
  'girl': 'gerl',
  'boy': 'boy',
  'man': 'men',
  'men': 'men',
  'woman': 'woo-man',
  'women': 'wim-in',
  'guy': 'gay',
  'guys': 'gayz',
  'baby': 'bey-bee',
  'honey': 'han-ee',
  'darling': 'dahr-ling',
  'lover': 'lav-er',
  'partner': 'pahrt-ner',
  'story': 'stohr-ee',
  'secret': 'see-krit',
  'truth': 'trooth',
  'lie': 'lay',
  'lies': 'layz',
  'liar': 'lay-er',
  'pain': 'peyn',
  'tear': 'teer',
  'tears': 'teerz',
  'dream': 'dreem',
  'dreams': 'dreemz',
  'hope': 'hohp',
  'hopes': 'hohps',
  'fear': 'feer',
  'fears': 'feerz',
  'way': 'wey',
  'place': 'pleys',
  'thing': 'thing',
  'things': 'thingz',
  'idea': 'eye-dee-uh',
  'point': 'poynt',
  'problem': 'prob-lem',
  'question': 'kwes-chun',
  'answer': 'en-ser',
  'reason': 'ree-zen',
  'part': 'pahrt',
  'side': 'sayd',
  'moment': 'moh-ment',
  'memory': 'mem-ree',
  'memories': 'mem-reez',
  'coffee': 'kof-ee',
  'rain': 'reyn',
  'sun': 'san',
  'moon': 'moon',
  'star': 'stahr',
  'stars': 'stahrz',
  'sky': 'skay',
  'road': 'rohd',
  'street': 'street',
  'car': 'kahr',
  'door': 'dohr',
  'room': 'room',

  // Common Adverbs & Intensifiers
  'really': 'reel-lee',
  'always': 'awl-weyz',
  'never': 'nev-er',
  'often': 'awf-ten',
  'sometimes': 'sam-taymz',
  'seldom': 'sel-dam',
  'rarely': 'rair-lee',
  'almost': 'awl-mohst',
  'already': 'awl-red-ee',
  'still': 'stil',
  'yet': 'yet',
  'just': 'jast',
  'only': 'ohn-lee',
  'very': 'ver-ee',
  'too': 'too',
  'also': 'awl-soh',
  'even': 'ee-ven',
  'well': 'wel',
  'back': 'bek',
  'away': 'uh-wey',
  'again': 'uh-gen',
  'together': 'tuh-geth-er',
  'forever': 'for-ev-er',
  'now': 'now',
  'here': 'heer',
  'there': 'thair',
  'today': 'tuh-dey',
  'tonight': 'tuh-nayt',
  'tomorrow': 'tuh-mah-roh',
  'yesterday': 'yes-ter-dey',
  'maybe': 'mey-bee',
  'perhaps': 'per-heps',
  'probably': 'prob-uh-blee',
  'definitely': 'def-ih-nit-lee',
  'literally': 'lit-er-uh-lee',
  'actually': 'ek-choo-uh-lee',
  'basically': 'bey-sik-lee',
  'honestly': 'on-ist-lee',
  'totally': 'toh-tuh-lee',
  'absolutely': 'eb-soh-loot-lee',
  'suddenly': 'sad-en-lee',
  'finally': 'fayn-uh-lee',
  'enough': 'ee-naf',
  'quite': 'kwayt',
  'rather': 'rath-er'
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. UNIFIED PHONETIC GENERATOR (INDONESIAN TONGUE FRIENDLY & ANTI-EMPTY)
// ══════════════════════════════════════════════════════════════════════════════
export function generatePhonetics(word) {
  if (!word) return '';
  const clean = word.toLowerCase().replace(/[^a-z']/g, '').trim();
  if (!clean) return word.toLowerCase();

  // 1. Direct dictionary match (Priority #1)
  if (PHONETIC_DICT[clean]) return PHONETIC_DICT[clean];

  // 2. Multi-stage phonetic transformation rules
  let res = clean;

  // Suffixes transformation
  res = res
    .replace(/tion\b/g, 'shun')
    .replace(/sion\b/g, 'zhun')
    .replace(/ture\b/g, 'cher')
    .replace(/ous\b/g, 'us')
    .replace(/able\b/g, 'uh-bel')
    .replace(/ible\b/g, 'ih-bel')
    .replace(/ness\b/g, 'nes')
    .replace(/ment\b/g, 'ment')
    .replace(/less\b/g, 'les')
    .replace(/ful\b/g, 'ful')
    .replace(/ing\b/g, 'ing')
    .replace(/ed\b/g, 'd')
    .replace(/ly\b/g, 'lee')
    .replace(/age\b/g, 'ij')
    .replace(/er\b/g, 'er');

  // Digraphs & consonant clusters
  res = res
    .replace(/ough/g, 'aw')
    .replace(/augh/g, 'aw')
    .replace(/ight/g, 'ayt')
    .replace(/ph/g, 'f')
    .replace(/kn/g, 'n')
    .replace(/wr/g, 'r')
    .replace(/wh/g, 'w')
    .replace(/ck/g, 'k')
    .replace(/gh/g, 'f');

  // Vowel combinations
  res = res
    .replace(/ee/g, 'ee')
    .replace(/ea/g, 'ee')
    .replace(/oo/g, 'oo')
    .replace(/ai/g, 'ey')
    .replace(/ay/g, 'ey')
    .replace(/oi/g, 'oy')
    .replace(/oy/g, 'oy')
    .replace(/ou/g, 'ow')
    .replace(/ow/g, 'ow');

  // Long vowel + consonant + silent e (trace -> treys, wife -> wayf, space -> speys)
  res = res
    .replace(/([bcdfghjklmnpqrstvwxyz])ace\b/g, '$1eys')
    .replace(/([bcdfghjklmnpqrstvwxyz])ice\b/g, '$1ays')
    .replace(/([bcdfghjklmnpqrstvwxyz])ife\b/g, '$1ayf')
    .replace(/([bcdfghjklmnpqrstvwxyz])ide\b/g, '$1ayd')
    .replace(/([bcdfghjklmnpqrstvwxyz])ine\b/g, '$1ayn')
    .replace(/([bcdfghjklmnpqrstvwxyz])ite\b/g, '$1ayt')
    .replace(/([bcdfghjklmnpqrstvwxyz])ike\b/g, '$1ayk')
    .replace(/([bcdfghjklmnpqrstvwxyz])ave\b/g, '$1eyv')
    .replace(/([bcdfghjklmnpqrstvwxyz])ake\b/g, '$1eyk')
    .replace(/([bcdfghjklmnpqrstvwxyz])ate\b/g, '$1eyt')
    .replace(/([bcdfghjklmnpqrstvwxyz])ame\b/g, '$1eym')
    .replace(/([bcdfghjklmnpqrstvwxyz])ale\b/g, '$1eyl')
    .replace(/([bcdfghjklmnpqrstvwxyz])one\b/g, '$1ohn')
    .replace(/([bcdfghjklmnpqrstvwxyz])oke\b/g, '$1ohk')
    .replace(/([bcdfghjklmnpqrstvwxyz])ope\b/g, '$1ohp')
    .replace(/([bcdfghjklmnpqrstvwxyz])ote\b/g, '$1oht')
    .replace(/([bcdfghjklmnpqrstvwxyz])ose\b/g, '$1ohz');

  // Closed syllables with short 'a' -> 'e' (angry -> eng-gri, bad -> bed, cat -> ket)
  res = res
    .replace(/\ba([bcdfghjklmnpqrstvwxyz]{1,2})\b/g, 'e$1')
    .replace(/([bcdfghjklmnpqrstvwxyz])a([bcdfghjklmnpqrstvwxyz]{1,2})\b/g, '$1e$2');

  // Guaranteed non-empty fallback
  return res || clean;
}

// Generate phonetic breakdown for multi-word sentences with internal anti-empty self-test
export function generateSentencePhonetics(sentence) {
  if (!sentence || typeof sentence !== 'string') return '';
  const words = sentence.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';

  const phonetics = words.map(w => {
    const clean = w.replace(/[^a-zA-Z']/g, '').toLowerCase();
    if (!clean) return '';
    const ph = generatePhonetics(clean);
    // Requirement C3.5: Never return empty string, fallback to original word clean
    return (ph && ph.trim().length > 0) ? ph.trim() : clean;
  }).filter(Boolean);

  const result = phonetics.join(' ');
  return result && result.trim().length > 0 ? result.trim() : sentence.toLowerCase();
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. CONVERSATIONAL VOCAB MAPPING (STRICTLY GW / LU & GEN Z EDITION)
// ══════════════════════════════════════════════════════════════════════════════
export const VOCAB_MAP = {
  // Verbs & Actions
  'make': 'bikin / membuat',
  'makes': 'bikin / membuat',
  'making': 'bikin / membuat',
  'feel': 'ngerasa / merasa',
  'feels': 'ngerasa / merasa',
  'feeling': 'merasa / perasaan',
  'think': 'mikir / mengira',
  'thinking': 'lagi mikir',
  'know': 'tau / paham',
  'knowing': 'mengetahui',
  'want': 'pengen / mau',
  'wants': 'pengen / mau',
  'need': 'butuh / perlu',
  'needs': 'butuh / perlu',
  'leave': 'pergi / ninggalin',
  'stay': 'tetap / bertahan',
  'change': 'berubah / mengganti',
  'help': 'bantu / menolong',
  'talk': 'ngobrol / bicara',
  'tell': 'ngasih tau / bilang',
  'say': 'ngomong / bilang',
  'listen': 'dengerin / menyimak',
  'hear': 'denger',
  'see': 'liat / melihat',
  'look': 'liat / tampak',
  'find': 'nemuin / mencari',
  'give': 'ngasih / memberi',
  'take': 'ngambil / memakan waktu',
  'bring': 'bawa / ngebawa',
  'come': 'datang / mampir',
  'go': 'pergi / berangkat',
  'run': 'lari / mengoperasikan',
  'stop': 'berhenti / nyetop',
  'start': 'mulai / mengawali',
  'finish': 'nyelesaiin / kelar',
  'try': 'nyoba / berusaha',
  'trying': 'lagi berusaha',
  'wait': 'nunggu / sabar',
  'waiting': 'lagi nunggu',
  'love': 'cinta / suka banget',
  'hate': 'benci / kesel banget',
  'miss': 'kangen / melewatkan',
  'forget': 'lupa / ngelupain',
  'remember': 'inget / mengingat',
  'break': 'rusak / patah / istirahat',
  'care': 'peduli / perhatian',
  'hurt': 'sakit / melukai',
  'cry': 'nangis',
  'crying': 'lagi nangis',
  'smile': 'senyum',
  'laugh': 'ketawa',
  'sleep': 'tidur',
  'wake': 'bangun',
  'live': 'hidup / tinggal',
  'die': 'mati / pupus',
  'buy': 'beli',
  'sell': 'jual',
  'spend': 'ngabisin uang/waktu',
  'save': 'nyimpen / nabung',
  'lose': 'kehilangan / kalah',
  'win': 'menang',
  'fall': 'jatuh',
  'trust': 'percaya / mempercayai',
  'forgive': 'memaafkan',
  'blame': 'nyalahin / menuduh',
  'judge': 'nge-judge / menghakimi',
  'matter': 'berpengaruh / berarti',
  'mind': 'keberatan / pikiran',
  'handle': 'ngatasin / mengurusi',
  'trace': 'melacak / menelusuri / jejak',
  'wife': 'istri',
  'husband': 'suami',
  'figure out': 'mencari jalan keluar / memecahkan',
  'owe': 'berutang / berhak memberi',
  'owing': 'berutang',
  'owe yourself': 'berutang pada diri sendiri / berhak memprioritaskan diri sendiri',
  'yourself': 'diri lu sendiri',
  'myself': 'diri gw sendiri',
  'himself': 'dirinya sendiri',
  'herself': 'dirinya sendiri',
  'ourselves': 'diri kita sendiri',
  'themselves': 'diri mereka sendiri',

  // Adjectives & Feelings
  'happy': 'bahagia / seneng',
  'sad': 'sedih / galau',
  'angry': 'marah / kesel',
  'mad': 'kesel / emosi',
  'tired': 'capek / lelah',
  'exhausted': 'capek banget / burnout',
  'bored': 'bosen / jenuh',
  'busy': 'sibuk / repot',
  'free': 'luang / gratis',
  'alone': 'sendirian / kesepian',
  'lonely': 'kesepian / hampa',
  'scared': 'takut / ngeri',
  'afraid': 'takut / khawatir',
  'nervous': 'gugup / deg-degan',
  'excited': 'antusias / semangat banget',
  'proud': 'bangga',
  'confused': 'bingung / rancu',
  'surprised': 'kaget / terkejut',
  'shocked': 'kaget parah / shock',
  'curious': 'penasaran / kepo',
  'jealous': 'cemburu / iri',
  'guilty': 'merasa bersalah',
  'comfortable': 'nyaman / pewe',
  'uncomfortable': 'gak nyaman / risih',
  'awkward': 'canggung / awkward',
  'weird': 'aneh / ganjil',
  'crazy': 'gila / takjub',
  'silly': 'konyol / lucu',
  'stupid': 'bodoh / ceroboh',
  'smart': 'pinter / cerdas',
  'kind': 'baik hati / ramah',
  'rude': 'kasar / gak sopan',
  'polite': 'sopan',
  'honest': 'jujur / apa adanya',
  'fake': 'palsu / munafik',
  'toxic': 'beracun / toxic',
  'worth it': 'sepadan / worth it',
  'easy': 'gampang / santai',
  'hard': 'susah / berat',
  'difficult': 'sulit / rumit',
  'simple': 'sederhana / simpel',
  'safe': 'aman',
  'dangerous': 'berbahaya / bahaya',
  'expensive': 'mahal',
  'cheap': 'murah',
  'clean': 'bersih',
  'dirty': 'kotor',
  'beautiful': 'cantik / indah',
  'handsome': 'ganteng',
  'cool': 'keren / asik',
  'good': 'bagus / baik',
  'bad': 'buruk / jelek',
  'better': 'lebih baik',
  'worse': 'lebih buruk / makin parah',
  'best': 'terbaik',
  'worst': 'terburuk',
  'real': 'nyata / asli',
  'true': 'bener / sejati',
  'false': 'salah / palsu',
  'wrong': 'salah / keliru',
  'right': 'bener / tepat',
  'ready': 'siap',
  'late': 'terlambat / telat',
  'early': 'pagi-pagi / lebih awal',
  'fast': 'cepet',
  'slow': 'lambat / pelan',

  // Pronouns & Modals (Consistent gw/lu)
  'you': 'lu',
  'me': 'gw',
  'i': 'gw',
  'my': 'punya gw',
  'mine': 'punya gw',
  'myself': 'diri gw sendiri',
  'we': 'kita',
  'they': 'mereka',
  'he': 'dia (cowok)',
  'she': 'dia (cewek)',
  'it': 'itu / hal tersebut',
  'this': 'ini',
  'that': 'itu',
  'someone': 'seseorang',
  'anyone': 'siapa pun',
  'everyone': 'semua orang',
  'no one': 'gak ada orang',
  'something': 'sesuatu',
  'anything': 'apa pun',
  'everything': 'segalanya / semuanya',
  'nothing': 'bukan apa-apa / gak ada apa-apa',
  'can': 'bisa',
  'could': 'bisa / sanggup',
  'will': 'bakal / akan',
  'would': 'akan / bakal',
  'should': 'harusnya / sebaiknya',
  'must': 'harus / kudu',
  'might': 'mungkin / bisa jadi',
  'may': 'boleh / mungkin'
};

// Word & Phrase translator helper
export function translateWordOrPhrase(text) {
  if (!text) return '';
  const clean = text.toLowerCase().trim();

  // Direct word match
  if (VOCAB_MAP[clean]) {
    return VOCAB_MAP[clean].split('/')[0].trim();
  }

  // Multi-word sequence match
  const words = clean.split(/\s+/);
  const translated = words.map(w => {
    const wClean = w.replace(/[^a-z']/gi, '');
    if (VOCAB_MAP[wClean]) {
      return VOCAB_MAP[wClean].split('/')[0].trim();
    }
    return w;
  });

  return translated.join(' ');
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. COMMON CONVERSATIONAL QUESTION & STATEMENT PATTERNS
// ══════════════════════════════════════════════════════════════════════════════
const PATTERNS = [
  {
    regex: /^does it make you\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Apakah hal itu beneran bikin lu ${translateWordOrPhrase(target)}?`;
    },
    note: (match) => `Tbh ini salah satu pertanyaan reflektif yang paling sering ditanyain temen deket pas lu lagi bimbang milih keputusan hidup atau hubungan — which is cocok banget buat memvalidasi perasaan lu!`,
    maknaFilosofis: () => `Secara emosional, pertanyaan ini mengajak lu buat berhenti sejenak dari logika dan ngecek kondisi batin lu sendiri. Kadang kita sibuk mikirin apa kata orang lain, sampe lupa nanya ke diri sendiri: apakah hal ini beneran bikin kita bahagia atau cuma tuntutan sosial semata?`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      const indo = translateWordOrPhrase(target);
      return [
        `"If changing your career doesn't make you ${target}, you should reconsider it." ("Kalau pindah karir gak bikin lu ${indo}, mending lu pikir-pikir lagi deh.")`,
        `"At the end of the day, you gotta ask yourself: does it make you ${target}?" ("Pada akhirnya, lu cuma perlu nanya ke diri sendiri: apakah hal itu beneran bikin lu ${indo}?")`,
        `"I know it pays well, but does it make you ${target}?" ("Gw tau gajinya gede, tapi apakah itu beneran bikin lu ${indo}?")`
      ];
    }
  },
  {
    regex: /^does that make sense\??$/i,
    arti: () => `Apakah penjelasan tadi masuk akal buat lu? / Paham kan maksud gw?`,
    note: () => `As you know, frasa ini paling sering dipake native speaker setelah ngejelasin sesuatu yang panjang biar obrolannya tetap dua arah dan gak terkesan menggurui. Jauh lebih humble daripada nanya "Do you understand?".`,
    maknaFilosofis: () => `Dalam psikologi komunikasi, frasa ini mencerminkan rasa hormat dan empati kepada lawan bicara. Lu memastikan bahwa pemikiran lu tersampaikan dengan baik tanpa meremehkan pemahaman orang lain, so basically obrolan jadi jauh lebih setara dan nyaman.`,
    examples: () => [
      `"We need to finish phase one before moving to phase two, does that make sense?" ("Kita kudu nyelesaiin tahap satu dulu sebelum masuk ke tahap dua, masuk akal kan?")`,
      `"I tried to explain it simply, let me know if that makes sense." ("Gw coba jelasin sesimpel mungkin, kabarin ya kalo ada yang kurang masuk akal.")`,
      `"Does that make sense or should I break it down again?" ("Masuk akal gak penjelasannya atau perlu gw jabarin lagi?")`
    ]
  },
  {
    regex: /^why would you\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Kenapa coba lu ${translateWordOrPhrase(target)}? / Atas alasan apa lu ngelakuin itu?`;
    },
    note: () => `Honestly, ini ekspresi spontan yang keluar pas lu heran atau kaget liat temen ngambil keputusan aneh atau berisiko tinggi. Nada bicaranya bisa playful atau beneran cemas tergantung situasi!`,
    maknaFilosofis: () => `Kalimat ini sering muncul saat ada benturan antara ekspektasi dan realita tindakan seseorang. Secara emosional, ada rasa peduli yang dibungkus dengan nada heran, mempertanyakan motif terdalam di balik keputusan yang diambil.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      const indo = translateWordOrPhrase(target);
      return [
        `"Why would you do that without telling anyone?" ("Kenapa coba lu ngelakuin itu tanpa bilang ke siapa pun?")`,
        `"Why would you stay in a toxic relationship?" ("Kenapa coba lu masih bertahan di hubungan yang beracun?")`,
        `"A: 'I bought five of these.' — B: 'Why would you do that?!' (A: 'Gw beli lima barang ginian.' — B: 'Kenapa coba lu beli sebanyak itu?!')"`
      ];
    }
  },
  {
    regex: /^what do you mean by\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Maksud lu gimana dengan "${target}"? / Apa maksud dari omongan lu tadi?`;
    },
    note: () => `Tbh ini cara klarifikasi yang to-the-point tapi tetep sopan saat lu butuh penjelasan lebih detail biar gak terjadi overthinking atau salah paham di antara kalian.`,
    maknaFilosofis: () => `Klarifikasi adalah kunci kesehatan mental dalam komunikasi. Daripada bikin asumsi sendiri yang berujung salah sangka, bertanya secara terbuka menunjukkan kedewasaan lu buat mendengar penjelasan yang jujur.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `"Wait, what do you mean by that?" ("Tunggu dulu, maksud lu gimana tuh?")`,
        `"What do you mean by saying we are out of time?" ("Apa maksud lu pas bilang kalau kita udah kehabisan waktu?")`,
        `"Could you clarify? What do you mean by that remark?" ("Bisa diperjelas gak? Maksud lu gimana dengan komentar tadi?")`
      ];
    }
  },
  {
    regex: /^how does it feel to\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Gimana rasanya ${translateWordOrPhrase(target)}?`;
    },
    note: () => `Nah ini nih salah satu pertanyaan paling empatik yang bisa lu tanyain ke sahabat pas mereka lagi ngalamin momen penting dalam hidupnya!`,
    maknaFilosofis: () => `Pertanyaan ini membuka ruang vulnerabilitas (kerentanan emosi) yang indah. Lawan bicara diajak buat berbagi pengalaman batin yang mendalam, bukan sekadar menceritakan kronologi kejadian faktual.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      const indo = translateWordOrPhrase(target);
      return [
        `"How does it feel to finally graduate after all the hard work?" ("Gimana rasanya akhirnya bisa wisuda setelah semua kerja keras kemarin?")`,
        `"How does it feel to live in a new city all by yourself?" ("Gimana rasanya tinggal di kota baru bener-bener sendirian?")`,
        `"Tell me honestly, how does it feel to be free?" ("Cerita jujur dong ke gw, gimana rasanya akhirnya bisa lepas dan bebas?")`
      ];
    }
  },
  {
    regex: /^what if\s+(.+?)\??$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Gimana kalau ${translateWordOrPhrase(target)}? / Seandainya ${translateWordOrPhrase(target)}, gimana?`;
    },
    note: () => `So basically, frasa ini adalah 'pintu gerbang' imajinasi dan overthinking anak muda jam 2 pagi. Sering dipake buat eksplorasi ide liar atau ketakutan yang belum terjadi.`,
    maknaFilosofis: () => `Secara psikologis, 'what if' adalah pedang bermata dua: bisa jadi pemicu kecemasan atas hal-hal yang belum tentu terjadi, tapi bisa juga jadi katalis keberanian buat mengambil lompatan hidup baru (leap of faith).`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `"What if things don't go as planned?" ("Gimana kalau nanti rencananya gak berjalan sesuai harapan?")`,
        `"What if we take the risk and start now?" ("Gimana kalau kita ambil risikonya dan mulai dari sekarang?")`,
        `"What if this is the sign we've been waiting for?" ("Gimana kalau ini emang tanda yang selama ini kita tunggu-tunggu?")`
      ];
    }
  },
  {
    regex: /^are you sure\s*(?:about\s+(.+?))?\??$/i,
    arti: (match) => {
      const target = match[1] ? match[1].replace(/[\?\.!]+$/, '').trim() : '';
      return target ? `Lu yakin tentang ${translateWordOrPhrase(target)}?` : `Lu yakin beneran nih?`;
    },
    note: () => `Real talk, kalimat ini dipakai buat memastikan kembali komitmen atau keputusan penting agar lawan bicara gak nyesel belakangan.`,
    maknaFilosofis: () => `Frasa ini adalah jeda refleksi penting sebelum mengambil keputusan permanen. Memberikan ruang sejenak bagi lawan bicara untuk menimbang kembali konsekuensi jangka panjangnya.`,
    examples: () => [
      `"Are you sure about your decision?" ("Lu beneran udah yakin sama keputusan lu?")`,
      `"Are you sure we are heading the right way?" ("Lu yakin kita lewat jalan yang bener?")`,
      `"Before we sign, are you absolutely sure?" ("Sebelum kita tanda tangan, lu udah yakin 100%?")`
    ]
  },
  {
    regex: /^it is not what it looks like$/i,
    arti: () => `Ini gak kayak yang lu liat / jangan salah paham dulu!`,
    note: () => `Literally kalimat paling dramatis di film Hollywood pas ada karakter ketahuan basah di situasi canggung padahal ada penjelasan logis di baliknya wkwk.`,
    maknaFilosofis: () => `Kutipan ini menyoroti kerapuhan persepsi visual: apa yang terlihat di permukaan belum tentu mencerminkan kebenaran yang sesungguhnya. Selalu ada cerita di balik layar yang perlu didengar.`,
    examples: () => [
      `"Hold on, don't get mad, it is not what it looks like!" ("Tahan dulu jangan emosi, ini gak kayak yang lu liat kok!")`,
      `"I can explain everything, it is not what it looks like." ("Gw bisa jelasin semuanya, jangan salah paham dulu.")`,
      `"I swear, it is not what it looks like at all." ("Sumpah deh, ini sama sekali gak kayak yang ada di pikiran lu.")`
    ]
  },
  {
    regex: /^let me know if\s+(.+?)$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Kabarin gw ya kalau ${translateWordOrPhrase(target)}`;
    },
    note: () => `Frasa penutup yang super warm dan sopan dalam obrolan chat maupun email. Bikin lawan bicara ngerasa lu selalu siap bantu kapan aja.`,
    maknaFilosofis: () => `Menunjukkan ketersediaan emosional (emotional availability) tanpa memaksakan kehendak. Menjaga pintu komunikasi tetap terbuka dengan cara yang elegan dan menenangkan.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `"Let me know if you need any help with this task." ("Kabarin gw ya kalau lu butuh bantuan buat tugas ini.")`,
        `"Let me know if you are free this weekend." ("Kabarin gw ya kalau lu ada waktu luang weekend ini.")`,
        `"Let me know if anything changes." ("Kabarin gw ya kalau ada perkembangan atau perubahan apa pun.")`
      ];
    }
  },
  {
    regex: /^i don't think\s+(.+?)$/i,
    arti: (match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return `Menurut gw kayaknya gak ${translateWordOrPhrase(target)} / Gw ragu kalau ${translateWordOrPhrase(target)}`;
    },
    note: () => `Tbh ini cara elegan native speaker buat menyampaikan ketidaksetujuan secara halus tanpa menyinggung perasaan lawan bicara.`,
    maknaFilosofis: () => `Dalam etika diplomasi personal, menyampaikan ketidaksetujuan dengan lembut ("I don't think...") jauh lebih efektif daripada langsung membantah keras, karena menjaga ego lawan bicara tetap aman.`,
    examples: (orig, match) => {
      const target = match[1].replace(/[\?\.!]+$/, '').trim();
      return [
        `"I don't think that's a good idea right now." ("Menurut gw kayaknya itu bukan ide yang bagus buat saat ini.")`,
        `"I don't think we can make it on time." ("Kayaknya kita gak bakal kekejar tepat waktu deh.")`,
        `"Honestly, I don't think he meant to hurt you." ("Jujur ya, menurut gw dia gak ada niat sengaja nyakitin lu.")`
      ];
    }
  }
];

// ══════════════════════════════════════════════════════════════════════════════
// 5. SMART ANALYSIS GENERATOR (WITH VOCAB RATIO THRESHOLD & ZERO-SHORTCUT FALLBACK)
// ══════════════════════════════════════════════════════════════════════════════
export function generateSmartSentenceAnalysis(rawInput, exampleCount = 1, options = {}) {
  if (!rawInput || typeof rawInput !== 'string') return null;
  const input = rawInput.trim();
  if (!input) return null;
  const lower = input.toLowerCase();

  // Determine classifiedType (MASALAH 2 POIN 1)
  const classification = classifyText(input, options);
  const classifiedType = options?.classifiedType || classification.type;

  // 1. Check if matches any specific conversational pattern
  for (const p of PATTERNS) {
    const match = lower.match(p.regex);
    if (match) {
      const meaning = p.arti(match);
      const note = p.note(match);
      const maknaFilosofis = p.maknaFilosofis ? p.maknaFilosofis() : `Tbh kalimat ini mencerminkan dinamika komunikasi yang sangat natural di obrolan sehari-hari. Which is kenapa native speaker sering banget pake pola ini buat menjaga obrolan tetap hangat dan terbuka.`;
      const rawExamples = p.examples(input, match) || [];
      const sanitizedExamples = rawExamples
        .map(ex => validateAndSanitizeExample(ex, input, meaning))
        .slice(0, Math.max(1, exampleCount));
      const phonetics = generateSentencePhonetics(input);

      return {
        arti: meaning,
        cara_baca: phonetics,
        penggunaan: sanitizedExamples,
        catatan: note,
        maknaFilosofis: maknaFilosofis,
        confidenceLevel: 'high',
        isInstant: true,
        success: true
      };
    }
  }

  // 2. Vocabulary Match Ratio Calculation (C1 REQUIREMENT)
  // Prevents unrecognized words/gibberish (like "whirl-winds", "plowed") from taking the fake template shortcut!
  const words = input.split(/\s+/).filter(Boolean);
  let matchedCount = 0;
  for (const w of words) {
    const cleanWord = w.toLowerCase().replace(/[^a-z']/g, '');
    if (VOCAB_MAP[cleanWord] || PHONETIC_DICT[cleanWord]) {
      matchedCount++;
    }
  }

  const matchRatio = words.length > 0 ? matchedCount / words.length : 0;

  // Single unrecognized word -> MUST return null to trigger freeTranslator B2 validation!
  if (words.length === 1 && matchedCount === 0) {
    return null;
  }

  // Very low coverage (< 35%) -> DO NOT force fallback template! Return null to allow live translation.
  if (matchRatio < 0.35) {
    return null;
  }

  const translatedMeaning = translateWordOrPhrase(input);
  if (!translatedMeaning || translatedMeaning.toLowerCase().trim() === lower) {
    // English words were echoed without actual Indonesian translation! Return null to allow live translation.
    return null;
  }
  const phonetics = generateSentencePhonetics(input);

  // 3. Reflective / Philosophical check (e.g. fate, destiny, future, cross the line)
  const isReflective =
    /\b(fate|destiny|future|behind|cross(\s+the)?\s+line|hides|unknown|horizon|abyss|purpose|meaning|journey|path|choices?|fear|courage|hesitate|wonder|reflection|whisper|silence|darkness|universe|takdir|nasib|masa\s+depan|melewati\s+batas|merenung|filosofis)\b/i.test(
      lower
    ) || /\b(takdir|nasib|masa\s+depan|melewati\s+batas|merenung|filosofis)\b/i.test(translatedMeaning);

  if (isReflective && classifiedType !== 'movie' && classifiedType !== 'song') {
    const reflectivePool = [
      `"Reflecting quietly on what lies ahead, she whispered: '${input}'" ("Merenung tenang soal apa yang menanti di depan, dia berbisik: '${translatedMeaning}'")`,
      `"Standing before an unknown journey, you can say: '${input}'" ("Berdiri di hadapan perjalanan yang belum pasti, lu bisa bilang: '${translatedMeaning}'")`,
      `"In moments of deep personal reflection: '${input}'" ("Di momen perenungan diri yang mendalam: '${translatedMeaning}'")`,
      `"Contemplating the upcoming turn of events, I murmured: '${input}'" ("Merenungkan arah masa depan yang bakal terjadi, gw bergumam: '${translatedMeaning}'")`,
      `"When pondering the path ahead, she said: '${input}'" ("Pas lagi mikirin jalan di depan, dia bilang: '${translatedMeaning}'")`,
      `"Looking into the distance with a quiet heart: '${input}'" ("Menatap ke kejauhan dengan hati yang tenang: '${translatedMeaning}'")`,
    ];
    const picked = pickVariedTemplate('smart_reflective_pool', reflectivePool);
    const validated = validateAndSanitizeExample(picked, input, translatedMeaning);

    return {
      arti: translatedMeaning,
      cara_baca: phonetics,
      penggunaan: [validated].slice(0, Math.max(1, exampleCount)),
      catatan: generateDynamicRantauNote(input, translatedMeaning, 'reflective_philosophical', words.length),
      maknaFilosofis: generateDynamicMaknaFilosofis(input, translatedMeaning, 'reflective_philosophical', words.length),
      confidenceLevel: 'medium',
      isInstant: true,
      success: true
    };
  }

  // 4. Question Sentence Analysis (6 variations, clean & grounded)
  const isQuestion = input.endsWith('?') || /^(what|why|how|where|when|who|which|is|are|am|do|does|did|can|could|will|would|should|have|has|had)\b/i.test(input);

  if (isQuestion) {
    const questionPool = [
      `"Pausing for a second, she asked genuinely: '${input}'" ("Sempat terdiam sejenak, dia bertanya dengan tulus: '${translatedMeaning}'")`,
      `"Curious about what was happening, he asked: '${input}'" ("Penasaran sama apa yang lagi terjadi, dia nanya: '${translatedMeaning}'")`,
      `"A straightforward question you can naturally ask: '${input}'" ("Pertanyaan lugas yang bisa lu lontarkan secara alami: '${translatedMeaning}'")`,
      `"To clarify the situation without awkwardness, just ask: '${input}'" ("Biar situasinya jelas tanpa canggung, tinggal tanya: '${translatedMeaning}'")`,
      `"She turned around and wondered aloud: '${input}'" ("Dia noleh dan bertanya-tanya penasaran: '${translatedMeaning}'")`,
      `"In honest conversation, you might ask: '${input}'" ("Di obrolan yang jujur, lu bisa nanya: '${translatedMeaning}'")`,
    ];
    const picked = pickVariedTemplate('smart_question_pool', questionPool);
    const validated = validateAndSanitizeExample(picked, input, translatedMeaning);

    return {
      arti: translatedMeaning,
      cara_baca: phonetics,
      penggunaan: [validated].slice(0, Math.max(1, exampleCount)),
      catatan: generateDynamicRantauNote(input, translatedMeaning, 'casual_chill', words.length),
      maknaFilosofis: generateDynamicMaknaFilosofis(input, translatedMeaning, 'casual_chill', words.length),
      confidenceLevel: 'medium',
      isInstant: true,
      success: true
    };
  }

  // 5. Regular Statement or Phrase (High Confidence Only, Context-Aware Jaksel Tone)
  const isAngry = /angry|hate|annoyed|mad|pissed|toxic|benci|marah|kesel/i.test(lower) || /benci|marah|kesel/i.test(translatedMeaning);
  const isSad = /sad|cry|alone|lonely|hurt|tears|miss|sedih|nangis|kecewa|sepi/i.test(lower) || /sedih|nangis|kecewa/i.test(translatedMeaning);
  const isRomantic =
    /love|sweet|crush|heart|hearts|darling|soul|souls|cherish|adore|precious|my\s+world|mean\s+the\s+world|means\s+the\s+world|cinta|sayang|cantik|manis|romantis|jiwa|jiwaku|hatiku|kesayangan|belahan\s+jiwa/i.test(
      lower
    ) ||
    /cinta|sayang|kasih|jiwa|hati/i.test(translatedMeaning);

  if (isAngry) {
    const angryPool = [
      `"After thinking it through, I stood my ground and said: '${input}'" ("Abis mikir panjang, gw pasang batasan tegas dan bilang: '${translatedMeaning}'")`,
      `"Looking him right in the eye, she declared: '${input}'" ("Natap langsung ke matanya, dia tegas bilang: '${translatedMeaning}'")`,
      `"Setting a clear boundary once and for all: '${input}'" ("Masang batasan jelas biar beres: '${translatedMeaning}'")`,
      `"Tired of being taken for granted, he blurted out: '${input}'" ("Udah capek disepelein terus, dia langsung ngomong: '${translatedMeaning}'")`,
      `"I refuse to tolerate this any longer: '${input}'" ("Gw nolak buat mentoleransi ini lebih lama lagi: '${translatedMeaning}'")`,
      `"Enough is enough, so I made it clear: '${input}'" ("Cukup ya cukup, jadi gw pertegas: '${translatedMeaning}'")`,
    ];
    const picked = pickVariedTemplate('smart_angry_pool', angryPool);
    const validated = validateAndSanitizeExample(picked, input, translatedMeaning);

    return {
      arti: translatedMeaning,
      cara_baca: phonetics,
      penggunaan: [validated].slice(0, Math.max(1, exampleCount)),
      catatan: generateDynamicRantauNote(input, translatedMeaning, 'angry_breakup', words.length),
      maknaFilosofis: generateDynamicMaknaFilosofis(input, translatedMeaning, 'angry_breakup', words.length),
      confidenceLevel: 'medium',
      isInstant: true,
      success: true
    };
  }

  if (isSad) {
    const sadPool = [
      `"Late at night when everything goes quiet, you might feel: '${input}'" ("Pas larut malam saat suasana hening, lu mungkin ngerasa: '${translatedMeaning}'")`,
      `"Holding back a heavy sigh, she admitted: '${input}'" ("Nahan napas berat, dia ngaku: '${translatedMeaning}'")`,
      `"Whenever old memories resurface, all I can say is: '${input}'" ("Tiap kali memori lama muncul lagi, yang bisa gw bilang cuma: '${translatedMeaning}'")`,
      `"Sitting alone with overwhelming thoughts: '${input}'" ("Duduk sendirian dengan pikiran berkecamuk: '${translatedMeaning}'")`,
      `"It hurts to admit it, but honestly: '${input}'" ("Sakit emang buat ngakuinnya, tapi sejujurnya: '${translatedMeaning}'")`,
      `"In a moment of vulnerability, he confessed: '${input}'" ("Di momen batin lagi rapuh, dia ngaku: '${translatedMeaning}'")`,
    ];
    const picked = pickVariedTemplate('smart_sad_pool', sadPool);
    const validated = validateAndSanitizeExample(picked, input, translatedMeaning);

    return {
      arti: translatedMeaning,
      cara_baca: phonetics,
      penggunaan: [validated].slice(0, Math.max(1, exampleCount)),
      catatan: generateDynamicRantauNote(input, translatedMeaning, 'sad_heartbroken', words.length),
      maknaFilosofis: generateDynamicMaknaFilosofis(input, translatedMeaning, 'sad_heartbroken', words.length),
      confidenceLevel: 'medium',
      isInstant: true,
      success: true
    };
  }

  if (isRomantic) {
    const romanticPool = [
      `"I don't say sweet things often, but honestly: '${input}'" ("Gw gak sering ngomong manis, tapi beneran deh: '${translatedMeaning}'")`,
      `"Every time I look into your eyes, I think: '${input}'" ("Tiap kali gw natap mata lu, gw mikir: '${translatedMeaning}'")`,
      `"Holding hands quietly under the evening sky: '${input}'" ("Genggaman tangan tenang di bawah langit sore: '${translatedMeaning}'")`,
      `"A genuine reminder of how much you mean to me: '${input}'" ("Pengingat tulus soal betapa berartinya lu buat gw: '${translatedMeaning}'")`,
      `"Softly sharing what has been on my heart: '${input}'" ("Dengan lembut ngungkapin apa yang ada di hati gw: '${translatedMeaning}'")`,
      `"No grand gestures needed, just simple honesty: '${input}'" ("Gak butuh gaya-gayaan berlebihan, cukup kejujuran sederhana: '${translatedMeaning}'")`,
    ];
    const picked = pickVariedTemplate('smart_romantic_pool', romanticPool);
    const validated = validateAndSanitizeExample(picked, input, translatedMeaning);

    return {
      arti: translatedMeaning,
      cara_baca: phonetics,
      penggunaan: [validated].slice(0, Math.max(1, exampleCount)),
      catatan: generateDynamicRantauNote(input, translatedMeaning, 'romantic_love', words.length),
      maknaFilosofis: generateDynamicMaknaFilosofis(input, translatedMeaning, 'romantic_love', words.length),
      confidenceLevel: 'medium',
      isInstant: true,
      success: true
    };
  }

  // Casual general statement (situational dialogues, never meta-tutorials)
  const isSingleWord = words.length === 1;
  const isCorrelative = /^the\s+(more|less|sooner|harder|longer|better|greater)\b/i.test(input);
  const isFirstPerson = /^(i|we|my|our)\b/i.test(input) || /\b(i'm|i've|i'd|i\s+feel|i\s+think)\b/i.test(input);
  const isSecondPerson = /^(you|your)\b/i.test(input) || /\b(you're|you've|you'd)\b/i.test(input);

  let generalPool = [];
  if (isSingleWord) {
    generalPool = [
      `"Let's make sure to focus on '${input}' before moving to the next stage." ("Yuk pastiin kita fokus ke '${translatedMeaning}' sebelum lanjut ke tahap berikutnya.")`,
      `"He emphasized '${input}' during our discussion today." ("Dia negasin kata '${input}' pas obrolan kita tadi.")`,
      `"Understanding '${input}' in its proper context saves a lot of confusion." ("Paham konteks '${input}' yang bener nyelametin lu dari salah paham.")`,
      `"A handy term to know: '${input}'." ("Istilah praktis buat dipahami: '${input}'.")`,
      `"In daily communication, native speakers use '${input}' quite often." ("Di komunikasi sehari-hari, penutur asli cukup sering pake '${input}'.")`,
      `"Keep '${input}' in mind whenever this issue comes up." ("Inget baik-baik kata '${input}' tiap kali isu ini muncul.")`,
    ];
  } else if (isCorrelative) {
    generalPool = [
      `"The truth is, ${input}, the more complicated things get." ("Kenyataannya, ${translatedMeaning}, situasinya malah makin rumit.")`,
      `"I realized that ${input}, the harder it becomes to find any real clue." ("Gw sadar kalau ${translatedMeaning}, makin susah buat nemu petunjuk jelas.")`,
      `"It felt like chasing shadows; ${input}, the less sense any of this makes." ("Rasanya kayak ngejar bayangan; ${translatedMeaning}, makin gak masuk akal semua ini.")`,
      `"She told me that ${input}, the further away the truth seems." ("Dia bilang ke gw kalau ${translatedMeaning}, kebenarannya malah kelihatan makin jauh.")`,
      `"No matter how fast we move, ${input}, the more exhausted we feel." ("Secepet apapun kita jalan, ${translatedMeaning}, rasanya malah makin capek.")`,
      `"It became obvious that ${input}, the more tension grew between them." ("Makin jelas kalau ${translatedMeaning}, tensi di antara mereka malah makin kerasa.")`,
    ];
  } else if (isFirstPerson) {
    generalPool = [
      `"Honestly, ${input}, and that's why I need to take a step back." ("Jujur aja, ${translatedMeaning}, dan itu alasannya gw perlu ambil jeda sejenak.")`,
      `"I had to admit that ${input}, even though it wasn't easy to say out loud." ("Gw harus ngakuin kalau ${translatedMeaning}, meskipun gak gampang buat diucapin.")`,
      `"During our discussion, she paused when I said: '${input}.'" ("Pas obrolan kita, dia sempat terdiam waktu gw bilang: '${translatedMeaning}.'")`,
      `"To be completely real with you, ${input}." ("Biar bener-bener jujur sama lu ya, ${translatedMeaning}.")`,
      `"Sitting there in silence, all I could think was: '${input}.'" ("Duduk diam di sana, yang ada di pikiran gw cuma: '${translatedMeaning}.'")`,
      `"I wanted to make sure everyone understood that ${input}." ("Gw pengen pastiin semua orang paham kalau ${translatedMeaning}.")`,
    ];
  } else if (isSecondPerson) {
    generalPool = [
      `"You can't just expect everything to be fine when ${input}." ("Lu gak bisa cuma ngarepin semuanya baik-baik aja pas ${translatedMeaning}.")`,
      `"I noticed that ${input}, so I wanted to check in on you." ("Gw ngeh kalau ${translatedMeaning}, makanya gw pengen nanyain kabar lu.")`,
      `"Before making any hasty decisions, remember that ${input}." ("Sebelum ambil keputusan gegabah, inget kalau ${translatedMeaning}.")`,
      `"She looked at you and said: '${input},' which changed the whole mood." ("Dia natap lu dan bilang: '${translatedMeaning},' yang langsung ngubah suasana.")`,
      `"It's important to realize that ${input} before it's too late." ("Penting buat sadar kalau ${translatedMeaning} sebelum semuanya terlambat.")`,
      `"They all agreed that ${input} was the main issue here." ("Mereka semua sepakat kalau ${translatedMeaning} emang jadi isu utamanya.")`,
    ];
  } else {
    generalPool = [
      `"In situations like this, remember that ${input}." ("Di situasi kayak gini, inget kalau ${translatedMeaning}.")`,
      `"It's always worth considering whether ${input} makes sense for our current situation." ("Selalu patut dipertimbangkan apakah ${translatedMeaning} masuk akal buat situasi kita sekarang.")`,
      `"It's pretty clear that ${input} under these circumstances." ("Cukup jelas kalau ${translatedMeaning} di kondisi kayak gini.")`,
      `"She smiled gently and said: '${input}.'" ("Dia senyum tipis terus bilang: '${translatedMeaning}.'")`,
      `"Everyone in the room agreed that ${input}." ("Semua orang di ruangan itu setuju kalau ${translatedMeaning}.")`,
      `"Looking back at what happened, ${input} makes total sense now." ("Kalo diinget lagi apa yang kejadian, ${translatedMeaning} sekarang masuk akal banget.")`,
    ];
  }

  const picked = pickVariedTemplate('smart_general_pool', generalPool);
  const validated = validateAndSanitizeExample(picked, input, translatedMeaning);

  return {
    arti: translatedMeaning,
    cara_baca: phonetics,
    penggunaan: [validated].slice(0, Math.max(1, exampleCount)),
    catatan: generateDynamicRantauNote(input, translatedMeaning, 'casual_chill', words.length),
    maknaFilosofis: generateDynamicMaknaFilosofis(input, translatedMeaning, 'casual_chill', words.length),
    confidenceLevel: 'medium',
    isInstant: true,
    success: true
  };
}
