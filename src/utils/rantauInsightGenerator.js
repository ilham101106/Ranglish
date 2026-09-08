import { pickVariedTemplate } from './textClassifier.js';

/**
 * Dynamic, context-driven linguistic insight generator for Ranglish ("Catatan Anak Rantau" & "Makna Rasa").
 * Strictly eliminates all robotic boilerplate templates ("luwes banget dipake pas nongkrong",
 * "bikin obrolan dua arah", "which is why native speaker sering banget pake pola ini", etc.).
 *
 * Produces authentic, human, culturally-grounded explanations like an experienced bilingual peer.
 */

export function generateDynamicRantauNote(text, cleanTranslation = '', tone = 'casual_chill', wordCount = 1) {
  const lower = (text || '').toLowerCase().trim();

  // 1. SPECIFIC KEY PHRASE / IDIOM DETECTIONS
  if (/\bcross(\s+the)?\s+line\b/i.test(lower)) {
    return `Frasa **'cross the line'** di sini kuncinya! Maknanya bukan sekadar 'ngelewatin garis' fisik, tapi berani ngambil keputusan besar yang gak bisa ditarik balik (point of no return) atau melanggar batasan aman. Digabung sama ungkapan soal takdir/masa depan, kalimat ini tuh ngasih vibe monolog batin yang reflektif banget — pas lu lagi berdiri di persimpangan hidup dan menimbang apakah lu bener-bener punya nyali buat nerobos zona nyaman.`;
  }

  if (/\bbetter\s+off\s+without\b/i.test(lower)) {
    return `Perhatiin frasa **'better off without'** — ini cara paling elegan sekaligus tegas buat bilang 'hidup gw jauh lebih damai dan berkembang tanpa kehadiran lu'. Dingin, to-the-point, dan berwibawa tanpa perlu drama atau marah-marah berlebihan.`;
  }

  if (/\b(spill\s+the\s+tea|spill\s+the\s+beans)\b/i.test(lower)) {
    return `Slang legendaris anak muda! **'Spill the tea'** lebih condong ke update gosip seru atau drama hangat bareng circle terdekat, sementara **'spill the beans'** lebih ke bocorin rahasia penting yang harusnya dijaga.`;
  }

  if (/\bcall\s+it\s+a\s+day\b/i.test(lower)) {
    return `Pas energi lu udah tiris seharian dan pengen udahan kerja atau nongkrong, langsung lempar **'let's call it a day'**. Ringkas, sopan, dan langsung dipahami semua native speaker sebagai tanda pamit yang santai.`;
  }

  if (/\bfigure\s+out\b/i.test(lower)) {
    return `Phrasal verb **'figure out'** ini makanan sehari-hari native speaker pas lagi ngulik solusi atau mecahin teka-teki rumit. Jauh lebih natural dan luwes dibanding lu cuma bilang 'find the solution'.`;
  }

  if (/\bmake\s+sense\b/i.test(lower)) {
    return `Frasa wajib anak rantau! Native speaker hampir selalu pake **'makes sense'** ketimbang 'I understand' pas lagi nyambung dan sefrekuensi sama omongan lawan bicara.`;
  }

  if (/\b(up\s+to\s+you|it's\s+up\s+to\s+you)\b/i.test(lower)) {
    return `Frasa paling santai buat ngembaliin keputusan ke lawan bicara. Trik intonasinya: kalo lu ucapin dengan nada hangat dan senyum, kedengeran fleksibel; tapi kalo intonasinya datar, bisa kedengeran pasrah atau cuek.`;
  }

  if (/\bat\s+the\s+end\s+of\s+the\s+day\b/i.test(lower)) {
    return `Ungkapan pamungkas yang sering banget dipake native speaker pas narik kesimpulan hidup: **'at the end of the day'** artinya pada intinya atau setelah ngelewatin semua dinamika yang ada.`;
  }

  if (/\bwhat\s+if\b/i.test(lower)) {
    return `Dua kata paling berbahaya buat orang yang hobi overthinking! Native speaker pake **'what if'** buat ngebuka skenario alternatif, berandai-andai, atau mengeksplorasi kemungkinan yang belum kejadian.`;
  }

  if (/\bno\s+matter\s+what\b/i.test(lower)) {
    return `Penegasan komitmen yang gak bisa digoyang. Vibe-nya mantap dan meyakinkan banget buat ngasih kepastian ke diri sendiri atau meyakinkan orang terdekat bahwa lu bakal tetep ada.`;
  }

  if (/\bout\s+of\s+the\s+blue\b/i.test(lower)) {
    return `Idiom visual yang asik banget: **'out of the blue'** melukiskan sesuatu yang tiba-tiba kejadian tanpa aba-aba sama sekali, kayak kilat yang menyambar di langit cerah.`;
  }

  if (/\bowe\s+(one'?s?|your|my|him|her|them)?\s*self\b/i.test(lower)) {
    return `Ungkapan self-worth yang dalam banget: **'owe yourself'** artinya kita berutang pada diri sendiri — buat istirahat, buat bahagia, atau buat gak memaksakan diri demi menyenangkan orang lain. Mengadopsi analogi finansial: jika kita merasa wajib melunasi utang ke orang lain, maka kita punya kewajiban moral yang setara untuk bersikap adil dan welas asih pada diri sendiri.`;
  }

  if (/\bstick(ing)?\s+around\b/i.test(lower)) {
    return `Phrasal verb **'stick around'** (atau bentuk gerundnya **'sticking around'**) dipakai saat seseorang memilih untuk tetap tinggal, menemani, atau bertahan di satu tempat/situasi — terutama ketika keadaan sedang tidak mudah. Kehadiran fisik atau emosional yang konsisten jauh lebih terasa maknanya ketimbang janji manis.`;
  }

  if (/\b(on\s+the\s+fence|sit\s+on\s+the\s+fence)\b/i.test(lower)) {
    return `Pas lagi galau dan belum bisa nentuin sikap di antara dua pilihan berat, native speaker bakal bilang mereka lagi **'on the fence'** — duduk di atas pagar tanpa memihak ke kiri atau kanan.`;
  }

  // 2. GRAMMATICAL STRUCTURE & DICTION DETECTIONS
  if (/^the\s+(more|less|sooner|harder|longer|better|greater)\b/i.test(lower)) {
    return `Pola korelasi **'the more... the more...'** ini gaya bertutur elegan buat nunjukin hubungan sebab-akibat yang bertingkat seiring waktu. Native speaker suka banget pake struktur berimbang kayak gini biar argumennya terdengar tajam dan meyakinkan.`;
  }

  if (/\b(forthwith|henceforth|nevertheless|nonetheless|furthermore|moreover|wherein|whereby|shall)\b/i.test(lower)) {
    return `Menariknya, ada sisipan diksi formal/kuno di dalam kalimat ini. Memadukan kata formal berbobot ke dalam susunan kalimat personal ngasih efek dramatis, serius, dan menunjukkan urgensi tanpa perlu nada tinggi.`;
  }

  if (/\b(should\s+have|could\s+have|would\s+have|might\s+as\s+well|supposed\s+to)\b/i.test(lower)) {
    return `Pola modalitas lampau ini mencerminkan rasa perenungan atas apa yang sudah berlalu. Native speaker biasa menggunakannya buat menyatakan evaluasi jujur tanpa terkesan menyalahkan secara kasar.`;
  }

  if (/\b(as\s+long\s+as|unless|even\s+if|only\s+if|in\s+case)\b/i.test(lower)) {
    return `Klausul pengkondisian ini berfungsi menetapkan ekspektasi dan batas yang jelas. Pas banget dipakai biar kedua belah pihak punya pemahaman yang sama tanpa ada asumsi tersembunyi.`;
  }

  // 3. CONTEXT & TONE DRIVEN INSIGHTS (NO ROBOT CLICHES!)
  if (tone === 'reflective_philosophical') {
    const hasQuestion = lower.includes('?') || /^(am\s+i|should\s+i|can\s+i|will\s+i)\b/i.test(lower);
    if (hasQuestion) {
      return `Pertanyaan retoris di kalimat ini punya bobot monolog batin yang kuat. Native speaker biasa make gaya bertanya kayak gini bukan buat nunggu jawaban dari orang lain, melainkan buat nguji kesiapan mental diri sendiri di hadapan ketidakpastian takdir dan masa depan. Cocok banget buat bahan journaling atau deep talk tengah malam.`;
    }
    return `Pilihan diksi di kalimat ini puitis dan punya daya renung yang dalem — kayak kutipan monolog di film drama pas karakternya lagi berdiri di persimpangan jalan. Bukan buat basa-basi harian, tapi pas banget buat caption refleksi atau pas lu lagi berkontemplasi soal arah langkah hidup ke depan.`;
  }

  if (tone === 'angry_breakup') {
    return `Kalimat ini ngasih sinyal 'enough is enough' yang tegas dan berwibawa. Gak pake nada ngegas atau drama histeris, tapi langsung narik garis batas harga diri yang gak bisa dinegosiasikan lagi. Disampaikan dengan nada tenang tapi dingin justru ngasih wibawa yang jauh lebih berkelas.`;
  }

  if (tone === 'sad_heartbroken') {
    return `Nuansa melancholic-nya kerasa jujur dan gak dibuat-buat, khas pemikiran yang suka tiba-tiba nyergap pas suasana kamar lagi sepi. Diucapin pendek tapi nusuk, ngakuin rasa rapuh tanpa harus gengsi atau denial.`;
  }

  if (tone === 'romantic_love') {
    return `Vibes-nya manis dan tulus tanpa kesan gombal murahan. Kuncinya ada di keberanian nunjukin sisi rapuh (vulnerability) dan apresiasi tulus ke orang tersayang — bikin siapa pun yang denger ngerasa bener-bener dihargai dan aman.`;
  }

  // 4. SHAPE-BASED LINGUISTIC TIPS
  if (lower.endsWith('?') || /^(what|why|how|where|when|who|is|are|am|do|does|can|could|would)\b/i.test(lower)) {
    return `Cara bertanya yang luwes dan terbuka. Enak dipakai saat lu pengen memancing obrolan jujur atau nyari kejelasan sudut pandang lawan bicara tanpa bikin mereka ngerasa lagi diinterogasi.`;
  }

  if (wordCount <= 2) {
    const shortPhrasesNotes = [
      `Kosakata ringkas yang to-the-point. Kunci pelafalannya ada di penekanan suku kata pertama agar terdengar natural dan mengalir saat diselipkan dalam obrolan.`,
      `Pilihan kata yang fungsional dan sering muncul dalam percakapan kasual native speaker. Enak dipakai buat merespons cepat tanpa perlu menyusun kalimat panjang.`,
      `Frasa ringkas berdaya guna tinggi. Begitu lu terbiasa menggunakannya, alur bahasa Inggris lu bakal terdengar jauh lebih percaya diri dan refleksnya terasa alami.`
    ];
    return pickVariedTemplate('dynamic_rantau_note_short', shortPhrasesNotes);
  }

  if (wordCount <= 5) {
    return `Frasa ekspresif yang siap pakai. Gabungan katanya padat dan langsung kena ke inti pesan tanpa perlu berbelit-belit.`;
  }

  // 5. DYNAMIC GENERAL POOL (Multi-angle contextual notes)
  const generalNotes = [
    `Gaya penyampaian kalimat ini langsung mengarah ke pokok pesan. Kalau lu selipkan di obrolan sehari-hari, maksud lu tersampaikan dengan tegas dan alami tanpa bertele-tele.`,
    `Kombinasi kata di kalimat ini punya ritme yang mengalir enak saat diucapkan. Pas banget buat melatih pelafalan intonasi bahasa Inggris yang lebih percaya diri.`,
    `Pilihan kosakatanya sangat fungsional dan relevan dengan gaya komunikasi modern yang mengutamakan kejujuran dan efisiensi pesan.`,
    `Kalimat ini terasa pas diucapkan dengan intonasi santai tapi lugas. Enak dipakai saat lu pengen menyampaikan poin penting tanpa terkesan menggurui.`,
    `Nuansanya netral dan aman dipakai di berbagai situasi, baik obrolan kasual bareng teman akrab maupun obrolan santai di lingkungan kerja.`,
    `Diksi yang dipakai sangat to-the-point, bikin lawan bicara langsung paham maksud utama lu tanpa menimbulkan spekulasi yang membingungkan.`,
  ];

  return pickVariedTemplate('dynamic_rantau_note_general', generalNotes);
}

export function generateDynamicMaknaFilosofis(text, cleanTranslation = '', tone = 'casual_chill', wordCount = 1) {
  const lower = (text || '').toLowerCase().trim();

  if (/\bowe\s+(one'?s?|your|my|him|her|them)?\s*self\b/i.test(lower)) {
    return `Kita sering merasa bersalah saat beristirahat atau memilih mendahulukan diri sendiri. "Owe yourself" mengingatkan bahwa menghargai diri sendiri bukanlah keegoisan, melainkan prasyarat agar kita tetap waras dan mampu terus melangkah.`;
  }

  if (/\bstick(ing)?\s+around\b/i.test(lower)) {
    return `Dalam hubungan manusia, kesetiaan untuk bertahan (sticking around) saat situasi tidak ideal adalah ujian terberat sekaligus pembuktian paling nyata dari sebuah komitmen.`;
  }

  if (/\bcross(\s+the)?\s+line\b/i.test(lower) || tone === 'reflective_philosophical') {
    return `Secara psikologis dan eksistensial, kalimat ini mencerminkan fase 'threshold anxiety' — kegelisahan alami saat seseorang berdiri di ambang batas perubahan besar. Menatap masa depan yang belum jelas dan bertanya apakah diri kita siap melangkah bukanlah tanda kelemahan, melainkan wujud kedewasaan batin bahwa setiap langkah baru selalu menuntut keberanian untuk melepaskan kepastian lama.`;
  }

  if (tone === 'angry_breakup' || /\bbetter\s+off\s+without\b/i.test(lower)) {
    return `Dari sudut pandang psikologi hubungan, ini melukiskan momen 'the turning point' — titik balik ketika seseorang berhenti menyalahkan diri sendiri dan mulai merebut kembali kedaulatan harga dirinya. Batasan tegas (personal boundaries) bukanlah kebencian, melainkan bentuk tertinggi dari cinta dan rasa hormat pada diri sendiri.`;
  }

  if (tone === 'sad_heartbroken') {
    return `Secara emosional, mengakui rasa sedih atau kesepian tanpa menutupinya dengan kepura-puraan adalah langkah awal katarsis (emotional release). Dalam keheningan, kesedihan yang divalidasi justru menjadi tanah subur tempat ketegaran baru bertumbuh perlahan.`;
  }

  if (tone === 'romantic_love') {
    return `Keterbukaan untuk mengungkapkan rasa sayang yang hangat adalah manifestasi dari 'secure attachment'. Di dunia yang sering kali menuntut orang untuk bersikap dingin atau defensif, berani bersikap lembut dan tulus kepada seseorang adalah bentuk keberanian emosional yang langka.`;
  }

  if (lower.endsWith('?')) {
    return `Mengajukan pertanyaan yang tulus mencerminkan kerendahan hati intelektual dan ruang empati yang bebas dari penghakiman (non-judgmental space). Ini membuka jembatan pemahaman yang membuat orang lain merasa didengarkan dan dimanusiakan.`;
  }

  if (/^the\s+(more|less|sooner|harder|longer|better|greater)\b/i.test(lower)) {
    return `Secara psikologis, pola perbandingan bertingkat ini melukiskan paradoks usaha vs kenyataan: saat seseorang merasa semakin keras mereka berusaha mencari kejelasan atau mengejar sesuatu, justru semakin banyak ketidakpastian yang muncul ke permukaan.`;
  }

  if (/\b(forthwith|henceforth|nevertheless|nonetheless|furthermore|moreover|wherein|whereby|shall)\b/i.test(lower)) {
    return `Pilihan kata formal yang tegas sering kali merefleksikan kebutuhan batin akan ketertiban dan kepastian saat menghadapi situasi yang mulai membingungkan atau melewati batas wajar.`;
  }

  if (/\b(should\s+have|could\s+have|would\s+have|might\s+as\s+well|supposed\s+to)\b/i.test(lower)) {
    return `Merenungkan pengandaian masa lalu ('counterfactual thinking') adalah proses mental alami manusia untuk belajar dari keputusan kemarin agar lebih berhati-hati melangkah hari ini.`;
  }

  if (/\b(as\s+long\s+as|unless|even\s+if|only\s+if|in\s+case)\b/i.test(lower)) {
    return `Menetapkan batasan bersyarat adalah cerminan kedewasaan emosional — tahu kapan harus fleksibel dan kapan harus memegang prinsip secara konsisten.`;
  }

  // DYNAMIC GENERAL PHILOSOPHICAL PERSPECTIVES
  const generalPhilosophies = [
    `Kejelasan dalam menyampaikan pikiran adalah wujud rasa hormat terhadap ruang dan energi orang lain. Bahasa yang jujur dan tepat sasaran membangun relasi yang kokoh.`,
    `Setiap ungkapan yang tulus membuka ruang pemahaman baru antara dua orang, meredakan praduga dan menciptakan rasa saling mengerti.`,
    `Kecakapan memilih kata yang tenang mencerminkan kematangan emosi dalam menyikapi dinamika komunikasi sehari-hari.`,
    `Menyampaikan pemikiran dengan lugas tanpa kepura-puraan adalah bentuk keberanian batin yang menyegarkan di tengah dunia yang penuh basa-basi.`,
    `Ada ketenangan tersendiri saat kita berhasil merumuskan apa yang kita rasakan ke dalam kata-kata yang jernih dan proporsional.`,
    `Komunikasi yang sehat tidak selalu membutuhkan kata-kata rumit; justru ketulusan dan ketepatan diksi yang membuat pesan membekas.`,
  ];

  return pickVariedTemplate('dynamic_makna_filosofis_general', generalPhilosophies);
}
