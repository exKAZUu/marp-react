import { MarpOptions } from '@marp-team/marp-core';
import React from 'react';
import { MarpInitializer } from './hooks/marp';
export interface MarpRendererProps {
    children?: MarpRendererRenderProp;
    markdown?: string;
    options?: MarpOptions;
    render?: MarpRendererRenderProp;
    init?: MarpInitializer;
}
export declare type MarpRendererRenderProp = (slides: MarpRenderedSlide[]) => React.ReactNode;
export interface MarpRenderedSlide {
    slide: React.ReactNode;
    comments: string[];
}
export declare const Marp: React.FC<MarpRendererProps>;
export default Marp;
