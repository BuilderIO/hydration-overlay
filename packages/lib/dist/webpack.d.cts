import { Configuration } from 'webpack';

type WebpackPluginOptions = {
    /**
     * The selector for the root element of your app.
     */
    appRootSelector: string;
    /**
     * A function that returns true if the given entry point is the main app entry point.
     */
    isMainAppEntryPoint: (string: any) => boolean;
};
declare const withHydrationOverlayWebpack: ({ appRootSelector, isMainAppEntryPoint }: WebpackPluginOptions) => (originalWebpackConfig?: Configuration) => Configuration;

export { type WebpackPluginOptions, withHydrationOverlayWebpack };
