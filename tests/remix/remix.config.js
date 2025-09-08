import { withHydrationOverlayRemix } from "@builder.io/react-hydration-overlay/remix";

/** @type {import('@remix-run/dev').AppConfig} */
export default withHydrationOverlayRemix({
  appRootSelector: "body",
  devOnly: true,
})({
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
});
