import { SkyNode } from "@hanul/skynode";
import * as PIXI from "pixi.js";

export interface GameNodeOptions {
    x?: number;
    y?: number;
}

export default class GameNode extends SkyNode {

    protected children: GameNode[] = [];
    public pixiContainer: PIXI.Container = new PIXI.Container();

    constructor(options: GameNodeOptions) {
        super();
        if (options.x !== undefined) { this.x = options.x; }
        if (options.y !== undefined) { this.y = options.y; }
    }

    public set x(x: number) {
        this.pixiContainer.x = x;
    }

    public set y(y: number) {
        this.pixiContainer.y = y;
    }

    public step(deltaTime: number) {
    }

    public append(...nodes: GameNode[]): void {
        super.append(...nodes);
        for (const node of nodes) {
            this.pixiContainer.addChild(node.pixiContainer);
        }
    }

    public appendTo(node: GameNode, index: number): void {
        super.appendTo(node, index);
        if (index < this.children.length) {
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