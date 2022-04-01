export { Game } from "./base/Game";

import { Lifetime } from "./components/Lifetime";
import { Position2D } from "./components/Position2D";
import { Velocity2D } from "./components/Velocity2D";
import { LifetimeSystem } from "./systems/LifetimeSystem";
import { VelocitySystem } from "./systems/VelocitySystem";
import { Arrays } from "./util/Arrays";
import { LinkedList } from "./util/data/LinkedList";
import { LRUCache } from "./util/data/LRUCache";
import { Maps } from "./util/Maps";
import { Sets } from "./util/Sets";

export const DefaultComponents = {
    Position2D,
    Velocity2D,
    Lifetime,
};

export const DefaultSystems = {
    VelocitySystem,
    LifetimeSystem,
};

export const Util = {
    LinkedList,
    LRUCache,
    Arrays,
    Sets,
    Maps,
};
