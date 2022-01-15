import {ComponentType} from "../base/Component";
import {Vector2} from "../util/math/Vector2";

export const Velocity2D = new ComponentType<"velocity2d", Vector2>(
    "velocity2d",
);
