import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Local development middleware plugin to execute api/lookup.js during 'npm run dev'
function devApiPlugin() {
  return {
    name: "dev-api-lookup",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/api/lookup")) {
          try {
            const env = loadEnv("", process.cwd(), "");
            process.env.OPENROUTER_API_KEY =
              process.env.OPENROUTER_API_KEY ||
              env.OPENROUTER_API_KEY ||
              env.VITE_OPENROUTER_API_KEY;

            let bodyStr = "";
            req.on("data", (chunk) => {
              bodyStr += chunk;
            });
            req.on("end", async () => {
              try {
                req.body = bodyStr ? JSON.parse(bodyStr) : {};
              } catch {
                req.body = {};
              }

              const mockRes = {
                statusCode: 200,
                headers: {},
                setHeader(k, v) {
                  res.setHeader(k, v);
                },
                status(code) {
                  this.statusCode = code;
                  return this;
                },
                json(data) {
                  res.statusCode = this.statusCode;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(data));
                },
              };

              const { default: handler } = await import("./api/lookup.js");
              await handler(req, mockRes);
            });
            return;
          } catch (err) {
            console.error("Dev API proxy error:", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApiPlugin()],
  server: {
    port: 3000,
    open: true,
  },
});
