"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protocol = 'marp-react-v0';
exports.listen = (worker, command, scope) => {
    const event = (e) => {
        const [protocolId, scoped, cmd] = e.data;
        if (protocol !== protocolId)
            return;
        if (scope && scope !== scoped)
            return;
        if (command[cmd]) {
            command[cmd].apply(Object.assign({}, e, { scope: scoped }), e.data.slice(3));
        }
    };
    worker.addEventListener('message', event);
    return () => worker.removeEventListener('message', event);
};
exports.send = (worker, scope, command, ...args) => worker.postMessage([protocol, scope, command, ...args]);
