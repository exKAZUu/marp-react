"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const react_1 = require("react");
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = nanoid_1.customAlphabet(chars, 8);
const useIdentifier = () => react_1.useMemo(() => nanoid(), []);
function useMarpOptions(opts = {}) {
    const identifier = useIdentifier();
    const containerClass = `marp-${identifier}`;
    return react_1.useMemo(() => ({
        containerClass,
        identifier,
        marpOptions: Object.assign(Object.assign({}, (opts || {})), { script: false, container: false, markdown: Object.assign(Object.assign({}, ((opts && opts.markdown) || {})), { xhtmlOut: true }), slideContainer: { tag: 'div', class: containerClass } }),
    }), [containerClass, identifier, opts]);
}
exports.default = useMarpOptions;
