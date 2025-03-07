import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Chip, ChipsNavComponent } from '../chips-nav/chips-nav.component';
import { ShortsSectionComponent } from '../shorts-section/shorts-section.component';

interface Video {
  title: string;
  channelName: string;
  views: number;
  uploadedAt: string;
  thumbnailUrl: string;
  channelAvatarUrl: string;
  duration: string;
  category: string;
}

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, VideoCardComponent, ChipsNavComponent, ShortsSectionComponent],
  template: `
    <main class="pt-14">
      <div class="sticky top-14 z-10 bg-white dark:bg-zinc-900 pb-4">
        <app-chips-nav (chipSelected)="onChipSelected($event)"></app-chips-nav>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" *ngIf="selectedChip.label === 'All'">
        <app-video-card 
          *ngFor="let video of visibleVideos" 
          [video]="video"
        ></app-video-card>
      </div>
      <app-shorts-section *ngIf="selectedChip.label === 'All'"></app-shorts-section>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" 
        *ngIf="filteredVideos.length > 0">
        <app-video-card 
          *ngFor="let video of filteredVideos" 
          [video]="video"
        ></app-video-card>
      </div>
      <div *ngIf="filteredVideos.length === 0">
        <h1 class="text-2xl font-bold text-center">No videos found</h1>
      </div>
    </main>
  `
})
export class MainContentComponent {
  selectedChip: Chip = { label: 'All', isActive: true, category: 'all' };

  videos: Video[] = [
    {
      title: 'CAPÍTULO 72 | TEMPORADA 02 | MASTERCHEF CELEBRITY ECUADOR',
      channelName: 'Teleamazonas Ecuador',
      views: 89000,
      uploadedAt: '18 hours ago',
      thumbnailUrl: 'https://picsum.photos/400/225',
      channelAvatarUrl: 'https://picsum.photos/32/32',
      duration: '1:15:03',
      category: 'tv-series'
    },
    {
      title: 'Building a Modern YouTube Clone with Angular',
      channelName: 'Angular Developer',
      views: 150000,
      uploadedAt: '2 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=1',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=1',
      duration: '28:15',
      category: 'computers'
    },
    {
      title: 'Learn Tailwind CSS in 2024',
      channelName: 'Web Design Master',
      views: 250000,
      uploadedAt: '1 week ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=2',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=2',
      duration: '45:22',
      category: 'computers'
    },
    {
      title: 'TypeScript Advanced Concepts',
      channelName: 'Code Academy',
      views: 180000,
      uploadedAt: '3 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=3',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=3',
      duration: '32:40',
      category: 'computers'
    },
    {
      title: 'AI in Modern Web Development',
      channelName: 'Tech Insights',
      views: 150000,
      uploadedAt: '2 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=4',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=4',
      duration: '28:15',
      category: 'ai'
    },
    {
      title: 'Kitchen Renovation Ideas 2024',
      channelName: 'Home Design',
      views: 250000,
      uploadedAt: '1 week ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=5',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=5',
      duration: '45:22',
      category: 'kitchens'
    },
    {
      title: 'Live Coding Session: Building an API',
      channelName: 'Code With Me',
      views: 180000,
      uploadedAt: '3 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=6',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=6',
      duration: '32:40',
      category: 'live'
    },
    {
      title: 'StarCraft Pro Match Analysis',
      channelName: 'ESports Central',
      views: 150000,
      uploadedAt: '2 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=7',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=7',
      duration: '28:15',
      category: 'starcraft'
    },
    {
      title: 'Building a Modern YouTube Clone with Angular',
      channelName: 'Angular Developer',
      views: 150000,
      uploadedAt: '2 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=1',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=1',
      duration: '28:15',
      category: 'computers'
    },
    {
      title: 'Learn Tailwind CSS in 2024',
      channelName: 'Web Design Master',
      views: 250000,
      uploadedAt: '1 week ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=2',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=2',
      duration: '45:22',
      category: 'computers'
    },
    {
      title: 'TypeScript Advanced Concepts',
      channelName: 'Code Academy',
      views: 180000,
      uploadedAt: '3 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=3',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=3',
      duration: '32:40',
      category: 'computers'
    },
    {
      title: 'Building a Modern YouTube Clone with Angular',
      channelName: 'Angular Developer',
      views: 150000,
      uploadedAt: '2 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=1',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=1',
      duration: '28:15',
      category: 'computers'
    },
    {
      title: 'Learn Tailwind CSS in 2024',
      channelName: 'Web Design Master',
      views: 250000,
      uploadedAt: '1 week ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=2',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=2',
      duration: '45:22',
      category: 'computers'
    },
    {
      title: 'TypeScript Advanced Concepts',
      channelName: 'Code Academy',
      views: 180000,
      uploadedAt: '3 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=3',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=3',
      duration: '32:40',
      category: 'computers'
    },
    {
      title: 'Building a Modern YouTube Clone with Angular',
      channelName: 'Angular Developer',
      views: 150000,
      uploadedAt: '2 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=1',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=1',
      duration: '28:15',
      category: 'computers'
    },
    {
      title: 'Learn Tailwind CSS in 2024',
      channelName: 'Web Design Master',
      views: 250000,
      uploadedAt: '1 week ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=2',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=2',
      duration: '45:22',
      category: 'computers'
    },
    {
      title: 'TypeScript Advanced Concepts',
      channelName: 'Code Academy',
      views: 180000,
      uploadedAt: '3 days ago',
      thumbnailUrl: 'https://picsum.photos/400/225?random=3',
      channelAvatarUrl: 'https://picsum.photos/32/32?random=3',
      duration: '32:40',
      category: 'computers'
    }
  ];

  visibleVideos: Video[] = [];

  filteredVideos: Video[] = [];

  ngOnInit() {
    this.updateVisibleVideos();
    this.onChipSelected(this.selectedChip);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleVideos();
  }

  private updateVisibleVideos() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        this.visibleVideos = this.videos.slice(0, 4);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        this.visibleVideos = this.videos.slice(0, 3);
      } else {
        this.visibleVideos = this.videos.slice(0, 4);
      }
    }
  }

  onChipSelected(chip: Chip) {
    this.selectedChip = chip;
    if(chip.category === 'all') {
      this.filteredVideos = [...this.videos];
    }else{
      this.filteredVideos = this.videos.filter(video => video.category === chip.category);
    }
    
  }
} 