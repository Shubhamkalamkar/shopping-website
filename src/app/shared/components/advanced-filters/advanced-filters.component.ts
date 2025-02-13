import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { slideInOut } from '../../animations/product-animations';

export interface FilterOptions {
  categories: Set<string>;
  brands: Set<string>;
  colors: Set<string>;
  sizes: Set<string>;
  priceRange: { min: number; max: number };
  rating: number;
}

@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [slideInOut]
})
export class AdvancedFiltersComponent {
  @Input() availableOptions: {
    categories: string[];
    brands: string[];
    colors: string[];
    sizes: string[];
    priceRange: { min: number; max: number };
  } = {
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: 1000 }
  };

  selectedFilters: FilterOptions = {
    categories: new Set<string>(),
    brands: new Set<string>(),
    colors: new Set<string>(),
    sizes: new Set<string>(),
    priceRange: { min: 0, max: 1000 },
    rating: 0
  };

  @Output() filterChange = new EventEmitter<FilterOptions>();

  isOpen = false;

  toggleFilter(): void {
    this.isOpen = !this.isOpen;
  }

  toggleCategory(category: string): void {
    if (this.selectedFilters.categories.has(category)) {
      this.selectedFilters.categories.delete(category);
    } else {
      this.selectedFilters.categories.add(category);
    }
  }

  toggleBrand(brand: string): void {
    if (this.selectedFilters.brands.has(brand)) {
      this.selectedFilters.brands.delete(brand);
    } else {
      this.selectedFilters.brands.add(brand);
    }
  }

  toggleColor(color: string): void {
    if (this.selectedFilters.colors.has(color)) {
      this.selectedFilters.colors.delete(color);
    } else {
      this.selectedFilters.colors.add(color);
    }
  }

  toggleSize(size: string): void {
    if (this.selectedFilters.sizes.has(size)) {
      this.selectedFilters.sizes.delete(size);
    } else {
      this.selectedFilters.sizes.add(size);
    }
  }

  updatePriceRange(event: Event, type: 'min' | 'max'): void {
    const value = +(event.target as HTMLInputElement).value;
    this.selectedFilters.priceRange[type] = value;
  }

  applyFilters(): void {
    this.filterChange.emit(this.selectedFilters);
    this.isOpen = false;
  }

  resetFilters(): void {
    this.selectedFilters = {
      categories: new Set<string>(),
      brands: new Set<string>(),
      colors: new Set<string>(),
      sizes: new Set<string>(),
      priceRange: { min: 0, max: 1000 },
      rating: 0
    };
    this.applyFilters();
  }

  isSelected(type: 'category' | 'brand' | 'color' | 'size', value: string): boolean {
    switch (type) {
      case 'category':
        return this.selectedFilters.categories.has(value);
      case 'brand':
        return this.selectedFilters.brands.has(value);
      case 'color':
        return this.selectedFilters.colors.has(value);
      case 'size':
        return this.selectedFilters.sizes.has(value);
      default:
        return false;
    }
  }
}
