"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = __importDefault(require("nanoid/generate"));
const react_1 = require("react");
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const useIdentifier = () => react_1.useMemo(() => generate_1.default(chars, 8), []);
function useMarpOptions(opts = {}) {
    const identifier = useIdentifier();
    const containerClass = `marp-${identifier}`;
    return react_1.useMemo(() => ({
        containerClass,
        identifier,
        marpOptions: Object.assign({}, (opts || {}), { container: false, markdown: Object.assign({}, ((opts && opts.markdown) || {}), { xhtmlOut: true }), slideContainer: { tag: 'div', class: containerClass } }),
    }), [containerClass, identifier, opts]);
}
exports.default = useMarpOptions;
