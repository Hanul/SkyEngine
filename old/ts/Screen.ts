import el from "@hanul/el.js";
import * as PIXI from "pixi.js";
import Config from "./Config";
import GameObject from "./GameObject";
import Loop from "./Loop";

class Screen {

    private canvas: HTMLCanvasElement;

    private leftLetterbox: HTMLElement;
    private topLetterbox: HTMLElement;
    private rightLetterbox: HTMLElement;
    private bottomLetterbox: HTMLElement;

    private renderer: PIXI.Renderer;
    private stage: PIXI.Container;
    private _root: GameObject | undefined;

    private loop: Loop | undefined;

    private stageX = 0;
    private stageY = 0;

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

    constructor() {

        document.body.append(
            this.canvas = el("canvas"),
            this.leftLetterbox = el("div"),
            this.topLetterbox = el("div"),
            this.rightLetterbox = el("div"),
            this.bottomLetterbox = el("div"),
        );

        el.style(this.canvas, {
            position: "fixed",
            zIndex: -1,
        });

        for (const letterbox of [this.leftLetterbox, this.topLetterbox, this.rightLetterbox, this.bottomLetterbox]) {
            el.style(letterbox, {
                position: "fixed",
                zIndex: 9999998,
                backgroundColor: "#000",
            });
        }

        el.style(this.leftLetterbox, { left: 0, top: 0, height: "100%" });
        el.style(this.topLetterbox, { left: 0, top: 0, width: "100%" });
        el.style(this.rightLetterbox, { right: 0, top: 0, height: "100%" });
        el.style(this.bottomLetterbox, { left: 0, bottom: 0, width: "100%" });

        this.renderer = new PIXI.Renderer({ view: this.canvas, transparent: true });
        this.renderer.plugins.interaction.autoPreventDefault = false;

        this.stage = new PIXI.Container();

        window.addEventListener("resize", this.windowResizeHandler);
        this.windowResizeHandler();
    }

    public start(fps?: number) {
        this.loop = new Loop(fps, (deltaTime) => {
            this.root?.step(deltaTime);

            // 스테이지가 가운데 오도록
            this.stage.x = this.width / 2 - this.cameraFollowX + this.stageX;
            this.stage.y = this.height / 2 - this.cameraFollowY + this.stageY;

            this.renderer.render(this.stage);
        });
    }

    public set root(root: GameObject | undefined) {
        if (this._root !== undefined) {
            this.stage.removeChild(this._root.pixiContainer);
            this._root.destroy();
        }
        this._root = root;
        if (root !== undefined) {
            this.stage.addChild(root.pixiContainer);
        }
    }

    public get root(): GameObject | undefined { return this._root; }

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
