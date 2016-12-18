/* tslint:disable:no-unused-variable */

import {Calculation} from "../calculation";
import {Property} from "../property";
import {Figure} from "../figures/figure";
import {NullCalculation} from "../null-calculation";

class StubFigure extends Figure {
    public name: string = 'figure';
    public label: string = 'Figure';
    public properties: Map<string, Property> = new Map()
        .set('foo', new Property('foo', 'Foo'));
    public calculations: Map<string, Calculation> = new Map()
        .set('bar', new Calculation('bar', 'Bar', ['foo'], () => this.getPropertyValue('foo')))
        .set('baz', new Calculation('baz', 'Baz', ['foo', 'fuu'], () => this.getPropertyValue('foo')));
}

describe('Figure', () => {
    let figure: StubFigure;
    let properties: Map<string, Property>;

    beforeEach(() => {
        figure = new StubFigure();
    });

    it('should create', () => {
        expect(figure).toBeTruthy();
    });

    it('should provide name', () => {
        expect(figure.name).toEqual('figure');
    });

    it('should provide label', () => {
        expect(figure.label).toEqual('Figure');
    });

    it('should return calculation by name', () => {
        let calculation = figure.getCalculation('bar');
        expect(calculation).toEqual(jasmine.any(Calculation));
        expect(calculation.name).toBe('bar');
    });

    it('should return NullCalculation if trying to receive missing calculation', () => {
        expect(figure.getCalculation('bun')).toEqual(jasmine.any(NullCalculation));
    });

    it('should return first calculation', () => {
        let calculation = figure.getFirstCalculation();
        expect(calculation).toEqual(jasmine.any(Calculation));
        expect(calculation.name).toBe('bar');
    });

    it('should return NullCalculation if first calculation is missing', () => {
        figure.calculations = new Map<string, Calculation>();
        expect(figure.getFirstCalculation()).toEqual(jasmine.any(NullCalculation));
    });

    it('should return properties for given calculation', () => {
        let calculation = figure.getCalculation('bar');
        expect(figure.getProperties(calculation).get('foo')).toBeDefined();
    });

    it('should not return properties for given calculation if properties are missing', () => {
        let calculation = new Calculation('bar', 'Bar', ['test'], () => 0);
        expect(figure.getProperties(calculation).get('test')).toBeUndefined();
    });

    it('should set properties base on form values', () => {
        let parameters = new Map<string, number>().set('foo', 4);
        expect(figure.calculate('bar', parameters)).toBe(4);
    });

    it('should not set invalid properties from form values', () => {
        let parameters1 = new Map<string, any>().set('foo', 'test');
        let parameters2 = new Map<string, any>().set('foo', -1);
        let parameters3 = new Map<string, any>().set('foo', '1');
        expect(figure.calculate('bar', parameters1)).toBe(0);
        expect(figure.calculate('bar', parameters2)).toBe(0);
        expect(figure.calculate('bar', parameters3)).toBe(0);
    });

    it('should return NaN from calculation if required fields are missing', () => {
        let parameters = new Map<string, number>().set('foo', 4);
        expect(figure.calculate('baz', parameters)).toBeNaN();
    });

    it('should return NaN from calculation if given calculation is not defined on figure', () => {
        let parameters = new Map<string, number>().set('foo', 4);
        expect(figure.calculate('bun', parameters)).toBeNaN();
    });

    it('should return all available calculations', () => {
        let availableCalculations: Map<string, Calculation> = figure.getAvailableCalculations();
        expect(availableCalculations.size).toEqual(1);
        expect(availableCalculations.get('bar')).toEqual(jasmine.any(Calculation));
        expect(availableCalculations.get('bar').name).toBe('bar');
        expect(availableCalculations.get('baz')).toBeUndefined();
        expect(availableCalculations.get('bun')).toBeUndefined();
    });
});
