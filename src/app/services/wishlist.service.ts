import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface Product {
  id: string;
  // Add other required product properties here
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItemsSubject = new BehaviorSubject<Product[]>([]);
  wishlistItems$ = this.wishlistItemsSubject.asObservable();

  constructor() {
    // Load wishlist items from localStorage on initialization
    const savedWishlist = localStorage.getItem('wishlistItems');
    if (savedWishlist) {
      this.wishlistItemsSubject.next(JSON.parse(savedWishlist));
    }
  }

  addToWishlist(product: Product): void {
    const currentItems = this.wishlistItemsSubject.value;
    if (!currentItems.some(item => item.id === product.id)) {
      const updatedItems = [...currentItems, product];
      this.wishlistItemsSubject.next(updatedItems);
      localStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
    }
  }

  removeFromWishlist(productId: string): void {
    const currentItems = this.wishlistItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.wishlistItemsSubject.next(updatedItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItemsSubject.value.some(item => item.id === productId);
  }

  clearWishlist(): void {
    this.wishlistItemsSubject.next([]);
    localStorage.removeItem('wishlistItems');
  }
}