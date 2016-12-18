import {isNumber} from "util";

export class Property {
    public readonly name: string;
    public readonly label: string;
    private _value: number = 0;

    constructor(name: string, label: string, value?: number, isValid?: (value: any) => boolean) {
        this.name = name;
        this.label = label;
        if (value) {
            this.value = value;
        }
        if (isValid) {
            this.isGivenValid = isValid;
        }
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        if (this.isGivenValid(value)) {
            this._value = value;
        }
    }

    public isValid(): boolean {
        return this.isGivenValid(this.value);
    }

    public isGivenValid(value?: any): boolean {
        return isNumber(value) && value >= 0;
    }
}