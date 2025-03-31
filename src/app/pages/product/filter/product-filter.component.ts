import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductFilter } from '../../../models/product-page.model';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class ProductFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<ProductFilter>();

  priceRange = [0, 200000];
  categories: string[] = ['Men', 'Women', 'Kids', 'Accessories', 'Gifting'];
  selectedCategories: string[] = [];
  ratings: number[] = [5, 4, 3, 2, 1];
  selectedRatings: number[] = [];
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSizes: string[] = [];
  colors: string[] = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Brown', 'Grey'];
  selectedColors: string[] = [];
  sortOptions: Array<{value: string, label: string}> = [
    {value: 'price-low-high', label: 'Price: Low to High'},
    {value: 'price-high-low', label: 'Price: High to Low'},
    {value: 'newest', label: 'Newest First'},
    {value: 'popular', label: 'Most Popular'}
  ];
  selectedSort: string = '';

  constructor() {}

  ngOnInit(): void {}

  onFilterChange(): void {
    const filter: ProductFilter = {
      minPrice: this.priceRange[0],
      maxPrice: this.priceRange[1],
      categories: this.selectedCategories,
      sizes: this.selectedSizes,
      colors: this.selectedColors,
      sortBy: this.selectedSort as 'price-low-high' | 'price-high-low' | 'newest' | 'popular'
    };
    this.filterChange.emit(filter);
  }

  onCategoryChange(category: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.onFilterChange();
  }

  onRatingChange(rating: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedRatings.push(rating);
    } else {
      const index = this.selectedRatings.indexOf(rating);
      if (index !== -1) {
        this.selectedRatings.splice(index, 1);
      }
    }
    this.onFilterChange();
  }

  onSizeChange(size: string, event: Event): void {
    // For button clicks, toggle the selection
    if (event.type === 'click') {
      const index = this.selectedSizes.indexOf(size);
      if (index === -1) {
        this.selectedSizes.push(size);
      } else {
        this.selectedSizes.splice(index, 1);
      }
    } else {
      // For checkbox events
      const checked = (event.target as HTMLInputElement).checked;
      if (checked) {
        this.selectedSizes.push(size);
      } else {
        const index = this.selectedSizes.indexOf(size);
        if (index !== -1) {
          this.selectedSizes.splice(index, 1);
        }
      }
    }
    this.onFilterChange();
  }

  onColorChange(color: string, event: Event): void {
    // For button clicks, toggle the selection or remove
    if (event.type === 'click') {
      // Special case for the remove button in the selected colors list
      if ((event.target as HTMLElement).closest('.rounded-full')) {
        const index = this.selectedColors.indexOf(color);
        if (index !== -1) {
          this.selectedColors.splice(index, 1);
        }
      } else {
        // For color button clicks, toggle selection
        const index = this.selectedColors.indexOf(color);
        if (index === -1) {
          this.selectedColors.push(color);
        } else {
          this.selectedColors.splice(index, 1);
        }
      }
    } else {
      // For checkbox events
      const checked = (event.target as HTMLInputElement).checked;
      if (checked) {
        this.selectedColors.push(color);
      } else {
        const index = this.selectedColors.indexOf(color);
        if (index !== -1) {
          this.selectedColors.splice(index, 1);
        }
      }
    }
    this.onFilterChange();
  }

  onSortChange(sortValue: string): void {
    this.selectedSort = sortValue;
    this.onFilterChange();
  }

  clearFilters(): void {
    this.priceRange = [0, 200000];
    this.selectedCategories = [];
    this.selectedRatings = [];
    this.selectedSizes = [];
    this.selectedColors = [];
    this.selectedSort = '';
    this.onFilterChange();
  }
}