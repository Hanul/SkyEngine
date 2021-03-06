import GameNode, { GameNodeOptions } from "../GameNode";
export interface ImageOptions extends GameNodeOptions {
    src: string;
}
export default class Image extends GameNode {
    private pixiSprite;
    width: number;
    height: number;
    constructor(options: ImageOptions);
    private changeImage;
    set src(src: string);
    delete(): void;
}
//# sourceMappingURL=Image.d.ts.map