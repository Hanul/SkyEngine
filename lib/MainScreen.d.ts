import Screen from "./Screen";
export interface MainScreenOptions {
    fps?: number;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
}
export default class MainScreen extends Screen {
    private options;
    ratio: number;
    left: number;
    top: number;
    private topLetterbox;
    private bottomLetterbox;
    private leftLetterbox;
    private rightLetterbox;
    constructor(options?: MainScreenOptions);
    private windowResizeHandler;
    delete(): void;
}
//# sourceMappingURL=MainScreen.d.ts.map