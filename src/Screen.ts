import el from "@hanul/el.js";
import * as PIXI from "pixi.js";
import GameObject from "./GameObject";

class Screen extends GameObject {

    private canvas: HTMLCanvasElement;
    private leftLetterbox: HTMLElement;
    private topLetterbox: HTMLElement;
    private rightLetterbox: HTMLElement;
    private bottomLetterbox: HTMLElement;

    private renderer: PIXI.Renderer;
    private stage: PIXI.Container;

    constructor() {
        super(0, 0);

        document.body.append(
            this.canvas = el("canvas"),
            this.leftLetterbox = el("div"),
            this.topLetterbox = el("div"),
            this.rightLetterbox = el("div"),
            this.bottomLetterbox = el("div"),
        );

        el.style(this.canvas, {
            position: 'fixed',
            zIndex: -1,
        });

        for (const letterbox of [this.leftLetterbox, this.topLetterbox, this.rightLetterbox, this.bottomLetterbox]) {
            el.style(letterbox, {
                position: 'fixed',
                zIndex: 9999998,
                backgroundColor: '#000',
            });
        }

        el.style(this.leftLetterbox, { left: 0, top: 0, height: '100%' });
        el.style(this.topLetterbox, { left: 0, top: 0, width: '100%' });
        el.style(this.rightLetterbox, { right: 0, top: 0, height: '100%' });
        el.style(this.bottomLetterbox, { left: 0, bottom: 0, width: '100%' });

        this.renderer = new PIXI.Renderer({ view: this.canvas, transparent: true });
        this.renderer.plugins.interaction.autoPreventDefault = false;

        this.stage = new PIXI.Container();
        this.stage.addChild(this.pixiContainer);

        console.log("TEST");
    }
}

export default new Screen();
