import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../typedefs/time.class';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {

  transform(time: Time,): string {
    return time.toString();
  }

}
