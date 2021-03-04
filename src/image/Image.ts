import GameObject, { GameObjectOptions } from "../GameObject";
import loadTexture from "../loadTexture";

export interface ImageOptions extends GameObjectOptions {
    src: string;
}

export default class Image extends GameObject {

    private pixiSprite: PIXI.Sprite | undefined;

    public width = 0;
    public height = 0;

    constructor(options: ImageOptions) {
        super(options);
        this.src = options.src;
    }

    private async changeImage(src: string) {
        const texture = await loadTexture(src);

        this.width = texture.width;
        this.height = texture.height;

        this.pixiSprite = PIXI.Sprite.from(texture);
        this.pixiSprite.anchor.x = 0.5;
        this.pixiSprite.anchor.y = 0.5;
        this.pixiContainer.addChild(this.pixiSprite);
    }

    public set src(src: string) {
        this.changeImage(src);
    }

    public delete(): void {
        this.pixiSprite?.destroy();
        super.delete();
    }
}
