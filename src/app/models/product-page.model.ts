export interface ProductFilter {
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  categories?: string[];
  sortBy?: 'price-low-high' | 'price-high-low' | 'newest' | 'popular';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subCategory?: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  discount?: number;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  currentFilter: ProductFilter;
  loading: boolean;
  error: string | null;
}