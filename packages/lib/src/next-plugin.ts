import webpack from "webpack";
import path from "path";

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

async function addScriptToEntryProperty(currentEntryProperty, buildContext) {
  // The `entry` entry in a webpack config can be a string, array of strings, object, or function. By default, nextjs
  // sets it to an async function which returns the promise of an object of string arrays. Because we don't know whether
  // someone else has come along before us and changed that, we need to check a few things along the way. The one thing
  // we know is that it won't have gotten *simpler* in form, so we only need to worry about the object and function
  // options. See https://webpack.js.org/configuration/entry-context/#entry.

  const { isServer, dev: isDevMode } = buildContext;

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
      // BIG FAT NOTE: Order of insertion seems to matter here. If we insert the new files before the `currentEntrypoint`s,
      // the Next.js dev server breaks. Because we generally still want the SDK to be initialized as early as possible we
      // still keep it at the start of the entrypoints if we are not in dev mode.

      const currentEntryPoint = newEntryProperty[entryPointName];
      const newEntryPoint = getEntryPoint(currentEntryPoint);
      const injectedScriptPath = path.join(__dirname, "injected.js");

      if (!newEntryPoint || newEntryPoint.includes(injectedScriptPath)) {
        return newEntryProperty;
      }

      if (isDevMode) {
        // Inserting at beginning breaks dev mode so we insert at the end.
        newEntryPoint.push(injectedScriptPath);
      } else {
        // In other modes we insert at the beginning so that the SDK initializes as early as possible.
        newEntryPoint.unshift(injectedScriptPath);
      }

      console.log({ newEntryPoint });

      newEntryProperty[entryPointName] = newEntryPoint;
    }
  }

  return newEntryProperty;
}

export const withHydrationOverlay =
  (_pluginOptions: { appRootSelector?: string } = {}) =>
  (nextConfig = {}) => {
    const { appRootSelector = "#__next" } = _pluginOptions;
    return Object.assign({}, nextConfig, {
      webpack(config, ctx) {
        if (!ctx.dev) {
          console.warn(
            "`withHydrationOverlay` is only meant for development mode. Please remove it from your next.config.js."
          );
        }

        let rawNewConfig = { ...config };

        // const origEntryProperty = newConfig.entry;
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
    });
  };
