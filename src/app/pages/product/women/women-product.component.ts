import { Component } from '@angular/core';
import { WOMEN_PRODUCTS as womenProducts } from '../../../data/women-products';
import { ProductPageComponent } from '../product-page.component';
import { ProductService } from '../../../services/product.service';
import { WishlistService } from '../../../services/wishlist.service';
import { CartService } from '../../../services/cart.service';
import { CheckoutService } from '../../../services/checkout.service';
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
  selector: 'app-women-product',
  templateUrl: './women-product.component.html',
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
export class WomenProductComponent extends ProductPageComponent {
  constructor(
    productService: ProductService,
    wishlistService: WishlistService,
    cartService: CartService,
    checkoutService: CheckoutService,
    snackBar: MatSnackBar,
    router: Router
  ) {
    super(productService, wishlistService, cartService, checkoutService, snackBar, router);
    this.pageTitle = 'Women\'s Collection';
    this.category = 'women';
    productService.setProducts(womenProducts);
  }
}