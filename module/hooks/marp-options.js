import nanoid from 'nanoid/generate';
import { useMemo } from 'react';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const useIdentifier = () => useMemo(() => nanoid(chars, 8), []);
export default function useMarpOptions(opts = {}) {
    const identifier = useIdentifier();
    const containerClass = `marp-${identifier}`;
    return useMemo(() => ({
        containerClass,
        identifier,
        marpOptions: Object.assign(Object.assign({}, (opts || {})), { script: false, container: false, markdown: Object.assign(Object.assign({}, ((opts && opts.markdown) || {})), { xhtmlOut: true }), slideContainer: { tag: 'div', class: containerClass } }),
    }), [containerClass, identifier, opts]);
}
