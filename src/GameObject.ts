import EventContainer from "eventcontainer";
import * as PIXI from "pixi.js";
import Util from "./Util";

export default abstract class GameObject extends EventContainer {

    public parent: GameObject | undefined;
    public target: GameObject | undefined;

    public children: GameObject[] = [];

    public pixiContainer: PIXI.Container;

    private _x: number = 0;
    private _y: number = 0;
    private _zIndex: number = 0;

    public centerX: number = 0;
    public centerY: number = 0;

    public realX: number = 0;
    public realY: number = 0;

    public drawingX: number = 0;
    public drawingY: number = 0;

    private _speedX: number = 0;
    private _speedY: number = 0;

    public accelX: number = 0;
    public accelY: number = 0;

    public minSpeedX: number | undefined;
    public minSpeedY: number | undefined;

    public maxSpeedX: number | undefined;
    public maxSpeedY: number | undefined;

    public toX: number = 0;
    public toY: number = 0;

    private _scaleX: number = 0;
    private _scaleY: number = 0;

    public realScaleX: number = 0;
    public realScaleY: number = 0;

    private _scalingSpeedX: number = 0;
    private _scalingSpeedY: number = 0;

    public realScalingSpeedX: number = 0;
    public realScalingSpeedY: number = 0;

    public scalingAccelX: number = 0;
    public scalingAccelY: number = 0;

    public minScalingSpeedX: number = 0;
    public minScalingSpeedY: number = 0;

    public maxScalingSpeedX: number = 0;
    public maxScalingSpeedY: number = 0;

    public toScaleX: number = 0;
    public toScaleY: number = 0;

    private _angle: number = 0;
    public realRadian: number = 0;
    public realSin: number = 0;
    public realCos: number = 0;

    private _rotationSpeed: number = 0;
    public rotationAccel: number = 0;
    public minRotationSpeed: number | undefined;
    public maxRotationSpeed: number | undefined;
    public toAngle: number = 0;

    public alpha: number = 0;
    private _fadingSpeed: number = 0;
    public fadingAccel: number = 0;
    public minFadingSpeed: number | undefined;
    public maxFadingSpeed: number | undefined;
    public toAlpha: number = 0;

    public blendMode?: PIXI.BLEND_MODES;

    public collider?: GameObject;
    public touchArea?: GameObject;

    public dom?: HTMLElement;
    public domStyle?: { [key: string]: string | number };

    public forceCollisionCheck?: boolean;
    private _yToZIndex: boolean = false;

    constructor(x: number, y: number) {
        super();

        this._x = x;
        this._y = y;

        this.pixiContainer = new PIXI.Container();
        this.pixiContainer.zIndex = 0
        this.pixiContainer.alpha = 0;
    }

