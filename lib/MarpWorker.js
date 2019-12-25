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
const marp_ready_1 = __importDefault(require("./hooks/marp-ready"));
const style_1 = __importDefault(require("./hooks/style"));
const marp_1 = require("./utils/marp");
const render_1 = __importDefault(require("./utils/render"));
const worker_1 = require("./utils/worker");
let memoizedCDNWorker;
const defaultRenderer = slides => slides && slides.map(({ slide }, i) => react_1.default.createElement(react_1.Fragment, { key: i }, slide));
const CDNWorker = () => {
    if (!memoizedCDNWorker) {
        const script = "self.importScripts('https://cdn.jsdelivr.net/npm/@marp-team/marp-react/dist/worker.js')";
        const blob = new Blob([script], { type: 'text/javascript' });
        memoizedCDNWorker = new Worker(URL.createObjectURL(blob), {});
    }
    return memoizedCDNWorker;
};
exports.MarpWorker = props => {
    const { children, markdown, options, render, worker } = props;
    const { identifier, containerClass, marpOptions } = marp_options_1.default(options);
    const renderer = render || children || defaultRenderer;
    const workerInstance = worker || CDNWorker();
    const [rendered, setRendered] = react_1.useState(renderer(undefined));
    const [style, setStyle] = react_1.useState('');
    const [queue, setQueue] = react_1.useState(false);
    style_1.default(`marp-style-${identifier}`, style);
    marp_ready_1.default();
    react_1.useEffect(() => worker_1.listen(workerInstance, {
        rendered: ({ slides, css, comments }) => {
            setRendered(renderer(slides.map((slide, i) => ({
                slide: (react_1.default.createElement("div", { className: containerClass, key: i }, render_1.default(slide))),
                comments: comments[i],
            }))));
            setStyle(marp_1.stylingForComponent(css, containerClass));
            setQueue(q => {
                if (q !== false && q !== true) {
                    worker_1.send(workerInstance, identifier, 'render', ...q);
                    return true;
                }
                return false;
            });
        },
    }, identifier), [containerClass, options, renderer, workerInstance]);
    react_1.useEffect(() => {
        if (queue) {
            setQueue([markdown || '', marpOptions]);
        }
        else {
            setQueue(true);
            worker_1.send(workerInstance, identifier, 'render', markdown || '', marpOptions);
        }
    }, [markdown, options, renderer, workerInstance]);
    return react_1.default.createElement(react_1.default.Fragment, null, rendered);
};
exports.default = exports.MarpWorker;
