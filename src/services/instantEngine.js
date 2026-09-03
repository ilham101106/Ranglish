// Instant NLP Linguistic Engine for Ranglish (Gaya Santai Anak Rantau & Gen Z)
// Database Kosakata Super Masif & Komprehensif (1,250+ Entri Unik Paling Sering Dicari & Digunakan)

import { getLearnedVocabBank, saveLearnedVocabToBank } from './storage';
import vocab1000 from '../data/vocab1000.json';
import { generateSmartSentenceAnalysis } from '../utils/sentenceTranslator';

export const DICTIONARY = {
  // =========================================================================
  // 🎬 MOVIE DIALOGUES & ICONIC CINEMATIC QUOTES
  // =========================================================================
  'damn, that was a close call!': {
    arti: 'Sialan, nyaris aja tadi celaka / tipis banget selamatnya!',
    cara_baca: 'dam, that wuz uh klohs kawl',
    penggunaan: [
      'We almost got caught by the guard, damn, that was a close call! (Kita hampir aja ketangkep satpam, sialan, tipis banget selamatnya!)',
      'A car almost hit us on the highway. Damn, that was a close call! (Mobil hampir nabrak kita di jalan tol. Gila, nyaris banget tadi!)',
      'I submitted my assignment with 1 second left. Damn, that was a close call! (Gue ngumpulin tugas sisa 1 detik. Sialan, nyaris telat!)'
    ],
    catatan: 'Ungkapan "close call" di film-film aksi dipakai pas seseorang baru aja lolos dari bahaya atau situasi genting yang selisihnya tipis banget.'
  },
  "you have no idea what i've been through": {
    arti: 'Lu gak bakal pernah tau seberapa berat hal yang udah gue laluin.',
    cara_baca: 'yoo hav noh eye-dee-uh wut ayv bin throo',
    penggunaan: [
      "Don't judge me so easily, you have no idea what I've been through. (Jangan gampang nge-judge gue, lu gak tau seberapa berat hal yang udah gue lewatin.)",
      "She stayed strong even though you have no idea what she's been through. (Dia tetep tegar padahal lu gak bakal tau seberat apa cobaan hidupnya.)",
      "You think it's fun? You have no idea what I've been through to get here. (Lu pikir ini gampang? Lu gak tau perjuangan berdarah-darah gue sampe di titik ini.)"
    ],
    catatan: 'Frasa emosional yang sering muncul di adegan klimaks film drama. "Been through" artinya melalui masa-masa sulit atau penderitaan hidup.'
  },
  'cut the crap and tell me the truth': {
    arti: 'Udah gak usah banyak omong kosong, langsung jujur aja ke gue!',
    cara_baca: 'kat the krap and tel mee the trooth',
    penggunaan: [
      'Stop making excuses, cut the crap and tell me the truth! (Berhenti bikin alesan, gak usah banyak omong kosong dan jujur aja!)',
      "I know you're lying, so cut the crap and tell me the truth. (Gue tau lu bohong, mending langsung jujur aja sekarang.)",
      "Let's cut the crap and tell each other the truth once and for all. (Yuk stop basa-basi dan jujur-jujuran aja sekarang.)"
    ],
    catatan: '"Cut the crap" adalah slang tegas buat nyuruh orang berhenti basa-basi, berhenti ngeles, atau berhenti bohong.'
  },
  'we are running out of time, make up your mind!': {
    arti: 'Waktu kita udah mau abis, cepet tentuin pilihan lu sekarang!',
    cara_baca: 'wee ahr ran-ing owt uv taym, meyk up yoor maynd',
    penggunaan: [
      'The gates are closing in five minutes, we are running out of time, make up your mind! (Pintu gerbang tutup 5 menit lagi, waktu kita abis, cepet ambil keputusan!)',
      'Stop overthinking this, we are running out of time, make up your mind! (Jangan kebanyakan mikir, waktu kita mepet banget, cepet putusin!)',
      'Do you want in or out? We are running out of time, make up your mind! (Mau ikut apa enggak? Waktu kita mepet, tentuin sekarang!)'
    ],
    catatan: '"Make up your mind" artinya menetapkan keputusan / berhenti ragu-ragu di saat situasi sedang mendesak.'
  },
  'i knew it was too good to be true': {
    arti: 'Tuh kan bener, udah gue duga ini terlalu indah buat jadi kenyataan (pasti ada jebakannya).',
    cara_baca: 'ay noo it wuz too good too bee troo',
    penggunaan: [
      'They offered a free flight ticket, but I knew it was too good to be true. (Mereka nawarin tiket pesawat gratis, tapi gue udah duga pasti ada udang di balik batu.)',
      'When he suddenly became so polite, I knew it was too good to be true. (Pas dia tiba-tiba jadi baik banget, gue udah curiga ini gak beres.)',
      'A high-paying job with zero effort? I knew it was too good to be true. (Kerja santai tapi gaji gede? Udah pasti jebakan.)'
    ],
    catatan: 'Dipakai pas lu ngerasa sebuah tawaran atau situasi terlalu sempurna sampe lu curiga ada hal tersembunyi yang merugikan.'
  },
  "don't you dare walk away from me right now!": {
    arti: 'Jangan berani-beraninya lu pergi ninggalin gue pas lagi ngomong gini!',
    cara_baca: 'dohnt yoo dair wawk uh-way fruhm mee rayt now',
    penggunaan: [
      "We need to finish this conversation, don't you dare walk away from me right now! (Kita harus selesain masalah ini, jangan berani-berani lu cabut gitu aja!)",
      "Don't you dare walk away from me when I'm pouring my heart out! (Jangan berani-berani lu pergi pas gue lagi tulus ngomong!)",
      "Look at me in the eye, and don't you dare walk away from me right now! (Tatap mata gue, dan jangan coba-coba lu kabur sekarang!)"
    ],
    catatan: 'Dialog legendaris di film romansa & pertengkaran hebat. "Don\'t you dare..." adalah peringatan keras dan bernada tinggi.'
  },
  'it is what it is, we gotta move on': {
    arti: 'Ya mau gimana lagi, kenyataannya emang udah begini, kita harus tetep lanjut melangkah.',
    cara_baca: 'it iz wut it iz, wee gah-tuh moov on',
    penggunaan: [
      "We didn't get the project, but it is what it is, we gotta move on. (Kita gagal dapet proyeknya, tapi yaudahlah, kita harus fokus ke langkah selanjutnya.)",
      'The relationship ended badly, but it is what it is, we gotta move on. (Hubungannya emang berakhir pahit, tapi mau gimana lagi, hidup harus tetep jalan.)',
      'Accept the loss. It is what it is, we gotta move on. (Ikhlasin kegagalan ini. Emang udah jalannya, kita harus bangkit lagi.)'
    ],
    catatan: '"It is what it is" adalah ungkapan penerimaan/keikhlasan (stoic mindset) atas situasi yang udah gak bisa diubah lagi.'
  },
  "i've got your back, no matter what happens": {
    arti: 'Gue selalu jagain dan dukung lu di belakang, apapun yang bakal terjadi nanti.',
    cara_baca: 'ayv got yoor bak, noh mat-ter wut hap-penz',
    penggunaan: [
      "Don't be afraid to take risks, I've got your back, no matter what happens. (Gak usah takut ngambil risiko, gue selalu ada buat backup lu apapun yang terjadi.)",
      "You're my best friend, I've got your back, no matter what happens. (Lu sahabat gue, gue bakal selalu pasang badan buat lu.)",
      "Walk into that interview with confidence. I've got your back, no matter what happens. (Masuk ke ruang interview itu dengan pede. Gue dukung lu sepenuhnya.)"
    ],
    catatan: '"Got someone\'s back" artinya setia kawan, siap bantu, atau siap melindungi seseorang saat menghadapi masalah.'
  },
  'why are you always giving me mixed signals?': {
    arti: 'Kenapa sih lu selalu ngasih kode yang gak jelas / tarik ulur perasaan gue melulu?',
    cara_baca: 'way ahr yoo awl-weyz giv-ing mee mikst sig-nulz',
    penggunaan: [
      'One day you love me, the next day you ignore me. Why are you always giving me mixed signals? (Sehari lu manis banget, besoknya lu cuekin. Kenapa sih lu selalu tarik ulur perasaan gue?)',
      'Stop playing mind games and tell me how you feel instead of giving me mixed signals. (Stop main tebak-tebakan dan jujur aja daripada ngasih kode gak jelas.)',
      "I can't read your mind when you're giving me mixed signals like this. (Gue gak bisa nebak isi kepala lu kalau kelakuan lu kontradiktif gini.)"
    ],
    catatan: '"Mixed signals" adalah istilah hits saat sikap seseorang bikin bingung: kadang nunjukin ketertarikan (flirty), tapi kadang bersikap dingin.'
  },
  "let's get straight to the point": {
    arti: 'Yuk kita langsung ke inti pembahasannya aja, gak usah basa-basi.',
    cara_baca: 'lets get streyt too the poynt',
    penggunaan: [
      "We don't have much time today, so let's get straight to the point. (Hari ini waktu kita sempit, jadi yuk langsung to the point aja ke intinya.)",
      'I appreciate people who get straight to the point instead of beating around the bush. (Gue lebih suka orang yang langsung ke intinya daripada muter-muter gak jelas.)',
      "Let's get straight to the point: what's your best offer? (Yuk langsung ke intinya aja: penawaran terbaik lu berapa?)"
    ],
    catatan: 'Sangat umum di dunia kerja dan meeting profesional saat kamu ingin menghemat waktu dan langsung membahas topik esensial.'
  },
  "i didn't sign up for this mess!": {
    arti: 'Gue sama sekali gak pernah setuju atau bermaksud buat kejebak di masalah seruwet ini!',
    cara_baca: 'ay did-nt sayn up for this mes',
    penggunaan: [
      "When I joined this project, I didn't sign up for this kind of drama and mess! (Pas gue gabung proyek ini, gue gak pernah nyangka bakal ngadepin drama seruwet ini!)",
      "I thought it was a simple job, I didn't sign up for this mess. (Gue kira kerjanya simpel, gue gak berniat kejebak masalah berantakan gini.)",
      "Count me out, I didn't sign up for this mess. (Keluarin gue, gue gak mau ikutan urusan kacau ini.)"
    ],
    catatan: '"Didn\'t sign up for this" adalah idiom saat kamu mendapati konsekuensi buruk/repot yang sebelumnya tidak kamu antisipasi.'
  },
  'are you out of your mind?!': {
    arti: 'Lu udah gak waras ya?! / Lu gila apa gimana?!',
    cara_baca: 'ahr yoo owt uv yoor maynd',
    penggunaan: [
      'Driving in this storm? Are you out of your mind?! (Nyetir pas badai gini? Lu udah gak waras ya?!)',
      'You want to quit your dream job without any savings? Are you out of your mind?! (Lu mau resign tanpa dana darurat sama sekali? Lu gila apa?!)',
      'Spending your entire salary in one day? Are you out of your mind?! (Nghabisin seluruh gaji dalam sehari? Waras lu?!)'
    ],
    catatan: 'Ekspresi kejut dan kaget saat melihat seseorang melakukan tindakan yang sangat berisiko atau konyol.'
  },
  'i think we got off on the wrong foot': {
    arti: 'Kayaknya kesan pertama pertemuan kita tadi kurang enak / salah paham deh, yuk kita mulai ulang dari awal.',
    cara_baca: 'ay thingk wee got awf on the rawng foot',
    penggunaan: [
      'Sorry for being rude earlier, I think we got off on the wrong foot. Hi, my name is Alex. (Sori tadi gue agak jutek, kayaknya kesan awal kita kurang enak. Kenalin, nama gue Alex.)',
      "We argued at the beginning, but let's reset because we got off on the wrong foot. (Tadi kita sempet ribut, tapi yuk mulai ulang biar hubungannya enak.)",
      "I don't want us to be awkward, I think we just got off on the wrong foot. (Gue gak mau kita canggung, tadi kita cuma salah paham di awal aja.)"
    ],
    catatan: '"Get off on the wrong foot" dipakai buat mencairkan suasana saat perkenalan pertama diawali kesan yang buruk atau salah paham.'
  },
  "you can't just sweep this under the rug": {
    arti: 'Lu gak bisa cuma nutup-nutupin atau pura-pura masalah ini gak pernah ada!',
    cara_baca: 'yoo kant just sweep this un-der the rag',
    penggunaan: [
      "This is a serious mistake, you can't just sweep this under the rug! (Ini kesalahan fatal, lu gak bisa pura-pura masalah ini gak ada!)",
      'They tried to sweep the scandal under the rug, but the media found out. (Mereka nyoba nutup-nutupin skandal itu, tapi ketauan media juga.)',
      "Address your mental health issues, don't sweep them under the rug. (Sembuhin luka batin lu, jangan cuma dipendem dan ditutup-tutupin.)"
    ],
    catatan: '"Sweep under the rug" artinya menyembunyikan masalah agar tidak terlihat orang lain alih-alih membereskannya.'
  },
  "i'm at my wit's end with this situation": {
    arti: 'Gue udah bener-bener mentok, bingung, dan kehabisan akal ngadepin situasi ini.',
    cara_baca: 'aym at may wits end with this sit-yoo-ay-shun',
    penggunaan: [
      "I've tried everything to fix this bug, I'm at my wit's end! (Gue udah coba semua cara buat benerin bug ini, otak gue beneran mentok!)",
      "She is at her wit's end trying to calm her crying baby. (Dia udah kehabisan akal nyoba nenangin bayinya yang nangis terus.)",
      "I'm at my wit's end with his constant excuses. (Gue udah capek dan kehabisan sabar denger alesan dia melulu.)"
    ],
    catatan: '"At one\'s wit\'s end" artinya berada di titik puncak kebingungan/frustrasi di mana semua ide solusi sudah habis dicoba.'
  },
  "i'm taking a leap of faith here": {
    arti: 'Gue lagi nekat ngambil langkah besar modal percaya dan yakin doang nih.',
    cara_baca: 'aym teyk-ing uh leep uv feyth heer',
    penggunaan: [
      "Moving to another country alone is scary, but I'm taking a leap of faith here. (Pindah ke luar negeri sendirian emang nakutin, tapi gue nekat modal yakin aja.)",
      'Starting this business with my savings is me taking a leap of faith. (Mulai bisnis ini pake tabungan sendiri adalah langkah nekat yang gue percayai.)',
      'Sometimes you just have to close your eyes and take a leap of faith. (Kadang lu cuma butuh pejamin mata dan percaya sama langkah lu.)'
    ],
    catatan: '"Leap of faith" adalah tindakan berani mengambil keputusan besar tanpa ada jaminan pasti akan berhasil, modal percaya pada intuisi.'
  },
  'may the force be with you, always': {
    arti: 'Semoga kekuatan dan keberuntungan selalu menyertaimu, selamanya.',
    cara_baca: 'mey the fors bee with yoo, awl-weyz',
    penggunaan: [
      'Before you enter the exam room: May the Force be with you, always! (Sebelum lu masuk ruang ujian: semoga kekuatan dan keberuntungan selalu menyertai lu!)',
      'Good luck on your new journey in Europe. May the Force be with you, always. (Semoga sukses di perantauan baru lu di Eropa. Semoga jalan lu selalu dimudahkan.)',
      'Whenever things get tough, remember: May the Force be with you, always. (Pas keadaan lagi berat, selalu inget: kekuatan selalu ada di dalam diri lu.)'
    ],
    catatan: 'Kutipan paling ikonik dari franchise film Star Wars. Dipakai sebagai ucapan doa restu yang keren dan penuh makna sebelum seseorang menghadapi ujian besar atau petualangan baru.'
  },
  "why so serious? let's put a smile on that face!": {
    arti: 'Ngapain tegang-tegang amat sih? Yuk dibikin senyum dan rileks mukanya!',
    cara_baca: 'way soh seer-ee-us? lets poot uh smayl on that feys',
    penggunaan: [
      "Relax, it's just a game. Why so serious? Let's put a smile on that face! (Santai bro, cuma game doang. Ngapain tegang amat? Dibawa senyum aja!)",
      "You look so stressed today. Why so serious? Let's put a smile on that face! (Lu keliatan stress banget hari ini. Jangan kaku gitu, senyum dong!)",
      "Don't let them ruin your day. Why so serious? Let's put a smile on that face! (Jangan biarin omongan orang bikin lu bad mood. Senyum yuk!)"
    ],
    catatan: 'Kutipan legendaris karakter Joker (The Dark Knight). Sering dipakai bercanda buat nyindir temen yang mukanya kelewat tegang, kaku, atau over-serius.'
  },
  "i'll be back": {
    arti: 'Gue bakal balik lagi (tungguin aja!).',
    cara_baca: 'ayl bee bak',
    penggunaan: [
      "I need to grab something from the car, I'll be back. (Gue mau ngambil barang di mobil bentar, ntar gue balik lagi.)",
      "You haven't seen the last of me yet. I'll be back! (Perjuangan gue belum selesai, gue pasti bakal balik lagi lebih kuat!)",
      "Don't start the movie without me, I'll be back in five minutes! (Jangan mulai nonton dulu, gue balik 5 menit lagi!)"
    ],
    catatan: 'Kutipan ikonik Arnold Schwarzenegger di film Terminator. Simpel tapi punya aura percaya diri tinggi bahwa kamu pasti akan kembali.'
  },
  'to infinity and beyond!': {
    arti: 'Menuju tak terbatas dan melampauinya! (Maju terus pantang mundur tanpa batas).',
    cara_baca: 'too in-fin-it-ee and bee-yond',
    penggunaan: [
      'We are launching our new startup today, to infinity and beyond! (Hari ini kita resmi rilis startup baru, gaskeun tanpa batas!)',
      'Keep dreaming big and aim for the stars, to infinity and beyond! (Tetep bermimpi besar dan kejar cita-cita lu tanpa batas!)',
      'Together we can conquer anything, to infinity and beyond! (Bareng-bareng kita bisa lewatin apapun, gas terus pantang mundur!)'
    ],
    catatan: 'Slogan legendaris Buzz Lightyear (Toy Story). Dipakai buat menyemangati impian yang sangat tinggi dan tanpa batasan.'
  },
  'houston, we have a problem': {
    arti: 'Gawat nih kawan-kawan, ada masalah tak terduga yang muncul!',
    cara_baca: 'hyoo-stun, wee hav uh prob-lum',
    penggunaan: [
      'I just checked the server logs... Houston, we have a problem. (Gue baru cek log server... Gawat nih bos, ada error mendadak!)',
      'My car broke down in the middle of nowhere. Houston, we have a problem. (Mobil gue mogok di antah berantah. Gawat nih.)',
      'We forgot the event tickets at home. Houston, we have a problem! (Tiket konsernya ketinggalan di rumah. Mampus kita, ada masalah!)'
    ],
    catatan: 'Kutipan nyata misi luar angkasa Apollo 13 yang dipopulerkan film Tom Hanks. Dipakai bercanda ataupun serius saat kamu baru menyadari ada kendala tak terduga.'
  },

  // =========================================================================
  // 1. 🔥 TOP VIRAL SOCIAL MEDIA, TIKTOK & GEN Z STREET SLANG
  // =========================================================================
  'in case': {
    arti: 'Jaga-jaga / untuk mengantisipasi kalau-kalau terjadi sesuatu',
    cara_baca: 'in keys',
    penggunaan: [
      'Take an umbrella with you in case it rains later. (Bawa payung gih, buat jaga-jaga kalau nanti hujan.)',
      'I brought some extra cash in case the card machine is broken. (Gue bawa uang tunai lebih buat jaga-jaga kalau mesin EDC/kartunya rusak.)',
      'Here is my phone number in case you get lost. (Nih nomor telepon gue ya, buat jaga-jaga kalau lu nyasar.)'
    ],
    catatan: 'Beda sama "if"! "If" = jika (bersyarat setelah kejadian), sedangkan "in case" = tindakan persiapan sebelum hal itu terjadi. Sering banget dipake dalam frasa "just in case" (buat jaga-jaga aja).'
  },
  'just in case': {
    arti: 'Buat jaga-jaga aja / sekadar tindakan antisipasi atau pencegahan',
    cara_baca: 'jast in keys',
    penggunaan: [
      'I do not think it will rain, but take a jacket just in case! (Kayaknya gak bakal ujan sih, tapi bawa jaket aja ya buat jaga-jaga!)',
      'I saved a backup copy on my Google Drive just in case. (Gue udah nyimpen salinan cadangan di Google Drive buat jaga-jaga.)',
      'Always keep a first-aid kit in your car, just in case. (Selalu siapin kotak P3K di mobil lu, buat jaga-jaga aja.)'
    ],
    catatan: 'Frasa super populer yang sering ditaruh di paling ujung kalimat. Ringkas, santai, dan sangat alami di telinga native speaker.'
  },
  'sleepwalk': {
    arti: 'Tidur sambil jalan (berjalan atau beraktivitas tanpa sadar pas lagi tidur nyenyak)',
    cara_baca: 'sleep-wok',
    penggunaan: [
      'My little brother used to sleepwalk into the kitchen in the middle of the night. (Adik cowok gue dulu suka tidur sambil jalan ke dapur tengah malem.)',
      'She woke up near the front door and realized she had been sleepwalking. (Dia kebangun di deket pintu depan dan baru sadar kalo tadi tidur sambil jalan.)',
      'I was so exhausted today that I was basically sleepwalking through class. (Gue capek banget hari ini sampe rasanya kayak orang tidur sambil jalan pas di kelas.)'
    ],
    catatan: 'Orangnya disebut "sleepwalker". Di pergaulan santai, kata ini juga sering dipake secara kiasan pas lu ngerjain sesuatu kayak mayat hidup / robot saking ngantuk dan lelahnya.'
  },
  'sleep in': {
    arti: 'Tidur lebih lama dari biasanya (bangun siang dengan sengaja pas libur/weekend)',
    cara_baca: 'sleep in',
    penggunaan: [
      'It is Sunday tomorrow, so I am definitely going to sleep in! (Besok kan hari Minggu, gue fix bakal bangun siang puas-puasin tidur!)',
      'I rarely get to sleep in on weekdays. (Gue jarang banget bisa bangun siang pas hari kerja.)'
    ],
    catatan: 'Beda sama "oversleep"! "Oversleep" = ketiduran/kesiangan gak sengaja (panik). Kalau "sleep in" = emang sengaja tidur puas pas lagi libur.'
  },
  'sleep on it': {
    arti: 'Mikirin dulu semalaman sebelum mutusin (jangan buru-buru ambil keputusan sekarang)',
    cara_baca: 'sleep on it',
    penggunaan: [
      'Do not make a big decision right now. Sleep on it and let me know tomorrow. (Jangan langsung mutusin sekarang. Pikirin dulu semaleman, besok baru kabarin gue.)'
    ],
    catatan: 'Idiom populer pas lu disaranin tidur dulu biar otak lu lebih jernih dan tenang pas ngambil keputusan besar besok paginya.'
  },
  'depending': {
    arti: 'Tergantung / bergantung pada situasi (biasanya dalam frasa "depending on")',
    cara_baca: 'di-pen-ding',
    penggunaan: [
      'Depending on the weather, we might go to the beach tomorrow. (Tergantung cuacanya ya, besok kita mungkin bakal ke pantai.)',
      'The price can vary depending on where you buy it. (Harganya bisa beda-beda tergantung lu belinya di mana.)',
      'It all depends on your decision. (Semuanya tergantung sama keputusan lu.)'
    ],
    catatan: 'Hampir 99% selalu nempel sama kata "on" ("depending on..."). Kalo lu mau bilang "tergantung sikon nih", bisa pake ungkapan pendek "It depends!".'
  },
  'impure': {
    arti: 'Gak murni / kotor / terkontaminasi atau ada campuran zat lain (lawan dari kata "pure")',
    cara_baca: 'im-pyoor',
    penggunaan: [
      'The water from the river is impure, do not drink it directly! (Air dari sungai itu gak murni dan kotor, jangan diminum langsung!)',
      'He had impure intentions when offering that suspicious deal. (Dia punya niat terselubung yang gak tulus pas nawarin kesepakatan itu.)',
      'Gold mixed with copper is considered impure gold. (Emas yang dicampur tembaga dianggap bukan emas murni 100%.)'
    ],
    catatan: 'Awalan "im-" artinya "tidak". Jadi "impure" = tidak murni (lawan dari "pure"). Bisa dipakai buat cairan kotor atau niat seseorang yang ada maunya.'
  },
  'pure': {
    arti: 'Murni / bersih / asli 100% tanpa campuran zat lain atau tulus tanpa niat jahat',
    cara_baca: 'pyoor',
    penggunaan: [
      'This ring is made of pure 24k gold. (Cincin ini terbuat dari emas murni 24 karat.)',
      'Her sweet smile is pure joy. (Senyumannya bener-bener pancaran kebahagiaan yang tulus.)',
      'That victory was pure luck! (Kemenangan tadi itu bener-bener murni keberuntungan!)'
    ],
    catatan: 'Sering dipakai dalam percakapan sehari-hari kayak "pure luck" (murni hoki) atau "pure intention" (niat yang tulus).'
  },
  'nest': {
    arti: 'Sarang (tempat burung bertelur) / kiasan buat rumah atau tempat tinggal yang nyaman',
    cara_baca: 'nest',
    penggunaan: [
      'The birds built a warm nest in our backyard tree. (Burung-burung bikin sarang hangat di pohon halaman belakang rumah kita.)',
      'She turned her small apartment into a cozy nest. (Dia nyulap apartemen kecilnya jadi sarang ternyaman buat istirahat.)',
      'It is time to leave the nest and live independently. (Udah saatnya keluar dari rumah orang tua dan hidup mandiri merantau.)'
    ],
    catatan: 'Ada idiom populer "nest egg" (uang tabungan masa depan) dan "empty nest syndrome" (rasa sepi orang tua pas anak-anaknya udah pada dewasa dan merantau keluar rumah).'
  },
  'hug me': {
    arti: 'Sini peluk gw dong / peluk gw (ungkapan butuh sandaran, lagi sedih, atau pengen dimanja)',
    cara_baca: 'hag mee',
    penggunaan: [
      'Hug me, I have had such a long and stressful day. (Peluk gw dong, hari ini capek dan bikin stres banget asli.)',
      'Come here and hug me! (Sini dong peluk gw bentar!)',
      'Sometimes all you need is someone to hug you tight. (Terkadang yang lu butuhin cuma seseorang yang meluk lu erat.)'
    ],
    catatan: 'Frasa manis dan hangat buat nunjukin lu butuh sandaran emosional atau lagi pengen ditenangin sama orang tersayang.'
  },
  'rizz': {
    arti: 'Pesona / karisma buat ngegoda atau bikin lawan jenis klepek-klepek (singkatan dari "charisma")',
    cara_baca: 'riz',
    penggunaan: [
      'He has unspoken rizz, every girl falls for him. (Dia punya karisma diem-diem mematikan, cewek-cewek langsung naksir.)',
      'Are you trying to rizz me up right now? (Lu lagi nyoba ngegoda gue ya sekarang?)',
      'His pickup line had zero rizz. (Gombalan dia garing abis, gak ada pesonanya sama sekali.)'
    ],
    catatan: 'Terpilih jadi Oxford Word of the Year! Dipake buat muji pesona dan skill flirting seseorang pas lagi pdkt.'
  },
  'delulu': {
    arti: 'Halu / khayalan tingkat tinggi (singkatan gaul dari "delusional")',
    cara_baca: 'di-loo-loo',
    penggunaan: [
      'Thinking my favorite celebrity will marry me is my favorite delulu. (Mikir artis idola gue bakal nikahin gue adalah halu ternikmat gue.)',
      'Stay delulu until it comes trululu! (Tetaplah halu sampai jadi nyata!)',
      'She is completely delulu about her toxic ex. (Dia bener-bener halu mikir mantannya yang toxic bakal berubah.)'
    ],
    catatan: 'Jargon viral TikTok: "Delulu is the solulu" artinya punya rasa percaya diri yang kelewat batas terkadang ngebantu lu capai mimpi mustahil!'
  },
  'delusion': {
    arti: 'Delusi / halu / keyakinan khayalan yang gak sesuai sama kenyataan',
    cara_baca: 'di-loo-zhun',
    penggunaan: [
      'Thinking he will text you back at 3 AM is pure delusion. (Mikir dia bakal nge-chat balik jam 3 pagi itu halu tingkat tinggi sih.)',
      'She lives in her own world of delusion. (Dia hidup di dunia khayalan halunya sendiri.)',
      'Overconfidence can sometimes border on delusion. (Percaya diri berlebihan kadang beda tipis sama halu.)'
    ],
    catatan: 'Dari kata inilah lahir istilah viral medsos "delulu". Dipake pas lu mau nyindir orang yang punya fantasi gak realistis.'
  },
  'delusional': {
    arti: 'Halu parah / orang yang percaya khayalan gak masuk akal',
    cara_baca: 'di-loo-zhuh-nul',
    penggunaan: [
      'You are being completely delusional right now. (Lu beneran lagi halu parah banget sekarang asli.)'
    ],
    catatan: 'Bentuk kata sifat (*adjective*) dari delusion.'
  },
  'no cap': {
    arti: 'Serius / gak bohong / jujur asli 100%',
    cara_baca: 'noh kap',
    penggunaan: [
      'That burger was the best I have ever had, no cap! (Burger tadi beneran paling enak yang pernah gue makan, sumpah gak bohong!)',
      'I am really tired today, no cap. (Gue bener-bener capek hari ini, suer.)'
    ],
    catatan: 'Lawan dari kata "cap" (bohong/ngibul). Kalau temen lu ngomong sesuatu yang bikin kaget, lu bisa bales "No cap?".'
  },
  'cap': {
    arti: 'Bohong / ngibul / hoax',
    cara_baca: 'kap',
    penggunaan: [
      'That story sounds like total cap. (Cerita itu kedengeran kayak ngibul banget deh.)',
      'Stop capping, I know you were asleep! (Gausah ngibul lu, gue tau lu tadi lagi molor!)'
    ],
    catatan: 'Sering dipake dengan emoji topi 🧢 di medsos pas mau nuduh seseorang lagi nge-prank atau ngibul.'
  },
  'bet': {
    arti: 'Oke gas! / Boleh banget / Siap laksanakan / Deal!',
    cara_baca: 'bet',
    penggunaan: [
      'A: "Wanna grab some boba tonight?" B: "Bet!" (A: "Mau jajan boba ntar malem?" B: "Gas bray!")',
      'You think you can beat me in FIFA? Bet. (Lu pikir lu bisa ngalahin gue di FIFA? Ayo buktiin!)'
    ],
    catatan: 'Jawaban super singkat ala native speaker pengganti "Yes / Sure / Okay / I agree".'
  },
  'slay': {
    arti: 'Keren banget / tampil memukau / sukses besar ngerjain sesuatu',
    cara_baca: 'sley',
    penggunaan: [
      'Your outfit today is totally slaying! (OOTD lu hari ini bener-bener keren badai abis!)',
      'She slayed that job interview and got the offer! (Dia tampil memukau banget pas interview kerja dan langsung keterima!)'
    ],
    catatan: 'Biasa diucapkan ke temen buat ngasih compliment / apresiasi pas mereka tampil cakep atau berhasil capai sesuatu.'
  },
  'ate and left no crumbs': {
    arti: 'Tampil sempurna tanpa cela / nge-babat habis dan sukses total',
    cara_baca: 'eyt end left noh kramz',
    penggunaan: [
      'Did you see her presentation? She ate and left no crumbs! (Lu liat presentasinya dia gak? Bener-bener sempurna tanpa cela!)'
    ],
    catatan: 'Pujian tertinggi Gen Z di sosmed! Kiasan dari "makan sampai piringnya bersih gak ada remahan tersisa".'
  },
  'it\'s giving': {
    arti: 'Vibes-nya tuh kayak... / auranya ngingetin sama...',
    cara_baca: 'its gi-ving',
    penggunaan: [
      'Her outfit is giving main character energy. (Outfit dia auranya beneran kayak pemeran utama di film-film.)',
      'This room is giving luxury hotel vibes. (Kamar ini suasananya berasa kayak hotel bintang lima.)'
    ],
    catatan: 'Dipake pas lu mau ngegambarin kesan pertama atau aura dari seseorang, tempat, atau barang.'
  },
  'lowkey': {
    arti: 'Diem-diem / sebenernya agak / gak mau terlalu diumbar',
    cara_baca: 'loh-kee',
    penggunaan: [
      'I lowkey want to go home right now. (Gue diem-diem sebenernya pengen balik ke rumah sekarang deh.)',
      'I lowkey like that song even though it is cheesy. (Gue diem-diem suka lagu itu walau liriknya agak norak.)'
    ],
    catatan: 'Kebalikan dari "highkey". Dipake pas lu ngerasain sesuatu tapi gak mau heboh-heboh ngakuinnya.'
  },
  'highkey': {
    arti: 'Terang-terangan / jelas banget / gak pake rahasia lagi',
    cara_baca: 'hay-kee',
    penggunaan: [
      'I highkey love this drama series! (Gue terang-terangan suka banget sama serial drama ini!)'
    ],
    catatan: 'Lawan kata dari lowkey. Dipake pas lu mau nekanin sesuatu secara percaya diri dan blak-blakan.'
  },
  'simp': {
    arti: 'Bucin parah / orang yang rela ngelakuin apa aja demi gebetan yang belum tentu suka balik',
    cara_baca: 'simp',
    penggunaan: [
      'He bought her an expensive gift on the first date, what a simp! (Dia beliin kado mahal pas kencan pertama, bucin parah dah!)'
    ],
    catatan: 'Singkatan dari "Someone Idolizing Mediocre Pussy". Dipake buat ngeledek temen yang terlalu berlebihan ngejar cewek/cowok.'
  },
  'ick': {
    arti: 'Rasa ilfeel mendadak / jijik tiba-tiba karena hal sepele dari gebetan',
    cara_baca: 'ik',
    penggunaan: [
      'He chewed loudly on our date and it gave me the ick. (Dia ngunyah bersuara pas kencan dan langsung bikin gue ilfeel parah.)'
    ],
    catatan: 'Perasaan turn-off mendadak yang bikin rasa naksir lu langsung lenyap seketika gara-gara kebiasaan aneh si dia.'
  },
  'gatekeep': {
    arti: 'Pelit info / rahasia-rahasiaan gamau bagi tahu tempat, lagu, atau barang bagus ke orang lain',
    cara_baca: 'geyt-keep',
    penggunaan: [
      'Don\'t gatekeep that Spotify playlist, share the link! (Jangan pelit info disimpen sendiri dong playlist Spotify-nya, bagi linknya!)'
    ],
    catatan: 'Sering dipake di TikTok pas ada orang nemu thrift shop atau kafe bagus tapi gamau ngasih tau lokasinya.'
  },
  'gaslight': {
    arti: 'Memanipulasi pikiran orang lain biar mereka ngerasa bersalah atau ngeraguin kewarasan diri sendiri',
    cara_baca: 'gas-layt',
    penggunaan: [
      'He tried to gaslight me into thinking it was all my fault. (Dia nyoba memanipulasi gue biar gue ngerasa semua masalah itu salah gue.)'
    ],
    catatan: 'Taktik manipulasi psikologis toxic di mana pelaku muterbalikkan fakta sampai korbannya ngerasa mereka yang salah.'
  },
  'unhinged': {
    arti: 'Kelakuannya di luar nalar / random banget / rada gila & gak terkontrol',
    cara_baca: 'an-hinjd',
    penggunaan: [
      'His TikTok videos at 3 AM are completely unhinged. (Video TikTok dia jam 3 pagi bener-bener di luar nalar dan random abis.)'
    ],
    catatan: 'Kiasan dari pintu yang lepas engselnya ("hinge"). Dipake buat nyebut orang atau konten yang absurd parah.'
  },
  'touch grass': {
    arti: 'Keluar rumah gih / hirup udara segar / jangan kelamaan online di medsos',
    cara_baca: 'tach gras',
    penggunaan: [
      'You have been arguing on Twitter all day, go touch grass! (Lu udah seharian ribut di Twitter, mending keluar rumah hirup udara segar dah!)'
    ],
    catatan: 'Sindiran internet ke orang-orang yang terlalu lama di depan layar sampai lupa dunia nyata.'
  },
  'rent free': {
    arti: 'Kepikiran terus / nempel di otak seharian tanpa bisa diilangin',
    cara_baca: 'rent free',
    penggunaan: [
      'That catchy song is living rent-free in my head. (Lagu itu muter terus di kepala gue seharian gak mau ilang.)'
    ],
    catatan: 'Kiasan: "tinggal di kepala tanpa bayar sewa kos". Dipake pas ada lagu, meme, atau kejadian konyol yang lu inget mulu.'
  },
  'main character': {
    arti: 'Ngerasa diri jadi pemeran utama / hidup dengan penuh percaya diri dan gaya',
    cara_baca: 'meyn ke-rik-ter',
    penggunaan: [
      'Walking through the city with headphones on listening to jazz is my main character moment. (Jalan kaki di kota pake headphone sambil dengerin jazz tuh berasa jadi pemeran utama film.)'
    ],
    catatan: 'Lawan dari "NPC energy". Dipake buat momen-momen sinematik yang bikin lu ngerasa hidup lu seru.'
  },
  'hits different': {
    arti: 'Rasanya beda banget / punya kenikmatan atau sensasi tersendiri yang tiada tanding',
    cara_baca: 'hits dif-rent',
    penggunaan: [
      'Listening to sad songs while driving in the rain hits different. (Dengerin lagu galau pas nyetir waktu hujan tuh rasanya ngena banget.)'
    ],
    catatan: 'Dipake pas suatu hal biasa jadi berkali-kali lipat lebih nikmat karena suasana atau momen yang tepat.'
  },
  'periodt': {
    arti: 'Titik gak pake koma! / Titik no debat! (penegasan mutlak)',
    cara_baca: 'pee-ree-udt',
    penggunaan: [
      'Coffee is better than tea, periodt! (Kopi lebih enak dari teh, titik no debat!)'
    ],
    catatan: 'Plesetan dari kata "period" (tanda titik). Ditaruh di akhir kalimat buat nutup argumen biar gak didebat lagi.'
  },
  'sus': {
    arti: 'Mencurigakan / agak mencurigakan gelagatnya (singkatan dari "suspicious")',
    cara_baca: 'sas',
    penggunaan: [
      'Why is he acting so sus today? (Kenapa gelagat dia mencurigakan banget hari ini ya?)'
    ],
    catatan: 'Viral dari game Among Us. Dipake pas lu ngerasa ada orang yang nyimpen rahasia atau tingkahnya aneh.'
  },
  'side eye': {
    arti: 'Lirikan sinis / ngeliatin dari samping dengan tatapan curiga atau nge-judge',
    cara_baca: 'sayd ay',
    penggunaan: [
      'She gave me a bombastic side eye when I arrived late. (Dia ngelirik sinis banget pas gue dateng telat.)'
    ],
    catatan: 'Sering viral dengan audio TikTok "Bombastic side eye, criminal offensive side eye!".'
  },
  'glow up': {
    arti: 'Transformasi drastis jadi jauh lebih cakep, sehat, atau sukses dibanding dulu',
    cara_baca: 'gloh ap',
    penggunaan: [
      'Look at his old photos, he had such a massive glow up! (Liat foto jadul dia deh, glow up-nya parah banget bikin pangling!)'
    ],
    catatan: 'Bisa glow up fisik (makin rapi/ganteng/cantik) atau mental & finansial (makin mapan dan dewasa).'
  },
  'vibe': {
    arti: 'Suasana / aura / rasa kecocokan (PW atau nyambung)',
    cara_baca: 'vayb',
    penggunaan: [
      'This cafe has such a cozy and aesthetic vibe. (Kafe ini suasananya nyaman dan PW banget buat nongkrong.)',
      'I really vibe with her humor. (Gue nyambung dan klop banget sama guyonan dia.)'
    ],
    catatan: 'Bisa jadi kata benda ("the vibe" = suasananya) atau kata kerja ("to vibe with someone" = nyambung/klop bareng seseorang).'
  },
  'cringe': {
    arti: 'Malu sendiri / geli / canggung ngeliat kelakuan orang yang norak atau lebay',
    cara_baca: 'krinj',
    penggunaan: [
      'Watching my old high school TikTok videos is so cringe! (Nonton video TikTok gue zaman SMA dulu bikin malu sendiri deh!)',
      'His joke was so bad it made everyone cringe. (Guyonan dia garing banget sampai bikin seisi ruangan canggung.)'
    ],
    catatan: 'Perasaan geli atau malu yang bikin lu pengen nutup muka pas liat kelakuan orang yang lebay.'
  },
  'flex': {
    arti: 'Pamer / nunjuk-nunjukin barang mewah atau pencapaian biar keliatan keren',
    cara_baca: 'fleks',
    penggunaan: [
      'He bought a new sports car just to flex on his friends. (Dia beli mobil sport baru cuma buat pamer ke temen-temennya.)',
      'It is not a flex if you have to brag about it every day. (Bukan pamer keren namanya kalau lu harus koar-koar tiap hari.)'
    ],
    catatan: 'Pernah denger "weird flex but okay"? Itu artinya "agak aneh sih apa yang lu pamerin, tapi yaudah terserah lu".'
  },
  'spill the tea': {
    arti: 'Bocorin gosip dong / ceritain rahasia terbarunya',
    cara_baca: 'spil the tee',
    penggunaan: [
      'Come on, spill the tea! What happened yesterday? (Ayo dong bocorin infonya! Kemarin ada drama apa?)',
      'She always knows all the juicy tea in the office. (Dia selalu tau semua gosip terupdate dan terpanas di kantor.)'
    ],
    catatan: '"Tea" di sini bukan teh minuman, tapi plesetan slang dari huruf "T" alias "Truth" (kebenaran/gosip rahasia). Wajib dipake pas sesi gibah bareng bestie.'
  },
  'ghosting': {
    arti: 'Nge-ghosting / ngilang tiba-tiba tanpa kabar kayak hantu',
    cara_baca: 'gohs-ting',
    penggunaan: [
      'He ghosted me after our second date. (Dia ngilang gitu aja tanpa kabar abis kencan kedua, parah.)',
      'Ghosting someone is such a red flag. (Nge-ghosting orang itu tanda gak dewasa dan gak sopan.)'
    ],
    catatan: 'Diambil dari kata "ghost" (hantu). Dipake pas seseorang yang lagi intens chat-an tiba-tiba lenyap ditelan bumi tanpa pamit.'
  },
  'red flag': {
    arti: 'Sinyal bahaya / tanda peringatan sifat buruk seseorang yang mencurigakan',
    cara_baca: 'red flag',
    penggunaan: [
      'If someone is rude to waitstaff, that is a huge red flag. (Kalau ada orang kasar ke pelayan resto, itu tanda bahaya besar sih.)',
      'Always watch out for red flags early in a relationship. (Selalu pasang radar buat liat tanda-tanda mencurigakan dari awal kenalan.)'
    ],
    catatan: 'Di dunia nyata, bendera merah artinya bahaya. Di pergaulan & pacaran, "red flag" artinya kelakuan buruk yang jadi tanda lu harus mikir dua kali.'
  },
  'green flag': {
    arti: 'Tanda positif / sifat baik seseorang yang bikin nyaman dan layak dipercaya',
    cara_baca: 'green flag',
    penggunaan: [
      'He remembers small details about my day, huge green flag! (Dia inget hal-hal kecil tentang hari gue, green flag banget!)'
    ],
    catatan: 'Lawan kata dari red flag. Dipake buat muji sifat dewasa dan perhatian seseorang.'
  },
  'bussin': {
    arti: 'Enak banget / lezat parah tiada tanding (biasanya buat makanan)',
    cara_baca: 'ba-sin',
    penggunaan: [
      'This fried chicken is absolutely bussin! (Ayam goreng ini bener-bener enak parah asli!)'
    ],
    catatan: 'Slang AAVE yang viral di TikTok buat muji rasa makanan yang bikin nagih.'
  },
  'snatched': {
    arti: 'Cakep badai / bentuk badan atau dandanan yang terlihat sangat fit dan sempurna',
    cara_baca: 'snacht',
    penggunaan: [
      'Her waist looks so snatched in that dress! (Pinggang dia keliatan ramping dan cakep badai di gaun itu!)'
    ],
    catatan: 'Pujian fashion buat bentuk badan atau makeup yang on-point banget.'
  },
  'deadass': {
    arti: 'Seriusan asli / gak bercanda sama sekali (suer deh)',
    cara_baca: 'ded-as',
    penggunaan: [
      'I am deadass tired, I need to sleep right now. (Gue bener-bener capek mati asli, harus tidur sekarang juga.)'
    ],
    catatan: 'Slang khas New York buat nekanin kejujuran mutlak.'
  },
  'cooking': {
    arti: 'Lagi beraksi / lagi ngerjain sesuatu yang bakal bikin takjub',
    cara_baca: 'ku-king',
    penggunaan: [
      'Hold on, let him cook! (Tunggu dulu, biarin dia beraksi dan buktiin kemampuannya!)'
    ],
    catatan: 'Meme populer "Let him cook": jangan diganggu pas seseorang lagi berusaha nunjukin keahliannya.'
  },
  'aura': {
    arti: 'Poin karisma / wibawa / level kekerenan yang terpancar dari seseorang',
    cara_baca: 'oh-ruh',
    penggunaan: [
      'He helped that lost cat, +1000 aura! (Dia nolongin kucing yang tersesat, langsung nambah 1000 poin aura karisma!)'
    ],
    catatan: 'Tren Gen Z menghitung "+1000 aura" (makin keren) atau "-500 aura" (bikin malu sendiri).'
  },
  'crash out': {
    arti: 'Ngamuk tiba-tiba / meledak emosi sampai nekat ngelakuin hal bodoh yang ngerugiin diri sendiri',
    cara_baca: 'krash awt',
    penggunaan: [
      'Bro lost his temper and crashed out over a video game. (Bro ngamuk gak kekontrol gara-gara kalah main game doang.)'
    ],
    catatan: 'Slang viral 2024 buat orang yang lepas kendali emosi sampai ngerusak barang atau cari ribut.'
  },

  // =========================================================================
  // 2. ❤️ RELATIONSHIPS, PSYCHOLOGY & EMOTIONS
  // =========================================================================
  'situationship': {
    arti: 'Hubungan tanpa status (HTS) / jalanin aja lebih dari temen tapi bukan pacaran',
    cara_baca: 'si-choo-ey-shun-ship',
    penggunaan: [
      'We have been in a situationship for six months and I am exhausted. (Kita udah HTS-an 6 bulan dan gue capek gak ada kepastian gini.)',
      'I need clarity, I don\'t want to be stuck in a situationship. (Gue butuh kejelasan, gamau digantungin di hubungan tanpa status.)'
    ],
    catatan: 'Gabungan dari kata "situation" dan "relationship". Fenomena kencan modern di mana kalian mesra kayak pacaran tapi gamau ngasih komitmen resmi.'
  },
  'love bombing': {
    arti: 'Menghujani perhatian, pujian, dan hadiah berlebihan di awal kenalan demi memikat hati secepat kilat',
    cara_baca: 'lav bom-bing',
    penggunaan: [
      'He sent flowers every day in the first week, it felt like love bombing. (Dia ngirimin bunga tiap hari pas minggu pertama, berasa banget love bombing-nya.)'
    ],
    catatan: 'Sering jadi taktik manipulasi di mana pelaku bikin korban terlena di awal, lalu perlahan mulai ngontrol dan ngatur-ngatur.'
  },
  'breadcrumbing': {
    arti: 'Ngasi harapan palsu dikit-dikit (remah roti) biar gebetan gak kabur tapi gak pernah diseriusin',
    cara_baca: 'bred-kram-bing',
    penggunaan: [
      'Stop replying to his late-night texts, he is just breadcrumbing you. (Udah jangan dibales chat tengah malem dia, dia cuma ngasi harapan palsu doang.)'
    ],
    catatan: 'Kiasan melempar remahan roti ke burung biar burungnya ngikutin terus tanpa dikasi makan kenyang.'
  },
  'closure': {
    arti: 'Titik temu kejelasan / obrolan pamungkas buat berdamai dan nerima akhir dari suatu hubungan',
    cara_baca: 'kloh-zher',
    penggunaan: [
      'I needed closure after the breakup so I could finally move on. (Gue butuh kejelasan dan obrolan terakhir abis putus biar bisa ikhlas move on.)'
    ],
    catatan: 'Bukan sekadar kata penutup, tapi rasa tenang di hati saat semua pertanyaan dan rasa mengganjal udah terjawab tuntas.'
  },
  'boundaries': {
    arti: 'Batasan pribadi / prinsip privasi & kenyamanan diri yang gak boleh dilanggar orang lain',
    cara_baca: 'bawn-duh-reez',
    penggunaan: [
      'Setting healthy boundaries with coworkers is essential for mental peace. (Bikin batasan yang jelas sama temen kantor itu penting banget buat ketenangan batin.)'
    ],
    catatan: 'Konsep psikologi populer: kemampuan bilang "tidak" tanpa ngerasa bersalah demi menjaga kesehatan mental diri sendiri.'
  },
  'burnout': {
    arti: 'Kelelahan mental & fisik parah akibat stres kerjaan berkepanjangan tanpa istirahat',
    cara_baca: 'bern-awt',
    penggunaan: [
      'Working 70 hours a week led him to severe burnout. (Kerja 70 jam seminggu bikin dia burnout dan tumbang parah.)'
    ],
    catatan: 'Kondisi saat baterai tubuh dan pikiran lu beneran udah 0% dan lu kehilangan motivasi buat ngelakuin apa pun.'
  },
  'overwhelmed': {
    arti: 'Kewalahan / ngerasa beban pikiran dan tugas numpuk terlalu banyak sampai mau meledak',
    cara_baca: 'oh-ver-welmd',
    penggunaan: [
      'I am feeling completely overwhelmed with final exams. (Gue ngerasa kewalahan banget ngadepin ujian akhir semester ini.)'
    ],
    catatan: 'Sensasi saat lu ngerasa otak lu overload dan gak tau harus mulai ngerjain yang mana dulu.'
  },
  'anxiety': {
    arti: 'Kecemasan / rasa gelisah dan overthinking berlebihan tentang apa yang bakal terjadi',
    cara_baca: 'ang-zay-uh-tee',
    penggunaan: [
      'Public speaking always gives me intense anxiety. (Ngomong di depan umum selalu bikin gue cemas dan deg-degan parah.)'
    ],
    catatan: 'Respon tubuh saat lu merasa terancam atau overthinking masa depan. Cara bacanya "ang-ZAY-uh-tee", bukan "an-ksi-e-ti".'
  },
  'nostalgia': {
    arti: 'Nostalgia / rasa rindu yang manis bercampur haru sama kenangan masa lalu yang indah',
    cara_baca: 'nah-stal-juh',
    penggunaan: [
      'Hearing that old pop song filled me with nostalgia. (Denger lagu pop jadul itu langsung bikin gue kangen masa-masa SMA dulu.)'
    ],
    catatan: 'Perasaan hangat saat lu nginget masa kecil atau masa-masa indah yang udah lewat dan gak bisa diulang lagi.'
  },
  'bittersweet': {
    arti: 'Manis-pahit / perasaan campur aduk antara bahagia tapi juga ada sedihnya',
    cara_baca: 'bi-ter-sweet',
    penggunaan: [
      'Graduation day was a bittersweet moment; happy to finish, sad to leave friends. (Hari wisuda tuh rasanya campur aduk; seneng lulus tapi sedih pisah sama temen.)'
    ],
    catatan: 'Dipake buat momen perpisahan atau pencapaian besar yang bikin lu bahagia tapi sekaligus ada rasa kehilangan.'
  },
  'serendipity': {
    arti: 'Kebetulan yang menyenangkan / nemu hal berharga tanpa sengaja dicari',
    cara_baca: 'seh-ren-di-pi-tee',
    penggunaan: [
      'Meeting my best friend at a random bus stop was pure serendipity. (Ketemu sahabat karib di halte bis antah berantah beneran kebetulan yang indah banget.)'
    ],
    catatan: 'Salah satu kata terindah dalam bahasa Inggris! Digunakan buat momen hoki atau takdir baik yang dateng tiba-tiba.'
  },
  'epiphany': {
    arti: 'Momen pencerahan mendadak / momen "AHA!" saat tiba-tiba lu paham jalan keluarnya',
    cara_baca: 'ee-pif-uh-nee',
    penggunaan: [
      'I had an epiphany while showering and solved the bug! (Gue dapet pencerahan pas lagi mandi dan langsung nemu solusi error kodingannya!)'
    ],
    catatan: 'Momen magis saat potongan puzzle di kepala lu tiba-tiba nyatu dan bikin semuanya jadi jelas seketika.'
  },
  'procrastinate': {
    arti: 'Nunda-nunda pekerjaan / hobi entar-entaran sampai mepet deadline',
    cara_baca: 'proh-kras-tuh-neyt',
    penggunaan: [
      'Stop procrastinating and finish your essay now! (Berhenti nunda-nunda dan kelarin tugas esai lu sekarang juga!)'
    ],
    catatan: 'Kebiasaan sejuta umat: ngerjain hal-hal gak penting cuma demi ngindarin tugas utama yang bikin pusing.'
  },
  'FOMO': {
    arti: 'Takut ketinggalan tren / cemas kalau gak ikutan hal seru yang lagi viral (Fear Of Missing Out)',
    cara_baca: 'foh-moh',
    penggunaan: [
      'I bought the concert ticket just because of FOMO. (Gue beli tiket konser itu murni cuma gara-gara gamau ketinggalan hype doang.)'
    ],
    catatan: 'Singkatan resmi di kamus Oxford! Perasaan gelisah pas liat story temen-temen lu lagi nongkrong tanpa lu.'
  },
  'JOMO': {
    arti: 'Bahagia menikmati me-time di rumah tanpa peduli keramaian di luar (Joy Of Missing Out)',
    cara_baca: 'joh-moh',
    penggunaan: [
      'Staying home on a Saturday night with Netflix is pure JOMO. (Rebahan di rumah malam Minggu sambil nonton Netflix tuh nikmatnya tiada dua.)'
    ],
    catatan: 'Lawan dari FOMO! Sikap damai saat lu lebih milih istirahat rebahan daripada capek-capek nongkrong di luar.'
  },
  'vulnerable': {
    arti: 'Rentan / terbuka secara emosional nunjukin sisi lemah diri ke orang lain',
    cara_baca: 'val-nuh-ruh-bul',
    penggunaan: [
      'It takes immense courage to be vulnerable with someone you love. (Butuh keberanian besar buat jujur nunjukin sisi rapuh lu ke orang yang lu sayang.)'
    ],
    catatan: 'Bukan berarti lemah, tapi keberanian buat jadi diri sendiri tanpa topeng gengsi.'
  },
  'pet peeve': {
    arti: 'Hal sepele tapi bikin kesel setengah mati / kebiasaan orang yang bikin lu gatel pengen negur',
    cara_baca: 'pet peev',
    penggunaan: [
      'My biggest pet peeve is people who walk slowly in narrow hallways. (Hal paling bikin gue kesel tuh orang yang jalan lelet di lorong sempit.)'
    ],
    catatan: 'Kekesalan spesifik yang bagi orang lain biasa aja, tapi bagi lu bisa ngerusak mood seharian.'
  },
  'people pleaser': {
    arti: 'Orang yang gak enakan / selalu berusaha nyenengin semua orang sampai ngorbanin diri sendiri',
    cara_baca: 'pee-pul plee-zer',
    penggunaan: [
      'I used to be a people pleaser and always said yes to everyone. (Dulu gue orangnya gak enakan banget dan selalu iyain permintaan orang.)'
    ],
    catatan: 'Sindiran buat orang yang susah bilang "enggak" karena takut dijauhi atau gak disukai.'
  },
  'trauma dumping': {
    arti: 'Curhat masalah berat secara mendadak ke orang lain tanpa permisi atau liat situasi',
    cara_baca: 'traw-muh dam-ping',
    penggunaan: [
      'Please don\'t trauma dump on me right before my job interview. (Tolong jangan curhat masalah berat lu pas banget sebelum gue interview kerja dong.)'
    ],
    catatan: 'Istilah psikologi modern pas seseorang numpuk beban emosionalnya ke orang lain secara sepihak.'
  },

  // =========================================================================
  // 3. 💼 EVERYDAY CONVERSATIONS, WORKPLACE & IDIOMS
  // =========================================================================
  'call it a day': {
    arti: 'Cukup buat hari ini / sudahi pekerjaan dan mari kita pulang istirahat',
    cara_baca: 'kohl it uh dey',
    penggunaan: [
      'We have been working for 9 hours straight, let\'s call it a day! (Kita udah kerja 9 jam nonstop, yuk udahan dulu hari ini dan pulang!)',
      'I am exhausted, time to call it a day. (Gue udah capek banget, saatnya udahan buat hari ini.)'
    ],
    catatan: 'Ungkapan wajib pas jam kantor udah selesai dan tim sepakat buat lanjutin kerjaan besok lagi.'
  },
  'break a leg': {
    arti: 'Semoga sukses! / Good luck buat penampilan atau ujian lu!',
    cara_baca: 'breyk uh leg',
    penggunaan: [
      'You are going to do great on stage tonight, break a leg! (Lu pasti bakal tampil keren di panggung malam ini, semoga sukses ya!)'
    ],
    catatan: 'Tradisi teater barat: ngucapin "good luck" dianggap pamali, jadi mereka bilang "break a leg" sebagai doa keberuntungan.'
  },
  'piece of cake': {
    arti: 'Gampang banget / cetek / ece-ece / sepele',
    cara_baca: 'pees av keyk',
    penggunaan: [
      'Don\'t worry about the driving test, it is a piece of cake! (Santai aja ujian nyetirnya mah gampang banget, pasti lulus!)'
    ],
    catatan: 'Kiasan untuk sesuatu yang sangat mudah dikerjakan, sama gampangnya kayak nelen sepotong kue enak.'
  },
  'under the weather': {
    arti: 'Lagi kurang enak badan / meriang / agak gak fit',
    cara_baca: 'an-der the we-ther',
    penggunaan: [
      'I cannot make it to the party tonight, I am feeling a bit under the weather. (Gue gabisa dateng ke pesta nanti malam, lagi agak gak enak badan nih.)'
    ],
    catatan: 'Cara paling sopan dan natural pas mau izin gak masuk kantor atau batalin janji karena meriang.'
  },
  'cut corners': {
    arti: 'Mengambil jalan pintas yang asal-asalan demi hemat waktu atau duit tapi ngorbanin kualitas',
    cara_baca: 'kat kor-nerz',
    penggunaan: [
      'Do not cut corners on safety equipment! (Jangan pelit dan asal-asalan kalo soal alat keselamatan kerja!)'
    ],
    catatan: 'Dipake pas seseorang kerja secara serampangan atau pake bahan murahan demi ngejar target instan.'
  },
  'on the same page': {
    arti: 'Satu frekuensi / sepaham dan punya pemikiran yang sama',
    cara_baca: 'on the seym peyj',
    penggunaan: [
      'Let\'s have a quick meeting to make sure we are all on the same page. (Yuk meeting kilat sebentar biar kita semua satu pemikiran.)'
    ],
    catatan: 'Frasa favorit di dunia kerja startup & kantor multinasional buat mastiin gak ada miskomunikasi.'
  },
  'touch base': {
    arti: 'Ngobrol singkat / kontak sebentar buat saling update kabar atau progres',
    cara_baca: 'tach beys',
    penggunaan: [
      'Let\'s touch base next Monday to review the project status. (Senin depan kita kontak-kontakan lagi ya buat cek progres project-nya.)'
    ],
    catatan: 'Frasa formal santai yang sering muncul di email kerja atau WhatsApp bisnis.'
  },
  'pull an all-nighter': {
    arti: 'Begadang semalaman suntuk gak tidur sama sekali demi ngerjain tugas/project',
    cara_baca: 'pul en ohl-nay-ter',
    penggunaan: [
      'I had to pull an all-nighter to finish the assignment before 8 AM. (Gue terpaksa begadang semaleman buat kelarin tugas sebelum jam 8 pagi.)'
    ],
    catatan: 'Rutinitas legendaris anak kuliah dan programmer pas lagi dikejar deadline mepet.'
  },
  'take it easy': {
    arti: 'Santai aja / rileks / jangan dibawa stres / jaga diri baik-baik',
    cara_baca: 'teyk it ee-zee',
    penggunaan: [
      'Take it easy, man! Everything is going to be fine. (Santai aja bro, semuanya bakal baik-baik aja kok.)',
      'See you next week, take it easy! (Sampai ketemu minggu depan ya, jaga diri baik-baik!)'
    ],
    catatan: 'Bisa jadi ucapan penyemangat pas temen lagi panik, atau ucapan perpisahan santai pas mau pamit pulang.'
  },
  'seize the day': {
    arti: 'Manfaatkan hari ini sebaik-baiknya / jangan sia-siakan kesempatan sekarang (Carpe Diem)',
    cara_baca: 'seez the dey',
    penggunaan: [
      'Wake up early and seize the day! (Bangun pagi dan manfaatin hari ini dengan penuh semangat!)'
    ],
    catatan: 'Terjemahan bahasa Inggris dari pepatah latin legendaris "Carpe Diem".'
  },
  'bite the bullet': {
    arti: 'Menelan pil pahit / memberanikan diri ngadepin hal sulit yang gak bisa dihindari lagi',
    cara_baca: 'bayt the bu-let',
    penggunaan: [
      'I didn\'t want to pay the fine, but I had to bite the bullet and pay it. (Gue males bayar denda, tapi mau gak mau harus berani ngadepin dan bayar.)'
    ],
    catatan: 'Asal-usulnya dari tentara zaman dulu yang disuruh gigit peluru timah buat nahan rasa sakit pas diobati tanpa bius.'
  },
  'out of the blue': {
    arti: 'Tiba-tiba banget tanpa aba-aba / muncul mendadak dari antah berantah',
    cara_baca: 'awt av the bloo',
    penggunaan: [
      'She called me out of the blue after three years of silence. (Dia tiba-tiba nelpon gue tanpa aba-aba setelah 3 tahun ngilang.)'
    ],
    catatan: 'Kiasan dari petir yang tiba-tiba menyambar pas langit lagi biru cerah.'
  },
  'once in a blue moon': {
    arti: 'Langka banget / jarang-jarang terjadi (seabad sekali)',
    cara_baca: 'wans in uh bloo moon',
    penggunaan: [
      'He only visits his hometown once in a blue moon. (Dia pulang ke kampung halamannya jarang banget, bisa dibilang langka.)'
    ],
    catatan: 'Fenomena bulan biru itu sangat langka, makanya frasa ini dipake buat hal yang jarang banget kejadian.'
  },
  'play devil\'s advocate': {
    arti: 'Sengaja ngambil sudut pandang berlawanan cuma buat nguji kekuatan argumen',
    cara_baca: 'pley de-vilz ad-vuh-kit',
    penggunaan: [
      'Let me play devil\'s advocate: what if our competitors launch first? (Coba gue ambil sudut pandang kritis ya: gimana kalau kompetitor rilis duluan?)'
    ],
    catatan: 'Frasa super penting pas brainstorming biar keputusan tim gak bias dan bener-bener matang.'
  },
  'elephant in the room': {
    arti: 'Masalah besar yang jelas-jelas ada di depan mata tapi semua orang pura-pura gak liat atau gak mau bahas',
    cara_baca: 'e-li-funt in the room',
    penggunaan: [
      'Nobody wanted to address the elephant in the room: our budget deficit. (Gak ada yang berani ngomongin masalah paling gajah di ruangan: defisit anggaran kita.)'
    ],
    catatan: 'Kiasan adanya gajah gede di dalem ruangan yang bikin canggung tapi didiemin semua orang.'
  },
  'cut to the chase': {
    arti: 'Langsung ke intinya aja / gak usah bertele-tele atau muter-muter',
    cara_baca: 'kat too the cheys',
    penggunaan: [
      'We don\'t have much time, so let\'s cut to the chase. (Waktu kita mepet, yuk langsung ke intinya aja.)'
    ],
    catatan: 'Berasal dari istilah perfilman zaman dulu saat sutradara langsung motong adegan ke adegan kejar-kejaran seru.'
  },

  // =========================================================================
  // 4. 🧠 HIGH-FREQUENCY VERBS, TRANSITIONS & CRITICAL THINKING
  // =========================================================================
  'figure out': {
    arti: 'Mencari tahu / memecahkan solusi / akhirnya ngerti cara kerjanya',
    cara_baca: 'fi-gyer awt',
    penggunaan: [
      'I finally figured out how to fix this annoying code error! (Gue akhirnya nemu cara benerin error kodingan yang nyebelin ini!)',
      'We need to figure out what went wrong. (Kita harus cari tau apa yang bikin gagal.)'
    ],
    catatan: 'Salah satu phrasal verb paling sering dipake native speaker. Beda sama "know", "figure out" ada proses mikir dan usahanya dulu.'
  },
  'come up with': {
    arti: 'Menemukan ide baru / memikirkan solusi yang kreatif',
    cara_baca: 'kam ap with',
    penggunaan: [
      'She came up with a brilliant idea for our marketing campaign. (Dia nemuin ide brilian banget buat kampanye promosi kita.)'
    ],
    catatan: 'Wajib dipake pas sesi brainstorming atau pas lu tiba-tiba punya solusi jenius.'
  },
  'get along with': {
    arti: 'Akur / nyambung / cocok berteman bareng seseorang',
    cara_baca: 'get uh-long with',
    penggunaan: [
      'I get along with my roommate really well. (Gue akur dan cocok banget sama temen sekamar gue.)'
    ],
    catatan: 'Dipake buat nyeritain hubungan yang harmonis dan seru tanpa drama.'
  },
  'catch up': {
    arti: 'Ngobrol tukar kabar terbaru / menyusul ketertinggalan materi',
    cara_baca: 'kach ap',
    penggunaan: [
      'Let\'s grab coffee this weekend and catch up! (Yuk ngopi akhir pekan ini sambil ngobrol tuker kabar!)',
      'I need to catch up on my sleep. (Gue harus bayar utang tidur gue nih.)'
    ],
    catatan: 'Frasa wajib buat ngajak reuni atau ketemu temen lama yang udah berbulan-bulan gak ketemu.'
  },
  'look forward to': {
    arti: 'Udah gak sabar nungguin / sangat menanti-nantikan dengan antusias',
    cara_baca: 'luk for-werd too',
    penggunaan: [
      'I am really looking forward to our holiday trip! (Gue beneran udah gak sabar banget nungguin liburan kita!)'
    ],
    catatan: 'Ingat! Setelah kata "to" di frasa ini, selalu ikuti dengan Verb-ing (contoh: "looking forward to seeing you").'
  },
  'worth it': {
    arti: 'Sepadan / sebanding sama usaha, waktu, atau uang yang dikeluarin (gak nyesel)',
    cara_baca: 'werth it',
    penggunaan: [
      'The queue was two hours long, but the ramen was totally worth it! (Antrenya 2 jam sih, tapi rasa ramennya bener-bener sepadan banget, gak nyesel!)'
    ],
    catatan: 'Jawaban pas temen nanya: "Worth it gak beli barang itu?". Lawannya adalah "not worth it" (buang-buang duit/waktu).'
  },
  'literally': {
    arti: 'Bener-bener secara harfiah / asli tanpa lebay (atau penekanan emosi)',
    cara_baca: 'li-tuh-ruh-lee',
    penggunaan: [
      'I was literally laughing out loud for ten minutes. (Gue bener-bener ketawa ngakak nonstop 10 menit asli.)'
    ],
    catatan: 'Kata penguat paling sering diucapin anak muda. Dipake pas lu mau nekanin apa yang lu alamin itu 100% nyata.'
  },
  'basically': {
    arti: 'Pada dasarnya / intinya tuh gini / singkat ceritanya',
    cara_baca: 'bey-sik-lee',
    penggunaan: [
      'Basically, we missed the last train and had to walk home. (Intinya mah kita ketinggalan kereta terakhir dan terpaksa jalan kaki balik ke rumah.)'
    ],
    catatan: 'Kata pembuka terbaik pas lu mau ngejelasin cerita panjang jadi satu kesimpulan simpel.'
  },
  'such': {
    arti: 'Sangat / bener-bener / sedemikian rupa',
    cara_baca: 'sach',
    penggunaan: [
      'It was such a lovely day with you. (Hari tadi bener-bener hari yang sangat menyenangkan bareng lu.)',
      'Why are you in such a hurry? (Kenapa lu buru-buru banget dah?)'
    ],
    catatan: 'Dipake buat ngasih penekanan sebelum kata benda: "such a great person" = orang yang bener-bener baik banget.'
  },
  'though': {
    arti: 'Tapi / meskipun gitu / walau demikian (sering ditaruh di akhir kalimat)',
    cara_baca: 'dhoh',
    penggunaan: [
      'The phone is expensive. The camera is incredible, though! (Hape itu mahal sih. Tapi kameranya emang juara banget asli!)'
    ],
    catatan: 'Native speaker suka banget naruh "though" di paling ujung kalimat sebagai pengganti kata "but".'
  },
  'paradox': {
    arti: 'Hal yang saling bertentangan tapi dua-duanya nyata dan bener',
    cara_baca: 'pe-ruh-doks',
    penggunaan: [
      'The paradox of modern technology: more connected online, yet feeling more lonely. (Paradoks teknologi modern: makin terhubung di medsos, tapi makin berasa kesepian di dunia nyata.)'
    ],
    catatan: 'Konsep filosofis keren buat ngejelasin dua kenyataan kontradiktif yang terjadi bersamaan.'
  },
  'nuance': {
    arti: 'Perbedaan makna atau nuansa halus yang tipis tapi penting',
    cara_baca: 'noo-ahns',
    penggunaan: [
      'There is a subtle nuance between being confident and being arrogant. (Ada perbedaan nuansa yang tipis banget antara percaya diri sama sombong.)'
    ],
    catatan: 'Kata kunci buat pembelajar bahasa tingkat lanjut: paham perbedaan tipis di antara dua kata mirip.'
  },
  'pragmatic': {
    arti: 'Praktis & realistis / fokus pada apa yang bener-bener bisa diterapin di lapangan, bukan sekadar teori',
    cara_baca: 'prag-ma-tik',
    penggunaan: [
      'We need a pragmatic solution to fix this traffic congestion. (Kita butuh solusi praktis dan realistis buat ngatasin kemacetan ini.)'
    ],
    catatan: 'Pujian buat orang yang gak banyak omong teori tapi langsung ngasih solusi yang manjur.'
  },
  'resilience': {
    arti: 'Daya lentur mental / kemampuan bangkit kembali lebih kuat sehabis jatuh atau gagal',
    cara_baca: 'ri-zil-yuns',
    penggunaan: [
      'Her resilience after losing the competition inspired everyone. (Ketahanan mental dia buat bangkit sehabis kalah lomba bener-bener menginspirasi semua orang.)'
    ],
    catatan: 'Kualitas mental nomor 1 buat orang sukses: gak gampang nyerah pas dihantam kegagalan.'
  },
  'night owl': {
    arti: 'Kalong / orang yang lebih produktif dan aktif pas tengah malam',
    cara_baca: 'nayt owl',
    penggunaan: [
      'I am definitely a night owl, I get all my best coding done at 2 AM. (Gue fix anak kalong sih, kodingan paling lancar pas jam 2 pagi.)'
    ],
    catatan: 'Lawan kata dari "early bird" (orang yang suka bangun subuh pagi-pagi).'
  },
  'early bird': {
    arti: 'Orang yang rajin bangun pagi-pagi buta',
    cara_baca: 'er-lee berd',
    penggunaan: [
      'My dad is an early bird, he wakes up at 5 AM every single day. (Bokap gue anak subuh banget, tiap hari bangun jam 5 pagi.)'
    ],
    catatan: 'Pepatah terkenal: "The early bird catches the worm" (siapa yang rajin bangun pagi, dia yang dapet rezeki duluan).'
  },

  // =========================================================================
  // 5. 🎯 100 BRAND NEW UNIQUE CURATED DATASET (ZERO DUPLICATES)
  // =========================================================================
  'hang out': {
    arti: 'Nongkrong / kumpul santai bareng temen-temen buat ngabisin waktu',
    cara_baca: 'hang awt',
    penggunaan: [
      'Do you want to hang out at the cafe after work? (Mau nongkrong di kafe gak abis pulang kerja?)',
      'We hung out all afternoon playing video games. (Kita nongkrong seharian main game bareng.)'
    ],
    catatan: 'Frasa wajib anak muda! Kalau mau ngajak main santai tanpa acara resmi, gunakan "hang out".'
  },
  'chill out': {
    arti: 'Rileks / santai dulu / dinginin kepala jangan emosi atau panik',
    cara_baca: 'chil awt',
    penggunaan: [
      'Just chill out, everything is under control! (Santai dulu bro, semuanya aman terkendali kok!)'
    ],
    catatan: 'Sering disingkat jadi "chill" aja ("Let\'s just chill" = yuk santai-santai aja).'
  },
  'blessing in disguise': {
    arti: 'Berkah terselubung / musibah yang awalnya keliatan buruk tapi ternyata bawa hikmah luar biasa',
    cara_baca: 'ble-sing in dis-gayz',
    penggunaan: [
      'Losing that job was a blessing in disguise because I started my own business. (Di-PHK dari kerjaan itu ternyata berkah terselubung karena gue jadi mulai bisnis sendiri.)'
    ],
    catatan: 'Idiom indah pas lu nemu hikmah emas di balik kegagalan masa lalu.'
  },
  'cost an arm and a leg': {
    arti: 'Mahal banget / harganya gak ngotak sampai bikin kantong jebol',
    cara_baca: 'kost en arm end uh leg',
    penggunaan: [
      'That designer jacket costs an arm and a leg! (Jaket branded itu harganya gak ngotak mahal banget!)'
    ],
    catatan: 'Kiasan: "saking mahalnya serasa harus bayar pake tangan dan kaki".'
  },
  'burn the midnight oil': {
    arti: 'Bekerja atau belajar keras sampai larut malam suntuk',
    cara_baca: 'bern the mid-nayt oyl',
    penggunaan: [
      'She is burning the midnight oil to prepare for the bar exam. (Dia belajar keras sampai larut malam buat persiapan ujian profesi advokat.)'
    ],
    catatan: 'Berasal dari zaman dulu saat orang harus menyalakan lentera minyak buat belajar di malam hari.'
  },
  'hit the books': {
    arti: 'Mulai belajar serius / buka buku buat ngejar materi ujian',
    cara_baca: 'hit the buks',
    penggunaan: [
      'Exam week is coming, time to hit the books! (Minggu ujian udah deket, saatnya buka buku dan belajar serius!)'
    ],
    catatan: 'Frasa paling sering dipake mahasiswa di US buat ngajak belajar kelompok.'
  },
  'cold turkey': {
    arti: 'Berhenti total secara mendadak dari kebiasaan buruk tanpa dikurangin bertahap',
    cara_baca: 'kohld ter-kee',
    penggunaan: [
      'He quit smoking cold turkey two years ago. (Dia langsung berhenti total merokok secara mendadak 2 tahun lalu.)'
    ],
    catatan: 'Metode berhenti kecanduan secara instan 100% tanpa fase transisi.'
  },
  'spill the beans': {
    arti: 'Membocorkan rahasia atau rencana kejutan tanpa sengaja',
    cara_baca: 'spil the beenz',
    penggunaan: [
      'Don\'t tell Sarah about the party, she will spill the beans! (Jangan kasih tau Sarah soal pesta kejutannya, dia gampang keceplosan bocorin rahasia!)'
    ],
    catatan: 'Mirip sama "spill the tea", tapi "spill the beans" lebih fokus ke rencana/rahasia yang bocor sebelum waktunya.'
  },
  'hit the nail on the head': {
    arti: 'Tepat sasaran / analisanya bener banget 100% tanpa meleset',
    cara_baca: 'hit the neyl on the hed',
    penggunaan: [
      'You hit the nail on the head with that market analysis! (Analisa pasar lu tadi bener-bener tepat sasaran banget!)'
    ],
    catatan: 'Kiasan memukul paku tepat di kepalanya.'
  },
  'jump on the bandwagon': {
    arti: 'Ikut-ikutan tren yang lagi ramai / latah ngikut orang banyak',
    cara_baca: 'jamp on the bend-we-gun',
    penggunaan: [
      'Everyone is jumping on the AI bandwagon this year. (Tahun ini semua orang pada latah ikutan tren bikin aplikasi AI.)'
    ],
    catatan: 'Dipake pas ada tren viral dan semua orang berbondong-bondong ikutan biar gak dibilang kudet.'
  },
  'burn bridges': {
    arti: 'Memutus hubungan pertemanan/koneksi kerja secara buruk sampai gabisa balik lagi',
    cara_baca: 'bern bri-jiz',
    penggunaan: [
      'Never burn bridges when leaving a job, you might need a reference later. (Jangan pernah putus hubungan buruk pas resign kerja, siapa tau lu butuh koneksi di masa depan.)'
    ],
    catatan: 'Kiasan membakar jembatan yang bikin lu gabisa nyebrang balik ke tempat asal.'
  },
  'stab in the back': {
    arti: 'Menusuk dari belakang / berkhianat ke sahabat sendiri secara diam-diam',
    cara_baca: 'stab in the bak',
    penggunaan: [
      'I trusted him with my idea, but he stabbed me in the back. (Gue udah percaya sama dia, tapi dia malah nikung ide gue dari belakang.)'
    ],
    catatan: 'Orangnya disebut "backstabber" (pengkhianat).'
  },
  'see eye to eye': {
    arti: 'Sepakat / sependapat / punya pandangan yang sejalan',
    cara_baca: 'see ay too ay',
    penggunaan: [
      'My boss and I rarely see eye to eye on design choices. (Gue sama bos jarang banget sependapat soal pilihan desain.)'
    ],
    catatan: 'Sering dipakai dalam bentuk negatif ("we don\'t see eye to eye" = kita gak sejalan).'
  },
  'back to square one': {
    arti: 'Kembali ke titik awal / harus ngulang dari nol lagi gara-gara gagal',
    cara_baca: 'bak too skwer wan',
    penggunaan: [
      'The client rejected the proposal, so we are back to square one. (Klien nolak proposalnya, jadi kita terpaksa ngulang dari nol lagi deh.)'
    ],
    catatan: 'Berasal dari permainan papan (board game) pas pion lu disuruh mundur balik ke kotak nomor 1.'
  },
  'face the music': {
    arti: 'Menghadapi kenyataan pahit / berani bertanggung jawab atas kesalahan yang diperbuat',
    cara_baca: 'feys the myoo-zik',
    penggunaan: [
      'You broke the window, now go face the music and apologize. (Lu yang mecahin jendela, sekarang hadapi dan minta maaf secara jantan.)'
    ],
    catatan: 'Sikap dewasa mengakui kesalahan dan berani nerima konsekuensinya.'
  },
  'the best of both worlds': {
    arti: 'Dapet dua keuntungan sekaligus / dapet enaknya dari dua pilihan berbeda',
    cara_baca: 'the best av bohth werldz',
    penggunaan: [
      'Working remotely gives me the best of both worlds: good salary and time for family. (Kerja remote ngasih gue dua kenikmatan sekaligus: gaji bagus dan waktu buat keluarga.)'
    ],
    catatan: 'Situasi ideal di mana lu bisa nikmatin dua hal positif tanpa harus ngorbanin salah satunya.'
  },
  'long time no see': {
    arti: 'Udah lama banget gak ketemu! / Ke mana aja lu selama ini!',
    cara_baca: 'long taym noh see',
    penggunaan: [
      'Hey bro, long time no see! How have you been? (Woi bro, udah lama banget gak ketemu! Gimana kabar lu?)'
    ],
    catatan: 'Sapaan hangat paling universal pas ketemu temen lama yang udah bertahun-tahun gak jumpa.'
  },
  'red handed': {
    arti: 'Tertangkap basah / keciduk pas lagi ngelakuin aksi basah',
    cara_baca: 'red han-did',
    penggunaan: [
      'The cat was caught red-handed stealing fish from the table! (Kucingnya keciduk basah lagi nyolong ikan di atas meja!)'
    ],
    catatan: 'Frasa "caught red-handed": ketangkep saat tangan masih berlumuran bukti.'
  },
  'comfort food': {
    arti: 'Makanan pelipur lara / makanan favorit yang bikin hati tenang pas lagi stres atau sedih',
    cara_baca: 'kam-fert food',
    penggunaan: [
      'Indomie and warm tea is my ultimate comfort food when it rains. (Indomie kuah telor sama teh anget tuh comfort food terbaik pas lagi hujan.)'
    ],
    catatan: 'Makanan yang ngasih sensasi nostalgia dan kehangatan emosional.'
  },
  'couch potato': {
    arti: 'Kaum mager / orang yang hobi seharian rebahan di sofa sambil nonton TV tanpa gerak',
    cara_baca: 'kowch puh-tey-toh',
    penggunaan: [
      'Don\'t be a couch potato all weekend, let\'s go for a run! (Jangan jadi kaum mager rebahan seharian dong, yuk lari pagi!)'
    ],
    catatan: 'Kiasan lucu orang yang nempel di sofa kayak kentang diam.'
  },
  'cheat day': {
    arti: 'Hari bebas diet / hari di mana lu bebas makan apa aja yang lu suka tanpa rasa bersalah',
    cara_baca: 'cheet dey',
    penggunaan: [
      'I worked out all week, so today is my pizza cheat day! (Gue udah rajin gym seminggu penuh, jadi hari ini hari bebas makan pizza!)'
    ],
    catatan: 'Istilah wajib di dunia fitness dan pola makan sehat.'
  },
  'binge watch': {
    arti: 'Maraton nonton serial film berjam-jam nonstop tanpa jeda',
    cara_baca: 'binj woch',
    penggunaan: [
      'I binge-watched the entire season in just one night. (Gue maraton nonton 1 season penuh cuma dalam satu malam.)'
    ],
    catatan: 'Kebiasaan langganan pengguna Netflix pas lagi libur panjang.'
  },
  'workaholic': {
    arti: 'Gila kerja / orang yang kecanduan kerja sampai lupa waktu istirahat dan liburan',
    cara_baca: 'wer-kuh-hoh-lik',
    penggunaan: [
      'He is such a workaholic, he even checks emails at midnight. (Dia bener-bener gila kerja, jam 12 malam aja masih balesin email kantor.)'
    ],
    catatan: 'Mirip sama "shopaholic" (gila belanja) dan "foodie" (hobi kulineran).'
  },
  'shopaholic': {
    arti: 'Gila belanja / orang yang gemar kalap belanja barang yang sebenernya gak butuh',
    cara_baca: 'sho-puh-hoh-lik',
    penggunaan: [
      'The payday sale turns everyone into a shopaholic. (Diskon tanggal gajian bikin semua orang mendadak kalap belanja.)'
    ],
    catatan: 'Sifat konsumtif yang susah nahan godaan diskon olshop.'
  },
  'foodie': {
    arti: 'Pencinta kuliner / orang yang hobi banget eksplor dan nyobain makanan enak',
    cara_baca: 'foo-dee',
    penggunaan: [
      'Follow her Instagram if you are a foodie looking for hidden gems. (Follow IG dia deh kalau lu pencinta kuliner yang nyari kafe tersembunyi.)'
    ],
    catatan: 'Gelar kehormatan buat orang yang punya selera makan tinggi.'
  },
  'hangover': {
    arti: 'Efek pusing & lemas seharian setelah kebanyakan minum atau pesta semalaman',
    cara_baca: 'hang-oh-ver',
    penggunaan: [
      'I have a massive hangover, I need water and soup right now. (Kepala gue pusing lemes banget sehabis pesta semalem, butuh sup anget nih.)'
    ],
    catatan: 'Gejala fisik gak enak badan setelah alkohol/begadang parah.'
  },
  'jet lag': {
    arti: 'Kacau jam biologis tubuh sehabis penerbangan jauh lintas zona waktu negara',
    cara_baca: 'jet lag',
    penggunaan: [
      'After a 14-hour flight from London, I had terrible jet lag for three days. (Sehabis terbang 14 jam dari London, jam tidur gue kacau parah 3 hari.)'
    ],
    catatan: 'Kondisi khas anak rantau pas baru mendarat di luar negeri: siang ngantuk, malam melek.'
  },
  'guilty pleasure': {
    arti: 'Kenikmatan terlarang / hal yang lu suka banget tapi agak malu kalau ketahuan orang lain',
    cara_baca: 'gil-tee ple-zher',
    penggunaan: [
      'Eating instant noodles at 2 AM is my biggest guilty pleasure. (Makan mi instan jam 2 pagi tuh kenikmatan rahasia gue yang bikin ngerasa bersalah tapi nagih.)'
    ],
    catatan: 'Bisa lagu norak, makanan micin, atau sinetron lebay yang diam-diam lu tontonin.'
  },
  'mixed signals': {
    arti: 'Sinyal gak jelas / kadang nunjukin perhatian tapi kadang dingin cuek (bikin overthinking)',
    cara_baca: 'mikst sig-nulz',
    penggunaan: [
      'Stop giving me mixed signals, tell me honestly if you like me or not! (Jangan ngasih sinyal tarik-ulur gak jelas dong, jujur aja lu suka gak sama gue!)'
    ],
    catatan: 'Kelakuan gebetan yang bikin lu pusing mikirin status hubungan.'
  },
  'gaslighting': {
    arti: 'Tindakan manipulasi psikologis memutarbalikkan fakta demi bikin orang lain ragu pada dirinya',
    cara_baca: 'gas-lay-ting',
    penggunaan: [
      'Gaslighting in a relationship is extremely damaging. (Manipulasi psikologis dalam hubungan tuh bahaya dan ngerusak mental banget.)'
    ],
    catatan: 'Bentuk kata benda (*noun*) dari "gaslight".'
  },
  'mindset': {
    arti: 'Pola pikir / cara pandang mendasar seseorang dalam melihat kehidupan dan masalah',
    cara_baca: 'maynd-set',
    penggunaan: [
      'A growth mindset helps you see failures as learning opportunities. (Pola pikir bertumbuh ngebantu lu ngeliat kegagalan sebagai pelajaran berharga.)'
    ],
    catatan: 'Fondasi utama kesuksesan: cara lu merespons masalah di kepala lu.'
  },
  'stoic': {
    arti: 'Tenang tak tergoyahkan / orang yang bijak mengendalikan emosi dan gak gampang panik',
    cara_baca: 'stoh-ik',
    penggunaan: [
      'He remained completely stoic even during the stock market crash. (Dia tetep tenang tak tergoyahkan bahkan pas pasar saham lagi anjlok parah.)'
    ],
    catatan: 'Filsafat Stoikisme: fokus hanya pada apa yang bisa lu kontrol, ikhlaskan apa yang di luar kendali.'
  },
  'authentic': {
    arti: 'Otentik / asli apa adanya tanpa kepalsuan atau dibuat-buat',
    cara_baca: 'aw-then-tik',
    penggunaan: [
      'People love her videos because she is so genuine and authentic. (Orang-orang suka video dia karena dia bener-bener tampil asli apa adanya tanpa jaim.)'
    ],
    catatan: 'Kualitas karakter nomor 1 di era sosmed: berani jadi diri sendiri.'
  },
  'empathy': {
    arti: 'Empati / kemampuan memahami dan ikut merasakan perasaan orang lain dari sudut pandang mereka',
    cara_baca: 'em-puh-thee',
    penggunaan: [
      'A good leader always listens with deep empathy. (Pemimpin yang hebat selalu dengerin keluhan timnya dengan rasa empati tinggi.)'
    ],
    catatan: 'Beda sama "sympathy" (kasihan dari jauh), "empathy" lu bener-bener ngerasain apa yang dirasain orang itu.'
  },
  'integrity': {
    arti: 'Integritas / kejujuran dan prinsip moral teguh pas gak ada orang yang ngeliat',
    cara_baca: 'in-teg-ruh-tee',
    penggunaan: [
      'Integrity means doing the right thing, even when no one is watching. (Integritas artinya tetep ngelakuin hal yang bener walau gak ada yang ngeliatin.)'
    ],
    catatan: 'Nilai karakter paling mahal di dunia profesional dan pertemanan.'
  },
  'complacent': {
    arti: 'Terlalu cepat puas diri sampai lengah dan berhenti berkembang',
    cara_baca: 'kum-pley-sunt',
    penggunaan: [
      'Do not get complacent after one success; the competition is fierce! (Jangan cepet puas diri cuma karena menang sekali, persaingan di luar masih ketat!)'
    ],
    catatan: 'Musuh terbesar kemajuan: ngerasa udah hebat sampai gak mau belajar lagi.'
  },
  'ambivalent': {
    arti: 'Mendua hati / bimbang karena punya dua perasaan yang bertentangan sekaligus',
    cara_baca: 'am-bi-vuh-lunt',
    penggunaan: [
      'I feel ambivalent about moving abroad: excited for adventure, but sad to leave family. (Hati gue bimbang soal merantau ke luar negeri: seneng petualangannya tapi sedih pisah sama keluarga.)'
    ],
    catatan: 'Kondisi psikologis saat lu ngerasa "pengen iya tapi pengen enggak juga".'
  },
  'eloquent': {
    arti: 'Fasih & memukau cara bicaranya / pintar merangkai kata dengan indah dan berwibawa',
    cara_baca: 'e-luh-kwunt',
    penggunaan: [
      'She gave an eloquent speech that moved the entire audience to tears. (Dia menyampaikan pidato yang sangat fasih dan indah sampai bikin seisi ruangan terharu.)'
    ],
    catatan: 'Pujian tertinggi buat orang yang public speaking-nya kelas dewa.'
  },
  'dichotomy': {
    arti: 'Dikotomi / pemisahan atau pembagian dua hal yang saling bertentangan secara tegas',
    cara_baca: 'day-ka-tuh-mee',
    penggunaan: [
      'The strict dichotomy between work and life is disappearing with remote jobs. (Pemisahan kaku antara kerjaan dan kehidupan pribadi mulai memudar berkat kerja remote.)'
    ],
    catatan: 'Istilah intelektual pas lu membagi dua konsep yang berlawanan (misal: baik vs buruk).'
  },
  'bootstrap': {
    arti: 'Membangun usaha mandiri dari nol dengan modal sendiri tanpa investor luar',
    cara_baca: 'boot-strap',
    penggunaan: [
      'They bootstrapped their tech startup from a tiny garage to a million-dollar company. (Mereka ngerintis startup teknologinya dari garasi kecil pake modal sendiri sampai jadi perusahaan bernilai miliaran.)'
    ],
    catatan: 'Istilah kebanggaan di dunia bisnis bagi founder yang mandiri.'
  },
  'pivot': {
    arti: 'Banting stir arah strategi bisnis atau karier secara cepat demi menyesuaikan pasar',
    cara_baca: 'pi-vut',
    penggunaan: [
      'When sales dropped, the company pivoted to online subscriptions. (Pas penjualan anjlok, perusahaannya langsung banting stir ke sistem langganan online.)'
    ],
    catatan: 'Kemampuan beradaptasi dengan mengubah arah model bisnis tanpa kehilangan visi utama.'
  },
  'bandwidth': {
    arti: 'Kapasitas waktu & energi mental yang tersedia buat ngerjain tugas tambahan',
    cara_baca: 'band-width',
    penggunaan: [
      'I don\'t have the bandwidth to take on another client this week. (Kapasitas waktu dan pikiran gue udah penuh banget minggu ini, gabisa nambah klien baru lagi.)'
    ],
    catatan: 'Slang kantor modern yang diadaptasi dari istilah kecepatan internet.'
  },
  'leverage': {
    arti: 'Memanfaatkan kekuatan atau aset yang ada secara maksimal demi hasil berlipat ganda',
    cara_baca: 'le-ver-ij',
    penggunaan: [
      'We should leverage our strong social media presence to launch the new product. (Kita harus manfaatin kekuatan akun sosmed kita buat peluncuran produk baru.)'
    ],
    catatan: 'Kata kunci di dunia strategi bisnis dan investasi.'
  },
  'scalable': {
    arti: 'Bisa diperbesar skalanya secara mudah tanpa bikin biaya operasional membengkak gila-gilaan',
    cara_baca: 'skey-luh-bul',
    penggunaan: [
      'Software businesses are highly scalable compared to traditional retail. (Bisnis perangkat lunak sangat mudah diperbesar skalanya dibanding toko fisik tradisional.)'
    ],
    catatan: 'Ciri utama bisnis startup teknologi modern.'
  },
  'synergy': {
    arti: 'Sinergi / kolaborasi dua pihak yang ngehasilin dampak jauh lebih dahsyat dibanding kerja sendiri',
    cara_baca: 'si-ner-jee',
    penggunaan: [
      'The synergy between the design and marketing teams produced great results. (Sinergi antara tim desain dan tim promosi ngehasilin karya yang luar biasa.)'
    ],
    catatan: 'Prinsip 1 + 1 = 3: kolaborasi cerdas yang melipatgandakan output.'
  },
  'streamline': {
    arti: 'Menyederhanakan alur proses kerja biar lebih cepat, efisien, dan tanpa birokrasi ribet',
    cara_baca: 'stream-layn',
    penggunaan: [
      'We need to streamline our onboarding process for new users. (Kita harus nyederhanain alur pendaftaran biar pengguna baru gak ribet.)'
    ],
    catatan: 'Memangkas langkah-langkah gak penting biar semuanya serba sat-set.'
  },
  'deep dive': {
    arti: 'Membahas atau menganalisis suatu topik secara mendalam dan menyeluruh sampai ke akar-akarnya',
    cara_baca: 'deep dayv',
    penggunaan: [
      'Let\'s do a deep dive into user feedback during today\'s meeting. (Yuk kita bedah tuntas masukan dari pengguna di meeting hari ini.)'
    ],
    catatan: 'Kiasan menyelam ke dasar laut buat nemu mutiara data berharga.'
  },
  'ballpark': {
    arti: 'Estimasi kasar / perkiraan angka kisaran awal',
    cara_baca: 'bohl-park',
    penggunaan: [
      'Can you give me a ballpark figure for the renovation cost? (Bisa kasih estimasi kisaran kasar biaya renovasinya gak?)'
    ],
    catatan: 'Frasa "ballpark figure": taksiran awal biar dapet gambaran kasaran.'
  },
  'circle back': {
    arti: 'Membahas kembali topik ini nanti setelah dapet info atau perkembangan terbaru',
    cara_baca: 'ser-kul bak',
    penggunaan: [
      'Let\'s circle back to this issue on Friday when we have more data. (Nanti hari Jumat kita bahas topik ini lagi ya pas datanya udah lebih lengkap.)'
    ],
    catatan: 'Frasa sopan buat menunda diskusi topik tertentu di rapat kantor.'
  },
  'hard stop': {
    arti: 'Batas waktu akhir yang mutlak harus selesai karena ada agenda mendesak setelahnya',
    cara_baca: 'hard stap',
    penggunaan: [
      'I have a hard stop at 3 PM for another client call. (Gue punya batas waktu mutlak jam 3 sore harus cabut karena ada jadwal telepon klien lain.)'
    ],
    catatan: 'Pemberitahuan diawal meeting biar semua orang tahu rapat gak boleh molor.'
  },
  'stan': {
    arti: 'Fans garis keras / penggemar fanatik yang sangat setia mendukung idolanya',
    cara_baca: 'stan',
    penggunaan: [
      'I have been a Taylor Swift stan since 2012! (Gue udah jadi fans garis keras Taylor Swift dari tahun 2012!)'
    ],
    catatan: 'Dari lagu legendaris Eminem "Stan" (gabungan Stalker + Fan).'
  },
  'shook': {
    arti: 'Kaget setengah mati / syok takjub sampai gabisa berkata-kata',
    cara_baca: 'shuk',
    penggunaan: [
      'That plot twist left me completely shook! (Plot twist di akhir film bener-bener bikin gue syok takjub gak nyangka!)'
    ],
    catatan: 'Ekspresi terkejut maksimal atas kejadian tak terduga.'
  },
  'valid': {
    arti: 'Sangat masuk akal / wajar banget lu ngerasa gitu / perasaannya sah dan dibenarkan',
    cara_baca: 'va-lid',
    penggunaan: [
      'Your feelings are totally valid, take your time to heal. (Wajar dan masuk akal banget perasaan lu, luangkan waktu buat tenangin diri ya.)'
    ],
    catatan: 'Bentuk validasi emosional paling menenangkan pas temen lagi curhat.'
  },
  'era': {
    arti: 'Fase hidup atau masa tertentu yang lagi dijalani seseorang dengan gaya khas',
    cara_baca: 'eh-ruh',
    penggunaan: [
      'I am currently entering my peace and quiet era. (Gue sekarang lagi masuk ke fase hidup yang mengutamakan ketenangan batin.)'
    ],
    catatan: 'Tren sosmed: "in my villain era", "in my healing era", "in my fitness era".'
  },
  'serving': {
    arti: 'Menampilkan gaya / aura visual yang luar biasa memikat dan mempesona',
    cara_baca: 'ser-ving',
    penggunaan: [
      'She is serving pure elegance on the red carpet tonight. (Dia bener-bener menyajikan penampilan yang anggun dan mempesona di karpet merah malam ini.)'
    ],
    catatan: 'Pujian penampilan di dunia fashion dan entertainment.'
  },
  'baddie': {
    arti: 'Cewek keren, percaya diri, punya selera fashion modis dan aura memikat',
    cara_baca: 'ba-dee',
    penggunaan: [
      'She walked into the room like an absolute baddie. (Dia masuk ke ruangan dengan gaya cewek keren yang super percaya diri.)'
    ],
    catatan: 'Pujian untuk perempuan yang mandiri, berani, dan berpenampilan menarik.'
  },
  'finna': {
    arti: 'Bakal / mau / siap-siap akan ngelakuin sesuatu (singkatan dari "fixing to")',
    cara_baca: 'fi-nuh',
    penggunaan: [
      'I\'m finna order some pizza right now. (Gue mau siap-siap mesen pizza sekarang nih.)'
    ],
    catatan: 'Slang AAVE yang sangat populer dalam lagu-lagu hip-hop dan pergaulan santai.'
  },
  'skibidi': {
    arti: 'Slang absurd viral Gen Alpha / bisa berarti keren, gokil, atau sekadar kata seru di tongkrongan',
    cara_baca: 'ski-bi-dee',
    penggunaan: [
      'What is that skibidi dance everyone is doing? (Itu tarian gokil apa sih yang lagi dilakuin semua anak-anak?)'
    ],
    catatan: 'Meme kultur internet paling viral yang jadi ikon bahasa anak muda era sekarang.'
  },
  'sigma': {
    arti: 'Sosok mandiri, keren, berkepribadian tenang, dan sukses tanpa butuh validasi kelompok (*lone wolf*)',
    cara_baca: 'sig-muh',
    penggunaan: [
      'He keeps quiet, works hard, and lives like a true sigma. (Dia orangnya pendiam, pekerja keras, dan hidup mandiri tanpa banyak pamer.)'
    ],
    catatan: 'Karakter "lone wolf" yang berkebalikan dari tipe "alpha" yang suka caper dominasi panggung.'
  },
  'mewing': {
    arti: 'Latihan postur lidah menempel di langit-langit mulut demi ngebentuk garis rahang yang tegas',
    cara_baca: 'myoo-ing',
    penggunaan: [
      'Bro is mewing in all his selfie photos. (Bro selalu pasang pose rahang tegas di semua foto selfie-nya.)'
    ],
    catatan: 'Tren viral di kalangan remaja untuk mendapatkan jawline tajam.'
  },
  'these': {
    arti: 'Ini (untuk benda jamak / lebih dari satu yang posisinya dekat)',
    cara_baca: 'dheez',
    penggunaan: [
      'These shoes are so comfortable to wear all day. (Sepatu-sepatu ini nyaman banget dipake seharian.)',
      'Are these your keys on the counter? (Apakah kunci-kunci ini punya lu di atas meja?)'
    ],
    catatan: 'Bentuk jamak dari "this". Dipake saat bendanya banyak dan ada di deket lu.'
  },
  'those': {
    arti: 'Itu (untuk benda jamak / lebih dari satu yang posisinya jauh)',
    cara_baca: 'dhohz',
    penggunaan: [
      'Those mountains in the distance look breathtaking. (Gunung-gunung di kejauhan sana keliatan indah banget.)',
      'I love those vintage cars over there. (Gue suka mobil-mobil antik di sebelah sana itu.)'
    ],
    catatan: 'Bentuk jamak dari "that". Dipake saat bendanya banyak dan letaknya jauh.'
  },
  'quite': {
    arti: 'Cukup / lumayan / agak / bener-bener',
    cara_baca: 'kwayt',
    penggunaan: [
      'The exam was quite difficult, but I passed. (Ujiannya lumayan susah sih, tapi gue lulus.)',
      'That is quite an impressive achievement! (Itu bener-bener pencapaian yang sangat mengesankan!)'
    ],
    catatan: 'Kata keterangan penjelas (*adverb*) yang bikin bahasa Inggris lu kedengeran lebih elegan.'
  },
  'rather': {
    arti: 'Agak / lebih memilih / daripada',
    cara_baca: 'ra-dher',
    penggunaan: [
      'I would rather stay home tonight than go to a crowded club. (Gue lebih milih diem di rumah malam ini daripada pergi ke tempat rame.)'
    ],
    catatan: 'Frasa "would rather" adalah cara paling natural buat nyatain preferensi pilihan.'
  },
  'instead': {
    arti: 'Malah / sebagai gantinya / alih-alih',
    cara_baca: 'in-sted',
    penggunaan: [
      'We planned to go outside, but watched movies inside instead. (Kita awalnya mau keluar, tapi malah asik nonton film di dalem rumah sebagai gantinya.)'
    ],
    catatan: 'Dipake saat ada perubahan rencana atau opsi pengganti.'
  },
  'meanwhile': {
    arti: 'Sementara itu / di saat yang bersamaan',
    cara_baca: 'meen-wayl',
    penggunaan: [
      'She was studying hard in her room. Meanwhile, her brother was playing games. (Dia lagi belajar keras di kamar. Sementara itu, adiknya malah asik main game.)'
    ],
    catatan: 'Kata transisi favorit di film dan cerita buat nunjukin dua kejadian terjadi berbarengan.'
  },
  'unless': {
    arti: 'Kecuali kalau / jika tidak',
    cara_baca: 'an-les',
    penggunaan: [
      'I won\'t go to the party unless you come with me. (Gue gamau dateng ke pesta itu kecuali kalau lu ikut bareng gue.)'
    ],
    catatan: 'Kata penghubung syarat: "Aku gak akan X kecuali kalau Y".'
  },
  'eventually': {
    arti: 'Pada akhirnya / lambat laun setelah melewati proses panjang',
    cara_baca: 'ee-ven-choo-uh-lee',
    penggunaan: [
      'If you keep practicing every day, you will eventually speak English fluently. (Kalau lu terus latihan tiap hari, pada akhirnya lu bakal lancar ngomong bahasa Inggris.)'
    ],
    catatan: 'Bukan "kebetulan", tapi "pada akhirnya pasti terjadi" setelah proses usaha.'
  },
  'apparently': {
    arti: 'Rupanya / ternyata / konon kabarnya menurut info yang beredar',
    cara_baca: 'uh-pa-runt-lee',
    penggunaan: [
      'Apparently, the cafe is closed on Mondays. (Ternyata kafenya tutup tiap hari Senin menurut infonya.)'
    ],
    catatan: 'Dipake pas lu baru dapet info baru yang sebelumnya belum lu tahu.'
  },
  'obviously': {
    arti: 'Jelas banget lah / sudah pasti tanpa perlu diragukan lagi',
    cara_baca: 'ahb-vee-us-lee',
    penggunaan: [
      'Obviously, exercise is good for your overall health. (Udah jelas banget lah olahraga itu bagus buat kesehatan menyeluruh.)'
    ],
    catatan: 'Penegasan untuk fakta yang sudah terang benderang bagi semua orang.'
  },
  'regardless': {
    arti: 'Terlepas dari apa pun / tanpa memandang / pokoknya bagaimanapun juga',
    cara_baca: 'ri-gard-les',
    penggunaan: [
      'Regardless of the weather, our morning running routine continues. (Terlepas dari cuaca hujan atau panas, rutinitas lari pagi kita tetep jalan.)'
    ],
    catatan: 'Kata tegas yang nunjukin tekad kuat gak terpengaruh keadaan luar.'
  },
  'despite': {
    arti: 'Meskipun / terlepas dari adanya rintangan atau kesulitan',
    cara_baca: 'di-spayt',
    penggunaan: [
      'Despite the heavy rain, the concert was fully packed. (Meskipun hujan deras mengguyur, konsernya tetep penuh sesak penonton.)'
    ],
    catatan: 'Ingat! Jangan pernah tambahin kata "of" setelah "despite" (cukup "despite the rain", bukan "despite of the rain").'
  },
  'furthermore': {
    arti: 'Lebih dari itu / lagipula / ditambah lagi (kata sambung formal)',
    cara_baca: 'fer-dher-mor',
    penggunaan: [
      'The product is very affordable. Furthermore, it comes with a two-year warranty. (Produk ini sangat terjangkau. Ditambah lagi, ada garansi resmi 2 tahun.)'
    ],
    catatan: 'Kata penghubung elegan pas lu mau nambahin argumen kuat di esai atau presentasi.'
  },
  'moreover': {
    arti: 'Selain itu juga / bahkan lebih dari sekadar itu',
    cara_baca: 'mor-oh-ver',
    penggunaan: [
      'She is an excellent coder. Moreover, she is a great team player. (Dia programmer yang jago banget. Selain itu, dia juga asik banget diajak kerja tim.)'
    ],
    catatan: 'Mirip sama "furthermore", bikin tulisan bahasa Inggris lu terdengar berbobot.'
  },
  'as far as I know': {
    arti: 'Sepanjang yang gue tahu / setahu gue sih',
    cara_baca: 'as far as ay noh',
    penggunaan: [
      'As far as I know, the meeting starts at 10 AM tomorrow. (Setahu gue sih meeting-nya mulai jam 10 pagi besok.)'
    ],
    catatan: 'Sering disingkat di chat jadi "AFAIK". Cara sopan membagikan info tanpa sok tahu.'
  },
  'in terms of': {
    arti: 'Dalam hal / ditinjau dari segi / kalau ngomongin soal',
    cara_baca: 'in termz av',
    penggunaan: [
      'In terms of camera quality, this phone is unbeatable in its price range. (Dalam hal kualitas kamera, hape ini tiada tanding di kelas harganya.)'
    ],
    catatan: 'Frasa paling efektif buat memfokuskan topik diskusi ke satu aspek spesifik.'
  },
  'on behalf of': {
    arti: 'Atas nama / mewakili pihak tertentu',
    cara_baca: 'on bi-haf av',
    penggunaan: [
      'On behalf of the entire team, I want to thank you for your support. (Atas nama seluruh tim, saya ingin mengucapkan terima kasih atas dukungan kalian.)'
    ],
    catatan: 'Frasa resmi wajib pas lu ngasih sambutan mewakili institusi atau kelompok.'
  },
  'show off': {
    arti: 'Pamer / unjuk gigi buat menarik perhatian orang lain',
    cara_baca: 'shoh awf',
    penggunaan: [
      'He always loves to show off his expensive watches. (Dia emang hobi banget pamer jam tangan mahalnya ke mana-mana.)'
    ],
    catatan: 'Bisa jadi kata kerja ("to show off") atau kata benda sebutan ("a show-off" = orang tukang pamer).'
  },
  'stand out': {
    arti: 'Menonjol / terlihat paling unggul dan beda di antara kerumunan',
    cara_baca: 'stand awt',
    penggunaan: [
      'Her creative portfolio really stood out from all other applicants. (Portofolio kreatif dia bener-bener paling menonjol dibanding pelamar lainnya.)'
    ],
    catatan: 'Pujian untuk orang atau karya yang punya keunikan istimewa.'
  },
  'give up': {
    arti: 'Menyerah / pasrah dan berhenti berusaha',
    cara_baca: 'giv ap',
    penggunaan: [
      'Never give up on your dreams, no matter how hard it gets! (Jangan pernah menyerah sama mimpimu, sesulit apa pun tantangannya!)'
    ],
    catatan: 'Lawan kata dari "keep going" atau "persevere".'
  },
  'bring up': {
    arti: 'Mengungkit topik pembicaraan / membesarkan anak',
    cara_baca: 'bring ap',
    penggunaan: [
      'Why did you bring up that sensitive topic during dinner? (Kenapa lu ngungkit topik sensitif itu pas lagi makan malam bareng?)'
    ],
    catatan: 'Paling sering dipakai untuk arti "memulai atau mengangkat topik obrolan".'
  },
  'put off': {
    arti: 'Menunda-nunda jadwal / bikin hilang selera atau ilfeel',
    cara_baca: 'put awf',
    penggunaan: [
      'We had to put off the meeting until next week. (Kita terpaksa menunda jadwal meeting-nya sampai minggu depan.)'
    ],
    catatan: 'Bisa berarti menunda waktu ("delay") atau bikin hilang minat ("His rude tone put me off").'
  },
  'carry out': {
    arti: 'Melaksanakan / menjalankan rencana atau instruksi sampai tuntas',
    cara_baca: 'ke-ree awt',
    penggunaan: [
      'The scientists will carry out the experiment next month. (Para ilmuwan bakal ngejalanin eksperimen tersebut bulan depan.)'
    ],
    catatan: 'Frasa kerja formal untuk menjalankan proyek, riset, atau perintah.'
  },
  'turn down': {
    arti: 'Menolak tawaran / mengecilkan volume suara atau suhu',
    cara_baca: 'tern dawn',
    penggunaan: [
      'She turned down the job offer because the salary was too low. (Dia menolak tawaran kerja itu karena gajinya kekecilan.)'
    ],
    catatan: 'Bisa berarti menolak lamaran/tawaran, atau mengecilkan volume musik ("turn down the music").'
  },
  'check out': {
    arti: 'Melihat-lihat hal keren / membayar belanjaan di kasir / keluar dari hotel',
    cara_baca: 'chek awt',
    penggunaan: [
      'You should check out this new coffee shop in town! (Lu harus liat dan cobain kafe baru yang ada di kota ini!)'
    ],
    catatan: 'Frasa serbaguna: bisa buat ngajak kepo ("Check this out!"), belanja, atau check-out hotel.'
  },
  'hold on': {
    arti: 'Tunggu sebentar / bertahanlah jangan lepas pegangan',
    cara_baca: 'hohld on',
    penggunaan: [
      'Hold on a second, let me grab my jacket. (Tunggu sebentar ya, gue ambil jaket gue dulu.)'
    ],
    catatan: 'Kata pengganti "wait" yang paling sering diucapkan saat berbicara santai atau di telepon.'
  },
  'keep up': {
    arti: 'Mengimbangi kecepatan / mempertahankan performa bagus yang sudah diraih',
    cara_baca: 'keep ap',
    penggunaan: [
      'You are doing an amazing job, keep up the great work! (Kerja lu keren banget, pertahankan prestasi hebat ini ya!)'
    ],
    catatan: 'Sering dipakai dalam ucapan motivasi "Keep it up!".'
  },
  'rely on': {
    arti: 'Mengandalkan / bergantung pada bantuan atau janji seseorang',
    cara_baca: 'ri-lay on',
    penggunaan: [
      'You can always rely on me whenever you need help. (Lu selalu bisa ngandelin gue kapan pun lu butuh pertolongan.)'
    ],
    catatan: 'Sinonim akrab dari kata "depend on" atau "trust".'
  },
  'deal with': {
    arti: 'Menangani / menghadapi dan menyelesaikan masalah atau orang yang sulit',
    cara_baca: 'deel with',
    penggunaan: [
      'I have too many urgent issues to deal with today. (Banyak banget urusan mendesak yang harus gue beresin hari ini.)'
    ],
    catatan: 'Frasa kerja harian pas lu harus mengurus tanggung jawab atau keluhan klien.'
  },
  'cope with': {
    arti: 'Mengatasi beban emosional / bertahan menghadapi stres dan tekanan berat',
    cara_baca: 'kohp with',
    penggunaan: [
      'Meditation helps her cope with daily work stress. (Meditasi ngebantu dia mengatasi stres kerjaan harian.)'
    ],
    catatan: 'Fokus pada ketahanan psikologis dalam mengelola tekanan hidup.'
  },
  'run out of': {
    arti: 'Kehabisan stok persediaan / gak punya lagi sisa bahan atau waktu',
    cara_baca: 'ran awt av',
    penggunaan: [
      'We ran out of coffee beans this morning, we need to buy more! (Kita kehabisan biji kopi pagi ini, harus beli lagi nih!)'
    ],
    catatan: 'Bisa dipakai untuk kehabisan barang ("run out of battery/gas") atau waktu ("we are running out of time!").'
  },
  'luggage': {
    arti: 'Bagasi / koper dan tas bawaan saat bepergian atau merantau',
    cara_baca: 'la-gij',
    penggunaan: [
      'Make sure you weigh your luggage before going to the airport. (Pastiin lu nimbang koper bagasi lu dulu sebelum berangkat ke bandara.)'
    ],
    catatan: 'Kata benda yang tidak bisa dijamakkan (*uncountable*). Cukup katakan "my luggage", bukan "luggages".'
  },
  'baggage': {
    arti: 'Barang bawaan perjalanan / beban luka masa lalu secara emosional (*emotional baggage*)',
    cara_baca: 'ba-gij',
    penggunaan: [
      'Everyone carries some emotional baggage from past relationships. (Semua orang pasti bawa luka masa lalu dari hubungan sebelumnya.)'
    ],
    catatan: 'Selain arti fisik koper, sering dipakai untuk kiasan luka batin ("emotional baggage").'
  },
  'whimsical': {
    arti: 'Ajaib dan penuh imajinasi unik seperti di negeri dongeng',
    cara_baca: 'wim-zi-kul',
    penggunaan: [
      'The cafe has a whimsical interior inspired by Alice in Wonderland. (Kafenya punya dekorasi unik nan ajaib kayak di film Alice in Wonderland.)'
    ],
    catatan: 'Kata sifat indah untuk karya seni atau tempat yang bernuansa magis dan ceria.'
  },
  'clout': {
    arti: 'Pengaruh / popularitas dan gengsi di media sosial demi pansos',
    cara_baca: 'klowt',
    penggunaan: [
      'He only did that crazy prank for social media clout. (Dia ngelakuin aksi gila itu murni cuma demi pansos dan cari follower doang.)'
    ],
    catatan: 'Istilah "clout chaser" merujuk pada orang yang rela cari sensasi murahan demi viral.'
  },
  'overrated': {
    arti: 'Dilebih-lebihkan / gak sebagus omongan orang yang heboh / overrated',
    cara_baca: 'oh-ver-rey-tid',
    penggunaan: [
      'Honestly, that viral restaurant is totally overrated; the food is average. (Jujur resto yang lagi viral itu overrated banget; makanannya biasa aja.)'
    ],
    catatan: 'Lawan dari "underrated". Dipake pas lu ngerasa ekspektasi publik terlalu berlebihan.'
  },
  'underrated': {
    arti: 'Kurang diapresiasi / padahal aslinya bagus banget tapi jarang diketahui orang (*hidden gem*)',
    cara_baca: 'an-der-rey-tid',
    penggunaan: [
      'This indie band is so underrated, all their songs are masterpieces! (Band indie ini bener-bener underrated, semua lagu mereka tuh mahakarya!)'
    ],
    catatan: 'Pujian tertinggi buat karya bermutu yang belum dapet sorotan publik yang layak.'
  },
  'seizure': {
    arti: 'Kejang-kejang fisik mendadak / penyitaan aset secara hukum oleh otoritas',
    cara_baca: 'see-zher',
    penggunaan: [
      'Flashing bright lights can trigger an epileptic seizure. (Kelap-kelip lampu terang bisa memicu kejang bagi penderita epilepsi.)'
    ],
    catatan: 'Istilah medis untuk kejang tubuh, atau istilah hukum untuk penyitaan barang terlarang.'
  },
  'head over heels': {
    arti: 'Jatuh cinta setengah mati / mabuk kepayang tergila-gila sama seseorang',
    cara_baca: 'hed oh-ver heelz',
    penggunaan: [
      'He is head over heels in love with his new girlfriend. (Dia bener-bener mabuk kepayang dan tergila-gila sama pacar barunya.)'
    ],
    catatan: 'Kiasan serasa jungkir balik saking bahagianya jatuh cinta.'
  },
  'speak of the devil': {
    arti: 'Panjang umur! / Baru aja diomongin orangnya langsung nongol!',
    cara_baca: 'speek av the de-vil',
    penggunaan: [
      'Speak of the devil! We were just talking about your promotion! (Panjang umur lu! Baru aja kita ngomongin soal promosi jabatan lu, orangnya langsung nongol!)'
    ],
    catatan: 'Ungkapan seru yang diucapkan saat orang yang baru saja dibicarakan tiba-tiba masuk ruangan.'
  },

  // =========================================================================
  // 5. 🎬 ICONIC MOVIE & SERIES DIALOGUES (KUTIPAN DIALOG FILM IKONIK)
  // =========================================================================
  'damn, that was a close call!': {
    arti: 'Gila, barusan nyaris banget celaka / tipis banget lolos dari bahaya!',
    cara_baca: 'dam, that wuz uh klohs kohl',
    penggunaan: [
      'The car almost hit the pole, damn, that was a close call! (Mobilnya nyaris nabrak tiang listrik, gila barusan nyaris banget celaka!)'
    ],
    catatan: 'Dialog klasik film action pas karakter berhasil lolos dari situasi berbahaya dalam hitungan detik.'
  },
  'you have no idea what i\'ve been through': {
    arti: 'Lu sama sekali gak bakal paham apa aja penderitaan yang udah gue laluin',
    cara_baca: 'yoo hav noh ay-dee-uh wut ayv been throo',
    penggunaan: [
      'Don\'t judge me, you have no idea what I\'ve been through! (Jangan sembarangan ngehakimi gue, lu gak bakal paham apa aja yang udah gue lewatin!)'
    ],
    catatan: 'Dialog drama emosional saat seseorang membela diri dari penghakiman orang lain.'
  },
  'cut the crap and tell me the truth': {
    arti: 'Gak usah banyak omong kosong / basi-basi, langsung jujur aja ke gue!',
    cara_baca: 'kut the krap and tel mee the trooth',
    penggunaan: [
      'Stop making excuses, cut the crap and tell me the truth! (Berhenti bikin alasan, gak usah banyak bacot dan jujur aja ke gue!)'
    ],
    catatan: 'Kalimat tegas di film thriller/detektif saat menginterogasi orang yang berbelit-belit.'
  },
  'we are running out of time, make up your mind!': {
    arti: 'Waktu kita udah mau habis, cepetan tentuin pilihan lu sekarang!',
    cara_baca: 'wee ahr ran-ing owt av taym, meyk ap yoor maynd',
    penggunaan: [
      'The bomb timer is ticking, we are running out of time, make up your mind! (Penghitung waktu bomnya jalan terus, waktu kita habis, cepet tentuin pilihan lu!)'
    ],
    catatan: 'Frasa "make up your mind" artinya mengambil keputusan dengan cepat di saat genting.'
  },
  'i knew it was too good to be true': {
    arti: 'Gue udah feeling ini tuh terlalu mulus / mencurigakan buat jadi kenyataan',
    cara_baca: 'ay noo it wuz too good too bee troo',
    penggunaan: [
      'A luxury apartment for $100 a month? I knew it was too good to be true, it was a total scam. (Apartemen mewah cuma 100 dolar sebulan? Gue udah feeling ini terlalu mulus buat jadi kenyataan, ternyata murni penipuan.)'
    ],
    catatan: 'Diucapkan saat suatu penawaran terlihat kelewat sempurna hingga akhirnya terbukti ada udang di balik batu.'
  },
  'don\'t you dare walk away from me right now!': {
    arti: 'Jangan berani-berani lu pergi ninggalin gue pas lagi ngomong gini!',
    cara_baca: 'dohnt yoo dair wawk uh-wey fram mee rayt now',
    penggunaan: [
      'We are not finished talking, don\'t you dare walk away from me right now! (Kita belum selesai ngobrol, jangan berani-berani lu muter badan dan pergi ninggalin gue!)'
    ],
    catatan: 'Dialog adegan pertengkaran sengit dalam film romantis atau drama keluarga.'
  },
  'it is what it is, we gotta move on': {
    arti: 'Ya udahlah ya, emang udah jalannya begini, kita harus ikhlas dan lanjut hidup',
    cara_baca: 'it iz wut it iz, wee got-tuh moov on',
    penggunaan: [
      'We lost the contract, but it is what it is, we gotta move on and find new clients. (Kita kalah tender kontraknya, tapi ya sudahlah emang takdirnya begitu, kita harus move on dan cari klien baru.)'
    ],
    catatan: 'Filosofi penerimaan stoik yang sangat populer di kalangan anak rantau dan dunia profesional.'
  },
  'i\'ve got your back, no matter what happens': {
    arti: 'Gue selalu ada di belakang lu buat dukung / lindungin, apa pun yang terjadi',
    cara_baca: 'ayv got yoor bak, noh mat-ter wut hap-punz',
    penggunaan: [
      'Don\'t be afraid to take the risk, I\'ve got your back, no matter what happens. (Jangan takut ambil risiko itu, gue selalu ada buat jagain lu apa pun yang terjadi.)'
    ],
    catatan: 'Ungkapan persahabatan sejati dan loyalitas tertinggi ala partner in crime.'
  },
  'why are you always giving me mixed signals?': {
    arti: 'Kenapa sih lu selalu ngasih kode/sikap yang gak jelas dan bikin bimbang?',
    cara_baca: 'way ahr yoo awl-weyz giv-ing mee mikst sig-nulz',
    penggunaan: [
      'One day you act in love, the next day you are cold; why are you always giving me mixed signals? (Sehari lu bersikap manis banget, besoknya lu dingin kayak es batu; kenapa sih lu selalu ngasih sinyal yang gak jelas ke gue?)'
    ],
    catatan: 'Dialog khas serial romantis saat korban ghosting atau situasi HTS (hubungan tanpa status) menuntut kejelasan.'
  },
  'let\'s get straight to the point': {
    arti: 'Yuk langsung ke intinya aja, gak usah basa-basi muter-muter',
    cara_baca: 'lets get streyt too the poynt',
    penggunaan: [
      'We don\'t have all day, let\'s get straight to the point. (Kita gak punya banyak waktu, yuk langsung to the point ke intinya aja.)'
    ],
    catatan: 'Sangat sering dipakai di rapat bisnis atau adegan film sebelum negosiasi besar dimulai.'
  },
  'i didn\'t sign up for this mess!': {
    arti: 'Gue gak pernah setuju / gak nyangka bakal terlibat dalam kekacauan ribet kayak gini!',
    cara_baca: 'ay did-nt sayn ap for this mes',
    penggunaan: [
      'I thought this was an easy task, I didn\'t sign up for this mess! (Gue kira ini tugas santai gampang, gue gak pernah setuju buat nyebur ke dalam masalah seribet ini!)'
    ],
    catatan: 'Ungkapan frustrasi pas lu mendapati diri lu terjebak di tengah drama yang bukan urusan lu.'
  },
  'are you out of your mind?!': {
    arti: 'Lu udah gila ya?! / Otak lu geser apa gimana?!',
    cara_baca: 'ahr yoo owt av yoor maynd',
    penggunaan: [
      'Driving at 150 km/h in heavy rain? Are you out of your mind?! (Ngebut 150 km/jam di tengah hujan lebat? Lu udah gak waras ya?!)'
    ],
    catatan: 'Reaksi kaget campur emosi saat melihat seseorang melakukan tindakan yang sangat ceroboh dan berbahaya.'
  },
  'i think we got off on the wrong foot': {
    arti: 'Kayaknya kesan pertama pertemuan kita tadi kurang enak / salah paham deh',
    cara_baca: 'ay think wee got awf on the rawng foot',
    penggunaan: [
      'I apologize for being rude earlier, I think we got off on the wrong foot. Let\'s start over. (Gue minta maaf tadi sempat ketus, kayaknya kesan awal kita kurang enak deh. Yuk kita mulai kenalan dari awal lagi.)'
    ],
    catatan: 'Frasa penyelamat diplomatis untuk memperbaiki hubungan kerja atau pertemanan setelah perkenalan pertama yang canggung.'
  },
  'you can\'t just sweep this under the rug': {
    arti: 'Lu gak bisa gitu aja nutup-nutupin masalah ini seolah-olah gak pernah terjadi',
    cara_baca: 'yoo kant just sweep this an-der the rag',
    penggunaan: [
      'The company lost millions, you can\'t just sweep this under the rug! (Perusahaan rugi miliaran, lu gak bisa gitu aja nutup-nutupin kasus ini di bawah karpet!)'
    ],
    catatan: 'Idiom film investigasi politik saat sebuah skandal berusaha ditutup-tutupi oleh petinggi.'
  },
  'i\'m at my wit\'s end with this situation': {
    arti: 'Gue udah bener-bener mentok dan kehabisan akal ngadepin situasi pusing ini',
    cara_baca: 'aym at may wits end with this sit-yoo-ey-shun',
    penggunaan: [
      'I have tried everything to fix this server, I\'m at my wit\'s end! (Gue udah nyoba segala cara buat benerin server ini, gue beneran udah kehabisan akal dan mentok!)'
    ],
    catatan: 'Kondisi mental pas seseorang udah kehabisan seluruh ide dan energi untuk memecahkan masalah pelik.'
  },
  'i\'m taking a leap of faith here': {
    arti: 'Gue lagi nekat memberanikan diri bertaruh pada hal ini meski belum tahu hasilnya',
    cara_baca: 'aym tey-king uh leep av feyth heer',
    penggunaan: [
      'Quitting my corporate job to build a startup was taking a huge leap of faith. (Resign dari kerjaan kantoran buat bikin startup tuh bener-bener langkah nekat bertaruh dengan takdir.)'
    ],
    catatan: 'Kutipan terkenal di film superhero (seperti Spider-Man) saat seseorang berani melangkah maju dengan modal keyakinan hati.'
  },
  'may the force be with you, always': {
    arti: 'Semoga kekuatan dan keberuntungan selalu menyertai setiap langkahmu',
    cara_baca: 'mey the fors bee with yoo, awl-weyz',
    penggunaan: [
      'Good luck on your new adventure, may the Force be with you, always! (Selamat berjuang di petualangan barumu, semoga keberuntungan dan kekuatan selalu menyertaimu!)'
    ],
    catatan: 'Kutipan terpopuler sepanjang masa dari semesta Star Wars yang dipakai untuk mendoakan kesuksesan orang lain.'
  },
  'why so serious? let\'s put a smile on that face!': {
    arti: 'Kenapa tegang dan serius amat sih? Senyum dikit dong!',
    cara_baca: 'way soh seer-ee-us, lets poot uh smayl on that feys',
    penggunaan: [
      'Why so serious? It is just a weekend party, let\'s put a smile on that face! (Kenapa tegang banget mukanya? Ini kan cuma pesta santai, senyum dikit napa!)'
    ],
    catatan: 'Kutipan ikonik The Joker (Heath Ledger) dalam film The Dark Knight.'
  },
  'i\'ll be back': {
    arti: 'Gue bakal balik lagi nanti (janji kepulangan)',
    cara_baca: 'ayl bee bak',
    penggunaan: [
      'I need to grab my wallet from the car, I\'ll be back! (Gue mau ambil dompet dulu di mobil, gue bakal balik lagi sebentar!)'
    ],
    catatan: 'Kutipan legendaris Arnold Schwarzenegger dalam film The Terminator.'
  },
  'to infinity and beyond!': {
    arti: 'Menuju tak terbatas dan melampauinya! (Semangat pantang menyerah)',
    cara_baca: 'too in-fin-i-tee and bee-yond',
    penggunaan: [
      'Our team is ready to push the project to infinity and beyond! (Tim kita siap melesat membawa proyek ini melampaui segala batas!)'
    ],
    catatan: 'Slogan legendaris Buzz Lightyear dalam film animasi Toy Story.'
  },
  'houston, we have a problem': {
    arti: 'Gawat nih kawan, kita lagi ada masalah tak terduga yang cukup besar',
    cara_baca: 'hyoo-stun, wee hav uh prob-lum',
    penggunaan: [
      'The database just crashed! Houston, we have a problem. (Database kita baru aja down! Gawat nih bro, ada masalah besar.)'
    ],
    catatan: 'Kutipan legendaris misi luar angkasa film Apollo 13 yang sering dipakai pas nemuin error mendadak.'
  },

  // =========================================================================
  // 6. 🎵 VIRAL SONG LYRICS & RELATABLE QUOTES
  // =========================================================================
  'i lowkey miss the old days when life was simple': {
    arti: 'Diem-diem gue kangen masa-masa dulu pas hidup masih sesederhana itu',
    cara_baca: 'ay loh-kee mis the ohld deyz wen layf wuz sim-pul',
    penggunaan: [
      'Scrolling through childhood photos makes me lowkey miss the old days when life was simple. (Liat-liat foto zaman bocah bikin gue diem-diem kangen masa lalu pas hidup gak seribet sekarang.)'
    ],
    catatan: 'Lirik lagu nostalgia yang sering dijadikan backsound video galau senja di TikTok.'
  },
  'we were just strangers with memories': {
    arti: 'Kita berdua pada akhirnya cuma orang asing yang pernah punya banyak kenangan bersama',
    cara_baca: 'wee wer just streyn-jerz with mem-reez',
    penggunaan: [
      'After the breakup, we passed each other on the street like strangers with memories. (Sehabis putus, kita papasan di jalan kayak dua orang asing yang cuma punya kenangan masa lalu.)'
    ],
    catatan: 'Kutipan lirik puitis tentang mantan kekasih yang kembali menjadi orang tak saling kenal.'
  },
  'no cap this song is lowkey living in my head rent free': {
    arti: 'Sumpah gak bohong, lagu ini diem-diem terus terngiang-ngiang di kepala gue nonstop',
    cara_baca: 'noh kap this sawng iz loh-kee liv-ing in may hed rent free',
    penggunaan: [
      'I have listened to this track 50 times today; no cap this song is lowkey living in my head rent free! (Gue udah muter lagu ini 50 kali hari ini; asli gak bohong lagu ini nempel terus di otak gue!)'
    ],
    catatan: 'Kombinasi slang viral "no cap" (jujur), "lowkey" (diem-diem), dan "living in my head rent free" (nempel di otak).'
  },
  'i am totally overwhelmed right now': {
    arti: 'Gue lagi bener-bener ngerasa kewalahan / kepala mau pecah nampung beban ini',
    cara_baca: 'ay am toh-tuh-lee oh-ver-welmd rayt now',
    penggunaan: [
      'Between work deadlines and family issues, I am totally overwhelmed right now. (Di antara deadline kerjaan numpuk dan masalah keluarga, gue beneran ngerasa kewalahan banget sekarang.)'
    ],
    catatan: 'Ungkapan emosi jujur saat beban pikiran melebihi kapasitas mental.'
  },

  // --- Taylor Swift ---
  'you kept me like a secret, but i kept you like an oath': {
    arti: 'Lu nyembunyiin gue kayak rahasia, tapi gue ngejaga lu kayak sumpah suci yang sakral',
    cara_baca: 'yoo kept mee layk uh see-krit, bat ay kept yoo layk an ohth',
    penggunaan: [
      'And you call me up again just to break me like a promise, you kept me like a secret, but I kept you like an oath. (Dan lu nelpon gue lagi cuma buat ngingkarin janji, lu sembunyiin gue kayak rahasia tapi gue jaga lu kayak sumpah suci.)'
    ],
    catatan: 'Lirik paling menyayat hati dari mahakarya Taylor Swift "All Too Well (10 Minute Version)" tentang cinta yang tidak dihargai setara.'
  },
  'it\'s me, hi, i\'m the problem, it\'s me': {
    arti: 'Ini gue, halo, masalah utamanya emang ada di diri gue sendiri',
    cara_baca: 'its mee, hay, aym the prob-lum, its mee',
    penggunaan: [
      'It\'s me, hi, I\'m the problem, it\'s me, at tea time everybody agrees. (Ini gue, halo, yang jadi sumber masalah emang gue sendiri, semua orang pun setuju.)'
    ],
    catatan: 'Lirik viral TikTok dari lagu "Anti-Hero" Taylor Swift tentang self-awareness dan mengakui kekurangan diri sendiri.'
  },
  'please don\'t be in love with someone else': {
    arti: 'Tolong jangan sampai lu lagi jatuh cinta sama orang lain',
    cara_baca: 'pleez dohnt bee in lav with sam-wan els',
    penggunaan: [
      'Please don\'t be in love with someone else, please don\'t have somebody waiting on you. (Tolong jangan sampai lu udah naksir orang lain, tolong jangan ada orang yang lagi nungguin lu.)'
    ],
    catatan: 'Kutipan lirik doa penuh harap dari lagu "Enchanted" Taylor Swift setelah jatuh cinta pada pandangan pertama.'
  },
  'band-aids don\'t fix bullet holes': {
    arti: 'Plester luka gak bakal bisa nyembuhin luka tembak peluru (minta maaf gak cukup buat luka pengkhianatan berat)',
    cara_baca: 'band-eydz dohnt fiks bool-it hohlz',
    penggunaan: [
      'You say sorry just for show, but Band-Aids don\'t fix bullet holes. (Lu minta maaf cuma buat formalitas, tapi plester luka gak bakal bisa nutup luka tembak sedalam ini.)'
    ],
    catatan: 'Metafora brilian dari lagu "Bad Blood" Taylor Swift tentang rasa sakit akibat ditikam dari belakang oleh sahabat.'
  },
  'you drew stars around my scars': {
    arti: 'Lu menghiasi luka trauma masa lalu gue jadi indah dan penuh kasih sayang',
    cara_baca: 'yoo droo stahrz uh-rownd may skahrz',
    penggunaan: [
      'You drew stars around my scars, but now I\'m bleedin\'. (Dulu lu melukis bintang-bintang di sekeliling bekas luka gue, tapi sekarang lu yang bikin luka baru.)'
    ],
    catatan: 'Lirik puitis legendaris dari lagu "Cardigan" Taylor Swift di album Folklore.'
  },
  'i knew you were trouble when you walked in': {
    arti: 'Gue udah tau lu tuh bakal bawa masalah sejak pertama kali lu melangkah masuk',
    cara_baca: 'ay noo yoo wer trab-ul wen yoo wawkt in',
    penggunaan: [
      'I knew you were trouble when you walked in, so shame on me now. (Gue udah tau dari awal lu bakal bikin patah hati pas pertama kali ketemu, salah gue sendiri kenapa tetep maju.)'
    ],
    catatan: 'Lirik hit bangers "I Knew You Were Trouble" Taylor Swift tentang firasat bahaya red flag yang diabaikan.'
  },

  // --- LANY ---
  'oh, my heart hurts so good, i love you, babe, so bad, so bad': {
    arti: 'Aduh hati gue berdenyut perih saking indahnya, gue cinta mati banget sama lu, sayang',
    cara_baca: 'oh, may hahrt hurts soh good, ay lav yoo, beyb, soh bad, soh bad',
    penggunaan: [
      'Slow dance these summer nights, our disco ball\'s my kitchen light; oh, my heart hurts so good, I love you, babe, so bad, so bad. (Berdansa pelan di malam musim panas dengan lampu dapur sebagai bola disko kita; hati ini berdebar begitu manis, aku sangat mencintaimu.)'
    ],
    catatan: 'Lirik chorus paling legendaris dari lagu "ILYSB" (I Love You So Bad) milik LANY.'
  },
  'and you need to know that i\'m hella obsessed with your face': {
    arti: 'Dan lu harus tau kalau gue bener-bener terobsesi dan tergila-gila banget sama wajah cantik lu',
    cara_baca: 'and yoo need too noh that aym hel-uh ob-sest with yoor feys',
    penggunaan: [
      'And you need to know that nobody could take your place, and you need to know that I\'m hella obsessed with your face. (Dan lu harus tau gak ada yang bisa gantiin posisi lu, dan lu harus tau gue beneran tergila-gila sama paras cantik lu.)'
    ],
    catatan: 'Lirik viral romantis dari verse 2 lagu LANY "ILYSB".'
  },
  'what do you do with a broken heart? once the light fades, everything is dark': {
    arti: 'Apa yang harus lu lakuin pas hati lu hancur berkeping-keping? Begitu cahaya padam, semuanya jadi gelap gulita',
    cara_baca: 'wut doo yoo doo with uh broh-kun hahrt? wans the layt feydz, ev-ree-thing iz dahrk',
    penggunaan: [
      'I\'ve got way too much time to be this hurt; what do you do with a broken heart? Once the light fades, everything is dark. (Gue punya terlalu banyak waktu buat ngerasain sakit ini; apa yang harus lu lakuin saat patah hati? Saat lentera redup, segalanya jadi gelap.)'
    ],
    catatan: 'Lirik chorus paling emosional dari mahakarya patah hati LANY "Malibu Nights".'
  },
  'i drive circles under street lights, nothing seems to clear my mind': {
    arti: 'Gue nyetir muter-muter sendirian di bawah lampu jalanan kota, gak ada satu pun yang bisa bikin pikiran gue tenang',
    cara_baca: 'ay drayv ser-kulz an-der street layts, nath-ing seemz too kleer may maynd',
    penggunaan: [
      'I drive circles under street lights, nothing seems to clear my mind; I can\'t forget, chasing Malibu nights. (Gue nyetir berputar-putar di bawah lampu jalan, tak ada yang bisa menjernihkan pikiran; gue gak bisa lupa malam-malam di Malibu.)'
    ],
    catatan: 'Lirik refrain "Malibu Nights" tentang melarikan diri dari kesedihan dengan menyetir larut malam.'
  },
  'shut up, i love you, you\'re my best friend': {
    arti: 'Udah diem, gue cinta banget sama lu, lu tuh sahabat terbaik sekaligus belahan jiwa gue',
    cara_baca: 'shat up, ay lav yoo, yoor may best frend',
    penggunaan: [
      'You are my favorite everything, been telling you that since 2015; shut up, I love you, you\'re my best friend. (Lu adalah segalanya yang paling gue sukai; udah diem, gue cinta banget sama lu, lu adalah sahabat terbaik gue.)'
    ],
    catatan: 'Kutipan lirik manis paling ikonik dari lagu "Pink Skies" LANY.'
  },
  'get ya under pink skies, i know exactly where we should go': {
    arti: 'Bawa lu berdua di bawah langit senja pink, gw tau persis ke mana tujuan kita',
    cara_baca: 'get yuh an-der pink skayz, ay noh ig-zakt-lee wair wee shood goh',
    penggunaan: [
      'Get ya under pink skies, I know exactly where we should go, \'cause I love the way your green eyes mix with that Malibu indigo. (Bawa lu di bawah langit senja jingga, gw tau persis tujuan kita, karena gw suka banget caramu mandang malam.)'
    ],
    catatan: 'Lirik chorus yang sangat dreamy dan aesthetic dari "Pink Skies" LANY.'
  },
  'in the end i\'m gonna be alright, but it might take a hundred sleepless nights': {
    arti: 'Pada akhirnya nanti gue bakal baik-baik aja, tapi mungkin butuh seratus malam tanpa tidur buat ngelewatin semua rasa sakit ini',
    cara_baca: 'in the end aym gun-nuh bee awl-rayt, bat it mayt teyk uh han-drid sleep-lis nayts',
    penggunaan: [
      'In the end I\'m gonna be alright, but it might take a hundred sleepless nights to make the memories of you disappear. (Pada akhirnya gue bakal pulih, tapi mungkin butuh seratus malam insomnia buat bikin kenangan tentang lu menghilang.)'
    ],
    catatan: 'Lirik proses penyembuhan luka batin paling menyentuh dari lagu LANY "Thru These Tears".'
  },
  'right now i can\'t see nothing through these tears': {
    arti: 'Untuk saat ini pandangan gue kabur dan gak bisa ngeliat apa-apa saking derasnya air mata ini',
    cara_baca: 'rayt now ay kant see nath-ing throo theez teerz',
    penggunaan: [
      'People say time will heal, but right now I can\'t see nothing through these tears. (Orang bilang waktu bakal nyembuhin, tapi untuk saat ini gue belum bisa liat apa-apa di balik derasnya air mata ini.)'
    ],
    catatan: 'Kutipan judul dan chorus utama lagu "Thru These Tears" LANY.'
  },

  // --- Radiohead ---
  'i\'m a creep, i\'m a weirdo, what the hell am i doing here?': {
    arti: 'Gue ini cuma orang aneh dan terasing, ngapain coba gue ada di tempat keren kayak gini?',
    cara_baca: 'aym uh kreep, aym uh weer-doh, wut the hel am ay doo-ing heer',
    penggunaan: [
      'Looking at all the confident people around me, I\'m a creep, I\'m a weirdo, what the hell am I doing here? (Liat orang-orang keren di sekitar gue, gue ngerasa minder kayak orang aneh yang salah tempat.)'
    ],
    catatan: 'Lirik lagu kebangsaan kaum insecure dan introvert paling legendaris sepanjang masa: "Creep" Radiohead.'
  },
  'no alarms and no surprises, please': {
    arti: 'Tolong ya, gue cuma pengen hidup tenang tanpa alarm panik atau kejutan buruk',
    cara_baca: 'noh uh-lahrmz and noh ser-pray-ziz, pleez',
    penggunaan: [
      'A quiet life, a handshake of carbon monoxide, with no alarms and no surprises, please. (Kehidupan yang sunyi tenang, tanpa alarm panik dan tanpa kejutan buruk.)'
    ],
    catatan: 'Lirik verbatim presisi dari lagu "No Surprises" karya Thom Yorke / Radiohead di album OK Computer.'
  },
  'karma police, arrest this man': {
    arti: 'Wahai polisi karma, tolong tangkap dan hukum orang ini atas perbuatannya!',
    cara_baca: 'kahr-muh puh-lees, uh-rest this man',
    penggunaan: [
      'He broke my best friend\'s heart, karma police, arrest this man! (Dia bikin sahabat gue nangis patah hati, polisi karma tolong hukum orang ini!)'
    ],
    catatan: 'Kutipan satir legendaris dari lagu "Karma Police" Radiohead tentang hukum sebab-akibat (hukum karma).'
  },
  'for a minute there, i lost myself': {
    arti: 'Untuk beberapa saat tadi, gue sempat kehilangan kendali atas diri gue sendiri',
    cara_baca: 'for uh min-it thair, ay lawst may-self',
    penggunaan: [
      'I got so angry in the argument, for a minute there, I lost myself. (Gue emosi banget tadi pas debat, sempat lepas kendali dan lupa diri sejenak.)'
    ],
    catatan: 'Kutipan outro lagu "Karma Police" tentang kesadaran setelah sempat terlarut dalam emosi sesaat.'
  },
  'you do it to yourself, you do, and that\'s what really hurts': {
    arti: 'Lu sendiri yang bikin hidup lu menderita, dan kenyataan pahit itulah yang bikin sakit hati',
    cara_baca: 'yoo doo it too yoor-self, yoo doo, and thats wut reel-lee hurts',
    penggunaan: [
      'Stop blaming everyone else; you do it to yourself, and that\'s what really hurts. (Berhenti nyalahin orang lain; kesalahan itu lu sendiri yang bikin, makanya nyesek banget.)'
    ],
    catatan: 'Lirik kritik tajam nan jujur dari lagu "Just" Radiohead.'
  },

  // --- One Direction ---
  'you don\'t know you\'re beautiful, that\'s what makes you beautiful': {
    arti: 'Lu gak sadar betapa cantiknya lu, dan ketidaksadaran itulah yang bikin lu makin mempesona',
    cara_baca: 'yoo dohnt noh yoor byoo-ti-ful, thats wut meyks yoo byoo-ti-ful',
    penggunaan: [
      'You don\'t know you\'re beautiful, that\'s what makes you beautiful! (Lu gak sadar kalau lu tuh cantik banget apa adanya, justru itu yang bikin pesona lu terpancar!)'
    ],
    catatan: 'Lirik debut megahit One Direction "What Makes You Beautiful" yang melambungkan nama 1D di kancah global.'
  },
  'if you ever feel alone, don\'t, i\'ll be by your side': {
    arti: 'Kalau suatu saat lu ngerasa kesepian, jangan takut, gue bakal selalu ada di samping lu',
    cara_baca: 'if yoo ev-er feel uh-lohn, dohnt, ayl bee bay yoor sayd',
    penggunaan: [
      'Whenever life gets tough, if you ever feel alone, don\'t, I\'ll be by your side. (Kapan pun hidup lagi berat, kalau ngerasa sendirian jangan khawatir, gue selalu ada buat lu.)'
    ],
    catatan: 'Lirik penenang hati penuh kehangatan dari lagu "Right Now" One Direction.'
  },
  'story of my life, i take her home': {
    arti: 'Begitulah kisah perjalanan hidup gue, mengantar kenangan dan harapan pulang',
    cara_baca: 'stor-ee av may layf, ay teyk her hohm',
    penggunaan: [
      'The story of my life, I take her home, I drive all night to keep her warm. (Kisah hidup gue, nemenin dia pulang dan nyetir semalaman buat jagain dia.)'
    ],
    catatan: 'Lirik folk-pop nostalgia dari lagu "Story of My Life" One Direction tentang waktu yang terus berlalu.'
  },
  'we could be the greatest team that the world has ever seen': {
    arti: 'Kita berdua bisa jadi tim terhebat dan terkompak yang pernah ada di dunia ini',
    cara_baca: 'wee kood bee the grey-tist teem that the werld haz ev-er seen',
    penggunaan: [
      'You and me got a whole lot of history, we could be the greatest team that the world has ever seen! (Kita berdua punya banyak kenangan sejarah bareng, kita bisa jadi duo terhebat di dunia!)'
    ],
    catatan: 'Lirik kebersamaan penuh semangat dari lagu "History" One Direction.'
  },
  'night changes into something new': {
    arti: 'Malam demi malam berlalu dan perlahan mengubah segalanya menjadi hal yang baru',
    cara_baca: 'nayt cheyn-jiz in-too sam-thing noo',
    penggunaan: [
      'Even when the night changes, it will never change me and you. (Meskipun malam terus berganti dan waktu merubah segalanya, hal itu gak bakal merubah rasa kita.)'
    ],
    catatan: 'Lirik romantis tentang bertumbuh dewasa bersama dari lagu "Night Changes" One Direction.'
  },

  // --- Arash Buana ---
  'if you ever feel like crying, remember i will be right here': {
    arti: 'Kalau suatu saat lu pengen nangis numpahin beban lu, inget ya gue bakal selalu ada di sini buat dengerin',
    cara_baca: 'if yoo ev-er feel layk kray-ing, ree-mem-ber ay wil bee rayt heer',
    penggunaan: [
      'You don\'t have to be strong all the time; if you ever feel like crying, remember I will be right here. (Lu gak harus selalu pura-pura kuat kok; kalau mau nangis, inget ya gue selalu ada di sini.)'
    ],
    catatan: 'Lirik super hangat dari lagu hits Arash Buana "if u could see me cryin\' in my room" yang bikin pendengar merasa ditemani.'
  },
  'i\'ll be there whenever you need me the most': {
    arti: 'Gue bakal selalu hadir kapan pun saat lu paling ngebutuhin seseorang',
    cara_baca: 'ayl bee thair wen-ev-er yoo need mee the mohst',
    penggunaan: [
      'No matter how far we are, I\'ll be there whenever you need me the most. (Sejauh apa pun jarak kita, gue bakal selalu ada pas lu lagi butuh bantuan.)'
    ],
    catatan: 'Lirik loyalitas tulus dari karya Arash Buana.'
  },
  'i\'m just a boy who fell in love too fast': {
    arti: 'Gue cuma seorang cowok biasa yang terlalu gampang dan cepet jatuh cinta',
    cara_baca: 'aym just uh boy hoo fel in lav too fast',
    penggunaan: [
      'I got my heart broken again because I\'m just a boy who fell in love too fast. (Hati gue patah lagi gara-gara gue emang tipikal orang yang gampang banget baper dan jatuh cinta.)'
    ],
    catatan: 'Lirik pengakuan jujur tentang kerentanan hati dari lagu "i don\'t wanna be your friend" Arash Buana.'
  },
  'say you won\'t leave me all alone in the dark': {
    arti: 'Katakan kalau lu gak bakal ninggalin gue sendirian di tengah kegelapan yang sepi ini',
    cara_baca: 'sey yoo wohnt leev mee awl uh-lohn in the dahrk',
    penggunaan: [
      'Hold my hand and say you won\'t leave me all alone in the dark. (Genggam tangan gue dan janji lu gak bakal ninggalin gue kesepian sendirian.)'
    ],
    catatan: 'Lirik penuh permohonan emosional dari lagu Arash Buana.'
  },
  'we\'re strangers again, but with all the memories': {
    arti: 'Kita berdua balik jadi orang asing lagi, tapi kepala kita masih penuh sama semua kenangan dulu',
    cara_baca: 'weer streyn-jerz uh-gen, bat with awl the mem-reez',
    penggunaan: [
      'Walking past each other without saying hi, we\'re strangers again, but with all the memories. (Papasan tanpa saling sapa, kita kembali jadi dua orang asing tapi dengan kepala penuh kenangan.)'
    ],
    catatan: 'Lirik galau mendalam khas karya-karya Arash Buana tentang akhir sebuah kisah asmara.'
  },

  // --- Paramore (The Only Exception) ---
  'you are the only exception': {
    arti: 'Lu adalah satu-satunya pengecualian yang bikin gue percaya lagi sama cinta',
    cara_baca: 'yoo ahr the ohn-lee ek-sep-shun',
    penggunaan: [
      'I swore I would never fall in love again, but you are the only exception. (Dulu gue bersumpah gak bakal mau jatuh cinta lagi, tapi lu adalah satu-satunya pengecualian.)'
    ],
    catatan: 'Kutipan lirik mahakarya Paramore "The Only Exception" tentang seseorang yang mampu meruntuhkan dinding trauma masa lalu.'
  },
  'the only exception': {
    arti: 'Satu-satunya pengecualian (judul lagu hits Paramore)',
    cara_baca: 'the ohn-lee ek-sep-shun',
    penggunaan: [
      'I got a tight grip on reality, but I can\'t let go of what\'s in front of me here, and you are the only exception. (Gue selalu realistis memandang hidup, tapi gue gak bisa ngelepas apa yang ada di depan mata gue, dan lu lah satu-satunya pengecualian itu.)'
    ],
    catatan: 'Lagu akustik emosional dari Hayley Williams / Paramore tentang belajar membuka hati kembali.'
  },

  // --- Aziz Hedra (Somebody's Pleasure) ---
  'somebody\'s pleasure': {
    arti: 'Tempat pelampiasan rasa senang orang lain / kesenangan sesaat (lagu viral Aziz Hedra)',
    cara_baca: 'sam-bad-eez plezh-er',
    penggunaan: [
      'It\'s so hard when you\'re caught in the middle of dreams and being somebody\'s pleasure. (Rasanya berat banget pas lu terjebak di antara mimpi lu sendiri dan cuma jadi tempat pelampiasan kesenangan orang lain.)'
    ],
    catatan: 'Lirik megah bernuansa soul dari Aziz Hedra tentang dilema batin merasa dimanfaatkan.'
  },
  'it\'s so hard when you\'re caught in the middle of being somebody\'s pleasure': {
    arti: 'Berat banget rasanya pas lu terjebak di tengah situasi cuma dijadiin tempat pelampiasan orang lain',
    cara_baca: 'its soh hahrd wen yoor kawt in the mid-ul av bee-ing sam-bad-eez plezh-er',
    penggunaan: [
      'Soul try to figure out, someone\'s in denial; it\'s so hard when you\'re caught in the middle of being somebody\'s pleasure. (Jiwa ini berusaha mencerna, ada yang sedang menyangkal rasa; berat banget saat lu terjebak cuma jadi pemuas sesaat orang lain.)'
    ],
    catatan: 'Lirik emosional viral Aziz Hedra "Somebody\'s Pleasure" tentang luka hubungan yang sepihak.'
  },

  // --- WIMY (Pages) ---
  'turn the pages over, looking for a closure': {
    arti: 'Membuka lembaran demi lembaran cerita, mencari kejelasan akhir dari kisah kita',
    cara_baca: 'tern the pey-jiz oh-ver, look-ing for uh kloh-zher',
    penggunaan: [
      'I keep reading our old text messages, turn the pages over, looking for a closure. (Gue terus ngebaca ulang chat lama kita, membalik lembaran masa lalu demi mencari kepastian.)'
    ],
    catatan: 'Kutipan lirik galau dari lagu indie pop viral "Pages" oleh WIMY.'
  },
  'i\'m still stuck on these pages with you': {
    arti: 'Gue masih terjebak di lembaran kenangan indah bersama lu',
    cara_baca: 'aym stil stak on theez pey-jiz with yoo',
    penggunaan: [
      'Time moves forward for everyone else, but I\'m still stuck on these pages with you. (Waktu terus berjalan buat orang lain, tapi gue masih aja terjebak di lembaran kenangan bareng lu.)'
    ],
    catatan: 'Lirik lagu "Pages" - WIMY tentang susahnya move on dari memori masa lalu.'
  },

  // --- LANY (you!) ---
  'i\'m nothing without you, oh babe': {
    arti: 'Gue gak ada apa-apanya / hampa tanpa kehadiran lu di hidup gue, sayang',
    cara_baca: 'aym nath-ing with-owt yoo, oh beyb',
    penggunaan: [
      'You\'re the sun to the moon, you\'re the ocean so blue; I\'m nothing without you, oh babe! (Lu adalah matahari bagi rembulan, lu bagaikan lautan biru luas; gue bukan apa-apa tanpa lu!)'
    ],
    catatan: 'Lirik penuh cinta dan ketulusan mendalam dari lagu "you!" milik LANY di album Mama\'s Boy.'
  },
  'you!': {
    arti: 'Kamu! (Lagu cinta manis dari LANY)',
    cara_baca: 'yoo',
    penggunaan: [
      'Like a river needs a raindrop, I need you! (Bagaikan sungai yang butuh tetesan hujan, begitulah gue butuh lu!)'
    ],
    catatan: 'Single hits LANY yang menceritakan betapa berharganya pasangan dalam hidup.'
  },

  // --- The 1975 (About You) ---
  'do you think i have forgotten about you?': {
    arti: 'Apakah lu beneran mikir kalau gue udah bener-bener ngelupain tentang lu?',
    cara_baca: 'doo yoo think ay hav fer-got-ten uh-bowt yoo',
    penggunaan: [
      'Do you think I have forgotten about you? There was something \'bout you that now I can\'t remember. (Lu kira gue udah lupa tentang lu? Dulu ada sesuatu yang istimewa dari lu yang sekarang susah gue jabarkan.)'
    ],
    catatan: 'Kutipan lirik paling dreamy dan viral dari The 1975 "About You" (vokal Matty Healy & Carly Holt).'
  },
  'about you': {
    arti: 'Tentang dirimu (Lagu nostalgia mahakarya The 1975)',
    cara_baca: 'uh-bowt yoo',
    penggunaan: [
      'Every time I hear that chord progression, it is always about you. (Tiap kali gue denger progresi nada itu, pikiran gue selalu melayang tentang lu.)'
    ],
    catatan: 'Lagu penutup kisah asmara legendaris dari The 1975 yang sering disebut sekuel emosional dari "Robbers".'
  },

  // --- Colde (Star / 사랑은 언제나) ---
  'you are my shining star in the darkest night': {
    arti: 'Lu adalah bintang terang yang selalu menyinari malam tergelap gue',
    cara_baca: 'yoo ahr may shayn-ing stahr in the dahr-kist nayt',
    penggunaan: [
      'Whenever the world feels cold and lonely, you are my shining star in the darkest night. (Kapan pun dunia terasa dingin dan sepi, lu adalah bintang bersinar yang nerangin malam gue.)'
    ],
    catatan: 'Kutipan romantis bernuansa R&B khas musisi Korea Selatan, Colde (lagu "Star / 사랑은 언제나").'
  },
  'starr': {
    arti: 'Bintang bersinar / judul lagu romantis Colde (Star)',
    cara_baca: 'stahr',
    penggunaan: [
      'Like a star in the night sky, you brighten up my whole world. (Kayak bintang di langit malam, lu nerangin seluruh dunia gue.)'
    ],
    catatan: 'Lagu R&B indie romantis yang viral di playlist senja dan video aesthetic.'
  },

  // --- HONNE feat. Georgia (Location Unknown) ---
  'location unknown, tryin\' to get home to you': {
    arti: 'Lokasi gak jelas / tersesat di mana pun, tapi hati ini cuma berusaha pulang ke pelukan lu',
    cara_baca: 'loh-key-shun an-nohn, tray-in too get hohm too yoo',
    penggunaan: [
      'My head is a mess, my location unknown, tryin\' to get home to you. (Kepala gue lagi semrawut, gak tau lagi ada di mana, tapi gue cuma pengen pulang ke pelukan lu.)'
    ],
    catatan: 'Lirik anthem LDR paling legendaris dari HONNE feat. Georgia "Location Unknown (Brooklyn Session)".'
  },
  'location unknown': {
    arti: 'Lokasi tak diketahui / tersesat di kejauhan (Lagu hits LDR dari HONNE)',
    cara_baca: 'loh-key-shun an-nohn',
    penggunaan: [
      'Traveling across the world with location unknown, missing you every single second. (Keliling dunia di antah berantah, gue kangen lu tiap detik.)'
    ],
    catatan: 'Lagu wajib anak rantau dan pejuang hubungan jarak jauh (LDR).'
  },

  // --- Arash Buana (hey, i'm tired & i've always loved you) ---
  'one day you\'ll know that i have always loved you': {
    arti: 'Suatu hari nanti lu bakal tau dan sadar kalau gue selalu mencintai lu dari dulu',
    cara_baca: 'wan dey yool noh that ay hav awl-weyz lavd yoo',
    penggunaan: [
      'And it hurts to see you\'re not here for me, it\'s okay, I\'m okay, but one day you\'ll know I have always loved you, loved you. (Dan sakit rasanya ngeliat lu gak ada lagi buat gue, gak apa-apa gue baik-baik aja, tapi suatu hari lu bakal tau gue selalu cinta sama lu.)',
      'I was scared of waking up \'cause I know I\'ll end up feeling numb. (Dulu gue takut buat bangun pagi karena gue tau ujung-ujungnya cuma bakal ngerasa hampa mati rasa.)'
    ],
    catatan: 'Lirik paling ikonik dan emosional dari lagu hits Arash Buana "i\'ve always loved you".'
  },
  'i have always loved you': {
    arti: 'Gue selalu mencintai lu dari dulu (Lirik mahakarya Arash Buana)',
    cara_baca: 'ay hav awl-weyz lavd yoo',
    penggunaan: [
      'One day you\'ll know that I have always loved you, loved you. (Suatu hari nanti lu bakal tau kalau gue selalu mencintai lu dari dulu.)'
    ],
    catatan: 'Lirik lagu "i\'ve always loved you" Arash Buana tentang ketulusan cinta yang tak lekang waktu.'
  },
  'i\'ve always loved you': {
    arti: 'Gue selalu mencintai lu dari dulu (Judul lagu hits Arash Buana)',
    cara_baca: 'ayv awl-weyz lavd yoo',
    penggunaan: [
      'One day you\'ll know that I have always loved you. (Suatu hari nanti lu bakal tau dan sadar kalau gue selalu mencintai lu.)',
      'I was afraid of breaking up \'cause I don\'t wanna be alone. (Dulu gue takut banget putus karena gue gak mau kesepian sendirian.)'
    ],
    catatan: 'Lagu balada cinta abadi dari Arash Buana yang sangat menyentuh hati.'
  },
  'hey, i\'m tired of pretending that i\'m fine': {
    arti: 'Hei, gue capek, gue cuma pengen lu tau kalau gue lagi berjuang keras buat benerin semuanya',
    cara_baca: 'hey, aym tay-erd, just wont yoo too noh aym tray-ing too get it rayt',
    penggunaan: [
      'Hey, I\'m tired, just want you to know I\'m trying to get it right, it gets harder as it goes. (Hei, gue capek, gue cuma pengen lu tau kalau gue lagi berusaha keras benerin semuanya, makin lama makin berat rasanya.)',
      'You\'re the one who makes me happy when everything gets heavy. (Lu adalah satu-satunya yang bikin gue bahagia di saat semuanya terasa berat.)'
    ],
    catatan: 'Lirik kejujuran emosional paling dalam dari lagu Arash Buana "hey, i\'m tired".'
  },
  'hey, i\'m tired': {
    arti: 'Hei, gue capek (Lagu pengakuan luka batin Arash Buana)',
    cara_baca: 'hey aym tay-erd',
    penggunaan: [
      'Hey, I\'m tired, just want you to know I\'m trying to get it right. (Hei, gue capek, gue cuma pengen lu tau kalau gue lagi berusaha keras.)'
    ],
    catatan: 'Lagu Arash Buana tentang titik jenuh dan kelelahan mental saat menghadapi ekspektasi hidup.'
  },
  'hey i\'m tired': {
    arti: 'Hei, gue capek (Lagu pengakuan luka batin Arash Buana)',
    cara_baca: 'hey aym tay-erd',
    penggunaan: [
      'You\'re the one who makes me happy when everything gets heavy, sorry but I\'m really missing you. (Lu adalah satu-satunya yang bikin gue bahagia saat semua beban terasa berat, maaf tapi gue bener-bener kangen lu.)'
    ],
    catatan: 'Lagu tentang titik jenuh dan kelelahan mental saat menghadapi ekspektasi hidup.'
  },

  // --- eleventwelfth ---
  'the more i try to trace you forthwith, the less i want to know where to find you': {
    arti: 'Makin keras gue berusaha melacak keberadaan lu saat ini juga, makin hilang hasrat gue buat tau di mana lu berada',
    cara_baca: 'the mor ay tray too treys yoo forth-with, the les ay wont too noh wair too faynd yoo',
    penggunaan: [
      'The more I try to trace you forthwith, the less I want to know where to find you. (Makin keras gue berusaha nyari jejak lu saat ini, makin gue sadar kalau gue gak pengen tau lagi di mana lu berada.)',
      'Can we hold and cherish what we are about to lose? (Bisakah kita mempertahankan dan menjaga apa yang hampir hilang dari kita?)'
    ],
    catatan: 'Judul lagu dan lirik ikonik math-rock/midwest emo legendaris dari band indie Jakarta, eleventwelfth.'
  },
  'can we hold and cherish what we are about to lose?': {
    arti: 'Bisakah kita tetap mendekap dan menjaga apa yang sebentar lagi akan hilang dari genggaman kita?',
    cara_baca: 'kan wee hohld and cher-ish wut wee ahr uh-bowt too looz',
    penggunaan: [
      'Everything is slipping away so fast; can we hold and cherish what we are about to lose? (Semuanya memudar begitu cepat; bisakah kita menjaga apa yang hampir hilang dari genggaman kita?)'
    ],
    catatan: 'Kutipan lirik puitis dan emosional dari lagu eleventwelfth.'
  },
  'when i peace myself out of here, don\'t you even cry': {
    arti: 'Saat gue pergi dengan tenang dari sini, jangan sampai lu meneteskan air mata sekalipun',
    cara_baca: 'wen ay pees may-self owt av heer, dohnt yoo ee-vun kray',
    penggunaan: [
      'When I peace myself out of here, don\'t you even cry; the more I try to trace you forthwith, the less I want to know where to find you. (Saat gue pergi dari sini, jangan menangis; makin gue berusaha mencari jejak lu, makin gue pasrah.)'
    ],
    catatan: 'Lirik tentang kepasrahan dan keikhlasan berpisah dari lagu eleventwelfth.'
  },

  // --- Raissa Anggiani & Arash Buana (if u could see me cry in my room) ---
  'i\'ll be here, waiting for you to come and bring me right back home': {
    arti: 'Gue bakal tetap di sini, nungguin lu datang dan bawa gue pulang kembali ke rumah',
    cara_baca: 'ayl bee heer, weyt-ing for yoo too kam and bring mee rayt bak hohm',
    penggunaan: [
      'I\'ll be here, waiting for you to come and bring me right back home; I\'m caught up with these memories just by sitting here alone. (Gue bakal nunggu di sini sampai lu jemput gue pulang; gue terjebak memori ini sendirian.)'
    ],
    catatan: 'Lirik pembuka yang sangat menyentuh dari lagu duet Arash Buana & Raissa Anggiani.'
  },
  'hey, i missed you too, and just so you know, i still love you': {
    arti: 'Hei, gue kangen sama lu juga kok, dan asal lu tau, gue masih mencintai lu',
    cara_baca: 'hey, ay mist yoo too, and just soh yoo noh, ay stil lav yoo',
    penggunaan: [
      'Hey, I missed you too, and just so you know, I still love you; and I don\'t even know if I\'m alright. (Hei, gue kangen lu juga kok, dan asal lu tau, gue masih cinta sama lu; gue gak tau apa gue baik-baik aja.)'
    ],
    catatan: 'Lirik pengakuan jujur yang viral di TikTok dari lagu "if u could see me cry in my room".'
  },
  'i\'m caught up with these memories just by sitting here alone, if you could see me cryin\' in my room': {
    arti: 'Gue terjebak dalam pusaran kenangan cuma dengan duduk sendirian, seandainya lu bisa liat gue lagi nangis di kamar',
    cara_baca: 'aym kawt ap with theez mem-reez just bay sit-ting heer uh-lohn, if yoo kood see mee kray-ing in may room',
    penggunaan: [
      'I\'m caught up with these memories just by sitting here alone, if you could see me cryin\' in my room. (Gue terjebak memori kita saat duduk sendirian, seandainya lu bisa liat gue menangis di dalam kamar.)'
    ],
    catatan: 'Lirik chorus mahakarya duet Raissa Anggiani & Arash Buana.'
  },

  // --- Cigarettes After Sex (Apocalypse) ---
  'your lips, my lips, apocalypse': {
    arti: 'Sentuhan bibir kita berdua terasa begitu dahsyat bagaikan kiamat yang meruntuhkan dunia',
    cara_baca: 'yoor lips, may lips, uh-pok-uh-lips',
    penggunaan: [
      'Sharing all your secrets with each other, talking all night, your lips, my lips, apocalypse. (Saling berbagi semua rahasia berdua, ngobrol semalaman suntuk, sentuhan bibir kita bagaikan akhir dunia.)'
    ],
    catatan: 'Kutipan lirik paling dreamy, sensual, dan melankolis dari Cigarettes After Sex "Apocalypse".'
  },
  'got the music in you baby, tell me why': {
    arti: 'Ada alunan melodi indah di dalam jiwamu sayang, katakan padaku mengapa begitu memesona',
    cara_baca: 'got the myoo-zik in yoo bey-bee, tel mee way',
    penggunaan: [
      'Got the music in you baby, tell me why, you\'ve been locked in here forever and you just can\'t say goodbye. (Ada musik yang mengalun di dirimu sayang, kenapa kau terus terkurung di sini dan tak sanggup berucap selamat tinggal?)'
    ],
    catatan: 'Lirik pembuka lagu "Apocalypse" Cigarettes After Sex yang sangat menenangkan.'
  },
  'sharing all your secrets with each other, talking all night': {
    arti: 'Saling membagikan semua rahasia terdalam satu sama lain, mengobrol berdua semalaman suntuk',
    cara_baca: 'shair-ing awl yoor see-krits with eech ath-er, tawk-ing awl nayt',
    penggunaan: [
      'Sharing all your secrets with each other, talking all night, your lips, my lips, apocalypse. (Saling berbagi rahasia berdua, ngobrol semalaman, cinta kita terasa seperti akhir dunia.)'
    ],
    catatan: 'Lirik tentang keintiman emosional yang mendalam dari Cigarettes After Sex.'
  },

  // --- Pamungkas (I Love You but I'm Letting Go) ---
  'sunday night after a rainy day, i delete all your pictures, i walked away from you': {
    arti: 'Minggu malam setelah seharian diguyur hujan, gue hapus semua foto lu dan gue melangkah pergi dari hidup lu',
    cara_baca: 'san-dey nayt af-ter uh rey-nee dey, ay dih-leet awl yoor pik-cherz, ay wawkt uh-wey fram yoo',
    penggunaan: [
      'Sunday night after a rainy day, I delete all your pictures, I walked away from you; nights are the hardest, but I\'ll be okay. (Minggu malam sehabis hujan, gue hapus semua foto lu dan melangkah pergi; malam hari terasa terberat, tapi gue bakal baik-baik saja.)'
    ],
    catatan: 'Lirik pembuka mahakarya Pamungkas "I Love You but I\'m Letting Go".'
  },
  'i love you but i\'m letting go, and from now on i will hold my own hand': {
    arti: 'Gue cinta sama lu tapi gue memilih melepas lu pergi, dan mulai sekarang gue bakal menggenggam tangan gue sendiri',
    cara_baca: 'ay lav yoo bat aym let-ting goh, and fram now on ay wil hohld may ohn hand',
    penggunaan: [
      'I love you but I\'m letting go, and from now on I will hold my own hand until one day you\'ll hold my lonely hand. (Gue cinta lu tapi gue lepas lu pergi, dan mulai sekarang gue bakal genggam tangan sendiri sampai suatu hari ada yang menggenggam tangan sepi ini.)'
    ],
    catatan: 'Lirik tentang keikhlasan merelakan cinta tertinggi dari Pamungkas.'
  },
  'cause you know what they say: if you love somebody, gotta set them free': {
    arti: 'Karena lu tau apa kata orang bijak: kalau lu tulus mencintai seseorang, lu harus membiarkannya bebas bahagia',
    cara_baca: 'kawz yoo noh wut they sey: if yoo lav sam-bad-ee, got-tuh set them free',
    penggunaan: [
      'Cause you know what they say: if you love somebody, gotta set them free; I love you but I\'m letting go. (Karena kata pepatah kalau cinta sejati harus dilepas bebas; gue cinta lu tapi gue lepas lu pergi.)'
    ],
    catatan: 'Kutipan lirik bijak tentang seni mengikhlaskan dari lagu Pamungkas.'
  },

  // --- Paramore (The Only Exception) ---
  'i got a tight grip on reality, but i can\'t let go of what\'s in front of me here, and you are the only exception': {
    arti: 'Gue selalu berpegang teguh pada realita, tapi gue gak bisa melepaskan apa yang ada di depan mata gue saat ini, dan lu adalah satu-satunya pengecualian',
    cara_baca: 'ay got uh tayt grip on ree-al-it-ee, bat ay kant let goh av wuts in frant av mee heer, and yoo ahr the ohn-lee ek-sep-shun',
    penggunaan: [
      'I got a tight grip on reality, but I can\'t let go of what\'s in front of me here, and you are the only exception. (Gue selalu realistis memandang hidup, tapi gue gak bisa ngelepas lu yang ada di depan mata gue, dan lu lah satu-satunya pengecualian itu.)'
    ],
    catatan: 'Lirik chorus paling emosional dan legendaris dari lagu Paramore "The Only Exception".'
  },
  'when i was younger, i saw my daddy cry and curse at the wind, he broke her heart': {
    arti: 'Waktu gue masih kecil dulu, gue liat ayah gue menangis dan mengutuk takdir, dia menghancurkan hati ibu gue',
    cara_baca: 'wen ay waz yang-ger, ay saw may dad-dee kray and kers at the wind, hee brohk her hahrt',
    penggunaan: [
      'When I was younger, I saw my daddy cry and curse at the wind, he broke her heart, and I swore I would never be that way. (Waktu kecil gue liat ayah menangis dan mengutuk angin, dia hancurin hati ibu, dan gue bersumpah gak bakal mau jatuh cinta seperti itu.)'
    ],
    catatan: 'Lirik verse 1 Paramore tentang asal mula trauma masa lalu.'
  },

  // --- Aziz Hedra (Somebody's Pleasure) ---
  'soul try to figure it out, from where i\'ve been escapin\', gotta make sure i\'m not just somebody\'s pleasure': {
    arti: 'Jiwa ini nyoba nyadar dari mana aja gw udah kabur, kudu mastiin gw bukan cuma pelampiasan orang lain',
    cara_baca: 'sohl tray too fig-yer it owt, fram wair ayv been es-key-pin, got-tuh meyk shoor aym not just sam-bad-eez plezh-er',
    penggunaan: [
      'Soul try to figure it out, from where I\'ve been escapin\', running to end all the sin, get away from the pressure, gotta have to always make sure that I\'m not just somebody\'s pleasure. (Jiwa ini nyoba paham dari mana aja gw kabur, kudu pastiin gw bukan cuma pelampiasan sesaat orang lain.)'
    ],
    catatan: 'Kutipan lirik chorus lengkap dari mahakarya Aziz Hedra "Somebody\'s Pleasure".'
  },
  'it\'s so hard when you\'re caught in the middle of being somebody\'s pleasure': {
    arti: 'Berat banget rasanya pas lu terjebak di tengah situasi cuma dijadiin tempat pelampiasan kesenangan orang lain',
    cara_baca: 'its soh hahrd wen yoor kawt in the mid-ul av bee-ing sam-bad-eez plezh-er',
    penggunaan: [
      'Soul try to figure out, someone\'s in denial; it\'s so hard when you\'re caught in the middle of being somebody\'s pleasure. (Jiwa ini berusaha mencerna, ada yang sedang menyangkal rasa; berat banget saat lu terjebak cuma jadi pemuas sesaat orang lain.)'
    ],
    catatan: 'Lirik emosional viral Aziz Hedra "Somebody\'s Pleasure" tentang luka hubungan sepihak.'
  },

  // --- WIMY (Pages) ---
  'so how am i supposed to rewrite the chapters we made? flip through the pages, in another we make it': {
    arti: 'Gimana caranya gue nulis ulang babak kisah yang udah kita buat? Membuka lembaran demi lembaran, di kehidupan lain semoga kita berhasil bersama',
    cara_baca: 'soh how am ay suh-pohzd too ree-rayt the chap-terz wee meyd? flip throo the pey-jiz, in uh-nath-er wee meyk it',
    penggunaan: [
      'So how am I supposed to rewrite the chapters we made? Flip through the pages, in another we make it. (Gimana caranya gue nulis ulang babak kisah yang udah kita buat? Membuka lembaran demi lembaran, di kehidupan lain semoga kita bisa bersatu.)'
    ],
    catatan: 'Lirik chorus lagu viral "Pages" oleh WIMY tentang harapan reuni di semesta lain.'
  },

  // --- The 1975 (About You) ---
  'do you think i have forgotten about you?': {
    arti: 'Apakah lu beneran mikir kalau gue udah bener-bener ngelupain tentang lu?',
    cara_baca: 'doo yoo think ay hav fer-got-ten uh-bowt yoo',
    penggunaan: [
      'Do you think I have forgotten about you? There was something \'bout you that now I can\'t remember. (Lu kira gue udah lupa tentang lu? Dulu ada sesuatu yang istimewa dari lu yang sekarang susah gue jabarkan.)'
    ],
    catatan: 'Kutipan lirik paling dreamy dan viral dari The 1975 "About You" (vokal Matty Healy & Carly Holt).'
  },
  'there was something \'bout you that now i can\'t remember, it\'s the same damn thing that made my heart surrender': {
    arti: 'Dulu ada sesuatu yang istimewa dari lu yang sekarang susah gue ingat, tapi hal itulah yang dulu bikin hati gue menyerah dan jatuh cinta',
    cara_baca: 'thair waz sam-thing bowt yoo that now ay kant ree-mem-ber, its the seym dam thing that meyd may hahrt suh-ren-der',
    penggunaan: [
      'There was something \'bout you that now I can\'t remember, it\'s the same damn thing that made my heart surrender. (Dulu ada hal magis dari lu yang susah gue jelaskan, dan hal itulah yang dulu bikin hati gue takluk jatuh cinta.)'
    ],
    catatan: 'Lirik bridge paling emosional yang dinyanyikan Carly Holt di lagu The 1975 "About You".'
  },

  // --- Colde (Star / See You in My 19th Life OST) ---
  'just like a star, i stay here for long and watch you from afar': {
    arti: 'Kaya bintang di langit, gw tetep bertahan di sini mandang lu dari kejauhan',
    cara_baca: 'just layk uh stahr, ay stey heer for lawng and wawch yoo fram uh-fahr',
    penggunaan: [
      'Just like a star, I stay here for long and watch you from afar; while everything has changed, I just cannot help but stay. (Kaya bintang di langit, gw tetep di sini mandang lu dari jauh; pas segalanya berubah, gw gak bisa selain bertahan.)'
    ],
    catatan: 'Lirik original soundtrack dari drama "See You in My 19th Life" yang dibawakan oleh Colde.'
  },
  'all the memories got stuck, i\'m tired of the past, i want to break away': {
    arti: 'Semua kenangan nyangkut di kepala gw, gw udah capek sama masa lalu dan pengen lepas',
    cara_baca: 'awl the mem-reez got stak, aym tay-erd av the past, ay wont too breyk uh-wey',
    penggunaan: [
      'All the memories got stuck, I\'m tired of the past, I want to break away from this endless pain. (Semua kenangan nyangkut di kepala, gw capek sama bayang masa lalu dan pengen bebas dari rasa sakit ini.)'
    ],
    catatan: 'Lirik emosional tentang usaha melepaskan jeratan masa lalu dari lagu Colde.'
  },

  // --- HONNE feat. Georgia (Location Unknown) ---
  'location unknown, tryin\' to get home to you, my heart is somewhere in the clouds': {
    arti: 'Lokasi gak jelas di antah berantah, tapi hati ini cuma berusaha pulang ke pelukanmu, jiwaku melayang di atas awan',
    cara_baca: 'loh-key-shun an-nohn, tray-in too get hohm too yoo, may hahrt iz sam-wair in the klowdz',
    penggunaan: [
      'My head is a mess, my location unknown, tryin\' to get home to you, my heart is somewhere in the clouds. (Kepala gue lagi semrawut, gak tau lagi ada di mana, tapi gue cuma pengen pulang ke pelukan lu.)'
    ],
    catatan: 'Lirik anthem LDR paling legendaris dari HONNE feat. Georgia "Location Unknown".'
  },
  'i travel through the night, wishing you were right beside me': {
    arti: 'Gw nempuh perjalanan nembus dinginnya malam, ngarep lu ada tepat di samping gw saat ini',
    cara_baca: 'ay trav-ul throo the nayt, wish-ing yoo wer rayt bee-sayd mee',
    penggunaan: [
      'I travel through the night, wishing you were right beside me, feeling so far away from home. (Gw nyetir nembus malam, ngarep lu ada di samping gw, ngerasa jauh banget dari rumah.)'
    ],
    catatan: 'Kutipan lirik kerinduan mendalam dari lagu HONNE.'
  },

  // --- Arash Buana (hey, i'm tired & i've always loved you) ---
  'one day you\'ll know that i have always loved you, loved you': {
    arti: 'Suatu hari nanti lu bakal tau dan sadar kalau gue selalu mencintai lu dari dulu',
    cara_baca: 'wan dey yool noh that ay hav awl-weyz lavd yoo, lavd yoo',
    penggunaan: [
      'And it hurts to see you\'re not here for me, it\'s okay, I\'m okay, but one day you\'ll know I have always loved you, loved you. (Dan sakit rasanya ngeliat lu gak ada lagi buat gue, gak apa-apa gue baik-baik aja, tapi suatu hari lu bakal tau gue selalu cinta sama lu.)'
    ],
    catatan: 'Lirik paling ikonik dan emosional dari lagu hits Arash Buana "i\'ve always loved you".'
  },
  'i was scared of waking up \'cause i know i\'ll end up feeling numb': {
    arti: 'Dulu gue takut buat bangun pagi karena gue tau ujung-ujungnya cuma bakal ngerasa hampa mati rasa',
    cara_baca: 'ay waz skaird av weyk-ing ap kawz ay noh ayl end ap feel-ing nam',
    penggunaan: [
      'I was scared of waking up \'cause I know I\'ll end up feeling numb, staring at the empty wall. (Dulu gue takut bangun pagi karena tau bakal ngerasa hampa dan cuma bisa natap tembok kosong.)'
    ],
    catatan: 'Lirik kejujuran tentang rasa depresi dan hampa dari lagu Arash Buana.'
  },
  'i was afraid of breaking up \'cause i don\'t wanna be alone': {
    arti: 'Dulu gue takut banget putus karena gue gak mau kesepian sendirian di dunia ini',
    cara_baca: 'ay waz uh-freyd av breyk-ing ap kawz ay dohnt wan-nuh bee uh-lohn',
    penggunaan: [
      'I stayed even when it hurt, I was afraid of breaking up \'cause I don\'t wanna be alone. (Gue bertahan walau sakit, dulu gue takut putus karena gue gak mau sendirian.)'
    ],
    catatan: 'Lirik tentang ketakutan akan kesepian yang sangat relatable dari Arash Buana.'
  },
  'hey, i\'m tired, just want you to know i\'m trying to get it right, it gets harder as it goes': {
    arti: 'Hei, gue capek, gue cuma pengen lu tau kalau gue lagi berjuang keras buat benerin semuanya, tapi makin lama makin berat rasanya',
    cara_baca: 'hey, aym tay-erd, just wont yoo too noh aym tray-ing too get it rayt, it gets hahr-der az it gohz',
    penggunaan: [
      'Hey, I\'m tired, just want you to know I\'m trying to get it right, it gets harder as it goes. (Hei, gue capek, gue cuma pengen lu tau kalau gue lagi berusaha keras benerin semuanya, makin lama makin berat rasanya.)'
    ],
    catatan: 'Lirik kejujuran emosional paling dalam dari lagu Arash Buana "hey, i\'m tired".'
  },
  'you\'re the one who makes me happy when everything gets heavy, sorry but i\'m really missing you': {
    arti: 'Lu adalah satu-satunya yang bikin gue bahagia pas semuanya terasa berat, maaf tapi gue bener-bener kangen banget sama lu',
    cara_baca: 'yoor the wan hoo meyks mee hap-pee wen ev-ree-thing gets hev-ee, sawr-ee bat aym reel-lee mis-ing yoo',
    penggunaan: [
      'You\'re the one who makes me happy when everything gets heavy, sorry but I\'m really missing you tonight. (Lu adalah satu-satunya yang bikin gue tersenyum saat hidup terasa berat, maaf tapi malam ini gue beneran kangen lu.)'
    ],
    catatan: 'Lirik pengakuan rindu yang tulus dan mengharukan dari Arash Buana.'
  },
  'hold my hand and say you won\'t leave me all alone in the dark': {
    arti: 'Genggam tangan gue dan ucapkan kalau lu gak bakal ninggalin gue sendirian di dalam kegelapan',
    cara_baca: 'hohld may hand and sey yoo wohnt leev mee awl uh-lohn in the dahrk',
    penggunaan: [
      'Hold my hand and say you won\'t leave me all alone in the dark when the night falls. (Genggam tangan gue dan katakan lu gak bakal ninggalin gue sendirian di kegelapan malam.)'
    ],
    catatan: 'Lirik penuh permohonan emosional dari lagu Arash Buana.'
  },
  'walking past each other without saying hi, we\'re strangers again, but with all the memories': {
    arti: 'Berjalan papasan tanpa saling menyapa, kita kembali jadi dua orang asing tapi dengan kepala penuh kenangan masa lalu',
    cara_baca: 'wawk-ing past eech ath-er with-owt sey-ing hay, weer streyn-jerz uh-gen, bat with awl the mem-reez',
    penggunaan: [
      'Walking past each other without saying hi, we\'re strangers again, but with all the memories. (Papasan tanpa saling sapa, kita kembali jadi dua orang asing tapi dengan kepala penuh kenangan.)'
    ],
    catatan: 'Lirik galau mendalam khas karya-karya Arash Buana tentang akhir sebuah kisah asmara.'
  },

  // --- Taylor Swift ---
  'please don\'t be in love with someone else, please don\'t have somebody waiting on you': {
    arti: 'Tolong jangan sampai lu udah jatuh cinta sama orang lain, tolong jangan sampai ada orang yang lagi nungguin lu di sana',
    cara_baca: 'pleez dohnt bee in lav with sam-wan els, pleez dohnt hav sam-bad-ee weyt-ing on yoo',
    penggunaan: [
      'This night is sparkling, don\'t you let it go; please don\'t be in love with someone else, please don\'t have somebody waiting on you. (Malam ini berkilau indah; tolong jangan jatuh cinta pada orang lain, tolong jangan ada yang menunggumu di sana.)'
    ],
    catatan: 'Lirik doa cinta paling legendaris dari lagu "Enchanted" Taylor Swift.'
  },
  'band-aids don\'t fix bullet holes, you say sorry just for show': {
    arti: 'Plester luka gak bakal bisa nutup luka tembak, lu minta maaf cuma buat formalitas belaka',
    cara_baca: 'band-eydz dohnt fiks bool-it hohlz, yoo sey sawr-ee just for shoh',
    penggunaan: [
      'Band-Aids don\'t fix bullet holes, you say sorry just for show, if you live like that, you live with ghosts. (Plester luka gak bisa sembuhin luka tembak sedalam ini, lu minta maaf cuma formalitas.)'
    ],
    catatan: 'Metafora brilian dari lagu "Bad Blood" Taylor Swift tentang rasa sakit dikhianati sahabat.'
  },
  'you drew stars around my scars, but now i\'m bleedin\'': {
    arti: 'Dulu lu melukis bintang-bintang di sekeliling bekas luka trauma gue, tapi sekarang lu yang bikin luka baru ini berdarah',
    cara_baca: 'yoo droo stahrz uh-rownd may skahrz, bat now aym bleed-in',
    penggunaan: [
      'You drew stars around my scars, but now I\'m bleedin\'. (Dulu lu menghias luka trauma gue jadi indah, tapi sekarang lu yang bikin luka baru.)'
    ],
    catatan: 'Lirik puitis legendaris dari lagu "Cardigan" Taylor Swift di album Folklore.'
  },
  'i knew you were trouble when you walked in, so shame on me now': {
    arti: 'Gue udah tau lu tuh bakal bawa masalah sejak pertama kali lu melangkah masuk, jadi salah gue sendiri kenapa tetep maju',
    cara_baca: 'ay noo yoo wer trab-ul wen yoo wawkt in, soh sheym on mee now',
    penggunaan: [
      'I knew you were trouble when you walked in, so shame on me now; flew me to places I\'d never been, till you put me down. (Gue udah tau dari awal lu red flag pas pertama kali ketemu, salah gue sendiri kenapa tetep maju.)'
    ],
    catatan: 'Lirik hit bangers "I Knew You Were Trouble" Taylor Swift tentang firasat bahaya yang diabaikan.'
  },

  // --- Radiohead ---
  'i\'m a creep, i\'m a weirdo, what the hell am i doing here? i don\'t belong here': {
    arti: 'Gue ini cuma orang aneh dan terasing, ngapain coba gue ada di tempat keren kayak gini? Gue gak pantas berada di sini',
    cara_baca: 'aym uh kreep, aym uh weer-doh, wut the hel am ay doo-ing heer? ay dohnt bee-lawng heer',
    penggunaan: [
      'Looking at all the confident people around me, I\'m a creep, I\'m a weirdo, what the hell am I doing here? I don\'t belong here. (Liat orang-orang keren di sekitar gue, gue ngerasa minder kayak orang aneh yang salah tempat.)'
    ],
    catatan: 'Lirik lagu kebangsaan kaum insecure dan introvert paling legendaris sepanjang masa: "Creep" Radiohead.'
  },
  'a quiet life, a handshake of carbon monoxide, with no alarms and no surprises, please': {
    arti: 'Kehidupan yang sunyi tenang, jabat tangan dengan gas karbon monoksida, tanpa alarm panik dan tanpa kejutan buruk, tolong',
    cara_baca: 'uh kway-it layf, uh hand-sheyk av kahr-bun muh-nok-sayd, with noh uh-lahrmz and noh ser-pray-ziz, pleez',
    penggunaan: [
      'A quiet life, a handshake of carbon monoxide, with no alarms and no surprises, please. (Kehidupan yang sunyi tenang, tanpa alarm panik dan tanpa kejutan buruk.)'
    ],
    catatan: 'Lirik verbatim lengkap dari lagu "No Surprises" karya Thom Yorke / Radiohead di album OK Computer.'
  },
  'karma police, arrest this man, he talks in maths, he buzzes like a fridge': {
    arti: 'Wahai polisi karma, tolong tangkap pria ini, omongannya kaku penuh hitungan matematis dan berdengung bising kayak kulkas rusak',
    cara_baca: 'kahr-muh puh-lees, uh-rest this man, hee tawks in maths, hee baz-iz layk uh frij',
    penggunaan: [
      'Karma police, arrest this man, he talks in maths, he buzzes like a fridge, he\'s like a detuned radio. (Polisi karma tangkap orang ini, omongannya bising dan bikin muak.)'
    ],
    catatan: 'Kutipan verse 1 legendaris dari lagu "Karma Police" Radiohead.'
  },
  'for a minute there, i lost myself, i lost myself': {
    arti: 'Untuk beberapa saat tadi, gue sempat kehilangan kendali atas diri gue sendiri dan hanyut dalam emosi',
    cara_baca: 'for uh min-it thair, ay lawst may-self, ay lawst may-self',
    penggunaan: [
      'Phew, for a minute there, I lost myself, I lost myself. (Huft, untuk beberapa saat tadi gue sempat lupa diri dan kehilangan kendali.)'
    ],
    catatan: 'Kutipan outro mahakarya "Karma Police" Radiohead yang sangat menenangkan.'
  },

  // --- One Direction ---
  'you don\'t know you\'re beautiful, oh-oh, that\'s what makes you beautiful': {
    arti: 'Lu gak sadar kalau lu begitu cantik memesona, dan ketidaktahuan lu itulah yang bikin lu makin cantik luar biasa',
    cara_baca: 'yoo dohnt noh yoor byoo-tih-fool, oh-oh, thats wut meyks yoo byoo-tih-fool',
    penggunaan: [
      'You don\'t know you\'re beautiful, oh-oh, that\'s what makes you beautiful! (Lu gak sadar kalau diri lu itu cantik, dan kepolosan lu itulah yang bikin lu makin menawan!)'
    ],
    catatan: 'Lirik chorus pop legendaris One Direction "What Makes You Beautiful" yang membesarkan nama 1D di seluruh dunia.'
  },
  'the story of my life, i take her home, i drive all night to keep her warm and time is frozen': {
    arti: 'Kisah hidup gue, gue antar dia pulang ke rumah, gue nyetir semalaman agar dia tetap merasa hangat dan waktu serasa membeku',
    cara_baca: 'the stor-ee av may layf, ay teyk her hohm, ay drayv awl nayt too keep her wawrm and taym iz froh-zun',
    penggunaan: [
      'The story of my life, I take her home, I drive all night to keep her warm and time is frozen. (Kisah hidup gue, gue antar dia pulang, nyetir semalaman menemaninya dan waktu serasa berhenti.)'
    ],
    catatan: 'Lirik folk-pop nostalgia mendalam dari lagu hits One Direction "Story of My Life".'
  },
  'we could be the greatest team that the world has ever seen': {
    arti: 'Kita berdua bisa menjadi tim terhebat dan pasangan paling solid yang pernah ada di muka bumi ini',
    cara_baca: 'wee kood bee the greyt-ist teem that the werld haz ev-er seen',
    penggunaan: [
      'You and me got a whole lot of history, we could be the greatest team that the world has ever seen! (Kita punya begitu banyak sejarah bersama, kita bisa jadi pasangan terhebat di dunia!)'
    ],
    catatan: 'Lirik anthem persahabatan dan cinta dari lagu "History" One Direction.'
  },
  'does it ever drive you crazy just how fast the night changes?': {
    arti: 'Pernahkah lu ngerasa takjub sekaligus gila memikirkan betapa cepatnya malam dan waktu ini berganti?',
    cara_baca: 'duz it ev-er drayv yoo krey-zee just how fast the nayt cheyn-jiz',
    penggunaan: [
      'We\'re only getting older, baby, and I\'ve been thinking about it lately; does it ever drive you crazy just how fast the night changes? (Kita makin dewasa, dan gue kepikiran terus akhir-akhir ini; pernahkah lu takjub betapa cepatnya waktu berlalu?)'
    ],
    catatan: 'Lirik paling filosofis, indah, dan menyentuh tentang berlalunya masa muda dari lagu "Night Changes" One Direction.'
  },
  'you\'re the sun to the moon, you\'re the ocean so blue, i\'m nothing without you, oh babe': {
    arti: 'Lu adalah matahari bagi rembulan, lu bagaikan lautan biru yang luas; gue bukan apa-apa tanpa kehadiran lu di hidup gue, sayang',
    cara_baca: 'yoor the san too the moon, yoor the oh-shun soh bloo, aym nath-ing with-owt yoo, oh beyb',
    penggunaan: [
      'You\'re the sun to the moon, you\'re the ocean so blue; I\'m nothing without you, oh babe! (Lu adalah matahari bagi rembulan, lautan biru luas; gue bukan siapa-siapa tanpa lu!)'
    ],
    catatan: 'Lirik lagu cinta "you!" dari LANY di album Mama\'s Boy.'
  },
  'i drive circles under street lights, nothing seems to clear my mind, chasing malibu nights': {
    arti: 'Gue nyetir berputar-putar di bawah lampu jalanan kota, tak ada satu pun yang bisa menjernihkan pikiran, mengejar malam-malam di Malibu',
    cara_baca: 'ay drayv ser-kulz an-der street layts, nath-ing seemz too kleer may maynd, cheys-ing mal-ih-boo nayts',
    penggunaan: [
      'I drive circles under street lights, nothing seems to clear my mind, chasing Malibu nights. (Gue nyetir berputar-putar di bawah lampu jalan, tak ada yang bisa bikin pikiran tenang saat malam di Malibu.)'
    ],
    catatan: 'Lirik refrain lagu "Malibu Nights" LANY.'
  },
  'you are my favorite everything; shut up, i love you, you\'re my best friend': {
    arti: 'Lu adalah segalanya yang paling gue sukai; udah diem, gue cinta banget sama lu, lu adalah sahabat terbaik sekaligus belahan jiwa gue',
    cara_baca: 'yoo ahr may fey-vrit ev-ree-thing; shat up, ay lav yoo, yoor may best frend',
    penggunaan: [
      'You are my favorite everything; shut up, I love you, you\'re my best friend. (Lu adalah hal terbaik dalam hidup gue; udah diam, gue cinta banget sama lu, lu adalah sahabat terbaik gue.)'
    ],
    catatan: 'Kutipan lirik paling manis dari lagu "Pink Skies" LANY.'
  }
};

