import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartCount: number = 0;

  constructor() {}

  toggleMenu() {
    // Implement mobile menu toggle functionality
  }

  search(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    // Implement search functionality
  }
}
