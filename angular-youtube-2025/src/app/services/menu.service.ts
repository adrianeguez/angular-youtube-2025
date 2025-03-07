import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private isOpenSignal = signal(false);

  get isOpen() {
    return this.isOpenSignal();
  }

  set isOpen(value: boolean) {
    this.isOpenSignal.set(value);
  }

  toggleMenu() {
    this.isOpenSignal.update(value => !value);
  }
} 