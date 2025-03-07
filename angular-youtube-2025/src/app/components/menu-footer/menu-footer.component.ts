import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="menu-footer">
      <div class="footer-links">
        <a href="#">About</a>
        <a href="#">Press</a>
        <a href="#">Copyright</a>
        <a href="#">Contact us</a>
        <a href="#">Creators</a>
        <a href="#">Advertise</a>
        <a href="#">Developers</a>
      </div>
      
      <div class="footer-links">
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Policy & Safety</a>
        <a href="#">How YouTube works</a>
        <a href="#">Test new features</a>
      </div>

      <div class="copyright">
        © 2025 Google LLC
      </div>
    </footer>
  `,
  styles: [`
    .menu-footer {
      padding: 16px 24px;
      border-top: 1px solid #e5e5e5;
      @apply dark:border-zinc-700;
      font-size: 13px;
    }

    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;

      a {
        color: #606060;
        text-decoration: none;
        @apply dark:text-zinc-400;

        &:hover {
          color: #0F0F0F;
          @apply dark:text-white;
        }
      }
    }

    .copyright {
      color: #909090;
      @apply dark:text-zinc-500;
      font-size: 12px;
    }
  `]
})
export class MenuFooterComponent {} 