import {BaseSystem} from "../base/BaseSystem";
import {ECS} from "../base/ECS";
import {Entity} from "../base/Entity";
import {Lifetime} from "../components/Lifetime";

export class LifetimeSystem extends BaseSystem<[typeof Lifetime]> {
    constructor(ecs: ECS) {
        super(ecs, [Lifetime], []);
    }

    override entityUpdate(deltaTimeMs: number, entity: Entity) {
        const {lifetime} = this.getComponents(entity);
        const newLifetime = lifetime - deltaTimeMs;
        if (newLifetime <= 0) {
            this.ecs.deleteEntity(entity.id);
            return;
        }
        entity.updateComponent(Lifetime, newLifetime);
    }
}
