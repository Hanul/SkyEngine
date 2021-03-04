import GameObject, { GameObjectOptions } from "../GameObject";
export interface ImageOptions extends GameObjectOptions {
    src: string;
}
export default class Image extends GameObject {
    private pixiSprite;
    width: number;
    height: number;
    constructor(options: ImageOptions);
    private changeImage;
    set src(src: string);
    delete(): void;
}
//# sourceMappingURL=Image.d.ts.map