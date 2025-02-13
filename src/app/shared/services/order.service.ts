import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  image: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type ReturnStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'completed';

export interface ReturnRequest {
  id: string;
  orderId: string;
  items: {
    orderItemId: string;
    quantity: number;
    reason: string;
  }[];
  status: ReturnStatus;
  requestDate: Date;
  approvalDate?: Date;
  refundAmount?: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: {
    type: string;
    lastFourDigits: string;
  };
  orderDate: Date;
  estimatedDeliveryDate?: Date;
  deliveredDate?: Date;
  trackingNumber?: string;
  returnRequest?: ReturnRequest;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = new BehaviorSubject<Order[]>([]);
  private returns = new BehaviorSubject<ReturnRequest[]>([]);

  constructor() {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders.next(JSON.parse(savedOrders));
    }

    const savedReturns = localStorage.getItem('returns');
    if (savedReturns) {
      this.returns.next(JSON.parse(savedReturns));
    }
  }

  getOrders(): Observable<Order[]> {
    return this.orders.asObservable();
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    return this.orders.pipe(
      map(orders => orders.find(order => order.id === orderId))
    );
  }

  getReturns(): Observable<ReturnRequest[]> {
    return this.returns.asObservable();
  }

  getReturnById(returnId: string): Observable<ReturnRequest | undefined> {
    return this.returns.pipe(
      map(returns => returns.find(ret => ret.id === returnId))
    );
  }

  createOrder(order: Omit<Order, 'id'>): string {
    const id = this.generateId();
    const newOrder = { ...order, id };
    const currentOrders = this.orders.value;
    this.orders.next([...currentOrders, newOrder]);
    this.saveToLocalStorage();
    return id;
  }

  updateOrderStatus(orderId: string, status: OrderStatus): void {
    const currentOrders = this.orders.value;
    const orderIndex = currentOrders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
      currentOrders[orderIndex] = {
        ...currentOrders[orderIndex],
        status
      };
      this.orders.next([...currentOrders]);
      this.saveToLocalStorage();
    }
  }

  createReturnRequest(request: Omit<ReturnRequest, 'id' | 'status' | 'requestDate'>): string {
    const id = this.generateId();
    const newRequest: ReturnRequest = {
      ...request,
      id,
      status: 'pending',
      requestDate: new Date()
    };
    const currentReturns = this.returns.value;
    this.returns.next([...currentReturns, newRequest]);
    
    // Update order status
    const currentOrders = this.orders.value;
    const orderIndex = currentOrders.findIndex(order => order.id === request.orderId);
    if (orderIndex !== -1) {
      currentOrders[orderIndex] = {
        ...currentOrders[orderIndex],
        returnRequest: newRequest
      };
      this.orders.next([...currentOrders]);
    }
    
    this.saveToLocalStorage();
    return id;
  }

  updateReturnStatus(returnId: string, status: ReturnStatus, refundAmount?: number): void {
    const currentReturns = this.returns.value;
    const returnIndex = currentReturns.findIndex(ret => ret.id === returnId);
    if (returnIndex !== -1) {
      currentReturns[returnIndex] = {
        ...currentReturns[returnIndex],
        status,
        approvalDate: new Date(),
        refundAmount
      };
      this.returns.next([...currentReturns]);
      
      // Update order status if return is completed
      if (status === 'completed') {
        const orderId = currentReturns[returnIndex].orderId;
        this.updateOrderStatus(orderId, 'returned');
      }
      
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders.value));
    localStorage.setItem('returns', JSON.stringify(this.returns.value));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
