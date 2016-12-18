/* tslint:disable:no-unused-variable */

import {Property} from "../property";

describe('Property', () => {
    let property: Property;

    beforeEach(() => {
        property = new Property('foo', 'Foo');
    });

    it('should have name', () => {
        expect(property.name).toBe('foo');
    });

    it('should have label', () => {
        expect(property.label).toBe('Foo');
    });

    it('should change value if new given', () => {
        property = new Property('foo', 'Foo', 4);
        expect(property.value).toEqual(4);
    });

    it('should have default validation function', () => {
        expect(property.isValid).toEqual(jasmine.any(Function));
        expect(property.isGivenValid(4)).toBeTruthy();
        expect(property.isGivenValid('test')).toBeFalsy();
    });

    it('should allow to change value if valid', () => {
        property.value = 4;
        expect(property.value).toEqual(4);
        expect(property.isValid()).toBeTruthy();
    });

    it('should allow to change validation function', () => {
        property = new Property('foo', 'Foo', 4, (value: any): boolean => value === 4);
        expect(property.isValid()).toBeTruthy();
        property.value = 3;
        expect(property.value).toEqual(4);
        expect(property.isValid()).toBeTruthy();
    });
});
