import {ECS} from "../base/ECS";
import {Lifetime} from "../components/Lifetime";
import {LifetimeSystem} from "./LifetimeSystem";

describe(module.id, () => {
    it("should remove entities with lifetimes below 0", () => {
        const ecs = new ECS(1);

        ecs.addComponentType(Lifetime);

        ecs.addSystem(LifetimeSystem);

        ecs.finishRegistration();

        const ent1 = ecs.createEntity();
        ent1.addComponentLiteral(Lifetime, 3000);
        ecs.update(3000);
        expect(ecs.getEntity(ent1.id)).toBeFalsy();
    });

    it("should leave other entities alone", () => {
        const ecs = new ECS(1);

        ecs.addComponentType(Lifetime);

        ecs.addSystem(LifetimeSystem);

        ecs.finishRegistration();

        const ent1 = ecs.createEntity();
        ent1.addComponentLiteral(Lifetime, 3000);
        ecs.update(1000);
        expect(ecs.getEntity(ent1.id)).toBeTruthy();
    });
});
