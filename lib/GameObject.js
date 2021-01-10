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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventcontainer_1 = __importDefault(require("eventcontainer"));
const PIXI = __importStar(require("pixi.js"));
const Util_1 = __importDefault(require("./Util"));
class GameObject extends eventcontainer_1.default {
    constructor(x, y) {
        super();
        this.children = [];
        this._x = 0;
        this._y = 0;
        this._zIndex = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.realX = 0;
        this.realY = 0;
        this.drawingX = 0;
        this.drawingY = 0;
        this._speedX = 0;
        this._speedY = 0;
        this.accelX = 0;
        this.accelY = 0;
        this.toX = 0;
        this.toY = 0;
        this._scaleX = 0;
        this._scaleY = 0;
        this.realScaleX = 0;
        this.realScaleY = 0;
        this._scalingSpeedX = 0;
        this._scalingSpeedY = 0;
        this.realScalingSpeedX = 0;
        this.realScalingSpeedY = 0;
        this.scalingAccelX = 0;
        this.scalingAccelY = 0;
        this.minScalingSpeedX = 0;
        this.minScalingSpeedY = 0;
        this.maxScalingSpeedX = 0;
        this.maxScalingSpeedY = 0;
        this.toScaleX = 0;
        this.toScaleY = 0;
        this._angle = 0;
        this.realRadian = 0;
        this.realSin = 0;
        this.realCos = 0;
        this._rotationSpeed = 0;
        this.rotationAccel = 0;
        this.toAngle = 0;
        this.alpha = 0;
        this._fadingSpeed = 0;
        this.fadingAccel = 0;
        this.toAlpha = 0;
        this._yToZIndex = false;
        this._x = x;
        this._y = y;
        this.pixiContainer = new PIXI.Container();
        this.pixiContainer.zIndex = 0;
        this.pixiContainer.alpha = 0;
    }
    addToPixiContainer(pixiChild) {
        const pixiChildren = this.pixiContainer.children;
        let low = 0;
        let high = pixiChildren.length;
        while (low < high) {
            const mid = (low + high) >>> 1;
            if (pixiChildren[mid].zIndex <= pixiChild.zIndex) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        this.pixiContainer.addChildAt(pixiChild, low);
    }
    removeFromPixiContainer(pixiChild) {
        this.pixiContainer.removeChild(pixiChild);
    }
    removeFromParent() {
        if (this.parent !== undefined) {
            let minIndex = 0;
            let maxIndex = this.parent.children.length - 1;
            let level = 0;
            while (minIndex <= maxIndex) {
                const index = Math.ceil((minIndex + maxIndex) / 2);
                const node = this.parent.children[index];
                if (node.zIndex < this.zIndex) {
                    minIndex = index + 1;
                }
                else if (node.zIndex > this.zIndex) {
                    maxIndex = index - 1;
                }
                else {
                    while (true) {
                        if (this.parent.children[index - level] === this) {
                            this.parent.children.splice(index - level, 1);
                            break;
                        }
                        if (level > 0 && this.parent.children[index + level] === this) {
                            this.parent.children.splice(index + level, 1);
                            break;
                        }
                        if (this.parent.children[index - level].zIndex !== this.zIndex &&
                            this.parent.children[index + level].zIndex !== this.zIndex) {
                            break;
                        }
                        level += 1;
                    }
                    break;
                }
            }
            this.parent.removeFromPixiContainer(this.pixiContainer);
        }
    }
    appendToParent() {
        if (this.parent !== undefined) {
            let low = 0;
            let high = this.parent.children.length;
            while (low < high) {
                const mid = (low + high) >>> 1;
                if (this.parent.children[mid].zIndex <= this.zIndex) {
                    low = mid + 1;
                }
                else {
                    high = mid;
                }
            }
            this.parent.addToPixiContainer(this.pixiContainer);
            this.parent.children.splice(low, 0, this);
        }
    }
    genRealPosition() {
        if (this.target === undefined) {
            this.realX = this.x;
            this.realY = this.y;
            this.drawingX = this.x;
            this.drawingY = this.y;
        }
        else {
            const plusX = this.x * this.target.realScaleX;
            const plusY = this.y * this.target.realScaleY;
            this.realX = this.target.drawingX + plusX * this.target.realCos - plusY * this.target.realSin;
            this.realY = this.target.drawingY + plusX * this.target.realSin + plusY * this.target.realCos;
            const plusCenterX = this.centerX * this.realScaleX;
            const plusCenterY = this.centerY * this.realScaleY;
            this.drawingX = this.realX - plusCenterX * this.realCos + plusCenterY * this.realSin;
            this.drawingY = this.realY - plusCenterX * this.realSin - plusCenterY * this.realCos;
        }
    }
    set x(x) {
        this._x = x;
        this.genRealPosition();
    }
    get x() { return this._x; }
    set y(y) {
        this._y = y;
        this.genRealPosition();
        if (this.yToZIndex === true) {
            this.zIndex = y;
        }
    }
    get y() { return this._y; }
    set zIndex(zIndex) {
        if (this.parent === undefined) {
            this.pixiContainer.zIndex = this._zIndex = zIndex;
        }
        else {
            this.removeFromParent();
            this.pixiContainer.zIndex = this._zIndex = zIndex;
            this.appendToParent();
        }
    }
    get zIndex() { return this._zIndex; }
    set speedX(speedX) {
        this._speedX = speedX;
        if (this.minSpeedX !== undefined && this.speedX < this.minSpeedX) {
            this.minSpeedX = undefined;
        }
        if (this.maxSpeedX !== undefined && this.speedX > this.maxSpeedX) {
            this.maxSpeedX = undefined;
        }
    }
    get speedX() { return this._speedX; }
    set speedY(speedY) {
        this._speedY = speedY;
        if (this.minSpeedY !== undefined && this.speedY < this.minSpeedY) {
            this.minSpeedY = undefined;
        }
        if (this.maxSpeedY !== undefined && this.speedY > this.maxSpeedY) {
            this.maxSpeedY = undefined;
        }
    }
    get speedY() { return this._speedY; }
    set scaleX(scaleX) {
        this._scaleX = scaleX;
        if (this.target === undefined) {
            this.realScaleX = scaleX;
        }
        else {
            this.realScaleX = this.target.realScaleX * scaleX;
        }
    }
    get scaleX() { return this._scaleX; }
    set scaleY(scaleY) {
        this._scaleY = scaleY;
        if (this.target === undefined) {
            this.realScaleY = scaleY;
        }
        else {
            this.realScaleY = this.target.realScaleY * scaleY;
        }
    }
    get scaleY() { return this._scaleY; }
    set scale(scale) {
        this.scaleX = scale;
        this.scaleY = scale;
    }
    set scalingSpeedX(scalingSpeedX) {
        this._scalingSpeedX = scalingSpeedX;
        if (this.target === undefined) {
            this.realScalingSpeedX = scalingSpeedX;
        }
        else {
            this.realScalingSpeedX = this.target.realScalingSpeedX * scalingSpeedX;
        }
    }
    get scalingSpeedX() { return this._scalingSpeedX; }
    set scalingSpeedY(scalingSpeedY) {
        this._scalingSpeedY = scalingSpeedY;
        if (this.target === undefined) {
            this.realScalingSpeedY = scalingSpeedY;
        }
        else {
            this.realScalingSpeedY = this.target.realScalingSpeedY * scalingSpeedY;
        }
    }
    get scalingSpeedY() { return this._scalingSpeedY; }
    set scalingSpeed(scalingSpeed) {
        this.scalingSpeedX = scalingSpeed;
        this.scalingSpeedY = scalingSpeed;
    }
    set scalingAccel(scalingAccel) {
        this.scalingAccelX = scalingAccel;
        this.scalingAccelY = scalingAccel;
    }
    set minScalingSpeed(minScalingSpeed) {
        this.minScalingSpeedX = minScalingSpeed;
        this.minScalingSpeedY = minScalingSpeed;
    }
    set maxScalingSpeed(maxScalingSpeed) {
        this.maxScalingSpeedX = maxScalingSpeed;
        this.maxScalingSpeedY = maxScalingSpeed;
    }
    set toScale(toScale) {
        this.toScaleX = toScale;
        this.toScaleY = toScale;
    }
    set angle(angle) {
        this._angle = angle;
        if (this.target === undefined) {
            this.realRadian = angle * Math.PI / 180;
        }
        else {
            this.realRadian = this.target.realRadian + angle * Math.PI / 180;
        }
        this.realSin = Math.sin(this.realRadian);
        this.realCos = Math.cos(this.realRadian);
    }
    get angle() { return this._angle; }
    set rotationSpeed(rotationSpeed) {
        this._rotationSpeed = rotationSpeed;
        if (this.minRotationSpeed !== undefined && this.rotationSpeed < this.minRotationSpeed) {
            this.minRotationSpeed = undefined;
        }
        if (this.maxRotationSpeed !== undefined && this.rotationSpeed > this.maxRotationSpeed) {
            this.maxRotationSpeed = undefined;
        }
    }
    get rotationSpeed() { return this._rotationSpeed; }
    set fadingSpeed(fadingSpeed) {
        this._fadingSpeed = fadingSpeed;
        if (this.minFadingSpeed !== undefined && this.fadingSpeed < this.minFadingSpeed) {
            this.minFadingSpeed = undefined;
        }
        if (this.maxFadingSpeed !== undefined && this.fadingSpeed > this.maxFadingSpeed) {
            this.maxFadingSpeed = undefined;
        }
    }
    get fadingSpeed() { return this._fadingSpeed; }
    set yToZIndex(yToZIndex) {
        this._yToZIndex = yToZIndex;
        this.zIndex = this.y;
    }
    get yToZIndex() { return this._yToZIndex; }
    addFilter(filter) {
        this.pixiContainer.filters.push(filter);
    }
    deleteFilter(filter) {
        Util_1.default.pull(this.pixiContainer.filters, filter);
    }
}
exports.default = GameObject;
//# sourceMappingURL=GameObject.js.map