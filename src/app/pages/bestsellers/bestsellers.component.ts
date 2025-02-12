import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bestsellers-container">
      <h1 class="page-title">Bestsellers</h1>
      <!-- Product grid will be added here -->
    </div>
  `,
  styles: [`
    .bestsellers-container {
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
export class BestsellersComponent {}
