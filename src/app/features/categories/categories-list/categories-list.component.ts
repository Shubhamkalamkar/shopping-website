import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  template: `
    <div class="categories-container">
      <h1>Shop by Category</h1>
      <div class="categories-grid">
        <div class="category-card" *ngFor="let i of [1,2,3,4,5,6]" routerLink="/categories/1">
          <div class="category-image">
            <img src="https://via.placeholder.com/300" alt="Category">
          </div>
          <div class="category-info">
            <h2>Category Name</h2>
            <p>XX Products</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .categories-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    .category-card {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .category-image {
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
    }

    .category-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .category-card:hover .category-image img {
      transform: scale(1.1);
    }

    .category-info {
      padding: 1rem;
      text-align: center;
      background: white;
    }

    h2 {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }

    p {
      margin: 0.5rem 0 0;
      color: #666;
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CategoriesListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Load categories
  }
}
