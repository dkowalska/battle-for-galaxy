import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unknown'
})
export class UnknownPipe implements PipeTransform {

  transform(value: any): string {
    if (typeof value === 'number') {
      return value ? `${value}` : 'unknown';
    }
    if (typeof value === 'string') {
      return value;
    }
    return '';
  }
}
