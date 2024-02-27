import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padWithZeroes',
  standalone: true
})
export class PadWithZeroesPipe implements PipeTransform {

  transform(value: number | string, length: number): string {
    let strValue = value.toString();
    while (strValue.length < length) {
      strValue = '0' + strValue;
    }
    return strValue;
  }

}
