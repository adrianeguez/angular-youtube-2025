import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MenuService } from '../../services/menu.service';


@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <button 
      mat-icon-button 
      class="hamburger-button"
      (click)="menuService.toggleMenu()"
      aria-label="Toggle navigation menu">
      <mat-icon>menu</mat-icon>
    </button>
  `,
  styles: [`
    :host {
      display: block;
    }
    .hamburger-button {
      position: relative;
      z-index: 1000;
    }
  `]
})
export class HamburgerMenuComponent {
  constructor(public menuService: MenuService) {}
} 