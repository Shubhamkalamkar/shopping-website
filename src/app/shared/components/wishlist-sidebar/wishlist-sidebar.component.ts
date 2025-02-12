import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist-sidebar.component.html',
  styleUrls: ['./wishlist-sidebar.component.scss']
})
export class WishlistSidebarComponent implements OnInit {
  wishlistItems$: Observable<Product[]>;
  isOpen = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService
  ) {
    this.wishlistItems$ = this.productService.getWishlistItems();
  }

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  closeSidebar(): void {
    this.isOpen = false;
  }

  removeFromWishlist(product: Product): void {
    this.productService.removeFromWishlist(product.id);
    this.toastService.info(`${product.name} removed from wishlist`);
  }

  moveToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.removeFromWishlist(product);
    this.toastService.success(`${product.name} moved to cart`);
  }

  clearWishlist(): void {
    const wishlistItems = this.productService.getWishlistItems();
    wishlistItems.subscribe(items => {
      items.forEach(item => this.productService.removeFromWishlist(item.id));
    });
    this.toastService.info('Wishlist cleared');
  }
}
