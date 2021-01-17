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
const el_js_1 = __importDefault(require("@hanul/el.js"));
const PIXI = __importStar(require("pixi.js"));
const Config_1 = __importDefault(require("./Config"));
const Loop_1 = __importDefault(require("./Loop"));
class Screen {
    constructor() {
        this.stageX = 0;
        this.stageY = 0;
        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        this.ratio = 0;
        this.followX = 0;
        this.followY = 0;
        this.cameraFollowCenterX = 0;
        this.cameraFollowCenterY = 0;
        this.windowResizeHandler = () => {
            const winWidth = document.documentElement.clientWidth;
            const winHeight = window.innerHeight;
            let isToFixWidth = false;
            let isToFixHeight = false;
            if (Config_1.default.width !== undefined) {
                this.width = Config_1.default.width;
            }
            else {
                this.width = winWidth;
                isToFixWidth = true;
            }
            if (Config_1.default.height !== undefined) {
                this.height = Config_1.default.height;
            }
            else {
                this.height = winHeight;
                isToFixHeight = true;
            }
            let widthRatio = winWidth / this.width;
            let heightRatio = winHeight / this.height;
            if (widthRatio < heightRatio) {
                this.ratio = widthRatio;
            }
            else {
                this.ratio = heightRatio;
            }
            if (Config_1.default.minWidth !== undefined && this.width / this.ratio < Config_1.default.minWidth) {
                this.width = Config_1.default.minWidth;
                isToFixWidth = false;
            }
            if (Config_1.default.minHeight !== undefined && this.height / this.ratio < Config_1.default.minHeight) {
                this.height = Config_1.default.minHeight;
                isToFixHeight = false;
            }
            widthRatio = winWidth / this.width;
            heightRatio = winHeight / this.height;
            if (widthRatio < heightRatio) {
                this.ratio = widthRatio;
            }
            else {
                this.ratio = heightRatio;
            }
            if (isToFixWidth === true) {
                this.width /= this.ratio;
            }
            if (isToFixHeight === true) {
                this.height /= this.ratio;
            }
            if (Config_1.default.maxWidth !== undefined && this.width > Config_1.default.maxWidth) {
                this.width = Config_1.default.maxWidth;
            }
            if (Config_1.default.maxHeight !== undefined && this.height > Config_1.default.maxHeight) {
                this.height = Config_1.default.maxHeight;
            }
            this.left = (winWidth - this.width * this.ratio) / 2;
            this.top = (winHeight - this.height * this.ratio) / 2;
            el_js_1.default.style(this.canvas, {
                left: this.left,
                top: this.top,
                width: this.width * this.ratio,
                height: this.height * this.ratio
            });
            this.canvas.width = this.width * devicePixelRatio;
            this.canvas.height = this.height * devicePixelRatio;
            el_js_1.default.style(this.leftLetterbox, { width: this.left });
            el_js_1.default.style(this.topLetterbox, { height: this.top });
            el_js_1.default.style(this.rightLetterbox, { width: this.left });
            el_js_1.default.style(this.bottomLetterbox, { height: this.top });
            this.renderer.resize(this.width, this.height);
        };
        document.body.append(this.canvas = el_js_1.default("canvas"), this.leftLetterbox = el_js_1.default("div"), this.topLetterbox = el_js_1.default("div"), this.rightLetterbox = el_js_1.default("div"), this.bottomLetterbox = el_js_1.default("div"));
        el_js_1.default.style(this.canvas, {
            position: "fixed",
            zIndex: -1,
        });
        for (const letterbox of [this.leftLetterbox, this.topLetterbox, this.rightLetterbox, this.bottomLetterbox]) {
            el_js_1.default.style(letterbox, {
                position: "fixed",
                zIndex: 9999998,
                backgroundColor: "#000",
            });
        }
        el_js_1.default.style(this.leftLetterbox, { left: 0, top: 0, height: "100%" });
        el_js_1.default.style(this.topLetterbox, { left: 0, top: 0, width: "100%" });
        el_js_1.default.style(this.rightLetterbox, { right: 0, top: 0, height: "100%" });
        el_js_1.default.style(this.bottomLetterbox, { left: 0, bottom: 0, width: "100%" });
        this.renderer = new PIXI.Renderer({ view: this.canvas, transparent: true });
        this.renderer.plugins.interaction.autoPreventDefault = false;
        this.stage = new PIXI.Container();
        window.addEventListener("resize", this.windowResizeHandler);
        this.windowResizeHandler();
    }
    start(fps) {
        this.loop = new Loop_1.default(fps, (deltaTime) => {
            var _a;
            (_a = this.root) === null || _a === void 0 ? void 0 : _a.step(deltaTime);
            this.stage.x = this.width / 2 - this.cameraFollowX + this.stageX;
            this.stage.y = this.height / 2 - this.cameraFollowY + this.stageY;
            this.renderer.render(this.stage);
        });
    }
    set root(root) {
        if (this._root !== undefined) {
            this.stage.removeChild(this._root.pixiContainer);
            this._root.destroy();
        }
        this._root = root;
        if (root !== undefined) {
            this.stage.addChild(root.pixiContainer);
        }
    }
    get root() { return this._root; }
    get cameraFollowX() {
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
    get cameraFollowY() {
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
exports.default = new Screen();
//# sourceMappingURL=Screen.js.map