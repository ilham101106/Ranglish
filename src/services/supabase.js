import { createClient } from '@supabase/supabase-js';
import { getVocabHistory, getLearnedVocabBank } from './storage.js';
import { classifyText } from '../utils/textClassifier.js';

const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL);

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY);

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Cari kata dari Supabase Cloud (Otak Kedua)
 */
export async function searchCloudVocab(word) {
  if (!supabase || !word) return null;
  try {
    const clean = word.toLowerCase().trim();
    const { data, error } = await supabase
      .from('vocab_bank')
      .select('*')
      .ilike('word', clean)
      .maybeSingle();

    if (error) {
      console.warn('[Supabase Cloud] Search warning:', error.message);
      return null;
    }

    if (data) {
      // Increment search_count asynchronously
      supabase
        .from('vocab_bank')
        .update({ 
          search_count: (data.search_count || 1) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.id)
        .then(() => {});

      return {
        teks_asli: data.word,
        word: data.word,
        arti: data.arti,
        cara_baca: data.cara_baca || '',
        penggunaan: Array.isArray(data.penggunaan) ? data.penggunaan : [],
        catatan: data.catatan || '',
        source: 'supabase_cloud',
        category_type: data.category_type || 'word'
      };
    }
  } catch (err) {
    console.warn('[Supabase Cloud] Search exception:', err);
  }
  return null;
}

/**
 * Simpan atau perbarui kata baru ke Supabase Cloud
 */
export async function saveWordToCloud(vocabData) {
  if (!supabase || !vocabData) return false;
  try {
    const rawWord = vocabData.teks_asli || vocabData.word;
    if (!rawWord || !vocabData.arti) return false;

    const word = String(rawWord).trim();
    const classification = classifyText(word);

    const payload = {
      word: word,
      arti: vocabData.arti,
      cara_baca: vocabData.cara_baca || '',
      penggunaan: vocabData.penggunaan || [],
      catatan: vocabData.catatan || '',
      category_type: vocabData.category_type || classification.type || 'word',
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('vocab_bank')
      .upsert(payload, { onConflict: 'word' });

    if (error) {
      console.warn('[Supabase Cloud] Upsert failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase Cloud] Save exception:', err);
    return false;
  }
}

/**
 * Sinkronisasi Seluruh Bank Kosakata Lokal (~172 entri) ke Supabase Cloud
 * Menggabungkan riwayat pencarian (History) + AI Learned Vocab Bank tanpa duplikasi.
 */
export async function syncLocalBankToCloud(onProgress = null) {
  if (!supabase) {
    throw new Error('Supabase belum dikonfigurasi di file .env');
  }

  const localHistory = getVocabHistory() || [];
  const learnedBank = getLearnedVocabBank() || {};

  // Map unik berdasarkan lower(word)
  const combinedMap = new Map();

  // 1. Masukkan data dari learnedBank
  Object.keys(learnedBank).forEach((key) => {
    const item = learnedBank[key];
    if (item && item.arti) {
      const cleanKey = key.trim();
      combinedMap.set(cleanKey.toLowerCase(), {
        word: cleanKey,
        arti: item.arti,
        cara_baca: item.cara_baca || cleanKey,
        penggunaan: Array.isArray(item.penggunaan) ? item.penggunaan : [],
        catatan: item.catatan || '',
        category_type: classifyText(cleanKey).type || 'word'
      });
    }
  });

  // 2. Masukkan / gabungkan dari riwayat pencarian
  localHistory.forEach((item) => {
    const rawWord = item.teks_asli || item.word;
    if (rawWord && item.arti) {
      const cleanWord = String(rawWord).trim();
      const lowerKey = cleanWord.toLowerCase();
      const existing = combinedMap.get(lowerKey);

      combinedMap.set(lowerKey, {
        word: cleanWord,
        arti: item.arti,
        cara_baca: item.cara_baca || existing?.cara_baca || '',
        penggunaan: (item.penggunaan && item.penggunaan.length > 0)
          ? item.penggunaan
          : (existing?.penggunaan || []),
        catatan: item.catatan || existing?.catatan || '',
        category_type: item.category_type || classifyText(cleanWord).type || 'word'
      });
    }
  });

  const allItems = Array.from(combinedMap.values());
  if (allItems.length === 0) {
    return { success: true, count: 0, message: 'Tidak ada kosakata lokal untuk diunggah.' };
  }

  // Upload secara batch (50 item per batch) agar ringan dan stabil
  const BATCH_SIZE = 50;
  let uploadedCount = 0;

  for (let i = 0; i < allItems.length; i += BATCH_SIZE) {
    const batch = allItems.slice(i, i + BATCH_SIZE);
    const { error } = await supabase
      .from('vocab_bank')
      .upsert(batch, { onConflict: 'word' });

    if (error) {
      throw new Error(`Gagal upload batch: ${error.message}`);
    }

    uploadedCount += batch.length;
    if (onProgress) {
      onProgress(uploadedCount, allItems.length);
    }
  }

  return {
    success: true,
    count: uploadedCount,
    message: `${uploadedCount} kosakata berhasil disinkronkan ke Supabase Cloud!`
  };
}
