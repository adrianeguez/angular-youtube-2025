import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkSignal = signal(this.initializeTheme());

  constructor() {
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    }
  }

  get isDark() {
    return this.isDarkSignal();
  }

  toggleTheme() {
    this.isDarkSignal.update(dark => !dark);
    if (this.isDarkSignal()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', this.isDarkSignal() ? 'dark' : 'light');
  }

  private initializeTheme(): boolean {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
} 