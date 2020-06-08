import { MarpOptions } from '@marp-team/marp-core';
interface MarpReactOptions {
    containerClass: string;
    identifier: string;
    marpOptions: MarpOptions;
}
export default function useMarpOptions(opts?: MarpOptions): MarpReactOptions;
export {};
