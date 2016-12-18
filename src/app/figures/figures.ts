import {Figure} from "./figures/figure";
import {Circle} from "./figures/circle";
import {Rectangle} from "./figures/rectangle";
import {Square} from "./figures/square";

export class Figures {
    public readonly list: Map<string, Figure> = new Map<string, Figure>()
        .set('circle', new Circle())
        .set('square', new Square())
        .set('rectangle', new Rectangle());
}