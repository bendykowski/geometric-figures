import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "./calculator.service";
import {Property} from "../figures/property";

@Component({
    selector: 'gf-calculator',
    templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements OnInit {
    private properties: Map<string, Property>;
    private correctParameters: boolean = true;

    public constructor(private calculatorService: CalculatorService) {}

    public onSubmit(finputedProperties: {[key: string]: number}): void {
        this.calculatorService.calculate(finputedProperties);
    }

    public ngOnInit(): void {
        this.properties = this.calculatorService.getSelectedFigureProperties();
        this.calculatorService.eventEmitter.subscribe((message: string) => {
            if (message === 'figureChanged') {
                this.properties = this.calculatorService.getSelectedFigureProperties();
            }
            this.correctParameters = message !== 'incorrectParameters';
        })
    }
}
