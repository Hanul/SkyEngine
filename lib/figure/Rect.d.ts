import { GameNodeOptions } from "../GameNode";
import Figure from "./Figure";
export interface RectOptions extends GameNodeOptions {
    width: number;
    height: number;
}
export default class Rect extends Figure {
    constructor(options: RectOptions);
}
//# sourceMappingURL=Rect.d.ts.map