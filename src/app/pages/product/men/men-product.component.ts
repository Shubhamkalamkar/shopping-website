import { Component } from '@angular/core';
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

@Component({
  selector: 'app-men-product',
  templateUrl: '../product-page.component.html',
  styleUrls: ['../product-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatSliderModule
  ]
})
export class MenProductComponent extends ProductPageComponent {
  constructor(
    productService: ProductService,
    wishlistService: WishlistService,
    cartService: CartService,
    snackBar: MatSnackBar
  ) {
    super(productService, wishlistService, cartService, snackBar);
    this.pageTitle = 'Men\'s Collection';
    this.category = 'men';
  }
}