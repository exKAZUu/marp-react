"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useStyle(id, css) {
    react_1.useLayoutEffect(() => {
        const style = document.getElementById(id) ||
            (() => {
                const element = document.createElement('style');
                element.id = id;
                document.head.appendChild(element);
                return element;
            })();
        return () => style.remove();
    }, [id]);
    react_1.useLayoutEffect(() => {
        const style = document.getElementById(id);
        if (style)
            style.textContent = css;
    }, [id, css]);
}
exports.default = useStyle;
