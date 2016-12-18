import {Property} from "../property";
import {Calculation} from "../calculation";
import {NullCalculation} from "../null-calculation";

export abstract class Figure {
    public abstract readonly name: string;
    public abstract readonly label: string;
    protected abstract readonly properties: Map<string, Property>;
    protected abstract readonly calculations: Map<string, Calculation>;

    public calculate(calculationName: string, properties: Map<string, number>): number {
        let calculation = this.calculations.get(calculationName);
        if (!calculation || !calculation.isCalculable(properties)) {
            return NaN;
        }
        this.setPropertiesValues(properties);
        return this.hasRequiredData(calculation) ? calculation.calculate() : NaN;
    }

    public getCalculation(calculation: string): Calculation {
        return this.calculations.get(calculation) || new NullCalculation();
    }

    public getFirstCalculation(): Calculation {
        return Array.from(this.calculations.values())[0] || new NullCalculation();
    }

    public getAvailableCalculations(): Map<string, Calculation> {
        let calculations: Map<string, Calculation> = new Map<string, Calculation>();
        this.calculations.forEach((calculation: Calculation, index: string) => {
            if (calculation.isCalculable(this.properties)) {
                calculations.set(index, calculation);
            }
        });
        return calculations;
    }

    public getProperties(calculation: Calculation): Map<string, Property> {
        let properties: Map<string, Property> = new Map<string, Property>();
        if (calculation) {
            calculation.properties.forEach((property: string) => {
                if (this.properties.has(property)) {
                    properties.set(property, this.properties.get(property));
                }
            });
        }
        return properties;
    }

    protected setPropertiesValues(properties: Map<string, number>) {
        properties.forEach((value: number, name: string) => {
            if (this.properties.has(name)) {
                this.properties.get(name).value = value;
            }
        });
    }

    protected hasRequiredData(calculation: Calculation): boolean {
        let calculable: boolean = true;
        if (!calculation.isCalculable(this.properties)) {
            return false;
        }
        let availableProperties = this.getProperties(calculation);
        availableProperties.forEach((property: Property) => {
            calculable = calculable && property.isValid();
        });
        return calculable;
    }

    protected getPropertyValue(name: string): number {
        return this.properties.get(name).value;
    }
}