import el from "@hanul/el.js";
import { DomNode } from "@hanul/skynode";

export default class Screen extends DomNode<HTMLCanvasElement> {

    constructor() {
        super(el("canvas"));
        this.domElement;
    }
}
