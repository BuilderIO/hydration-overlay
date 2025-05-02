var path = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefault(path);

function withHydrationOverlayVite(opts = {}) {
    const selector = opts.appRootSelector || "body";
    const entries = Array.isArray(opts.entry) ? opts.entry : [
        opts.entry || /entry\.client\.([tj])sx?$/
    ];
    // this is how we recognize the initializer import
    const initModuleName = "hydration-overlay-initializer.js";
    const initImportSpecifier = "@builder.io/react-hydration-overlay/hydration-overlay-initializer";
    return {
        name: "react-hydration-overlay-vite",
        enforce: "pre",
        config (userConfig, env) {
            return {
                ...userConfig,
                define: {
                    ...userConfig.define || {},
                    "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR": JSON.stringify(selector)
                },
                optimizeDeps: {
                    ...userConfig.optimizeDeps || {},
                    esbuildOptions: {
                        ...userConfig.optimizeDeps.esbuildOptions || {},
                        define: {
                            ...userConfig.optimizeDeps.esbuildOptions?.define || {},
                            "window.BUILDER_HYDRATION_OVERLAY.APP_ROOT_SELECTOR": JSON.stringify(selector)
                        }
                    }
                }
            };
        },
        transform (code, id) {
            let out = code;
            // 1) inject the initializer at the top of your client entry
            if (entries.some((re)=>re.test(id))) {
                out = `import "${initImportSpecifier}";\n` + out;
            }
            // 2) if this *is* the initializer module, replace its selector token
            if (id.endsWith(path__default.default.posix.join("dist", initModuleName))) {
                // replace every occurrence of the identifier with the literal
                out = out.replace(/window\.BUILDER_HYDRATION_OVERLAY\.APP_ROOT_SELECTOR/g, JSON.stringify(selector));
            }
            // if nothing changed, return null so Vite skips source maps work
            return out === code ? null : {
                code: out,
                map: null
            };
        }
    };
}

exports.withHydrationOverlayVite = withHydrationOverlayVite;
