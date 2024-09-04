import { resolve } from "path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "[name]",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.ts"),
        server: resolve(__dirname, "src/server.ts"),
      },
      output: {
        preserveModules: false,
      },
    },
    sourcemap: true,
  },
  plugins: [dts({ insertTypesEntry: true })],
});
