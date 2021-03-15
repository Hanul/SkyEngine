import { BodyNode } from "@hanul/skynode";
import Image from "../src/image/Image";
import Fullscreen from "../src/Fullscreen";

const screen = new Fullscreen();
screen.root.append(new Image({ x: 0, y: 0, src: "hello.png" }));
BodyNode.append(screen);
