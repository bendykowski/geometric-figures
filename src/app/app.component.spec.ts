/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {ContainerComponent} from "./container/container.component";
import {FigureChooserComponent} from "./figure-chooser/figure-chooser.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {ResultComponent} from "./result/result.component";
import {FormsModule} from "@angular/forms";
import {CalculatorService} from "./calculator/calculator.service";
import {IterableMapPipe} from "./pipes/iterable-map.pipe";
import {FiguresService} from "./figures/figures.service";

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderComponent,
                ContainerComponent,
                FigureChooserComponent,
                CalculatorComponent,
                ResultComponent,
                IterableMapPipe,
            ],
            providers: [
                FiguresService,
                CalculatorService,
            ],
            imports: [
                FormsModule
            ]
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
