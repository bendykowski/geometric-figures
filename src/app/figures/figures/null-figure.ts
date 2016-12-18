import {Figure} from './figure';
import {Property} from "../property";
import {Calculation} from "../calculation";
import {NullCalculation} from "../null-calculation";

export class NullFigure extends Figure {
    public readonly name: string = '';
    public readonly label: string = '';
    protected readonly properties: Map<string, Property> = new Map();
    protected readonly calculations: Map<string, Calculation> = new Map()
        .set('calculation', new NullCalculation());
}
