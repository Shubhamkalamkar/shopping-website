import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wishlist-container">
      <h1 class="page-title">My Wishlist</h1>
      <div class="wishlist-grid">
        <div class="product-card">
          <div class="product-image">
            <img src="https://via.placeholder.com/300x400" alt="Product">
            <button class="remove-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="product-info">
            <h3>Classic White T-Shirt</h3>
            <p class="price">$29.99</p>
            <button class="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>

        <div class="product-card">
          <div class="product-image">
            <img src="https://via.placeholder.com/300x400" alt="Product">
            <button class="remove-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="product-info">
            <h3>Denim Jeans</h3>
            <p class="price">$79.99</p>
            <button class="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wishlist-container {
      padding: 2rem;
    }
    .page-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    }
    .wishlist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .product-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .product-image {
      position: relative;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
      .remove-btn {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: white;
          color: #ff4444;
        }
      }
    }
    .product-info {
      padding: 1rem;
      h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .price {
        color: #333;
        font-weight: 600;
        margin: 0 0 1rem;
      }
    }
    .add-to-cart-btn {
      width: 100%;
      background: #3498db;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background: #2980b9;
      }
    }
  `]
})
export class WishlistComponent {}
