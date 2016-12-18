import {Injectable, EventEmitter} from '@angular/core';

import {Figure} from "../figures/figures/figure";
import {Property} from "../figures/property";
import {Calculation} from "../figures/calculation";
import {NullFigure} from "../figures/figures/null-figure";
import {NullCalculation} from "../figures/null-calculation";
import {FiguresService} from "../figures/figures.service";

@Injectable()
export class CalculatorService {
    public readonly eventEmitter = new EventEmitter<string>();

    public selectedFigure: Figure = new NullFigure();
    public selectedCalculation: Calculation = new NullCalculation();

    private calculatedValue: number = 0;

    public getFigures(): Map<string, Figure> {
        return this.figuresService.getList();
    }

    public getFirstFigure(): Figure {
        return Array.from(this.getFigures().values())[0] || new NullFigure();
    }

    public getSelectedFigureCalculations(): Map<string, Calculation> {
        return this.selectedFigure.getAvailableCalculations();
    }

    public getSelectedFigureProperties(): Map<string, Property> {
        return this.selectedFigure.getProperties(this.selectedCalculation);
    }

    public changeFigure(figure: string): void {
        this.selectedFigure = this.getFigures().get(figure) || new NullFigure();
        this.selectedCalculation = this.selectedFigure.getFirstCalculation();
    }

    public changeCalculation(calculation: string): void {
        this.selectedCalculation = this.selectedFigure.getCalculation(calculation);
    }

    public calculate(inputedProperties: {[key: string]: number}): void {
        let result = this.selectedFigure.calculate(this.selectedCalculation.name, this.createMapFromObject(inputedProperties));
        if (!isNaN(result)) {
            this.calculatedValue = result;
            this.eventEmitter.emit('calculationDone');
        } else {
            this.eventEmitter.emit('incorrectParameters');
        }
    }

    public getCalculatedValue(): number {
        return this.calculatedValue;
    }

    public constructor(private figuresService: FiguresService) {
        this.selectedFigure = this.getFirstFigure();
        this.selectedCalculation = this.selectedFigure.getFirstCalculation();
    }

    private createMapFromObject(obj: {[key: string]: any}): Map<string, number> {
        let map: Map<string, number> = new Map();
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                map.set(prop, Number(obj[prop]));
            }
        }
        return map;
    }
}
