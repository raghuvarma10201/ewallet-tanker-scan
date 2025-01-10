import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locations'
})
export class LocationsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
