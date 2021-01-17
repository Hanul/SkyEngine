"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CollisionChecker_1 = __importDefault(require("../CollisionChecker"));
const GameObject_1 = __importDefault(require("../GameObject"));
const ImageDataManager_1 = __importDefault(require("../ImageDataManager"));
const loadTexture_1 = __importDefault(require("../loadTexture"));
const Screen_1 = __importDefault(require("../Screen"));
class Image extends GameObject_1.default {
    constructor(x, y, src) {
        super(x, y);
        this.src = src;
        this.width = 0;
        this.height = 0;
        this.setSrc(src);
    }
    async setSrc(src) {
        const texture = await loadTexture_1.default(src);
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
    set blendMode(blendMode) {
        super.blendMode = blendMode;
        if (this.pixiSprite !== undefined) {
            this.pixiSprite.blendMode = blendMode === undefined ? PIXI.BLEND_MODES.NORMAL : blendMode;
        }
    }
    checkPoint(x, y) {
        const imageData = ImageDataManager_1.default.getCachedImageData(this.src);
        if (imageData === undefined) {
            ImageDataManager_1.default.loadAndCache(this.src);
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
        return (px >= 0 && px < this.width && py >= 0 && py < this.height && ImageDataManager_1.default.checkPointIsTransparent(imageData, this.width, px, py) !== true) ||
            super.checkPoint(x, y) === true;
    }
    checkOffScreen() {
        if (this.width === undefined || CollisionChecker_1.default.checkRectRect(Screen_1.default.cameraFollowX, Screen_1.default.cameraFollowY, Screen_1.default.width, Screen_1.default.height, 1, 1, 0, 1, this.drawingX, this.drawingY, this.width, this.height, this.realScaleX, this.realScaleY, this.realSin, this.realCos) === true) {
            return false;
        }
        return super.checkOffScreen();
    }
    destroy() {
        this.pixiSprite = undefined;
        super.destroy();
    }
}
exports.default = Image;
//# sourceMappingURL=Image.js.map