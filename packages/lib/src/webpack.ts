import webpack, { Configuration, EntryObject } from "webpack";
import path from "path";
import { fileURLToPath } from "url";

let dirname;
try {
  dirname = __dirname;
} catch (e) {
  dirname = path.dirname(fileURLToPath(import.meta.url));
}

// `entryPoint` can be a string, array of strings, or object whose `import` property is one of those two
const getEntryPoint = <T extends keyof EntryObject>(
  entryPoint: EntryObject[T]
): string[] | null => {
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

async function addScriptToEntryProperty({
  currentEntryProperty,
  isMainAppEntryPoint,
}: {
  currentEntryProperty: Configuration["entry"];
  isMainAppEntryPoint: WebpackPluginOptions["isMainAppEntryPoint"];
}) {
  const newEntryProperty =
    typeof currentEntryProperty === "function"
      ? await currentEntryProperty()
      : { ...(currentEntryProperty as object) };

  // inject script into main app entry point
  for (const entryPointName in newEntryProperty as object) {
    const isBrowserMainAppEntryPoint = isMainAppEntryPoint(entryPointName);

    if (isBrowserMainAppEntryPoint) {
      const currentEntryPoint = newEntryProperty[entryPointName];
      const newEntryPoint = getEntryPoint(currentEntryPoint);
      const injectedScriptPath = path.join(
        dirname,
        "hydration-overlay-initializer.js"
      );

      if (!newEntryPoint || newEntryPoint.includes(injectedScriptPath)) {
        return newEntryProperty;
      }

      // Nextjs dev mode breaks if you insert the entry point anywhere but at the very end.
      newEntryPoint.push(injectedScriptPath);

      newEntryProperty[entryPointName] = newEntryPoint;
    }
  }

  return newEntryProperty;
}

export type WebpackPluginOptions = {
  /**
   * The selector for the root element of your app.
   */
  appRootSelector: string;

  /**
   * A function that returns true if the given entry point is the main app entry point.
   */
  isMainAppEntryPoint: (string: any) => boolean;
};

export const withHydrationOverlayWebpack =
  ({ appRootSelector, isMainAppEntryPoint }: WebpackPluginOptions) =>
  (originalWebpackConfig: Configuration = {}): Configuration => {
    let rawNewConfig = { ...originalWebpackConfig };

    rawNewConfig.entry = async () =>
      addScriptToEntryProperty({
        currentEntryProperty: originalWebpackConfig.entry,
        isMainAppEntryPoint,
      });

    rawNewConfig.plugins = [
      ...(rawNewConfig.plugins || []),
      new webpack.DefinePlugin({
        "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR":
          JSON.stringify(appRootSelector),
      }),
    ];
    return rawNewConfig;
  };
