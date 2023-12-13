window.BUILDER_HYDRATION_OVERLAY = {};

window.addEventListener("error", (event) => {
  const msg = event.message.toLowerCase();
  const isReactDomError = event.filename.includes("react-dom");
  const isHydrationMsg = msg.includes("hydration") || msg.includes("hydrating");

  if (isReactDomError && isHydrationMsg) {
    window.BUILDER_HYDRATION_OVERLAY.ERROR = true;
    let appRootEl = document.querySelector(
      window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR
    );
    if (appRootEl) {
      window.BUILDER_HYDRATION_OVERLAY.CSR_HTML = appRootEl.outerHTML;
    }
  }
});

let BUILDER_HYDRATION_OVERLAY_ELEMENT = document.querySelector(
  window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR
);
if (BUILDER_HYDRATION_OVERLAY_ELEMENT) {
  window.BUILDER_HYDRATION_OVERLAY.SSR_HTML =
    BUILDER_HYDRATION_OVERLAY_ELEMENT.outerHTML;
}
