import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductFilter, ProductState } from '../models/product-page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private initialState: ProductState = {
    products: [],
    filteredProducts: [],
    currentFilter: {},
    loading: false,
    error: null
  };

  private state = new BehaviorSubject<ProductState>(this.initialState);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return new Observable<Product[]>((observer) => {
      observer.next(this.state.value.filteredProducts);
    });
  }

  setProducts(products: Product[]) {
    this.state.next({
      ...this.state.value,
      products,
      filteredProducts: this.applyFilters(products, this.state.value.currentFilter)
    });
  }

  applyFilter(filter: ProductFilter) {
    const currentState = this.state.value;
    const newFilter = { ...currentState.currentFilter, ...filter };
    
    this.state.next({
      ...currentState,
      currentFilter: newFilter,
      filteredProducts: this.applyFilters(currentState.products, newFilter)
    });
  }

  private applyFilters(products: Product[], filter: ProductFilter): Product[] {
    return products.filter(product => {
      if (filter.sizes && filter.sizes.length > 0) {
        if (!product.sizes || !filter.sizes.some(size => product.sizes?.includes(size))) {
          return false;
        }
      }

      if (filter.colors && filter.colors.length > 0) {
        if (!product.colors || !filter.colors.some(color => product.colors?.includes(color))) {
          return false;
        }
      }

      if (filter.minPrice !== undefined && product.price < filter.minPrice) {
        return false;
      }

      if (filter.maxPrice !== undefined && product.price > filter.maxPrice) {
        return false;
      }

      if (filter.categories && filter.categories.length > 0) {
        if (!filter.categories.includes(product.category)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (!filter.sortBy) return 0;

      switch (filter.sortBy) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popular':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  }

  clearFilters() {
    this.state.next({
      ...this.state.value,
      currentFilter: {},
      filteredProducts: this.state.value.products
    });
  }
}