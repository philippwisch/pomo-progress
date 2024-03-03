import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// this service provides a simple way for components to make data available globally throughout the app
// or in other words, it allows components to access and manipulate a global app state
export class AppStateService {
  public values: { [key: string]: any } = {};

  constructor() {
    // Load state from local storage when the service is initialized
    this.loadState();
  }

  ngOnDestroy() {
    this.saveState();
  }

  public saveState() {
    localStorage.setItem('appState', JSON.stringify(this.values));
  }

  private loadState() {
    const storedState = localStorage.getItem('appState');
    if (storedState) {
      this.values = JSON.parse(storedState);
    }
  }
}

