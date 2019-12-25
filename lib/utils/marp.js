"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stylingForComponent = (css, containerClass) => `${css}
div.${containerClass}{all:initial;}
div.${containerClass} > svg[data-marpit-svg]{display:block;will-change:transform;}`;
