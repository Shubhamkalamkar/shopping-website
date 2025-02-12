import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Classic Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt for everyday wear',
      price: 29.99,
      discountedPrice: 24.99,
      imageUrl: '/assets/images/products/tshirt-1.jpg',
      category: 'clothing',
      rating: 4.5,
      reviews: 128,
      brand: 'Essentials',
      color: 'White',
      size: 'M',
      inStock: true,
      onSale: true,
      tags: ['cotton', 'casual', 'basics'],
      specifications: {
        material: '100% Cotton',
        fit: 'Regular',
        care: 'Machine wash'
      },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 2,
      name: 'Premium Denim Jeans',
      description: 'High-quality denim jeans with perfect fit',
      price: 89.99,
      imageUrl: '/assets/images/products/jeans-1.jpg',
      category: 'clothing',
      rating: 4.8,
      reviews: 256,
      brand: 'DenimCo',
      color: 'Blue',
      size: '32',
      inStock: true,
      onSale: false,
      tags: ['denim', 'casual', 'premium'],
      specifications: {
        material: '98% Cotton, 2% Elastane',
        fit: 'Slim',
        care: 'Machine wash cold'
      },
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    // Add more sample products as needed
  ];

  private wishlistItems = new BehaviorSubject<Product[]>([]);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getWishlistItems(): Observable<Product[]> {
    return this.wishlistItems.asObservable();
  }

  addToWishlist(product: Product): void {
    const currentItems = this.wishlistItems.value;
    if (!this.isInWishlist(product.id)) {
      this.wishlistItems.next([...currentItems, product]);
    }
  }

  removeFromWishlist(productId: number): void {
    const currentItems = this.wishlistItems.value;
    this.wishlistItems.next(
      currentItems.filter(item => item.id !== productId)
    );
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.value.some(item => item.id === productId);
  }

  clearWishlist(): void {
    this.wishlistItems.next([]);
  }

  // Helper methods for filtering
  getAvailableBrands(): string[] {
    return [...new Set(this.products.map(p => p.brand))].sort();
  }

  getAvailableColors(): string[] {
    return [...new Set(this.products.map(p => p.color))].sort();
  }

  getAvailableSizes(): string[] {
    return [...new Set(this.products.map(p => p.size))].sort();
  }

  getAvailableTags(): string[] {
    return [...new Set(this.products.flatMap(p => p.tags))].sort();
  }

  getPriceRange(): { min: number; max: number } {
    const prices = this.products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }
}
