"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marp_core_1 = require("@marp-team/marp-core");
const react_1 = require("react");
const marp_ready_1 = __importDefault(require("./marp-ready"));
function useMarp(opts = {}, init) {
    marp_ready_1.default();
    return react_1.useMemo(() => (init ? init(new marp_core_1.Marp(opts)) : new marp_core_1.Marp(opts)), [
        opts,
        init,
    ]);
}
exports.default = useMarp;
