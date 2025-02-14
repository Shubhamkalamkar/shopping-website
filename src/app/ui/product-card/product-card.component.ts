import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() primaryImage!: string;
  @Input() hoverImage?: string;
  @Input() price!: number;
  @Input() discountPrice?: number;
  @Input() discount?: number;
  @Input() title!: string;

  isHovered = false;
  isLiked = false;

  get discountPercentage(): number {
    if (this.price && this.discountPrice) {
      return Math.round(((this.price - this.discountPrice) / this.price) * 100);
    }
    return 0;
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }
}
