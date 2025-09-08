import { type PropsWithChildren } from "react";

export type OverlayIntegrationsProps = {
  spotlight?: boolean
}

export type HydrationOverlayProps = PropsWithChildren & {
  integrations?: OverlayIntegrationsProps
};

export type OverlayProps = {
  integrations?: OverlayIntegrationsProps
}

// Remix-specific types
export type RemixPluginOptions = {
  /**
   * The selector for the root element of your app. Defaults to `body`.
   */
  appRootSelector?: string;
  /**
   * Whether to enable Sentry Spotlight integration. Defaults to false.
   */
  enableSpotlight?: boolean;
  /**
   * Whether to only enable in development mode. Defaults to true.
   */
  devOnly?: boolean;
};

export interface RemixConfig {
  ignoredRouteFiles?: string[];
  appDirectory?: string;
  assetsBuildDirectory?: string;
  publicPath?: string;
  serverBuildPath?: string;
  serverDependenciesToBundle?: (string | RegExp)[] | "all";
  [key: string]: any;
}

