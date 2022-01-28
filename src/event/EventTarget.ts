import { getOrSetDefault } from "../util/types/Map";
import { SimpleGameEvent, GameEventKey, GameEventType } from "./Event";

export type GameEvent<WrappedType> = SimpleGameEvent<WrappedType> & {
    stopPropagation: () => void,
    cancel: () => void
}

export class GameEventTarget {
    constructor(private readonly parent?: GameEventTarget) { }

    private listeners: Map<GameEventKey, ((data: GameEvent<unknown>) => void)[]> = new Map();

    public listen<T>(eventType: GameEventType<string, T>, listener: (data: GameEvent<T>) => void) {
        const listenerList = getOrSetDefault(this.listeners, eventType, []);
        this.parent?.listen(eventType, listener);
        listenerList.push(listener);
    }

    public raise<T>(event: SimpleGameEvent<T>) {
        const listenerList = this.listeners.get(event.type) ?? [];
        let propagate = true;
        let cancelled = false;

        const stopPropagation = () => { propagate = false; };
        const cancel = () => { cancelled = true; };

        for (const listener of listenerList) {
            if (cancelled) {
                return;
            }
            listener({type: event.type, data: event.data, stopPropagation, cancel});
        }
        if (propagate) {
            this.parent?.raise(event);
        }
    }
}