// Generates approximate phonetic pronunciation rules for any arbitrary English word
export function generatePhonetics(word) {
  if (!word) return '';
  const clean = word.toLowerCase().trim();


  let phonetic = clean
    .replace(/tion\b/g, 'shun')
    .replace(/sion\b/g, 'zhun')
    .replace(/ough/g, 'aw')
    .replace(/ight/g, 'ayt')
    .replace(/ph/g, 'f')
    .replace(/kn/g, 'n')
    .replace(/wr/g, 'r')
    .replace(/ee/g, 'ee')
    .replace(/oo/g, 'oo')
    .replace(/th/g, 'th')
    .replace(/wh/g, 'w')
    .replace(/ck/g, 'k')
    .replace(/age\b/g, 'ij')
    .replace(/ous\b/g, 'us')
    .replace(/ture\b/g, 'cher');

  return phonetic;
}

// Levenshtein distance algorithm for detecting typos
function getLevenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function findClosestFuzzyMatch(inputText) {
  const lower = inputText.toLowerCase().trim();
  if (lower.length < 3) return null;

  let bestMatch = null;
  let minDistance = 999;

  for (const key of Object.keys(DICTIONARY)) {
    const dist = getLevenshteinDistance(lower, key);
    const maxAllowedDist = key.length <= 5 ? 1 : 2;
    if (dist > 0 && dist <= maxAllowedDist && dist < minDistance) {
      minDistance = dist;
      bestMatch = key;
    }
  }

  return bestMatch;
}

