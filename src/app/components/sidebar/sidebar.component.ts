import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  selectedCountry = 'India';
  currency = 'INR ₹';
  userName = 'John Doe';

  toggleCategory(category: Category) {
    category.isOpen = !category.isOpen;
  }

  onClose() {
    console.log('Closing sidebar');
    this.closeSidebar.emit();
  }
}
