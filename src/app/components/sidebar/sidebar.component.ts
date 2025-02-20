import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Country {
  name: string;
  currency: string;
}

interface Category {
  name: string;
  subcategories: string[];
  isOpen: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() closeSidebar = new EventEmitter<void>();

  userName = 'John Doe';
  selectedCountry = 'India';
  currency = 'INR';
  isCountryPopupOpen = false;
  
  countries: Country[] = [
    { name: 'India', currency: 'INR' },
    { name: 'United States', currency: 'USD' },
    { name: 'United Kingdom', currency: 'GBP' },
    { name: 'Europe', currency: 'EUR' },
    { name: 'Japan', currency: 'JPY' }
  ];
  
  categories: Category[] = [
    {
      name: 'MEN',
      subcategories: ['NEW ARRIVALS', 'FEATURED', 'CORE COLLECTION', 'Ready-to-Wear', 'Footwear', 'ACCESSORIES', 'GIFTS FOR HIM'],
      isOpen: false
    },
    {
      name: 'WOMEN',
      subcategories: ['NEW ARRIVALS', 'FEATURED', 'CORE COLLECTION', 'Ready-to-Wear', 'Footwear', 'ACCESSORIES'],
      isOpen: false
    },
    {
      name: 'ACCESSORIES',
      subcategories: ['Bags', 'Wallets', 'Belts', 'Jewelry', 'Sunglasses'],
      isOpen: false
    }
  ];

  toggleCategory(selectedCategory: Category) {
    this.isCountryPopupOpen = false; // Close country popup when opening category
    this.categories.forEach(category => {
      if (category !== selectedCategory) {
        category.isOpen = false;
      }
    });
    selectedCategory.isOpen = !selectedCategory.isOpen;
  }

  toggleCountryPopup() {
    this.isCountryPopupOpen = !this.isCountryPopupOpen;
    // Close all categories when opening country popup
    this.categories.forEach(category => {
      category.isOpen = false;
    });
  }

  selectCountry(country: Country) {
    this.selectedCountry = country.name;
    this.currency = country.currency;
    this.isCountryPopupOpen = false;
  }

  onClose() {
    console.log('Closing sidebar');
    this.closeSidebar.emit();
  }
}
