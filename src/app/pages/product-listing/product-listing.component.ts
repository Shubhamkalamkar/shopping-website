import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, FilterOptions } from '../../models/product.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  showFilter = false;

  filterOptions: FilterOptions = {
    categories: ['T-Shirts', 'Shirts', 'Jeans', 'Dresses'],
    genders: ['men', 'women', 'unisex'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Blue', 'Red', 'Green'],
    patterns: ['Solid', 'Striped', 'Printed', 'Checked'],
    brands: ['Nike', 'Adidas', 'Puma', 'Levis']
  };

  selectedFilters = {
    categories: new Set<string>(),
    genders: new Set<string>(),
    sizes: new Set<string>(),
    colors: new Set<string>(),
    patterns: new Set<string>(),
    brands: new Set<string>()
  };

  ngOnInit() {
    // Mock data - replace with actual API call
    this.products = [
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
      {
        id: '1',
        name: 'Classic White T-Shirt',
        imageUrl: 'https://cdn1.staticans.com/image/data/Vastrado/25oct2024/LS5844B_2.jpg?width=494&height=660&mode=fill&fill=solid&fill-color=FFFFFF',
        price: 29.99,
        discountPrice: 24.99,
        category: 'T-Shirts',
        gender: 'unisex',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White'],
        pattern: 'Solid',
        brand: 'Nike'
      },
    ];
    this.filteredProducts = [...this.products];
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  toggleFilterItem(category: keyof typeof this.selectedFilters, item: string) {
    if (this.selectedFilters[category].has(item)) {
      this.selectedFilters[category].delete(item);
    } else {
      this.selectedFilters[category].add(item);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const categoryMatch = this.selectedFilters.categories.size === 0 ||
        this.selectedFilters.categories.has(product.category);
      const genderMatch = this.selectedFilters.genders.size === 0 ||
        this.selectedFilters.genders.has(product.gender);
      const brandMatch = this.selectedFilters.brands.size === 0 ||
        this.selectedFilters.brands.has(product.brand);
      const patternMatch = this.selectedFilters.patterns.size === 0 ||
        (product.pattern && this.selectedFilters.patterns.has(product.pattern));
      const colorMatch = this.selectedFilters.colors.size === 0 ||
        (product.color && product.color.some(c => this.selectedFilters.colors.has(c)));
      const sizeMatch = this.selectedFilters.sizes.size === 0 ||
        (product.size && product.size.some(s => this.selectedFilters.sizes.has(s)));

      return categoryMatch && genderMatch && brandMatch && patternMatch && colorMatch && sizeMatch;
    });
  }

  clearFilters() {
    Object.keys(this.selectedFilters).forEach(key => {
      const filterKey = key as keyof typeof this.selectedFilters;
      this.selectedFilters[filterKey].clear();
    });
    this.applyFilters();
  }
}
