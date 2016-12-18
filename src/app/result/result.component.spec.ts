/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultComponent} from './result.component';
import {CalculatorService} from "../calculator/calculator.service";
import {FiguresService} from "../figures/figures.service";

describe('ResultComponent', () => {
    let component: ResultComponent;
    let fixture: ComponentFixture<ResultComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                FiguresService,
                CalculatorService,
            ],
            declarations: [ResultComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
