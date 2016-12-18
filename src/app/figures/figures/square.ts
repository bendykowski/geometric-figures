import {Figure} from './figure';
import {Property} from "../property";
import {Calculation} from "../calculation";

export class Square extends Figure {
    public readonly name: string = 'square';
    public readonly label: string = 'Square';

    protected readonly properties: Map<string, Property> = new Map()
        .set('side', new Property('side', 'Side'));

    protected readonly calculations: Map<string, Calculation> = new Map()
        .set(
            'perimeter',
            new Calculation('perimeter', 'Perimeter', ['side'],
                () => 4 * this.getPropertyValue('side')
            )
        )
        .set(
            'surface',
            new Calculation('surface', 'Surface', ['side'],
                () => this.getPropertyValue('side') ** 2
            )
        );
}