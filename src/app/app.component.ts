import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatCard, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(darkModeService: DarkModeService, renderer: Renderer2) {
    darkModeService.isDarkMode$.subscribe(isDarkMode => {
      if (isDarkMode) {
        renderer.removeClass(document.body, 'light-mode');
        renderer.addClass(document.body, 'dark-mode');
      } else {
        renderer.removeClass(document.body, 'dark-mode');
        renderer.addClass(document.body, 'light-mode');
      }
    })
  }

}
