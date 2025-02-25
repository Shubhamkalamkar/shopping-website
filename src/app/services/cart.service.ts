import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface Product {
  id: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Set<string> = new Set();

  isInCart(productId: string): boolean {
    return this.cartItems.has(productId);
  }
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Load cart items from localStorage on initialization
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = [...currentItems, product];
    this.cartItemsSubject.next(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  }

  removeFromCart(productId: string): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cartItems');
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.price, 0);
  }
}