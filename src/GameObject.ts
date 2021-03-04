import { SkyNode } from "@hanul/skynode";
import * as PIXI from "pixi.js";

export interface GameObjectOptions {
    x: number;
    y: number;
}

export default class GameObject extends SkyNode {

    protected children: GameObject[] = [];
    protected pixiContainer: PIXI.Container = new PIXI.Container();

    constructor(options: GameObjectOptions) {
        super();
    }

    public add(node: GameObject, index?: number): void {
        super.add(node, index);
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