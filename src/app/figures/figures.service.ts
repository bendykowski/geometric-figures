import {Injectable} from '@angular/core';
import {Figure} from "./figures/figure";
import {Circle} from "./figures/circle";
import {Square} from "./figures/square";
import {Rectangle} from "./figures/rectangle";

@Injectable()
export class FiguresService {
    getList(): Map<string, Figure> {
        return new Map<string, Figure>()
            .set('circle', new Circle())
            .set('square', new Square())
            .set('rectangle', new Rectangle());
    }
}
