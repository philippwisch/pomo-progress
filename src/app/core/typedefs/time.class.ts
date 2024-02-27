export class Time {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(hours: number | string, minutes: number | string, seconds: number | string) {
    this.hours = this.parseInput(hours);
    this.minutes = this.parseInput(minutes);
    this.seconds = this.parseInput(seconds);
  }

  private parseInput(value: number | string): number {
    return typeof value === 'string' ? parseInt(value) : value;
  }
}
