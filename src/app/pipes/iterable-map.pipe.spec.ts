/* tslint:disable:no-unused-variable */

import {IterableMapPipe} from './iterable-map.pipe';

describe('IterableMapPipe', () => {
    let pipe: IterableMapPipe;

    beforeEach(() => {
        pipe = new IterableMapPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should transform map into array', () => {
        let map = new Map<string, number>().set('one', 1).set('two', 2).set('three', 3);
        let transformedArray = pipe.transform(map);
        expect(transformedArray).toEqual([1, 2, 3]);
    });
});
