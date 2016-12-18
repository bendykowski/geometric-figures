/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContainerComponent} from './container.component';
import {FigureChooserComponent} from "../figure-chooser/figure-chooser.component";
import {CalculatorComponent} from "../calculator/calculator.component";
import {ResultComponent} from "../result/result.component";
import {FormsModule} from "@angular/forms";
import {CalculatorService} from "../calculator/calculator.service";
import {IterableMapPipe} from "../pipes/iterable-map.pipe";
import {FiguresService} from "../figures/figures.service";

describe('ContainerComponent', () => {
    let component: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContainerComponent,
                FigureChooserComponent,
                CalculatorComponent,
                ResultComponent,
                IterableMapPipe
            ],
            providers: [
                FiguresService,
                CalculatorService,
            ],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
