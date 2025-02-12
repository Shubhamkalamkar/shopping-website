import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="new-arrivals-container">
      <h1 class="page-title">New Arrivals</h1>
      <!-- Product grid will be added here -->
    </div>
  `,
  styles: [`
    .new-arrivals-container {
      padding: 2rem;
    }
    .page-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    }
  `]
})
export class NewArrivalsComponent {}
