import { ComponentType } from "./Component";
import { Game } from "./Game";

export function createTestScene(components: ComponentType<string, unknown>[], name = "test") {
    const game = new Game();
    const scene = game.createScene(name);
    scene.addComponentTypes(...components);
    scene.finishRegistration();
    game.setActiveScene(name);

    return {game, scene};
}