import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbar, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  links = [
    { label: 'Timer', url: '/timer' },
    { label: 'Routines', url: '/routines' },
    { label: 'Timeline', url: '/timeline' },
    { label: 'Progress', url: '/progress' },
    { label: 'Goals', url: '/goals' }
  ];

  isSmallScreen: boolean = false;
  isShowMenu: boolean = false;
  isDarkMode: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private darkModeService: DarkModeService) {
    // Detect changes in screen size
    this.breakpointObserver.observe(("(max-width: 500px)")).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  openSidePanel() {
    
  }
}
