# PRD: Ranglish
### Product Requirements Document — Web Belajar Bahasa Inggris Berbantuan AI

**Tagline:** *Jago Inggris ala Anak Rantau*

---

## 1. Latar Belakang

Proses cari arti kata Inggris selama ini masih *fragmented* — harus salin kata, paste ke Google Translate, baru tau arti, cara baca, dan pengucapannya. Nggak ada satu tempat yang langsung kasih arti + cara baca + pengucapan + contoh penggunaan sekaligus.

Beberapa insight personal yang jadi dasar produk ini:
- Cara belajar paling efektif justru datang dari **konten otentik** — film, lagu, dan klip pendek di media sosial — bukan dari textbook atau daftar kosakata kering.
- Bagian bahasa Inggris yang paling susah adalah **speaking**.
- Kendala paling sering: **lupa kosakata** yang udah pernah dipelajari (nggak ada sistem review/pengulangan).

## 2. Product Vision

**Ranglish** bukan sekadar tools translate — tapi teman belajar yang membantu kosakata bahasa Inggris benar-benar **nempel di otak** dan langsung **dipraktekin**, dengan gaya belajar yang santai dan relate seperti diajarin teman sendiri yang baru pulang merantau (kuliah/tinggal di luar negeri), bukan guru formal.

**Nilai Jual Utama:** *"Fokus ke pembelajaran, bukan sekadar translate."*

## 3. Konsep Inti: Personalized Immersive Learning Loop

```
Input konten asli (lirik/dialog film/klip sosmed)
        ↓
Kata/frasa susah tersimpan otomatis ("kotak belajar")
        ↓
Dipraktekin di speaking practice pakai kata sendiri
        ↓
Sistem belajar pola kelemahan personal user
        ↓
(kembali ke atas, materi makin personal)
```

## 4. Fitur Produk

### 4.1 Vocabulary Lookup *(MVP — Fase 1)*
- Input kata/kalimat Inggris dari sumber apa pun: lirik lagu, dialog film, caption/klip media sosial yang lagi tren.
- Output: arti, cara baca (fonetik), audio pengucapan, contoh penggunaan dalam beberapa konteks kalimat.
- Termasuk penjelasan slang/idiom/ekspresi casual yang sering muncul di konten sosmed, bukan cuma arti kamus formal.
- **Bahasa penjelasan:** Bahasa Indonesia santai.

### 4.2 Quick Learning + Retention *(Fase 2)*
- Format kartu singkat, swipe-card style (mirip scroll sosmed), 10-15 detik per kartu.
- Sistem *spaced repetition*: kata yang dipelajari muncul lagi terjadwal (besok → 3 hari → seminggu), berdasarkan prinsip *forgetting curve*.
- Kata yang sama muncul dalam contoh kalimat yang berbeda-beda tiap kali diulang, biar makin nempel di berbagai konteks.

### 4.3 Writing Checker *(Fase 3)*
- User paste/ketik tulisan Inggris → AI cek grammar, word choice, dan naturalness.
- Bukan cuma bilang "salah", tapi jelasin kenapa dan kasih versi yang lebih natural.
- **Persona:** teman yang habis kuliah/tinggal di luar negeri, lagi bantu koreksi tulisan temen/adik kelas sendiri — bukan formal kayak guru.
- **Gaya bahasa:** Bahasa Indonesia santai & blak-blakan, pakai filler words ("sih", "gitu", "emm") dan ekspresi reaktif ("anjir", "jir", "kocak", "apasih", "wkwk", "hehe"). Tetap akurat secara teknis grammar walau gayanya santai.
- **Koreksi tulisan tetap dalam Bahasa Inggris**, penjelasannya dalam Bahasa Indonesia.

  > Contoh: *"anjir ini ceritanya cute banget btw, tapi ada 1-2 hal yang common mistake sih, dulu gue juga sering ketuker ini pas awal-awal wkwk — 'I go' harusnya 'I went' nih, soalnya kejadian kemarin kan, past tense..."*

### 4.4 Chat Multi-Karakter *(Fase 4)*
Simulasi ngobrol dengan 6 karakter AI berbeda gaya, supaya user terbiasa dengan berbagai ragam bahasa Inggris. **Chat 100% dalam Bahasa Inggris** (termasuk slang-nya) — ini fitur immersion, bukan fitur penjelasan.

| Karakter | Persona | Gaya Bahasa | Fungsi Belajar |
|---|---|---|---|
| **Nova** | Temen kuliah paling deket — chaotic, suka spam chat, rewel, asik, cerita random ganti topik, pengetahuan luas | Casual banget, slang ("bro", "ngl", "fr fr", "lowkey", "no cap", "W", "L", "idk", "tbh"), kirim beberapa pesan pendek beruntun | Exposure bahasa Inggris sehari-hari yang natural |
| **Maya** | Profesional — sopan, terstruktur, sabar, ramah | Business English, kalimat rapi, jarang slang | Latihan konteks formal (interview, kerja) |
| **Leo** | Traveler — ramah, kepo, suka nanya balik | Netral-casual, banyak pertanyaan conversational | Latihan conversational flow |
| **Claire** | Mentor sabar — baik, ngoreksi halus tanpa bikin minder | Jelas, nggak buru-buru, kasih alternatif kalimat natural | Karakter "aman" buat user yang masih insecure |
| **[TBD]** | Sahabat perempuan (non-romantis) — supportive, suka curhat-curhatan, perhatian | Casual-warm, sering nanya kabar/perasaan | Latihan ekspresi emosi/perasaan |
| **Dean** | "Annoying frenemy" — suka nyindir halus, kompetitif, suka flex (bercanda, bukan abusif) | Sarkastik, komentar julid dibungkus "just kidding" | Latihan ngenalin nada sarkastik & respons assertive |

