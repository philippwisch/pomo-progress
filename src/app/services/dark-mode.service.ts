import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import * as convert from 'color-convert';

export interface ColorRegistration {
  originalColor: string;
  adjustedColor$: BehaviorSubject<string>;
}

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private colorRegistrations: ColorRegistration[] = [];

  public isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor() {
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    this.isDarkModeSubject.next(isDarkMode);
  }

  toggleDarkMode() {
    const newMode = !this.isDarkModeSubject.value;

    localStorage.setItem('isDarkMode', newMode ? 'true' : 'false');
    this.isDarkModeSubject.next(newMode);

    // when dark mode is changed, lighten or darken all registered colors
    this.colorRegistrations.forEach(registration => {
      registration.adjustedColor$.next(this.adjustColor(registration.originalColor, newMode));
    })
  }

  /**
   * Takes a color in hex format and returns an observable that returns
   * this color either darkened (in dark mode) or lightened (in light mode)
   * When dark mode is toggled, the color will be adjusted accordingly
   * @param colorHex the original color
   * @returns Observable that emits the adjusted color
   */
  registerColor(colorHex: string): Observable<string> {
    const registration = {
      originalColor: colorHex,
      adjustedColor$: new BehaviorSubject<string>(this.adjustColor(colorHex, this.isDarkModeSubject.value))
    }
    this.colorRegistrations.push(registration)
    return registration.adjustedColor$.asObservable();
  }

  adjustColor(colorHex: string, isDarkMode: boolean): string {
    const hsl = convert.hex.hsl(colorHex);
    const l = isDarkMode ? 20 : 85;
    const s = 50;
    return '#' + convert.hsl.hex([hsl[0], s, l]);
  }
}
