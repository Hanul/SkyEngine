"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static pull(array, ...removeList) {
        for (const el of removeList) {
            const index = array.indexOf(el);
            if (index !== -1) {
                array.splice(index, 1);
            }
        }
    }
}
exports.default = Util;
//# sourceMappingURL=Util.js.map