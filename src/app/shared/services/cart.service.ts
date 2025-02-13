import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  
  cartItems$ = this.cartItems.asObservable();
  isCartOpen$ = this.isCartOpenSubject.asObservable();
  
  cartTotal$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + (item.price * item.quantity), 0))
  );

  cartCount$ = this.cartItems$.pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0))
  );

  constructor(private toastService: ToastService) {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }

  getCartItem(id: number): CartItem | undefined {
    return this.cartItems.value.find(item => item.id == id);
  }

  addToCart(product: Product, quantity: number = 1, size?: string, color?: string): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => 
      item.id == product.id && 
      item.selectedSize === size && 
      item.selectedColor === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.next([...currentItems]);
    } else {
      const newItem: CartItem = {
        ...product,
        quantity,
        selectedSize: size,
        selectedColor: color
      };
      this.cartItems.next([...currentItems, newItem]);
    }
    this.saveCart();
    this.openCart();
    this.toastService.show('Added to cart', 'success');
  }

  updateQuantity(id: number, quantity: number): void {
    const items = this.cartItems.value;
    const updatedItems = items.map(item => 
      item.id == id ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => 
      !(item.id == id && item.quantity === 0)
    );
    
    this.cartItems.next(updatedItems);
    this.saveCart();
  }

  removeFromCart(id: number): void {
    const items = this.cartItems.value;
    const newItems = items.filter(item => item.id != id);
    this.cartItems.next(newItems);
    this.saveCart();
    this.toastService.show('Removed from cart', 'success');
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveCart();
    this.toastService.show('Cart cleared', 'success');
  }

  openCart(): void {
    this.isCartOpenSubject.next(true);
  }

  closeCart(): void {
    this.isCartOpenSubject.next(false);
  }
}
