import {ComponentType} from "../base/Component";
import {Vector2} from "../util/math/Vector2";

export const Position2D = new ComponentType<"position2d", Vector2>(
    "position2d",
);
