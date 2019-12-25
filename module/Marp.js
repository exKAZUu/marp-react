import React, { Fragment } from 'react';
import useMarpOptions from './hooks/marp-options';
import useMarp from './hooks/marp';
import useStyle from './hooks/style';
import { stylingForComponent } from './utils/marp';
import parse from './utils/parse';
import renderToReact from './utils/render';
const defaultRenderer = slides => slides.map(({ slide }, i) => React.createElement(Fragment, { key: i }, slide));
export const Marp = props => {
    const { children, markdown, options, render, init } = props;
    const { containerClass, identifier, marpOptions } = useMarpOptions(options);
    const marp = useMarp(marpOptions, init);
    const { html, css, comments } = marp.render(markdown || '', {
        htmlAsArray: true,
    });
    useStyle(`marp-style-${identifier}`, stylingForComponent(css, containerClass));
    const slides = html.map((slide, i) => ({
        slide: (React.createElement("div", { className: containerClass, key: i }, renderToReact(parse(slide)))),
        comments: comments[i],
    }));
    return React.createElement(React.Fragment, null, (render || children || defaultRenderer)(slides));
};
export default Marp;
