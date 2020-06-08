"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function render(parsed) {
    if (typeof parsed === 'string')
        return parsed;
    if (!Array.isArray(parsed[2])) {
        return `Could not parse the given HTML text. Please check whether there are missing opening tags.`;
    }
    return react_1.createElement(parsed[0], parsed[1], ...parsed[2].map((c) => render(c)));
}
exports.default = render;
