import {Figure} from './figure';
import {Property} from "../property";
import {Calculation} from "../calculation";

export class Rectangle extends Figure {
    public readonly name: string = 'rectangle';
    public readonly label: string = 'Rectangle';

    protected readonly properties: Map<string, Property> = new Map()
        .set('height', new Property('height', 'Height'))
        .set('width', new Property('width', 'Width'));

    protected readonly calculations: Map<string, Calculation> = new Map()
        .set(
            'perimeter',
            new Calculation('perimeter', 'Perimeter', ['height', 'width'],
                () => 2 * this.getPropertyValue('height') + 2 * this.getPropertyValue('width')
            )
        )
        .set(
            'surface',
            new Calculation('surface', 'Surface', ['height', 'width'],
                () => this.getPropertyValue('height') * this.getPropertyValue('width')
            )
        );
}