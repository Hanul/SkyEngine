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
const Loop_1 = __importDefault(require("./Loop"));
class Screen {
    constructor(fps) {
        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        this.ratio = 0;
        this.followX = 0;
        this.followY = 0;
        this.cameraFollowCenterX = 0;
        this.cameraFollowCenterY = 0;
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
        this.loop = new Loop_1.default(fps, () => {
        });
    }
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