import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, ProductFilter } from '../../models/product-page.model';
import { Observable, Subject, takeUntil, catchError } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSliderModule,
    MatRadioModule,
    MatChipsModule
  ],
  providers: [MatSnackBar]
})
export class ProductPageComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = '';
  @Input() category: string = '';

  products$: Observable<Product[]>;
  private destroy$ = new Subject<void>();
  isFilterSidebarOpen: boolean = false;
  currentFilter: ProductFilter = {};

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {
    this.products$ = this.productService.getProducts().pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        this.showErrorMessage('Error loading products');
        throw error;
      })
    );
  }

  ngOnInit() {
    // Initialize with category filter
    if (this.category) {
      this.productService.applyFilter({ categories: [this.category] });
    }
  }

  toggleFilterSidebar() {
    this.isFilterSidebarOpen = !this.isFilterSidebarOpen;
  }

  applyFilters(filter: ProductFilter) {
    try {
      this.currentFilter = { ...this.currentFilter, ...filter };
      this.productService.applyFilter(this.currentFilter);
    } catch (error) {
      this.showErrorMessage('Error applying filters');
    }
  }

  clearFilters() {
    this.currentFilter = {};
    this.productService.clearFilters();
    if (this.category) {
      this.productService.applyFilter({ categories: [this.category] });
    }
  }

  addToWishlist(product: Product) {
    try {
      this.wishlistService.addToWishlist(product);
      this.showSuccessMessage('Added to wishlist');
    } catch (error) {
      this.showErrorMessage('Error adding to wishlist');
    }
  }

  addToCart(product: Product) {
    try {
      this.cartService.addToCart(product);
      this.showSuccessMessage('Added to cart');
    } catch (error) {
      this.showErrorMessage('Error adding to cart');
    }
  }

  isInWishlist(product: Product): boolean {
    return this.wishlistService.isInWishlist(product.id);
  }

  isInCart(product: Product): boolean {
    return this.cartService.isInCart(product.id);
  }

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}