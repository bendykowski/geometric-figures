import {Component, OnInit, Output} from '@angular/core';
import {CalculatorService} from "../calculator/calculator.service";
import {Figure} from "../figures/figures/figure";
import {Calculation} from "../figures/calculation";

@Component({
    selector: 'gf-figure-chooser',
    templateUrl: './figure-chooser.component.html'
})
export class FigureChooserComponent implements OnInit {
    private figures: Map<string, Figure>;
    private calculations: Map<string, Calculation>;

    constructor(private calculatorService: CalculatorService) {}

    public getSelectedFigure(): string {
        return this.calculatorService.selectedFigure ? this.calculatorService.selectedFigure.name : '';
    }

    public getSelectedCalculation(): string {
        return this.calculatorService.selectedCalculation.name;
    }

    public onFigureChange(figure: string): void {
        this.calculatorService.changeFigure(figure);
        this.calculations = this.calculatorService.getSelectedFigureCalculations();
        this.calculatorService.eventEmitter.emit('figureChanged');
    }

    public onCalculationChange(calculation: string): void {
        this.calculatorService.changeCalculation(calculation);
        this.calculatorService.eventEmitter.emit('calculationChanged');
    }

    public ngOnInit(): void {
        this.figures = this.calculatorService.getFigures();
        let firstFigure = this.calculatorService.getFirstFigure();
        this.calculations = firstFigure ? firstFigure.getAvailableCalculations() : new Map<string, Calculation>();
    }
}
