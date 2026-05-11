import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

const assetStubRe =
  /\.(css|styl|less|sass|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|oga)$/;

function testAssetStubs() {
  return {
    name: "test-asset-stubs",
    enforce: "pre" as const,
    load(id) {
      if (id.includes(".svg?raw")) {
        return 'export default "<svg xmlns=\\"http://www.w3.org/2000/svg\\"></svg>"';
      }
      if (!assetStubRe.test(id)) return;
      if (/\.(css|styl|less|sass|scss)$/.test(id)) {
        return "export default {}";
      }
      return 'export default "test-file-stub"';
    },
  };
}

export default defineConfig({
  plugins: [testAssetStubs()],
  resolve: {
    alias: {
      "~": path.join(root, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./__helpers__/vitest-setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", ".cache/**"],
  },
});