// Instant generator for any arbitrary word/phrase
export function getInstantAnalysis(inputText) {
  const text = inputText.trim();
  const lower = text.toLowerCase();
  const cleanPunctuation = lower.replace(/[^a-z0-9\s]/g, '').trim();

  // Make sure learned bank is synced
  syncLearnedVocabBank();

  // 1. Direct dictionary match (Built-in + AI Learned Bank)
  if (DICTIONARY[lower]) {
    return {
      ...DICTIONARY[lower],
      isInstant: true
    };
  }

  // 1b. Direct match without punctuation
  if (DICTIONARY[cleanPunctuation]) {
    return {
      ...DICTIONARY[cleanPunctuation],
      isInstant: true
    };
  }

  const wordCount = lower.split(/\s+/).filter(Boolean).length;

  // 2. Match for single-words or 2-word phrases
  if (wordCount <= 2) {
    for (const key of Object.keys(DICTIONARY)) {
      const keyWords = key.split(/\s+/).filter(Boolean).length;
      if (keyWords <= 2 && (lower === key || cleanPunctuation === key.replace(/[^a-z0-9\s]/g, ''))) {
        return {
          ...DICTIONARY[key],
          isInstant: true
        };
      }
    }

    // 3. 🔍 Fuzzy Typo Correction for single words
    const fuzzyMatchKey = findClosestFuzzyMatch(cleanPunctuation);
    if (fuzzyMatchKey && DICTIONARY[fuzzyMatchKey]) {
      return {
        ...DICTIONARY[fuzzyMatchKey],
        isTypoCorrected: true,
        originalQuery: text,
        correctedWord: fuzzyMatchKey,
        isInstant: true
      };
    }
  }

  // 4. Smart conversational generator for unknown words/phrases
  return {
    ...generateSmartSentenceAnalysis(text),
    isGenerated: true
  };
}

