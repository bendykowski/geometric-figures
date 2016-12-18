/* tslint:disable:no-unused-variable */

import {Calculation} from "../calculation";
import {Property} from "../property";

describe('Calculation', () => {
    let calculation: Calculation;

    beforeEach(() => {
        calculation = new Calculation(
            'bar',
            'Bar',
            ['foo'],
            () => 4
        );
    });

    it('should create', () => {
        expect(calculation).toBeTruthy();
    });

    it('should has name', () => {
        expect(calculation.name).toBe('bar');
    });

    it('should has label', () => {
        expect(calculation.label).toBe('Bar');
    });

    it('should has array of required properties', () => {
        expect(calculation.properties).toEqual(['foo']);
    });

    it('should has calculation method', () => {
        expect(calculation.calculate).toEqual(jasmine.any(Function));
        expect(calculation.calculate()).toEqual(4);
    });

    it('should return true if it is calculable for given properties', () => {
        let properties = new Map<string, Property>().set('foo', new Property('foo', 'Foo'));
        expect(calculation.isCalculable(properties)).toBeTruthy();
    });

    it('should return false if it is not calculable for given properies', () => {
        let properties = new Map<string, Property>();
        expect(calculation.isCalculable(properties)).toBeFalsy();
    });
});
