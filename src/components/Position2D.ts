import { Vector2Mutable } from "src/util/math/Vector2Mutable";
import { ComponentType } from "../base/Component";

export const Position2D = new ComponentType<"position2d", Vector2Mutable>(
    "position2d",
);
