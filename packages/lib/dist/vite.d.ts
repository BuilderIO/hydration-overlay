import { Plugin } from 'vite';

interface VitePluginOptions {
    appRootSelector?: string;
    entry?: RegExp | RegExp[];
}
declare function withHydrationOverlayVite(opts?: VitePluginOptions): Plugin;

export { type VitePluginOptions, withHydrationOverlayVite };
