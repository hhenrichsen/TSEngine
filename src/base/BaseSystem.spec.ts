import { BaseSystem } from "./BaseSystem";
import { ComponentType } from "./Component";
import { createTestScene } from "./Game.test";
import { Scene } from "./Scene";

describe(module.id, () => {
    const TestComponent1 = new ComponentType<"testComponent1", "1">("testComponent1");
    const TestComponent2 = new ComponentType<"testComponent2", "2">("testComponent2");

    class TestBaseSystem extends BaseSystem<[typeof TestComponent1, typeof TestComponent2]> {
        constructor(scene: Scene) {
            super(scene, [TestComponent1, TestComponent2], []);
        }
    }

    it("should only track entities with all required components", () => {
        const {scene} = createTestScene([TestComponent1, TestComponent2]);

        const system = scene.addSystem(TestBaseSystem);

        expect(system.getTrackedCount()).toBe(0);

        const entity1 = scene.createEntity();
        expect(entity1).withContext("Should have created an entity").toBeTruthy();
        const entity2 = scene.createEntity();
        expect(entity2).withContext("Should have created a second entity").toBeTruthy();

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