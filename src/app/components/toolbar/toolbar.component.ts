import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
  showMenu: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    // Detect changes in screen size
    this.breakpointObserver.observe(("(max-width: 500px)")).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
