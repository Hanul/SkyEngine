import * as PIXI from "pixi.js";
import CollisionChecker from "../CollisionChecker";
import GameObject from "../GameObject";
import ImageDataManager from "../ImageDataManager";
import loadTexture from "../loadTexture";
import Screen from "../Screen";

export default class Image extends GameObject {

    private pixiSprite: PIXI.Sprite | undefined;

    public width = 0;
    public height = 0;

    constructor(x: number, y: number, private src: string) {
        super(x, y);
        this.setSrc(src);
    }

    public async setSrc(src: string): Promise<void> {
        const texture = await loadTexture(src);

        this.width = texture.width;
        this.height = texture.height;

        if (this.pixiSprite !== undefined) {
            this.deleteFromPixiContainer(this.pixiSprite);
        }

        this.pixiSprite = PIXI.Sprite.from(texture);
        this.pixiSprite.anchor.x = 0.5;
        this.pixiSprite.anchor.y = 0.5;
        this.pixiSprite.zIndex = -9999999;
        if (super.blendMode !== undefined) {
            this.pixiSprite.blendMode = super.blendMode;
        }

        this.addToPixiContainer(this.pixiSprite);
        this.fireEvent("load");
    }

    public set blendMode(blendMode: PIXI.BLEND_MODES | undefined) {
        super.blendMode = blendMode;
        if (this.pixiSprite !== undefined) {
            this.pixiSprite.blendMode = blendMode === undefined ? PIXI.BLEND_MODES.NORMAL : blendMode;
        }
    }

    public checkPoint(x: number, y: number): boolean {

        const imageData = ImageDataManager.getCachedImageData(this.src);
        if (imageData === undefined) {
            ImageDataManager.loadAndCache(this.src);
            return super.checkPoint(x, y) === true;
        }

        const tx = x - this.drawingX;
        const ty = y - this.drawingY;

        const cos = Math.cos(-this.realRadian);
        const sin = Math.sin(-this.realRadian);

        let px = cos * tx - sin * ty;
        let py = cos * ty + sin * tx;

        px = (px + this.width * this.realScaleX / 2) / this.realScaleX;
        py = (py + this.height * this.realScaleY / 2) / this.realScaleY;

        return (px >= 0 && px < this.width && py >= 0 && py < this.height && ImageDataManager.checkPointIsTransparent(imageData, this.width, px, py) !== true) ||
            super.checkPoint(x, y) === true;
    }

    public checkOffScreen(): boolean {

        if (this.width === undefined || CollisionChecker.checkRectRect(

            Screen.cameraFollowX,
            Screen.cameraFollowY,
            Screen.width,
            Screen.height,
            1,
            1,
            0,
            1,

            this.drawingX,
            this.drawingY,
            this.width,
            this.height,
            this.realScaleX,
            this.realScaleY,
            this.realSin,
            this.realCos) === true) {

            return false;
        }

        return super.checkOffScreen();
    }

    public destroy(): void {
        this.pixiSprite = undefined;
        super.destroy();
    }
}
