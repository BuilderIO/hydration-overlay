// This script is designed to be imported in entry.client.tsx for Remix applications
// It captures the server-side rendered HTML before hydration and listens for hydration errors

// Initialize the global overlay object
if (typeof window !== 'undefined') {
  window.BUILDER_HYDRATION_OVERLAY = {
    SSR_HTML: undefined,
    CSR_HTML: undefined,
    ERROR: undefined,
    APP_ROOT_SELECTOR: 'body' // Default for Remix
  };

  // Override with configured selector if available
  if (typeof __HYDRATION_OVERLAY_APP_ROOT_SELECTOR__ !== 'undefined') {
    window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR = __HYDRATION_OVERLAY_APP_ROOT_SELECTOR__;
  }

  // Listen for hydration errors
  window.addEventListener('error', (event) => {
    const msg = event.message.toLowerCase();
    const isHydrationMsg = msg.includes('hydration') || msg.includes('hydrating');

    if (isHydrationMsg) {
      window.BUILDER_HYDRATION_OVERLAY.ERROR = true;
      let appRootEl = document.querySelector(
        window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR
      );

      if (appRootEl) {
        window.BUILDER_HYDRATION_OVERLAY.CSR_HTML = appRootEl.innerHTML;
      }
    }
  });

  // Capture SSR HTML immediately when script loads
  // For Remix, we need to wait for the DOM to be ready
  function captureSSRHTML() {
    let BUILDER_HYDRATION_OVERLAY_ELEMENT = document.querySelector(
      window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR
    );
    
    if (BUILDER_HYDRATION_OVERLAY_ELEMENT) {
      window.BUILDER_HYDRATION_OVERLAY.SSR_HTML =
        BUILDER_HYDRATION_OVERLAY_ELEMENT.innerHTML;
    }
  }

  // Try to capture immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', captureSSRHTML);
  } else {
    captureSSRHTML();
  }
}