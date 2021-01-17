import el from "@hanul/el.js";
import loadTexture from "./loadTexture";

class ImageDataManager {

    private TRANSPARENT_ALPHA = 20;

    private OUTLINE_DX = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1];
    private OUTLINE_DY = [0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0];

    private imageDataCache: { [src: string]: Uint8ClampedArray } = {};

    public getCachedImageData(src: string) {
        return this.imageDataCache[src];
    }

    public async load(src: string): Promise<{
        data: Uint8ClampedArray;
        imgData: ImageData;
        width: number;
        height: number;
    } | undefined> {
        const texture = await loadTexture(src);

        const width = texture.width;
        const height = texture.height;

        const canvas: HTMLCanvasElement = el("canvas", {
            style: { display: "none" },
            width: `${width}px`,
            height: `${height}px`,
        });
        document.body.append(canvas);

        const imageContext = canvas.getContext("2d");
        if (imageContext !== null && texture.baseTexture.resource instanceof HTMLImageElement) {
            imageContext.drawImage(texture.baseTexture.resource, 0, 0, width, height);
            const imgData = imageContext.getImageData(0, 0, width, height);
            canvas.remove();
            return {
                data: imgData.data,
                imgData,
                width,
                height,
            };
        }
        canvas.remove();
    }

    public async loadAndCache(src: string) {
        if (this.getCachedImageData(src) === undefined) {
            const info = await this.load(src);
            if (info !== undefined) {
                this.imageDataCache[src] = info.data;
            }
        }
    }

    public checkPointIsTransparent(imageData: Uint8ClampedArray, width: number, x: number, y: number) {
        return imageData[(y * width + x) * 4 + 3] <= this.TRANSPARENT_ALPHA;
    }

    public convertToPolygonPoints(imageData: Uint8ClampedArray, width: number) {

        let x = 0;
        let y = 0;

        let pdx;
        let pdy;

        let startX;
        let startY;

        const points = [];

        // eslint-disable-next-line no-constant-condition
        while (true) {

            if (this.checkPointIsTransparent(imageData, width, x, y) !== true) {
                startX = x;
                startY = y;
                break;
            }

            if (x === 0) {
                x = y + 1;
                y = 0;
            } else {
                x = x - 1;
                y = y + 1;
            }
        }

        x = startX;
        y = startY;

        let dx = 0;
        let dy = 0;

        do {
            let i = 0;

            if (this.checkPointIsTransparent(imageData, width, x - 1, y - 1) !== true) {
                i += 1;
            }
            if (this.checkPointIsTransparent(imageData, width, x, y - 1) !== true) {
                i += 2;
            }
            if (this.checkPointIsTransparent(imageData, width, x - 1, y) !== true) {
                i += 4;
            }
            if (this.checkPointIsTransparent(imageData, width, x, y) !== true) {
                i += 8;
            }

            if (i === 6) {
                dx = pdy === -1 ? -1 : 1;
                dy = 0;
            } else if (i === 9) {
                dx = 0;
                dy = pdx === 1 ? -1 : 1;
            } else if (i < 15) {
                dx = this.OUTLINE_DX[i];
                dy = this.OUTLINE_DY[i];
            } else {
                break;
            }

            if (dx !== pdx && dy !== pdy) {

                points.push({
                    x: x,
                    y: y
                });

                pdx = dx;
                pdy = dy;
            }

            x += dx;
            y += dy;

            if (x < 0 || y < 0) {
                break;
            }

        } while (startX !== x || startY !== y);

        return points;
    }
}

export default new ImageDataManager();
