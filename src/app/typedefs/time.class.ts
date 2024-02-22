export class Time {
  hours: string;
  minutes: string;
  seconds: string;

  constructor(hours: string | number, minutes: string | number, seconds: string | number) {
    this.hours = this.formatTimeValue(hours);
    this.minutes = this.formatTimeValue(minutes);
    this.seconds = this.formatTimeValue(seconds);
  }

  private formatTimeValue(value: string | number): string {
    if (typeof value === "number") {
      value = value.toString();
    }
    if (value.length === 1) {
      value = "0" + value;
    }
    return value;
  }
}
