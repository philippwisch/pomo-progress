// dark-mode.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor() {
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    this.isDarkModeSubject.next(isDarkMode);
  }

  toggleDarkMode() {
    const currentMode = this.isDarkModeSubject.value;
    const newMode = !currentMode;
    console.log('darkmode -> ', newMode);
    localStorage.setItem('isDarkMode', newMode ? 'true' : 'false');
    this.isDarkModeSubject.next(newMode);
  }
}
