import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'iterableMap'
})
export class IterableMapPipe implements PipeTransform {

    transform<T>(map: Map<any, T>): T[] {
        return Array.from(map.values());
    }

}
