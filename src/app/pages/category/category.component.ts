import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { QuickViewModalComponent } from '../../shared/components/quick-view-modal/quick-view-modal.component';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { WishlistSidebarComponent } from '../../shared/components/wishlist-sidebar/wishlist-sidebar.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { FilterService } from '../../shared/services/filter.service';
import { ToastService } from '../../shared/services/toast.service';
import { Product } from '../../shared/models/product.model';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    QuickViewModalComponent,
    FilterSidebarComponent,
    PaginationComponent,
    WishlistSidebarComponent,
    ToastComponent
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct: Product | null = null;
  showQuickView = false;
  categoryName: string = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;
  paginatedProducts: Product[] = [];

  sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    public filterService: FilterService,
    private toastService: ToastService
  ) {
    this.products$ = this.productService.getProducts().pipe(
      tap(products => {
        this.updatePagination(products);
      })
    );
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.categoryName = data['category'] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.products$ = this.filterService.filterProducts(
      this.productService.getProductsByCategory(this.categoryName)
    ).pipe(
      tap(products => {
        this.updatePagination(products);
      })
    );
  }

  updatePagination(products: Product[]): void {
    this.totalPages = Math.ceil(products.length / this.itemsPerPage);
    this.paginatedProducts = this.getPaginatedProducts(products);
  }

  getPaginatedProducts(products: Product[]): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return products.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.products$.subscribe(products => {
      this.paginatedProducts = this.getPaginatedProducts(products);
    });
  }

  onQuickView(product: Product): void {
    this.selectedProduct = product;
    this.showQuickView = true;
  }

  closeQuickView(): void {
    this.showQuickView = false;
    this.selectedProduct = null;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastService.success(`${product.name} added to cart`);
  }

  toggleWishlist(product: Product): void {
    if (this.isInWishlist(product.id)) {
      this.productService.removeFromWishlist(product.id);
      this.toastService.info(`${product.name} removed from wishlist`);
    } else {
      this.productService.addToWishlist(product);
      this.toastService.success(`${product.name} added to wishlist`);
    }
  }

  isInWishlist(productId: number): boolean {
    return this.productService.isInWishlist(productId);
  }

  sortProducts(event: Event): void {
    const sortBy = (event.target as HTMLSelectElement).value;
    this.products$ = this.products$.pipe(
      map(products => {
        const sorted = [...products];
        switch (sortBy) {
          case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
          case 'price-low':
            return sorted.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
          case 'price-high':
            return sorted.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
          case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
          default:
            return sorted;
        }
      }),
      tap(products => {
        this.updatePagination(products);
      })
    );
  }

  trackProductById(index: number, product: Product): number {
    return product.id;
  }

  trackOptionById(index: number, option: { value: string; label: string }): string {
    return option.value;
  }
}
