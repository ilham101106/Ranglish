const fs = require('fs');

// Load existing A-C vocab
const existingVocab = JSON.parse(fs.readFileSync('./src/data/vocab1000.json', 'utf8'));

// High quality handcrafted definitions for D through Z
const newVocab = {
  // === D ===
  "daunting": {
    "arti": "Menakutkan / terasa sangat berat dan bikin ciut nyali",
    "cara_baca": "dawn-ting",
    "penggunaan": [
      "Starting a new career in a foreign country can be a daunting task. (Memulai karir baru di negeri orang bisa jadi tugas yang bikin ciut nyali.)"
    ],
    "catatan": "Dipakai untuk tantangan besar yang butuh keberanian ekstra."
  },
  "dazzle": {
    "arti": "Memukau / menyilaukan mata karena saking indahnya",
    "cara_baca": "daz-ul",
    "penggunaan": [
      "Her performance on stage dazzled the entire audience. (Penampilannya di atas panggung memukau seluruh penonton.)"
    ],
    "catatan": "Bisa untuk cahaya yang sangat terang atau bakat yang luar biasa."
  },
  "debris": {
    "arti": "Puing-puing / serpihan reruntuhan sisa kehancuran",
    "cara_baca": "duh-bree",
    "penggunaan": [
      "Workers spent days clearing the debris after the storm. (Petugas menghabiskan berhari-hari membersihkan puing-puing pasca badai.)"
    ],
    "catatan": "Huruf 's' di akhir kata ini tidak dibaca (silent 's')."
  },
  "deceive": {
    "arti": "Menipu / membohongi orang dengan sengaja",
    "cara_baca": "dih-seev",
    "penggunaan": [
      "Do not let their sweet words deceive you. (Jangan biarkan kata-kata manis mereka menipumu.)"
    ],
    "catatan": "Sering dipakai dalam hubungan atau manipulasi bisnis."
  },
  "decisive": {
    "arti": "Tegas / mampu mengambil keputusan cepat dan bulat",
    "cara_baca": "dih-say-siv",
    "penggunaan": [
      "A great leader must take decisive action during a crisis. (Pemimpin hebat harus mengambil tindakan tegas saat krisis.)"
    ],
    "catatan": "Lawan dari kata indecisive (plin-plan / ragu-ragu)."
  },
  "dedicate": {
    "arti": "Mendedikasikan / mencurahkan waktu dan tenaga untuk suatu tujuan",
    "cara_baca": "ded-ih-keyt",
    "penggunaan": [
      "She dedicated her entire life to medical research. (Dia mendedikasikan seluruh hidupnya untuk riset medis.)"
    ],
    "catatan": "Bentuk kata sifatnya adalah dedicated (berdedikasi)."
  },
  "deduce": {
    "arti": "Menyimpulkan / menarik kesimpulan berdasarkan bukti yang ada",
    "cara_baca": "dih-dyoos",
    "penggunaan": [
      "From the footprints, the detective deduced that someone had escaped. (Dari jejak kaki, detektif menyimpulkan ada yang melarikan diri.)"
    ],
    "catatan": "Metode berpikir deduktif (deductive reasoning ala Sherlock Holmes)."
  },
  "deficiency": {
    "arti": "Kekurangan / defisiensi nutrisi atau unsur penting",
    "cara_baca": "dih-fish-un-see",
    "penggunaan": [
      "Vitamin D deficiency can cause extreme fatigue. (Kekurangan vitamin D bisa menyebabkan rasa lelah ekstrem.)"
    ],
    "catatan": "Sering dipakai dalam konteks kesehatan dan gizi."
  },
  "definitive": {
    "arti": "Pasti / mutlak dan tidak bisa diganggu gugat lagi",
    "cara_baca": "dih-fin-ih-tiv",
    "penggunaan": [
      "We are still waiting for a definitive answer from the management. (Kita masih menunggu jawaban pasti dari pihak manajemen.)"
    ],
    "catatan": "Dipakai untuk panduan, buku, atau keputusan final terlengkap."
  },
  "delegate": {
    "arti": "Melimpahkan wewenang / menugaskan tugas ke anggota tim",
    "cara_baca": "del-uh-geyt",
    "penggunaan": [
      "A smart manager knows how to delegate tasks effectively. (Manajer cerdas tahu cara melimpahkan tugas secara efektif.)"
    ],
    "catatan": "Bisa sebagai kata kerja (melimpahkan) atau kata benda (utusan/delegasi)."
  },
  "deliberate": {
    "arti": "Sengaja / direncanakan secara matang dan sadar",
    "cara_baca": "dih-lib-er-it",
    "penggunaan": [
      "It was not an accident; it was a deliberate choice. (Itu bukan kecelakaan; itu adalah pilihan yang disengaja.)"
    ],
    "catatan": "Sebagai kata sifat dibaca 'dih-lib-er-it', sebagai kata kerja dibaca 'dih-lib-er-eyt'."
  },
  "delicate": {
    "arti": "Halus / rapuh dan butuh penanganan sangat hati-hati",
    "cara_baca": "del-ih-kit",
    "penggunaan": [
      "Handle this antique vase with care; it is extremely delicate. (Pegang vas antik ini hati-hati; barang ini sangat rapuh.)"
    ],
    "catatan": "Bisa dipakai untuk benda pecah belah maupun situasi sensitif (delicate situation)."
  },
  "demolish": {
    "arti": "Merobohkan / menghancurkan bangunan sampai rata dengan tanah",
    "cara_baca": "dih-mol-ish",
    "penggunaan": [
      "The old factory was demolished to make way for a new park. (Pabrik tua itu dirobohkan untuk dijadikan taman baru.)"
    ],
    "catatan": "Bisa juga dipakai secara metaforis: 'demolish the argument' (membantai argumen)."
  },
  "denounce": {
    "arti": "Mengecam / mengutuk perbuatan buruk di depan umum",
    "cara_baca": "dih-nowns",
    "penggunaan": [
      "The government strongly denounced the act of violence. (Pemerintah mengecam keras tindakan kekerasan tersebut.)"
    ],
    "catatan": "Kecaman resmi atau moral terhadap ketidakadilan."
  },
  "deplete": {
    "arti": "Menguras / menghabiskan persediaan sampai menipis",
    "cara_baca": "dih-pleet",
    "penggunaan": [
      "Endless overtime will quickly deplete your energy. (Lembur tanpa henti bakal cepat menguras energimu.)"
    ],
    "catatan": "Sering dipakai untuk energi tubuh, saldo rekening, atau sumber daya alam."
  },
  "deprive": {
    "arti": "Merampas hak / mencabut kebutuhan dasar seseorang",
    "cara_baca": "dih-prayv",
    "penggunaan": [
      "Being sleep deprived makes it impossible to focus. (Kurang tidur / terampas waktu tidurnya bikin gak bisa fokus.)"
    ],
    "catatan": "Frasa umum: 'sleep deprived' (kurang tidur kronis)."
  },
  "derive": {
    "arti": "Berasal dari / memperoleh manfaat atau arti dari sumber tertentu",
    "cara_baca": "dih-rayv",
    "penggunaan": [
      "Many English words are derived from Latin and Greek. (Banyak kata bahasa Inggris berasal dari bahasa Latin dan Yunani.)"
    ],
    "catatan": "Bentuk kata bendanya adalah derivative (turunan)."
  },
  "desolate": {
    "arti": "Sunyi sepi / gersang dan terabaikan tanpa penghuni",
    "cara_baca": "des-uh-lit",
    "penggunaan": [
      "They found themselves in a desolate ghost town. (Mereka mendapati diri mereka berada di kota hantu yang sunyi sepi.)"
    ],
    "catatan": "Menggambarkan suasana hampa, sepi, atau kesepian batin."
  },
  "despise": {
    "arti": "Memandang rendah / sangat membenci dan muak pada seseorang",
    "cara_baca": "dih-spayz",
    "penggunaan": [
      "I despise hypocrites who never practice what they preach. (Gue muak banget sama orang munafik yang gak pernah ngelakuin apa yang mereka omongin.)"
    ],
    "catatan": "Tingkat kebencian yang disertai rasa jijik atau meremehkan."
  },
  "deteriorate": {
    "arti": "Memburuk / mengalami penurunan kondisi secara bertahap",
    "cara_baca": "dih-teer-ee-uh-reyt",
    "penggunaan": [
      "His health began to deteriorate rapidly after the incident. (Kesehatannya mulai memburuk dengan cepat setelah kejadian itu.)"
    ],
    "catatan": "Bisa dipakai untuk kondisi medis, kualitas jalan, atau hubungan sosial."
  },
  "deviate": {
    "arti": "Menyimpang / keluar dari jalur atau rencana semula",
    "cara_baca": "dee-vee-eyt",
    "penggunaan": [
      "Do not deviate from the safety instructions. (Jangan menyimpang dari instruksi keselamatan kerja.)"
    ],
    "catatan": "Istilah statistik: 'standard deviation' (standar deviasi)."
  },
  "devour": {
    "arti": "Melalap habis / menyantap makanan dengan rakus dan cepat",
    "cara_baca": "dih-vow-er",
    "penggunaan": [
      "He was so starving that he devoured the entire pizza in minutes. (Dia saking laparnya melalap habis seluruh pizza dalam hitungan menit.)"
    ],
    "catatan": "Bisa juga: 'devour a book' (membaca buku tebal sampai habis dengan antusias)."
  },
  "dilute": {
    "arti": "Mengencerkan / mengurangi kadar kepekatan cairan atau makna",
    "cara_baca": "dih-loot",
    "penggunaan": [
      "Dilute the concentrated juice with water before serving. (Encerkan sari buah pekat itu dengan air sebelum disajikan.)"
    ],
    "catatan": "Dalam bisnis: 'dilute shares' (mengurangi porsi kepemilikan saham)."
  },
  "diminish": {
    "arti": "Menyusut / berkurang ukuran, nilai, atau pengaruhnya",
    "cara_baca": "dih-min-ish",
    "penggunaan": [
      "The passage of time did not diminish their strong friendship. (Berlalunya waktu tidak menyusutkan persahabatan erat mereka.)"
    ],
    "catatan": "Frasa ekonomi: 'law of diminishing returns'."
  },
  "discern": {
    "arti": "Mengenali / membedakan sesuatu yang samar dengan ketajaman pikiran",
    "cara_baca": "dih-sern",
    "penggunaan": [
      "It is hard to discern the truth from exaggerated rumors. (Susah membedakan kebenaran dari gosip yang dilebih-lebihkan.)"
    ],
    "catatan": "Bentuk kata sifatnya adalah discerning (kritis dan berkelas)."
  },
  "discreet": {
    "arti": "Bijaksana menjaga rahasia / tidak mencolok agar tidak menimbulkan kecurigaan",
    "cara_baca": "dih-skreet",
    "penggunaan": [
      "Please be discreet about our meeting; no one else should know. (Tolong jaga rahasia tentang pertemuan kita; jangan sampai ada yang tahu.)"
    ],
    "catatan": "Berbeda dengan 'discrete' (terpisah/berbeda komponennya)."
  },
  "dismantle": {
    "arti": "Membongkar / melepaskan bagian-bagian mesin atau sistem satu per satu",
    "cara_baca": "dis-man-tul",
    "penggunaan": [
      "The mechanic dismantled the engine to find the broken part. (Montir membongkar mesin untuk mencari komponen yang rusak.)"
    ],
    "catatan": "Bisa dipakai membongkar mesin fisik atau membongkar sindikat kriminal."
  },
  "dispute": {
    "arti": "Perselisihan / sengketa atau perdebatan resmi antara dua pihak",
    "cara_baca": "dih-spyoot",
    "penggunaan": [
      "The two companies settled their legal dispute out of court. (Kedua perusahaan menyelesaikan sengketa hukum mereka di luar pengadilan.)"
    ],
    "catatan": "Sering dipakai dalam ranah hukum, kontrak kerja, atau perbatasan wilayah."
  },
  "distinct": {
    "arti": "Jelas berbeda / memiliki ciri khas yang mudah dikenali",
    "cara_baca": "dih-stinkt",
    "penggunaan": [
      "There is a distinct difference between being confident and arrogant. (Ada perbedaan jelas antara percaya diri dan sombong.)"
    ],
    "catatan": "Bentuk kata bendanya adalah distinction (keunggulan / pembeda)."
  },
  "diverse": {
    "arti": "Beragam / bervariasi dengan banyak latar belakang berbeda",
    "cara_baca": "day-vers",
    "penggunaan": [
      "Our team consists of people from diverse cultural backgrounds. (Tim kami terdiri dari orang-orang dengan latar belakang budaya yang beragam.)"
    ],
    "catatan": "Bentuk kata bendanya adalah diversity (keberagaman)."
  },
  "drastic": {
    "arti": "Drastis / perubahan ekstrem dan berdampak sangat besar",
    "cara_baca": "dras-tik",
    "penggunaan": [
      "The doctor advised a drastic change in his daily diet. (Dokter menyarankan perubahan drastis pada pola makan hariannya.)"
    ],
    "catatan": "Dipakai untuk langkah darurat atau perubahan radikal."
  },
  "dubious": {
    "arti": "Meragukan / mencurigakan dan belum terbukti kebenarannya",
    "cara_baca": "doo-bee-us",
    "penggunaan": [
      "I received a dubious email asking for my bank password. (Gue dapet email mencurigakan yang minta password rekening bank.)"
    ],
    "catatan": "Dipakai saat nalurimu merasa ada yang tidak beres / janggal."
  },
  "durable": {
    "arti": "Awet / tahan lama dan tidak mudah rusak meski dipakai terus",
    "cara_baca": "door-uh-bul",
    "penggunaan": [
      "This backpack is made of durable and waterproof material. (Tas ransel ini terbuat dari bahan yang awet dan tahan air.)"
    ],
    "catatan": "Bentuk kata bendanya adalah durability (daya tahan)."
  },
  "dwell": {
    "arti": "Tinggal / terus-menerus memikirkan hal buruk di masa lalu",
    "cara_baca": "dwel",
    "penggunaan": [
      "Don't dwell on your past mistakes; focus on today. (Jangan terus-terusan meratapi kesalahan masa lalu; fokuslah pada hari ini.)"
    ],
    "catatan": "Frasa emas: 'dwell on the past' (terjebak memikirkan masa lalu)."
  },
  "dynamic": {
    "arti": "Dinamis / penuh energi, aktif berubah, dan terus berkembang",
    "cara_baca": "day-nam-ik",
    "penggunaan": [
      "The tech startup is a fast-paced and dynamic environment. (Startup teknologi adalah lingkungan yang serba cepat dan dinamis.)"
    ],
    "catatan": "Lawan dari kata static (statis / diam tidak bergerak)."
  },

  // === E ===
  "eager": {
    "arti": "Antusias / sangat bersemangat dan tidak sabar ingin melakukan sesuatu",
    "cara_baca": "ee-ger",
    "penggunaan": [
      "The interns were eager to learn new skills from the senior engineers. (Para peserta magang sangat antusias belajar keahlian baru dari insinyur senior.)"
    ],
    "catatan": "Sering dipadukan dengan kata kerja: 'eager to know / eager to help'."
  },
  "earnest": {
    "arti": "Sungguh-sungguh / tulus dan berdedikasi tinggi tanpa main-main",
    "cara_baca": "er-nist",
    "penggunaan": [
      "He made an earnest effort to apologize for what happened. (Dia melakukan usaha yang sungguh-sungguh untuk meminta maaf atas apa yang terjadi.)"
    ],
    "catatan": "Frasa umum: 'in all earnestness' (dengan segala ketulusan hati)."
  },
  "eccentric": {
    "arti": "Eksentrik / unik dan agak aneh tapi tidak berbahaya",
    "cara_baca": "ek-sen-trik",
    "penggunaan": [
      "The eccentric artist lived in a house full of clock towers. (Seniman eksentrik itu tinggal di rumah yang penuh dengan menara jam.)"
    ],
    "catatan": "Menggambarkan kepribadian unik di luar kebiasaan orang banyak."
  },
  "elaborate": {
    "arti": "Rumit mendetail / menjelaskan sesuatu secara panjang lebar",
    "cara_baca": "ih-lab-er-it",
    "penggunaan": [
      "Could you please elaborate on your proposed marketing strategy? (Bisa tolong jelaskan lebih mendalam tentang strategi pemasaran yang kamu usulkan?)"
    ],
    "catatan": "Bisa sebagai kata sifat (mewah/detail) atau kata kerja (memperjelas)."
  },
  "elevate": {
    "arti": "Meningkatkan / mengangkat derajat, posisi, atau kualitas ke level lebih tinggi",
    "cara_baca": "el-uh-veyt",
    "penggunaan": [
      "Reading high-quality books will elevate your vocabulary and thinking. (Membaca buku bermutu akan meningkatkan kosakata dan cara berpikirmu.)"
    ],
    "catatan": "Berasal dari kata yang sama dengan elevator (lift pengangkat)."
  },
  "eligible": {
    "arti": "Memenuhi syarat / berhak mendapatkan hak atau posisi tertentu",
    "cara_baca": "el-ih-juh-bul",
    "penggunaan": [
      "Only full-time students are eligible for this scholarship. (Hanya mahasiswa reguler penuh waktu yang memenuhi syarat untuk beasiswa ini.)"
    ],
    "catatan": "Lawan katanya adalah ineligible (tidak memenuhi syarat)."
  },
  "eloquent": {
    "arti": "Fasih / pandai berbicara dengan kata-kata yang indah dan memikat",
    "cara_baca": "el-uh-kwent",
    "penggunaan": [
      "His eloquent speech inspired thousands of young entrepreneurs. (Pidatonya yang fasih dan memukau menginspirasi ribuan pengusaha muda.)"
    ],
    "catatan": "Kualitas kemampuan retorika dan berbicara di depan publik."
  },
  "elusive": {
    "arti": "Sulit ditangkap / sukar dipahami atau susah ditemukan jejaknya",
    "cara_baca": "ee-loo-siv",
    "penggunaan": [
      "Success in this competitive industry can be elusive without consistency. (Kesuksesan di industri kompetitif ini bisa sulit diraih tanpa konsistensi.)"
    ],
    "catatan": "Dipakai untuk target yang licin atau buronan yang lihai kabur."
  },
  "embark": {
    "arti": "Memulai perjalanan baru / naik ke kapal atau petualangan besar",
    "cara_baca": "em-bahrk",
    "penggunaan": [
      "She is ready to embark on a new journey as a startup founder. (Dia siap memulai perjalanan baru sebagai pendiri startup.)"
    ],
    "catatan": "Frasa andalan: 'embark on a new journey / project'."
  },
  "embrace": {
    "arti": "Merangkul / menerima perubahan atau ide baru dengan tangan terbuka",
    "cara_baca": "em-breys",
    "penggunaan": [
      "We must learn to embrace uncertainty and adapt quickly. (Kita harus belajar merangkul ketidakpastian dan beradaptasi dengan cepat.)"
    ],
    "catatan": "Bisa berarti memeluk fisik atau merangkul mindset baru."
  },
  "emerge": {
    "arti": "Muncul ke permukaan / timbul dari kegelapan atau kesulitan",
    "cara_baca": "ih-merj",
    "penggunaan": [
      "The butterfly emerged from its cocoon after several weeks. (Kupu-kupu muncul dari kepompongnya setelah beberapa minggu.)"
    ],
    "catatan": "Istilah bisnis: 'emerging markets' (pasar negara berkembang)."
  },
  "eminent": {
    "arti": "Terkemuka / sangat dihormati karena prestasi dan keahliannya",
    "cara_baca": "em-uh-nent",
    "penggunaan": [
      "The seminar will be delivered by an eminent professor from Harvard. (Seminar ini akan dibawakan oleh profesor terkemuka dari Harvard.)"
    ],
    "catatan": "Jangan tertukar dengan 'imminent' (segera terjadi)."
  },
  "empirical": {
    "arti": "Empiris / berdasarkan bukti observasi dan eksperimen nyata",
    "cara_baca": "em-peer-ih-kul",
    "penggunaan": [
      "His scientific theory is supported by strong empirical data. (Teori ilmiahnya didukung oleh data empiris yang kuat.)"
    ],
    "catatan": "Lawan dari teori spekulatif tanpa bukti data."
  },
  "emulate": {
    "arti": "Meniru dan menyamai / meneladani keberhasilan orang lain",
    "cara_baca": "em-yuh-leyt",
    "penggunaan": [
      "Young coders often try to emulate the work ethic of tech pioneers. (Programmer muda sering mencoba meneladani etos kerja perintis teknologi.)"
    ],
    "catatan": "Dalam teknologi: emulator (program peniru sistem perangkat keras)."
  },
  "endeavor": {
    "arti": "Ikhtiar keras / usaha sungguh-sungguh untuk mencapai cita-cita besar",
    "cara_baca": "en-dev-er",
    "penggunaan": [
      "We wish you the best of luck in all your future endeavors. (Kami mendoakan yang terbaik untuk semua ikhtiar masa depanmu.)"
    ],
    "catatan": "Bisa sebagai kata kerja (berikhtiar) atau kata benda (usaha mulia)."
  },
  "endorse": {
    "arti": "Mendukung resmi / mempromosikan produk atau kebijakan publik",
    "cara_baca": "en-dawrs",
    "penggunaan": [
      "The famous athlete was paid millions to endorse the new running shoes. (Atlet terkenal itu dibayar jutaan untuk mempromosikan sepatu lari baru.)"
    ],
    "catatan": "Sangat umum di dunia influencer sosmed dan politik."
  },
  "endure": {
    "arti": "Bertahan / sanggup menanggung penderitaan atau beban berat",
    "cara_baca": "en-dyoor",
    "penggunaan": [
      "He endured years of hardship before building a successful business. (Dia bertahan melewati tahun-tahun penuh kesulitan sebelum membangun bisnis yang sukses.)"
    ],
    "catatan": "Bentuk kata sifatnya adalah endurance (daya tahan tubuh/mental)."
  },
  "enhance": {
    "arti": "Meningkatkan / mempercantik mutu, keindahan, atau performa",
    "cara_baca": "en-hans",
    "penggunaan": [
      "Using good lighting will enhance the quality of your video recordings. (Menggunakan pencahayaan yang baik akan meningkatkan kualitas rekaman videomu.)"
    ],
    "catatan": "Sering dipakai dalam software: 'enhanced features' (fitur yang ditingkatkan)."
  },
  "envision": {
    "arti": "Membayangkan masa depan / memvisualisasikan visi masa depan",
    "cara_baca": "en-vizh-un",
    "penggunaan": [
      "The founder envisioned a world where education is free for everyone. (Pendiri itu membayangkan dunia di mana pendidikan gratis untuk semua orang.)"
    ],
    "catatan": "Berkaitan dengan visi jangka panjang yang futuristik."
  },
  "eradicate": {
    "arti": "Membasmi tuntas / melenyapkan penyakit atau masalah sampai ke akar-akarnya",
    "cara_baca": "ih-rad-ih-keyt",
    "penggunaan": [
      "Global vaccination programs helped eradicate deadly viruses. (Program vaksinasi global membantu membasmi virus mematikan sampai tuntas.)"
    ],
    "catatan": "Berasal dari bahasa Latin 'radix' yang artinya akar."
  },
  "escalate": {
    "arti": "Meningkat tajam / situasi yang memanas dan membesar dengan cepat",
    "cara_baca": "es-kuh-leyt",
    "penggunaan": [
      "The minor disagreement quickly escalated into a heated argument. (Perselisihan kecil itu dengan cepat memanas menjadi pertengkaran sengit.)"
    ],
    "catatan": "Berasal dari kata escalator (tangga berjalan naik)."
  },
  "exaggerate": {
    "arti": "Melebih-lebihkan / mendramatisasi cerita di luar kenyataan",
    "cara_baca": "ig-zaj-uh-reyt",
    "penggunaan": [
      "Don't exaggerate the problem; it is actually very simple to fix. (Jangan melebih-lebihkan masalahnya; itu sebenarnya sangat gampang diperbaiki.)"
    ],
    "catatan": "Sering dipakai saat orang curhat lebay."
  },
  "exemplary": {
    "arti": "Patut dicontoh / sangat teladan dan layak dijadikan panutan",
    "cara_baca": "ig-zem-pluh-ree",
    "penggunaan": [
      "Her dedication to community service was truly exemplary. (Dedikasinya pada pelayanan masyarakat benar-benar patut dicontoh.)"
    ],
    "catatan": "Pujian tertinggi untuk etos kerja dan integritas moral."
  },
  "exquisite": {
    "arti": "Sangat indah / elok dan dibuat dengan keahlian cita rasa tinggi",
    "cara_baca": "ek-skwiz-it",
    "penggunaan": [
      "The royal palace was decorated with exquisite handmade carpets. (Istana kerajaan dihiasi dengan karpet buatan tangan yang sangat elok.)"
    ],
    "catatan": "Dipakai untuk karya seni, masakan fine dining, atau perhiasan mahal."
  },

  // === F ===
  "fabricate": {
    "arti": "Membuat-buat / mereka-reka kebohongan atau memproduksi barang",
    "cara_baca": "fab-rih-keyt",
    "penggunaan": [
      "He fabricated an excuse because he forgot to do his homework. (Dia membuat-buat alasan bohong karena lupa mengerjakan PR.)"
    ],
    "catatan": "Bisa berarti memproduksi baja/konstruksi atau mengarang cerita palsu."
  },
  "facilitate": {
    "arti": "Memfasilitasi / mempermudah dan memperlancar jalannya suatu proses",
    "cara_baca": "fuh-sil-ih-teyt",
    "penggunaan": [
      "Modern project management tools facilitate smooth team communication. (Alat manajemen proyek modern mempermudah komunikasi tim yang lancar.)"
    ],
    "catatan": "Bentuk pelakunya adalah facilitator (fasilitator)."
  },
  "fascinate": {
    "arti": "Memikat hati / membuat orang sangat terpana dan penasaran",
    "cara_baca": "fas-uh-neyt",
    "penggunaan": [
      "Astronomy has always fascinated me since I was a child. (Astronomi selalu memikat hati gue sejak gue masih kecil.)"
    ],
    "catatan": "Bentuk kata sifatnya adalah fascinating (sangat memikat/menarik)."
  },
  "feasible": {
    "arti": "Layak dijalankan / masuk akal dan memungkinkan untuk dieksekusi",
    "cara_baca": "fee-zuh-bul",
    "penggunaan": [
      "We need to conduct a study to see if this business plan is feasible. (Kita perlu studi kelayakan untuk melihat apakah rencana bisnis ini memungkinkan dijalankan.)"
    ],
    "catatan": "Istilah bisnis: 'feasibility study' (studi kelayakan)."
  },
  "flourish": {
    "arti": "Berkembang pesat / tumbuh subur, makmur, dan sukses",
    "cara_baca": "fler-ish",
    "penggunaan": [
      "Local cafes flourished after the new train station opened nearby. (Kafe-kafe lokal berkembang pesat setelah stasiun kereta baru dibuka di dekatnya.)"
    ],
    "catatan": "Bisa dipakai untuk tanaman subur, bisnis maju, atau kebudayaan yang makmur."
  },
  "fluctuate": {
    "arti": "Fluktuatif / naik-turun secara tidak menentu",
    "cara_baca": "flak-choo-eyt",
    "penggunaan": [
      "Stock market prices fluctuate wildly depending on global news. (Harga pasar saham naik-turun tajam tergantung berita global.)"
    ],
    "catatan": "Sangat umum dalam grafik keuangan, harga crypto, dan suhu cuaca."
  },
  "formidable": {
    "arti": "Tangguh menakutkan / lawan hebat yang disegani karena kekuatannya",
    "cara_baca": "fawr-mid-uh-bul",
    "penggunaan": [
      "They are facing a formidable opponent in the championship finals. (Mereka menghadapi lawan yang sangat tangguh di babak final kejuaraan.)"
    ],
    "catatan": "Bukan sekadar jahat, tapi memiliki keahlian atau kekuatan yang bikin gentar."
  },
  "foster": {
    "arti": "Membina / merawat dan menumbuhkan hubungan baik atau bibit bakat",
    "cara_baca": "faws-ter",
    "penggunaan": [
      "Good teachers foster a love of reading in their students. (Guru yang baik menumbuhkan rasa cinta membaca pada murid-muridnya.)"
    ],
    "catatan": "Bisa juga: 'foster parents' (orang tua asuh)."
  },
  "fragile": {
    "arti": "Rapuh / mudah pecah atau rentan mengalami kerusakan",
    "cara_baca": "fraj-ul",
    "penggunaan": [
      "Handle the package gently because the glassware inside is fragile. (Pegang paket itu pelan-pelan karena gelas di dalamnya sangat rapuh.)"
    ],
    "catatan": "Sering tertera pada stiker paket ekspedisi barang pecah belah."
  },
  "futile": {
    "arti": "Sia-sia / percuma dan tidak ada gunanya sama sekali",
    "cara_baca": "fyoo-tayl",
    "penggunaan": [
      "All their attempts to rescue the sunken ship proved futile. (Semua usaha mereka untuk menyelamatkan kapal tenggelam itu terbukti sia-sia.)"
    ],
    "catatan": "Frasa klasik: 'resistance is futile' (perlawananmu sia-sia)."
  },

  // === G ===
  "gauge": {
    "arti": "Mengukur / menakar perkiraan situasi atau reaksi orang",
    "cara_baca": "geyj",
    "penggunaan": [
      "It is difficult to gauge the customer's satisfaction without surveys. (Sulit menakar kepuasan pelanggan tanpa adanya survei.)"
    ],
    "catatan": "Ejaannya 'gauge' tapi dibaca persis seperti kata 'gage'."
  },
  "generate": {
    "arti": "Menghasilkan / memproduksi energi, ide, atau pendapatan baru",
    "cara_baca": "jen-uh-reyt",
    "penggunaan": [
      "Solar panels generate clean electricity from sunlight. (Panel surya menghasilkan listrik bersih dari sinar matahari.)"
    ],
    "catatan": "Sering dipakai dalam istilah AI: 'generative AI' (AI penghasil konten)."
  },
  "genuine": {
    "arti": "Asli / tulus dari lubuk hati dan bukan barang tiruan",
    "cara_baca": "jen-yoo-in",
    "penggunaan": [
      "She showed genuine concern when she heard about his accident. (Dia menunjukkan kekhawatiran yang tulus saat mendengar kabar kecelakaannya.)"
    ],
    "catatan": "Bisa untuk barang asli (genuine leather) atau ketulusan sifat manusia."
  },
  "glimpse": {
    "arti": "Sekilas pandang / melihat sesuatu dengan sangat cepat",
    "cara_baca": "glimps",
    "penggunaan": [
      "I caught a glimpse of the celebrity as she stepped into her car. (Gue sempat melihat sekilas artis itu saat dia melangkah masuk ke mobilnya.)"
    ],
    "catatan": "Frasa umum: 'catch a glimpse of someone/something'."
  },
  "gloomy": {
    "arti": "Suram mendung / suasana redup yang bikin hati galau",
    "cara_baca": "gloo-mee",
    "penggunaan": [
      "The rainy weather made the afternoon feel gloomy and lazy. (Cuaca hujan membuat suasana sore terasa mendung suram dan bikin mager.)"
    ],
    "catatan": "Bisa untuk cuaca mendung gelap atau proyeksi ekonomi yang lesu."
  },
  "gratitude": {
    "arti": "Rasa syukur / ucapan terima kasih mendalam atas kebaikan",
    "cara_baca": "grat-ih-tyood",
    "penggunaan": [
      "I want to express my deepest gratitude to my parents for their support. (Gue ingin menyampaikan rasa syukur dan terima kasih terdalam kepada orang tua atas dukungannya.)"
    ],
    "catatan": "Praktik 'gratitude journal' (buku catatan harian hal-hal yang disyukuri)."
  },
  "grim": {
    "arti": "Mencekam suram / tanpa harapan dan berwajah muram",
    "cara_baca": "grim",
    "penggunaan": [
      "The doctors delivered the grim news to the patient's family. (Para dokter menyampaikan kabar suram yang berat itu kepada keluarga pasien.)"
    ],
    "catatan": "Tokoh 'Grim Reaper' (malaikat maut pencabut nyawa)."
  },

  // === H ===
  "habitat": {
    "arti": "Habitat / lingkungan alam tempat hidup asli hewan dan tumbuhan",
    "cara_baca": "hab-ih-tat",
    "penggunaan": [
      "Deforestation destroys the natural habitat of wild orangutans. (Penebangan hutan merusak habitat alami orangutan liar.)"
    ],
    "catatan": "Istilah biologi dan pelestarian lingkungan alam."
  },
  "hamper": {
    "arti": "Menghambat / merintangi pergerakan atau kemajuan proses",
    "cara_baca": "ham-per",
    "penggunaan": [
      "Heavy fog hampered the rescue team's efforts in the mountains. (Kabut tebal menghambat upaya tim penyelamat di pegunungan.)"
    ],
    "catatan": "Sebagai kata kerja artinya menghambat; sebagai kata benda artinya keranjang bingkisan (hampers lebaran)."
  },
  "hasty": {
    "arti": "Terburu-buru / gegabah mengambil keputusan tanpa dipikir matang",
    "cara_baca": "heys-tee",
    "penggunaan": [
      "Do not make a hasty decision that you might regret later. (Jangan membuat keputusan terburu-buru yang mungkin bakal kamu sesali nanti.)"
    ],
    "catatan": "Pepatah Inggris: 'Haste makes waste' (Biar lambat asal selamat / jangan gegabah)."
  },
  "hectic": {
    "arti": "Sibuk luar biasa / padat merayap penuh hiruk-pikuk aktivitas",
    "cara_baca": "hek-tik",
    "penggunaan": [
      "I had a hectic day at the office with five consecutive client meetings. (Hari gue di kantor padat dan sibuk luar biasa dengan lima rapat klien berturut-turut.)"
    ],
    "catatan": "Kosakata wajib pekerja kantoran dan mahasiswa saat minggu ujian/deadline."
  },
  "heritage": {
    "arti": "Warisan leluhur / peninggalan budaya bersejarah yang turun-temurun",
    "cara_baca": "hair-ih-tij",
    "penggunaan": [
      "Batik is an invaluable cultural heritage of Indonesia. (Batik adalah warisan budaya Indonesia yang tak ternilai harganya.)"
    ],
    "catatan": "Sering dipakai dalam UNESCO World Heritage Sites (Situs Warisan Dunia)."
  },
  "hollow": {
    "arti": "Kopong / berongga kosong di dalam atau janji hampa",
    "cara_baca": "hol-oh",
    "penggunaan": [
      "The bird made its nest inside a hollow tree trunk. (Burung itu membuat sarangnya di dalam batang pohon yang berongga kopong.)"
    ],
    "catatan": "Metafora: 'hollow victory' (kemenangan hampa yang mengorbankan banyak hal)."
  },
  "humble": {
    "arti": "Rendah hati / sederhana dan tidak suka menyombongkan diri",
    "cara_baca": "ham-bul",
    "penggunaan": [
      "Despite his billionaire status, he remains humble and down to earth. (Meskipun sudah berstatus miliarder, dia tetap rendah hati dan membumi.)"
    ],
    "catatan": "Frasa gaul internet: 'humble brag' (pamer terselubung berkedok merendah)."
  },
  "hypothesis": {
    "arti": "Hipotesis / dugaan sementara ilmiah yang harus dibuktikan lewat uji coba",
    "cara_baca": "hay-poth-uh-sis",
    "penggunaan": [
      "The laboratory experiment confirmed our initial hypothesis. (Eksperimen laboratorium membuktikan hipotesis awal kami.)"
    ],
    "catatan": "Bentuk jamaknya adalah hypotheses (dibaca 'hay-poth-uh-seez')."
  },

  // === I ===
  "ignite": {
    "arti": "Menyulut / memantik api atau membakar semangat juang",
    "cara_baca": "ig-nayt",
    "penggunaan": [
      "A single spark was enough to ignite the dry grass. (Satu percikan api sudah cukup untuk menyulut rumput kering.)"
    ],
    "catatan": "Bisa berarti menyalakan api mesin atau memantik inspirasi (ignite passion)."
  },
  "illuminate": {
    "arti": "Menerangi / menyinari ruangan atau menjelaskan konsep rumit jadi terang benderang",
    "cara_baca": "ih-loo-muh-neyt",
    "penggunaan": [
      "The full moon illuminated the entire beach at midnight. (Bulan purnama menerangi seluruh pantai di tengah malam.)"
    ],
    "catatan": "Bentuk kata sifatnya adalah illuminating (sangat mencerahkan wawasan)."
  },
  "imminent": {
    "arti": "Sudah di depan mata / bakal segera terjadi dalam waktu sangat dekat",
    "cara_baca": "im-uh-nent",
    "penggunaan": [
      "Dark storm clouds indicated that heavy rain was imminent. (Awan badai gelap menandakan bahwa hujan lebat sudah di depan mata.)"
    ],
    "catatan": "Sering dipakai untuk peringatan bahaya atau peluncuran yang sudah dekat."
  },
  "impeccable": {
    "arti": "Sempurna tanpa cela / rapi jali dan bebas dari segala kesalahan",
    "cara_baca": "im-pek-uh-bul",
    "penggunaan": [
      "She spoke English with impeccable grammar and pronunciation. (Dia berbicara bahasa Inggris dengan tata bahasa dan pelafalan yang sempurna tanpa cela.)"
    ],
    "catatan": "Pujian tertinggi untuk etika, penampilan busana, atau kualitas kerja."
  },
  "imperative": {
    "arti": "Sangat krusial / wajib mutlak dilakukan dan tidak boleh ditunda",
    "cara_baca": "im-peer-uh-tiv",
    "penggunaan": [
      "It is imperative that all bugs are fixed before the app launch. (Sangat wajib dan krusial agar semua bug diperbaiki sebelum aplikasi diluncurkan.)"
    ],
    "catatan": "Dalam tata bahasa: 'imperative sentence' (kalimat perintah)."
  },
  "implicit": {
    "arti": "Tersirat / dipahami secara tidak langsung tanpa diucapkan gamblang",
    "cara_baca": "im-plis-it",
    "penggunaan": [
      "There was an implicit trust between the two business partners. (Ada rasa saling percaya yang tersirat di antara kedua mitra bisnis itu.)"
    ],
    "catatan": "Lawan dari kata explicit (tersurat / dinyatakan secara gamblang dan terang-terangan)."
  },
  "impose": {
    "arti": "Memaksakan / memberlakukan aturan, pajak, atau beban pada orang lain",
    "cara_baca": "im-pohz",
    "penggunaan": [
      "The city government imposed strict restrictions during the pandemic. (Pemerintah kota memberlakukan pembatasan ketat selama pandemi.)"
    ],
    "catatan": "Bisa berarti memaksakan kehendak atau mengenakan sanksi."
  },
  "incentive": {
    "arti": "Insentif / bonus pendorong atau rangsangan agar orang lebih giat bekerja",
    "cara_baca": "in-sen-tiv",
    "penggunaan": [
      "The company offers cash incentives for employees who exceed their targets. (Perusahaan menawarkan insentif uang tunai bagi karyawan yang melampaui target.)"
    ],
    "catatan": "Kunci utama dalam teori ekonomi perilaku dan motivasi kerja."
  },
  "indispensable": {
    "arti": "Tak tergantikan / mutlak diperlukan dan tidak bisa hidup tanpanya",
    "cara_baca": "in-dih-spen-suh-bul",
    "penggunaan": [
      "A smartphone has become an indispensable tool in modern daily life. (Ponsel pintar telah menjadi alat yang tak tergantikan dalam kehidupan modern saat ini.)"
    ],
    "catatan": "Tingkat kepentingan tertinggi, jika hilang sistem tidak bisa jalan."
  },
  "inevitable": {
    "arti": "Pasti terjadi / tak terelakkan dan tidak bisa dicegah oleh siapa pun",
    "cara_baca": "in-ev-ih-tuh-bul",
    "penggunaan": [
      "With technological advancement, digital transformation is inevitable. (Dengan kemajuan teknologi, transformasi digital adalah hal yang tak terelakkan.)"
    ],
    "catatan": "Kutipan terkenal Thanos di Avengers: 'I am inevitable'."
  },
  "ingenious": {
    "arti": "Jenius cerdik / ide yang sangat kreatif dan pintar memecahkan masalah",
    "cara_baca": "in-jeen-yus",
    "penggunaan": [
      "She came up with an ingenious solution to reduce plastic waste. (Dia menemukan solusi cerdik dan jenius untuk mengurangi sampah plastik.)"
    ],
    "catatan": "Perhatikan ejaannya: ingenious (cerdik), bukan ingenuous (polos/lugu)."
  },
  "inherent": {
    "arti": "Melekat alami / sifat bawaan yang sudah ada sejak awal dan tak terpisahkan",
    "cara_baca": "in-heer-unt",
    "penggunaan": [
      "Risk is an inherent part of any financial investment. (Risiko adalah bagian bawaan yang melekat pada setiap investasi keuangan.)"
    ],
    "catatan": "Dipakai untuk sifat dasar yang tidak bisa dipisahkan dari suatu hal."
  },
  "innovate": {
    "arti": "Berinovasi / menciptakan pembaruan dan terobosan mutakhir",
    "cara_baca": "in-uh-veyt",
    "penggunaan": [
      "Companies must constantly innovate to survive in the digital era. (Perusahaan harus terus berinovasi agar bisa bertahan di era digital.)"
    ],
    "catatan": "Bentuk kata bendanya adalah innovation (inovasi)."
  },
  "insight": {
    "arti": "Wawasan mendalam / pemahaman tajam terhadap inti permasalahan",
    "cara_baca": "in-sayt",
    "penggunaan": [
      "The mentor provided valuable insights into launching a tech startup. (Mentor itu memberikan wawasan mendalam yang sangat berharga tentang merintis startup.)"
    ],
    "catatan": "Sering dipakai dalam dunia data analisis: 'actionable insights'."
  },
  "intact": {
    "arti": "Utuh / masih lengkap dan tidak rusak sedikit pun setelah melewati insiden",
    "cara_baca": "in-takt",
    "penggunaan": [
      "Miraculously, the ancient artifact remained intact after the earthquake. (Secara ajaib, artefak kuno itu tetap utuh tanpa lecet pasca gempa bumi.)"
    ],
    "catatan": "Dipakai saat sesuatu selamat tanpa cacat dari musibah."
  },
  "integrate": {
    "arti": "Mengintegrasikan / menggabungkan berbagai komponen jadi satu kesatuan padu",
    "cara_baca": "in-tuh-greyt",
    "penggunaan": [
      "We need to integrate the payment gateway into our mobile app. (Kita perlu mengintegrasikan sistem pembayaran ke dalam aplikasi mobile kita.)"
    ],
    "catatan": "Istilah wajib dalam dunia software engineering dan API."
  },
  "integrity": {
    "arti": "Integritas / kejujuran teguh dan konsistensi moral yang kokoh",
    "cara_baca": "in-teg-ruh-tee",
    "penggunaan": [
      "A leader with high integrity always does the right thing even when no one is watching. (Pemimpin berintegritas tinggi selalu melakukan hal yang benar bahkan saat tidak ada yang melihat.)"
    ],
    "catatan": "Karakter nomor satu yang dicari perusahaan profesional."
  },
  "intricate": {
    "arti": "Rumit berbelit-belit / memiliki banyak detail yang sangat halus dan kompleks",
    "cara_baca": "in-trih-kit",
    "penggunaan": [
      "The traditional wood carving features intricate floral patterns. (Ukiran kayu tradisional itu menampilkan pola bunga yang sangat rumit dan mendetail.)"
    ],
    "catatan": "Dipakai untuk arsitektur, pola batik, atau algoritma rumit."
  },
  "intrigue": {
    "arti": "Membuat sangat penasaran / intrik atau tipu muslihat tersembunyi",
    "cara_baca": "in-treeg",
    "penggunaan": [
      "The mysterious detective novel completely intrigued me. (Novel misteri detektif itu benar-benar membuat gue sangat penasaran.)"
    ],
    "catatan": "Bentuk kata sifatnya adalah intriguing (sangat menarik rasa ingin tahu)."
  },
  "intuition": {
    "arti": "Intuisi / bisikan hati atau firasat naluriah tanpa perlu analisa panjang",
    "cara_baca": "in-too-ish-un",
    "penggunaan": [
      "Trust your intuition when making tough decisions under pressure. (Percayalah pada intuisimu saat mengambil keputusan sulit di bawah tekanan.)"
    ],
    "catatan": "Frasa sehari-hari: 'gut feeling' (perasaan dari dalam lubuk hati)."
  },
  "invaluable": {
    "arti": "Sangat berharga / saking bernilainya sampai tak ternilai dengan uang",
    "cara_baca": "in-val-yoo-uh-bul",
    "penggunaan": [
      "Her advice was invaluable during our company's difficult transition. (Nasihatnya sangat berharga tak ternilai selama masa transisi sulit perusahaan kami.)"
    ],
    "catatan": "Ingat: 'invaluable' BUKAN berarti tidak berharga, melainkan SANGAT BERHARGA."
  },
  "isolate": {
    "arti": "Mengisolasi / memisahkan atau mengasingkan dari keramaian",
    "cara_baca": "ay-suh-leyt",
    "penggunaan": [
      "Patients with infectious diseases must be isolated in special wards. (Pasien dengan penyakit menular harus diisolasi di bangsal khusus.)"
    ],
    "catatan": "Bisa berarti karantina kesehatan atau mengisolasi variabel dalam eksperimen."
  },

  // === J ===
  "jeopardize": {
    "arti": "Membahayakan / mempertaruhkan keselamatan atau kelangsungan sesuatu",
    "cara_baca": "jep-er-dayz",
    "penggunaan": [
      "One careless mistake could jeopardize the entire space mission. (Satu kesalahan ceroboh bisa membahayakan seluruh misi luar angkasa.)"
    ],
    "catatan": "Bentuk kata bendanya adalah jeopardy (bahaya besar)."
  },
  "judicious": {
    "arti": "Bijaksana / cermat dan penuh pertimbangan akal sehat",
    "cara_baca": "joo-dish-us",
    "penggunaan": [
      "A judicious use of company funds ensures long-term business stability. (Penggunaan dana perusahaan secara bijaksana menjamin stabilitas bisnis jangka panjang.)"
    ],
    "catatan": "Berasal dari akar kata judge (menilai dengan adil)."
  },
  "juggle": {
    "arti": "Menyeimbangkan banyak hal / multitasking mengurus banyak tugas sekaligus",
    "cara_baca": "jag-ul",
    "penggunaan": [
      "It is challenging to juggle a full-time job and master's degree studies. (Cukup menantang untuk menyeimbangkan pekerjaan penuh waktu sambil kuliah S2.)"
    ],
    "catatan": "Berasal dari aksi pemain sirkus melempar-tangkap banyak bola."
  },
  "junction": {
    "arti": "Persimpangan / titik pertemuan dua jalan atau rel kereta",
    "cara_baca": "jank-shun",
    "penggunaan": [
      "Turn left at the next highway junction. (Belok kiri di persimpangan jalan tol berikutnya.)"
    ],
    "catatan": "Bisa persimpangan jalan fisik atau pertemuan kabel listrik."
  },
  "justify": {
    "arti": "Menjustifikasi / memberikan alasan kuat dan pembenaran yang sah",
    "cara_baca": "jus-tih-fay",
    "penggunaan": [
      "You cannot justify being rude to innocent people. (Kamu tidak bisa membenarkan sikap kasar kepada orang yang tidak bersalah.)"
    ],
    "catatan": "Dalam format teks: 'justify text' (rata kanan-kiri)."
  },
  "juxtapose": {
    "arti": "Menjajarkan dua hal kontras / membandingkan sisi berbeda berdampingan",
    "cara_baca": "juk-stuh-pohz",
    "penggunaan": [
      "The exhibition juxtaposed modern digital art with classical Renaissance paintings. (Pameran itu menjajarkan seni digital modern dengan lukisan klasik era Renaisans.)"
    ],
    "catatan": "Istilah seni dan literatur untuk menonjolkan efek kontras."
  },

  // === K ===
  "keen": {
    "arti": "Sangat tajam / antusias tinggi dan memiliki minat mendalam",
    "cara_baca": "keen",
    "penggunaan": [
      "She has a keen eye for finding bugs in complex source code. (Dia punya mata yang sangat jeli dan tajam dalam menemukan bug di kode rumit.)"
    ],
    "catatan": "Frasa umum: 'keen on learning' (sangat berminat belajar)."
  },
  "kindle": {
    "arti": "Menyalakan api / membangkitkan kembali semangat dan inspirasi",
    "cara_baca": "kin-dul",
    "penggunaan": [
      "His inspiring TED talk kindled my passion for environmental science. (Ceramah TED-nya yang inspiratif membangkitkan kembali semangat gue pada ilmu lingkungan.)"
    ],
    "catatan": "Juga menjadi nama perangkat e-reader populer buatan Amazon."
  },
  "kinetic": {
    "arti": "Kinetik / berhubungan dengan energi gerak dinamis",
    "cara_baca": "kih-net-ik",
    "penggunaan": [
      "A moving roller coaster possesses enormous kinetic energy. (Roller coaster yang meluncur kencang memiliki energi kinetik yang sangat besar.)"
    ],
    "catatan": "Istilah fisika: 'kinetic energy' (energi kinetik gerak)."
  },
  "knack": {
    "arti": "Bakat alami / keahlian lihai dalam melakukan trik tertentu dengan mudah",
    "cara_baca": "nak",
    "penggunaan": [
      "He has a natural knack for negotiating the best prices. (Dia punya bakat alami yang lihai dalam menawar harga terbaik.)"
    ],
    "catatan": "Huruf 'k' di awal kata tidak dibaca (silent 'k')."
  },
  "kudos": {
    "arti": "Pujian kehormatan / selamat dan apresiasi tinggi atas pencapaian hebat",
    "cara_baca": "koo-dohz",
    "penggunaan": [
      "Kudos to the engineering team for launching the update on time! (Salut dan selamat kepada tim insinyur yang berhasil meluncurkan update tepat waktu!)"
    ],
    "catatan": "Berasal dari bahasa Yunani kuno yang berarti kemuliaan/kejayaan."
  },

  // === L ===
  "lavish": {
    "arti": "Mewah berlimpah / royal dan jor-joran mengeluarkan biaya",
    "cara_baca": "lav-ish",
    "penggunaan": [
      "The celebrity hosted a lavish wedding party at a five-star resort. (Selebriti itu menggelar pesta pernikahan mewah berlimpah di resor bintang lima.)"
    ],
    "catatan": "Bisa untuk pesta mewah (lavish party) atau pujian melimpah (lavish praise)."
  },
  "legacy": {
    "arti": "Warisan peninggalan / jejak pengaruh besar yang ditinggalkan untuk generasi masa depan",
    "cara_baca": "leg-uh-see",
    "penggunaan": [
      "Nelson Mandela left a timeless legacy of peace and equality. (Nelson Mandela meninggalkan warisan abadi tentang perdamaian dan kesetaraan.)"
    ],
    "catatan": "Dalam koding: 'legacy code' (kode lama yang masih dipakai)."
  },
  "legitimate": {
    "arti": "Sah / legal dan sesuai dengan hukum atau aturan yang berlaku",
    "cara_baca": "luh-jit-uh-mit",
    "penggunaan": [
      "Always ensure you buy software licenses from legitimate vendors. (Selalu pastikan kamu membeli lisensi perangkat lunak dari penjual yang sah.)"
    ],
    "catatan": "Slang gaul sering menyingkatnya jadi 'legit' (beneran mantap/asli)."
  },
  "lenient": {
    "arti": "Penyayang longgar / tidak galak dan suka memberi pengampunan atau toleransi",
    "cara_baca": "leen-yunt",
    "penggunaan": [
      "The judge was surprisingly lenient with the first-time offender. (Hakim secara mengejutkan cukup berbelas kasih dan longgar kepada pelanggar pemula itu.)"
    ],
    "catatan": "Lawan dari kata strict (ketat/galak)."
  },
  "leverage": {
    "arti": "Memanfaatkan peluang / menggunakan daya ungkit modal atau kelebihan diri",
    "cara_baca": "lev-er-ij",
    "penggunaan": [
      "You should leverage your networking skills to find better career opportunities. (Kamu harus memanfaatkan keahlian relasimu untuk mencari peluang karir yang lebih baik.)"
    ],
    "catatan": "Kosakata emas dunia startup, investasi, dan strategi bisnis."
  },
  "linger": {
    "arti": "Berlama-lama / tidak mau pergi atau aroma/kenangan yang membekas lama",
    "cara_baca": "ling-ger",
    "penggunaan": [
      "The sweet scent of coffee lingered in the room all morning. (Aroma manis kopi membekas wangi di dalam ruangan sepanjang pagi.)"
    ],
    "catatan": "Sering dipakai untuk rasa rindu atau aroma parfum yang tahan lama."
  },
  "lucid": {
    "arti": "Sangat jernih / berpikir terang benderang atau mimpi sadar",
    "cara_baca": "loo-sid",
    "penggunaan": [
      "The professor gave a lucid explanation of quantum physics. (Profesor itu memberikan penjelasan yang sangat jernih dan mudah dipahami tentang fisika kuantum.)"
    ],
    "catatan": "Fenomena psikologi: 'lucid dream' (kondisi sadar saat sedang bermimpi)."
  },
  "lucrative": {
    "arti": "Sangat menguntungkan / mendatangkan cuan dan profit besar",
    "cara_baca": "loo-kruh-tiv",
    "penggunaan": [
      "Software engineering remains one of the most lucrative careers in the world. (Rekayasa perangkat lunak tetap menjadi salah satu karir paling menguntungkan di dunia.)"
    ],
    "catatan": "Dipakai untuk peluang bisnis atau kontrak kerja bernilai tinggi."
  },
  "luminous": {
    "arti": "Bercahaya terang / memancarkan pendar sinar di tengah kegelapan",
    "cara_baca": "loo-muh-nus",
    "penggunaan": [
      "The watch has luminous hands so you can read the time in the dark. (Jam tangan itu memiliki jarum yang bercahaya sehingga kamu bisa melihat waktu di tempat gelap.)"
    ],
    "catatan": "Berkaitan dengan benda yang memancarkan kilau pendar cahaya (glow)."
  },

  // === M ===
  "magnificent": {
    "arti": "Megah luar biasa / sangat agung, indah, dan menakjubkan",
    "cara_baca": "mag-nif-ih-sunt",
    "penggunaan": [
      "We enjoyed the magnificent view of Mount Fuji at sunrise. (Kami menikmati pemandangan Gunung Fuji yang megah luar biasa saat matahari terbit.)"
    ],
    "catatan": "Pujian untuk keindahan panorama alam atau arsitektur istana megah."
  },
  "magnitude": {
    "arti": "Skala besaran / tingkat keparahan atau kekuatan gempa bumi",
    "cara_baca": "mag-nih-tyood",
    "penggunaan": [
      "They did not realize the true magnitude of the financial crisis. (Mereka tidak menyadari skala besaran sebenarnya dari krisis keuangan tersebut.)"
    ],
    "catatan": "Satuan kekuatan gempa (magnitude) atau besarnya skala dampak."
  },
  "mandatory": {
    "arti": "Wajib mutlak / diharuskan oleh hukum atau peraturan resmi",
    "cara_baca": "man-duh-tawr-ee",
    "penggunaan": [
      "Wearing a helmet is mandatory for all motorcycle riders. (Memakai helm adalah hal yang wajib mutlak bagi semua pengendara motor.)"
    ],
    "catatan": "Lawan dari kata optional (pilihan sukarela)."
  },
  "manifest": {
    "arti": "Mewujudkan nyata / tampak jelas kelihatan di depan mata",
    "cara_baca": "man-ih-fest",
    "penggunaan": [
      "His deep stress began to manifest as physical headaches. (Stres beratnya mulai berwujud nyata sebagai sakit kepala fisik.)"
    ],
    "catatan": "Tren Gen Z: 'manifesting your dreams' (mewujudkan mimpi jadi kenyataan)."
  },
  "manipulate": {
    "arti": "Memanipulasi / mengendalikan pikiran orang atau data demi keuntungan pribadi",
    "cara_baca": "muh-nip-yuh-leyt",
    "penggunaan": [
      "Do not let toxic friends manipulate your emotions. (Jangan biarkan teman toxic memanipulasi perasaan dan emosimu.)"
    ],
    "catatan": "Bisa manipulasi data statistik atau manipulasi psikologis (gaslighting)."
  },
  "masterpiece": {
    "arti": "Mahakarya / karya seni terbaik dan paling agung sepanjang masa",
    "cara_baca": "mas-ter-pees",
    "penggunaan": [
      "Leonardo da Vinci's Mona Lisa is widely regarded as a masterpiece. (Mona Lisa karya Leonardo da Vinci secara luas dianggap sebagai sebuah mahakarya.)"
    ],
    "catatan": "Puncak pencapaian tertinggi seorang seniman atau kreator."
  },
  "mediocre": {
    "arti": "Biasa-biasa saja / pas-pasan dan tidak ada yang istimewa",
    "cara_baca": "mee-dee-oh-ker",
    "penggunaan": [
      "The food was mediocre considering the expensive price they charged. (Makanannya biasa-biasa aja jika melihat harga mahal yang mereka patok.)"
    ],
    "catatan": "Kualitas standar tengah yang cenderung mengecewakan."
  },
  "melancholy": {
    "arti": "Melankolis / rasa sedih puitis yang hening dan mendalam",
    "cara_baca": "mel-un-kol-ee",
    "penggunaan": [
      "Listening to acoustic songs on a rainy night brings a sweet sense of melancholy. (Mendengarkan lagu akustik pas hujan malam membawa rasa melankolis yang syahdu.)"
    ],
    "catatan": "Kesedihan bernuansa estetis, sering jadi tema puisi dan musik indie."
  },
  "meticulous": {
    "arti": "Sangat teliti / cermat hingga detail terkecil tanpa ada yang terlewat",
    "cara_baca": "muh-tik-yuh-lus",
    "penggunaan": [
      "The watchmaker worked with meticulous precision on the tiny gears. (Pembuat jam tangan itu bekerja dengan ketelitian sangat cermat pada roda gigi kecilnya.)"
    ],
    "catatan": "Karakter orang yang perfeksionis dan sangat teliti pada kerapian."
  },
  "mitigate": {
    "arti": "Memitigasi / mengurangi tingkat keparahan risiko atau dampak buruk",
    "cara_baca": "mit-ih-geyt",
    "penggunaan": [
      "Planting mangrove trees along the coast helps mitigate flood risks. (Menanam pohon bakau di sepanjang pantai membantu memitigasi risiko banjir.)"
    ],
    "catatan": "Istilah standar dalam 'risk management' (manajemen risiko)."
  },
  "momentum": {
    "arti": "Momentum / daya dorong percepatan maju yang sedang kuat-kuatnya",
    "cara_baca": "moh-men-tum",
    "penggunaan": [
      "The team gained strong momentum after scoring their first victory. (Tim mendapatkan momentum dorongan kuat setelah mencetak kemenangan pertama mereka.)"
    ],
    "catatan": "Frasa umum: 'keep the momentum going' (jaga ritme dan semangatnya)."
  },
  "mundane": {
    "arti": "Monoton membosankan / urusan duniawi rutin sehari-hari yang biasa saja",
    "cara_baca": "mun-deyn",
    "penggunaan": [
      "Doing laundry and washing dishes are mundane daily chores. (Mencuci baju dan mencuci piring adalah pekerjaan rumah tangga harian yang monoton.)"
    ],
    "catatan": "Lawan dari hal-hal yang magis, seru, atau luar biasa."
  },
  "mutual": {
    "arti": "Saling menguntungkan / timbal balik yang disepakati kedua belah pihak",
    "cara_baca": "myoo-choo-ul",
    "penggunaan": [
      "Healthy relationships are always built on mutual respect and honesty. (Hubungan yang sehat selalu dibangun atas dasar saling menghargai dan kejujuran timbal balik.)"
    ],
    "catatan": "Istilah sosmed: 'mutual friends' (teman bersama / kenalan satu circle)."
  },

  // === N ===
  "naive": {
    "arti": "Naif / terlalu polos dan mudah percaya sehingga gampang dibohongi",
    "cara_baca": "nah-eev",
    "penggunaan": [
      "It was naive of him to believe that he could get rich overnight without effort. (Terlalu naif baginya percaya bisa kaya mendadak dalam semalam tanpa kerja keras.)"
    ],
    "catatan": "Kepolosan yang timbul akibat kurangnya pengalaman hidup."
  },
  "narrative": {
    "arti": "Narasi / alur cerita atau sudut pandang penyampaian peristiwa",
    "cara_baca": "nar-uh-tiv",
    "penggunaan": [
      "The documentary presented a compelling narrative about climate change. (Film dokumenter itu menyajikan narasi cerita yang sangat memikat tentang perubahan iklim.)"
    ],
    "catatan": "Bisa berarti karya fiksi atau narasi opini publik di media."
  },
  "nascent": {
    "arti": "Baru lahir / baru mulai berkembang dan punya potensi masa depan cerah",
    "cara_baca": "nas-unt",
    "penggunaan": [
      "The nascent space tourism industry is attracting massive venture investments. (Industri pariwisata luar angkasa yang baru lahir ini menarik investasi modal ventura yang masif.)"
    ],
    "catatan": "Dipakai untuk teknologi perintis atau tren baru yang baru bertunas."
  },
  "navigate": {
    "arti": "Menavigasi / mengarungi jalan atau memandu arah melewati rintangan",
    "cara_baca": "nav-ih-geyt",
    "penggunaan": [
      "The captain skillfully navigated the ship through the stormy sea. (Kapten dengan lihai menavigasi kapal melewati lautan badai.)"
    ],
    "catatan": "Bisa untuk mengemudi kendaraan atau menavigasi karir di dunia kerja."
  },
  "neglect": {
    "arti": "Menelantarkan / mengabaikan kewajiban dan membiarkan terbengkalai",
    "cara_baca": "nih-glekt",
    "penggunaan": [
      "Do not neglect your physical health while chasing your career goals. (Jangan menelantarkan kesehatan fisikmu saat mengejar impian karirmu.)"
    ],
    "catatan": "Kelalaian yang menimbulkan kerusakan pada hal yang diabaikan."
  },
  "neutral": {
    "arti": "Netral / tidak memihak ke kubu mana pun dalam perselisihan",
    "cara_baca": "nyoo-trul",
    "penggunaan": [
      "Switzerland remained neutral during international conflicts. (Swiss tetap bersikap netral selama konflik internasional.)"
    ],
    "catatan": "Bisa posisi politik, warna netral (putih/abu), atau gigi transmisi mobil (N)."
  },
  "nimble": {
    "arti": "Lincah gesit / cepat bergerak dan tangkas beradaptasi",
    "cara_baca": "nim-bul",
    "penggunaan": [
      "Startups are often nimble and can pivot much faster than huge corporations. (Startup seringkali lincah dan bisa mengubah haluan jauh lebih cepat daripada korporasi raksasa.)"
    ],
    "catatan": "Kelincahan fisik (tubuh pesenam) atau kelincahan berpikir (mental agility)."
  },
  "noble": {
    "arti": "Mulia luhur / memiliki budi pekerti tinggi atau keturunan bangsawan",
    "cara_baca": "noh-bul",
    "penggunaan": [
      "Dedication to teaching in remote villages is a truly noble profession. (Dedikasi mengajar di pelosok desa adalah profesi yang sungguh mulia.)"
    ],
    "catatan": "Bisa untuk sifat terpuji (noble deed) atau gas mulia kimia (noble gas)."
  },
  "notorious": {
    "arti": "Tersohor karena keburukannya / terkenal punya reputasi jahat",
    "cara_baca": "noh-tawr-ee-us",
    "penggunaan": [
      "The intersection is notorious for frequent motorcycle accidents. (Persimpangan jalan itu terkenal buruk karena sering terjadi kecelakaan motor.)"
    ],
    "catatan": "Bedakan: 'famous' (terkenal positif), 'notorious' (terkenal negatif/buruk)."
  },
  "nuance": {
    "arti": "Nuansa / perbedaan makna atau rasa yang sangat halus dan tersirat",
    "cara_baca": "nyoo-ahns",
    "penggunaan": [
      "A great translator understands the cultural nuances of every single phrase. (Penerjemah hebat memahami nuansa budaya yang halus di setiap frasa.)"
    ],
    "catatan": "Perbedaan kecil yang membedakan kualitas amatir dan profesional."
  },
  "nurture": {
    "arti": "Mengasuh dan merawat / membina bibit bakat dengan penuh kasih sayang",
    "cara_baca": "ner-cher",
    "penggunaan": [
      "Parents and teachers should nurture children's natural curiosity. (Orang tua dan guru harus merawat dan menumbuhkan rasa ingin tahu alami anak-anak.)"
    ],
    "catatan": "Perdebatan klasik psikologi: 'nature vs nurture' (bawaan lahir vs pola asuh)."
  },

  // === O ===
  "oblivious": {
    "arti": "Tidak sadar sama sekali / cuek bebek dan tidak tahu apa yang sedang terjadi di sekitarnya",
    "cara_baca": "uh-bliv-ee-us",
    "penggunaan": [
      "He was so absorbed in his smartphone that he was completely oblivious to the rain outside. (Dia saking asyiknya main HP sampai sama sekali gak sadar kalau di luar lagi hujan lebat.)"
    ],
    "catatan": "Dipakai saat seseorang tidak peka terhadap situasi genting di sekitarnya."
  },
  "obscure": {
    "arti": "Samar tidak terkenal / rumit dan sulit dipahami orang awam",
    "cara_baca": "ub-skyoor",
    "penggunaan": [
      "The musician likes to sample sounds from obscure vintage records. (Musisi itu suka mengambil sampel suara dari piringan hitam lawas yang jarang diketahui orang.)"
    ],
    "catatan": "Bisa berarti terpencil/tidak terkenal atau mengaburkan fakta."
  },
  "obsolete": {
    "arti": "Ketinggalan zaman / usang dan sudah tidak terpakai lagi karena tergantikan teknologi baru",
    "cara_baca": "ob-suh-leet",
    "penggunaan": [
      "Floppy disks became obsolete after flash drives were invented. (Disket menjadi usang dan punah setelah flashdisk ditemukan.)"
    ],
    "catatan": "Istilah teknologi untuk perangkat atau sistem yang sudah kadaluwarsa."
  },
  "obstacle": {
    "arti": "Rintangan / halangan yang menghadang di tengah jalan",
    "cara_baca": "ob-stuh-kul",
    "penggunaan": [
      "Fear of failure is the biggest obstacle to achieving your dreams. (Rasa takut gagal adalah rintangan terbesar dalam meraih mimpimu.)"
    ],
    "catatan": "Sering dipakai dalam motivasi: 'overcome obstacles' (menaklukkan rintangan)."
  },
  "ominous": {
    "arti": "Pertanda buruk / firasat mencekam bahwa musibah akan segera tiba",
    "cara_baca": "om-uh-nus",
    "penggunaan": [
      "The deep sound of thunder in the dark sky sounded ominous. (Suara gemuruh petir di langit gelap terdengar sebagai firasat yang mencekam.)"
    ],
    "catatan": "Berasal dari kata omen (pertanda gaib)."
  },
  "opaque": {
    "arti": "Buram tidak tembus pandang / rumit dan tidak transparan",
    "cara_baca": "oh-peyk",
    "penggunaan": [
      "The frosted glass door is completely opaque to ensure bathroom privacy. (Pintu kaca buram itu tidak tembus pandang untuk memastikan privasi kamar mandi.)"
    ],
    "catatan": "Lawan dari transparent (tembus pandang / transparan)."
  },
  "opportune": {
    "arti": "Tepat pada waktunya / momen emas yang paling pas untuk bertindak",
    "cara_baca": "op-er-tyoon",
    "penggunaan": [
      "He waited for an opportune moment to ask his boss for a salary raise. (Dia menunggu momen yang paling tepat untuk meminta kenaikan gaji ke bosnya.)"
    ],
    "catatan": "Bentuk kata bendanya adalah opportunity (peluang/kesempatan emas)."
  },
  "optimistic": {
    "arti": "Optimistis / berpandangan positif dan yakin masa depan akan cerah",
    "cara_baca": "op-tuh-mis-tik",
    "penggunaan": [
      "Despite the economic crisis, the young founders remained optimistic about their growth. (Meski ada krisis ekonomi, para pendiri muda itu tetap optimistis tentang pertumbuhan bisnis mereka.)"
    ],
    "catatan": "Lawan dari kata pessimistic (pesimistis / memandang suram)."
  },
  "opulent": {
    "arti": "Mewah gemerlap / serba bergelimang harta dan kemegahan ningrat",
    "cara_baca": "op-yoo-lunt",
    "penggunaan": [
      "The sultan's dining hall was furnished with opulent gold chandeliers. (Ruang makan sultan dihiasi dengan lampu kristal emas yang serba mewah gemerlap.)"
    ],
    "catatan": "Menunjukkan kemewahan tingkat tinggi para bangsawan dan konglomerat."
  },
  "orthodox": {
    "arti": "Ortodoks / konvensional memegang teguh ajaran atau tradisi lama yang murni",
    "cara_baca": "awr-thuh-doks",
    "penggunaan": [
      "He prefers orthodox medical treatments over experimental therapies. (Dia lebih memilih pengobatan medis konvensional daripada terapi eksperimental.)"
    ],
    "catatan": "Lawan katanya adalah unorthodox (tidak konvensional / nyeleneh)."
  },
  "outrageous": {
    "arti": "Keterlaluan / di luar batas akal sehat dan bikin geram",
    "cara_baca": "owt-rey-jus",
    "penggunaan": [
      "Charging ten dollars for a bottle of mineral water is simply outrageous! (Menagih sepuluh dolar untuk sebotol air mineral itu benar-benar keterlaluan!)"
    ],
    "catatan": "Dipakai saat harga terlalu mahal atau tindakan orang kelewatan batas."
  },
  "outspoken": {
    "arti": "Vokal blak-blakan / berani menyuarakan pendapat secara jujur dan lugas",
    "cara_baca": "owt-spoh-kun",
    "penggunaan": [
      "She is an outspoken critic of government corruption. (Dia adalah seorang kritikus vokal yang blak-blakan menentang korupsi pemerintah.)"
    ],
    "catatan": "Sifat orang yang berani bicara apa adanya tanpa takut diintimidasi."
  },

  // === P ===
  "palpable": {
    "arti": "Sangat terasa nyata / ketegangan atau atmosfer yang saking pekatnya seolah bisa disentuh",
    "cara_baca": "pal-puh-bul",
    "penggunaan": [
      "The tension in the courtroom was palpable before the verdict was announced. (Ketegangan di ruang sidang terasa sangat nyata sebelum vonis dibacakan.)"
    ],
    "catatan": "Frasa umum: 'palpable tension / palpable excitement'."
  },
  "paramount": {
    "arti": "Teramat penting / prioritas tertinggi di atas segalanya",
    "cara_baca": "par-uh-mownt",
    "penggunaan": [
      "Passenger safety is of paramount importance to the airline. (Keselamatan penumpang adalah hal yang teramat penting nomor satu bagi maskapai penerbangan.)"
    ],
    "catatan": "Juga menjadi nama studio film legendaris Hollywood (Paramount Pictures)."
  },
  "peculiar": {
    "arti": "Aneh ganjil / punya kebiasaan atau karakteristik yang khas dan unik",
    "cara_baca": "pih-kyool-yer",
    "penggunaan": [
      "There was a peculiar smell coming from the abandoned laboratory. (Ada bau aneh yang ganjil tercium dari laboratorium terbengkalai itu.)"
    ],
    "catatan": "Bisa berarti aneh mencurigakan atau ciri khas khusus daerah tertentu."
  },
  "perceive": {
    "arti": "Mempersepsikan / menangkap dan mengartikan sesuatu melalui sudut pandang pikiran",
    "cara_baca": "per-seev",
    "penggunaan": [
      "How people perceive your brand determines your business success. (Bagaimana orang mempersepsikan brand produkmu menentukan kesuksesan bisnismu.)"
    ],
    "catatan": "Bentuk kata bendanya adalah perception (persepsi sudut pandang)."
  },
  "peril": {
    "arti": "Bahaya maut / ancaman malapetaka besar yang mengancam nyawa",
    "cara_baca": "pair-ul",
    "penggunaan": [
      "The brave firefighters put their lives in peril to rescue the trapped family. (Petugas pemadam kebakaran yang berani mempertaruhkan nyawa mereka dalam bahaya maut demi menyelamatkan keluarga yang terjebak.)"
    ],
    "catatan": "Bentuk kata sifatnya adalah perilous (sangat berbahaya)."
  },
  "permanent": {
    "arti": "Permanen / abadi dan bertahan selamanya tanpa berubah",
    "cara_baca": "per-muh-nunt",
    "penggunaan": [
      "Think carefully before getting a tattoo; it is a permanent mark on your skin. (Pikirkan matang-matang sebelum bikin tato; itu adalah tanda permanen di kulitmu.)"
    ],
    "catatan": "Lawan dari kata temporary (sementara)."
  },
  "permeate": {
    "arti": "Meresap menembus / menyebar ke seluruh penjuru ruangan atau masyarakat",
    "cara_baca": "per-mee-eyt",
    "penggunaan": [
      "The smell of freshly baked bread permeated the entire bakery. (Aroma roti yang baru matang meresap wangi ke seluruh sudut toko roti.)"
    ],
    "catatan": "Bisa meresap secara fisik (cairan/bau) atau meresap ke budaya."
  },
  "persevere": {
    "arti": "Pantang menyerah / gigih berjuang terus meski menghadapi rintangan bertubi-tubi",
    "cara_baca": "per-suh-veer",
    "penggunaan": [
      "If you persevere through hard times, you will eventually succeed. (Jika kamu gigih pantang menyerah melewati masa-masa sulit, kamu pasti akan berhasil.)"
    ],
    "catatan": "Bentuk kata bendanya adalah perseverance (kegigihan pantang menyerah)."
  },
  "pessimistic": {
    "arti": "Pesimistis / selalu memandang suram dan cenderung menduga hal terburuk",
    "cara_baca": "pes-uh-mis-tik",
    "penggunaan": [
      "Don't be so pessimistic before we even try! (Jangan terlalu pesimistis dulu sebelum kita mencoba!)"
    ],
    "catatan": "Kecenderungan psikologis melihat gelas 'setengah kosong'."
  },
  "pivotal": {
    "arti": "Titik balik penentu / momen kunci yang mengubah arah masa depan",
    "cara_baca": "piv-uh-tul",
    "penggunaan": [
      "Graduating from college was a pivotal moment in her personal life. (Lulus dari bangku kuliah adalah momen titik balik penentu dalam kehidupan pribadinya.)"
    ],
    "catatan": "Frasa umum: 'a pivotal role / a pivotal moment'."
  },
  "plausible": {
    "arti": "Masuk akal / terdengar logis dan sangat masuk dalam nalar",
    "cara_baca": "plaw-zuh-bul",
    "penggunaan": [
      "His explanation for being late sounded perfectly plausible. (Alasannya terlambat terdengar sangat masuk akal dan bisa diterima.)"
    ],
    "catatan": "Lawan katanya adalah implausible (tidak masuk akal / mengada-ada)."
  },
  "ponder": {
    "arti": "Merenungkan / memikirkan sesuatu dalam-dalam dengan tenang",
    "cara_baca": "pon-der",
    "penggunaan": [
      "He sat by the lake, pondering the meaning of life. (Dia duduk di tepi danau, merenungkan makna kehidupan dengan tenang.)"
    ],
    "catatan": "Proses kontemplasi pemikiran yang tidak tergesa-gesa."
  },
  "pragmatic": {
    "arti": "Pragmatis / fokus pada solusi praktis nyata daripada sekadar teori muluk-muluk",
    "cara_baca": "prag-mat-ik",
    "penggunaan": [
      "We need a pragmatic approach to fix the budget deficit immediately. (Kita butuh pendekatan pragmatis yang nyata untuk segera menambal defisit anggaran.)"
    ],
    "catatan": "Pola pikir berorientasi hasil yang bisa langsung diterapkan."
  },
  "precious": {
    "arti": "Sangat berharga / bernilai tinggi dan disayangi sepenuh hati",
    "cara_baca": "presh-us",
    "penggunaan": [
      "Time spent with beloved family is truly precious. (Waktu yang dihabiskan bersama keluarga tercinta sungguh sangat berharga.)"
    ],
    "catatan": "Bisa untuk batu permata mulia (precious stones) atau waktu/kenangan hidup."
  },
  "precise": {
    "arti": "Presisi tepat akurat / teliti tanpa meleset sedikit pun",
    "cara_baca": "prih-says",
    "penggunaan": [
      "The surgeon made a precise cut during the brain operation. (Dokter bedah membuat sayatan yang sangat presisi akurat selama operasi otak.)"
    ],
    "catatan": "Bentuk kata bendanya adalah precision (akurasi ketelitian)."
  },
  "predominant": {
    "arti": "Dominan utama / unsur yang paling menonjol dan berkuasa",
    "cara_baca": "prih-dom-uh-nunt",
    "penggunaan": [
      "English is the predominant language in global business communications. (Bahasa Inggris adalah bahasa dominan utama dalam komunikasi bisnis global.)"
    ],
    "catatan": "Unsur terbesar yang menguasai porsi mayoritas."
  },
  "procrastinate": {
    "arti": "Menunda-nunda pekerjaan / hobi mager dan ngerjain tugas pas mepet deadline",
    "cara_baca": "proh-kras-tuh-neyt",
    "penggunaan": [
      "Stop procrastinating and finish your thesis chapter today! (Berhenti menunda-nunda dan selesaikan bab skripsimu hari ini juga!)"
    ],
    "catatan": "Penyakit nomor satu mahasiswa dan pekerja yang suka sistem kebut semalam."
  },
  "profound": {
    "arti": "Mendalam / memiliki makna filosofis yang sangat luas dan menyentuh hati",
    "cara_baca": "pruh-fownd",
    "penggunaan": [
      "The book had a profound impact on how I view humanity. (Buku itu memberikan pengaruh yang sangat mendalam pada cara gue memandang kemanusiaan.)"
    ],
    "catatan": "Dipakai untuk wawasan bijak, cinta sejati, atau duka mendalam."
  },
  "prominent": {
    "arti": "Terkemuka menonjol / tokoh penting yang sangat disegani publik",
    "cara_baca": "prom-uh-nunt",
    "penggunaan": [
      "Several prominent scientists attended the international symposium. (Beberapa ilmuwan terkemuka menghadiri simposium internasional tersebut.)"
    ],
    "catatan": "Bisa untuk tokoh terkenal atau fitur fisik yang menonjol."
  },
  "prompt": {
    "arti": "Tepat waktu sigap / merangsang timbulnya aksi atau instruksi teks pada AI",
    "cara_baca": "prompt",
    "penggunaan": [
      "Thank you for your prompt response to our email inquiry. (Terima kasih atas tanggapan sigap dan tepat waktumu terhadap pertanyaan email kami.)"
    ],
    "catatan": "Dalam era AI: 'prompt' adalah teks instruksi yang diketik user ke model AI."
  },
  "prosper": {
    "arti": "Makmur sejahtera / berkembang subur dan meraih kemakmuran finansial",
    "cara_baca": "pros-per",
    "penggunaan": [
      "May your new business venture prosper in the years ahead. (Semoga usaha barumu makmur dan sukses besar di tahun-tahun mendatang.)"
    ],
    "catatan": "Bentuk kata sifatnya adalah prosperous (makmur sejahtera)."
  },
  "prudent": {
    "arti": "Hati-hati cermat / bijak mengelola risiko dan keuangan masa depan",
    "cara_baca": "proo-dunt",
    "penggunaan": [
      "It is prudent to save at least six months of living expenses for emergencies. (Sangat bijak dan cermat untuk menabung setidaknya enam bulan biaya hidup untuk dana darurat.)"
    ],
    "catatan": "Lawan dari sifat boros dan ceroboh."
  },

  // === Q ===
  "quaint": {
    "arti": "Unik antik / memesona dengan gaya klasik kuno yang nyaman",
    "cara_baca": "kweynt",
    "penggunaan": [
      "They spent their vacation in a quaint little village in Switzerland. (Mereka menghabiskan liburan di sebuah desa kecil yang antik dan memesona di Swiss.)"
    ],
    "catatan": "Dipakai untuk kafe vintage, pondok kayu tua, atau kota kuno yang asri."
  },
  "qualify": {
    "arti": "Memenuhi kualifikasi / lulus uji kelayakan untuk suatu posisi",
    "cara_baca": "kwol-uh-fay",
    "penggunaan": [
      "Her extensive experience qualifies her for the senior developer role. (Pengalamannya yang luas membuatnya memenuhi kualifikasi untuk posisi developer senior.)"
    ],
    "catatan": "Bentuk kata bendanya adalah qualification (kualifikasi keahlian)."
  },
  "quench": {
    "arti": "Memuaskan dahaga / memadamkan rasa haus atau api yang berkobar",
    "cara_baca": "kwench",
    "penggunaan": [
      "A cold glass of fresh coconut water quenched my thirst instantly. (Segelas es kelapa muda dingin langsung memuaskan rasa dahaga gue seketika.)"
    ],
    "catatan": "Frasa umum: 'quench your thirst' (melepas dahaga)."
  },
  "query": {
    "arti": "Kueri pertanyaan / permintaan pencarian data dalam basis data atau mesin pencari",
    "cara_baca": "kweer-ee",
    "penggunaan": [
      "The database returned millions of results in milliseconds for that search query. (Basis data menampilkan jutaan hasil dalam hitungan milidetik untuk kueri pencarian tersebut.)"
    ],
    "catatan": "Istilah teknis dalam SQL, database, dan Google Search."
  },
  "quest": {
    "arti": "Pencarian petualangan / misi mulia untuk mencari sesuatu yang berharga",
    "cara_baca": "kwest",
    "penggunaan": [
      "The scientists are on a quest to discover a clean source of infinite energy. (Para ilmuwan sedang dalam misi pencarian untuk menemukan sumber energi bersih tak terbatas.)"
    ],
    "catatan": "Sangat populer dalam game RPG: 'main quest' (misi utama)."
  },
  "quirk": {
    "arti": "Ciri khas unik / kebiasaan kecil yang aneh tapi lucu dan menarik",
    "cara_baca": "kwerk",
    "penggunaan": [
      "Everyone has their own little quirks that make them unique. (Setiap orang punya kebiasaan uniknya masing-masing yang bikin mereka istimewa.)"
    ],
    "catatan": "Bentuk kata sifatnya adalah quirky (unik, nyentrik, dan menggemaskan)."
  },
  "quota": {
    "arti": "Kuota / jatah batas jumlah maksimum atau minimum yang ditentukan",
    "cara_baca": "kwoh-tuh",
    "penggunaan": [
      "I need to connect to Wi-Fi because my cellular data quota is running low. (Gue harus nyambung ke Wi-Fi karena kuota data internet HP gue udah menipis.)"
    ],
    "catatan": "Bisa untuk kuota internet HP atau kuota target penjualan sales."
  },

  // === R ===
  "radiant": {
    "arti": "Berseri-seri / memancarkan cahaya kebahagiaan dan kecantikan dari dalam",
    "cara_baca": "rey-dee-unt",
    "penggunaan": [
      "The bride looked radiant as she walked down the aisle. (Pengantin wanita terlihat berseri-seri cantik saat melangkah di lorong pelaminan.)"
    ],
    "catatan": "Bisa untuk sinar matahari yang hangat atau wajah orang yang bahagia."
  },
  "random": {
    "arti": "Acak / tanpa pola tertentu dan terjadi begitu saja secara kebetulan",
    "cara_baca": "ran-dum",
    "penggunaan": [
      "The music app plays songs on a random shuffle mode. (Aplikasi musik memutar lagu dalam mode acak / shuffle.)"
    ],
    "catatan": "Bahasa gaul: 'random banget' (ngomong/bertindak gak terduga tanpa konteks)."
  },
  "reassure": {
    "arti": "Menenangkan hati / meyakinkan kembali seseorang agar tidak cemas",
    "cara_baca": "ree-uh-shoor",
    "penggunaan": [
      "The doctor reassured the nervous patient that the surgery was completely safe. (Dokter menenangkan hati pasien yang gugup itu bahwa operasinya sepenuhnya aman.)"
    ],
    "catatan": "Tindakan memberi ketenangan saat seseorang overthinking."
  },
  "reconcile": {
    "arti": "Berdamai kembali / merukunkan kembali hubungan yang sempat retak",
    "cara_baca": "rek-un-sayl",
    "penggunaan": [
      "After years of silence, the two estranged brothers finally reconciled. (Setelah bertahun-tahun tak saling sapa, dua saudara itu akhirnya berdamai kembali.)"
    ],
    "catatan": "Dalam akuntansi: 'reconcile accounts' (mencocokkan mutasi kas)."
  },
  "redundant": {
    "arti": "Mubazir berlebihan / pengulangan yang tidak perlu dan membuang-buang ruang",
    "cara_baca": "rih-dan-dunt",
    "penggunaan": [
      "Remove redundant code to optimize software loading speed. (Hapus kode yang mubazir berulang untuk mengoptimalkan kecepatan muat software.)"
    ],
    "catatan": "Istilah teknis dalam optimasi database dan penulisan esai."
  },
  "refine": {
    "arti": "Memperhalus / menyempurnakan kualitas produk atau ide agar makin matang",
    "cara_baca": "rih-fayn",
    "penggunaan": [
      "We need to refine our UI design based on user feedback. (Kita perlu memperhalus desain tampilan kita berdasarkan masukan pengguna.)"
    ],
    "catatan": "Bisa untuk kilang minyak (oil refinery) atau memoles ide bisnis."
  },
  "relentless": {
    "arti": "Tak kenal lelah / terus maju tanpa henti dan tidak pernah menyerah",
    "cara_baca": "rih-lent-lis",
    "penggunaan": [
      "Her relentless pursuit of excellence made her a world champion. (Usahanya yang tak kenal lelah mengejar keunggulan menjadikannya juara dunia.)"
    ],
    "catatan": "Bisa untuk etos kerja gigih atau badai hujan yang tak kunjung reda."
  },
  "resilient": {
    "arti": "Tahan banting / cepat bangkit kembali setelah diterpa musibah atau kegagalan",
    "cara_baca": "rih-zil-yunt",
    "penggunaan": [
      "Children are remarkably resilient and can adapt to new environments quickly. (Anak-anak luar biasa tahan banting dan bisa beradaptasi dengan lingkungan baru dengan cepat.)"
    ],
    "catatan": "Karakter mental juara: jatuh tujuh kali, bangkit delapan kali."
  },
  "robust": {
    "arti": "Kuat kokoh / sistem tangguh yang tahan banting menghadapi berbagai eror",
    "cara_baca": "roh-bast",
    "penggunaan": [
      "Our backend architecture is robust enough to handle millions of daily requests. (Arsitektur backend kami sangat kokoh dan tangguh menangani jutaan permintaan tiap hari.)"
    ],
    "catatan": "Standar emas dalam menilai kualitas software atau kesehatan fisik."
  },
  "ruthless": {
    "arti": "Kejam tanpa ampun / tega melakukan apa saja demi meraih ambisi",
    "cara_baca": "rooth-lis",
    "penggunaan": [
      "The ruthless dictator crushed any form of political opposition. (Diktator kejam tanpa ampun itu menumpas segala bentuk oposisi politik.)"
    ],
    "catatan": "Seseorang yang tidak memiliki rasa belas kasihan."
  },

  // === S ===
  "salient": {
    "arti": "Paling menonjol / poin utama yang paling penting dan menyita perhatian",
    "cara_baca": "sey-lee-unt",
    "penggunaan": [
      "He summarized the salient points of the long legal document in one page. (Dia merangkum poin-poin paling menonjol dari dokumen hukum panjang itu dalam satu halaman.)"
    ],
    "catatan": "Frasa umum: 'salient features / salient points'."
  },
  "salvage": {
    "arti": "Menyelamatkan sisa-sisa / memulihkan barang berharga dari reruntuhan",
    "cara_baca": "sal-vij",
    "penggunaan": [
      "Divers managed to salvage ancient gold coins from the shipwreck. (Penyelam berhasil menyelamatkan koin emas kuno dari bangkai kapal karam.)"
    ],
    "catatan": "Bisa menyelamatkan barang fisik atau menyelamatkan proyek yang hampir gagal."
  },
  "sanctuary": {
    "arti": "Suaka perlindungan / tempat suci yang tenang dan aman dari marabahaya",
    "cara_baca": "sank-choo-air-ee",
    "penggunaan": [
      "The national park serves as a protected sanctuary for endangered elephants. (Taman nasional itu berfungsi sebagai suaka perlindungan bagi gajah yang terancam punah.)"
    ],
    "catatan": "Bisa berarti suaka margasatwa (wildlife sanctuary) atau kamar tidur yang tenang."
  },
  "sarcasm": {
    "arti": "Sarkasme / sindiran pedas dengan kata-kata ironis untuk menyindir",
    "cara_baca": "sahr-kaz-um",
    "penggunaan": [
      "His voice was dripping with sarcasm when he complimented his rival. (Suaranya penuh nada sarkasme saat dia memuji lawan saingnya.)"
    ],
    "catatan": "Gaya humor cerdas menyindir yang populer di kalangan Gen Z."
  },
  "scrutinize": {
    "arti": "Memeriksa dengan sangat teliti / menginspeksi setiap detail secara mendalam",
    "cara_baca": "skroo-tuh-nayz",
    "penggunaan": [
      "Auditors scrutinized the company's financial records for any irregularities. (Auditor memeriksa dengan sangat teliti pembukuan keuangan perusahaan untuk mencari kejanggalan.)"
    ],
    "catatan": "Bentuk kata bendanya adalah scrutiny (pemeriksaan super ketat)."
  },
  "serene": {
    "arti": "Tenang tenteram / damai, hening, dan bebas dari hiruk-pikuk kebisingan",
    "cara_baca": "suh-reen",
    "penggunaan": [
      "Waking up to the serene sound of ocean waves is the best relaxation. (Bangun tidur ditemani suara deburan ombak laut yang tenang tenteram adalah relaksasi terbaik.)"
    ],
    "catatan": "Bentuk kata bendanya adalah serenity (ketenangan batin)."
  },
  "shrewd": {
    "arti": "Cerdik lihai / tajam nalurinya dalam melihat peluang dan karakter orang",
    "cara_baca": "shrood",
    "penggunaan": [
      "The shrewd businessman bought the land before prices skyrocketed. (Pebisnis cerdik dan lihai itu membeli tanah sebelum harganya melambung tinggi.)"
    ],
    "catatan": "Pujian untuk kepintaran praktis di dunia bisnis dan politik."
  },
  "simultaneous": {
    "arti": "Simultan / terjadi secara bersamaan pada waktu yang persis sama",
    "cara_baca": "say-mul-tey-nee-us",
    "penggunaan": [
      "The movie was released with simultaneous broadcasts in thirty countries. (Film itu dirilis dengan penayangan serentak simultan di tiga puluh negara.)"
    ],
    "catatan": "Dalam komputasi: 'simultaneous connections' (koneksi serentak)."
  },
  "skeptical": {
    "arti": "Skeptis / ragu-ragu dan tidak gampang percaya sebelum ada bukti nyata",
    "cara_baca": "skep-tih-kul",
    "penggunaan": [
      "I am skeptical about any investment scheme that promises instant riches. (Gue skeptis dan ragu terhadap skema investasi apa pun yang menjanjikan kaya mendadak.)"
    ],
    "catatan": "Sikap kritis ilmiah yang sehat untuk menghindari penipuan."
  },
  "sophisticated": {
    "arti": "Canggih berkelas / rumit berteknologi tinggi atau memiliki selera beradab tinggi",
    "cara_baca": "suh-fis-tih-key-tid",
    "penggunaan": [
      "The new AI model uses sophisticated neural networks to understand context. (Model AI baru itu menggunakan jaringan saraf canggih untuk memahami konteks.)"
    ],
    "catatan": "Bisa untuk teknologi canggih atau orang berwawasan berkelas."
  },
  "spontaneous": {
    "arti": "Spontan / dilakukan seketika tanpa perencanaan sebelumnya mengalir begitu saja",
    "cara_baca": "spon-tey-nee-us",
    "penggunaan": [
      "We took a spontaneous weekend road trip to the mountains. (Kami melakukan perjalanan darat akhir pekan yang spontan ke pegunungan.)"
    ],
    "catatan": "Tindakan seru yang didorong oleh impuls mendadak."
  },
  "sporadic": {
    "arti": "Sporadis / terjadi sesekali secara acak dan tidak teratur jarak waktunya",
    "cara_baca": "spaw-rad-ik",
    "penggunaan": [
      "There were sporadic gunshots heard throughout the night. (Ada suara tembakan sporadis yang sesekali terdengar sepanjang malam.)"
    ],
    "catatan": "Lawan dari kata continuous (terus-menerus teratur)."
  },
  "squander": {
    "arti": "Menghambur-hamburkan / menyia-nyiakan uang atau peluang emas dengan boros",
    "cara_baca": "skwon-der",
    "penggunaan": [
      "He squandered his lottery winnings on luxury cars and gambling. (Dia menghambur-hamburkan uang kemenangan lotrenya untuk mobil mewah dan judi.)"
    ],
    "catatan": "Frasa emas: 'squander an opportunity' (menyia-nyiakan peluang emas)."
  },
  "stagnant": {
    "arti": "Stagnan / macet mandek dan tidak ada aliran perkembangan atau kemajuan",
    "cara_baca": "stag-nunt",
    "penggunaan": [
      "Without innovation, a company's revenue will quickly become stagnant. (Tanpa inovasi, pendapatan perusahaan akan cepat mandek dan stagnan.)"
    ],
    "catatan": "Bisa air tergenang (stagnant water) atau karir yang macet."
  },
  "stimulate": {
    "arti": "Menstimulasi / merangsang pertumbuhan, ide kreatif, atau aktivitas fisik",
    "cara_baca": "stim-yoo-leyt",
    "penggunaan": [
      "Drinking black coffee in the morning helps stimulate brain alertness. (Minum kopi hitam di pagi hari membantu merangsang kewaspadaan otak.)"
    ],
    "catatan": "Dalam ekonomi: 'stimulate the economy' (mendorong gairah ekonomi)."
  },
  "straightforward": {
    "arti": "Lugas sederhana / mudah dipahami tanpa berbelit-belit dan jujur apa adanya",
    "cara_baca": "streyt-fawr-werd",
    "penggunaan": [
      "The installation process is very straightforward; just follow the on-screen steps. (Proses instalasinya sangat lugas dan gampang; cukup ikuti langkah di layar.)"
    ],
    "catatan": "Bisa untuk panduan yang gampang atau orang yang jujur blak-blakan."
  },
  "strenuous": {
    "arti": "Sangat melelahkan / butuh pengerahan tenaga fisik atau mental ekstra keras",
    "cara_baca": "stren-yoo-us",
    "penggunaan": [
      "Hiking up the steep mountain was a strenuous physical workout. (Mendaki gunung yang curam itu adalah olahraga fisik yang sangat melelahkan.)"
    ],
    "catatan": "Aktivitas berat yang menguras keringat dan stamina."
  },
  "subtle": {
    "arti": "Halus tersamar / tidak kentara mencolok namun memiliki efek terasa",
    "cara_baca": "sat-ul",
    "penggunaan": [
      "There was a subtle change in his tone of voice that indicated hesitation. (Ada perubahan halus pada nada suaranya yang menandakan keragu-raguan.)"
    ],
    "catatan": "Huruf 'b' di tengah kata ini tidak dibaca (silent 'b')."
  },
  "sustainable": {
    "arti": "Berkelanjutan / ramah lingkungan dan bisa dipertahankan jangka panjang tanpa merusak",
    "cara_baca": "suh-stey-nuh-bul",
    "penggunaan": [
      "Renewable energy sources are essential for building a sustainable future. (Sumber energi terbarukan sangat penting untuk membangun masa depan yang berkelanjutan.)"
    ],
    "catatan": "Konsep dunia modern: 'sustainable development' (pembangunan berkelanjutan)."
  },
  "synergy": {
    "arti": "Sinergi / kerja sama padu di mana hasil gabungan jauh lebih dahsyat daripada kerja sendiri",
    "cara_baca": "sin-er-jee",
    "penggunaan": [
      "The merger created a powerful synergy between engineering and marketing. (Penggabungan perusahaan itu menciptakan sinergi dahsyat antara tim teknik dan pemasaran.)"
    ],
    "catatan": "Rumus sinergi: 1 + 1 = 3 (efek multiplikasi kerja tim)."
  },

  // === T ===
  "tangible": {
    "arti": "Nyata berwujud / bisa disentuh secara fisik dan jelas terbukti hasilnya",
    "cara_baca": "tan-juh-bul",
    "penggunaan": [
      "We need to show tangible results to our investors this quarter. (Kita perlu menunjukkan hasil yang nyata berwujud kepada para investor kuartal ini.)"
    ],
    "catatan": "Lawan dari kata intangible (tak berwujud seperti hak cipta/brand)."
  },
  "tedious": {
    "arti": "Menjemukan membosankan / pekerjaan panjang yang bikin lelah dan ngantuk",
    "cara_baca": "tee-dee-us",
    "penggunaan": [
      "Manually entering data into thousands of spreadsheet rows is tedious work. (Memasukkan data manual ke ribuan baris spreadsheet adalah pekerjaan yang sangat menjemukan.)"
    ],
    "catatan": "Tugas rutin berulang-ulang yang butuh otomatisasi coding."
  },
  "tentative": {
    "arti": "Tentatif sementara / belum pasti dan masih bisa berubah sewaktu-waktu",
    "cara_baca": "ten-tuh-tiv",
    "penggunaan": [
      "We have set a tentative date for the product launch on October 15th. (Kami telah menetapkan tanggal tentatif sementara untuk peluncuran produk pada 15 Oktober.)"
    ],
    "catatan": "Sering dipakai dalam jadwal rapat atau rencana perjalanan."
  },
  "thrive": {
    "arti": "Tumbuh subur makmur / berkembang pesat dan sangat sukses di lingkungannya",
    "cara_baca": "thrayv",
    "penggunaan": [
      "Some tech companies thrive even during economic downturns. (Beberapa perusahaan teknologi justru tumbuh subur makmur bahkan di saat masa resesi ekonomi.)"
    ],
    "catatan": "Tingkat perkembangan di atas sekadar bertahan hidup (thrive > survive)."
  },
  "tolerate": {
    "arti": "Mentoleransi / sanggup menahan atau memaklumi perbedaan dan perlakuan buruk",
    "cara_baca": "tol-uh-reyt",
    "penggunaan": [
      "The school has zero tolerance for bullying. (Sekolah tidak mentoleransi sama sekali aksi perundungan/bullying.)"
    ],
    "catatan": "Bentuk kata bendanya adalah tolerance (toleransi)."
  },
  "tranquil": {
    "arti": "Hening tenteram / damai, tenang, dan bebas dari segala kegaduhan",
    "cara_baca": "tran-kwil",
    "penggunaan": [
      "The mountain lake was so tranquil that it reflected the clouds like a mirror. (Danau pegunungan itu sangat hening tenteram sampai-sampai memantulkan awan bagai cermin.)"
    ],
    "catatan": "Bentuk kata bendanya adalah tranquility (ketenangan abadi)."
  },
  "transparent": {
    "arti": "Transparan / tembus pandang atau jujur terbuka tanpa rahasia yang disembunyikan",
    "cara_baca": "trans-pair-unt",
    "penggunaan": [
      "Good governance requires a completely transparent financial system. (Tata kelola yang baik membutuhkan sistem keuangan yang sepenuhnya jujur dan transparan.)"
    ],
    "catatan": "Bisa untuk kaca bening atau keterbukaan informasi publik."
  },
  "tremendous": {
    "arti": "Luar biasa dahsyat / sangat besar dalam jumlah, ukuran, atau pengaruhnya",
    "cara_baca": "trih-men-dus",
    "penggunaan": [
      "The fundraising campaign received a tremendous amount of public support. (Kampanye penggalangan dana itu menerima dukungan publik dalam jumlah luar biasa dahsyat.)"
    ],
    "catatan": "Pujian untuk dampak besar atau volume yang sangat masif."
  },
  "trivial": {
    "arti": "Remeh-temeh / sepele dan tidak begitu penting untuk diributkan",
    "cara_baca": "triv-ee-ul",
    "penggunaan": [
      "Don't waste your precious energy arguing over trivial matters. (Jangan buang-buang energimu yang berharga untuk berdebat soal hal-hal remeh yang sepele.)"
    ],
    "catatan": "Lawan dari kata crucial (sangat krusial/penting)."
  },
  "turmoil": {
    "arti": "Kekacauan hebat / huru-hara dan gejolak kebingungan yang berkecamuk",
    "cara_baca": "ter-moyl",
    "penggunaan": [
      "The country was thrown into political turmoil after the sudden resignation. (Negara itu terjerumus ke dalam kekacauan politik hebat setelah pengunduran diri mendadak tersebut.)"
    ],
    "catatan": "Bisa untuk gejolak politik nasional atau kekacauan emosi batin (inner turmoil)."
  },

  // === U ===
  "ultimate": {
    "arti": "Pamungkas puncak / tujuan tertinggi atau versi terlengkap terakhir",
    "cara_baca": "ul-tuh-mit",
    "penggunaan": [
      "Winning the World Cup is the ultimate dream of every professional soccer player. (Memenangkan Piala Dunia adalah mimpi pamungkas puncak bagi setiap pemain sepak bola profesional.)"
    ],
    "catatan": "Frasa umum: 'the ultimate goal / the ultimate guide'."
  },
  "unanimous": {
    "arti": "Aklamasi bulat / disetujui bersama secara 100% tanpa ada yang menentang",
    "cara_baca": "yoo-nan-uh-mus",
    "penggunaan": [
      "The committee reached a unanimous decision to approve the budget. (Komite mencapai keputusan bulat 100% aklamasi untuk menyetujui anggaran.)"
    ],
    "catatan": "Kesepakatan mutlak di mana semua peserta voting setuju."
  },
  "undermine": {
    "arti": "Merongrong / melemahkan wibawa atau pondasi secara diam-diam",
    "cara_baca": "an-der-mayn",
    "penggunaan": [
      "Spreading false rumors will only undermine team trust and morale. (Menyebarkan rumor palsu hanya akan merongrong rasa saling percaya dan moral tim.)"
    ],
    "catatan": "Tindakan licik menggembosi kekuatan dari dalam."
  },
  "unprecedented": {
    "arti": "Belum pernah terjadi sebelumnya / rekor baru yang belum ada tandingannya dalam sejarah",
    "cara_baca": "an-pres-ih-den-tid",
    "penggunaan": [
      "The sudden global lockdown was an unprecedented event in modern history. (Karantina serentak di seluruh dunia adalah peristiwa yang belum pernah terjadi sebelumnya dalam sejarah modern.)"
    ],
    "catatan": "Sangat sering muncul di berita global saat terjadi fenomena baru."
  },
  "unravel": {
    "arti": "Terurai terkuak / mengurai benang kusut atau misteri yang rumit",
    "cara_baca": "an-rav-ul",
    "penggunaan": [
      "Detectives worked tirelessly to unravel the mystery behind the disappearance. (Para detektif bekerja tanpa lelah untuk menguak misteri di balik kasus orang hilang itu.)"
    ],
    "catatan": "Bisa mengurai rajutan benang wol atau menguak teka-teki rumit."
  },
  "unveil": {
    "arti": "Memperkenalkan ke publik / membuka tirai selubung produk atau inovasi baru",
    "cara_baca": "an-veyl",
    "penggunaan": [
      "Apple will unveil its newest flagship smartphone next Tuesday. (Apple akan memperkenalkan smartphone unggulan terbarunya ke publik hari Selasa depan.)"
    ],
    "catatan": "Sangat populer dalam event peluncuran gadget dan karya seni."
  },
  "upgrade": {
    "arti": "Meningkatkan versi / memperbarui kualitas ke tingkatan yang lebih canggih",
    "cara_baca": "up-greyd",
    "penggunaan": [
      "I decided to upgrade my laptop's RAM to run heavy coding tools smoothly. (Gue memutuskan untuk meningkatkan RAM laptop agar bisa menjalankan aplikasi koding berat dengan lancar.)"
    ],
    "catatan": "Bisa upgrade perangkat keras, tiket pesawat, atau kualitas diri (self-upgrade)."
  },
  "uphold": {
    "arti": "Menjunjung tinggi / menegakkan hukum, keadilan, dan janji suci",
    "cara_baca": "up-hohld",
    "penggunaan": [
      "Judges take an oath to uphold justice without fear or favor. (Para hakim bersumpah untuk menjunjung tinggi keadilan tanpa rasa takut atau pilih kasih.)"
    ],
    "catatan": "Frasa klasik: 'uphold the law / uphold traditions'."
  },
  "utilize": {
    "arti": "Memanfaatkan / mendayagunakan sarana yang ada secara maksimal",
    "cara_baca": "yoo-tuh-layz",
    "penggunaan": [
      "We should utilize renewable solar power to reduce electricity costs. (Kita harus mendayagunakan tenaga surya terbarukan untuk menghemat biaya listrik.)"
    ],
    "catatan": "Bentuk formal dan lebih elegan dari kata 'use'."
  },
  "utter": {
    "arti": "Mengucapkan sepatah kata / mutlak total tanpa keraguan",
    "cara_baca": "ut-ter",
    "penggunaan": [
      "She stared in utter disbelief at the shocking news. (Dia terbelalak dalam rasa tidak percaya yang mutlak total atas berita mengejutkan itu.)"
    ],
    "catatan": "Frasa umum: 'utter nonsense' (omong kosong total) atau 'without uttering a word'."
  },

  // === V ===
  "vacant": {
    "arti": "Kosong belum berpenghuni / lowongan posisi yang belum terisi",
    "cara_baca": "vey-kunt",
    "penggunaan": [
      "There is a vacant seat in the front row if you want to sit down. (Ada kursi kosong di barisan depan kalau kamu mau duduk.)"
    ],
    "catatan": "Bisa untuk kamar hotel kosong atau lowongan kerja (job vacancy)."
  },
  "vague": {
    "arti": "Samar tidak jelas / penjelasan yang mengambang dan membingungkan",
    "cara_baca": "veyg",
    "penggunaan": [
      "His instructions were too vague, so nobody knew what to do. (Instruksinya terlalu samar dan gak jelas, jadi gak ada yang tahu harus berbuat apa.)"
    ],
    "catatan": "Lawan dari kata clear dan specific (jelas dan spesifik)."
  },
  "valiant": {
    "arti": "Gagah berani / ksatria pemberani yang berjuang menghadapi marabahaya",
    "cara_baca": "val-yunt",
    "penggunaan": [
      "The soldiers made a valiant effort to defend the fortress. (Para prajurit melakukan perjuangan gagah berani untuk mempertahankan benteng.)"
    ],
    "catatan": "Pujian untuk keberanian heroik di medan laga atau masa kritis."
  },
  "validate": {
    "arti": "Memvalidasi / menguji keabsahan atau mengakui kebenaran perasaan seseorang",
    "cara_baca": "val-ih-deyt",
    "penggunaan": [
      "We need to validate our startup idea by talking to real potential customers. (Kita perlu memvalidasi ide startup kita dengan berbicara langsung ke calon pelanggan nyata.)"
    ],
    "catatan": "Dalam psikologi: 'validate feelings' (mengakui dan memahami perasaan pasangan)."
  },
  "vanish": {
    "arti": "Lenyap menghilang / sirna seketika tanpa meninggalkan jejak",
    "cara_baca": "van-ish",
    "penggunaan": [
      "The magician made the white rabbit vanish into thin air. (Pesulap itu membuat kelinci putih lenyap menghilang begitu saja ke udara.)"
    ],
    "catatan": "Frasa populer: 'vanish without a trace' (lenyap tanpa jejak)."
  },
  "vanquish": {
    "arti": "Menaklukkan / mengalahkan musuh atau rasa takut sampai takluk total",
    "cara_baca": "van-kwish",
    "penggunaan": [
      "The hero vanquished the fearsome dragon and saved the kingdom. (Sang pahlawan menaklukkan naga yang menakutkan itu dan menyelamatkan kerajaan.)"
    ],
    "catatan": "Kemenangan mutlak atas lawan dalam kisah epik."
  },
  "versatile": {
    "arti": "Serbaguna / punya banyak talenta dan bisa menyesuaikan diri di berbagai bidang",
    "cara_baca": "ver-suh-tayl",
    "penggunaan": [
      "Python is a versatile programming language used in web dev, data science, and AI. (Python adalah bahasa pemrograman serbaguna yang dipakai di web, data science, dan AI.)"
    ],
    "catatan": "Pujian untuk alat serbaguna atau orang bertalenta multitalenta."
  },
  "vibrant": {
    "arti": "Penuh warna dan energi / hidup, semarak, dan berdenyut riang",
    "cara_baca": "vay-brunt",
    "penggunaan": [
      "Tokyo is famous for its vibrant nightlife and colorful neon signs. (Tokyo terkenal dengan kehidupan malamnya yang semarak penuh warna dan lampu neon yang hidup.)"
    ],
    "catatan": "Bisa untuk warna yang menyala terang atau komunitas yang penuh energi."
  },
  "vicious": {
    "arti": "Ganas kejam / lingkaran setan yang jahat dan merusak",
    "cara_baca": "vish-us",
    "penggunaan": [
      "They got trapped in a vicious cycle of debt and poverty. (Mereka terjebak dalam lingkaran setan utang dan kemiskinan yang kejam.)"
    ],
    "catatan": "Frasa wajib: 'vicious cycle' (lingkaran setan yang susah diputus)."
  },
  "vigilant": {
    "arti": "Waspada siaga / berjaga-jaga dengan mata terbuka lebar terhadap ancaman",
    "cara_baca": "vij-uh-lunt",
    "penggunaan": [
      "Security guards must remain vigilant at all times during the night shift. (Petugas keamanan harus tetap waspada dan siaga setiap saat selama giliran jaga malam.)"
    ],
    "catatan": "Kesiapsiagaan penuh agar tidak kecolongan musuh atau bahaya."
  },
  "vindicate": {
    "arti": "Memulihkan nama baik / terbukti tidak bersalah setelah sekian lama dituduh",
    "cara_baca": "vin-dih-keyt",
    "penggunaan": [
      "New DNA evidence vindicated the man who was falsely imprisoned for ten years. (Bukti DNA baru memulihkan nama baik pria yang sempat dipenjara keliru selama sepuluh tahun.)"
    ],
    "catatan": "Kemenangan kebenaran atas fitnah keji."
  },
  "vital": {
    "arti": "Sangat vital / mutlak penting bagi kelangsungan hidup",
    "cara_baca": "vay-tul",
    "penggunaan": [
      "Drinking sufficient clean water is vital for human kidney function. (Minum air bersih yang cukup sangat vital bagi fungsi ginjal manusia.)"
    ],
    "catatan": "Istilah medis: 'vital signs' (tanda-tanda vital kehidupan seperti detak jantung)."
  },
  "vivid": {
    "arti": "Sangat jelas hidup / ingatan atau mimpi yang saking jernihnya terasa nyata",
    "cara_baca": "viv-id",
    "penggunaan": [
      "I still have a vivid memory of my first day at elementary school. (Gue masih punya ingatan yang sangat jelas dan hidup tentang hari pertama masuk SD.)"
    ],
    "catatan": "Bisa untuk warna cerah menyala (vivid colors) atau imajinasi tajam."
  },
  "volatile": {
    "arti": "Fluktuatif labil / mudah meledak atau berubah drastis tanpa peringatan",
    "cara_baca": "vol-uh-tayl",
    "penggunaan": [
      "Cryptocurrency markets are known to be highly volatile. (Pasar cryptocurrency dikenal sangat volatil dan mudah naik-turun tajam secara drastis.)"
    ],
    "catatan": "Dalam kimia (zat mudah menguap/terbakar), dalam pasar (harga labil)."
  },
  "vulnerable": {
    "arti": "Rentan rapuh / mudah terluka dan gampang diserang secara fisik maupun emosional",
    "cara_baca": "vul-ner-uh-bul",
    "penggunaan": [
      "Opening up about your feelings makes you feel vulnerable but builds deeper intimacy. (Membuka perasaanmu membuatmu merasa rentan, tapi itu membangun keintiman yang lebih dalam.)"
    ],
    "catatan": "Dalam cybersecurity: 'vulnerability' (celah keamanan sistem)."
  },

  // === W ===
  "waive": {
    "arti": "Membebaskan / mengesampingkan atau mencabut biaya/tuntutan secara sukarela",
    "cara_baca": "weyv",
    "penggunaan": [
      "The university agreed to waive the application fee for low-income students. (Universitas setuju untuk membebaskan biaya pendaftaran bagi mahasiswa kurang mampu.)"
    ],
    "catatan": "Biasa dalam klausul kontrak: 'waiver' (surat pernyataan pelepasan hak)."
  },
  "wander": {
    "arti": "Mengembara / jalan-jalan santai menjelajah tanpa arah tujuan pasti",
    "cara_baca": "won-der",
    "penggunaan": [
      "We loved to wander through the narrow streets of the ancient city. (Kami suka mengembara jalan-jalan santai menelusuri gang-gang sempit kota kuno itu.)"
    ],
    "catatan": "Jangan tertukar dengan 'wonder' (bertanya-tanya heran)."
  },
  "weary": {
    "arti": "Lelah letih / letih fisik dan batin karena perjalanan panjang atau beban hidup",
    "cara_baca": "weer-ee",
    "penggunaan": [
      "The weary travelers finally arrived at a warm mountain inn. (Para pelancong yang letih lelah itu akhirnya tiba di penginapan pegunungan yang hangat.)"
    ],
    "catatan": "Keletihan mendalam setelah perjalanan atau perjuangan melelahkan."
  },
  "wholesome": {
    "arti": "Menyehatkan hati / bernuansa positif, murni, dan membawa kebaikan moral",
    "cara_baca": "hohl-sum",
    "penggunaan": [
      "Watching heartwarming family videos on social media is such wholesome content. (Menonton video kehangatan keluarga di media sosial adalah konten yang sangat menyehatkan hati.)"
    ],
    "catatan": "Slang internet untuk hal-hal manis, hangat, dan positif tanpa unsur toxic."
  },
  "widespread": {
    "arti": "Meluas tersebar / menyebar ke area yang sangat luas di berbagai tempat",
    "cara_baca": "wayd-spred",
    "penggunaan": [
      "The viral video gained widespread attention across international media. (Video viral itu mendapatkan perhatian yang meluas di berbagai media internasional.)"
    ],
    "catatan": "Dipakai untuk tren yang menyebar luas atau wabah penyakit."
  },
  "withdraw": {
    "arti": "Menarik diri / menarik uang tunai dari ATM atau mundur dari perlombaan",
    "cara_baca": "with-draw",
    "penggunaan": [
      "I need to find an ATM to withdraw some cash for the street market. (Gue perlu cari mesin ATM buat menarik uang tunai untuk belanja di pasar.)"
    ],
    "catatan": "Bisa tarik tunai saldo bank atau menarik pasukan militer."
  },
  "withhold": {
    "arti": "Menahan / tidak memberikan informasi atau pembayaran yang seharusnya diserahkan",
    "cara_baca": "with-hohld",
    "penggunaan": [
      "The suspect was accused of withholding critical information from the police. (Tersangka dituduh sengaja menahan informasi penting dari pihak kepolisian.)"
    ],
    "catatan": "Istilah perpajakan: 'withholding tax' (pajak penghasilan yang dipotong di awal)."
  },
  "worthwhile": {
    "arti": "Sangat sepadan / berharga dan layak diperjuangkan meski butuh waktu dan pengorbanan",
    "cara_baca": "werth-wayl",
    "penggunaan": [
      "Learning to code was difficult, but the high salary made it entirely worthwhile. (Belajar koding itu susah, tapi gaji tingginya bikin semua perjuangan itu sangat sepadan.)"
    ],
    "catatan": "Investasi waktu atau tenaga yang membuahkan hasil memuaskan."
  },
  "wretched": {
    "arti": "Malang sengsara / sangat menderita dan memprihatinkan kondisinya",
    "cara_baca": "rech-id",
    "penggunaan": [
      "The refugees lived in wretched conditions during the freezing winter. (Para pengungsi hidup dalam kondisi yang sangat malang sengsara selama musim dingin membeku.)"
    ],
    "catatan": "Kondisi penderitaan kemiskinan atau cuaca buruk yang sangat menyiksa."
  },

  // === Y ===
  "yearn": {
    "arti": "Mendambakan rindu / rindu berat dan sangat mendambakan sesuatu dari lubuk hati",
    "cara_baca": "yern",
    "penggunaan": [
      "After years of living abroad, he yearned for his mother's homecooked food. (Setelah bertahun-tahun hidup di perantauan, dia sangat mendambakan masakan rumah sang ibu.)"
    ],
    "catatan": "Bentuk kata bendanya adalah yearning (kerinduan mendalam)."
  },
  "yield": {
    "arti": "Menghasilkan panen / mengalah memberi jalan kepada pengendara lain",
    "cara_baca": "yeeld",
    "penggunaan": [
      "Organic farming techniques yielded a record-breaking harvest this season. (Teknik pertanian organik menghasilkan panen yang memecahkan rekor musim ini.)"
    ],
    "catatan": "Bisa hasil panen pertanian, imbal hasil investasi (dividend yield), atau rambu lalu lintas."
  },
  "youthful": {
    "arti": "Awet muda / berjiwa muda dan memancarkan energi segar masa muda",
    "cara_baca": "yooth-ful",
    "penggunaan": [
      "Eating healthy food and exercising regularly keeps your skin youthful. (Makan makanan sehat dan olahraga teratur membuat kulitmu tetap awet muda.)"
    ],
    "catatan": "Sifat orang tua yang tetap lincah dan berjiwa muda (youthful spirit)."
  },
  "yummy": {
    "arti": "Lezat enak / sangat nikmat disantap lidah",
    "cara_baca": "yam-ee",
    "penggunaan": [
      "This chocolate cake is absolutely yummy! (Kue cokelat ini benar-benar enak dan lezat banget!)"
    ],
    "catatan": "Kosakata santai informal saat menikmati makanan lezat."
  },

  // === Z ===
  "zeal": {
    "arti": "Semangat membara / antusiasme menggebu-gebu demi suatu tujuan mulia",
    "cara_baca": "zeel",
    "penggunaan": [
      "The young activists fought for ocean conservation with relentless zeal. (Aktivis muda itu berjuang demi pelestarian laut dengan semangat yang membara.)"
    ],
    "catatan": "Bentuk pelakunya adalah zealot (orang yang fanatik bersemangat)."
  },
  "zealous": {
    "arti": "Sangat bersemangat / antusias gigih dan tekun memperjuangkan keyakinannya",
    "cara_baca": "zel-us",
    "penggunaan": [
      "He was a zealous advocate for digital privacy and open-source software. (Dia adalah pembela yang sangat gigih dan bersemangat untuk privasi digital dan software open-source.)"
    ],
    "catatan": "Perhatikan ejaannya dibaca 'zel-us' (bukan 'zeel-us')."
  },
  "zenith": {
    "arti": "Puncak kejayaan / titik tertinggi prestasi atau posisi matahari di langit",
    "cara_baca": "zen-ith",
    "penggunaan": [
      "The Roman Empire reached the zenith of its power in the second century. (Kekaisaran Romawi mencapai puncak kejayaannya pada abad kedua.)"
    ],
    "catatan": "Lawan dari kata nadir (titik terendah / titik nadir kehancuran)."
  },
  "zest": {
    "arti": "Gairah hidup / semangat ceria dan antusiasme menikmati setiap momen hidup",
    "cara_baca": "zest",
    "penggunaan": [
      "She approached every single day with an infectious zest for life. (Dia menjalani setiap hari dengan gairah hidup yang ceria dan menular ke orang lain.)"
    ],
    "catatan": "Bisa berarti semangat hidup (zest for life) atau parutan kulit jeruk dalam memasak."
  },
  "zigzag": {
    "arti": "Zig-zag / pola garis berliku-liku tajam ke kiri dan ke kanan",
    "cara_baca": "zig-zag",
    "penggunaan": [
      "The hiking trail zigzagged up the steep cliff to make the climb safer. (Jalur pendakian itu dibuat berkelok zig-zag menaiki tebing curam agar pendakian lebih aman.)"
    ],
    "catatan": "Pola lintasan berbelok-belok tajam."
  },
  "zone": {
    "arti": "Zona wilayah / kawasan khusus atau kondisi fokus maksimal",
    "cara_baca": "zohn",
    "penggunaan": [
      "The athlete was in the zone and played the best match of his career. (Atlet itu sedang dalam kondisi fokus puncak / in the zone dan memainkan pertandingan terbaik dalam karirnya.)"
    ],
    "catatan": "Frasa psikologi: 'in the zone' (fokus mengalir tanpa distraksi / flow state)."
  }
};

// Merge all entries
const merged = { ...existingVocab, ...newVocab };

// Sort keys alphabetically A to Z
const sortedKeys = Object.keys(merged).sort();
const sortedVocab = {};
for (const key of sortedKeys) {
  sortedVocab[key] = merged[key];
}

fs.writeFileSync('./src/data/vocab1000.json', JSON.stringify(sortedVocab, null, 2), 'utf8');
console.log(`Successfully compiled ${sortedKeys.length} vocabulary entries from A to Z!`);
const letters = [...new Set(sortedKeys.map(k => k[0]))].sort();
console.log('All letters present:', letters.join(', '));
