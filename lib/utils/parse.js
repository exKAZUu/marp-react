"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelcase_1 = __importDefault(require("camelcase"));
const he_1 = require("he");
const htm_1 = __importDefault(require("htm"));
const style_to_object_1 = __importDefault(require("style-to-object"));
const decodeEntities = (v, isAttributeValue = false) => typeof v === 'string' ? he_1.decode(v, { isAttributeValue }) : v;
const html = htm_1.default.bind((type, props, ...children) => {
    const newProps = Object.assign({}, props);
    // Decode HTML entities in arguments
    Object.keys(newProps).forEach(p => {
        newProps[p] = decodeEntities(newProps[p], true);
    });
    // React prefer class to className
    if (newProps.class !== undefined) {
        newProps.className = newProps.class;
        delete newProps.class;
    }
    // Use object style instead of inline style
    if (newProps.style !== undefined) {
        const objStyle = {};
        style_to_object_1.default(newProps.style, (propName, propValue) => {
            if (propName && propValue)
                objStyle[camelcase_1.default(propName)] = propValue;
        });
        newProps.style = objStyle;
    }
    return [type, newProps, children.map(c => decodeEntities(c))];
});
function parse(htmlStr) {
    const lines = htmlStr.split('\n');
    const breaks = [...Array(lines.length - 1)].map(() => '\n');
    return html(lines, ...breaks);
}
exports.default = parse;
