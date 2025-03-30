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
  selectedSize?: string;
  selectedColor?: string;
  quantity?: number;
  sku?: string;
  originalPrice?: number;
  discountPercentage?: number;
  features?: string[];
  material?: string;
  careInstructions?: string;
  shippingInfo?: string;
  returnPolicy?: string;
}

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  currentFilter: ProductFilter;
  loading: boolean;
  error: string | null;
}

export interface CheckoutInfo {
  products: Product[];
  totalAmount: number;
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}