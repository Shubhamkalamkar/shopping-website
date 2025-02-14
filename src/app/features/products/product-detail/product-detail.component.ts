import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `
    <div class="product-detail-container">
      <div class="product-images">
        <div class="main-image">
          <img src="https://via.placeholder.com/600" alt="Product">
        </div>
        <div class="thumbnail-images">
          <img *ngFor="let i of [1,2,3,4]" src="https://via.placeholder.com/150" alt="Thumbnail">
        </div>
      </div>
      <div class="product-info">
        <h1>Product Title</h1>
        <div class="price">$99.99</div>
        <div class="description">
          <h2>Description</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="options">
          <div class="size-options">
            <h3>Select Size</h3>
            <div class="size-buttons">
              <button *ngFor="let size of ['S', 'M', 'L', 'XL']">{{size}}</button>
            </div>
          </div>
          <div class="quantity">
            <h3>Quantity</h3>
            <div class="quantity-selector">
              <button (click)="decreaseQuantity()">-</button>
              <span>{{quantity}}</span>
              <button (click)="increaseQuantity()">+</button>
            </div>
          </div>
        </div>
        <div class="actions">
          <button class="add-to-cart">Add to Cart</button>
          <button class="add-to-wishlist">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-detail-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .product-images {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .main-image {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-images {
      display: flex;
      gap: 1rem;
    }

    .thumbnail-images img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
      cursor: pointer;
      transition: opacity 0.3s;
    }

    .thumbnail-images img:hover {
      opacity: 0.8;
    }

    .product-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    h1 {
      font-size: 2rem;
      margin: 0;
    }

    .price {
      font-size: 1.5rem;
      color: #2ecc71;
    }

    .description h2 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .size-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .size-buttons button {
      width: 40px;
      height: 40px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .size-buttons button:hover {
      border-color: #3498db;
      color: #3498db;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .quantity-selector button {
      width: 30px;
      height: 30px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .add-to-cart {
      flex: 1;
      padding: 1rem;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .add-to-cart:hover {
      background-color: #2980b9;
    }

    .add-to-wishlist {
      padding: 1rem;
      background-color: #f8f9fa;
      color: #e74c3c;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .add-to-wishlist:hover {
      background-color: #e74c3c;
      color: white;
    }

    @media (max-width: 768px) {
      .product-detail-container {
        grid-template-columns: 1fr;
      }
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProductDetailComponent implements OnInit {
  quantity = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Load product details based on route param
    this.route.params.subscribe(params => {
      const productId = params['id'];
      // Load product details
    });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
