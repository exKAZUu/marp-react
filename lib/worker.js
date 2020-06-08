"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marp_core_1 = require("@marp-team/marp-core");
const parse_1 = __importDefault(require("./utils/parse"));
const worker_1 = require("./utils/worker");
/* eslint-disable-next-line no-restricted-globals */
function initialize(worker = self) {
    return worker_1.listen(worker, {
        render(markdown, opts) {
            const marp = new marp_core_1.Marp(opts);
            const { html, css, comments } = marp.render(markdown, {
                htmlAsArray: true,
            });
            worker_1.send(worker, this.scope, 'rendered', {
                slides: html.map((h) => parse_1.default(h)),
                css,
                comments,
            });
        },
    });
}
exports.default = initialize;
