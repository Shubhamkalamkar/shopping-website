import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { fadeInOut } from '../../animations/product-animations';

@Component({
  selector: 'app-search-suggestions',
  templateUrl: './search-suggestions.component.html',
  styleUrls: ['./search-suggestions.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [fadeInOut]
})
export class SearchSuggestionsComponent implements OnDestroy {
  @Input() suggestions: Product[] = [];
  @Input() isLoading = false;
  @Output() suggestionSelected = new EventEmitter<Product>();

  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      // Implement search logic here
      this.searchProducts(term);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(term: string): void {
    this.searchTerms.next(term);
  }

  onSuggestionClick(product: Product): void {
    this.suggestionSelected.emit(product);
  }

  private searchProducts(term: string): void {
    // Implement product search logic here
    // This should be connected to your product service
  }
}
