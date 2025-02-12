import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { IsNewPipe } from '../../pipes/is-new.pipe';

@Component({
  selector: 'app-quick-view-modal',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, IsNewPipe],
  templateUrl: './quick-view-modal.component.html',
  styleUrls: ['./quick-view-modal.component.scss']
})
export class QuickViewModalComponent {
  @Input() product!: Product;
  @Input() isInWishlist: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();
  @Output() toggleWishlist = new EventEmitter<void>();
}