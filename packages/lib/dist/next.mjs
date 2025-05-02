import { withHydrationOverlayWebpack } from './webpack.mjs';
export { withHydrationOverlayWebpack } from './webpack.mjs';

const withHydrationOverlay = (pluginOptions = {})=>(nextConfig = {})=>{
        const extraConfig = {
            webpack (config, ctx) {
                if (!ctx.dev) {
                    console.warn("[ReactHydrationOverlay]: This plugin is only meant to be used in development mode. Please remove it from your next.config.js.");
                }
                return withHydrationOverlayWebpack({
                    appRootSelector: pluginOptions.appRootSelector || "#__next",
                    isMainAppEntryPoint: (entryPointName)=>!ctx.isServer && (entryPointName === "pages/_app" || // entrypoint for `/app` pages
                        entryPointName === "main-app")
                })(config);
            }
        };
        return Object.assign({}, nextConfig, extraConfig);
    };

export { withHydrationOverlay };
