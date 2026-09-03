# 📄 Software Requirements Specification (SRS)
## Proyek: RANGLISH — Web Belajar Bahasa Inggris Berbantuan AI

---

**Versi Dokumen:** 1.0  
**Tanggal:** 31 Agustus 2026  
**Status:** Disetujui (Approved)  
**Dokumen Standar:** Mengacu pada IEEE Std 830 / ISO/IEC/IEEE 29148  

---

## 1. Pendahuluan (Introduction)

### 1.1 Tujuan Dokumen (Purpose)
Dokumen **Software Requirements Specification (SRS)** ini merinci seluruh kebutuhan fungsional (*functional requirements*) dan non-fungsional (*non-functional requirements*) untuk aplikasi **RANGLISH**. Dokumen ini ditujukan sebagai acuan utama bagi tim pengembang, penguji perangkat lunak, dan pemangku kepentingan dalam memahami batasan, alur interaksi, dan kapabilitas sistem.

### 1.2 Cakupan Produk (Product Scope)
**RANGLISH** adalah aplikasi web edukasi berbasis kecerdasan buatan (*AI-assisted language learning web application*) yang dirancang khusus untuk memfasilitasi pembelajar bahasa Inggris pemula hingga menengah di Indonesia. Aplikasi ini berfokus pada konten otentik (lirik lagu, dialog film, caption media sosial) dengan pendekatan persona santai *"Anak Rantau"* untuk meningkatkan retensi kosakata dan aplikasi praktis tanpa hambatan istilah tata bahasa (*grammar jargon*) yang kaku.

### 1.3 Definisi, Akronim, dan Singkatan
- **SRS:** Software Requirements Specification
- **SDD:** Software Design Document
- **LLM:** Large Language Model
- **TTS:** Text-to-Speech
- **NLP:** Natural Language Processing
- **MVP:** Minimum Viable Product
- **Spaced Repetition:** Teknik belajar berjarak berdasarkan kurva lupa (*forgetting curve*).
- **Hybrid Instant Engine:** Arsitektur gabungan mesin lokal instan 0-ms dan pemrosesan AI asinkron.

---

## 2. Deskripsi Umum Sistem (Overall Description)

### 2.1 Perspektif Produk
RANGLISH beroperasi secara mandiri sebagai *Client-Side Web Application* (SPA - Single Page Application) yang mengintegrasikan Web Speech API bawaan peramban dan OpenRouter API untuk pengayaan konteks bahasa berbasis LLM.

### 2.2 Profil Pengguna & Persona (Target Audience)
1. **Siswa / Mahasiswa / Fresh Graduate:**
   - Sering mengonsumsi konten media sosial (TikTok, Instagram, YouTube) dan lagu berbahasa Inggris.
   - Sering merasa bingung terhadap kata slang atau idiom baru.
   - Menginginkan penjelasan yang singkat, padat, dan memakai bahasa gaul sehari-hari (*"lu"*, *"gue"*, *"asli"*, *"gaspol"*).
2. **Pembelajar Bahasa Mandiri (Self-Taught Learners):**
   - Merasa kesulitan jika diajari dengan istilah tata bahasa teknis seperti *uncountable noun*, *gerund*, atau *past participle*.
   - Membutuhkan sistem pelafalan suara langsung untuk mengasah *listening* dan *speaking*.

### 2.3 Batasan Sistem (Constraints)
- Aplikasi berjalan di lingkungan peramban modern (*Chrome, Safari, Edge, Firefox*) dengan dukungan Web Speech API dan LocalStorage.
- Model AI eksternal memanfaatkan kuota gratis (*free-tier*) OpenRouter API, sehingga sistem harus memiliki proteksi fallback cerdas agar tidak bergantung 100% pada latensi server pihak ketiga.

---

## 3. Kebutuhan Fungsional (Functional Requirements)

### FR-01: Pencarian Kosakata Instan (Instant Vocabulary Lookup)
- **FR-01.1:** Sistem wajib menyediakan kolom input pencarian teks untuk memasukkan kata, frasa, idiom, atau kalimat bahasa Inggris.
- **FR-01.2:** Sistem wajib merespons pencarian dalam waktu maksimal 200 ms menggunakan mesin *Hybrid Instant Engine*.
- **FR-01.3:** Sistem wajib menampilkan hasil analisis yang mencakup:
  1. Kata / frasa yang dicari.
  2. Ejaan fonetik sederhana (*pronunciation guide*) yang mudah dibaca lidah orang Indonesia.
  3. Arti bahasa Indonesia kontekstual dengan gaya bahasa ramah tanpa istilah tata bahasa yang kaku (*anti-jargon*).
  4. Minimal 2–3 contoh kalimat penggunaan otentik (disertai terjemahan bahasa Indonesia di baris bawah).
  5. Kotak tips & nuansa pemakaian sehari-hari (*"Tips & Nuances Ala Anak Rantau"*).
- **FR-01.4:** Sistem menyediakan tombol salin (*copy to clipboard*) untuk setiap kalimat contoh.
- **FR-01.5:** Sistem menyediakan tombol contoh cepat (*Quick Preset Chips*) yang berisi kategori Lirik Lagu, Dialog Film, Slang Sosmed, dan Everyday Phrase.

