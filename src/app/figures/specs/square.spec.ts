/* tslint:disable:no-unused-variable */

import {Square} from "../figures/square";
import {Property} from "../property";

describe('Square', () => {
    let figure: Square;
    let properties: Map<string, Property>;

    beforeEach(() => {
        figure = new Square();
    });

    it('should create', () => {
        expect(figure).toBeTruthy();
    });

    it('should provide name', () => {
        expect(figure.name).toEqual('square');
    });

    it('should provide label', () => {
        expect(figure.label).toEqual('Square');
    });

    it('should return calculation by name', () => {
        expect(figure.getCalculation('perimeter')).toBeDefined();
        expect(figure.getCalculation('surface')).toBeDefined();
    });

    it('should return properties for perimeter calculation', () => {
        let properties = figure.getProperties(figure.getCalculation('perimeter'));
        expect(properties.size).toEqual(1);
        expect(properties.get('side')).toBeDefined();
    });

    it('should return properties for surface calculation', () => {
        let properties = figure.getProperties(figure.getCalculation('surface'));
        expect(properties.size).toEqual(1);
        expect(properties.get('side')).toBeDefined();
    });

    it('should calculate perimeter base on form values', () => {
        let parameters = new Map<string, number>().set('side', 4);
        expect(figure.calculate('perimeter', parameters)).toEqual(16);
    });

    it('should calculate surface base on form values', () => {
        let parameters = new Map<string, number>().set('side', 4);
        expect(figure.calculate('surface', parameters)).toEqual(16);
    });
});
