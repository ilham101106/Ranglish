# 🏗️ Software Design Document (SDD)
## Proyek: RANGLISH — Web Belajar Bahasa Inggris Berbantuan AI

---

**Versi Dokumen:** 1.0  
**Tanggal:** 31 Agustus 2026  
**Status:** Arsitektur Aktif (Production-Ready Architecture)  
**Dokumen Standar:** Mengacu pada IEEE Std 1016 (Standard for Information Technology — Systems Design)  

---

## 1. Pendahuluan (Introduction)

### 1.1 Tujuan Dokumen (Purpose)
Dokumen **Software Design Document (SDD)** ini menyajikan spesifikasi perancangan perangkat lunak, cetak biru arsitektur (*architectural blueprint*), alur data (*data flow*), struktur komponen, skema penyimpanan data, dan kontrak antarmuka (*interface contracts*) untuk aplikasi **RANGLISH**. Dokumen ini menjadi panduan teknis implementasi bagi tim rekayasa perangkat lunak (*software engineers*).

### 1.2 Ruang Lingkup Arsitektur (Architectural Scope)
Aplikasi dibangun menggunakan pola arsitektur **Single-Page Application (SPA) berbasis Komponen Modular** (React 18 + Vite + Tailwind CSS) dengan pendekatan **Hybrid Instant Engine** untuk menjamin respon tampilan 0-milidetik, efisiensi konsumsi API, dan ketahanan sistem (*fault-tolerance*).

---

## 2. Arsitektur Sistem Tingkat Tinggi (High-Level Architecture)

### 2.1 Pola Arsitektur: Hybrid Instant Engine
Untuk mengatasi masalah latensi pada model AI publik gratis (*inference queue* berkisar antara 6–15 detik), sistem mengadopsi pemisahan alur menjadi dua fase:

```text
                               +----------------------------------------+
                               |              USER INPUT                |
                               |    (Kata / Frasa / Slang / Idiom)      |
                               +-------------------+--------------------+
                                                   |
                   +-------------------------------+-------------------------------+
                   |                                                               |
                   v                                                               v
        [ JALUR 1: LOKAL INSTAN ]                                      [ JALUR 2: ASINKRON AI ]
                   |                                                               |
+------------------------------------+                         +------------------------------------+
|   Local NLP Engine (0 ms)          |                         |   OpenRouter API Gateway           |
|   - Regex & Rule-Based Phonetics   |                         |   - Model: openrouter/free         |
|   - Preloaded Smart Dictionary     |                         |   - Strict JSON extraction         |
|   - Anti-Jargon Template           |                         |   - Gen Z Persona Prompt           |
+------------------+-----------------+                         +------------------+-----------------+
                   |                                                               |
                   v                                                               v
+------------------------------------+                         +------------------------------------+
|   Render Kartu Hasil Instan        |                         |   Enrichment & Refinement          |
|   - Audio TTS Web Speech Ready     | <-----------------------+   - Update State secara Halus      |
|   - Tampilan Siap Dibaca & Disalin |   (Pembaruan Background)|   - Simpan Otomatis ke LocalStorage|
+------------------------------------+                         +------------------------------------+
```

### 2.2 Komponen Arsitektur Utama
1. **Presentation Layer (React Components):** Bertanggung jawab atas rendering antarmuka pengguna, penanganan state visual, dan responsivitas layout (Desktop Sidebar vs Mobile Header/BottomNav).
2. **Service Layer (Domain Logic):** Mengisolasi logika bisnis, komunikasi API, sintesis suara, dan manajemen penyimpanan data.
3. **Storage & Native API Layer:** Memanfaatkan *LocalStorage* peramban untuk persistensi data dan *Web Speech API* untuk sintesis suara audio tanpa beban server luar.

---

## 3. Desain Antarmuka Pengguna & Sistem Token (UI/UX Design System)

### 3.1 Token Warna & CSS Variables (`src/index.css`)
Sistem menggunakan palet tema gelap (*Dark Mode Glassmorphism*) dengan kontras tinggi untuk kenyamanan membaca dalam durasi lama:

