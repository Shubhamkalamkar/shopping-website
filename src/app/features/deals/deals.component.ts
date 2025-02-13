import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deals',
  template: `
    <div class="deals-container">
      <h2>Today's Hot Deals</h2>
      <div class="deals-grid">
        <!-- Deal items will be added here -->
        <p>Coming Soon!</p>
      </div>
    </div>
  `,
  styles: [`
    .deals-container {
      padding: 2rem;
    }
    h2 {
      margin-bottom: 2rem;
      text-align: center;
    }
    .deals-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class DealsComponent {}
