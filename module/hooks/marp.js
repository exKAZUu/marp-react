import { Marp } from '@marp-team/marp-core';
import { useMemo } from 'react';
import useMarpReady from './marp-ready';
export default function useMarp(opts = {}, init) {
    useMarpReady();
    return useMemo(() => (init ? init(new Marp(opts)) : new Marp(opts)), [
        opts,
        init,
    ]);
}
