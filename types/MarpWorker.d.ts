import React from 'react';
import { MarpRendererProps, MarpRenderedSlide } from './Marp';
export interface MarpWorkerRendererProps extends MarpRendererProps {
    children?: MarpWorkerRendererRenderProp;
    render?: MarpWorkerRendererRenderProp;
    worker?: Worker;
}
export declare type MarpWorkerRendererRenderProp = (slides: MarpRenderedSlide[] | undefined) => React.ReactNode;
export declare const MarpWorker: React.FC<MarpWorkerRendererProps>;
export default MarpWorker;
