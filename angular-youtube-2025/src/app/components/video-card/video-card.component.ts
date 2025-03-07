import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

interface VideoMetadata {
  title: string;
  channelName: string;
  views: number;
  uploadedAt: string;
  thumbnailUrl: string;
  channelAvatarUrl: string;
  duration: string;
}

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatMenuTrigger],
  template: `
    <div class="w-full cursor-pointer">
      <!-- Thumbnail Section -->
      <div class="relative aspect-video rounded-xl overflow-hidden mb-3">
        <img 
          [src]="video.thumbnailUrl" 
          [alt]="video.title"
          class="w-full h-full object-cover"
        >
        <span class="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
          {{video.duration}}
        </span>
      </div>

      <!-- Details Section -->
      <div class="flex gap-3">
        <!-- Channel Avatar -->
        <div class="flex-shrink-0">
          <img 
            [src]="video.channelAvatarUrl" 
            [alt]="video.channelName"
            class="w-9 h-9 rounded-full"
          >
        </div>

        <!-- Video Info -->
        <div class="flex-grow">
          <h3 class="font-medium text-sm line-clamp-2 mb-1">
            {{video.title}}
          </h3>
          <div class="text-sm text-gray-600 dark:text-zinc-400">
            <div>{{video.channelName}}</div>
            <div>
              {{video.views | number}} views • {{video.uploadedAt}}
            </div>
          </div>
        </div>

        <!-- Menu Button -->
        <div class="flex-shrink-0">
          <button 
            mat-icon-button 
            [matMenuTriggerFor]="menu"
            class="h-8 w-8 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
          >
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item>
              <mat-icon>playlist_play</mat-icon>
              <span>Add to queue</span>
            </button>
            <button mat-menu-item>
              <mat-icon>flag</mat-icon>
              <span>Report</span>
            </button>
            <button mat-menu-item>
              <mat-icon>block</mat-icon>
              <span>Not interested</span>
            </button>
            <button mat-menu-item>
              <mat-icon>feedback</mat-icon>
              <span>Send feedback</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </div>
  `
})
export class VideoCardComponent {
  @Input() video: VideoMetadata = {
    title: 'CAPÍTULO 72 | TEMPORADA 02 | MASTERCHEF CELEBRITY ECUADOR',
    channelName: 'Teleamazonas Ecuador',
    views: 89000,
    uploadedAt: '18 hours ago',
    thumbnailUrl: 'https://picsum.photos/400/225',
    channelAvatarUrl: 'https://picsum.photos/32/32',
    duration: '1:15:03'
  };
} 