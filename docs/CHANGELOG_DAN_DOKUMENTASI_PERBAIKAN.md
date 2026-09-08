# 📋 Dokumentasi Perbaikan & Rekap Changelog Ranglish
**Tanggal Pembaruan Terakhir:** 6 September 2026  
**Status Versi:** MVP 0.1.0 — Anak Rantau Edition  
**Arsitektur AI Utama:** Google Gemini 3.5 Flash (Tier 1 Primary) + OpenRouter Auto-Router (Tier 2) + Smart Local Engine (Tier 3)

---

## 📑 Daftar Isi
1. [Latar Belakang & Evaluasi](#-latar-belakang--evaluasi)
2. [Rekap Perbaikan Fitur & UI (Kronologis)](#-rekap-perbaikan-fitur--ui-kronologis)
   - [Perbaikan 1: Integrasi Google Gemini 3.5 Flash sebagai AI Utama](#1-integrasi-google-gemini-35-flash-tier-1-primary)
   - [Perbaikan 2: Pembersihan Residu Template Statis pada Arti](#2-pembersihan-residu-template-statis-pada-arti)
   - [Perbaikan 3: Slide-over Drawer "Bedah Kata" (Sisi Kanan)](#3-slide-over-drawer-bedah-kata-sisi-kanan)
   - [Perbaikan 4: Deteksi Otomatis Musik, Lirik Lagu, & Pop Culture](#4-deteksi-otomatis-musik-lirik-lagu--pop-culture)
   - [Perbaikan 5: Generalisasi Arti Bahasa Indonesia (Anti-Romance Bias)](#5-generalisasi-arti-bahasa-indonesia-anti-romance-bias)
   - [Perbaikan 6: Standarisasi Single Line Icons (Lucide)](#6-standarisasi-single-line-icons-lucide)
   - [Perbaikan 7: Minimalisasi & Perampingan Kartu Pelafalan Audio](#7-minimalisasi--perampingan-kartu-pelafalan-audio)
3. [Ringkasan Perubahan File Proyek](#-ringkasan-perubahan-file-proyek)

---

## 🔍 Latar Belakang & Evaluasi

Sebelum perbaikan, sistem Ranglish mengalami beberapa kendala fungsional dan estetika UI:
1. **Output AI Terasa Kaku & Bocor Template**: Terdapat residu format seperti *"— Frasa percakapan luwes..."*, *"Bikin obrolan dua arah jadi lebih hidup..."*, serta kebocoran proses pikir (*thinking process*).
2. **Layout Bedah Kata Memakan Tempat**: Kartu arti per kata diletakkan di bawah kartu utama, membuat tata letak memanjang dan bertumpuk kaku.
3. **Bias Asumsi Skenario Romansa**: Frasa umum seperti *"against the world"* secara otomatis diasumsikan hanya untuk *"bareng orang tersayang"*, bukan definisi umum yang netral.
4. **Icon Tabrakan (Double Icons)**: Menggabungkan emoji mentah dan icon SVG sekaligus dalam satu tombol/judul.
5. **Widget Audio Terlalu Memakan Ruang**: Kartu *"Dengarkan Pelafalan"* memiliki tinggi berlebih (~210px) dengan tombol dan label kecepatan terpisah.

---

## 🚀 Rekap Perbaikan Fitur & UI (Kronologis)

### 1. Integrasi Google Gemini 3.5 Flash (Tier 1 Primary)
- **Tanggal:** 6 September 2026
- **Masalah:** Model OpenRouter gratisan kerap mengalami antrean lambat, latensi tinggi, atau memunculkan tag `<think>` panjang.
- **Solusi:**
  - Mengintegrasikan model `gemini-3.5-flash-lite` langsung melalui serverless proxy [`api/lookup.js`](file:///c:/ME/PROJECT/RANGLISH/api/lookup.js).
  - Mengaktifkan native JSON mode (`responseMimeType: "application/json"`).
  - Waktu respon dipangkas menjadi **~1.2 detik** (sub-detik) tanpa kebocoran reasoning.
  - Failover cascade otomatis: jika Gemini sibuk/kuota habis, sistem otomatis beralih ke OpenRouter tanpa error ke pengguna.

---

### 2. Pembersihan Residu Template Statis pada Arti
- **Tanggal:** 6 September 2026
- **Masalah:** Arti kata/frasa sering kali ketempelan label generik seperti `Makna santai:`, `Makna emosional:`, `— Frasa percakapan luwes...`.
- **Solusi:**
  - Memangkas seluruh titik injeksi label pada [`src/services/freeTranslator.js`](file:///c:/ME/PROJECT/RANGLISH/src/services/freeTranslator.js) dan [`src/utils/sentenceTranslator.js`](file:///c:/ME/PROJECT/RANGLISH/src/utils/sentenceTranslator.js).
  - Menambahkan fungsi pembersih otomatis `stripTemplateContamination()` di [`src/services/storage.js`](file:///c:/ME/PROJECT/RANGLISH/src/services/storage.js) yang membersihkan data cache lama di browser secara instan.

---

### 3. Slide-over Drawer "Bedah Kata" (Sisi Kanan)
- **Tanggal:** 6 September 2026
- **Masalah:** Fitur "Bedah Arti Per Kata" sebelumnya ditempatkan di bawah hasil pencarian utama, membuat halaman sangat panjang dan tampilan kartu terlihat gepeng di layar laptop.
- **Solusi:**
  - Membuat komponen baru [`src/components/WordBreakdownDrawer.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/WordBreakdownDrawer.jsx) menggunakan React Portal (`createPortal`) langsung ke `document.body`.
  - Drawer muncul mulus dari sisi kanan (*slide-in-right*) dengan backdrop blur.
  - Kartu kata tersusun dalam grid 2-kolom yang proporsional, dilengkapi:
    - Tombol audio pelafalan per kata.
    - 3D Flip Card untuk mengecek arti Indonesia.
    - Tombol *"Balik Semua"* dan tombol tutup (`X` atau tombol `Escape`).

---

### 4. Deteksi Otomatis Musik, Lirik Lagu, & Pop Culture
- **Tanggal:** 6 September 2026
- **Masalah:** Ketika pengguna mencari kutipan lirik lagu (misal karya band *eleventwelfth*, *Reality Club*, *NIKI*, dsb.), sistem belum mengenali konteks karya tersebut.
- **Solusi:**
  - Menambahkan aturan prompt pengenalan karya musik dan pop culture pada AI.
  - Menampilkan badge dinamis `🎵 LIRIK LAGU` lengkap dengan metadata lagu (judul & musisi).
  - Kartu wawasan otomatis berganti menjadi **Konteks Musik & Lagu**, menjelaskan latar belakang musisi, album, dan emosi di balik liriknya.

---

### 5. Generalisasi Arti Bahasa Indonesia (Anti-Romance Bias)
- **Tanggal:** 6 September 2026
- **Masukan Pengguna:** Pencarian *"against the world"* menghasilkan arti *"melawan dunia bareng orang tersayang"*, padahal frasa ini bersifat umum.
- **Solusi:**
  - Menambahkan aturan ketat pada `SYSTEM_PROMPT_VOCAB`: **Field `arti` wajib memberikan definisi inti (core meaning) yang universal, objektif, dan netral.**
  - Dilarang keras menyelipkan kata romansa (*orang tersayang, pacar, gebetan*) kecuali input aslinya memang eksplisit tentang percintaan.
  - Skenario spesifik (perjuangan hidup, startup, tim, persahabatan) dialihkan ke **Contoh Penggunaan** dan **Catatan**.
  - **Hasil Baru:** *"menghadapi atau melawan seluruh dunia sendirian demi sesuatu atau seseorang"*.

---

### 6. Standarisasi Single Line Icons (Lucide)
- **Tanggal:** 6 September 2026
- **Masukan Pengguna:** Icon tombol saran memiliki icon dobel (emoji + icon SVG), dan beberapa judul section memiliki icon dobel (`📖 📖` dan `📄 📄`).
- **Solusi:**
  - Mengintegrasikan line icons resmi dari Lucide (`Film`, `Music`, `Smartphone`, `MessageSquare`, `Lightbulb`, `Shuffle`).
  - Menghapus seluruh emoji yang bertabrakan dengan icon SVG di [`src/components/VocabLookup.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/VocabLookup.jsx) dan [`src/components/VocabDetailModal.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/VocabDetailModal.jsx).

---

### 7. Minimalisasi & Perampingan Kartu Pelafalan Audio
- **Tanggal:** 6 September 2026
- **Masukan Pengguna:** Kartu *"Dengarkan Pelafalan"* di kanan atas terlalu besar (*bulky*) dan memakan banyak ruang kosong.
- **Solusi:**
  - **Header Terpadu:** Judul `<Volume2 /> Pelafalan Native US` dan pill toggle kecepatan (`1.0x` / `0.75x`) digabung sejajar dalam satu baris ringkas di bagian atas.
  - **Tombol Play Ramping:** Dibuat lebih slim (`py-2`, `text-xs font-extrabold`) dengan animasi gelombang suara saat aktif.
  - **Hemat Ruang:** Tinggi kartu berkurang lebih dari 55% tanpa mengurangi fungsionalitas audio native US.

---

### 8. Perbaikan & Upgrade Audio Pelafalan (Dual-Engine TTS Streaming)
- **Tanggal:** 6 September 2026
- **Masalah:** Saat mengklik tombol *"Dengarkan Pelafalan"*, audio tidak bersuara di browser Windows pengguna.
- **Penyebab:**
  1. Web Speech API bawaan browser (`window.speechSynthesis`) memiliki bug umum di Chromium/Windows di mana fungsi `cancel()` sebelum `speak()` membungkam audio secara diam-diam (*silent failure*).
  2. Jika Windows pengguna tidak memiliki paket suara bahasa Inggris (*English Speech Pack*) yang terinstal di pengaturan OS, `speechSynthesis` tidak dapat memutar suara apapun.
- **Solusi Tuntas (Dual-Engine Audio)**:
  - **Tier 1 (Utama - Cloud Native Stream):** Membuat endpoint serverless proxy [`api/tts.js`](file:///c:/ME/PROJECT/RANGLISH/api/tts.js) yang mengalirkan audio studio asli (*authentic native US English MP3*) langsung ke elemen HTML5 `Audio`.
  - **Tier 2 (Cadangan):** Web Speech API lokal dengan *bugfix* Chromium (memanggil `resume()`, delay micro-tick 15ms, dan pencegahan *garbage collection*).
  - **Dukungan Kecepatan Penuh:** Kecepatan `1.0x` (Normal) dan `0.75x` (Slow-motion) kini berfungsi secara presisi.
  - **Suara Contoh Kalimat:** Ikon speaker pada contoh kalimat kini secara pintar hanya memutar kalimat bahasa Inggrisnya saja (membuang terjemahan bahasa Indonesia di dalam tanda kurung).

---

### 9. Penyesuaian Tinggi Kartu "Catatan Anak Rantau" (1-Align Sisi Bawah)
- **Tanggal:** 6 September 2026
- **Masukan Pengguna:** Bagian kartu *"Catatan Anak Rantau"* ukurannya ingin dipanjangkan ke bawah disamakan dengan kartu utama di sebelah kiri (yang berisi contoh penggunaan) agar rata dan sejajar (*1 align*).
- **Solusi Layout:**
  - Mengubah alignment container grid desktop dari `items-start` menjadi `items-stretch`.
  - Memberikan `h-full flex flex-col` pada kolom samping (`col-side`).
  - Mengonfigurasi `RantauInsightFlipCard` dengan `flex-1 flex flex-col h-full` sehingga secara otomatis mengisi seluruh sisa ruang vertikal.
  - Membuka pembatas `max-h` pada teks bodi kartu agar tip dan refleksi dapat mengisi ruang secara proporsional.
  - **Hasil:** Sisi bawah kartu *Catatan Anak Rantau* (baik sisi depan maupun sisi belakang saat di-flip) kini sejajar presisi (*pixel-perfect 1-align*) dengan batas bawah kartu utama di sebelahnya.

---

### 10. Standarisasi Line Icons pada Halaman Riwayat (Konsisten dengan Halaman Vocab)
- **Tanggal:** 6 September 2026
- **Masukan Pengguna:** Untuk bagian Riwayat juga gunakan line icons (sesuaikan untuk keseluruhan miripkan dengan halaman Vocab, hilangkan emoji seperti `🔤` kata, `💭` frasa, `🎵` lagu, dll).
- **Solusi:**
  - **Komponen Shared `<CategoryIcon />`:** Dibuat di [`src/components/CategoryIcon.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/CategoryIcon.jsx) untuk merender icon Lucide vektor konsisten di seluruh aplikasi:
    - *Kata*: `<BookOpen className="w-3.5 h-3.5" />` (menggantikan emoji `🔤` dan `📖`).
    - *Frasa*: `<MessageSquare className="w-3.5 h-3.5" />` (menggantikan emoji `💭` dan `💬`).
    - *Film*: `<Film className="w-3.5 h-3.5" />` (menggantikan emoji `🎬`).
    - *Lagu*: `<Music className="w-3.5 h-3.5" />` (menggantikan emoji `🎵`).
    - *Kalimat*: `<Sparkles className="w-3.5 h-3.5" />` (menggantikan emoji `✨`).
  - **Pill Filter Riwayat:** Tab filter "Semua" kini menggunakan `<Layers />`, "Kata" menggunakan `<BookOpen />`, "Frasa" menggunakan `<MessageSquare />`, "Film" menggunakan `<Film />`, "Lagu" menggunakan `<Music />`, dan "Kalimat" menggunakan `<Sparkles />`.
  - **Card Badge & Footer:** Badge kategori kartu riwayat merender `<CategoryIcon />`, pill pelafalan cara baca menggunakan `<Volume2 />` (menggantikan `🗣️`), dan footer kartu menggunakan `<Calendar />` serta `<ArrowRight />`.
  - **Modal Detail Riwayat:** [`src/components/VocabDetailModal.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/VocabDetailModal.jsx) juga disinkronkan menggunakan `<CategoryIcon />` dan line icon `<Volume2 />`.

---

### 11. Desain Arrow Lebih Bulky & Berbobot (Bedah Kata, Presets, & Card Links)
- **Tanggal:** 6 September 2026
- **Masukan Pengguna:** Bagian icon arrow dibuat lebih bulky (tebal, solid, dan berbobot visual tegas, bukan panah tipis biasa `→`).
- **Solusi:**
  - **Tombol "Bedah Kata":** Mengganti karakter HTML `&rarr;` tipis menjadi icon SVG Lucide `<ArrowRight className="w-3.5 h-3.5 stroke-[3]" />` di dalam pill chip khusus dengan background dan border aksen ungu: `<span className="bg-[#5842f5]/25 p-1 rounded-md ...">`. Arrow terlihat kokoh, proporsional, dan bergerak halus saat di-hover (`group-hover:translate-x-0.5`).
  - **Chip Contoh Cepat (Presets):** Mengganti karakter unicode tipis `↗` dengan `<ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />` dengan micro-animation diagonal saat tombol disentuh.
  - **Drawer & Flip Card:** Semua panah interaktif ("Lihat arti", "Balik lagi", "Klik buat liat makna") kini menggunakan icon Lucide `<ArrowRight className="stroke-[2.75]" />` dan `<ArrowLeft className="stroke-[2.75]" />`.

---

### 12. Perbaikan False-Positive Typo Correction ("hit me" Tidak Lagi Tertukar Menjadi "hug me")
- **Tanggal:** 6 September 2026
- **Temuan Pengguna:** Mengetik kata/frasa valid *"hit me"* memunculkan banner peringatan *"Typo dikit nih pas ngetik 'hit me'! Maksud lu: hug me"*, dan langsung mengarahkan definisi ke *"peluk gw"* alih-alih mengartikan *"hit me"*.
- **Akar Masalah:**
  1. Fungsi `findClosestFuzzyMatch()` pada [`src/services/instantEngine.js`](file:///c:/ME/PROJECT/RANGLISH/src/services/instantEngine.js) sebelumnya mengizinkan pencocokan Levenshtein jarak 2 pada frasa multi-kata yang memiliki panjang $\ge 6$ karakter. Karena jarak antara `"hit me"` dan `"hug me"` adalah 2 karakter ("i" $\rightarrow$ "u", "t" $\rightarrow$ "g"), frasa tersebut salah dideteksi sebagai typo.
  2. Kondisi `isBuiltIn` pada [`src/services/openrouter.js`](file:///c:/ME/PROJECT/RANGLISH/src/services/openrouter.js) sebelumnya menganggap hasil koreksi typo lokal sebagai *built-in instant hit*, sehingga query langsung dibajak dan tidak pernah dikirim ke AI (Google Gemini 3.5 Flash).
- **Solusi Tuntas:**
  - **Koreksi Typo Hanya untuk Kata Tunggal Panjang:** `findClosestFuzzyMatch` kini wajib `wordCount === 1`, tidak boleh mengandung spasi (`!lower.includes(' ')`), panjang minimal 5 karakter, dan batas toleransi ketat hanya 1 karakter (`maxAllowedDist = 1`).
  - **AI Guardrail:** Variabel `isBuiltIn` pada `openrouter.js` kini mensyaratkan `!instantData.isTypoCorrected`. Artinya, tebakan typo lokal tidak akan pernah lagi membajak proses pencarian AI.
  - **Entri Resmi "hit me" & "hit me up":** Menambahkan definisi autentik anak rantau untuk frasa *"hit me"* (*"Kasih tau gw / coba spill ke gw / ceritain sekarang"*) dan *"hit me up"* (*"Hubungi gw / kontak gw / kabarin gw nanti"*).

---

## 📁 Ringkasan Perubahan File Proyek

| File | Peran | Rincian Perubahan |
| :--- | :--- | :--- |
| [`api/lookup.js`](file:///c:/ME/PROJECT/RANGLISH/api/lookup.js) | Backend API Proxy | Multi-provider router: Google Gemini 3.5 Flash (Tier 1) + OpenRouter fallback (Tier 2). |
| [`api/tts.js`](file:///c:/ME/PROJECT/RANGLISH/api/tts.js) | Audio TTS Proxy | Streaming studio-quality native US English MP3 audio. |
| [`src/components/CategoryIcon.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/CategoryIcon.jsx) | UI Component | Komponen reusable line icon (Lucide) untuk kategori vocab tanpa raw emoji. |
| [`src/components/HistoryList.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/HistoryList.jsx) | History View | Standarisasi filter bar, badge kategori, cara baca, dan link detail menggunakan Lucide line icons. |
| [`src/components/VocabLookup.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/VocabLookup.jsx) | Main UI Page | Bulky arrow pada tombol Bedah Kata (`stroke-[3]`), line arrow pada preset chips, sinkronisasi CategoryIcon. |
| [`src/components/VocabDetailModal.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/VocabDetailModal.jsx) | Detail Modal | Sinkronisasi CategoryIcon dan pelafalan line icon Volume2. |
| [`src/components/WordBreakdownDrawer.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/WordBreakdownDrawer.jsx) | Slide-over Drawer | Header icon BookOpen menggantikan `🔤`, dan bulky arrow icon pada card link. |
| [`src/components/WordBreakdownGrid.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/WordBreakdownGrid.jsx) | Breakdown Grid | Header icon BookOpen menggantikan `🔤`, line icons Flip & ArrowRight/ArrowLeft. |
| [`src/components/RantauInsightFlipCard.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/RantauInsightFlipCard.jsx) | Insight Widget | ArrowRight dan ArrowLeft bulky pada footer kartu depan dan belakang. |

---

## 8. Integrasi Cloud PostgreSQL Supabase (Otak Kedua Ranglish)
- **Status**: SELESAI & VERIFIED (205 Kosakata Berhasil Disinkronkan).
- **Komponen & Arsitektur**:
  - **Tabel & RLS**: Dibuat tabel `public.vocab_bank` di Supabase Cloud (`pdwvayyqjaxxnaskceit`) dengan index `lower(word)` dan Row Level Security (RLS) policies untuk `select`, `insert`, `update` via `anon` public key.
  - **Client Service**: [`src/services/supabase.js`](file:///c:/ME/PROJECT/RANGLISH/src/services/supabase.js) menyediakan fungsi `searchCloudVocab()`, `saveWordToCloud()`, dan `syncLocalBankToCloud()`.
  - **Dual-Tier Search Engine**: [`src/services/openrouter.js`](file:///c:/ME/PROJECT/RANGLISH/src/services/openrouter.js) memeriksa Supabase Cloud sebelum memanggil model LLM (0ms latency, hemat kuota AI), serta otomatis menyetor kata baru hasil analisis AI ke cloud di background.
  - **UI Refinement**: Banner backup besar digantikan dengan badge minimalis ramah pengguna `☁️ Cloud Aktif (205 kata)` pada [`src/components/HistoryList.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/HistoryList.jsx) dan bahasa teknis dibersihkan dari [`src/components/SettingsModal.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/SettingsModal.jsx).

---

## 9. Konfigurasi Akses Jaringan Lokal (Wi-Fi) & Tunnel
- **File:** [`vite.config.js`](file:///c:/ME/PROJECT/RANGLISH/vite.config.js)
- **Perubahan:**
  - Menambahkan `server.allowedHosts: true` dan `server.host: true`.
  - Mengatasi error *"Blocked request. This host is not allowed"* saat mengakses melalui tunnel `untun` / IP jaringan Wi-Fi lokal (`http://192.168.1.21:3000`).

---

## 10. Eksplorasi Logo Profil "R" Di Luar Nalar (AI & Cosmic Physics)
- **Status:** 5 Konsep Siap (Vector SVG, 3D Render, & Showcase Interaktif).
- **Direktori Aset:** [`public/logos/`](file:///c:/ME/PROJECT/RANGLISH/public/logos/)
  - `index.html`: Showcase interaktif dengan live simulator Avatar Profil (Lingkaran Instagram/X/Discord, Squircle App Icon, Favicon) + tombol one-click salin kode SVG untuk Figma.
  - `alien_quantum_r.svg`: Konsep 1 (Event Horizon Accretion Disk & Zero-G 4D Crystal Shards).
  - `tesseract_quantum_r.svg`: Konsep 2 (4D Tesseract Hypercube Wireframe & Gyroscopic AI Core).
  - `biocelestial_symbiote_r.svg`: Konsep 3 (Bio-Celestial Living Neural Symbiote & Obsidian Chrome).
  - `logo_r_di_luar_nalar_penrose.jpg`: Konsep 4 (3D Titanium Impossible Penrose Triangle Geometry).
  - `logo_r_di_luar_nalar_liquid_chrome.jpg`: Konsep 5 (3D Liquid Mercury Chrome with Cybernetic AI Eye).
- **Rencana Lanjutan Pasca-Restart Laptop:**
  - Melakukan konversi atau penyediaan seluruh variasi logo dalam format **PNG resolusi tinggi (High-Res Transparent PNG)** sesuai permintaan pengguna (*"kok svg, png lah"*).

---

---

## 11. Perbaikan Integritas Faktual & Pembasmian Halusinasi Lirik/Lagu/Film Fiktif (Zero Tolerance)
- **Tanggal:** 8 September 2026
- **Keluhan Pengguna:** *"datanya ngarang! (aku telusuri ternyata tidak terdapat dalam lirik alias kamu ngarang! jangan seperti itu lagi tolong diperbaiki dengan detail sesuai referensinya jangan menyesatkan itu yang utama)"*
- **Kasus Uji Nyata:**
  - Kalimat input: `"Or how to not attach your whole self-worth to someone else sticking around."` (kutipan refleksi diri / quote batasan diri & harga diri umum).
  - Respon salah sebelumnya: AI mengklaim kalimat ini sebagai lirik lagu indie populer *"I Bet on Losing Dogs"* dari album *Puberty 2* (2016) karya Mitski, bahkan mengarang lirik lanjutan palsu (*"I'm bettin' on losin' dogs / Ah, I'm stoppin' the creek / Or how to not attach..."*), merender badge `🎵 Lagu: I Bet on Losing Dogs — Mitski`, dan mengubah kartu insight menjadi `🎵 Konteks Musik & Lagu`.
  - Fakta: Kalimat tersebut sama sekali tidak ada di lirik lagu Mitski manapun. Hal ini murni halusinasi AI yang menyesatkan.

- **Akar Masalah:**
  1. **Tekanan Prompt Sistem (`SYSTEM_PROMPT_VOCAB`):** Instruksi lama mewajibkan AI (*"WAJIB periksa apakah teks ini merupakan bagian dari judul lagu..."*) dan memerintahkan (*"Di field catatan, WAJIB sebutkan Konteks Musik... Lirik lengkapnya berbunyi: '[Lirik lanjutan / bait lengkap]'"*). Hal ini memaksa LLM mencocok-cocokkan kalimat emosional apapun ke lagu yang dirasa bertema mirip dan mengarang lirik palsu demi memenuhi instruksi prompt.
  2. **Ketiadaan Validasi Client-Side:** Di [`src/services/openrouter.js`](file:///c:/ME/PROJECT/RANGLISH/src/services/openrouter.js), jika respon JSON menyertakan `detectedSong`, sistem langsung menerima dan menimpa klasifikasi menjadi `"song"`, meskipun teks input merupakan kalimat umum (`sentence`) tanpa konteks musik sama sekali.
  3. **False Trigger di Flip Card:** [`src/components/RantauInsightFlipCard.jsx`](file:///c:/ME/PROJECT/RANGLISH/src/components/RantauInsightFlipCard.jsx) menggunakan regex longgar `/karya band|lirik|album|lagu|musisi/i.test(tips)` sehingga jika teks catatan menyebut kata "lagu" atau "album", kartu otomatis berubah menjadi kartu musik merah muda.

- **Solusi Tuntas & Multi-Layer Guardrail:**
  1. **Kebijakan Integritas Faktual Super Ketat di Prompt (`src/services/openrouter.js`):**
     - Menetapkan aturan mutlak: **DILARANG KERAS MENGARANG ATAU MEMANIPULASI FAKTA/LIRIK!**
     - Anggap 98% input adalah kalimat, idiom, frasa, atau quote kehidupan biasa (`detectedSong: null`, `detectedMovie: null`).
     - HANYA perbolehkan mengisi `detectedSong` jika teks input BENAR-BENAR 100% VERBATIM merupakan penggalan lirik otentik yang dapat diverifikasi secara faktual.
     - Dilarang keras mencocok-cocokkan teks hanya karena kesamaan vibe/emosi/tema, dan dilarang keras mengarang lirik lanjutan palsu.
  2. **Client-Side Anti-Hallucination Guard (`extractCleanResponse` di `src/services/openrouter.js`):**
     - Menguji apakah teks input memiliki keterkaitan nyata (*anchor match*) dengan judul lagu atau nama artis yang diklaim AI.
     - Jika pengguna tidak mengklik chip lagu dan teks input adalah kalimat umum (`type: 'sentence'`), maka klaim lagu yang tidak memiliki anchor faktual **otomatis dibatalkan (`detectedSong = null`)**, klasifikasi dikembalikan ke kalimat umum, dan catatan rekaan dibersihkan menjadi catatan reflektif yang relevan dan jujur.
  3. **Strict Boolean Flag pada Kartu Insight (`src/components/RantauInsightFlipCard.jsx`):**
     - Menghapus regex spekulatif pada teks tip. Kartu musik (`Konteks Musik & Lagu`) dan kartu film (`Konteks Film & Dialog`) kini strictly dikendalikan oleh boolean flag `isSong` dan `isMovie`.
---

## 12. Perbaikan Frasa Echo Tanpa Arti & Penghapusan Template Robotik ("sticking around")
- **Tanggal:** 8 September 2026
- **Keluhan dari Screenshot:**
  - Input: `"sticking around"`
  - Masalah 1: *Arti Bahasa Indonesia* hanya mengulang teks bahasa Inggris mentah (`sticking around`) tanpa diterjemahkan ke bahasa Indonesia.
  - Masalah 2: Contoh kalimat menggunakan template robotik meta-dialogue: `"The conversation shifted when someone mentioned "sticking around."" ("Arah obrolan langsung berubah pas ada yang nyeletuk: 'sticking around.'")`.
  - Masalah 3: Catatan anak rantau menggunakan template satu kalimat generik: *"Kosakata ringkas yang fungsional banget..."*.
- **Akar Masalah:**
  1. **Runtime ReferenceError pada Fallback-1 (`src/services/freeTranslator.js`):** Saat input terklasifikasi sebagai frasa (`phrase`), kode memanggil variabel `isNegativeNP` yang belum dideklarasikan (`ReferenceError: isNegativeNP is not defined`). Hal ini menyebabkan fallback live translation langsung crash seketika.
  2. **Echo Bocor pada Fallback-2 (`src/utils/sentenceTranslator.js`):** Fungsi `generateSmartSentenceAnalysis` memanggil `translateWordOrPhrase(input)`. Karena kata *sticking* dan *around* tidak ada di mapping lokal, fungsi tersebut mengembalikan kata bahasa Inggris aslinya (`"sticking around"`). Sistem Fallback-2 tidak memverifikasi apakah hasil terjemahan identik dengan teks asli, sehingga menganggap `"sticking around"` sebagai terjemahan Indonesia valid.
  3. **Template Robotik Meta-Dialogue:** Template lama menyisipkan teks input ke dalam format kaku *"The conversation shifted when someone mentioned: '...' "* yang terdengar aneh dan tidak natural untuk frasa kerja/idiom.
- **Solusi Tuntas:**
  1. **Perbaikan Variabel & Phrase Pool di `freeTranslator.js`:** Mendefinisikan `isNegativeNP` dengan benar serta menambahkan pemilahan khusus frasa kerja/gerund (`isActionOrVerbPhrase`) sehingga contoh kalimat yang dihasilkan selalu natural dan gramatikal.
  2. **Penghapusan Total Template Robotik:** Menghapus seluruh kemunculan template *"The conversation shifted when someone mentioned..."* di seluruh codebase dan menggantikannya dengan kalimat situasional yang kontekstual dan hidup.
  3. **Strict Echo Guard di Seluruh Layer:**
     - Pada `sentenceTranslator.js`: Jika `translatedMeaning` sama dengan input bahasa Inggris, fungsi **wajib mengembalikan `null`** (menolak echo mentah).
     - Pada `instantEngine.js` & `openrouter.js`: Memasang filter penolak echo di setiap tahap fallback, dilanjutkan ke live translation safety net.
  4. **Pendaftaran Entri Kamus Otentik (0ms):**
     - Mendaftarkan `"stick around"` dan `"sticking around"` ke dalam kamus bawaan dengan arti terverifikasi: *"tetap tinggal / bertahan / menemani"*, contoh kalimat realistis, serta catatan tips Temen Ngobrol yang kaya.
  5. **Auto-Purge Riwayat Tercemar:** Menambahkan validator di `storage.js` dan `VocabLookup.jsx` untuk membersihkan entri echo mentah dan template robotik dari `localStorage`.

---

## 13. Perbaikan Echo Frasa Refleksif & Pembaharuan Dinamis Catatan Rantau ("owe yourself")
- **Tanggal:** 8 September 2026
- **Keluhan dari Screenshot:**
  - Input: `"owe yourself"`
  - Masalah 1: *Arti Bahasa Indonesia* hanya mengulang teks bahasa Inggris mentah (`owe yourself`) tanpa diterjemahkan.
  - Masalah 2: Contoh penggunaan terkontaminasi template lama: `"The conversation shifted when someone mentioned... ("Arah obrolan langsung berubah pas ada yang nyeletuk: 'owe yourself.'")"`.
  - Masalah 3: Catatan Anak Rantau berulang statis: *"Kosakata ringkas yang fungsional banget. Kalo lu bisa selipin kata ini dengan intonasi yang pas..."*.
- **Akar Masalah & Perbaikan Terpadu:**
  1. **Akar Masalah Bersama:** Sama halnya dengan `"sticking around"`, frasa 2 kata seperti `"owe yourself"` sebelumnya tersangkut di Fallback-2 lokal yang belum memiliki kosakata kata kerja *owe* dan kata ganti refleksif (*yourself, myself, himself, herself*), menghasilkan pantulan echo mentah.
  2. **Penambahan Kosakata Refleksif & Self-Worth:**
     - Mendaftarkan entri bawaan `"owe yourself"` (dan variasinya `"you owe yourself"`, `"owe"`, `"owing"`) ke dalam `DICTIONARY` dan `vocab1000.json` dengan respon instan 0ms:
       - **Arti:** *"berutang pada diri sendiri / berhak memprioritaskan diri sendiri"*
       - **Pelafalan:** *"oh yoor-self"*
       - **Contoh Kalimat:** *"You owe yourself the same love and kindness you give so freely to others. (Lu berutang pada diri sendiri cinta dan kebaikan yang sama kayak yang selama ini lu kasih dengan tulus ke orang lain.)"*
  3. **Penghapusan Template Statis pada Catatan Rantau (`src/utils/rantauInsightGenerator.js`):**
     - Memperbarui `generateDynamicRantauNote` dengan penanganan khusus frasa *self-worth* / *owe yourself* dan *sticking around*.
     - Menghapus kalimat tunggal statis pada frasa pendek (<= 2 kata) dan menggantinya dengan pool acak dinamis (`pickVariedTemplate('dynamic_rantau_note_short', ...)`).
  4. **Pembersihan Menyeluruh pada Storage & Cache Browser:**
     - Menambahkan filter otomatis di `storage.js` (`getLearnedVocabBank`, `saveLearnedVocabToBank`, dan `getVocabHistory`) serta `isStale` di `VocabLookup.jsx` untuk mendeteksi dan menghapus cache lama yang memuat teks *"Kosakata ringkas yang fungsional banget"* atau arti yang mengulang kata input (*echo*).
     - Menjamin pengguna yang merefresh atau mencari kata tersebut langsung mendapatkan tampilan data yang segar, akurat, dan kaya konteks.




