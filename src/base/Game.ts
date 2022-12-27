import { GameEventTarget } from "../event/EventTarget";
import { Scene } from "./Scene";

export class Game extends GameEventTarget {
    private globalScene: Scene;
    private activeScene?: Scene;
    private scenes: Map<string, Scene> = new Map();

    constructor(parent?: GameEventTarget, globalSize = 100) {
        super(parent);
        this.globalScene = new Scene(globalSize, false);
    }

    public createScene(name: string, initialPoolSize = 2000) {
        const scene = new Scene(initialPoolSize, true, undefined, this);
        this.scenes.set(name, scene);
        return scene;
    }

    public update(ms: number) {
        this.globalScene.update(ms);
        this.activeScene?.update(ms);
    }

    public setActiveScene(name: string) {
        const scene = this.scenes.get(name);
        this.activeScene = scene;
        if (!scene) {
            return;
        }
    }

    public getActiveScene(): Scene | undefined {
        return this.activeScene;
    }
}
