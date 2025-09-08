export {};

declare global {
  interface Window {
    BUILDER_HYDRATION_OVERLAY: {
      SSR_HTML: string | undefined;
      CSR_HTML: string | undefined;
      ERROR: boolean | undefined;
      APP_ROOT_SELECTOR: string;
    };
  }

  // Build-time injected variable for app root selector
  var __HYDRATION_OVERLAY_APP_ROOT_SELECTOR__: string | undefined;
}
