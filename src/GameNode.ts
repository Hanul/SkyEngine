import { SkyNode } from "@hanul/skynode";
import * as PIXI from "pixi.js";
import Figure from "./figure/Figure";

export interface GameNodeOptions {
    x?: number;
    y?: number;
    colliders?: Figure[];
}

export default class GameNode extends SkyNode {

    protected children: GameNode[] = [];
    public pixiContainer: PIXI.Container = new PIXI.Container();

    private speedX = 0; private speedY = 0;
    private accelX = 0; private accelY = 0;
    private minSpeedX: number | undefined; private minSpeedY: number | undefined;
    private maxSpeedX: number | undefined; private maxSpeedY: number | undefined;
    private toX: number | undefined; private toY: number | undefined;

    private moveYEndHandler: (() => void) | undefined;

    constructor(options?: GameNodeOptions) {
        super();
        if (options?.x !== undefined) { this.x = options.x; }
        if (options?.y !== undefined) { this.y = options.y; }
    }

    public set x(x: number) {
        this.pixiContainer.x = x;
    }

    public set y(y: number) {
        this.pixiContainer.y = y;
    }

    public moveDown(options: {
        speed: number,
        accel?: number,
        maxSpeed?: number,
        toY?: number,
    }, moveEndHandler?: () => void): void {
        this.speedY = options.speed;
        this.accelY = options.accel === undefined ? 0 : options.accel;
        this.minSpeedY = 0;
        this.maxSpeedY = options.maxSpeed;
        this.toY = options.toY;
        if (moveEndHandler !== undefined) {
            this.on("moveEndY", moveEndHandler);
        }
    }

    public step(deltaTime: number) {
    }

    public appendTo(node: GameNode, index?: number): void {
        super.appendTo(node, index);
        if (index !== undefined && index < this.children.length) {
            this.pixiContainer.addChildAt(node.pixiContainer, index);
        } else {
            this.pixiContainer.addChild(node.pixiContainer);
        }
    }

    public delete(): void {
        this.pixiContainer.destroy();
        super.delete();
    }
}