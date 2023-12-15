---
"@builder.io/react-hydration-overlay": patch
---

- Feature: new webpack plugin:

```ts
const {
  withHydrationOverlayWebpack,
} = require("@builder.io/react-hydration-overlay/webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config = withHydrationOverlayWebpack({
      appRootSelector: "#__next",
      isMainAppEntryPoint: (entryPointName) =>
        !options.isServer &&
        (entryPointName === "pages/_app" || entryPointName === "main-app"),
    })(config);
    return config;
  },
};

module.exports = nextConfig;
```
