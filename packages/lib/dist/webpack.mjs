import webpack from 'webpack';
import path from 'path';
import __node_cjsUrl from 'node:url';
import __node_cjsPath from 'node:path';

const __filename = __node_cjsUrl.fileURLToPath(import.meta.url);
const __dirname = __node_cjsPath.dirname(__filename);

// `entryPoint` can be a string, array of strings, or object whose `import` property is one of those two
const getEntryPoint = (entryPoint)=>{
    if (typeof entryPoint === "string") {
        return [
            entryPoint
        ];
    } else if (Array.isArray(entryPoint)) {
        return entryPoint;
    } else if (typeof entryPoint === "object" && "import" in entryPoint) {
        const entryImport = entryPoint.import;
        return Array.isArray(entryImport) ? entryImport : [
            entryImport
        ];
    } else {
        console.error("[ReactHydrationOverlay]: Could not add hydration overlay script due to unexpected entry point: ", entryPoint);
        return null;
    }
};
async function addScriptToEntryProperty({ currentEntryProperty, isMainAppEntryPoint }) {
    const newEntryProperty = typeof currentEntryProperty === "function" ? await currentEntryProperty() : {
        ...currentEntryProperty
    };
    // inject script into main app entry point
    for(const entryPointName in newEntryProperty){
        const isBrowserMainAppEntryPoint = isMainAppEntryPoint(entryPointName);
        if (isBrowserMainAppEntryPoint) {
            const currentEntryPoint = newEntryProperty[entryPointName];
            const newEntryPoint = getEntryPoint(currentEntryPoint);
            const injectedScriptPath = path.join(__dirname, "hydration-overlay-initializer.js");
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
const withHydrationOverlayWebpack = ({ appRootSelector, isMainAppEntryPoint })=>(originalWebpackConfig = {})=>{
        let rawNewConfig = {
            ...originalWebpackConfig
        };
        rawNewConfig.entry = async ()=>addScriptToEntryProperty({
                currentEntryProperty: originalWebpackConfig.entry,
                isMainAppEntryPoint
            });
        rawNewConfig.plugins = [
            ...rawNewConfig.plugins || [],
            new webpack.DefinePlugin({
                "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR": JSON.stringify(appRootSelector)
            })
        ];
        return rawNewConfig;
    };

export { withHydrationOverlayWebpack };