### 4.5 Audio Storytelling *(Fase 5)*
- Cerita pendek (level kesulitan adaptif) dinarasikan dalam audio, sumber dari cerita AI-generated original atau bahan domain publik (hindari isu hak cipta).
- Interactive transcript berjalan bareng audio (mirip karaoke), kata susah bisa di-klik untuk penjelasan.
- Sesi "retell the story" setelah dengar cerita — melatih listening + speaking sekaligus.

### 4.6 Speaking Practice — Voice Conversation *(Fase 6, ditunda)*
- Menggunakan kata yang baru dipelajari user sebagai bahan latihan ngomong.
- Voice real-time (STT → LLM → TTS) ditunda dulu — kompleksitas teknis tinggi, dan kombinasi tools gratis kemungkinan besar belum senatural ChatGPT voice mode. Fokus fitur lain dulu.

## 5. Spesifikasi Teknis

| Komponen | Pilihan |
|---|---|
| Frontend | React + Vite, Tailwind CSS |
| AI/LLM | OpenRouter API, model gratis (`:free`) — contoh `meta-llama/llama-3.3-70b-instruct:free`. Cek daftar model gratis terbaru di openrouter.ai/models, siapkan model cadangan untuk fallback |
| TTS (audio) | Web Speech API browser (gratis) → upgrade ke ElevenLabs/Google Cloud TTS (free tier) kalau butuh suara lebih natural |
| STT (speaking, nanti) | Web Speech API `SpeechRecognition` — gratis, dukungan penuh cuma di Chrome/Edge |
| Storage | localStorage (MVP) → database kalau sudah berkembang |
| Biaya | Rp0 — seluruh MVP bisa dibangun tanpa biaya sama sekali |

## 6. Roadmap

1. **Fase 1:** Vocabulary Lookup (MVP)
2. **Fase 2:** Riwayat kata + Spaced Repetition
3. **Fase 3:** Writing Checker
4. **Fase 4:** Chat Multi-Karakter
5. **Fase 5:** Audio Storytelling
6. **Fase 6:** Speaking Practice (voice, ditunda)

## 7. Status Project

Project belajar pribadi (bukan tugas kuliah/skripsi), dikembangkan santai tanpa deadline ketat.

---

# Build Prompt — Fase 1 (Vocabulary Lookup)

Gunakan prompt ini di tools AI coding (Claude Code, dsb) untuk mulai membangun:

```
Buatkan web app bernama "Ranglish" — web belajar bahasa Inggris berbantuan AI.

KONSEP:
Ranglish membantu user belajar bahasa Inggris dari konten otentik (lirik lagu,
dialog film, caption media sosial), bukan dari textbook. Fokus pada retensi
(nempel di otak), bukan sekadar translate cepat. Tagline: "Jago Inggris ala
Anak Rantau".

TECH STACK:
- Frontend: React + Vite
- Styling: Tailwind CSS
- AI: OpenRouter API (model gratis, contoh meta-llama/llama-3.3-70b-instruct:free)
- TTS: Web Speech API (browser native, gratis)
- Storage: localStorage dulu untuk MVP

FASE 1 - MVP (bangun ini dulu):
Fitur "Vocabulary Lookup":
1. Input field untuk user paste kata, frasa, atau kalimat bahasa Inggris
   (termasuk dari lirik lagu, dialog film, atau caption media sosial)
2. Kirim ke OpenRouter API dengan prompt yang meminta AI mengembalikan JSON
   berisi:
   - arti (terjemahan Bahasa Indonesia)
   - cara_baca (transkripsi fonetik yang mudah dibaca orang Indonesia)
   - penggunaan (2-3 contoh kalimat pemakaian dalam konteks berbeda)
   - catatan (kalau ada nuansa slang/formal/casual, jelaskan singkat)
3. Tombol "dengarkan" yang memicu Web Speech API (SpeechSynthesisUtterance)
   untuk membacakan kata/kalimat tersebut dengan aksen Inggris (en-US)
4. Setiap pencarian otomatis tersimpan ke "riwayat kata" (localStorage)
5. Tampilkan hasil dalam bentuk card yang rapi dan enak dibaca

BRANDING:
- Nama app: Ranglish
- Tagline muncul di header: "Jago Inggris ala Anak Rantau"
- Logo sederhana bertuliskan "Ranglish" (teks/wordmark dulu, tidak perlu ikon rumit)

DESAIN:
- Mobile-first, karena kemungkinan besar dipakai sambil scroll sosmed
- Gaya visual modern, bersih, tidak kaku — sesuai target user anak muda/mahasiswa
- Warna dan tipografi yang nyaman dibaca dalam waktu lama

Setelah Fase 1 selesai dan berjalan baik, kita lanjut ke Fase 2 (riwayat kata
dengan sistem spaced repetition) dan Fase 3 (writing checker).
```
