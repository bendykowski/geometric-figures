/* tslint:disable:no-unused-variable */

import {NullCalculation} from "../null-calculation";
import {Property} from "../property";

describe('NullCalculation', () => {
    let nullCalculation: NullCalculation;

    beforeEach(() => {
        nullCalculation = new NullCalculation();
    });

    it('should create', () => {
        expect(nullCalculation).toBeTruthy();
    });

    it('should empty values', () => {
        expect(nullCalculation.name).toEqual('');
        expect(nullCalculation.label).toEqual('');
        expect(nullCalculation.properties).toEqual([]);
        expect(nullCalculation.calculate).toEqual(jasmine.any(Function));
        expect(nullCalculation.calculate()).toEqual(0);
    });

    it('should always tell calculation is not calculable for any properties', () => {
        expect(nullCalculation.isCalculable).toEqual(jasmine.any(Function));
        expect(nullCalculation.isCalculable(new Map<string, Property>())).toBeFalsy();
        expect(nullCalculation.isCalculable(new Map<string, Property>().set('', new Property('', '')))).toBeFalsy();
    });
});
