import Image from "../src/image/Image";
import Screen from "../src/Screen";
import { BodyNode } from "@hanul/skynode";

//Screen.root = new Image({ x: 0, y: 0, src: "hello.png" });
//Screen.start();

const screen = new Screen();
BodyNode.add(screen);