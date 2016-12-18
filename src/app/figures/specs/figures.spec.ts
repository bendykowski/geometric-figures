/* tslint:disable:no-unused-variable */

import {Figures} from "../figures";

describe('Figures', () => {
    let figures: Figures;

    beforeEach(() => {
        figures = new Figures();
    });

    it('should create', () => {
        expect(figures).toBeTruthy();
    });

    it('should provide a map of available figures', () => {
        let list = figures.list;
        expect(list).toEqual(jasmine.any(Map));
        expect(list.has('circle')).toBeTruthy();
        expect(list.has('rectangle')).toBeTruthy();
        expect(list.has('square')).toBeTruthy();
    });
});
