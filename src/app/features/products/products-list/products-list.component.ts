import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-list',
  template: `
    <div class="products-container">
      <div class="filters-section">
        <!-- Add filters here -->
      </div>
      <div class="products-grid">
        <div class="product-card" *ngFor="let i of [1,2,3,4,5,6]">
          <div class="product-image">
            <img src="https://via.placeholder.com/300" alt="Product">
          </div>
          <div class="product-info">
            <h3>Product Title</h3>
            <p class="price">$99.99</p>
            <div class="actions">
              <button class="add-to-cart">Add to Cart</button>
              <button class="add-to-wishlist">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .product-card {
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .product-image {
      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-info {
      padding: 1rem;
    }

    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    .price {
      font-size: 1.2rem;
      color: #2ecc71;
      margin: 0.5rem 0;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .add-to-cart {
      flex: 1;
      background-color: #3498db;
      color: white;
    }

    .add-to-cart:hover {
      background-color: #2980b9;
    }

    .add-to-wishlist {
      background-color: #f8f9fa;
      color: #e74c3c;
    }

    .add-to-wishlist:hover {
      background-color: #e74c3c;
      color: white;
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProductsListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Load products
  }
}
