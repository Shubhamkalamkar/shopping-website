import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../../../shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  selectedFilter: 'all' | 'active' | 'completed' | 'returned' = 'all';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders.sort((a, b) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
    });
  }

  filterOrders(filter: 'all' | 'active' | 'completed' | 'returned'): void {
    this.selectedFilter = filter;
  }

  get filteredOrders(): Order[] {
    switch (this.selectedFilter) {
      case 'active':
        return this.orders.filter(order => 
          ['pending', 'processing', 'shipped'].includes(order.status)
        );
      case 'completed':
        return this.orders.filter(order => 
          order.status === 'delivered'
        );
      case 'returned':
        return this.orders.filter(order => 
          order.status === 'returned' || order.returnRequest !== undefined
        );
      default:
        return this.orders;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      case 'returned':
        return 'status-returned';
      default:
        return '';
    }
  }

  canRequestReturn(order: Order): boolean {
    return (
      order.status === 'delivered' &&
      !order.returnRequest &&
      new Date().getTime() - new Date(order.deliveredDate!).getTime() <= 30 * 24 * 60 * 60 * 1000 // 30 days
    );
  }

  getDeliveryStatus(order: Order): string {
    switch (order.status) {
      case 'pending':
        return 'Order confirmed';
      case 'processing':
        return 'Preparing for shipment';
      case 'shipped':
        return `In transit - ${order.trackingNumber}`;
      case 'delivered':
        return `Delivered on ${new Date(order.deliveredDate!).toLocaleDateString()}`;
      case 'cancelled':
        return 'Order cancelled';
      case 'returned':
        return 'Order returned';
      default:
        return '';
    }
  }

  reorder(order: Order): void {
    // Implement reorder functionality
  }
}
