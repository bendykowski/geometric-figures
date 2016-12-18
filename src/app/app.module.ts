import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {FigureChooserComponent} from './figure-chooser/figure-chooser.component';
import {HeaderComponent} from './header/header.component';
import {ContainerComponent} from './container/container.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {ResultComponent} from './result/result.component';
import {CalculatorService} from "./calculator/calculator.service";
import {IterableMapPipe} from './pipes/iterable-map.pipe';
import {FiguresService} from "./figures/figures.service";

@NgModule({
    declarations: [
        AppComponent,
        FigureChooserComponent,
        HeaderComponent,
        ContainerComponent,
        CalculatorComponent,
        ResultComponent,
        IterableMapPipe
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        CalculatorService,
        FiguresService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
