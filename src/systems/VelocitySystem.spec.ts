import { Position2D } from "../components/Position2D";
import { Velocity2D } from "../components/Velocity2D";
import { createTestScene } from "../testutils/SceneMock";
import { Vector2 } from "../util/math/Vector2";
import { VelocitySystem } from "./VelocitySystem";

export function expectVector2CloseTo(
    vector: Vector2 | undefined,
    x: number,
    y: number,
    threshold = 0.0001
) {
    expect(vector).toBeTruthy();
    expect(vector.x).toBeCloseTo(x, threshold);
    expect(vector.y).toBeCloseTo(y, threshold);
}

describe(module.id, () => {
    test("should move entities appropriately", () => {
        const { scene, game } = createTestScene([Position2D, Velocity2D]);

        scene.addSystem(VelocitySystem);

        const ent1 = scene.createEntity();
        ent1.addComponentLiteral(Position2D, new Vector2(0, 0));
        ent1.addComponentLiteral(Velocity2D, new Vector2(1, 0));

        game.update(1000);
        const positionTick1 = ent1.getComponent(Position2D);
        expectVector2CloseTo(positionTick1, 1, 0);

        game.update(2000);
        const positionTick2 = ent1.getComponent(Position2D);
        expectVector2CloseTo(positionTick2, 3, 0);

        game.update(16.33);
        const positionTick3 = ent1.getComponent(Position2D);
        expectVector2CloseTo(positionTick3, 3.016, 0);
    });
});
