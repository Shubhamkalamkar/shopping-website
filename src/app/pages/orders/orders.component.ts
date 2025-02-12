import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="orders-container">
      <h1 class="page-title">My Orders</h1>
      <div class="orders-list">
        <div class="order-card">
          <div class="order-header">
            <h3>Order #12345</h3>
            <span class="order-status delivered">Delivered</span>
          </div>
          <div class="order-details">
            <p><strong>Date:</strong> Feb 10, 2024</p>
            <p><strong>Total:</strong> $199.99</p>
            <p><strong>Items:</strong> 3</p>
          </div>
          <button class="view-details-btn">View Details</button>
        </div>

        <div class="order-card">
          <div class="order-header">
            <h3>Order #12344</h3>
            <span class="order-status processing">Processing</span>
          </div>
          <div class="order-details">
            <p><strong>Date:</strong> Feb 8, 2024</p>
            <p><strong>Total:</strong> $149.99</p>
            <p><strong>Items:</strong> 2</p>
          </div>
          <button class="view-details-btn">View Details</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    .page-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    }
    .orders-list {
      display: grid;
      gap: 1.5rem;
    }
    .order-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      h3 {
        margin: 0;
        font-size: 1.2rem;
      }
    }
    .order-status {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
      &.delivered {
        background: #d4edda;
        color: #155724;
      }
      &.processing {
        background: #fff3cd;
        color: #856404;
      }
    }
    .order-details {
      border-top: 1px solid #eee;
      padding-top: 1rem;
      margin-bottom: 1rem;
      p {
        margin: 0.5rem 0;
        color: #666;
      }
    }
    .view-details-btn {
      background: #3498db;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      &:hover {
        background: #2980b9;
      }
    }
  `]
})
export class OrdersComponent {}