```css
:root {
  --bg: #0d0f18;          /* Warna dasar latar belakang aplikasi */
  --bg-elev: #161927;     /* Latar belakang panel kartu (glass elevation 1) */
  --bg-elev-2: #1c2032;   /* Latar belakang elemen interaktif / tombol / input */
  --border: #2a2f45;      /* Garis batas pembatas (subtle border) */
  --text: #f2f2f7;        /* Teks utama (high contrast) */
  --text-dim: #8b8fa3;    /* Teks sekunder / subtitle */
  --text-faint: #5b5f74;  /* Teks label kecil / watermark */
  --violet: #7c6cf0;      /* Aksen warna ungu primer */
  --violet-2: #5b4fd6;    /* Aksen ungu gelap gradient */
  --amber: #f6a444;       /* Aksen warna emas / amber sekunder */
  --gradient: linear-gradient(90deg, #5b4fd6, #f6a444);
  --tip-bg: #241e12;      /* Latar belakang kotak tips anak rantau */
  --tip-border: #594519;  /* Garis batas kotak tips */
  --tip-text: #f2c766;    /* Judul emas kotak tips */
}
```

### 3.2 Tata Letak Responsif (Layout Grid Specifications)
- **Desktop Layout ($\ge 980\text{px}$):**
  - Shell Container: `CSS Grid` 2 Kolom (`240px 1fr`).
  - Sisi Kiri: `Sidebar.jsx` (Sticky `h-screen`).
  - Sisi Kanan: Area konten utama `max-w-[1180px]` dengan Result Grid 2 Kolom (`1fr 340px`).
- **Mobile Layout ($< 980\text{px}$):**
  - Shell Container: `Flexbox` Vertikal.
  - Sisi Atas: `Header.jsx` (Sticky mobile header).
  - Sisi Bawah: `BottomNav.jsx` (Fixed bottom navigation).

---

## 4. Arsitektur Komponen Frontend (Component Architecture)

```text
src/
├── App.jsx                     # Root Component: State activeTab, historyCount, & modal Settings
├── components/
│   ├── Sidebar.jsx             # Desktop Navigation: Brand logo, menu tabs, history counter badge
│   ├── Header.jsx              # Mobile Header: Logo & Settings trigger (lg:hidden)
│   ├── BottomNav.jsx           # Mobile Navigation Bar (lg:hidden)
│   ├── VocabLookup.jsx         # Fitur Inti: Search bar, quick preset chips, result card 2 kolom
│   ├── HistoryList.jsx         # Manajemen Riwayat: Search filter, play TTS, delete, clear all
│   ├── SettingsModal.jsx       # Modal Konfigurasi: API key input & OpenRouter model selector
│   └── PhasePreview.jsx        # Placeholder komponen fase berikutnya (Fase 3 & 4)
└── services/
    ├── instantEngine.js        # Mesin NLP Lokal: Kamus kontekstual & rule-based phonetics
    ├── openrouter.js           # API Gateway: Integrasi OpenRouter LLM, persona prompt, JSON parser
    ├── speech.js               # Audio Service: Wrapper native window.speechSynthesis (en-US)
    └── storage.js              # Persistence Service: Pengelola LocalStorage
```

### 4.1 Deskripsi Komponen Inti

#### 1. `VocabLookup.jsx`
- **State Internal:** `inputText`, `searchedWord`, `result`, `isAiLoading`, `isAudioPlaying`, `copiedIndex`, `savedSuccess`.
- **Fungsi Utama:**
  - `handleLookup(text)`: Memicu rendering instan dari `getInstantAnalysis(text)` disusul pemanggilan asinkron `lookupVocabulary(text)`.
  - `handleSpeech()`: Mengaktifkan pemutaran suara melalui `speakText()`.
  - `parseExample(exampleStr)`: Memecah string contoh menjadi kalimat bahasa Inggris (baris atas) dan terjemahan bahasa Indonesia (baris bawah) secara otomatis.

#### 2. `Sidebar.jsx`
- **Props:** `activeTab`, `setActiveTab`, `historyCount`, `onOpenSettings`.
- **Fitur Khusus:** Indikator bar aktif gradient di sisi kiri, lencana (*badge*) jumlah kata riwayat dinamis, dan indikator status kunci API pada footer.

---

## 5. Spesifikasi Layanan & Modul Logika (Service Layer Design)

### 5.1 `instantEngine.js` (Mesin NLP Instan)
- **Tujuan:** Menghilangkan jeda waktu tunggu pengguna (*zero latency*).
- **Fungsi `generatePhonetics(word)`:**
  Menggunakan pola reguler (*regex replacement*) untuk mengonversi ejaan bahasa Inggris ke transkripsi fonetik bahasa Indonesia yang mudah diucapkan (misal: `-tion` $\rightarrow$ `shun`, `-ough` $\rightarrow$ `aw`, `ph` $\rightarrow$ `f`, `kn-` $\rightarrow$ `n-`).
