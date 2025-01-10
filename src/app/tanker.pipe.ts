import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tanker'
})
export class TankerPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
