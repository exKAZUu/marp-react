import { Marp, MarpOptions } from '@marp-team/marp-core';
export declare type MarpInitializer = (marp: Marp) => Marp;
export default function useMarp(opts?: MarpOptions, init?: MarpInitializer): Marp;
