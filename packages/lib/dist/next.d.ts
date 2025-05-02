import { NextConfig } from 'next';
export { withHydrationOverlayWebpack } from './webpack.js';

type NextPluginOptions = {
    /**
     * The selector for the root element of your app. Defaults to `#__next`.
     */
    appRootSelector?: string;
};
declare const withHydrationOverlay: (pluginOptions?: NextPluginOptions) => (nextConfig?: NextConfig) => NextConfig;

export { type NextPluginOptions, withHydrationOverlay };
