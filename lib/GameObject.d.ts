import { SkyNode } from "@hanul/skynode";
import * as PIXI from "pixi.js";
export interface GameObjectOptions {
    x: number;
    y: number;
}
export default class GameObject extends SkyNode {
    protected children: GameObject[];
    protected pixiContainer: PIXI.Container;
    constructor(options: GameObjectOptions);
    add(node: GameObject, index?: number): void;
    delete(): void;
}
//# sourceMappingURL=GameObject.d.ts.map