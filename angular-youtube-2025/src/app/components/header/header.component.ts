import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HamburgerMenuComponent } from '../hamburger-menu/hamburger-menu.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HamburgerMenuComponent
  ],
  template: `
    <header class="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700">
      <div class="flex items-center gap-4">
        <app-hamburger-menu></app-hamburger-menu>
        <a href="/" class="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/512px-YouTube_Logo_2017.svg.png" 
            alt="YouTube" 
            class="h-5 dark:hidden"
          >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/YouTube_light_logo_%282017%29.svg/512px-YouTube_light_logo_%282017%29.svg.png" 
            alt="YouTube" 
            class="h-5 hidden dark:block"
          >
        </a>
      </div>

      <div class="flex-1 max-w-[720px] mx-4 hidden sm:block">
        <div class="flex">
          <div class="flex-1">
            <input 
              type="text" 
              placeholder="Search" 
              class="w-full h-10 px-4 bg-transparent border border-gray-300 dark:border-zinc-700 rounded-l-full focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-base placeholder:text-gray-500 dark:placeholder:text-zinc-400"
            >
          </div>
          <button class="px-6 h-10 flex items-center justify-center border border-l-0 border-gray-300 dark:border-zinc-700 rounded-r-full hover:bg-gray-100 dark:hover:bg-zinc-800">
            <mat-icon>search</mat-icon>
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="hidden max-sm:block">
            <mat-icon>search</mat-icon>
        </div>
        <button 
          mat-icon-button 
          (click)="themeService.toggleTheme()"
          class="hover:bg-gray-100 dark:hover:bg-zinc-800"
          aria-label="Toggle theme"
        >
          <mat-icon>{{ themeService.isDark ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
        <button mat-raised-button class="create-button hover:bg-gray-100 dark:hover:bg-zinc-800">
          <div class="flex items-center gap-2">
          <mat-icon>add</mat-icon> Create
          </div>
        </button>

        <button mat-icon-button  class="notifications-button relative hover:bg-gray-100 dark:hover:bg-zinc-800" aria-label="Notifications">
          <mat-icon>notifications</mat-icon>
          <span class="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-xs px-1 min-w-4 h-4 flex items-center justify-center rounded-full">9+</span>
        </button>

        <button mat-icon-button class="hover:bg-gray-100 dark:hover:bg-zinc-800" aria-label="Account">
          <img 
            src="https://picsum.photos/32/32" 
            alt="Profile" 
            class="w-8 h-8 rounded-full"
          >
        </button>
      </div>
    </header>
  `,
  styles: `
    .create-button {
      max-height: 30px;
    }
  `
})
export class HeaderComponent {
  constructor(public themeService: ThemeService) {}
} 