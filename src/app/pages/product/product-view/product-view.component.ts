import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { Product } from '../../../models/product-page.model';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { WishlistService } from '../../../services/wishlist.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule,
    MatTabsModule
  ],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Product | null = null;
  selectedSize: string = '';
  selectedQuantity: number = 1;
  selectedImageIndex: number = 0;
  relatedProducts: Product[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProduct(productId);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  loadProduct(productId: string): void {
    // Use getProducts and filter for the specific product
    this.productService.getProducts().pipe(
      map(products => products.find(p => p.id === productId))
    ).subscribe((product: Product | undefined) => {
      if (product) {
        this.product = product;
        this.loadRelatedProducts(product.category);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  loadRelatedProducts(category: string): void {
    // Use getProducts and filter for related products
    this.productService.getProducts().pipe(
      map(products => products.filter(p => p.category === category && p.id !== this.product?.id).slice(0, 4))
    ).subscribe((products: Product[]) => {
      this.relatedProducts = products;
    });
  }

  changeImage(index: number): void {
    this.selectedImageIndex = index;
  }

  addToCart(): void {
    if (this.product && this.selectedSize) {
      const productToAdd = { ...this.product };
      productToAdd.selectedSize = this.selectedSize;
      productToAdd.quantity = this.selectedQuantity;
      
      this.cartService.addToCart(productToAdd);
      this.snackBar.open('Product added to cart', 'Close', { duration: 3000 });
    } else if (!this.selectedSize && this.product) {
      this.snackBar.open('Please select a size', 'Close', { duration: 3000 });
    }
  }

  buyNow(): void {
    if (this.product && this.selectedSize) {
      const productToAdd = { ...this.product };
      productToAdd.selectedSize = this.selectedSize;
      productToAdd.quantity = this.selectedQuantity;
      
      this.cartService.addToCart(productToAdd);
      this.router.navigate(['/checkout']);
    } else if (!this.selectedSize && this.product) {
      this.snackBar.open('Please select a size', 'Close', { duration: 3000 });
    }
  }

  toggleWishlist(): void {
    if (this.product) {
      if (this.isInWishlist()) {
        this.wishlistService.removeFromWishlist(this.product.id);
        this.snackBar.open('Removed from wishlist', 'Close', { duration: 3000 });
      } else {
        this.wishlistService.addToWishlist(this.product);
        this.snackBar.open('Added to wishlist', 'Close', { duration: 3000 });
      }
    }
  }

  isInWishlist(): boolean {
    return this.product ? this.wishlistService.isInWishlist(this.product.id) : false;
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }
}
