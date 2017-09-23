/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}


interface Callback { (data: any): void;
}

declare class EventSource {
    onmessage: Callback;

    addEventListener(event: string, cb: Callback): void;

    constructor(name: string);
}