    public addToPixiContainer(pixiChild: PIXI.Container) {

        const pixiChildren = this.pixiContainer.children;

        let low = 0;
        let high = pixiChildren.length;

        while (low < high) {

            // >>> 1은 2로 나누고 나머지를 버리는 것과 동일
            // tslint:disable-next-line: no-bitwise
            const mid = (low + high) >>> 1;

            if (pixiChildren[mid].zIndex <= pixiChild.zIndex) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        this.pixiContainer.addChildAt(pixiChild, low);
    }

    public removeFromPixiContainer(pixiChild: PIXI.Container) {
        this.pixiContainer.removeChild(pixiChild);
    }

    private removeFromParent() {
        if (this.parent !== undefined) {

            let minIndex = 0;
            let maxIndex = this.parent.children.length - 1;

            let level = 0;

            while (minIndex <= maxIndex) {

                const index = Math.ceil((minIndex + maxIndex) / 2);
                const node = this.parent.children[index];

                if (node.zIndex < this.zIndex) {
                    minIndex = index + 1;
                } else if (node.zIndex > this.zIndex) {
                    maxIndex = index - 1;
                } else {

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

    private appendToParent() {
        if (this.parent !== undefined) {

            let low = 0;
            let high = this.parent.children.length;

            while (low < high) {

                // >>> 1은 2로 나누고 나머지를 버리는 것과 동일
                // tslint:disable-next-line: no-bitwise
                const mid = (low + high) >>> 1;

                if (this.parent.children[mid].zIndex <= this.zIndex) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }

            this.parent.addToPixiContainer(this.pixiContainer);
            this.parent.children.splice(low, 0, this);
        }
    }

    private genRealPosition() {

        if (this.target === undefined) {
            this.realX = this.x;
            this.realY = this.y;
            this.drawingX = this.x;
            this.drawingY = this.y;
        } else {

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

    public set x(x: number) {
        this._x = x;
        this.genRealPosition();
    }

    public get x() { return this._x; }

    public set y(y: number) {
        this._y = y;
        this.genRealPosition();
        if (this.yToZIndex === true) {
            this.zIndex = y;
        }
    }

    public get y() { return this._y; }

    public set zIndex(zIndex: number) {
        if (this.parent === undefined) {
            this.pixiContainer.zIndex = this._zIndex = zIndex;
        } else {
            this.removeFromParent();
            this.pixiContainer.zIndex = this._zIndex = zIndex;
            this.appendToParent();
        }
    }

    public get zIndex() { return this._zIndex; }

    public set speedX(speedX: number) {
        this._speedX = speedX;
        if (this.minSpeedX !== undefined && this.speedX < this.minSpeedX) {
            this.minSpeedX = undefined;
        }
        if (this.maxSpeedX !== undefined && this.speedX > this.maxSpeedX) {
            this.maxSpeedX = undefined;
        }
    }

    public get speedX() { return this._speedX; }

    public set speedY(speedY: number) {
        this._speedY = speedY;
        if (this.minSpeedY !== undefined && this.speedY < this.minSpeedY) {
            this.minSpeedY = undefined;
        }
        if (this.maxSpeedY !== undefined && this.speedY > this.maxSpeedY) {
            this.maxSpeedY = undefined;
        }
    }

    public get speedY() { return this._speedY; }

    public set scaleX(scaleX: number) {
        this._scaleX = scaleX;
        if (this.target === undefined) {
            this.realScaleX = scaleX;
        } else {
            this.realScaleX = this.target.realScaleX * scaleX;
        }
    }

    public get scaleX() { return this._scaleX; }

    public set scaleY(scaleY: number) {
        this._scaleY = scaleY;
        if (this.target === undefined) {
            this.realScaleY = scaleY;
        } else {
            this.realScaleY = this.target.realScaleY * scaleY;
        }
    }

    public get scaleY() { return this._scaleY; }

    public set scale(scale: number) {
        this.scaleX = scale;
        this.scaleY = scale;
    }

    public set scalingSpeedX(scalingSpeedX: number) {
        this._scalingSpeedX = scalingSpeedX;
        if (this.target === undefined) {
            this.realScalingSpeedX = scalingSpeedX;
        } else {
            this.realScalingSpeedX = this.target.realScalingSpeedX * scalingSpeedX;
        }
    }

    public get scalingSpeedX() { return this._scalingSpeedX; }

    public set scalingSpeedY(scalingSpeedY: number) {
        this._scalingSpeedY = scalingSpeedY;
        if (this.target === undefined) {
            this.realScalingSpeedY = scalingSpeedY;
        } else {
            this.realScalingSpeedY = this.target.realScalingSpeedY * scalingSpeedY;
        }
    }

    public get scalingSpeedY() { return this._scalingSpeedY; }

    public set scalingSpeed(scalingSpeed: number) {
        this.scalingSpeedX = scalingSpeed;
        this.scalingSpeedY = scalingSpeed;
    }

    public set scalingAccel(scalingAccel: number) {
        this.scalingAccelX = scalingAccel;
        this.scalingAccelY = scalingAccel;
    }

    public set minScalingSpeed(minScalingSpeed: number) {
        this.minScalingSpeedX = minScalingSpeed;
        this.minScalingSpeedY = minScalingSpeed;
    }

    public set maxScalingSpeed(maxScalingSpeed: number) {
        this.maxScalingSpeedX = maxScalingSpeed;
        this.maxScalingSpeedY = maxScalingSpeed;
    }

    public set toScale(toScale: number) {
        this.toScaleX = toScale;
        this.toScaleY = toScale;
    }

    public set angle(angle: number) {
        this._angle = angle;

        if (this.target === undefined) {
            this.realRadian = angle * Math.PI / 180;
        } else {
            this.realRadian = this.target.realRadian + angle * Math.PI / 180;
        }

        this.realSin = Math.sin(this.realRadian);
        this.realCos = Math.cos(this.realRadian);
    }

    public get angle() { return this._angle; }

    public set rotationSpeed(rotationSpeed: number) {
        this._rotationSpeed = rotationSpeed;
        if (this.minRotationSpeed !== undefined && this.rotationSpeed < this.minRotationSpeed) {
            this.minRotationSpeed = undefined;
        }
        if (this.maxRotationSpeed !== undefined && this.rotationSpeed > this.maxRotationSpeed) {
            this.maxRotationSpeed = undefined;
        }
    }

    public get rotationSpeed() { return this._rotationSpeed; }

    public set fadingSpeed(fadingSpeed: number) {
        this._fadingSpeed = fadingSpeed;
        if (this.minFadingSpeed !== undefined && this.fadingSpeed < this.minFadingSpeed) {
            this.minFadingSpeed = undefined;
        }
        if (this.maxFadingSpeed !== undefined && this.fadingSpeed > this.maxFadingSpeed) {
            this.maxFadingSpeed = undefined;
        }
    }

    public get fadingSpeed() { return this._fadingSpeed; }

    public set yToZIndex(yToZIndex: boolean) {
        this._yToZIndex = yToZIndex;
        this.zIndex = this.y;
    }

    public get yToZIndex() { return this._yToZIndex; }

    public addFilter(filter: PIXI.Filter) {
        this.pixiContainer.filters.push(filter);
    }

    public deleteFilter(filter: PIXI.Filter) {
        Util.pull(this.pixiContainer.filters, filter);
    }
}
