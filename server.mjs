// Optional local preview. GitHub Pages does not run this server.
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const port = Number(args.find((arg) => arg.startsWith("--port="))?.split("=")[1] || 4173);
const base = args.find((arg) => arg.startsWith("--base="))?.slice(7) || "/";
if (!base.startsWith("/") || !base.endsWith("/")) throw new Error("Base must start and end with /.");
const files = new Set(["index.html", "styles.css", "fonts.css", "content.js", "render-content.js", "app.js"]);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".png": "image/png",
  ".svg": "image/svg+xml", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8"
};

http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (!pathname.startsWith(base)) throw new Error("Not found");
    const relative = pathname.slice(base.length) || "index.html";
    const filename = path.resolve(root, relative);
    if (!filename.startsWith(root + path.sep) ||
        !(files.has(relative) || relative.startsWith("assets/"))) throw new Error("Not found");
    const bytes = await readFile(filename);
    response.writeHead(200, {
      "Content-Type": types[path.extname(filename)] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    response.end(bytes);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log("Local: http://127.0.0.1:" + port + base));
