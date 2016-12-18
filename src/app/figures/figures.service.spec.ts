/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {FiguresService} from './figures.service';

describe('FiguresService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FiguresService]
        });
    });

    it('should create', inject([FiguresService], (service: FiguresService) => {
        expect(service).toBeTruthy();
    }));

    it('should provide a map of available figures', inject([FiguresService], (service: FiguresService) => {
        let list = service.getList();
        expect(list).toEqual(jasmine.any(Map));
        expect(list.has('circle')).toBeTruthy();
        expect(list.has('rectangle')).toBeTruthy();
        expect(list.has('square')).toBeTruthy();
    }));
});