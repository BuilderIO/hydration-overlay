window.addEventListener("error", (event) => {
  const msg = event.message.toLowerCase();
  const isReactDomError = event.filename.includes("react-dom");
  const isHydrationMsg = msg.includes("hydration") || msg.includes("hydrating");

  if (isReactDomError && isHydrationMsg) {
    window.BUILDER_IO_HYDRATION_ERROR = true;
  }
});

let appRoot = document.getElementById("__next");
if (appRoot) {
  window.BUILDER_IO_SSR_HTML = appRoot.innerHTML;
}
