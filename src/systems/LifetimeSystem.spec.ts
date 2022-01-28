import { createTestScene } from "../base/Game.test";
import {Lifetime} from "../components/Lifetime";
import {LifetimeSystem} from "./LifetimeSystem";

describe(module.id, () => {
    it("should remove entities with lifetimes below 0", () => {
        const { game, scene } = createTestScene([Lifetime]);

        scene.addSystem(LifetimeSystem);

        const ent1 = scene.createEntity();
        ent1.addComponentLiteral(Lifetime, 3000);
        game.update(3000);
        expect(scene.getEntity(ent1.id)).toBeFalsy();
    });

    it("should leave other entities alone", () => {
        const { game, scene } = createTestScene([Lifetime]);

        scene.addSystem(LifetimeSystem);

        const ent1 = scene.createEntity();
        ent1.addComponentLiteral(Lifetime, 3000);
        game.update(1000);
        expect(scene.getEntity(ent1.id)).toBeTruthy();
    });
});
