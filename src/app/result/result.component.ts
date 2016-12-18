import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "../calculator/calculator.service";

@Component({
    selector: 'gf-result',
    templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
    private calculatedValue = '0';

    constructor(private calculatorService: CalculatorService) {}

    public ngOnInit(): void {
        this.calculatorService.eventEmitter.subscribe((message: string) => {
            this.calculatedValue = message === 'calculationDone'
                ? this.calculatorService.getCalculatedValue().toString()
                : '0';
        })
    }
}
