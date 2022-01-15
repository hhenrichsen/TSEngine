import {Component, ComponentType} from "./Component";
import {ComponentStore} from "./ComponentStore";

export class Entity {
    private components: Map<string, number> = new Map();

    constructor(
        public readonly id: number,
        private readonly store: ComponentStore,
    ) {}

    /**
     * Gets a given component from this entity.
     * 
     * @param componentType The type of component to get.
     * @returns The component data, if it exists.
     */
    public getComponent<T>(
        componentType: ComponentType<string, T>,
    ): T | undefined {
        const componentId = this.components.get(componentType.key);
        if (componentId == undefined) {
            return undefined;
        }
        return this.store.get<T>(componentType, componentId);
    }

    /**
     * To be used when pass-by-reference doesn't work on the given type.
     * 
     * @param componentType The type to update. 
     * @param data The new data to set to this component.
     */
    public updateComponent<T>(
        componentType: ComponentType<string, T>,
        data: T,
    ): void {
        const componentId = this.components.get(componentType.key);
        if (componentId == undefined) {
            return;
        }
        return this.store.update<T>(componentType, componentId, data);
    }

    /**
     * Removes a component from this entity.
     * 
     * @param componentType The type of component to remove.
     */
    public removeComponent<T>(componentType: ComponentType<string, T>) {
        const componentId = this.components.get(componentType.key);
        if (componentId == undefined) {
            return;
        }
        this.store.remove(componentType, componentId);
        this.components.delete(componentType.key);
    }

    /**
     * Looks for a component on this entity.
     * 
     * @param componentType The type of component to look for.
     * @returns If the component exists on this entity.
     */
    public hasComponent<T>(componentType: ComponentType<string, T>): boolean {
        return this.components.has(componentType.key);
    }

    /**
     * Adds a pre-packaged component to this entity.
     * 
     * @param component The component to add.
     */
    public addComponent<T>(component: Component<T>) {
        if (this.hasComponent(component.type)) {
            return;
        }
        const componentId = this.store.create(component);
        this.components.set(component.type.key, componentId);
    }

    /**
     * Adds a component to this entity.
     * 
     * @param componentType The type of component to add.
     * @param data The data to add to the component.
     */
    public addComponentLiteral<T>(
        componentType: ComponentType<string, T>,
        data: T,
    ) {
        if (this.hasComponent(componentType)) {
            return;
        }
        const componentId = this.store.createLiteral(componentType, data);
        this.components.set(componentType.key, componentId);
    }

    /**
     * Shortcut to remove all components from this entity.
     */
    public clear() {
        for (const [componentType, componentId] of this.components) {
            const type = this.store.getType(componentType);
            if (!type) {
                continue;
            }
            this.store.remove(type, componentId);
        }
        this.components.clear();
    }
}
