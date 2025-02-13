import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h1>Welcome to Our Shopping Website</h1>
      <p>Discover amazing deals and products!</p>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      color: #666;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {}
