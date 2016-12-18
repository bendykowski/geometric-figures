/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculatorComponent} from './calculator.component';
import {CalculatorService} from "./calculator.service";
import {FormsModule} from "@angular/forms";
import {IterableMapPipe} from "../pipes/iterable-map.pipe";
import {FiguresService} from "../figures/figures.service";

describe('CalculatorComponent', () => {
    let component: CalculatorComponent;
    let fixture: ComponentFixture<CalculatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                FiguresService,
                CalculatorService,
            ],
            declarations: [
                CalculatorComponent,
                IterableMapPipe
            ],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should react on form submit', () => {
        let calculatorService = fixture.debugElement.injector.get(CalculatorService);
        spyOn(calculatorService, 'calculate');
        component.onSubmit({foo: 13});
        expect(calculatorService.calculate).toHaveBeenCalledWith({foo: 13});
    });
});
