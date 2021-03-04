import el from "@hanul/el.js";
import EventContainer from "eventcontainer";
import * as PIXI from "pixi.js";
import Screen from "./Screen";
import Util from "./Util";

export default class GameObject extends EventContainer {

    private _parent: GameObject | undefined;
    private _target: GameObject | undefined;

    public colliders: GameObject[] = [];
    public touchAreas: GameObject[] = [];
    public children: GameObject[] = [];

    public pixiContainer: PIXI.Container;

    private _x = 0;
    private _y = 0;
    private _zIndex = 0;

    public centerX = 0;
    public centerY = 0;

    public realX = 0;
    public realY = 0;

    public drawingX = 0;
    public drawingY = 0;

    private _speedX = 0;
    private _speedY = 0;

    public accelX = 0;
    public accelY = 0;

    public minSpeedX: number | undefined;
    public minSpeedY: number | undefined;

    public maxSpeedX: number | undefined;
    public maxSpeedY: number | undefined;

    public toX = 0;
    public toY = 0;

    private _scaleX = 1;
    private _scaleY = 1;

    public realScaleX = 0;
    public realScaleY = 0;

    private _scalingSpeedX = 0;
    private _scalingSpeedY = 0;

    public realScalingSpeedX = 0;
    public realScalingSpeedY = 0;

    public scalingAccelX = 0;
    public scalingAccelY = 0;

    public minScalingSpeedX = 0;
    public minScalingSpeedY = 0;

    public maxScalingSpeedX = 0;
    public maxScalingSpeedY = 0;

    public toScaleX = 0;
    public toScaleY = 0;

    private _angle = 0;
    public realRadian = 0;
    public realSin = 0;
    public realCos = 0;

    private _rotationSpeed = 0;
    public rotationAccel = 0;
    public minRotationSpeed: number | undefined;
    public maxRotationSpeed: number | undefined;
    public toAngle = 0;

    public alpha = 1;
    private _fadingSpeed = 0;
    public fadingAccel = 0;
    public minFadingSpeed: number | undefined;
    public maxFadingSpeed: number | undefined;
    public toAlpha = 0;

    private _blendMode?: PIXI.BLEND_MODES;

    private _dom?: HTMLElement;
    public domStyle?: { [key: string]: string | number };

    public forceCollisionCheck?: boolean;
    private _yToZIndex = false;

    private collisionTargets = [];
    private collidingNodeIds = {};
    private meetHandlerMap = {};
    private partHandlerMap = {};

    private windowResizeEvent: (() => void) | undefined;

    constructor(x: number, y: number) {
        super();

        this._x = x;
        this._y = y;

        this.pixiContainer = new PIXI.Container();
        this.pixiContainer.zIndex = 0;
        this.pixiContainer.alpha = 0;
    }

