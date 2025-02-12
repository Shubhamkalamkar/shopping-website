import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { FilterService, FilterOptions } from '../../services/filter.service';

interface FilterState {
  priceRange: { min: number; max: number };
  ratings: number[];
  brands: string[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
  onSale: boolean;
}

interface ColorOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent implements OnInit {
  // Price Range
  minPrice = 0;
  maxPrice = 1000;
  selectedPriceRange = this.maxPrice;

  // Ratings
  ratings = [5, 4, 3, 2, 1];
  ratingCounts: { [key: number]: number } = {};

  // Brands
  brandSearchQuery = '';
  allBrands: string[] = [];
  filteredBrands: string[] = [];

  // Colors
  availableColors: ColorOption[] = [
    { name: 'Red', code: '#e74c3c' },
    { name: 'Blue', code: '#3498db' },
    { name: 'Green', code: '#2ecc71' },
    { name: 'Yellow', code: '#f1c40f' },
    { name: 'Purple', code: '#9b59b6' },
    { name: 'Orange', code: '#e67e22' },
    { name: 'Black', code: '#34495e' },
    { name: 'White', code: '#ecf0f1' }
  ];

  // Sizes
  availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filter State
  filters: FilterState = {
    priceRange: { min: 0, max: this.maxPrice },
    ratings: [],
    brands: [],
    colors: [],
    sizes: [],
    inStock: false,
    onSale: false
  };

  private filterSubject = new BehaviorSubject<FilterState>(this.filters);
  filters$ = this.filterSubject.asObservable();

  constructor(private productService: ProductService, private filterService: FilterService) {}

  ngOnInit(): void {
    this.initializeFilters();
  }

  private initializeFilters(): void {
    // Initialize price range
    const products = this.productService.getProducts();
    products.subscribe(items => {
      if (items.length > 0) {
        this.minPrice = Math.min(...items.map(p => p.price));
        this.maxPrice = Math.max(...items.map(p => p.price));
        this.selectedPriceRange = this.maxPrice;
        
        // Initialize brands
        this.allBrands = [...new Set(items.map(p => p.brand))].sort();
        this.filteredBrands = [...this.allBrands];

        // Initialize rating counts
        this.ratings.forEach(rating => {
          this.ratingCounts[rating] = items.filter(p => Math.floor(p.rating) === rating).length;
        });
      }
    });
  }

  onPriceRangeChange(): void {
    this.filters.priceRange.max = this.selectedPriceRange;
    this.updateFilters();
  }

  isRatingSelected(rating: number): boolean {
    return this.filters.ratings.includes(rating);
  }

  toggleRating(rating: number): void {
    const index = this.filters.ratings.indexOf(rating);
    if (index === -1) {
      this.filters.ratings.push(rating);
    } else {
      this.filters.ratings.splice(index, 1);
    }
    this.updateFilters();
  }

  getRatingCount(rating: number): number {
    return this.ratingCounts[rating] || 0;
  }

  filterBrands(): void {
    this.filteredBrands = this.allBrands.filter(brand =>
      brand.toLowerCase().includes(this.brandSearchQuery.toLowerCase())
    );
  }

  isSelectedBrand(brand: string): boolean {
    return this.filters.brands.includes(brand);
  }

  toggleBrand(brand: string): void {
    const index = this.filters.brands.indexOf(brand);
    if (index === -1) {
      this.filters.brands.push(brand);
    } else {
      this.filters.brands.splice(index, 1);
    }
    this.updateFilters();
  }

  isSelectedColor(color: string): boolean {
    return this.filters.colors.includes(color);
  }

  toggleColor(color: string): void {
    const index = this.filters.colors.indexOf(color);
    if (index === -1) {
      this.filters.colors.push(color);
    } else {
      this.filters.colors.splice(index, 1);
    }
    this.updateFilters();
  }

  isSelectedSize(size: string): boolean {
    return this.filters.sizes.includes(size);
  }

  toggleSize(size: string): void {
    const index = this.filters.sizes.indexOf(size);
    if (index === -1) {
      this.filters.sizes.push(size);
    } else {
      this.filters.sizes.splice(index, 1);
    }
    this.updateFilters();
  }

  updateFilters(): void {
    this.filterSubject.next({ ...this.filters });
    this.filterService.updateFilters(this.filters);
  }

  applyFilters(): void {
    this.updateFilters();
  }

  resetFilters(): void {
    this.filters = {
      priceRange: { min: this.minPrice, max: this.maxPrice },
      ratings: [],
      brands: [],
      colors: [],
      sizes: [],
      inStock: false,
      onSale: false
    };
    this.selectedPriceRange = this.maxPrice;
    this.brandSearchQuery = '';
    this.filteredBrands = [...this.allBrands];
    this.updateFilters();
  }

  toggleOnSale(): void {
    this.filters.onSale = !this.filters.onSale;
    this.updateFilters();
  }

  toggleInStock(): void {
    this.filters.inStock = !this.filters.inStock;
    this.updateFilters();
  }
}
