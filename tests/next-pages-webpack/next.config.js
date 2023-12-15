const {
  withHydrationOverlayWebpack,
} = require("@builder.io/react-hydration-overlay/webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    // Add the hydration overlay webpack plugin
    config = withHydrationOverlayWebpack({
      appRootSelector: "#__next",
      isMainAppEntryPoint: (entryPointName) =>
        !options.isServer &&
        (entryPointName === "pages/_app" ||
          // entrypoint for `/app` pages
          entryPointName === "main-app"),
    })(config);
    return config;
  },
};

module.exports = nextConfig;
