"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Letterbox_1 = __importDefault(require("./Letterbox"));
const Screen_1 = __importDefault(require("./Screen"));
class MainScreen extends Screen_1.default {
    constructor(options) {
        super(options);
        this.options = options;
        this.topLetterbox = new Letterbox_1.default();
        this.bottomLetterbox = new Letterbox_1.default();
        this.leftLetterbox = new Letterbox_1.default();
        this.rightLetterbox = new Letterbox_1.default();
        this.windowResizeHandler = () => {
            const winWidth = document.documentElement.clientWidth;
            const winHeight = window.innerHeight;
            let isToFixWidth = false;
            let isToFixHeight = false;
        };
        this.style({
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        });
        this.canvas.style({
            position: "fixed",
            zIndex: -1,
        });
        this.append(this.topLetterbox, this.bottomLetterbox, this.leftLetterbox, this.rightLetterbox);
        this.topLetterbox.style({ left: 0, top: 0, width: "100%" });
        this.bottomLetterbox.style({ left: 0, bottom: 0, width: "100%" });
        this.leftLetterbox.style({ left: 0, top: 0, height: "100%" });
        this.rightLetterbox.style({ right: 0, top: 0, height: "100%" });
        window.addEventListener("resize", this.windowResizeHandler);
        this.windowResizeHandler();
    }
    delete() {
        window.removeEventListener("resize", this.windowResizeHandler);
        super.delete();
    }
}
exports.default = MainScreen;
//# sourceMappingURL=MainScreen.js.map