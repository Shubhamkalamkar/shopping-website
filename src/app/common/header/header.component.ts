import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../shared/models/user.model';
import { CartItem } from '../../shared/models/cart-item.model';
import { Product } from '../../shared/models/product.model';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ClickOutsideDirective]
})
export class HeaderComponent implements OnInit {
  cartItemCount = 0;
  wishlistItemCount = 0;
  isUserMenuOpen = false;
  searchQuery = '';

  private readonly _cartService: CartService;
  private readonly _wishlistService: WishlistService;
  private readonly _authService: AuthService;

  cartItems$;
  cartTotal$;
  wishlistItems$;
  currentUser$;

  constructor(
    cartService: CartService,
    wishlistService: WishlistService,
    authService: AuthService
  ) {
    this._cartService = cartService;
    this._wishlistService = wishlistService;
    this._authService = authService;

    this.cartItems$ = this._cartService.cartItems$;
    this.cartTotal$ = this._cartService.cartTotal$;
    this.wishlistItems$ = this._wishlistService.wishlistItems$;
    this.currentUser$ = this._authService.currentUser$;
  }

  ngOnInit(): void {
    this.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });

    this.wishlistItems$.subscribe(items => {
      this.wishlistItemCount = items.length;
    });
  }

  openCart(): void {
    this._cartService.openCart();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    // Implement search functionality
  }

  logout(): void {
    this._authService.logout();
    this.closeUserMenu();
  }

  // Click outside directive handler
  onClickOutside(): void {
    if (this.isUserMenuOpen) {
      this.closeUserMenu();
    }
  }
}
