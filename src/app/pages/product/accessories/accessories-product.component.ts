import { Component } from '@angular/core';
import { ACCESSORIES_PRODUCTS as accessoriesProducts } from '../../../data/accessories-products';
import { ProductPageComponent } from '../product-page.component';
import { ProductService } from '../../../services/product.service';
import { WishlistService } from '../../../services/wishlist.service';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { ProductFilterComponent } from '../filter/product-filter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accessories-product',
  templateUrl: './accessories-product.component.html',
  styleUrls: ['../product-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatSliderModule,
    MatButtonModule,
    ProductFilterComponent
  ]
})
export class AccessoriesProductComponent extends ProductPageComponent {
  constructor(
    productService: ProductService,
    wishlistService: WishlistService,
    cartService: CartService,
    snackBar: MatSnackBar,
    router: Router
  ) {
    super(productService, wishlistService, cartService, snackBar, router);
    this.pageTitle = 'Accessories Collection';
    this.category = 'accessories';
    productService.setProducts(accessoriesProducts);
  }
}