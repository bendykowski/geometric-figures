/* tslint:disable:no-unused-variable */

import {TestBed, async} from "@angular/core/testing";
import {CalculatorService} from './calculator.service';
import {FiguresService} from "../figures/figures.service";
import {Figure} from "../figures/figures/figure";
import {Calculation} from "../figures/calculation";
import {Property} from "../figures/property";
import {NullCalculation} from "../figures/null-calculation";

class StubFigure1 extends Figure {
    public name: string = 'figure';
    public label: string = 'Figure';
    public properties: Map<string, Property> = new Map()
        .set('foo', new Property('foo', 'Foo'));
    public calculations: Map<string, Calculation> = new Map()
        .set('bar', new Calculation('bar', 'Bar', ['foo'], () => this.getPropertyValue('foo')))
        .set('baz', new Calculation('baz', 'Baz', ['foo'], () => this.getPropertyValue('foo')));
}

class StubFigure2 extends Figure {
    public name: string = 'figure2';
    public label: string = 'Figure2';
    public properties: Map<string, Property> = new Map();
    public calculations: Map<string, Calculation> = new Map();
}

describe('CalculatorService', () => {
    let calculatorService;

    beforeEach(async(() => {
        let figures = {
            getList: () => new Map<string, Figure>()
                .set('figure', new StubFigure1())
                .set('figure2', new StubFigure2())
        };

        TestBed.configureTestingModule({
            providers: [
                {provide: FiguresService, useValue: figures}
            ],
            declarations: [
            ],
            imports: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        let figuresService = TestBed.get(FiguresService);
        calculatorService = new CalculatorService(figuresService);
    });

    it('should exists', () => {
        expect(calculatorService).toBeTruthy();
    });

    it('should provide default selected figure', () => {
        expect(calculatorService.selectedFigure).toEqual(jasmine.any(StubFigure1));
    });

    it('should provide default selected calculation', () => {
        expect(calculatorService.selectedCalculation).toEqual(jasmine.any(Calculation));
        expect(calculatorService.selectedCalculation.name).toEqual('bar');
    });

    it('should provide default calculated value', () => {
        expect(calculatorService.getCalculatedValue()).toEqual(0);
    });

    it('should provide all figures', () => {
        let figures = calculatorService.getFigures();
        expect(figures).toEqual(jasmine.any(Map));
        expect(figures.size).toEqual(2);
        expect(figures.get('figure').name).toBe('figure');
        expect(figures.get('figure2').name).toBe('figure2');
    });

    it('should provide first figure', () => {
        let figure = calculatorService.getFirstFigure();
        expect(figure).toEqual(jasmine.any(Figure));
        expect(figure.name).toBe('figure');
    });

    it('should provide selected figure calculations', () => {
        let calculations = calculatorService.getSelectedFigureCalculations();
        expect(calculations.size).toEqual(2);
        expect(calculations.get('bar')).toEqual(jasmine.any(Calculation));
        expect(calculations.get('baz')).toEqual(jasmine.any(Calculation));
    });

    it('should provide selected figure properties', () => {
        let properties = calculatorService.getSelectedFigureProperties();
        expect(properties.size).toEqual(1);
        expect(properties.get('foo')).toEqual(jasmine.any(Property));
    });

    it('should change figure by name', () => {
        calculatorService.changeFigure('figure2');
        expect(calculatorService.selectedFigure.name).toEqual('figure2');
        expect(calculatorService.selectedCalculation).toEqual(jasmine.any(NullCalculation));
    });

    it('should change calculation by name', () => {
        calculatorService.changeCalculation('baz');
        expect(calculatorService.selectedCalculation.name).toBe('baz');
    });

    it('should calculate', () => {
        spyOn(calculatorService.eventEmitter, 'emit');
        calculatorService.calculate({foo: 13});
        expect(calculatorService.getCalculatedValue()).toEqual(13);
        expect(calculatorService.eventEmitter.emit).toHaveBeenCalledWith('calculationDone');
    });

    it('should not calculate for incorrect properties', () => {
        spyOn(calculatorService.eventEmitter, 'emit');
        calculatorService.calculate({fuu: 13});
        expect(calculatorService.getCalculatedValue()).toEqual(0);
        expect(calculatorService.eventEmitter.emit).toHaveBeenCalledWith('incorrectParameters');
    })
});
