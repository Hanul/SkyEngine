import { DomNode } from "@hanul/skynode";
import GameNode from "./GameNode";
export default class Screen extends DomNode<HTMLCanvasElement> {
    private fps?;
    private static readonly WINDOW_BLUR_FPS;
    private animationInterval;
    private beforeTime;
    private timeSigma;
    private originFPS;
    private renderer;
    root: GameNode;
    constructor(fps?: number | undefined);
    private step;
    private windowBlurHandler;
    private windowFocusHandler;
    private tic;
    resume(): void;
    pause(): void;
    delete(): void;
}
//# sourceMappingURL=Screen.d.ts.map