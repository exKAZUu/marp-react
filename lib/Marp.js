"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const marp_options_1 = __importDefault(require("./hooks/marp-options"));
const marp_1 = __importDefault(require("./hooks/marp"));
const style_1 = __importDefault(require("./hooks/style"));
const marp_2 = require("./utils/marp");
const parse_1 = __importDefault(require("./utils/parse"));
const render_1 = __importDefault(require("./utils/render"));
const defaultRenderer = slides => slides.map(({ slide }, i) => react_1.default.createElement(react_1.Fragment, { key: i }, slide));
exports.Marp = props => {
    const { children, markdown, options, render, init } = props;
    const { containerClass, identifier, marpOptions } = marp_options_1.default(options);
    const marp = marp_1.default(marpOptions, init);
    const { html, css, comments } = marp.render(markdown || '', {
        htmlAsArray: true,
    });
    style_1.default(`marp-style-${identifier}`, marp_2.stylingForComponent(css, containerClass));
    const slides = html.map((slide, i) => ({
        slide: (react_1.default.createElement("div", { className: containerClass, key: i }, render_1.default(parse_1.default(slide)))),
        comments: comments[i],
    }));
    return react_1.default.createElement(react_1.default.Fragment, null, (render || children || defaultRenderer)(slides));
};
exports.default = exports.Marp;