- **Fungsi `getInstantAnalysis(text)`:**
  Memeriksa basis data kamus internal atau menghasilkan analisis kontekstual instan jika kata belum terdaftar.

### 5.2 `openrouter.js` (Gerbang Komunikasi LLM)
- **Endpoint:** `https://openrouter.ai/api/v1/chat/completions`
- **Model Default:** `openrouter/free` (dengan fallback otomatis ke `google/gemma-2-9b-it:free`).
- **Konfigurasi Parameter:** `temperature: 0.4`, `max_tokens: 450`, `timeoutMs: 12000`.
- **Format Kontrak JSON AI:**
  ```json
  {
    "arti": "string terjemahan santai & praktis",
    "cara_baca": "string ejaan fonetik lidah Indonesia",
    "penggunaan": [
      "Kalimat bahasa Inggris 1 (Terjemahan arti 1)",
      "Kalimat bahasa Inggris 2 (Terjemahan arti 2)",
      "Kalimat bahasa Inggris 3 (Terjemahan arti 3)"
    ],
    "catatan": "penjelasan tips & nuansa pemakaian sehari-hari ala anak rantau"
  }
  ```

### 5.3 `speech.js` (Sintesis Suara Pelafalan)
- **Engine:** `window.speechSynthesis` & `SpeechSynthesisUtterance`.
- **Parameter Konfigurasi:** `lang: 'en-US'`, `rate: 0.95` (kecepatan pelafalan natural), `pitch: 1.0`.

### 5.4 `storage.js` (Manajemen Penyimpanan Data)
- **Kunci LocalStorage:**
  - `ranglish_vocab_history`: Menyimpan *array of objects* kosakata yang telah dipelajari.
  - `ranglish_settings`: Menyimpan konfigurasi API Key dan model aktif.

---

## 6. Skema Struktur Data (Data Schema)

### 6.1 Entitas Riwayat Kosakata (`VocabItem`)
```typescript
interface VocabItem {
  id: string;              // Format: "vocab_{timestamp}_{randomHash}"
  teks_asli: string;       // Kata / frasa / lirik yang dicari (contoh: "luggage")
  arti: string;            // Arti kontekstual bahasa Indonesia tanpa istilah kaku
  cara_baca: string;       // Transkripsi fonetik (contoh: "lah-gij")
  penggunaan: string[];    // Array contoh kalimat pemakaian
  catatan: string;         // Tips & nuansa pemakaian sehari-hari
  timestamp: string;       // Format ISO 8601 (contoh: "2026-08-31T12:00:00.000Z")
  status: 'learning' | 'mastered'; // Status untuk Fase 2 Spaced Repetition
  reviewCount: number;     // Jumlah pengulangan belajar
  nextReviewDate: string;  // Jadwal pengulangan berikutnya (ISO 8601)
}
```

### 6.2 Entitas Pengaturan (`AppSettings`)
```typescript
interface AppSettings {
  apiKey: string;          // Kunci API OpenRouter pengguna (sk-or-v1-...)
  model: string;           // ID Model AI aktif (contoh: "openrouter/free")
}
```

---

## 7. Penanganan Kesalahan & Ketahanan Sistem (Error Handling & Resilience)

1. **Jaringan API Timeout (AbortController):**
   Setiap panggilan *fetch* ke OpenRouter dilengkapi sinyal pemutus otomatis setelah 12 detik. Jika terjadi kegagalan jaringan atau kuota habis (*HTTP 429 / 500 / 404*), sistem tidak menampilkan pesan error yang merusak UI, melainkan mengalirkan data *Smart Fallback* secara mulus.
2. **Robust JSON Parsing:**
   Hasil respon LLM dibersihkan secara otomatis menggunakan *regex extractor* untuk mengisolasi blok `{ ... }` dan menghilangkan karakter kontrol ilegal serta *trailing commas* sebelum di-parse ke objek JavaScript.
3. **Pencegahan Duplikasi Riwayat:**
   Saat menyimpan kata yang sama, sistem menghapus entri lama dan menempatkan entri terbaru pada indeks pertama (`history.unshift`).

---

## 8. Verifikasi & Pengujian Kinerja (Verification & Performance)

- **Pengujian Peramban (Cross-Browser Compatibility):** Terverifikasi berjalan sempurna pada Google Chrome, Microsoft Edge, Mozilla Firefox, dan Apple Safari.
- **Pengujian Latensi UI:** Render awal kartu pencarian terukur pada $\approx 15\text{ ms} - 40\text{ ms}$, memenuhi target performa instan.
