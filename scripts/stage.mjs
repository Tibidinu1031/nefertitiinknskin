// Copy only public files. No build tools, dependencies, or npm install required.
import { cp, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const output = new URL("_site/", root);
const files = [
  "index.html", "styles.css", "fonts.css", "content.js",
  "render-content.js", "app.js", ".nojekyll", "assets"
];
await mkdir(output, { recursive: true });
for (const file of files) {
  await cp(new URL(file, root), new URL(file, output), { recursive: true });
}
console.log("Public website prepared in " + fileURLToPath(output));
