import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button routerLink="/">Go Home</button>
    </div>
  `,
  styles: [`
    .not-found-container {
      padding: 4rem;
      text-align: center;
    }
    h1 {
      font-size: 6rem;
      margin: 0;
      color: #e74c3c;
    }
    h2 {
      font-size: 2rem;
      margin: 1rem 0;
    }
    p {
      color: #666;
      margin-bottom: 2rem;
    }
    button {
      padding: 0.8rem 2rem;
      font-size: 1.1rem;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #2980b9;
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NotFoundComponent {}
