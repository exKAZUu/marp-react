import { MarpOptions } from '@marp-team/marp-core';
interface MarpWorkerEvent extends MessageEvent {
    scope: string;
}
interface MarpWorkerCommand {
    render(this: MarpWorkerEvent, markdown: string, opts: MarpOptions): void;
    rendered(this: MarpWorkerEvent, result: {
        slides: any[];
        css: string;
        comments: string[][];
    }): void;
}
export declare const listen: (worker: Worker, command: Partial<MarpWorkerCommand>, scope?: string | undefined) => () => void;
export declare const send: <T extends "render" | "rendered">(worker: Worker, scope: string, command: T, ...args: MarpWorkerCommand[T] extends (this: MarpWorkerEvent, ...args: infer R) => any ? R : never) => void;
export {};
