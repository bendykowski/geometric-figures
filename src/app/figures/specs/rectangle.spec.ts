/* tslint:disable:no-unused-variable */

import {Rectangle} from "../figures/rectangle";
import {Property} from "../property";

describe('Rectangle', () => {
    let figure: Rectangle;
    let properties: Map<string, Property>;

    beforeEach(() => {
        figure = new Rectangle();
    });

    it('should create', () => {
        expect(figure).toBeTruthy();
    });

    it('should provide name', () => {
        expect(figure.name).toEqual('rectangle');
    });

    it('should provide label', () => {
        expect(figure.label).toEqual('Rectangle');
    });

    it('should return calculation by name', () => {
        expect(figure.getCalculation('perimeter')).toBeDefined();
        expect(figure.getCalculation('surface')).toBeDefined();
    });

    it('should return properties for perimeter calculation', () => {
        let properties = figure.getProperties(figure.getCalculation('perimeter'));
        expect(properties.size).toEqual(2);
        expect(properties.get('height')).toBeDefined();
        expect(properties.get('width')).toBeDefined();
    });

    it('should return properties for surface calculation', () => {
        let properties = figure.getProperties(figure.getCalculation('surface'));
        expect(properties.size).toEqual(2);
        expect(properties.get('height')).toBeDefined();
        expect(properties.get('width')).toBeDefined();
    });

    it('should calculate perimeter base on form values', () => {
        let parameters = new Map<string, number>().set('height', 4).set('width', 6);
        expect(figure.calculate('perimeter', parameters)).toEqual(20);
    });

    it('should calculate surface base on form values', () => {
        let parameters = new Map<string, number>().set('height', 4).set('width', 6);
        expect(figure.calculate('surface', parameters)).toEqual(24);
    });
});
