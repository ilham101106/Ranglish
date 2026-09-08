/**
 * High-Availability Native TTS Audio Streaming Proxy
 * Serves native US English studio audio with zero CORS or Referer issues.
 */
export default async function handler(req, res) {
  // Extract query text
  let q = "";
  try {
    const url = new URL(req.url, "http://localhost:3000");
    q = url.searchParams.get("q") || "";
  } catch {
    const queryPart = (req.url || "").split("?")[1] || "";
    const params = new URLSearchParams(queryPart);
    q = params.get("q") || "";
  }

  const clean = (q || "").trim();
  if (!clean) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    return res.end("Missing text parameter");
  }

  try {
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      clean.slice(0, 200)
    )}&tl=en&client=tw-ob`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(googleTtsUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "audio/mpeg, audio/*;q=0.9",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      res.statusCode = response.status;
      res.setHeader("Content-Type", "text/plain");
      return res.end(`TTS provider returned HTTP ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.statusCode = 200;
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400");
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Accept-Ranges", "bytes");
    return res.end(buffer);
  } catch (err) {
    console.error("[Ranglish TTS Proxy Error]:", err);
    res.statusCode = 502;
    res.setHeader("Content-Type", "text/plain");
    return res.end("Error fetching audio stream");
  }
}
