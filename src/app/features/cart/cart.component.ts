import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <div class="cart-container">
      <h2>Your Cart</h2>
      <div class="cart-items" *ngIf="(cartItems$ | async)?.length; else emptyCart">
        <!-- Cart items will be displayed here -->
        <p>Cart items coming soon!</p>
      </div>
      <ng-template #emptyCart>
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <button routerLink="/products">Continue Shopping</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    h2 {
      margin-bottom: 2rem;
    }
    .empty-cart {
      text-align: center;
      padding: 3rem;
    }
    button {
      padding: 0.8rem 2rem;
      font-size: 1.1rem;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #2980b9;
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CartComponent {
  private readonly _cartService: CartService;
  cartItems$;

  constructor(cartService: CartService) {
    this._cartService = cartService;
    this.cartItems$ = this._cartService.cartItems$;
  }
}
