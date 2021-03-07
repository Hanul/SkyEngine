import Letterbox from "./Letterbox";
import Screen, { ScreenOptions } from "./Screen";

export default class MainScreen extends Screen {

    private topLetterbox: Letterbox = new Letterbox();
    private bottomLetterbox: Letterbox = new Letterbox();
    private leftLetterbox: Letterbox = new Letterbox();
    private rightLetterbox: Letterbox = new Letterbox();

    constructor(private options: ScreenOptions) {
        super(options);

        this.style({
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        });

        this.canvas.style({
            position: "fixed",
            zIndex: -1,
        });

        this.append(this.topLetterbox, this.bottomLetterbox, this.leftLetterbox, this.rightLetterbox);

        this.topLetterbox.style({ left: 0, top: 0, width: "100%" });
        this.bottomLetterbox.style({ left: 0, bottom: 0, width: "100%" });
        this.leftLetterbox.style({ left: 0, top: 0, height: "100%" });
        this.rightLetterbox.style({ right: 0, top: 0, height: "100%" });

        window.addEventListener("resize", this.windowResizeHandler);
        this.windowResizeHandler();
    }

    private windowResizeHandler = () => {

        const winWidth = document.documentElement.clientWidth;
        const winHeight = window.innerHeight;

        let isToFixWidth = false;
        let isToFixHeight = false;

        /*if (this.options.width !== undefined) {
            this.width = this.options.width;
        } else {
            this.width = winWidth;
            isToFixWidth = true;
        }

        if (this.options.height !== undefined) {
            this.height = this.options.height;
        } else {
            this.height = winHeight;
            isToFixHeight = true;
        }*/
    };

    public delete(): void {
        window.removeEventListener("resize", this.windowResizeHandler);
        super.delete();
    }
}
