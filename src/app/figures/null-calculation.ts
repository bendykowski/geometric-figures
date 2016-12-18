import {Calculation} from "./calculation";
import {Property} from "./property";

export class NullCalculation extends Calculation {
    public constructor() {
        super('', '', [], () => 0);
    }

    public isCalculable(properties: Map<string, Property>): boolean {
        return false;
    }
}