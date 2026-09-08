// In-memory rate limiting store: IP -> array of timestamps (ms)
const requestLog = new Map();

/**
 * Validates request rate for a given IP address.
 * Limit: maximum 30 requests in any 60-second window.
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxAllowed = 30;

  const timestamps = requestLog.get(ip) || [];
  // Clean up entries older than 60 seconds
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxAllowed) {
    requestLog.set(ip, validTimestamps);
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  requestLog.set(ip, validTimestamps);
  return true; // Allowed
}

/**
 * Call Google Gemini API directly with Native JSON Schema support.
 */
async function callGemini(systemPrompt, userPrompt, apiKey) {
  const models = [
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-2.5-flash",
  ];

  for (const model of models) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: userPrompt }],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2,
              maxOutputTokens: 1200,
            },
          }),
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          return {
            success: true,
            model,
            content: candidateText,
          };
        }
      }
    } catch (err) {
      clearTimeout(timeoutId);
    }
  }

  return { success: false };
}

/**
 * Cascading Multi-Provider Proxy:
 * 1. Google Gemini 3.5 Flash (Super fast, Native JSON schema, 100% free)
 * 2. OpenRouter API (Fallback backup)
 */
export default async function handler(req, res) {
  // 1. Only allow POST method
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 2. Rate limiting check (max 30 requests / 60s per IP)
  const forwarded = req.headers["x-forwarded-for"];
  const ip = (
    typeof forwarded === "string"
      ? forwarded.split(",")[0]
      : req.socket?.remoteAddress || "unknown"
  ).trim();

  if (!checkRateLimit(ip)) {
    return res
      .status(429)
      .json({ error: "Terlalu banyak permintaan, coba lagi sebentar" });
  }

  // 3. Validate request body
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Format JSON body tidak valid" });
    }
  }
  body = body || {};

  const { messages, model, temperature, max_tokens } = body;
  if (!messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: "Parameter messages wajib ada dan berupa array" });
  }

  const systemMessage = messages.find((m) => m.role === "system")?.content || "";
  const userMessage = messages.find((m) => m.role === "user")?.content || "";

  const geminiKey = process.env.GEMINI_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  if ((!geminiKey || !geminiKey.trim()) && (!openrouterKey || !openrouterKey.trim())) {
    return res.status(500).json({ error: "Server belum dikonfigurasi API key" });
  }

  // 4. PRIORITY 1: Try Google Gemini API first
  if (geminiKey && geminiKey.trim()) {
    try {
      const geminiResult = await callGemini(systemMessage, userMessage, geminiKey.trim());
      if (geminiResult.success) {
        return res.status(200).json({
          provider: "gemini",
          model: geminiResult.model,
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content: geminiResult.content,
              },
            },
          ],
        });
      }
    } catch (geminiErr) {
      console.warn("Gemini API attempt failed, falling back to OpenRouter:", geminiErr.message);
    }
  }

  // 5. PRIORITY 2: Fallback to OpenRouter
  if (openrouterKey && openrouterKey.trim()) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    try {
      const origin =
        req.headers.origin ||
        req.headers.referer ||
        "https://ranglish.vercel.app";

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${openrouterKey.trim()}`,
            "Content-Type": "application/json",
            "HTTP-Referer": origin,
            "X-Title": "Ranglish App",
          },
          body: JSON.stringify({
            model: model || "openrouter/free",
            messages,
            temperature: typeof temperature === "number" ? temperature : 0.3,
            max_tokens: typeof max_tokens === "number" ? max_tokens : 800,
          }),
        }
      );

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return res
          .status(response.status)
          .json(data || { error: `OpenRouter error: ${response.statusText}` });
      }

      return res.status(200).json(data);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") {
        return res
          .status(504)
          .json({ error: "OpenRouter API request timeout (8000ms)" });
      }
      return res
        .status(500)
        .json({ error: err.message || "Gagal menghubungi OpenRouter API" });
    }
  }

  return res.status(500).json({ error: "Semua provider AI tidak dapat dihubungi" });
}
