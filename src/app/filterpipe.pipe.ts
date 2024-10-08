import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe',
  standalone: true
})
export class FilterpipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
