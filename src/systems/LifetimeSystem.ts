import { BaseSystem } from '../base/BaseSystem';
import { Entity } from '../base/Entity';
import { Scene } from '../base/Scene';
import { Lifetime } from '../components/Lifetime';

export class LifetimeSystem extends BaseSystem<[typeof Lifetime]> {
    constructor(scene: Scene) {
        super(scene, [Lifetime], []);
    }

    override entityUpdate(deltaTimeMs: number, entity: Entity) {
        const { lifetime } = this.getComponents(entity);
        const newLifetime = lifetime - deltaTimeMs;
        if (newLifetime <= 0) {
            this.scene?.deleteEntity(entity.id);
            return;
        }
        entity.updateComponent(Lifetime, newLifetime);
    }
}
