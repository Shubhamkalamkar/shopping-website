import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

export interface FilterOptions {
  priceRange: { min: number; max: number };
  ratings: number[];
  brands: string[];
  colors: string[];
  sizes: string[];
  onSale: boolean;
  inStock: boolean;
}

const DEFAULT_FILTERS: FilterOptions = {
  priceRange: { min: 0, max: 1000 },
  ratings: [],
  brands: [],
  colors: [],
  sizes: [],
  onSale: false,
  inStock: false
};

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private filtersSubject = new BehaviorSubject<FilterOptions>(DEFAULT_FILTERS);
  private searchQuerySubject = new BehaviorSubject<string>('');

  constructor() {}

  setProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query.toLowerCase().trim());
  }

  updateFilters(filters: Partial<FilterOptions>): void {
    this.filtersSubject.next({
      ...this.filtersSubject.value,
      ...filters
    });
  }

  resetFilters(): void {
    this.filtersSubject.next(DEFAULT_FILTERS);
    this.searchQuerySubject.next('');
  }

  getActiveFilters(): Observable<FilterOptions> {
    return this.filtersSubject.asObservable();
  }

  getFilteredProducts(): Observable<Product[]> {
    return combineLatest([
      this.productsSubject,
      this.filtersSubject,
      this.searchQuerySubject
    ]).pipe(
      map(([products, filters, searchQuery]) => {
        return products.filter(product => {
          // Search Query
          if (searchQuery) {
            const searchableText = [
              product.name,
              product.description,
              product.brand,
              product.category
            ].join(' ').toLowerCase();
            
            if (!searchableText.includes(searchQuery)) {
              return false;
            }
          }

          // Price Range
          if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
            return false;
          }

          // Ratings
          if (filters.ratings.length > 0 && !filters.ratings.includes(Math.floor(product.rating))) {
            return false;
          }

          // Brands
          if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
            return false;
          }

          // Colors
          if (filters.colors.length > 0 && !filters.colors.includes(product.color)) {
            return false;
          }

          // Sizes
          if (filters.sizes.length > 0 && !filters.sizes.includes(product.size)) {
            return false;
          }

          // Sale Items
          if (filters.onSale && !product.onSale) {
            return false;
          }

          // In Stock
          if (filters.inStock && !product.inStock) {
            return false;
          }

          return true;
        });
      })
    );
  }

  getAvailableFilters(): Observable<{
    brands: string[];
    colors: string[];
    sizes: string[];
    priceRange: { min: number; max: number };
  }> {
    return this.productsSubject.pipe(
      map(products => ({
        brands: [...new Set(products.map(p => p.brand))].sort(),
        colors: [...new Set(products.map(p => p.color))].sort(),
        sizes: [...new Set(products.map(p => p.size))].sort(),
        priceRange: {
          min: Math.min(...products.map(p => p.price)),
          max: Math.max(...products.map(p => p.price))
        }
      }))
    );
  }
}
