"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function render(parsed) {
    if (typeof parsed === 'string')
        return parsed;
    if (!Array.isArray(parsed[2]))
        return JSON.stringify(parsed);
    return react_1.createElement(parsed[0], parsed[1], ...parsed[2].map((c) => render(c)));
}
exports.default = render;
