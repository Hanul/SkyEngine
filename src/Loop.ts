import Util from "./Util";

type LoopInfo = { fps: number | undefined, timeSigma: number, run: (deltaTime: number) => void };

export default class Loop {

    private static animationInterval: number | undefined;
    private static infos: LoopInfo[] = [];

    private static fire() {
        if (this.animationInterval === undefined) {
            let beforeTime = performance.now() / 1000;
            const step = (now: number) => {

                const time = now / 1000;
                const deltaTime = time - beforeTime;

                if (deltaTime > 0) {
                    for (const info of this.infos) {

                        if (info.fps !== undefined && info.fps > 0) {
                            info.timeSigma += deltaTime;
                            const frameSecond = 1 / info.fps;
                            if (info.timeSigma >= frameSecond) {
                                info.run(frameSecond);
                                info.timeSigma -= frameSecond;
                            }
                        } else {
                            info.run(deltaTime);
                        }
                    }
                    beforeTime = time;
                }
                this.animationInterval = requestAnimationFrame(step);
            };
            this.animationInterval = requestAnimationFrame(step);
        }
    }

    private static stop() {
        if (this.animationInterval !== undefined) {
            cancelAnimationFrame(this.animationInterval);
            this.animationInterval = undefined;
        }
    }

    private info: LoopInfo;

    constructor(fps: number | undefined, private run: (deltaTime: number) => void) {
        this.info = { fps, timeSigma: 0, run };
        this.resume();
    }

    public resume(): void {
        Loop.infos.push(this.info);
        Loop.fire();
    }

    public pause(): void {
        Util.pull(Loop.infos, this.info);
        Loop.stop();
    }

    public set fps(fps: number | undefined) {
        this.info.fps = fps;
    }

    public get fps(): number | undefined { return this.info.fps; }

    public destroy(): void {
        this.pause();
    }
}
