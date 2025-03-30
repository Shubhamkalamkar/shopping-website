import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { CheckoutInfo, Product } from '../../models/product-page.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    RouterModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutInfo: CheckoutInfo | null = null;
  
  constructor(private checkoutService: CheckoutService) {}
  
  ngOnInit(): void {
    this.checkoutInfo = this.checkoutService.getCheckoutInfo();
    
    // Redirect if no products in checkout
    if (!this.checkoutInfo || this.checkoutInfo.products.length === 0) {
      // Handle empty checkout (redirect to home or show message)
    }
  }
  
  getSubtotal(): number {
    if (!this.checkoutInfo) return 0;
    return this.checkoutInfo.products.reduce((sum, product) => 
      sum + (product.price * (product.quantity || 1)), 0);
  }
  
  getShippingCost(): number {
    const subtotal = this.getSubtotal();
    // Free shipping for orders over ₹1000
    return subtotal > 1000 ? 0 : 100;
  }
  
  getTotalAmount(): number {
    return this.getSubtotal() + this.getShippingCost();
  }
  
  placeOrder(): void {
    // Handle order placement logic
    console.log('Order placed!', this.checkoutInfo);
    // Clear checkout and redirect to order confirmation
    this.checkoutService.clearCheckout();
  }
}
