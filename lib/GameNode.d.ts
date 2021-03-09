import { SkyNode } from "@hanul/skynode";
import * as PIXI from "pixi.js";
export interface GameNodeOptions {
    x?: number;
    y?: number;
}
export default class GameNode extends SkyNode {
    protected children: GameNode[];
    pixiContainer: PIXI.Container;
    constructor(options: GameNodeOptions);
    set x(x: number);
    set y(y: number);
    step(deltaTime: number): void;
    append(...nodes: GameNode[]): void;
    appendTo(node: GameNode, index: number): void;
    delete(): void;
}
//# sourceMappingURL=GameNode.d.ts.map