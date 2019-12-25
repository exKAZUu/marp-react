export const stylingForComponent = (css, containerClass) => `${css}
div.${containerClass}{all:initial;}
div.${containerClass} > svg[data-marpit-svg]{display:block;will-change:transform;}`;
