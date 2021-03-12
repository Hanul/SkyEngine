import { SkyNode } from "@hanul/skynode";
import * as PIXI from "pixi.js";
import Figure from "./figure/Figure";
export interface GameNodeOptions {
    x?: number;
    y?: number;
    colliders?: Figure[];
}
export default class GameNode extends SkyNode {
    protected children: GameNode[];
    pixiContainer: PIXI.Container;
    private speedX;
    private speedY;
    private accelX;
    private accelY;
    private minSpeedX;
    private minSpeedY;
    private maxSpeedX;
    private maxSpeedY;
    private toX;
    private toY;
    private moveYEndHandler;
    constructor(options?: GameNodeOptions);
    set x(x: number);
    set y(y: number);
    moveDown(options: {
        speed: number;
        accel?: number;
        maxSpeed?: number;
        toY?: number;
    }, moveEndHandler?: () => void): void;
    step(deltaTime: number): void;
    append(...nodes: GameNode[]): void;
    appendTo(node: GameNode, index: number): void;
    delete(): void;
}
//# sourceMappingURL=GameNode.d.ts.map