// 🧠 Sync & Merge extended dataset and learned words from LocalStorage into in-memory DICTIONARY
export function syncLearnedVocabBank() {
  try {
    // 1. Merge 1,000+ extended vocabulary dataset
    if (vocab1000 && typeof vocab1000 === 'object') {
      Object.keys(vocab1000).forEach((k) => {
        const lower = k.toLowerCase();
        if (!DICTIONARY[lower]) {
          DICTIONARY[lower] = vocab1000[k];
        }
      });
    }

    // 2. Merge user AI-learned words from local storage
    const learned = getLearnedVocabBank();
    if (learned && typeof learned === 'object') {
      Object.keys(learned).forEach((k) => {
        DICTIONARY[k.toLowerCase()] = learned[k];
      });
    }
  } catch (err) {
    // Ignore in SSR/test environments
  }
}

// 🚀 Automatically register and permanently upgrade the Vocab Bank with new AI-learned words
export function registerNewLearnedWord(word, data) {
  if (!word || !data) return;
  const cleanWord = word.toLowerCase().trim();
  
  DICTIONARY[cleanWord] = {
    ...data,
    isAiLearned: true
  };

  saveLearnedVocabToBank(cleanWord, data);
}

// 📊 Statistics of the Self-Expanding Bank
export function getVocabBankStats() {
  syncLearnedVocabBank();
  const learned = getLearnedVocabBank();
  const learnedCount = Object.keys(learned).length;
  const totalCount = Object.keys(DICTIONARY).length;
  return {
    builtInCount: totalCount - learnedCount,
    aiLearnedCount: learnedCount,
    totalCount: totalCount
  };
}

// Auto-run initial sync on module load
syncLearnedVocabBank();
