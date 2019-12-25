import React, { Fragment, useEffect, useState } from 'react';
import useMarpOptions from './hooks/marp-options';
import useMarpReady from './hooks/marp-ready';
import useStyle from './hooks/style';
import { stylingForComponent } from './utils/marp';
import renderToReact from './utils/render';
import { listen, send } from './utils/worker';
let memoizedCDNWorker;
const defaultRenderer = slides => slides && slides.map(({ slide }, i) => React.createElement(Fragment, { key: i }, slide));
const CDNWorker = () => {
    if (!memoizedCDNWorker) {
        const script = "self.importScripts('https://cdn.jsdelivr.net/npm/@marp-team/marp-react/dist/worker.js')";
        const blob = new Blob([script], { type: 'text/javascript' });
        memoizedCDNWorker = new Worker(URL.createObjectURL(blob), {});
    }
    return memoizedCDNWorker;
};
export const MarpWorker = props => {
    const { children, markdown, options, render, worker } = props;
    const { identifier, containerClass, marpOptions } = useMarpOptions(options);
    const renderer = render || children || defaultRenderer;
    const workerInstance = worker || CDNWorker();
    const [rendered, setRendered] = useState(renderer(undefined));
    const [style, setStyle] = useState('');
    const [queue, setQueue] = useState(false);
    useStyle(`marp-style-${identifier}`, style);
    useMarpReady();
    useEffect(() => listen(workerInstance, {
        rendered: ({ slides, css, comments }) => {
            setRendered(renderer(slides.map((slide, i) => ({
                slide: (React.createElement("div", { className: containerClass, key: i }, renderToReact(slide))),
                comments: comments[i],
            }))));
            setStyle(stylingForComponent(css, containerClass));
            setQueue(q => {
                if (q !== false && q !== true) {
                    send(workerInstance, identifier, 'render', ...q);
                    return true;
                }
                return false;
            });
        },
    }, identifier), [containerClass, options, renderer, workerInstance]);
    useEffect(() => {
        if (queue) {
            setQueue([markdown || '', marpOptions]);
        }
        else {
            setQueue(true);
            send(workerInstance, identifier, 'render', markdown || '', marpOptions);
        }
    }, [markdown, options, renderer, workerInstance]);
    return React.createElement(React.Fragment, null, rendered);
};
export default MarpWorker;
