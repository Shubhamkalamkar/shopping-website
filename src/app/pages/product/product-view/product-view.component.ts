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
import { CheckoutService } from '../../../services/checkout.service';
import { map } from 'rxjs/operators';

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
  selectedColor: string = '';
  selectedQuantity: number = 1;
  selectedImageIndex: number = 0;
  relatedProducts: Product[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private checkoutService: CheckoutService,
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
        // Add additional fields for the new design if they don't exist
        this.product = {
          ...product,
          sku: product.sku || `AB-ML-${Math.floor(10000 + Math.random() * 90000)}`,
          originalPrice: product.originalPrice || (product.discount ? this.calculateOriginalPrice(product.price, product.discount) : undefined),
          discountPercentage: product.discountPercentage || product.discount,
          features: product.features || [
            'Premium quality materials',
            'Tailored silhouette for refined look',
            'Exceptional comfort and durability'
          ],
          material: product.material || 'Premium wool blend fabric',
          careInstructions: product.careInstructions || 'Dry clean only. Do not bleach. Iron at medium temperature.',
          shippingInfo: product.shippingInfo,
          returnPolicy: product.returnPolicy
        };
        
        // Set default color if colors are available
        if (this.product.colors && this.product.colors.length > 0) {
          this.selectedColor = this.product.colors[0];
        }
        
        this.loadRelatedProducts(product.category);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  calculateOriginalPrice(currentPrice: number, discountPercentage: number): number {
    return currentPrice / (1 - discountPercentage / 100);
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

  incrementQuantity(): void {
    this.selectedQuantity += 1;
  }

  decrementQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity -= 1;
    }
  }

  addToCart(): void {
    if (this.product && (this.selectedSize || !this.product.sizes || this.product.sizes.length === 0)) {
      const productToAdd = { ...this.product };
      
      if (this.product.sizes && this.product.sizes.length > 0) {
        productToAdd.selectedSize = this.selectedSize;
      }
      
      if (this.product.colors && this.product.colors.length > 0) {
        productToAdd.selectedColor = this.selectedColor;
      }
      
      productToAdd.quantity = this.selectedQuantity;
      
      this.cartService.addToCart(productToAdd);
      this.snackBar.open('Product added to cart', 'Close', { duration: 3000 });
    } else if (this.product && this.product.sizes && this.product.sizes.length > 0 && !this.selectedSize) {
      this.snackBar.open('Please select a size', 'Close', { duration: 3000 });
    }
  }

  buyNow(): void {
    if (this.product && (this.selectedSize || !this.product.sizes || this.product.sizes.length === 0)) {
      const productToAdd = { ...this.product };
      
      if (this.product.sizes && this.product.sizes.length > 0) {
        productToAdd.selectedSize = this.selectedSize;
      }
      
      if (this.product.colors && this.product.colors.length > 0) {
        productToAdd.selectedColor = this.selectedColor;
      }
      
      productToAdd.quantity = this.selectedQuantity;
      
      // Use the checkout service to initiate the checkout process
      this.checkoutService.initiateCheckout(productToAdd);
    } else if (this.product && this.product.sizes && this.product.sizes.length > 0 && !this.selectedSize) {
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
