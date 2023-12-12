let appRoot = document.getElementById("__next");

if (appRoot) {
  window.BUILDER_IO_SSR_HTML = appRoot.innerHTML;
}
