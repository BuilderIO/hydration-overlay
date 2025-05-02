'use client';
var beautify = require('beautify');
var reactDom = require('react-dom');
var React = require('react');
var ReactDiffViewer = require('react-diff-viewer-continued');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var beautify__default = /*#__PURE__*/_interopDefault(beautify);
var React__default = /*#__PURE__*/_interopDefault(React);
var ReactDiffViewer__default = /*#__PURE__*/_interopDefault(ReactDiffViewer);

// Remove emotion-inserted style tags from the HTML string from the server
// as they get removed before hydration, so they shouldn't show in the diff
// (pollutes the diff and makes it unusable)
function removeEmotionStyleTags(htmlString = "") {
    const regex = /<style\s+data-emotion(?:="[^"]*"|[^>])*>[\s\S]*?<\/style>/g;
    return htmlString.replace(regex, "");
}
const DiffViewer = ReactDiffViewer__default.default.default ? ReactDiffViewer__default.default.default : ReactDiffViewer__default.default;
function Overlay({ integrations }) {
    const [SSRHtml, setSSRHtml] = React.useState("");
    const [CSRHtml, setCSRHtml] = React.useState("");
    const [showModal, setShowModal] = React.useState(true);
    const [hasHydrationMismatch, setHasHydrationMismatch] = React.useState(false);
    React.useEffect(()=>{
        if (!window.BUILDER_HYDRATION_OVERLAY) {
            console.warn("[ReactHydrationOverlay]: No `window.BUILDER_HYDRATION_OVERLAY` found. Make sure the initializer script is properly injected into your app's entry point.");
            return;
        }
        const ssrHtml = removeEmotionStyleTags(window.BUILDER_HYDRATION_OVERLAY.SSR_HTML);
        const newCSRHtml = window.BUILDER_HYDRATION_OVERLAY.CSR_HTML;
        if (!ssrHtml || !newCSRHtml) return;
        const newSSR = beautify__default.default(ssrHtml, {
            format: "html"
        });
        setSSRHtml(newSSR);
        const newCSR = beautify__default.default(newCSRHtml, {
            format: "html"
        });
        setCSRHtml(newCSR);
        setShowModal(true);
        if (window.BUILDER_HYDRATION_OVERLAY.ERROR) {
            setHasHydrationMismatch(true);
        }
    }, []);
    const hideModal = ()=>{
        setShowModal(false);
    };
    const renderModal = showModal && hasHydrationMismatch && typeof document !== "undefined";
    if (!renderModal) {
        return null;
    }
    const renderOverlay = ()=>{
        return /*#__PURE__*/ React__default.default.createElement("div", {
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999998,
                background: "rgba(0,0,0,0.5)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
                direction: "ltr"
            },
            onClick: hideModal
        }, /*#__PURE__*/ React__default.default.createElement("div", {
            style: {
                zIndex: 999999,
                margin: "4rem 6rem",
                backgroundColor: "white",
                borderRadius: "0.5rem",
                overflow: "auto",
                cursor: "auto",
                color: "#212529"
            },
            onClick: (e)=>{
                e.stopPropagation();
            }
        }, /*#__PURE__*/ React__default.default.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column"
            }
        }, /*#__PURE__*/ React__default.default.createElement("div", {
            style: {
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid black",
                alignItems: "center"
            }
        }, /*#__PURE__*/ React__default.default.createElement("div", {
            style: {
                fontSize: "2rem",
                fontWeight: "bold",
                padding: "1rem"
            }
        }, "Hydration Mismatch Occurred"), /*#__PURE__*/ React__default.default.createElement("button", {
            style: {
                all: "unset",
                cursor: "pointer",
                padding: "0.5rem",
                marginRight: "1rem",
                backgroundColor: "#212529",
                borderRadius: "0.25rem",
                color: "white"
            },
            onClick: hideModal
        }, "CLOSE")), /*#__PURE__*/ React__default.default.createElement("div", {
            style: {
                position: "relative",
                width: "100%"
            }
        }, /*#__PURE__*/ React__default.default.createElement(DiffViewer, {
            oldValue: SSRHtml,
            newValue: CSRHtml,
            leftTitle: "Server-Side Render",
            rightTitle: "Client-Side Render",
            compareMethod: ReactDiffViewer.DiffMethod.WORDS
        })))));
    };
    if (integrations?.spotlight) {
        // Spotlight Integration
        import('@spotlightjs/spotlight').then((Spotlight)=>{
            if (Spotlight && Spotlight.openSpotlight) {
                Spotlight.openSpotlight("/hydration-error");
            } else {
                console.error("[ReactHydrationOverlay]: Spotlight package is not available.");
            }
        }).catch((error)=>{
            console.error("[ReactHydrationOverlay]: Error importing spotlight package:", error);
        });
    } else {
        return /*#__PURE__*/ reactDom.createPortal(renderOverlay(), document.body);
    }
}

exports.Overlay = Overlay;
