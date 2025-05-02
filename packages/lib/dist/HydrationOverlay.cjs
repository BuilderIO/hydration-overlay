var React = require('react');
var OverlayClient = require('./Overlay-client-Cx0IhVqQ.cjs');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

function HydrationOverlay({ children, ...rest }) {
    return /*#__PURE__*/ React__default.default.createElement(React__default.default.Fragment, null, children, /*#__PURE__*/ React__default.default.createElement(OverlayClient.Overlay, rest));
}

exports.Overlay = OverlayClient.Overlay;
exports.HydrationOverlay = HydrationOverlay;
