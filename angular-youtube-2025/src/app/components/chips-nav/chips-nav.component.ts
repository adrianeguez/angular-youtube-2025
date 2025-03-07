import { Component, EventEmitter, Output, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

export interface Chip {
  label: string;
  isActive: boolean;
  category: string;
}

@Component({
  selector: 'app-chips-nav',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatChipsModule, MatMenuModule],
  template: `
    <div class="relative flex items-center">
      <!-- Left scroll button -->
      <button 
        mat-mini-fab
        class="scroll-button left-0 z-10 bg-white dark:bg-zinc-900"
        [class.hidden]="isScrolledLeft || !showScrollButtons"
        (click)="scrollLeft()"
      >
        <mat-icon>chevron_left</mat-icon>
      </button>

      <!-- Chips container -->
      <div 
        #scrollContainer
        class="flex gap-3 overflow-x-hidden scroll-smooth px-4"
        (scroll)="onScroll()"
      >
        <div 
          *ngFor="let chip of chips" 
          class="flex-shrink-0"
        >
          <button 
            [class]="chip.isActive ? activeChipClass : inactiveChipClass"
            (click)="selectChip(chip)"
          >
            {{chip.label}}
          </button>
        </div>
      </div>

      <!-- Right scroll button -->
      <button 
        mat-mini-fab
        class="scroll-button right-0 z-10 bg-white dark:bg-zinc-900"
        [class.hidden]="isScrolledRight || !showScrollButtons"
        (click)="scrollRight()"
      >
        <mat-icon>chevron_right</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .scroll-button {
      position: absolute;
      &.hidden {
        display: none;
      }
    }

    :host {
      display: block;
      position: relative;
    }
  `]
})
export class ChipsNavComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainerRef?: ElementRef;
  @Output() chipSelected = new EventEmitter<Chip>();

  activeChipClass = 'px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black';
  inactiveChipClass = 'px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700';

  chips: Chip[] = [
    { label: 'All', isActive: true, category: 'all' },
    { label: 'Game shows', isActive: false, category: 'game-shows' },
    { label: 'Interviews', isActive: false, category: 'interviews' },
    { label: 'Thrillers', isActive: false, category: 'thrillers' },
    { label: 'Live', isActive: false, category: 'live' },
    { label: 'Mixes', isActive: false, category: 'mixes' },
    { label: 'AI', isActive: false, category: 'ai' },
    { label: 'StarCraft: Remastered', isActive: false, category: 'starcraft' },
    { label: 'Kitchens', isActive: false, category: 'kitchens' },
    { label: 'Computers', isActive: false, category: 'computers' },
    { label: 'Television series', isActive: false, category: 'tv-series' }
  ];

  isScrolledLeft = true;
  isScrolledRight = false;
  showScrollButtons = false;

  ngAfterViewInit() {
    this.updateScrollButtonsVisibility();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateScrollButtonsVisibility();
  }

  private updateScrollButtonsVisibility() {
    if (!this.scrollContainerRef) return;

    const container = this.scrollContainerRef.nativeElement;
    this.showScrollButtons = container.scrollWidth > container.clientWidth;
    this.checkScroll();
  }

  private checkScroll() {
    if (!this.scrollContainerRef?.nativeElement) return;
    
    const container = this.scrollContainerRef.nativeElement;
    this.isScrolledLeft = container.scrollLeft <= 0;
    this.isScrolledRight = 
      container.scrollLeft + container.clientWidth >= 
      container.scrollWidth;
  }

  selectChip(selectedChip: Chip) {
    if (selectedChip.isActive && selectedChip.category !== 'all') {
      const allChip = this.chips.find(chip => chip.category === 'all');
      if (allChip) {
        this.chips.forEach(chip => chip.isActive = chip === allChip);
        this.chipSelected.emit(allChip);
      }
      return;
    }
    this.chips.forEach(chip => chip.isActive = chip === selectedChip);
    this.chipSelected.emit(selectedChip);
  }

  scrollLeft() {
    if (this.scrollContainerRef?.nativeElement) {
      this.scrollContainerRef.nativeElement.scrollLeft -= 200;
    }
  }

  scrollRight() {
    if (this.scrollContainerRef?.nativeElement) {
      this.scrollContainerRef.nativeElement.scrollLeft += 200;
    }
  }

  onScroll() {
    this.checkScroll();
  }
} 