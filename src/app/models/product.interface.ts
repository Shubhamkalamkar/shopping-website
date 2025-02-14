export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  category: string;
  gender: 'men' | 'women' | 'unisex';
  size?: string[];
  color?: string[];
  pattern?: string;
  brand: string;
}

export interface FilterOptions {
  categories: string[];
  genders: string[];
  sizes: string[];
  colors: string[];
  patterns: string[];
  brands: string[];
}
