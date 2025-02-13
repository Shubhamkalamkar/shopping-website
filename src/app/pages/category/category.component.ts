import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { FilterService } from '../../shared/services/filter.service';
import { CartService } from '../../shared/services/cart.service';
import { ToastService } from '../../shared/services/toast.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { WishlistSidebarComponent } from '../../shared/components/wishlist-sidebar/wishlist-sidebar.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { QuickViewModalComponent } from '../../shared/components/quick-view-modal/quick-view-modal.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    FilterSidebarComponent,
    WishlistSidebarComponent,
    PaginationComponent,
    QuickViewModalComponent,
    ToastComponent
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products$!: Observable<Product[]>;
  categoryName: string = '';
  currentPage = 1;
  itemsPerPage = 12;
  totalItems = 0;
  totalPages = 0;
  wishlistVisible = false;
  showQuickView = false;
  selectedProduct: Product | null = null;
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
    public filterService: FilterService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['category'];
      this.loadProducts();
    });
  }

  private loadProducts(): void {
    const products = this.productService.getProductsByCategory(this.categoryName);
    this.filterService.setProducts(products);
    
    this.products$ = this.filterService.getFilteredProducts().pipe(
      tap(products => {
        this.updatePagination(products);
        this.updatePaginatedProducts(products);
      })
    );
  }

  private updatePagination(products: Product[]): void {
    this.totalItems = products.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  private updatePaginatedProducts(products: Product[]): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedProducts = products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.products$.subscribe(products => {
      this.updatePaginatedProducts(products);
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

  toggleProductWishlist(product: Product): void {
    if (this.productService.isInWishlist(product.id)) {
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
        this.updatePaginatedProducts(products);
      })
    );
  }

  trackProductById(index: number, product: Product): number {
    return product.id;
  }

  trackOptionById(index: number, option: { value: string; label: string }): string {
    return option.value;
  }

  updateSearch(query: string): void {
    this.filterService.setSearchQuery(query);
  }

  toggleWishlist(): void {
    this.wishlistVisible = !this.wishlistVisible;
  }
}
