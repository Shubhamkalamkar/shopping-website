import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sale-container">
      <h1 class="page-title">Sale</h1>
      <div class="sale-banner">
        <h2>Special Offers</h2>
        <p>Up to 50% off on selected items</p>
      </div>
      <!-- Product grid will be added here -->
    </div>
  `,
  styles: [`
    .sale-container {
      padding: 2rem;
    }
    .page-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    }
    .sale-banner {
      background: linear-gradient(45deg, #ff4444, #ff6b6b);
      color: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 2rem;
    }
    .sale-banner h2 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    .sale-banner p {
      font-size: 1.2rem;
      margin: 0;
    }
  `]
})
export class SaleComponent {}