    public addToPixiContainer(pixiChild: PIXI.Container): void {

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

    public deleteFromPixiContainer(pixiChild: PIXI.Container): void {
        this.pixiContainer.removeChild(pixiChild);
    }

    private deleteFromParent() {
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

                    // eslint-disable-next-line no-constant-condition
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

            this.parent.deleteFromPixiContainer(this.pixiContainer);
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

    public get x(): number { return this._x; }

    public set y(y: number) {
        this._y = y;
        this.genRealPosition();
        if (this.yToZIndex === true) {
            this.zIndex = y;
        }
    }

    public get y(): number { return this._y; }

    public set zIndex(zIndex: number) {
        if (this.parent === undefined) {
            this.pixiContainer.zIndex = this._zIndex = zIndex;
        } else {
            this.deleteFromParent();
            this.pixiContainer.zIndex = this._zIndex = zIndex;
            this.appendToParent();
        }
    }

    public get zIndex(): number { return this._zIndex; }

    public set speedX(speedX: number) {
        this._speedX = speedX;
        if (this.minSpeedX !== undefined && this.speedX < this.minSpeedX) {
            this.minSpeedX = undefined;
        }
        if (this.maxSpeedX !== undefined && this.speedX > this.maxSpeedX) {
            this.maxSpeedX = undefined;
        }
    }

    public get speedX(): number { return this._speedX; }

    public set speedY(speedY: number) {
        this._speedY = speedY;
        if (this.minSpeedY !== undefined && this.speedY < this.minSpeedY) {
            this.minSpeedY = undefined;
        }
        if (this.maxSpeedY !== undefined && this.speedY > this.maxSpeedY) {
            this.maxSpeedY = undefined;
        }
    }

    public get speedY(): number { return this._speedY; }

    public set scaleX(scaleX: number) {
        this._scaleX = scaleX;
        if (this.target === undefined) {
            this.realScaleX = scaleX;
        } else {
            this.realScaleX = this.target.realScaleX * scaleX;
        }
    }

    public get scaleX(): number { return this._scaleX; }

    public set scaleY(scaleY: number) {
        this._scaleY = scaleY;
        if (this.target === undefined) {
            this.realScaleY = scaleY;
        } else {
            this.realScaleY = this.target.realScaleY * scaleY;
        }
    }

    public get scaleY(): number { return this._scaleY; }

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

    public get scalingSpeedX(): number { return this._scalingSpeedX; }

    public set scalingSpeedY(scalingSpeedY: number) {
        this._scalingSpeedY = scalingSpeedY;
        if (this.target === undefined) {
            this.realScalingSpeedY = scalingSpeedY;
        } else {
            this.realScalingSpeedY = this.target.realScalingSpeedY * scalingSpeedY;
        }
    }

    public get scalingSpeedY(): number { return this._scalingSpeedY; }

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

    public get angle(): number { return this._angle; }

    public set rotationSpeed(rotationSpeed: number) {
        this._rotationSpeed = rotationSpeed;
        if (this.minRotationSpeed !== undefined && this.rotationSpeed < this.minRotationSpeed) {
            this.minRotationSpeed = undefined;
        }
        if (this.maxRotationSpeed !== undefined && this.rotationSpeed > this.maxRotationSpeed) {
            this.maxRotationSpeed = undefined;
        }
    }

    public get rotationSpeed(): number { return this._rotationSpeed; }

    public set fadingSpeed(fadingSpeed: number) {
        this._fadingSpeed = fadingSpeed;
        if (this.minFadingSpeed !== undefined && this.fadingSpeed < this.minFadingSpeed) {
            this.minFadingSpeed = undefined;
        }
        if (this.maxFadingSpeed !== undefined && this.fadingSpeed > this.maxFadingSpeed) {
            this.maxFadingSpeed = undefined;
        }
    }

    public get fadingSpeed(): number { return this._fadingSpeed; }

    public set yToZIndex(yToZIndex: boolean) {
        this._yToZIndex = yToZIndex;
        this.zIndex = this.y;
    }

    public get yToZIndex(): boolean { return this._yToZIndex; }

    public addFilter(filter: PIXI.Filter): void {
        this.pixiContainer.filters.push(filter);
    }

    public deleteFilter(filter: PIXI.Filter): void {
        Util.pull(this.pixiContainer.filters, filter);
    }

    public set blendMode(blendMode: PIXI.BLEND_MODES | undefined) {
        this._blendMode = blendMode;
    }

    public get blendMode(): PIXI.BLEND_MODES | undefined { return this._blendMode; }

    public flipX(): void { this.scaleX = -this.scaleX; }
    public flipY(): void { this.scaleY = -this.scaleY; }

    public hideDom(): void {
        if (this._dom !== undefined) {
            this._dom.dataset.originDisplay = this._dom.style.display;
            this._dom.style.display = "none";
        }
        for (const child of this.children) {
            child.hideDom();
        }
    }

    public showDom(): void {
        if (this._dom?.dataset.originDisplay !== undefined) {
            this._dom.style.display = this._dom.dataset.originDisplay;
        }
        for (const child of this.children) {
            child.showDom();
        }
    }

    public hide(): void {
        this.pixiContainer.visible = false;
        this.hideDom();
    }

    public show(): void {
        this.pixiContainer.visible = true;
        this.showDom();
    }

    public get hiding(): boolean {
        return this.pixiContainer.visible;
    }

    private genRealProperties() {
        this.angle = this._angle;
        this.scaleX = this._scaleX;
        this.scaleY = this._scaleY;
        this.genRealPosition();
    }

    public set target(target: GameObject | undefined) {
        this._target = target;
        if (target !== undefined) {

            this.genRealProperties();

            for (const touchArea of this.touchAreas) {
                touchArea.target = this;
            }
            for (const collider of this.colliders) {
                collider.target = this;
            }
            for (const child of this.children) {
                child.target = this;
            }
        }
    }

    public get target(): GameObject | undefined { return this._target; }

    public set parent(parent: GameObject | undefined) {
        this._parent = parent;
        this.target = parent;
    }

    public get parent(): GameObject | undefined { return this._parent; }

    public appendTo(object: GameObject): GameObject {
        if (this.parent !== undefined) {
            this.deleteFromParent();
        }
        this.parent = object;
        this.appendToParent();
        return this;
    }

    public append(object: GameObject): void {
        object.appendTo(object);
    }

    public empty(): void {
        for (const child of this.children) {
            child.parent = undefined;
            child.destroy();
        }
        this.children = [];
        this.pixiContainer.removeChildren();
    }

    public destroy(): void {

        this.empty();
        (this.children as unknown) = undefined;

        if (this.parent !== undefined) {
            this.deleteFromParent();
            this.parent = undefined;
        }

        for (const touchArea of this.touchAreas) {
            touchArea.destroy();
        }
        (this.touchAreas as unknown) = undefined;

        for (const collider of this.colliders) {
            collider.destroy();
        }
        (this.colliders as unknown) = undefined;

        (this.collisionTargets as unknown) = undefined;
        (this.collidingNodeIds as unknown) = undefined;
        (this.meetHandlerMap as unknown) = undefined;
        (this.partHandlerMap as unknown) = undefined;

        this._dom?.remove();

        if (this.windowResizeEvent !== undefined) {
            window.removeEventListener("resize", this.windowResizeEvent);
            this.windowResizeEvent = undefined;
        }

        this.pixiContainer.destroy();
        (this.pixiContainer as unknown) = undefined;

        super.destroy();
    }

    public set dom(dom: HTMLElement | undefined) {
        this._dom?.remove();
        this._dom = dom;
        if (dom !== undefined) {
            el.style(dom, {
                position: 'fixed',
                left: Screen.left + (Screen.width / 2 + this.drawingX - Screen.cameraFollowX) * Screen.ratio,
                top: Screen.top + (Screen.height / 2 + this.drawingY - Screen.cameraFollowY) * Screen.ratio,
                transform: `rotate(${this.realRadian}rad) scale(${Screen.ratio * this.realScaleX}, ${Screen.ratio * this.realScaleY})`,
                opacity: this.pixiContainer.worldAlpha,
            });
        }
    }

    public get dom(): HTMLElement | undefined { return this._dom; }

    public checkPoint(pointX: number, pointY: number): boolean {
        for (const child of this.children) {
            if (child.checkPoint(pointX, pointY) === true) {
                return true;
            }
        }
        return false;
    }

    public checkArea(area: GameObject): boolean {
        for (const child of this.children) {
            if (child.checkArea(area) === true || area.checkArea(child) === true) {
                return true;
            }
        }
        return false;
    }

    public checkTouch(touchX: number, touchY: number): boolean {
        if (this.hiding === true) {
            return false;
        }
        for (const touchArea of this.touchAreas) {
            if (touchArea.checkPoint(touchX, touchY) === true) {
                return true;
            }
        }
        for (const child of this.children) {
            if (child.checkTouch(touchX, touchY) === true) {
                return true;
            }
        }
        return false;
    }

    public checkOneSideCollision(target: GameObject): boolean {
        if (this.hiding === true || target.hiding === true) {
            return false;
        }
        for (const collider of this.colliders) {
            for (const targetCollider of target.colliders) {
                if (collider.checkArea(targetCollider) === true || targetCollider.checkArea(collider) === true) {
                    return true;
                }
            }
        }
        for (const child of this.children) {
            if (child.checkOneSideCollision(target) === true) {
                return true;
            }
        }
        return false;
    }

    public checkCollision(target: GameObject): boolean {
        return (this.checkOneSideCollision(target) === true || target.checkOneSideCollision(this) === true);
    }

    public checkOffScreen(): boolean {
        for (const child of this.children) {
            if (child.checkOffScreen() !== true) {
                return false;
            }
        }
        return true;
    }

    public step(deltaTime: number): void {

        if (this.accelX !== 0) {
            this.speedX += this.accelX * deltaTime;
        }

        if (this.minSpeedX !== undefined && this.speedX < this.minSpeedX) {
            this.speedX = this.minSpeedX;

            if (this.speedX === 0) {

                /*if (moveXEndHandler !== undefined) {
                    let _moveXEndHandler = moveXEndHandler;
                    moveXEndHandler = undefined;
                    _moveXEndHandler();
                }

                if (moveEndHandler !== undefined && speedY === 0) {
                    let _moveEndHandler = moveEndHandler;
                    moveEndHandler = undefined;
                    _moveEndHandler();
                }*/
            }
        }

        if (this.maxSpeedX !== undefined && this.speedX > this.maxSpeedX) {
            this.speedX = this.maxSpeedX;

            if (this.speedX === 0) {

                /*if (moveXEndHandler !== undefined) {
                    let _moveXEndHandler = moveXEndHandler;
                    moveXEndHandler = undefined;
                    _moveXEndHandler();
                }

                if (moveEndHandler !== undefined && speedY === 0) {
                    let _moveEndHandler = moveEndHandler;
                    moveEndHandler = undefined;
                    _moveEndHandler();
                }*/
            }
        }

        if (this.accelY !== 0) {
            this.speedY += this.accelY * deltaTime;
        }

        if (this.minSpeedY !== undefined && this.speedY < this.minSpeedY) {
            this.speedY = this.minSpeedY;

            if (this.speedY === 0) {

                /*if (moveYEndHandler !== undefined) {
                    let _moveYEndHandler = moveYEndHandler;
                    moveYEndHandler = undefined;
                    _moveYEndHandler();
                }

                if (moveEndHandler !== undefined && speedX === 0) {
                    let _moveEndHandler = moveEndHandler;
                    moveEndHandler = undefined;
                    _moveEndHandler();
                }*/
            }
        }

        if (this.maxSpeedY !== undefined && this.speedY > this.maxSpeedY) {
            this.speedY = this.maxSpeedY;

            if (this.speedY === 0) {

                /*if (moveYEndHandler !== undefined) {
                    let _moveYEndHandler = moveYEndHandler;
                    moveYEndHandler = undefined;
                    _moveYEndHandler();
                }

                if (moveEndHandler !== undefined && speedX === 0) {
                    let _moveEndHandler = moveEndHandler;
                    moveEndHandler = undefined;
                    _moveEndHandler();
                }*/
            }
        }

        /*if (this.speedX !== 0) {

            const dx = this.speedX * deltaTime;

            if ((dx < 0 && isStuckLeft !== true) || (dx > 0 && isStuckRight !== true)) {

                x += dx;

                if (toX !== undefined) {

                    if ((speedX > 0 && x > toX) || (speedX < 0 && x < toX)) {

                        x = toX;

                        toX = undefined;
                        minSpeedX = undefined;
                        maxSpeedX = undefined;

                        speedX = 0;
                        accelX = 0;

                        if (moveXEndHandler !== undefined) {
                            let _moveXEndHandler = moveXEndHandler;
                            moveXEndHandler = undefined;
                            _moveXEndHandler();
                        }

                        if (moveEndHandler !== undefined && speedY === 0) {
                            let _moveEndHandler = moveEndHandler;
                            moveEndHandler = undefined;
                            _moveEndHandler();
                        }
                    }
                }
            }
        }

        if (speedY !== 0) {

            let dy = speedY * deltaTime;

            if ((dy < 0 && isStuckUp !== true) || (dy > 0 && isStuckDown !== true)) {

                y += dy;

                if (toY !== undefined) {

                    if ((speedY > 0 && y > toY) || (speedY < 0 && y < toY)) {

                        y = toY;

                        toY = undefined;
                        minSpeedY = undefined;
                        maxSpeedY = undefined;

                        speedY = 0;
                        accelY = 0;

                        if (moveYEndHandler !== undefined) {
                            let _moveYEndHandler = moveYEndHandler;
                            moveYEndHandler = undefined;
                            _moveYEndHandler();
                        }

                        if (moveEndHandler !== undefined && speedX === 0) {
                            let _moveEndHandler = moveEndHandler;
                            moveEndHandler = undefined;
                            _moveEndHandler();
                        }
                    }
                }

                if (isY2ZIndex === true) {
                    setZIndex(y);
                }
            }
        }

        if (scalingAccelX !== 0) {
            scalingSpeedX += scalingAccelX * deltaTime;
        }

        if (minScalingSpeedX !== undefined && scalingSpeedX < minScalingSpeedX) {
            scalingSpeedX = minScalingSpeedX;
        }

        if (maxScalingSpeedX !== undefined && scalingSpeedX > maxScalingSpeedX) {
            scalingSpeedX = maxScalingSpeedX;
        }

        if (scalingAccelY !== 0) {
            scalingSpeedY += scalingAccelY * deltaTime;
        }

        if (minScalingSpeedY !== undefined && scalingSpeedY < minScalingSpeedY) {
            scalingSpeedY = minScalingSpeedY;
        }

        if (maxScalingSpeedY !== undefined && scalingSpeedY > maxScalingSpeedY) {
            scalingSpeedY = maxScalingSpeedY;
        }

        if (scalingSpeedX !== 0) {
            scaleX += scalingSpeedX * deltaTime;

            if (toScaleX !== undefined) {

                if ((scalingSpeedX > 0 && scaleX > toScaleX) || (scalingSpeedX < 0 && scaleX < toScaleX)) {

                    scaleX = toScaleX;

                    toScaleX = undefined;
                    minScalingSpeedX = undefined;
                    maxScalingSpeedX = undefined;

                    scalingSpeedX = 0;
                    scalingAccelX = 0;

                    if (scaleXEndHandler !== undefined) {
                        let _scaleXEndHandler = scaleXEndHandler;
                        scaleXEndHandler = undefined;
                        _scaleXEndHandler();
                    }

                    if (scaleEndHandler !== undefined && scalingSpeedY === 0) {
                        let _scaleEndHandler = scaleEndHandler;
                        scaleEndHandler = undefined;
                        _scaleEndHandler();
                    }
                }
            }
        }

        if (scalingSpeedY !== 0) {
            scaleY += scalingSpeedY * deltaTime;

            if (toScaleY !== undefined) {

                if ((scalingSpeedY > 0 && scaleY > toScaleY) || (scalingSpeedY < 0 && scaleY < toScaleY)) {

                    scaleY = toScaleY;

                    toScaleY = undefined;
                    minScalingSpeedY = undefined;
                    maxScalingSpeedY = undefined;

                    scalingSpeedY = 0;
                    scalingAccelY = 0;

                    if (scaleYEndHandler !== undefined) {
                        let _scaleYEndHandler = scaleYEndHandler;
                        scaleYEndHandler = undefined;
                        _scaleYEndHandler();
                    }

                    if (scaleEndHandler !== undefined && scalingSpeedX === 0) {
                        let _scaleEndHandler = scaleEndHandler;
                        scaleEndHandler = undefined;
                        _scaleEndHandler();
                    }
                }
            }
        }

        if (rotationAccel !== 0) {
            rotationSpeed += rotationAccel * deltaTime;
        }

        if (minRotationSpeed !== undefined && rotationSpeed < minRotationSpeed) {
            rotationSpeed = minRotationSpeed;
        }

        if (maxRotationSpeed !== undefined && rotationSpeed > maxRotationSpeed) {
            rotationSpeed = maxRotationSpeed;
        }

        if (rotationSpeed !== 0) {
            angle += rotationSpeed * deltaTime;

            if (toAngle !== undefined) {

                if (angle + toAngle < 360 && ((rotationSpeed > 0 && angle >= toAngle) || (rotationSpeed < 0 && angle <= toAngle))) {

                    angle = toAngle;

                    toAngle = undefined;
                    minRotationSpeed = undefined;
                    maxRotationSpeed = undefined;

                    rotationSpeed = 0;
                    rotationAccel = 0;

                    if (rotateEndHandler !== undefined) {
                        let _rotateEndHandler = rotateEndHandler;
                        rotateEndHandler = undefined;
                        _rotateEndHandler();
                    }
                }
            }

            if (angle >= 360) {
                angle = 0;
            } else if (angle <= 0) {
                angle = 360;
            }
        }

        if (fadingAccel !== 0) {
            fadingSpeed += fadingAccel * deltaTime;
        }

        if (minFadingSpeed !== undefined && fadingSpeed < minFadingSpeed) {
            fadingSpeed = minFadingSpeed;
        }

        if (maxFadingSpeed !== undefined && fadingSpeed > maxFadingSpeed) {
            fadingSpeed = maxFadingSpeed;
        }

        if (fadingSpeed !== 0) {
            alpha += fadingSpeed * deltaTime;

            if (toAlpha !== undefined) {

                if ((fadingSpeed > 0 && alpha > toAlpha) || (fadingSpeed < 0 && alpha < toAlpha)) {

                    alpha = toAlpha;

                    toAlpha = undefined;
                    minFadingSpeed = undefined;
                    maxFadingSpeed = undefined;

                    fadingSpeed = 0;
                    fadingAccel = 0;

                    if (fadeEndHandler !== undefined) {
                        let _fadeEndHandler = fadeEndHandler;
                        fadeEndHandler = undefined;
                        _fadeEndHandler();
                    }
                }
            }

            if (alpha > 1) {
                alpha = 1;
            } else if (alpha < 0) {
                alpha = 0;
            }
        }*/

        this.genRealProperties();

        for (const touchArea of this.touchAreas) {
            touchArea.step(deltaTime);
        }
        for (const collider of this.colliders) {
            collider.step(deltaTime);
        }

        //this.checkAllCollisions();

        for (const child of this.children) {
            child.step(deltaTime);
        }

        /*if (isRemoved !== true && eventMap.offscreen !== undefined && self.checkOffScreen() === true) {
            fireEvent('offscreen');
        }

        if (isRemoved !== true && eventMap.nextstep !== undefined) {
            fireEvent('nextstep');
            off('nextstep');
        }

        if (isRemoved !== true && eventMap.move !== undefined && (x !== beforeX || y !== beforeY)) {
            fireEvent('move');
        }*/

        this.pixiContainer.x = this.x;
        this.pixiContainer.y = this.y;
        this.pixiContainer.pivot.set(this.centerX, this.centerY);
        this.pixiContainer.scale.set(this.scaleX, this.scaleY);
        this.pixiContainer.rotation = this.angle * Math.PI / 180;
        if (this.alpha > 1) {
            this.pixiContainer.alpha = 1;
        } else {
            this.pixiContainer.alpha = this.alpha;
        }

        /*if (areaGraphics !== undefined) {
            areaGraphics.x = centerX;
            areaGraphics.y = centerY;
        }*/

        // DOM Wrapper 재조정
        if (this.dom !== undefined) {
            el.style(this.dom, {
                left: Screen.left + (Screen.width / 2 + this.drawingX - Screen.cameraFollowX) * Screen.ratio - this.dom.offsetWidth / 2,
                top: Screen.top + (Screen.height / 2 + this.drawingY - Screen.cameraFollowY) * Screen.ratio - this.dom.offsetHeight / 2,
                transform: `rotate(${this.realRadian}rad) scale(${Screen.ratio * this.realScaleX}, ${Screen.ratio * this.realScaleY})`,
                opacity: this.pixiContainer.worldAlpha,
            });
        }
    }
}
