import { BodyNode } from "@hanul/skynode";
import Image from "../src/image/Image";
import MainScreen from "../src/MainScreen";

const screen = new MainScreen();
screen.root.append(new Image({ x: 0, y: 0, src: "hello.png" }));
BodyNode.append(screen);
