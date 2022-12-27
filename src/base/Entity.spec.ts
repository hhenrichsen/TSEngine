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
        const entity = scene.createEntity();
        return { entity };
    };

    test("Should have a component", () => {
        const { entity } = setup();

        entity.addComponentLiteral(Lifetime, 0);
        expect(entity.hasComponent(Lifetime)).toBeTruthy();
        expect(entity.getComponent(Lifetime)).toBe(0);
    });

    test("Should not update by creating new components", () => {
        const { entity } = setup();

        entity.addComponentLiteral(Lifetime, 0);
        entity.addComponentLiteral(Lifetime, 100);
        expect(entity.getComponent(Lifetime)).toBe(0);
    });

    test("Should udpate with the update method", () => {
        const { entity } = setup();

        entity.addComponentLiteral(Lifetime, 0);
        entity.updateComponent(Lifetime, 100);
        expect(entity.getComponent(Lifetime)).toBe(100);
    });

    test("Should not update by creating new components", () => {
        const { entity } = setup();

        entity.addComponentLiteral(Lifetime, 100);
        entity.addComponent({ type: Lifetime, data: 0 });
        expect(entity.getComponent(Lifetime)).toBe(100);
    });

    test("Should not be able to get the component", () => {
        const { entity } = setup();

        entity.addComponentLiteral(Lifetime, 100);
        entity.removeComponent(Lifetime);
        expect(entity.getComponent(Lifetime)).toBeFalsy();
    });

    test("Should be able to add the component again", () => {
        const { entity } = setup();

        entity.addComponentLiteral(Lifetime, 0);
        entity.addComponent({ type: Lifetime, data: 0 });
        expect(entity.getComponent(Lifetime)).toBe(0);
    });

    test("Should not be able to get nonexistent components", () => {
        const { entity } = setup();

        expect(entity.getComponent(Position2D)).toBeFalsy();
    });

    test("Should not be able to update nonexistent components", () => {
        const { entity } = setup();

        entity.updateComponent(Position2D, Vector2Mutable.Ones);
        expect(entity.getComponent(Position2D)).toBeFalsy();
    });
});
