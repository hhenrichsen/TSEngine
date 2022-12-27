import { GameEventType } from "../event/Event";
import { GameEventTarget } from "../event/EventTarget";
import { isNullOrUndefined } from "../util/PrimitiveTypeguards";
import { Component, ComponentType } from "./Component";

interface InternalComponent<T> {
    data?: T;
}

export interface ComponentCreatedEvent<T> {
    type: ComponentType<string, T>;
    id: number;
    data: T;
}

export const ComponentCreated = new GameEventType<
    "ComponentCreated",
    ComponentCreatedEvent<unknown>
>("ComponentCreated");

export interface ComponentRemovedEvent<T> {
    type: ComponentType<string, T>;
    id: number;
    data: T;
}

export const ComponentRemoved = new GameEventType<
    "ComponentRemoved",
    ComponentRemovedEvent<unknown>
>("ComponentRemoved");

export interface ComponentUpdatedEvent<T> {
    type: ComponentType<string, T>;
    id: number;
    oldData: T;
    newData: T;
}

export const ComponentUpdated = new GameEventType<
    "ComponentUpdated",
    ComponentUpdatedEvent<unknown>
>("ComponentUpdated");

export interface ComponentTypeCreatedEvent {
    type: string;
    forced: boolean;
}

export const ComponentTypeCreated = new GameEventType<
    "ComponentTypeCreated",
    ComponentTypeCreatedEvent
>("ComponentTypeCreated");

export class ComponentStore extends GameEventTarget {
    private registrationFinished = false;
    private componentTypes: Record<string, ComponentType> = {};
    private pools: Record<string, InternalComponent<any>[]> = {};
    private unusedIds: Record<string, number[]> = {};

    constructor(
        private readonly poolSize: number = 2000,
        private readonly parentStore?: ComponentStore,
        parentEventTarget?: GameEventTarget,
    ) {
        super(parentEventTarget);
    }

    public getType(id: string): ComponentType<string, any> | undefined {
        return this.componentTypes[id];
    }

    public registerComponentType(
        componentType: ComponentType,
        wasForced = false,
    ) {
        const existingComponent = this.componentTypes[componentType.key];
        this.raise(
            ComponentTypeCreated.with({
                type: componentType.key,
                forced: wasForced,
            }),
        );
        if (existingComponent) {
            throw new Error(
                `A component already exists with componentName ${componentType.key}, and the force parameter was not set when registering it.`,
            );
        }
        this.componentTypes[componentType.key] = componentType;
    }

    public forceRegisterComponentType(componentType: ComponentType) {
        if (this.registrationFinished) {
            throw new Error(
                `Trying to register component type ${componentType.key} after registration is finished.`,
            );
        }
        this.registerComponentType(componentType, true);
    }

    public create<T>(component: Component<T>) {
        return this.createLiteral(component.type, component.data);
    }

    public createLiteral<T>(type: ComponentType<string, T>, data: T): number {
        const key = type.key;
        const pool = this.pools[key];
        const ids = this.unusedIds[key];
        if (isNullOrUndefined(pool)) {
            throw new Error(
                `Trying to create unknown component type ${type.key}. Was it registered?`,
            );
        }
        const id = ids.pop();
        const newId = id ?? pool.length;
        if (isNullOrUndefined(id)) {
            pool.push({});
        }
        pool[newId].data = data;
        this.raise(ComponentCreated.with({ type, id: newId, data }));
        return newId;
    }

    public get<T>(type: ComponentType<string, T>, index: number): T {
        const pool = this.pools[type.key];
        if (isNullOrUndefined(pool)) {
            if (this.parentStore != undefined) {
                return this.parentStore.get(type, index);
            }
            throw new Error(
                `Trying to get unknown component type ${type.key}. Was it registered?`,
            );
        }
        const element = pool[index];
        if (isNullOrUndefined(element.data)) {
            if (this.parentStore != undefined) {
                return this.parentStore.get(type, index);
            }
            throw new Error(
                `Trying to access unknown component instance ${type.key} ${index}.`,
            );
        }
        return element.data;
    }

    public update<T>(type: ComponentType<string, T>, index: number, data: T) {
        const pool = this.pools[type.key];
        if (isNullOrUndefined(pool)) {
            if (this.parentStore != undefined) {
                this.parentStore.update(type, index, data);
                return;
            }
            throw new Error(
                `Trying to get unknown component type ${type.key}. Was it registered?`,
            );
        }
        const element = pool[index];
        if (isNullOrUndefined(element.data)) {
            if (this.parentStore != undefined) {
                this.parentStore.update(type, index, data);
                return;
            }
            throw new Error(
                `Trying to access unknown component instance ${type.key} ${index}.`,
            );
        }
        this.raise(
            ComponentUpdated.with({
                type,
                id: index,
                oldData: element.data,
                newData: data,
            }),
        );
        element.data = data;
    }

    public remove<T>(type: ComponentType<string, T>, index: number) {
        const key = type.key;
        const pool = this.pools[key];
        const ids = this.unusedIds[key];
        if (isNullOrUndefined(pool)) {
            if (this.parentStore != undefined) {
                this.parentStore.remove(type, index);
                return;
            }
            throw new Error(
                `Trying to remove unknown component type ${type.key}. Was it registered?`,
            );
        }
        this.raise(
            ComponentRemoved.with({
                type,
                id: index,
                data: pool[index].data,
            }),
        );
        pool[index].data = null;
        ids.push(index);
    }

    public finishRegistration() {
        this.registrationFinished = true;
        this.initPool();
    }

    private initPool() {
        this.pools = {};
        for (const componentTypeName in this.componentTypes) {
            this.pools[componentTypeName] = [];
            this.unusedIds[componentTypeName] = [];
            for (let i = 0; i < this.poolSize; i++) {
                this.unusedIds[componentTypeName].push(i);
                this.pools[componentTypeName].push({ data: undefined });
            }
        }
    }
}
