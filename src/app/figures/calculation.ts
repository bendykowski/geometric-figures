import {Property} from "./property";

export class Calculation {
    public readonly name: string;
    public readonly label: string;
    public readonly properties: string[];
    public calculate: () => number;

    public constructor(name: string, label: string, properties: string[], calculate: () => number) {
        this.name = name;
        this.label = label;
        this.properties = properties;
        this.calculate = calculate;
    }

    public isCalculable(properties: Map<string, number | Property>): boolean {
        let calculable: boolean = true;
        this.properties.forEach((property: string) => {
            calculable = calculable && properties.has(property);
        });
        return calculable;
    }
}