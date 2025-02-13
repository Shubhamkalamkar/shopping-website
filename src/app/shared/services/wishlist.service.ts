import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems = new BehaviorSubject<Product[]>([]);
  wishlistItems$ = this.wishlistItems.asObservable();
  
  wishlistCount$ = this.wishlistItems$.pipe(
    map(items => items.length)
  );

  constructor(private toastService: ToastService) {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlistItems.next(JSON.parse(savedWishlist));
    }
  }

  private saveWishlist(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems.value));
  }

  addToWishlist(product: Product): void {
    if (!this.isInWishlist(product.id)) {
      const currentItems = this.wishlistItems.value;
      this.wishlistItems.next([...currentItems, product]);
      this.saveWishlist();
      this.toastService.show('Added to wishlist', 'success');
    }
  }

  removeFromWishlist(productId: number): void {
    const currentItems = this.wishlistItems.value;
    this.wishlistItems.next(currentItems.filter(item => item.id == productId));
    this.saveWishlist();
    this.toastService.show('Removed from wishlist', 'success');
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.value.some(item => item.id == productId);
  }

  clearWishlist(): void {
    this.wishlistItems.next([]);
    this.saveWishlist();
    this.toastService.show('Wishlist cleared', 'success');
  }
}
