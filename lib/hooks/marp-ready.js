"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_cjs_1 = __importDefault(require("@marp-team/marp-core/lib/browser.cjs"));
const react_1 = require("react");
const marpReadySymbol = Symbol('MarpReactReady');
function useMarpReady() {
    react_1.useLayoutEffect(() => {
        if (!window || window[marpReadySymbol])
            return;
        window[marpReadySymbol] = true;
        browser_cjs_1.default();
    }, []);
}
exports.default = useMarpReady;
