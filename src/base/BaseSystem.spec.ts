import { createTestScene } from "../testutils/SceneMock";
import { BaseSystem } from "./BaseSystem";
import { ComponentType } from "./Component";
import { Scene } from "./Scene";

const TestComponent1 = new ComponentType<"testComponent1", "1">(
    "testComponent1"
);
const TestComponent2 = new ComponentType<"testComponent2", "2">(
    "testComponent2"
);
class TestBaseSystem extends BaseSystem<
    [typeof TestComponent1, typeof TestComponent2]
> {
    constructor(scene: Scene) {
        super(scene, [TestComponent1, TestComponent2], []);
    }
}

describe(module.id, () => {
    const setup = () => {
        const scene = createTestScene([TestComponent1, TestComponent2]).scene;
        const system = scene.addSystem(TestBaseSystem);
        return {scene, system};
    };

    test("should only track entities with all required components", () => {
        const {scene, system} = setup();

        const entity1 = scene.createEntity();
        const entity2 = scene.createEntity();

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
