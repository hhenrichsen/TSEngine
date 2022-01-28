export class GameEventType<K extends string = string, T = any> {
    constructor(public readonly key: K) {}

    public with(data: T): SimpleGameEvent<T> {
        return {
            type: this,
            data,
        };
    }
}

export interface SimpleGameEvent<T> {
    readonly type: GameEventType<string, T>;
    readonly data: T;
}

export type GameEventKey = Pick<GameEventType, "key">;
