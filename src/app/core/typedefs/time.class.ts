export class Time {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(hours: number | string, minutes: number | string, seconds: number | string);
  constructor(seconds: number);
  constructor(hoursOrSeconds: number | string, minutes?: number | string, seconds?: number | string) {
    if (typeof  hoursOrSeconds === 'number' && typeof minutes === 'undefined' && typeof seconds === 'undefined') {
      this.hours = Math.floor(hoursOrSeconds / 3600);
      this.minutes = Math.floor((hoursOrSeconds % 3600) / 60);
      this.seconds = hoursOrSeconds % 60;
    } else {
      this.hours = this.parseInput(hoursOrSeconds);
      this.minutes = this.parseInput(minutes || 0);
      this.seconds = this.parseInput(seconds || 0);
    }
  }

  private parseInput(value: number | string): number {
    return typeof value === 'string' ? parseInt(value) : value;
  }

  toSeconds(): number {
    return this.hours * 3600 + this.minutes * 60 + this.seconds
  }
}
