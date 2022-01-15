export class ComponentType<K extends string = string, T = any> {
    constructor(public readonly key: K) {}

    public new(data: T): Component<T> {
        return {
            type: this,
            data,
        };
    }
}

export interface Component<T> {
    readonly type: ComponentType<string, T>;
    readonly data: T;
}

export type ComponentKey = Pick<ComponentType, "key">;
