import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  template: `
    <div class="checkout-container">
      <h2>Checkout</h2>
      <div class="checkout-steps">
        <!-- Checkout steps will be added here -->
        <p>Checkout process coming soon!</p>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    h2 {
      margin-bottom: 2rem;
    }
    .checkout-steps {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CheckoutComponent {}
