# @builder.io/react-hydration-overlay

## 0.0.7

### Patch Changes

- 4154b00: add missing `type: 'module'` config

## 0.0.6

### Patch Changes

- 6a3bf11: Chore: use `bunchee` to build lib
- cb37e20: Style: add `ltr` direction style in `Overlay.tsx`
- 6a3bf11: fix webpack import

## 0.0.5

### Patch Changes

- 669ff5f: - Feature: new webpack plugin:

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

## 0.0.4

### Patch Changes

- 13bed88: Remove console.logs
- 13bed88: Fix ESM issues:

  - `__dirname` not being available in Nextjs plugin
  - `Overlay` import not having explicit `.js` extension

## 0.0.3

### Patch Changes

- 198726a: Fix: add 'use client' banner. Plugin now works in NextJS App directory.

## 0.0.1

### Patch Changes

- 9545fce: Initial Release:

  - added `HydrationOverlay` component.
  - added Next.js plugin at `@builder.io/react-hydration-overlay/next`
