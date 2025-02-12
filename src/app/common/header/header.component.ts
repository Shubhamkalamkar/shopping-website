import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartItemCount$: Observable<number>;
  isSidebarOpen = false;

  constructor(private cartService: CartService) {
    this.cartItemCount$ = this.cartService.getCartItemCount();
  }

  toggleMobileMenu() {
    // Implement mobile menu toggle functionality
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleCart() {
    this.cartService.toggleCart();
  }

  search(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    // Implement search functionality
  }
}
