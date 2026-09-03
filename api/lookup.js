// In-memory rate limiting store: IP -> array of timestamps (ms)
const requestLog = new Map();

/**
 * Validates request rate for a given IP address.
 * Limit: maximum 10 requests in any 60-second window.
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxAllowed = 10;

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
 * Vercel Serverless Function proxy for OpenRouter API.
 * Keeps OPENROUTER_API_KEY safe on server-side.
 */
export default async function handler(req, res) {
  // 1. Only allow POST method
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 2. Rate limiting check (max 10 requests / 60s per IP)
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

  // 3. Validate request body (Client-side validation)
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

  // 4. Retrieve server-side API Key (NO VITE_ prefix!)
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    return res.status(500).json({ error: "Server belum dikonfigurasi" });
  }

  // 5. Forward request to OpenRouter with 8000ms AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

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
          Authorization: `Bearer ${apiKey.trim()}`,
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
