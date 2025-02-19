import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from './models/cart-item.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CartSidebarComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  isOpen$: Observable<boolean>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartTotal$ = this.cartService.cartTotal$;
    this.isOpen$ = this.cartService.isCartOpen$;
  }

  ngOnInit(): void {}

  closeCart(): void {
    this.cartService.closeCart();
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.id, newQuantity);
    } else {
      this.removeFromCart(item.id);
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
