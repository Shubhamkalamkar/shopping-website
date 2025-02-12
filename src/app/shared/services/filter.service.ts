import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

export interface FilterOptions {
  priceRange: { min: number; max: number };
  ratings: number[];
  tags: string[];
  onSale: boolean;
  inStock: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private activeFilters = new BehaviorSubject<FilterOptions>({
    priceRange: { min: 0, max: 1000 },
    ratings: [],
    tags: [],
    onSale: false,
    inStock: true
  });

  private searchQuery = new BehaviorSubject<string>('');

  constructor() {}

  getActiveFilters(): Observable<FilterOptions> {
    return this.activeFilters.asObservable();
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuery.asObservable();
  }

  updateFilters(filters: Partial<FilterOptions>): void {
    this.activeFilters.next({
      ...this.activeFilters.value,
      ...filters
    });
  }

  updateSearch(query: string): void {
    this.searchQuery.next(query.toLowerCase());
  }

  resetFilters(): void {
    this.activeFilters.next({
      priceRange: { min: 0, max: 1000 },
      ratings: [],
      tags: [],
      onSale: false,
      inStock: true
    });
  }

  filterProducts(products: Product[]): Observable<Product[]> {
    return combineLatest([
      this.activeFilters,
      this.searchQuery
    ]).pipe(
      map(([filters, search]) => {
        return products.filter(product => {
          // Price Range Filter
          const price = product.discountedPrice || product.price;
          if (price < filters.priceRange.min || price > filters.priceRange.max) {
            return false;
          }

          // Ratings Filter
          if (filters.ratings.length > 0 && !filters.ratings.includes(product.rating)) {
            return false;
          }

          // Tags Filter
          if (filters.tags.length > 0 && !product.tags.some(tag => filters.tags.includes(tag))) {
            return false;
          }

          // Sale Filter
          if (filters.onSale && !product.isOnSale) {
            return false;
          }

          // Stock Filter
          if (filters.inStock && product.stock === 0) {
            return false;
          }

          // Search Query
          if (search) {
            const searchableText = [
              product.name,
              product.description,
              ...product.tags
            ].join(' ').toLowerCase();
            
            if (!searchableText.includes(search)) {
              return false;
            }
          }

          return true;
        });
      })
    );
  }
}
