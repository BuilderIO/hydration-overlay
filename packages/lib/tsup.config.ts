import { defineConfig, Format, Options } from "tsup";

export default defineConfig([
  {
    clean: true,
    dts: true,
    format: ["cjs", "esm"],
    external: ["webpack"],
    bundle: false,
    entry: ["src/**/*"],
  },
]);
