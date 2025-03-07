import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuService } from './services/menu.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MainContentComponent, MenuComponent],
  template: `
    <div class="min-h-screen bg-white dark:bg-zinc-900">
      <app-header></app-header>
      <app-menu></app-menu>
      <div [class.pl-64]="menuService.isOpen">
        <app-main-content></app-main-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      @apply bg-white dark:bg-zinc-900 text-gray-900 dark:text-white;
    }
  `]
})
export class AppComponent {
  constructor(
    public menuService: MenuService,
    private themeService: ThemeService
  ) {}
} 