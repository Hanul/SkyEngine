import el from "@hanul/el.js";
import * as PIXI from "pixi.js";
import GameObject from "./GameObject";
import Loop from "./Loop";

class Screen extends GameObject {

    private canvas: HTMLCanvasElement;
    private leftLetterbox: HTMLElement;
    private topLetterbox: HTMLElement;
    private rightLetterbox: HTMLElement;
    private bottomLetterbox: HTMLElement;

    private renderer: PIXI.Renderer;
    private stage: PIXI.Container;

    private loop: Loop;

    public left = 0;
    public top = 0;
    public width = 0;
    public height = 0;
    public ratio = 0;

    public followX = 0;
    public followY = 0;

    public cameraFollowCenterX = 0;
    public cameraFollowCenterY = 0;
    public cameraFollowXTarget: GameObject | undefined;
    public cameraFollowYTarget: GameObject | undefined;

    public cameraMinFollowX: number | undefined;
    public cameraMinFollowY: number | undefined;
    public cameraMaxFollowX: number | undefined;
    public cameraMaxFollowY: number | undefined;

    constructor(fps?: number) {
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

        this.loop = new Loop(fps, () => {
            //TODO:
        });
    }

    public get cameraFollowX(): number {
        if (this.cameraFollowXTarget === undefined) {
            return this.followX;
        }
        this.followX = this.cameraFollowXTarget.realX - this.cameraFollowCenterX;
        if (this.cameraMinFollowX !== undefined && this.followX < this.cameraMinFollowX) {
            return this.cameraMinFollowX;
        }
        if (this.cameraMaxFollowX !== undefined && this.followX > this.cameraMaxFollowX) {
            return this.cameraMaxFollowX;
        }
        return this.followX;
    }

    public get cameraFollowY(): number {
        if (this.cameraFollowYTarget === undefined) {
            return this.followY;
        }
        this.followY = this.cameraFollowYTarget.realY - this.cameraFollowCenterY;
        if (this.cameraMinFollowY !== undefined && this.followY < this.cameraMinFollowY) {
            return this.cameraMinFollowY;
        }
        if (this.cameraMaxFollowY !== undefined && this.followY > this.cameraMaxFollowY) {
            return this.cameraMaxFollowY;
        }
        return this.followY;
    }
}

export default new Screen();
