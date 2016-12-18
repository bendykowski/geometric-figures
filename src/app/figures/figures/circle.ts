import {Figure} from './figure';
import {Property} from "../property";
import {Calculation} from "../calculation";

export class Circle extends Figure {
    public readonly name: string = 'circle';
    public readonly label: string = 'Circle';

    protected readonly properties: Map<string, Property> = new Map()
        .set('radius', new Property('radius', 'Radius'));

    protected readonly calculations: Map<string, Calculation> = new Map()
        .set(
            'perimeter',
            new Calculation('perimeter', 'Perimeter', ['radius'],
                () => 2 * Math.PI * this.getPropertyValue('radius')
            )
        )
        .set(
            'surface',
            new Calculation('surface', 'Surface', ['radius'],
                () => Math.PI * (this.getPropertyValue('radius') ** 2)
            )
        );
}