/* tslint:disable:no-unused-variable */

import {Circle} from "../figures/circle";
import {Property} from "../property";

describe('Circle', () => {
    let figure: Circle;
    let properties: Map<string, Property>;

    beforeEach(() => {
        figure = new Circle();
    });

    it('should create', () => {
        expect(figure).toBeTruthy();
    });

    it('should provide name', () => {
        expect(figure.name).toEqual('circle');
    });

    it('should provide label', () => {
        expect(figure.label).toEqual('Circle');
    });

    it('should return calculation by name', () => {
        expect(figure.getCalculation('perimeter')).toBeDefined();
        expect(figure.getCalculation('surface')).toBeDefined();
    });

    it('should return properties for perimeter calculation', () => {
        let properties = figure.getProperties(figure.getCalculation('perimeter'));
        expect(properties.size).toEqual(1);
        expect(properties.get('radius')).toBeDefined();
    });

    it('should return properties for surface calculation', () => {
        let properties = figure.getProperties(figure.getCalculation('surface'));
        expect(properties.size).toEqual(1);
        expect(properties.get('radius')).toBeDefined();
    });

    it('should calculate perimeter base on form values', () => {
        let parameters = new Map<string, number>().set('radius', 4);
        expect(figure.calculate('perimeter', parameters)).toBeCloseTo(25.1327);
    });

    it('should calculate surface base on form values', () => {
        let parameters = new Map<string, number>().set('radius', 4);
        expect(figure.calculate('surface', parameters)).toBeCloseTo(50.2655);
    });
});
