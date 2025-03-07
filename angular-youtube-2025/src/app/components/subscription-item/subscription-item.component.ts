import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-subscription-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  template: `
    <a 
      class="subscription-item" 
      [class.active]="isActive"
      [matTooltip]="channelName"
      matTooltipPosition="right">
      <img [src]="avatarUrl" [alt]="channelName" class="channel-avatar">
      <span class="channel-name">{{ channelName }}</span>
      <mat-icon *ngIf="hasNewContent" class="status-icon">fiber_manual_record</mat-icon>
      <mat-icon *ngIf="isLive" class="live-icon">sensors</mat-icon>
    </a>
  `,
  styles: [`
    .subscription-item {
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
    }

    .channel-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 24px;
      object-fit: cover;
    }

    .channel-name {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .status-icon {
      font-size: 8px;
      height: 8px;
      width: 8px;
      color: #065fd4;
    }

    .live-icon {
      font-size: 16px;
      height: 16px;
      width: 16px;
      color: #cc0000;
    }
  `]
})
export class SubscriptionItemComponent {
  @Input() channelName: string = '';
  @Input() avatarUrl: string = '';
  @Input() isActive: boolean = false;
  @Input() hasNewContent?: boolean = false;
  @Input() isLive?: boolean = false;
} 