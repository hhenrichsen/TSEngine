import { Lifetime } from "../components/Lifetime";
import { Position2D } from "../components/Position2D";
import { Vector2Mutable } from "../util/math/Vector2Mutable";
import { Game } from "./Game";

describe(module.id, () => {
    const setup = () => {
        const game = new Game();
        const scene = game.createScene("test");
        scene.addComponentType(Lifetime);
        scene.finishRegistration();
        return { scene };
    };

    it("should be able to add and remove single components", () => {
        const { scene } = setup();
        const entity = scene.createEntity();
        expect(entity).toBeTruthy();

        entity.addComponentLiteral(Lifetime, 0);
        expect(entity.hasComponent(Lifetime)).withContext("Should have a component").toBeTrue();
        expect(entity.getComponent(Lifetime)).withContext("Should have set to the given value").toBe(0);

        entity.addComponentLiteral(Lifetime, 100);
        expect(entity.getComponent(Lifetime)).withContext("Should not update by creating new components").toBe(0);

        entity.updateComponent(Lifetime, 100);
        expect(entity.getComponent(Lifetime)).withContext("Should update with the update method").toBe(100);

        entity.addComponent({ type: Lifetime, data: 0 });
        expect(entity.getComponent(Lifetime)).withContext("Should not update by creating new components").toBe(100);

        entity.removeComponent(Lifetime);
        expect(entity.getComponent(Lifetime)).withContext("Should no longer be able to get the component").toBeFalsy();
        expect(entity.hasComponent(Lifetime)).withContext("Should no longer be able to get the component").toBeFalsy();

        entity.addComponent({ type: Lifetime, data: 0 });
        expect(entity.getComponent(Lifetime)).withContext("Should be able to add the component again").toBe(0);

        expect(entity.getComponent(Position2D)).withContext("Should not be able to get nonexistent components").toBeFalsy();

        entity.updateComponent(Position2D, Vector2Mutable.ONES);
        expect(entity.getComponent(Position2D)).withContext("Should not be able to update nonexistent components").toBeFalsy();

        entity.removeComponent(Position2D);

        const unsafeEntity = (entity as any);
        unsafeEntity.components.set("invalid", 15);

        entity.clear();
    });
});