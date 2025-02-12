import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-rating">
      <i class="fas fa-star" 
         *ngFor="let star of getStars()"
         [class.full]="star <= rating"
         [class.half]="star - 0.5 === rating"></i>
    </div>
  `,
  styles: [`
    .star-rating {
      display: inline-flex;
      gap: 2px;
    }
    .fa-star {
      color: #ddd;
      &.full {
        color: #ffd700;
      }
      &.half {
        background: linear-gradient(90deg, #ffd700 50%, #ddd 50%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  `]
})
export class StarRatingComponent {
  @Input() rating: number = 0;

  getStars(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