### FR-02: Sintesis Suara Pelafalan (Native Audio Text-to-Speech)
- **FR-02.1:** Sistem wajib menyediakan tombol *"Dengarkan Pelafalan"* untuk memutar audio kata atau frasa dalam aksen bahasa Inggris natural (`en-US`).
- **FR-02.2:** Pemutaran audio tidak boleh memicu permintaan jaringan eksternal berbayar (menggunakan native `window.speechSynthesis`).
- **FR-02.3:** Sistem wajib menampilkan indikator visual animasi *sound wave* saat audio sedang diputar.

### FR-03: Riwayat Kosakata & Persistensi Lokal (Vocab History)
- **FR-03.1:** Setiap kata atau frasa yang berhasil dicari wajib otomatis tersimpan ke dalam penyimpanan lokal peramban (*LocalStorage*).
- **FR-03.2:** Sistem wajib mencegah duplikasi data riwayat dengan memperbarui urutan kata yang baru dicari ke posisi teratas.
- **FR-03.3:** Tab Riwayat wajib menampilkan daftar kata tersimpan, waktu pencarian, fitur pencarian internal, tombol dengarkan suara, dan tombol hapus.
- **FR-03.4:** Sistem wajib menyediakan tombol hapus seluruh riwayat (*Clear All*) dengan konfirmasi pengguna.

### FR-04: Pengaturan & Konfigurasi API (Settings & AI Customization)
- **FR-04.1:** Sistem wajib menyediakan antarmuka modal pengaturan untuk memasukkan kunci API OpenRouter kustom.
- **FR-04.2:** Sistem menyediakan pilihan model AI gratis resmi OpenRouter (default: `openrouter/free`).
- **FR-04.3:** Sistem wajib mendukung mode demo/fallback cerdas secara penuh tanpa mengharuskan pengguna memasukkan kunci API.

### FR-05: Antarmuka Adaptif Multi-Platform (Responsive Design)
- **FR-05.1:** Pada layar desktop ($\ge 980\text{px}$), sistem wajib menampilkan navigasi *Sidebar Sticky* di sisi kiri dan tata letak hasil 2 kolom (*Two-Column Grid*).
- **FR-05.2:** Pada layar mobile ($< 980\text{px}$), sistem wajib menampilkan *Header* atas ringkas dan *Bottom Navigation Bar* bawah.

### FR-06: Roadmap Pengembangan Mendatang (Future Requirements)
- **FR-06.1 (Fase 2):** Sistem Spaced Repetition berbasis *flashcard swipe* dengan penanda *"Sudah Inget"* / *"Masih Lupa"*.
- **FR-06.2 (Fase 3):** *Writing Checker* dengan persona koreksi santai anak rantau.
- **FR-06.3 (Fase 4):** *Chat Multi-Karakter AI* dengan 6 persona percakapan 100% bahasa Inggris.

---

## 4. Kebutuhan Non-Fungsional (Non-Functional Requirements)

### 4.1 Kinerja (Performance)
- **Waktu Respons Tampilan:** Hasil pencarian awal wajib tampil dalam waktu $< 200\text{ ms}$ pada 99% kueri berkat mesin lokal instan.
- **Waktu Muat Awal (Initial Load):** Ukuran bundle aplikasi web teroptimasi $< 300\text{ KB}$ (Gzip) dengan First Contentful Paint (FCP) $< 1.2\text{ detik}$.

### 4.2 Keandalan & Ketersediaan (Reliability & Availability)
- **Zero-Crash Resilience:** Jika terjadi kegagalan jaringan eksternal atau server OpenRouter mengalami *rate limit / queue timeout*, aplikasi tidak boleh mengalami *blank screen* atau *freeze*, melainkan otomatis menampilkan data *Smart Fallback*.
- **Offline Readiness:** Fitur pencarian kata dalam kamus bawaan dan audio TTS tetap dapat beroperasi tanpa koneksi internet aktif.

### 4.3 Kegunaan (Usability)
- **Tingkat Keterbacaan:** Menggunakan tipografi modern *Plus Jakarta Sans* dengan rasio kontras warna standar WCAG AA pada tema dark mode.
- **Kejelasan Bahasa:** Bahasa penjelasan 100% bebas dari istilah teknis linguistik yang membingungkan orang awam.

### 4.4 Keamanan & Privasi (Security & Privacy)
- **Penyimpanan Lokal Saja:** Riwayat belajar dan kunci API pengguna disimpan secara privat di dalam peramban lokal masing-masing (`localStorage`) tanpa dikirimkan ke server backend privat pihak ketiga.

---

## 5. Matriks Ketertelusuran Kebutuhan (Traceability Matrix)

| ID Kebutuhan | Komponen Frontend | Service Terkait | Status Implementasi |
|---|---|---|:---:|
| **FR-01** (Lookup) | `VocabLookup.jsx` | `instantEngine.js`, `openrouter.js` | 🟢 Terverifikasi Selesai |
| **FR-02** (TTS Audio) | `VocabLookup.jsx` | `speech.js` | 🟢 Terverifikasi Selesai |
| **FR-03** (Riwayat) | `HistoryList.jsx`, `Sidebar.jsx` | `storage.js` | 🟢 Terverifikasi Selesai |
| **FR-04** (Settings) | `SettingsModal.jsx` | `storage.js` | 🟢 Terverifikasi Selesai |
| **FR-05** (Responsive) | `App.jsx`, `Sidebar.jsx`, `Header.jsx`, `BottomNav.jsx` | `index.css` | 🟢 Terverifikasi Selesai |
| **FR-06** (Fase 2-6) | `PhasePreview.jsx` | - | 🟡 Dalam Antrean Roadmap |
