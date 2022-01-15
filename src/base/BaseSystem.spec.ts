import { BaseSystem } from "./BaseSystem";
import { ComponentType } from "./Component";
import { ECS } from "./ECS";

describe(module.id, () => {
    const TestComponent1 = new ComponentType<"testComponent1", "1">("testComponent1");
    const TestComponent2 = new ComponentType<"testComponent2", "2">("testComponent2");

    class TestBaseSystem extends BaseSystem<[typeof TestComponent1, typeof TestComponent2]> {
        constructor(ecs: ECS) {
            super(ecs, [TestComponent1, TestComponent2], []);
        }
    }

    it("should only track entities with all required components", () => {
        const ecs = new ECS(3);

        ecs.addComponentType(TestComponent1);
        ecs.addComponentType(TestComponent2);

        const system = new TestBaseSystem(ecs);
        ecs.addSystem(system);

        ecs.finishRegistration();

        expect(system.getTrackedCount()).toBe(0);

        const entity1 = ecs.createEntity();
        const entity2 = ecs.createEntity();

        entity1.addComponentLiteral(TestComponent1, "1");
        expect(system.getTrackedCount()).toBe(0);

        entity1.addComponentLiteral(TestComponent2, "2");
        expect(system.getTrackedCount()).toBe(1);

        entity2.addComponentLiteral(TestComponent1, "1");
        expect(system.getTrackedCount()).toBe(1);

        entity2.addComponentLiteral(TestComponent2, "2");
        expect(system.getTrackedCount()).toBe(2);

        entity1.removeComponent(TestComponent1);
        expect(system.getTrackedCount()).toBe(1);

        entity1.addComponent(TestComponent1.new("1"));
        expect(system.getTrackedCount()).toBe(2);
    });
});