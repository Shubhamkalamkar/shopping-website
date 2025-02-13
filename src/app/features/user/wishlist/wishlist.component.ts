import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../../shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  template: `
    <div class="wishlist-container">
      <h2>Your Wishlist</h2>
      <div class="wishlist-items" *ngIf="(wishlistItems$ | async)?.length; else emptyWishlist">
        <!-- Wishlist items will be displayed here -->
        <p>Wishlist items coming soon!</p>
      </div>
      <ng-template #emptyWishlist>
        <div class="empty-wishlist">
          <p>Your wishlist is empty</p>
          <button routerLink="/products">Continue Shopping</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .wishlist-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    h2 {
      margin-bottom: 2rem;
    }
    .empty-wishlist {
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
export class WishlistComponent {
  private readonly _wishlistService: WishlistService;
  wishlistItems$;

  constructor(wishlistService: WishlistService) {
    this._wishlistService = wishlistService;
    this.wishlistItems$ = this._wishlistService.wishlistItems$;
  }
}
