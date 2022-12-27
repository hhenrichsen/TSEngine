import { Vector2Mutable } from "src/util/math/Vector2Mutable";
import { ComponentType } from "../base/Component";

export const Velocity2D = new ComponentType<"velocity2d", Vector2Mutable>(
    "velocity2d",
);
