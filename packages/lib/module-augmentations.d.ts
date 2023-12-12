export {};

declare global {
  interface Window {
    BUILDER_IO_SSR_HTML: string | undefined;
    BUILDER_IO_HYDRATION_ERROR: boolean | undefined;
  }
}
