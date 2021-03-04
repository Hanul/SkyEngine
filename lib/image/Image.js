"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameObject_1 = __importDefault(require("../GameObject"));
const loadTexture_1 = __importDefault(require("../loadTexture"));
class Image extends GameObject_1.default {
    constructor(options) {
        super(options);
        this.width = 0;
        this.height = 0;
        this.src = options.src;
    }
    async changeImage(src) {
        const texture = await loadTexture_1.default(src);
        this.width = texture.width;
        this.height = texture.height;
        this.pixiSprite = PIXI.Sprite.from(texture);
        this.pixiSprite.anchor.x = 0.5;
        this.pixiSprite.anchor.y = 0.5;
        this.pixiContainer.addChild(this.pixiSprite);
    }
    set src(src) {
        this.changeImage(src);
    }
    delete() {
        var _a;
        (_a = this.pixiSprite) === null || _a === void 0 ? void 0 : _a.destroy();
        super.delete();
    }
}
exports.default = Image;
//# sourceMappingURL=Image.js.map