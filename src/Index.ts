import { Game } from "./base/Game";

import { Position2D } from "./components/Position2D";
import { Velocity2D } from "./components/Velocity2D";
import { Lifetime } from "./components/Lifetime";

import { VelocitySystem } from "./systems/VelocitySystem";
import { LifetimeSystem } from "./systems/LifetimeSystem";

import { LRUCache } from "./util/data/LRUCache";
import { LinkedList } from "./util/data/LinkedList";
import { Sets } from "./util/Sets";
import { Arrays } from "./util/Arrays";
import { Maps } from "./util/Maps";

const DefaultComponents = {
    Position2D, Velocity2D, Lifetime
}

const DefaultSystems = {
    VelocitySystem, LifetimeSystem 
}

const Util = {
    LinkedList, LRUCache, Arrays, Sets, Maps
}

export const TSEngine = { Game, Util, DefaultComponents, DefaultSystems };