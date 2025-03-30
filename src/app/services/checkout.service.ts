import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, CheckoutInfo, ShippingAddress } from '../models/product-page.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private checkoutInfoSubject = new BehaviorSubject<CheckoutInfo>({
    products: [],
    totalAmount: 0
  });
  
  public checkoutInfo$: Observable<CheckoutInfo> = this.checkoutInfoSubject.asObservable();

  constructor(private router: Router) {}

  initiateCheckout(product: Product): void {
    const checkoutInfo: CheckoutInfo = {
      products: [product],
      totalAmount: product.price * (product.quantity || 1)
    };
    
    this.checkoutInfoSubject.next(checkoutInfo);
    this.router.navigate(['/checkout']);
  }

  addShippingAddress(address: ShippingAddress): void {
    const currentInfo = this.checkoutInfoSubject.value;
    this.checkoutInfoSubject.next({
      ...currentInfo,
      shippingAddress: address
    });
  }

  setPaymentMethod(method: string): void {
    const currentInfo = this.checkoutInfoSubject.value;
    this.checkoutInfoSubject.next({
      ...currentInfo,
      paymentMethod: method
    });
  }

  getCheckoutInfo(): CheckoutInfo {
    return this.checkoutInfoSubject.value;
  }

  clearCheckout(): void {
    this.checkoutInfoSubject.next({
      products: [],
      totalAmount: 0
    });
  }
}
