import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  template: `
    <a 
      class="menu-item" 
      [class.active]="isActive"
      [matTooltip]="label"
      matTooltipPosition="before">
      <mat-icon>{{ icon }}</mat-icon>
      <span>{{ label }}</span>
    </a>
  `,
  styles: [`
    .menu-item {
      display: flex;
      align-items: center;
      padding: 0 24px;
      height: 40px;
      cursor: pointer;
      text-decoration: none;
      border-radius: 10px;
      margin: 0 12px;
      @apply text-gray-900 dark:text-white;

      &:hover {
        background-color: #f2f2f2;
        @apply dark:bg-zinc-800;
      }

      &.active {
        background-color: #f2f2f2;
        @apply dark:bg-zinc-800;
      }

      mat-icon {
        margin-right: 24px;
      }
    }
  `]
})
export class MenuItemComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() isActive: boolean = false;
} 