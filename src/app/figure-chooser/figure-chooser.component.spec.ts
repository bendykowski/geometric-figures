/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FigureChooserComponent} from './figure-chooser.component';
import {CalculatorService} from "../calculator/calculator.service";
import {FormsModule} from "@angular/forms";
import {IterableMapPipe} from "../pipes/iterable-map.pipe";

describe('FigureChooserComponent', () => {
    let component: FigureChooserComponent;
    let fixture: ComponentFixture<FigureChooserComponent>;
    let compiled;
    let selectedCalculation;
    let calculatorServiceStub;

    beforeEach(async(() => {
        selectedCalculation = {
            name: 'perimeter',
            label: 'Perimeter',
            properties: ['radius'],
            calculation: () => 4
        };
        calculatorServiceStub = {
            eventEmitter: { emit: () => {}},
            selectedFigure: { name: 'circle', label: 'Circle' },
            selectedCalculation: { name: 'perimeter', label: 'Perimeter' },
            changeFigure() {},
            changeCalculation() {},
            getSelectedFigureCalculations() {},
            getFigures() {
                return new Map()
                    .set('circle', { name: 'circle', label: 'Circle' });
            },
            getFirstFigure() {
                return {
                    name: 'circle',
                    getAvailableCalculations: () => new Map().set('perimeter', selectedCalculation)
                }
            }
        };

        TestBed.configureTestingModule({
            providers: [
                {provide: CalculatorService, useValue: calculatorServiceStub}
            ],
            declarations: [
                FigureChooserComponent,
                IterableMapPipe
            ],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FigureChooserComponent);
        component = fixture.componentInstance;
        component.getSelectedCalculation = () => selectedCalculation.name;
        fixture.detectChanges();
        compiled = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render panel title', async(() => {
        expect(compiled.querySelector('.panel-title').textContent).toContain('Calculation type');
    }));

    it('should render calculations radios', async(() => {
        let radios = compiled.querySelectorAll('.radio');
        expect(radios[0].textContent).toContain('Perimeter');
    }));

    it('should render figures select', async(() => {
        let select = compiled.querySelectorAll('#figure option');
        expect(select[0].textContent).toContain('Circle');
    }));

    it('should provide selected figure', () => {
        expect(component.getSelectedFigure()).toEqual('circle');
    });

    it('should provide selected calculation', () => {
        expect(component.getSelectedCalculation()).toEqual('perimeter');
    });

    it('should react to figure change', async(() => {
        let calculatorService = fixture.debugElement.injector.get(CalculatorService);

        spyOn(calculatorService, 'changeFigure');
        spyOn(calculatorService, 'getSelectedFigureCalculations');
        spyOn(calculatorService.eventEmitter, 'emit');

        component.onFigureChange('circle');

        expect(calculatorService.changeFigure).toHaveBeenCalledWith('circle');
        expect(calculatorService.getSelectedFigureCalculations).toHaveBeenCalled();
        expect(calculatorService.eventEmitter.emit).toHaveBeenCalledWith('figureChanged');
    }));

    it('should react to calculation change', async(() => {
        let calculatorService = fixture.debugElement.injector.get(CalculatorService);

        spyOn(calculatorService, 'changeCalculation');
        spyOn(calculatorService.eventEmitter, 'emit');

        component.onCalculationChange('perimeter');

        expect(calculatorService.changeCalculation).toHaveBeenCalledWith('perimeter');
        expect(calculatorService.eventEmitter.emit).toHaveBeenCalledWith('calculationChanged');
    }));
});
