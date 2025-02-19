import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;
  cartItemCount: number = 0;
  wishlistItemCount: number = 0;
  isUserMenuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });

    this.wishlistService.wishlistItems$.subscribe(items => {
      this.wishlistItemCount = items.length;
    });
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onClickOutside(): void {
    this.isUserMenuOpen = false;
  }

  openCart(): void {
    // Implement cart opening logic
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen = false;
  }
}
