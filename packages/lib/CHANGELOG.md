# @builder.io/react-hydration-overlay

## 0.2.0

### Minor Changes

- e0807d1: Mark @spotlightjs/spotlight as an optional peer dependency

  If you enable spotlight integration, please install the dependency explicitly
  in your project.

  ```bash
  npm install @spotlightjs/spotlight --dev
  yarn add @spotlightjs/spotlight --dev
  pnpm add @spotlightjs/spotlight --dev
  ```

- 22b63c5: Support React 18

  Transition from [react-diff-viewer-continued](https://github.com/praneshr/react-diff-viewer)
  to a maintained fork [react-diff-viewer-continued](https://github.com/aeolun/react-diff-viewer-continued)
  that supports React 18.

- b1a2f7b: chore: update build toolchain

## 0.1.0

### Minor Changes

- 1075a84: Added a Spotlight integration in hydration-overlay

## 0.0.9

### Patch Changes

- 1077eb4: add support for emotion

## 0.0.8

### Patch Changes

- ee99699: Fix: remove filename checks (improves hydration error check)

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
