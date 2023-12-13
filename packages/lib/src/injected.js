window.addEventListener("error", (event) => {
  const msg = event.message.toLowerCase();
  const isReactDomError = event.filename.includes("react-dom");
  const isHydrationMsg = msg.includes("hydration") || msg.includes("hydrating");

  if (isReactDomError && isHydrationMsg) {
    window.BUILDER_HYDRATION_OVERLAY.ERROR = true;
    // TO-DO: parametrize this.
    let appRoot = document.querySelector(
      window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR
    );
    if (appRoot) {
      window.BUILDER_HYDRATION_OVERLAY.CSR_HTML = appRoot.innerHTML;
    }
  }
});

let appRoot = document.querySelector(
  window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR
);
if (appRoot) {
  window.BUILDER_HYDRATION_OVERLAY.SSR_HTML = appRoot.innerHTML;
}
