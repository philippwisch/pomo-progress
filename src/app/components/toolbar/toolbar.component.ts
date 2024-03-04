import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../services/dark-mode.service';
import { AppStateService } from '../../services/app-state.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbar, MatButtonModule, MatIconModule, RouterModule],
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
  isShowSidebarToggle: boolean = false; // might be unnecessary just check if appstate has a value for that route
  sidebarOpenKey: string = '';

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private darkModeService: DarkModeService,
    public appStateService: AppStateService) {
    // Detect changes in screen size
    this.breakpointObserver.observe(("(max-width: 500px)")).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    // For sidebar toggle
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Show sidebar toggle button only for routes that use a sidebar
      this.isShowSidebarToggle = ['/routines', '/timer'].includes(event.url);
      this.sidebarOpenKey = `${event.url}.isSidebarOpen`;
    });
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  toggleSidebar() {
    this.appStateService.values[this.sidebarOpenKey] = !this.appStateService.values[this.sidebarOpenKey];
    this.appStateService.saveState();
  }
}
