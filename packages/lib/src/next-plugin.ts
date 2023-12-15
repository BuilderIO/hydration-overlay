import { type NextConfig } from "next";
import { withHydrationOverlayWebpack } from "./webpack";

export type NextPluginOptions = {
  /**
   * The selector for the root element of your app. Defaults to `#__next`.
   */
  appRootSelector?: string;
};

const withHydrationOverlay =
  (pluginOptions: NextPluginOptions) =>
  (nextConfig: NextConfig = {}): NextConfig => {
    const extraConfig: NextConfig = {
      webpack(config, ctx) {
        if (!ctx.dev) {
          console.warn(
            "[ReactHydrationOverlay]: This plugin is only meant to be used in development mode. Please remove it from your next.config.js."
          );
        }

        const isMainAppEntryPoint = (entryPointName: string) =>
          !ctx.isServer &&
          (entryPointName === "pages/_app" ||
            // entrypoint for `/app` pages
            entryPointName === "main-app");

        return withHydrationOverlayWebpack({
          appRootSelector: pluginOptions.appRootSelector || "#__next",
          isMainAppEntryPoint: (entryPointName: string) =>
            !ctx.isServer &&
            (entryPointName === "pages/_app" ||
              // entrypoint for `/app` pages
              entryPointName === "main-app"),
        })(config);
      },
    };

    return Object.assign({}, nextConfig, extraConfig);
  };

export { withHydrationOverlayWebpack, withHydrationOverlay };
