import { assertNotNullOrUndefined } from "../Assertions";
import Vector2 from "./Vector2";

export function expectVector2CloseTo(vector: Vector2 | undefined, x: number, y: number, threshold = 0.0001) {
    assertNotNullOrUndefined(vector);
    expect(vector.x).toBeCloseTo(x, threshold);
    expect(vector.y).toBeCloseTo(y, threshold);
}