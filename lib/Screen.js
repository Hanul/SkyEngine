"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const el_js_1 = __importDefault(require("@hanul/el.js"));
const skynode_1 = require("@hanul/skynode");
class Screen extends skynode_1.DomNode {
    constructor() {
        super(el_js_1.default("canvas"));
        this.domElement;
    }
}
exports.default = Screen;
//# sourceMappingURL=Screen.js.map