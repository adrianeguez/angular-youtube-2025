import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Short {
  title: string;
  views: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-shorts-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section class="py-4">
      <div class="flex items-center gap-2 px-4 mb-4">
        <mat-icon class="text-red-600 scale-125">bolt</mat-icon>
        <h2 class="text-xl font-medium">Shorts</h2>
      </div>
      
      <div class="px-4">
        <div [class]="gridClass">
          <div *ngFor="let short of visibleShorts" class="cursor-pointer">
            <div class="relative aspect-[9/16] rounded-xl overflow-hidden mb-2">
              <img 
                [src]="short.thumbnailUrl" 
                [alt]="short.title"
                class="w-full h-full object-cover"
              >
            </div>
            <h3 class="font-medium text-sm line-clamp-2">{{short.title}}</h3>
            <span class="text-sm text-gray-600 dark:text-zinc-400">{{short.views}} views</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .menu-6{
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .menu-4{
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .menu-2{
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `
})
export class ShortsSectionComponent {
  shorts: Short[] = [
    {
      title: 'Inside the Cabana 400 - a Modern PREFAB',
      views: '410K',
      thumbnailUrl: 'https://picsum.photos/300/533?random=1'
    },
    {
      title: 'Lenovo ThinkPad Z13 Gen 2 #shorts',
      views: '85K',
      thumbnailUrl: 'https://picsum.photos/300/533?random=2'
    },
    {
      title: 'Autopsias famosas, Parte 2: George Michael',
      views: '232K',
      thumbnailUrl: 'https://picsum.photos/300/533?random=3'
    },
    {
      title: 'CASA PEQUEÑA y ECONÓMICA | 1 NIVEL',
      views: '289K',
      thumbnailUrl: 'https://picsum.photos/300/533?random=4'
    },
    {
      title: '5 Cosas Que No Sabías De Jason Statham',
      views: '2M',
      thumbnailUrl: 'https://picsum.photos/300/533?random=5'
    },
    {
      title: 'Quick Angular Tips #shorts',
      views: '150K',
      thumbnailUrl: 'https://picsum.photos/300/533?random=6'
    }
  ];

  visibleShorts: Short[] = [];

  get gridClass(): string {
    return `menu-${this.visibleShorts.length} grid gap-4 justify-center grid-cols-${this.visibleShorts.length} max-w-fit mx-auto`;
  }

  ngOnInit() {
    this.updateVisibleShorts();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleShorts();
  }

  private updateVisibleShorts() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        this.visibleShorts = this.shorts.slice(0, 6);
      } else if (window.innerWidth >= 768) {
        this.visibleShorts = this.shorts.slice(0, 4);
      } else if (window.innerWidth >= 640) {
        this.visibleShorts = this.shorts.slice(0, 2);
      } else {
        this.visibleShorts = this.shorts.slice(0, 1);
      }
    }
  }
} 