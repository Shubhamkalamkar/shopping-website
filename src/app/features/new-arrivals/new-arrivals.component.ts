import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-arrivals',
  template: `
    <div class="new-arrivals-container">
      <h2>New Arrivals</h2>
      <div class="products-grid">
        <!-- Product items will be added here -->
        <p>Coming Soon!</p>
      </div>
    </div>
  `,
  styles: [`
    .new-arrivals-container {
      padding: 2rem;
    }
    h2 {
      margin-bottom: 2rem;
      text-align: center;
    }
    .products-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class NewArrivalsComponent {}
