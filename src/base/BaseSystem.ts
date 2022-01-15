import {FirstArgument} from "../util/types/Functions";
import {ComponentType} from "./Component";
import {ECS} from "./ECS";
import {Entity} from "./Entity";

export interface IntervalStorage {
    rate: number;
    elapsed: number;
}

export abstract class BaseSystem<
    Required extends Array<ComponentType> = [],
    Excluded extends Array<ComponentType> = [],
> {
    protected readonly entities: Set<number> = new Set();
    protected readonly requiredIds: Set<string>;
    protected readonly excludedIds: Set<string>;
    private ticked = false;

    constructor(
        protected readonly ecs: ECS,
        protected readonly required: Required,
        protected readonly excluded: Excluded,
        protected readonly doEntityUpdate = true
    ) {
        this.ecs.componentStore.addCreateListener(
            this.notifyCreated.bind(this),
        );
        this.ecs.componentStore.addRemoveListener(
            this.notifyRemoved.bind(this),
        );
        this.requiredIds = new Set([...this.required.map((it) => it.key)]);
        this.excludedIds = new Set([...this.excluded.map((it) => it.key)]);
    }

    /**
     * @returns The number of entities tracked by this system.
     */
    public getTrackedCount(): number {
        return this.entities.size;
    }

    /**
     * Stops tracking all currently tracked entities.
     */
    public clear(): void {
        this.entities.clear();
    }

    /**
     * Runs system update functions.
     * 
     * @param elapsedTimeMs The amount of time since the last update.
     */
    public update(elapsedTimeMs: number): void {
        this.checkFirstTick();
        this.systemUpdate(elapsedTimeMs);
        if (this.doEntityUpdate) {
            for (const entityId of this.entities) {
                const entity = this.ecs.getEntity(entityId);
                entity && this.entityUpdate(elapsedTimeMs, entity);
            }
        }
        this.postUpdate(elapsedTimeMs);
    }

    /**
     * Intended to be overridden. Called on the first update.
     */
    protected onFirstTick(): void {
        return;
    }

    /**
     * Intended to be overridden. Called before entities are updated.
     */
    protected systemUpdate(_elapsedTimeMs: number): void {
        return;
    }

    /**
     * Intended to be overridden. Called for each tracked entity if entity updating is enabled.
     */
    protected entityUpdate(_elapsedTimeMs: number, _entity: Entity): void {
        return;
    }

    /**
     * Intended to be overridden. Called after entities are updated.
     */
    protected postUpdate(_elapsedTimeMs: number): void {
        return;
    }

    /**
     * Checks if a given entity should be tracked.
     * 
     * @param componentType The component type being added to the entity
     * @param entity The entity being added to
     * @returns Whether the entity should be tracked
     */
    protected shouldTrack(componentType: ComponentType, entity: Entity): boolean {
        if (this.checkAllRequiredComponents(componentType, entity) && this.checkNoExcludedComponents(componentType, entity)) {
            return true;
        }
        return false;
    }

    /**
     * Checks if an entity has all required components to be tracked by this system.
     * 
     * @param componentType The component type being added to the entity
     * @param entity The entity being checked
     * @returns If all required components are or will be present on the entity
     */
    protected checkAllRequiredComponents(componentType: ComponentType, entity: Entity): boolean {
        for (const requirement of this.required) {
            if (!entity.hasComponent(requirement) && componentType != requirement) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if a given entity should no longer be tracked.
     * 
     * @param componentType The component being removed from the entity
     * @param _entity The entity being removed from; ignored by default
     * @returns Whether the entity should be removed
     */
    protected shouldRemove<T>(componentType: ComponentType<string, T>, _entity: Entity) {
        if (this.requiredIds.has(componentType.key)) {
            return true;
        }
        return false;
    }

    /**
     * Checks if a given entity has any excluded components.
     * 
     * @param componentType The component being added to the entity
     * @param entity The entity being added to
     * @returns Whether the entity is free of excluded components
     */
    protected checkNoExcludedComponents(componentType: ComponentType, entity: Entity): boolean {
        for (const exclusion of this.excluded) {
            if (entity.hasComponent(exclusion) || componentType == exclusion) {
                return false;
            }
        }
        return true;
    }

    /**
     * Pulls required components from an entity. Throws an exception if a required component is not present.
     * 
     * @param entity The entity to pull components from
     * @returns A map of the components with ComponentType.key => component data
     */
    protected getComponents(entity: Entity): {
        [R in Required[number]["key"]]: FirstArgument<Required[number]["new"]>;
    } {
        const res: {[key: string]: any} = {};
        this.required.forEach(
            (type) => (res[type.key] = this.getComponentOrThrow(entity, type)),
        );
        // NOTE(hhenrichsen): This is a really complex type that ensures the
        // above happens, but I don't know how to make TypeScript see it that
        // way other than a cast.
        return res as {
            [R in Required[number]["key"]]: FirstArgument<Required[number]["new"]>;
        };
    }

    /**
     * Gets a component from an entity if it exists; throws an error if it does not.
     * 
     * @param entity The entity to pull the component from
     * @param componentType The component to pull
     * @returns The component data
     */
    private getComponentOrThrow<T>(
        entity: Entity,
        componentType: ComponentType<string, T>,
    ): T {
        const component = entity.getComponent(componentType);
        if (!component) {
            if (componentType.key in this.required) {
                throw new Error(
                    `Failed to get required component ${componentType.key} in tracked entity ${entity.id}`,
                );
            } else
                throw new Error(
                    `Failed to get expected component ${componentType.key} in tracked entity ${entity.id}. Is is marked as required?`,
                );
        }
        return component;
    }

    private notifyCreated<T>(
        componentType: ComponentType<string, T>,
        entityId: number,
        _data: T,
    ): void {
        const entity = this.ecs.getEntity(entityId);
        if (entity) {
            this.shouldTrack(componentType, entity)
                ? this.entities.add(entity.id)
                : this.entities.delete(entity.id);
        }
    }

    private notifyRemoved<T>(
        componentType: ComponentType<string, T>,
        entityId: number,
        _data: T,
    ): void {
        const entity = this.ecs.getEntity(entityId);
        if (entity) {
            this.shouldRemove(componentType, entity) && this.entities.delete(entity.id);
        }
    }

    private checkFirstTick() {
        if (!this.ticked) {
            this.ticked = true;
            this.onFirstTick();
        }
    }
}
