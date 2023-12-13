import webpack from "webpack";
import path from "path";
import { type NextConfig } from "next";
import { WebpackConfigContext } from "next/dist/server/config-shared";

// `entryPoint` can be a string, array of strings, or object whose `import` property is one of those two
const getEntryPoint = (entryPoint: any): string[] | null => {
  if (typeof entryPoint === "string") {
    return [entryPoint];
  } else if (Array.isArray(entryPoint)) {
    return entryPoint;
  } else if (typeof entryPoint === "object" && "import" in entryPoint) {
    const entryImport = entryPoint.import;
    return Array.isArray(entryImport) ? entryImport : [entryImport];
  } else {
    console.error(
      "[ReactHydrationOverlay]: Could not add hydration overlay script due to unexpected entry point: ",
      entryPoint
    );
    return null;
  }
};

async function addScriptToEntryProperty(
  currentEntryProperty,
  buildContext: WebpackConfigContext
) {
  const { isServer } = buildContext;

  const newEntryProperty =
    typeof currentEntryProperty === "function"
      ? await currentEntryProperty()
      : { ...currentEntryProperty };

  // inject script into main app entry point
  for (const entryPointName in newEntryProperty) {
    const isBrowserMainAppEntryPoint =
      !isServer &&
      (entryPointName === "pages/_app" ||
        // entrypoint for `/app` pages
        entryPointName === "main-app");

    if (isBrowserMainAppEntryPoint) {
      const currentEntryPoint = newEntryProperty[entryPointName];
      const newEntryPoint = getEntryPoint(currentEntryPoint);
      const injectedScriptPath = path.join(
        __dirname,
        "hydration-overlay-initializer.js"
      );

      if (!newEntryPoint || newEntryPoint.includes(injectedScriptPath)) {
        return newEntryProperty;
      }

      // Dev mode breaks if you insert the entry point anywhere but at the very end.
      newEntryPoint.push(injectedScriptPath);

      newEntryProperty[entryPointName] = newEntryPoint;
    }
  }

  return newEntryProperty;
}

export type NextPluginOptions = {
  /**
   * The selector for the root element of your app. Defaults to `#__next`.
   */
  appRootSelector?: string;
};

export const withHydrationOverlay =
  (_pluginOptions: NextPluginOptions = {}) =>
  (nextConfig: NextConfig = {}): NextConfig => {
    const { appRootSelector = "#__next" } = _pluginOptions;

    const extraConfig: NextConfig = {
      webpack(config, ctx) {
        if (!ctx.dev) {
          console.warn(
            "[ReactHydrationOverlay]: This plugin is only meant to be used in development mode. Please remove it from your next.config.js."
          );
        }

        let rawNewConfig = { ...config };

        rawNewConfig.entry = async () =>
          addScriptToEntryProperty(config.entry, ctx);

        rawNewConfig.plugins = [
          ...(rawNewConfig.plugins || []),
          new webpack.DefinePlugin({
            "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR":
              JSON.stringify(appRootSelector),
          }),
        ];
        return rawNewConfig;
      },
    };

    return Object.assign({}, nextConfig, extraConfig);
  };
