import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionItemComponent } from '../subscription-item/subscription-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuFooterComponent } from '../menu-footer/menu-footer.component';
import { MenuService } from '../../services/menu.service';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  link?: string;
}
interface Subscription {
  channelName: string;
  avatarUrl: string;
  isLive?: boolean;
  hasNewContent?: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatButtonModule,
    SubscriptionItemComponent,
    MenuItemComponent,
    MenuFooterComponent],
  template: `
  <div>

  <div class="menu-overlay" [class.active]="menuService.isOpen" (click)="closeMenu()"></div>

  <nav [class.open]="menuService.isOpen" 
        class="side-menu w-64 h-full bg-white dark:bg-zinc-900 fixed left-0 top-14 p-3">
      <div class="menu-header flex items-center gap-4 mb-4">
        <button mat-icon-button (click)="closeMenu()">
          <mat-icon>close</mat-icon>
        </button>
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
      
      <div class="menu-items">
        <app-menu-item
          *ngFor="let item of mainMenuItems"
          [icon]="item.icon"
          [label]="item.label"
          [isActive]="activeItem === item.id"
        ></app-menu-item>

        <div class="menu-section">
          <div class="section-title">You</div>
          <app-menu-item
            *ngFor="let item of youMenuItems"
            [icon]="item.icon"
            [label]="item.label"
            [isActive]="activeItem === item.id"
          ></app-menu-item>
        </div>

        <div class="menu-section">
          <div class="section-title">Subscriptions</div>
          <app-subscription-item
            *ngFor="let sub of displayedSubscriptions()"
            [channelName]="sub.channelName"
            [avatarUrl]="sub.avatarUrl"
            [isLive]="sub.isLive"
            [hasNewContent]="sub.hasNewContent"
            [isActive]="activeItem === sub.channelName"
          ></app-subscription-item>
          
          <app-menu-item
            *ngIf="subscriptions.length > 4"
            icon="{{ showAllSubscriptions ? 'expand_less' : 'expand_more' }}"
            label="Show {{ showAllSubscriptions ? 'less' : 'more' }}"
            (click)="toggleShowMore()"
          ></app-menu-item>
        </div>

        <div class="menu-section">
          <div class="section-title">Explore</div>
          <app-menu-item
            *ngFor="let item of exploreMenuItems"
            [icon]="item.icon"
            [label]="item.label"
            [isActive]="activeItem === item.id"
          ></app-menu-item>
        </div>

        <div class="menu-section">
          <div class="section-title">More from YouTube</div>
          <app-menu-item
            *ngFor="let item of moreFromYoutubeItems"
            [icon]="item.icon"
            [label]="item.label"
            [isActive]="activeItem === item.id"
          ></app-menu-item>
        </div>

        <div class="menu-section">
          <app-menu-item
            *ngFor="let item of settingsItems"
            [icon]="item.icon"
            [label]="item.label"
            [isActive]="activeItem === item.id"
          ></app-menu-item>
        </div>

        <app-menu-footer></app-menu-footer>
      </div>
    </nav>
  </div>
  `,
  styles: `
    .menu-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;

      &.active {
        display: block;
      }
    }

    .side-menu {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 240px;
      background: white;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 999;
      overflow-y: auto;
      @apply dark:bg-zinc-900;

      &.open {
        transform: translateX(0);
        z-index: 1000;
      }
    }
  `
})
export class MenuComponent {
  constructor(public menuService: MenuService) {}

  activeItem = 'home';
  showAllSubscriptions = false;

  mainMenuItems: MenuItem[] = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'shorts', icon: 'play_circle', label: 'Shorts' },
    { id: 'subscriptions', icon: 'subscriptions', label: 'Subscriptions' }
  ];

  youMenuItems: MenuItem[] = [
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'playlists', icon: 'playlist_play', label: 'Playlists' },
    { id: 'your-videos', icon: 'slideshow', label: 'Your videos' },
    { id: 'watch-later', icon: 'schedule', label: 'Watch later' },
    { id: 'liked-videos', icon: 'thumb_up', label: 'Liked videos' }
  ];

  subscriptions: Subscription[] = [
    {
      channelName: 'mashed',
      avatarUrl: 'https://picsum.photos/seed/mashed/24/24',
      isLive: true
    },
    {
      channelName: 'GENIAL',
      avatarUrl: 'https://picsum.photos/seed/genial/24/24',
      isLive: true
    },
    {
      channelName: 'Teleamazonas Ecuador',
      avatarUrl: 'https://picsum.photos/seed/teleamazonas/24/24',
      hasNewContent: true
    },
    {
      channelName: 'MasterChef Ecuador',
      avatarUrl: 'https://picsum.photos/seed/masterchef/24/24',
      hasNewContent: true
    },
    {
      channelName: 'Firebase',
      avatarUrl: 'https://picsum.photos/seed/firebase/24/24',
      hasNewContent: true
    },
    {
      channelName: 'Zonegamer22',
      avatarUrl: 'https://picsum.photos/seed/zonegamer/24/24',
      hasNewContent: true
    },
    {
      channelName: 'Elevated Systems',
      avatarUrl: 'https://picsum.photos/seed/elevated/24/24',
      hasNewContent: true
    }
  ];

  exploreMenuItems: MenuItem[] = [
    { id: 'trending', icon: 'trending_up', label: 'Trending' },
    { id: 'music', icon: 'music_note', label: 'Music' },
    { id: 'gaming', icon: 'sports_esports', label: 'Gaming' },
    { id: 'sports', icon: 'sports_soccer', label: 'Sports' },
    { id: 'learning', icon: 'lightbulb', label: 'Learning' }
  ];

  moreFromYoutubeItems: MenuItem[] = [
    { id: 'premium', icon: 'smart_display', label: 'YouTube Premium' },
    { id: 'studio', icon: 'video_settings', label: 'YouTube Studio' },
    { id: 'music', icon: 'play_circle', label: 'YouTube Music' },
    { id: 'kids', icon: 'child_care', label: 'YouTube Kids' }
  ];

  settingsItems: MenuItem[] = [
    { id: 'settings', icon: 'settings', label: 'Settings' },
    { id: 'report-history', icon: 'flag', label: 'Report History' },
    { id: 'help', icon: 'help', label: 'Help' },
    { id: 'feedback', icon: 'feedback', label: 'Send Feedback' }
  ];

  closeMenu() {
    this.menuService.isOpen = false;
  }

  toggleShowMore() {
    this.showAllSubscriptions = !this.showAllSubscriptions;
  }

  displayedSubscriptions(): Subscription[] {
    return this.showAllSubscriptions 
      ? this.subscriptions 
      : this.subscriptions.slice(0, 4);
  }
} 