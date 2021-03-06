"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PIXI = __importStar(require("pixi.js"));
class GameNode extends skynode_1.SkyNode {
    constructor(options) {
        super();
        this.children = [];
        this.pixiContainer = new PIXI.Container();
        this.speedX = 0;
        this.speedY = 0;
        this.accelX = 0;
        this.accelY = 0;
        if ((options === null || options === void 0 ? void 0 : options.x) !== undefined) {
            this.x = options.x;
        }
        if ((options === null || options === void 0 ? void 0 : options.y) !== undefined) {
            this.y = options.y;
        }
    }
    set x(x) {
        this.pixiContainer.x = x;
    }
    set y(y) {
        this.pixiContainer.y = y;
    }
    moveDown(options, moveEndHandler) {
        this.speedY = options.speed;
        this.accelY = options.accel === undefined ? 0 : options.accel;
        this.minSpeedY = 0;
        this.maxSpeedY = options.maxSpeed;
        this.toY = options.toY;
        if (moveEndHandler !== undefined) {
            this.on("moveEndY", moveEndHandler);
        }
    }
    step(deltaTime) {
    }
    appendTo(node, index) {
        if (index !== undefined && index < node.children.length) {
            node.pixiContainer.addChildAt(this.pixiContainer, index);
        }
        else {
            node.pixiContainer.addChild(this.pixiContainer);
        }
        return super.appendTo(node, index);
    }
    exceptFromParent() {
        if (this.parent !== undefined) {
            this.parent.pixiContainer.removeChild(this.pixiContainer);
        }
        super.exceptFromParent();
    }
    delete() {
        this.pixiContainer.destroy();
        super.delete();
    }
}
exports.default = GameNode;
//# sourceMappingURL=GameNode.js.map