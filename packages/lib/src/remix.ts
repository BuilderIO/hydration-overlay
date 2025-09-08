import { RemixPluginOptions, RemixConfig } from "./types.js";

const withHydrationOverlayRemix =
  (pluginOptions: RemixPluginOptions = {}) =>
  (remixConfig: RemixConfig = {}): RemixConfig => {
    const {
      appRootSelector = "body",
      enableSpotlight = false,
      devOnly = true,
    } = pluginOptions;

    // If devOnly is true and we're in production, return original config
    if (devOnly && process.env.NODE_ENV === "production") {
      console.warn(
        "[ReactHydrationOverlay]: This plugin is only meant to be used in development mode. Skipping in production."
      );
      return remixConfig;
    }

    // Add the hydration overlay package and its dependencies to serverDependenciesToBundle
    // This ensures our initializer script and overlay component get bundled properly
    const currentServerDeps = remixConfig.serverDependenciesToBundle || [];
    const overlayDependencies = [
      /@builder\.io\/react-hydration-overlay/,
      /beautify/,
      /react-diff-viewer-continued/,
      /classnames/,
      /@emotion/, // Include all @emotion packages
      /diff/,
      /memoize-one/,
      /stylis/,
      /html/, // Add html package to fix dynamic require error
      /js-beautify/, // Include js-beautify which may be used by beautify
    ];
    const updatedServerDeps = Array.isArray(currentServerDeps)
      ? [...currentServerDeps, ...overlayDependencies]
      : currentServerDeps === "all"
      ? "all"
      : overlayDependencies;

    const updatedConfig: RemixConfig = {
      ...remixConfig,
      serverDependenciesToBundle: updatedServerDeps,
    };

    // Store the app root selector in a way that can be accessed by the initializer
    // We'll use a global define that gets embedded at build time
    if (typeof global !== "undefined") {
      (global as any).__HYDRATION_OVERLAY_APP_ROOT_SELECTOR__ = appRootSelector;
    }

    return updatedConfig;
  };

export { withHydrationOverlayRemix };
export type { RemixPluginOptions, RemixConfig } from "./types.js";
