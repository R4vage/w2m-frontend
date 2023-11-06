import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToNumbersArray',
  standalone: true,
})
export class NumberToNumbersArrayPipe implements PipeTransform {
  transform(maxLevel: number): number[] {
    return Array.from({ length: maxLevel }, (_, index) => index + 1);
  }
}
