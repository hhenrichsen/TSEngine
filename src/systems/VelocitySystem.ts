import {BaseSystem} from "../base/BaseSystem";
import {Entity} from "../base/Entity";
import { Scene } from "../base/Scene";
import {Position2D} from "../components/Position2D";
import {Velocity2D} from "../components/Velocity2D";

export class VelocitySystem extends BaseSystem<
    [typeof Velocity2D, typeof Position2D]
> {
    constructor(scene: Scene) {
        super(scene, [Velocity2D, Position2D], []);
    }

    override entityUpdate(deltaTimeMs: number, entity: Entity) {
        const {velocity2d, position2d} = this.getComponents(entity);
        const updated = position2d.add(velocity2d.scale(deltaTimeMs / 1000));
        entity.updateComponent(Position2D, updated);
    }
}
