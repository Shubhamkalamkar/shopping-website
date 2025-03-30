import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, ProductFilter } from '../../models/product-page.model';
import { Observable, Subject, takeUntil, catchError, of } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from './filter/product-filter.component';

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
    ProductFilterComponent
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
    protected productService: ProductService,
    protected wishlistService: WishlistService,
    protected cartService: CartService,
    protected checkoutService: CheckoutService,
    protected snackBar: MatSnackBar,
    protected router: Router
  ) {
    this.products$ = this.productService.getProducts().pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        this.showErrorMessage('Error loading products');
        return of([]);
      })
    );
  }

  ngOnInit() {
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

  toggleWishlist(product: Product) {
    try {
      if (this.isInWishlist(product.id)) {
        this.wishlistService.removeFromWishlist(product.id);
        this.showSuccessMessage('Removed from wishlist');
      } else {
        this.wishlistService.addToWishlist(product);
        this.showSuccessMessage('Added to wishlist');
      }
    } catch (error) {
      this.showErrorMessage('Error updating wishlist');
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

  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  isInCart(productId: string): boolean {
    return this.cartService.isInCart(productId);
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

  viewProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  buyNow(product: Product) {
    try {
      this.checkoutService.initiateCheckout(product);
    } catch (error) {
      this.showErrorMessage('Error processing checkout');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}