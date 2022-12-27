import { Lifetime } from "../components/Lifetime";
import { Position2D } from "../components/Position2D";
import { Vector2Mutable } from "../util/math/Vector2Mutable";
import { Entity } from "./Entity";
import { Game } from "./Game";

describe(module.id, () => {
    let entity: Entity;

    beforeEach(() => {
        const game = new Game();
        const scene = game.createScene("test");
        scene.addComponentType(Lifetime);
        scene.finishRegistration();
        entity = scene.createEntity();
    });

    test("Should have a component", () => {
        entity.addComponentLiteral(Lifetime, 0);
        expect(entity.hasComponent(Lifetime)).toBeTruthy();
        expect(entity.getComponent(Lifetime)).toBe(0);
    });

    test("Should not update by creating new components", () => {
        entity.addComponentLiteral(Lifetime, 0);
        entity.addComponentLiteral(Lifetime, 100);
        expect(entity.getComponent(Lifetime)).toBe(0);
    });

    test("Should udpate with the update method", () => {
        entity.addComponentLiteral(Lifetime, 0);
        entity.updateComponent(Lifetime, 100);
        expect(entity.getComponent(Lifetime)).toBe(100);
    });

    test("Should not update by creating new components", () => {
        entity.addComponentLiteral(Lifetime, 100);
        entity.addComponent({ type: Lifetime, data: 0 });
        expect(entity.getComponent(Lifetime)).toBe(100);
    });

    test("Should not be able to get the component", () => {
        entity.addComponentLiteral(Lifetime, 100);
        entity.removeComponent(Lifetime);
        expect(entity.getComponent(Lifetime)).toBeFalsy();
    });

    test("Should be able to add the component again", () => {
        entity.addComponentLiteral(Lifetime, 0);
        entity.addComponent({ type: Lifetime, data: 0 });
        expect(entity.getComponent(Lifetime)).toBe(0);
    });

    test("Should not be able to get nonexistent components", () => {
        expect(entity.getComponent(Position2D)).toBeFalsy();
    });

    test("Should not be able to update nonexistent components", () => {
        entity.updateComponent(Position2D, Vector2Mutable.ONES);
        expect(entity.getComponent(Position2D)).toBeFalsy();
    });
});
